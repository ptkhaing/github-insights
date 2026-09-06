import { useState } from 'react';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import StatGrid from './components/StatGrid';
import LanguageChart from './components/LanguageChart';
import ActivityChart from './components/ActivityChart';
import ActivityFeed from './components/ActivityFeed';
import InsightPanel from './components/InsightPanel';
import { fetchUser, fetchRepos, fetchEvents, GitHubApiError } from './api/github';
import {
  aggregateLanguages,
  aggregateTotals,
  summarizeEvents,
  activityByWeek,
} from './api/aggregate';

export default function App() {
  const [state, setState] = useState({ status: 'idle' });

  async function handleSearch(username) {
    setState({ status: 'loading' });
    try {
      const [user, repos, events] = await Promise.all([
        fetchUser(username),
        fetchRepos(username),
        fetchEvents(username),
      ]);

      setState({
        status: 'ready',
        user,
        totals: aggregateTotals(repos),
        languages: aggregateLanguages(repos),
        activity: activityByWeek(events),
        feed: summarizeEvents(events),
      });
    } catch (err) {
      const message =
        err instanceof GitHubApiError ? err.message : 'something went wrong, try again';
      setState({ status: 'error', message });
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <p className="hero__eyebrow">git log --author=</p>
        <h1 className="hero__title">github insights</h1>
        <p className="hero__subtitle">
          look up any public GitHub profile and see their activity at a glance.
        </p>
        <SearchBar onSearch={handleSearch} loading={state.status === 'loading'} />
      </header>

      {state.status === 'error' && (
        <p className="page__error">✗ {state.message}</p>
      )}

      {state.status === 'ready' && (
        <main className="results">
          <ProfileCard user={state.user} />
          <StatGrid
            totals={state.totals}
            followers={state.user.followers}
            following={state.user.following}
          />

          <div className="results__grid">
            <section className="panel">
              <h3 className="panel__title">languages</h3>
              <LanguageChart data={state.languages} />
            </section>

            <section className="panel">
              <h3 className="panel__title">commits, last 12 weeks</h3>
              <ActivityChart data={state.activity} />
            </section>
          </div>

          <section className="panel">
            <h3 className="panel__title">recent activity</h3>
            <ActivityFeed events={state.feed} />
          </section>

          <InsightPanel
            stats={{
              username: state.user.login,
              totals: state.totals,
              languages: state.languages,
              recentActivity: state.feed,
            }}
          />
        </main>
      )}
    </div>
  );
}
