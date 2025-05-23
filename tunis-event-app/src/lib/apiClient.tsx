// integ SDK
import { Configuration, DefaultApi } from "@/api-sdk";

const api = new DefaultApi(
  new Configuration({
    basePath: "https://api.tunis.events",
  })
);

export default api;
