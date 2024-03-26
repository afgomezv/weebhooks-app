import { GitHubIssuePayload, GitHubStartPayload } from "../../interface";

export class GitHubService {
  constructor() {}

  onStart(payload: GitHubStartPayload): string {
    let message: string;

    const { action, sender, repository } = payload;

    message = `User ${sender.login} ${action} start on ${repository.full_name}`;

    return message;
  }

  onIssue(payload: GitHubIssuePayload): string {
    const { action, issue } = payload;

    if (action === "opened") {
      return `An issue was opened with this title ${issue.title}`;
    }

    if (action === "closed") {
      return `An issue was closed by ${issue.user.login}`;
    }

    if (action === "reopened") {
      return `An issue was reopened by ${issue.user.login}`;
    }

    return `Unhandled action for the issue event ${action}`;
  }
}
