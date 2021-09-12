import { createApp } from "./create_greet_app.tsx";

const app = createApp();
addEventListener("fetch", app.fetchEventHandler());
