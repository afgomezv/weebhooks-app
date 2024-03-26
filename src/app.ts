import express from "express";
import { envs } from "./config";
import { GitHubController } from "./presentacion/github/controller";
import { GithunSha256Middleware } from "./presentacion/middlewares/github-sha256.middlewares";

(() => {
  main();
})();

function main() {
  const app = express();

  const controlller = new GitHubController();

  app.use(express.json());

  app.use(GithunSha256Middleware.verifySignature);

  app.post("/api/github", controlller.webHookHandler);

  app.listen(envs.PORT, () => {
    console.log(`App running on port ${envs.PORT}`);
  });
}
