import { environmentDefault } from "./environment.default";

export const environment = {
  ...environmentDefault,

  api: "https://southamerica-east1-shop-354211.cloudfunctions.net/shop-client-server",
  apiCms: "https://paulorsaf.dev/shop-cms/api",
  imageBaseUrl: "https://paulorsaf.dev",
  production: true
};
