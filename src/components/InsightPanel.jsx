import { useState } from 'react';

export default function InsightPanel({ stats }) {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats),
      });
      if (!res.ok) throw new Error('insight generation failed');
      const data = await res.json();
      setInsight(data.insight);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="insight-panel">
      <div className="insight-panel__header">
        <span>ai insight</span>
        <button onClick={generate} disabled={loading}>
          {loading ? 'thinking…' : insight ? 'regenerate' : 'generate'}
        </button>
      </div>
      {error && <p className="insight-panel__error">{error} — try again shortly.</p>}
      {insight && <p className="insight-panel__text">{insight}</p>}
      {!insight && !error && !loading && (
        <p className="empty-note">generate a plain-english read on this activity</p>
      )}
    </div>
  );
}
