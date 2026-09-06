// Turns raw repo/event data into the shapes the UI components need.

export function aggregateLanguages(repos) {
  const counts = {};
  for (const repo of repos) {
    if (!repo.language) continue;
    counts[repo.language] = (counts[repo.language] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
}

export function aggregateTotals(repos) {
  return repos.reduce(
    (acc, repo) => ({
      stars: acc.stars + repo.stargazers_count,
      forks: acc.forks + repo.forks_count,
      repos: acc.repos + 1,
    }),
    { stars: 0, forks: 0, repos: 0 }
  );
}

const EVENT_LABELS = {
  PushEvent: 'pushed to',
  PullRequestEvent: 'opened a pull request on',
  IssuesEvent: 'opened an issue on',
  CreateEvent: 'created',
  WatchEvent: 'starred',
  ForkEvent: 'forked',
  IssueCommentEvent: 'commented on',
};

export function summarizeEvents(events) {
  return events
    .filter((e) => EVENT_LABELS[e.type])
    .slice(0, 12)
    .map((e) => ({
      id: e.id,
      label: EVENT_LABELS[e.type],
      repo: e.repo?.name,
      date: e.created_at,
    }));
}

export function activityByWeek(events) {
  // last 12 weeks, commit-ish activity count (PushEvent commits)
  const weeks = new Array(12).fill(0);
  const now = new Date();
  for (const e of events) {
    if (e.type !== 'PushEvent') continue;
    const d = new Date(e.created_at);
    const diffWeeks = Math.floor((now - d) / (7 * 24 * 60 * 60 * 1000));
    if (diffWeeks >= 0 && diffWeeks < 12) {
      const commitCount = e.payload?.commits?.length || 1;
      weeks[11 - diffWeeks] += commitCount;
    }
  }
  return weeks.map((count, i) => ({ week: `w${i + 1}`, commits: count }));
}
