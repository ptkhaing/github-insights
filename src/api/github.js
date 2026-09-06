const BASE = 'https://api.github.com';

class GitHubApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (res.status === 404) {
    throw new GitHubApiError('user not found', 404);
  }
  if (res.status === 403) {
    throw new GitHubApiError('rate limit reached, try again in a few minutes', 403);
  }
  if (!res.ok) {
    throw new GitHubApiError(`GitHub API error (${res.status})`, res.status);
  }
  return res.json();
}

export async function fetchUser(username) {
  return request(`/users/${username}`);
}

export async function fetchRepos(username) {
  // up to 100 most recently pushed repos, enough for language/star aggregation
  return request(`/users/${username}/repos?per_page=100&sort=pushed`);
}

export async function fetchEvents(username) {
  // public activity, most recent ~90 events GitHub exposes
  return request(`/users/${username}/events/public?per_page=100`);
}

export { GitHubApiError };
