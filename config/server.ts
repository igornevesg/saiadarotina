import { requireEnv } from "./validation";

export const serverEnv = {
  shopifyStoreDomain: requireEnv("SHOPIFY_STORE_DOMAIN"),
  shopifyClientId: requireEnv("SHOPIFY_CLIENT_ID"),
  shopifyClientSecret: requireEnv("SHOPIFY_CLIENT_SECRET"),
  shopifyPublicStoreUrl:
    process.env.SHOPIFY_PUBLIC_STORE_URL || "https://dablogueirinha.com.br",
};