import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { fetchShopifyProducts } from "@/features/shopify/shopifyService";

export async function POST() {
  try {
    const shopifyProducts = await fetchShopifyProducts();

    let imported = 0;
    let updated = 0;

    for (const product of shopifyProducts) {
      const { data: existing } = await supabaseServer
        .from("products")
        .select("id")
        .eq("shopify_id", product.shopify_id)
        .maybeSingle();

      const { error } = await supabaseServer.from("products").upsert(
        {
          shopify_id: product.shopify_id,
          title: product.title,
          description: product.description,
          product_url: product.product_url,
          image_url: product.image_url,
          price: product.price,
          available: product.available,
          product_type: product.product_type,
          vendor: product.vendor,
        },
        {
          onConflict: "shopify_id",
        }
      );

      if (error) throw error;

      if (existing) updated++;
      else imported++;
    }

    await supabaseServer.from("shopify_sync_logs").insert({
      status: "success",
      products_imported: imported,
      products_updated: updated,
    });

    return NextResponse.json({
      ok: true,
      imported,
      updated,
      total: shopifyProducts.length,
    });
  } catch (error: any) {
    console.error(error);

    await supabaseServer.from("shopify_sync_logs").insert({
      status: "error",
      error_message: error.message || "Erro desconhecido",
    });

    return NextResponse.json(
      {
        ok: false,
        error: error.message || "Erro ao sincronizar Shopify.",
      },
      { status: 500 }
    );
  }
}