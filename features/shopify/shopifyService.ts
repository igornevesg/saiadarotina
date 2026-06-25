export type ShopifyProduct = {
  shopify_id: string;
  title: string;
  description: string | null;
  product_url: string | null;
  image_url: string | null;
  price: number | null;
  available: boolean;
  product_type: string | null;
  vendor: string | null;
};

async function getShopifyAccessToken() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  if (!storeDomain || !clientId || !clientSecret) {
    throw new Error("Credenciais Shopify não configuradas.");
  }

  const response = await fetch(
    `https://${storeDomain}/admin/oauth/access_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    }
  );

  const json = await response.json();

  if (!response.ok || !json.access_token) {
    console.error(json);
    throw new Error("Erro ao gerar token Admin API Shopify.");
  }

  return json.access_token as string;
}

export async function fetchShopifyProducts(): Promise<ShopifyProduct[]> {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const publicStoreUrl =
    process.env.SHOPIFY_PUBLIC_STORE_URL || "https://dablogueirinha.com.br";

  if (!storeDomain) {
    throw new Error("SHOPIFY_STORE_DOMAIN não configurado.");
  }

  const accessToken = await getShopifyAccessToken();

  const response = await fetch(
    `https://${storeDomain}/admin/api/2026-04/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
      body: JSON.stringify({
        query: `
          query {
            products(first: 50) {
              edges {
                node {
                  id
                  title
                  handle
                  description
                  productType
                  vendor
                  status
                  featuredMedia {
                    preview {
                      image {
                        url
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        price
                        inventoryQuantity
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

  const json = await response.json();

  if (!response.ok || json.errors) {
    console.error(json);
    throw new Error("Erro ao buscar produtos na Shopify.");
  }

  return json.data.products.edges.map((edge: any) => {
    const product = edge.node;
    const variant = product.variants.edges[0]?.node;

    return {
      shopify_id: product.id,
      title: product.title,
      description: product.description || null,
      product_url: `${publicStoreUrl}/products/${product.handle}`,
      image_url: product.featuredMedia?.preview?.image?.url || null,
      price: variant?.price ? Number(variant.price) : null,
      available:
        product.status === "ACTIVE" &&
        (variant?.inventoryQuantity === null ||
          variant?.inventoryQuantity === undefined ||
          variant.inventoryQuantity > 0),
      product_type: product.productType || null,
      vendor: product.vendor || null,
    };
  });
}