import { Request, Response } from "express";
import { GitHubService } from "../service/github.service";
import { DiscosrdService } from "../service/discord.service";

export class GitHubController {
  constructor(
    private readonly githubService = new GitHubService(),
    private readonly discordService = new DiscosrdService()
  ) {}

  webHookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header("x-github-event") ?? "unknown";
    //const signature = req.header("x-hub-signature-256") ?? "unknown";
    const payload = req.body;
    let message: string;

    switch (githubEvent) {
      case "star":
        message = this.githubService.onStart(payload);
        break;

      case "issues":
        message = this.githubService.onIssue(payload);
        break;

      default:
        message = `Unknown event ${githubEvent}`;
    }

    this.discordService
      .notify(message)
      .then(() => res.status(200).send("Accepted"))
      .catch(() => res.status(500).json({ error: "internal server error" }));
  };
}
