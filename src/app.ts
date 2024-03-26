import express from "express";
import { envs } from "./config";
import { GitHubController } from "./presentacion/github/controller";

(() => {
  main();
})();

function main() {
  const app = express();

  const controlller = new GitHubController();

  app.use(express.json());

  app.post("/api/github", controlller.webHookHandler);

  app.listen(envs.PORT, () => {
    console.log(`App running on port ${envs.PORT}`);
  });
}
