import { NextResponse } from "next/server";

export async function GET() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

  if (!storeDomain || !accessToken) {
    return NextResponse.json(
      { error: "Variáveis da Shopify não configuradas." },
      { status: 500 }
    );
  }

  const response = await fetch(
    `https://${storeDomain}/admin/api/2025-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
      body: JSON.stringify({
        query: `
          query {
            products(first: 20) {
              edges {
                node {
                  id
                  title
                  handle
                  description
                  productType
                  vendor
                  tags
                  onlineStoreUrl
                  featuredImage {
                    url
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        price
                        availableForSale
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok || result.errors) {
    return NextResponse.json(
      { error: "Erro ao buscar produtos da Shopify.", details: result },
      { status: 500 }
    );
  }

  const products = result.data.products.edges.map((edge: any) => {
    const product = edge.node;
    const variant = product.variants.edges[0]?.node;

    return {
      shopify_id: product.id,
      title: product.title,
      description: product.description,
      product_url:
        product.onlineStoreUrl ||
        `https://dablogueirinha.com.br/products/${product.handle}`,
      image_url: product.featuredImage?.url || null,
      price: variant?.price ? Number(variant.price) : null,
      available: variant?.availableForSale ?? true,
      product_type: product.productType,
      vendor: product.vendor,
      tags: product.tags || [],
    };
  });

  return NextResponse.json({ products });
}