import { createApp } from "./create_greet_app.ts";
import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";

const testOptions = {
  sanitizeResources: false,
  sanitizeOps: false,
};

const app = createApp();

Deno.test({
  name: "GET /: respond 404",
  fn: async () => {
    const request = await superoak(app);
    await request.get("/").expect(404);
  },
  ...testOptions,
});

Deno.test({
  name: "GET /greet: respond 200, 'Hello anonymous'",
  fn: async () => {
    const request = await superoak(app);
    await request.get("/greet").expect(200).expect("Hello anonymous");
  },
  ...testOptions,
});

Deno.test({
  name: "GET /greet?name=hoge: respond 200, 'Hello hoge'",
  fn: async () => {
    const request = await superoak(app);
    await request.get("/greet?name=hoge").expect(200).expect("Hello hoge");
  },
  ...testOptions,
});
