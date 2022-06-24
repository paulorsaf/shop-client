import { environmentDefault } from "./environment.default";

export const environment = {
  ...environmentDefault,

  apiCms: "http://paulorsaf.dev/shop-cms/api",
  imageBaseUrl: "http://paulorsaf.dev",
  production: true
};
