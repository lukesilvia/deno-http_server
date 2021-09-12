import {
  Application,
  Router,
  helpers,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js";
import { renderToString } from "https://x.lcas.dev/preact@10.5.12/ssr.js";

function App() {
  return (
    <html>
      <head>
        <title>sample greet app</title>
      </head>
      <body>
        <h1>Sample greet app</h1>

        <form action="/greet" method="get">
          <label for="name">Enter name to greet: </label>
          <input type="text" name="name" id="name" required />

          <input type="submit" value="Greet!" />
        </form>
      </body>
    </html>
  );
}

export function createApp(): Application {
  const app = new Application();
  const router = new Router();

  router.get("/", (ctx) => {
    ctx.response.body = renderToString(<App />);
  });

  router.get("/greet", (ctx) => {
    const { name = "anonymous" } = helpers.getQuery(ctx);
    ctx.response.body = `Hello ${name}`;
  });

  app.use(router.routes());

  return app;
}
