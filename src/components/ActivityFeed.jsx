function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ActivityFeed({ events }) {
  if (!events.length) {
    return <p className="empty-note">no recent public activity</p>;
  }

  return (
    <ul className="activity-feed">
      {events.map((e) => (
        <li className="activity-feed__item" key={e.id}>
          <span className="activity-feed__marker">·</span>
          <span className="activity-feed__text">
            {e.label} <strong>{e.repo}</strong>
          </span>
          <span className="activity-feed__time">{timeAgo(e.date)}</span>
        </li>
      ))}
    </ul>
  );
}
