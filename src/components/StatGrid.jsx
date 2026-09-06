export default function StatGrid({ totals, followers, following }) {
  const stats = [
    { label: 'repos', value: totals.repos, sign: null },
    { label: 'stars earned', value: totals.stars, sign: '+' },
    { label: 'forks', value: totals.forks, sign: '+' },
    { label: 'followers', value: followers, sign: null },
    { label: 'following', value: following, sign: null },
  ];

  return (
    <dl className="stat-grid">
      {stats.map((s) => (
        <div className="stat-grid__item" key={s.label}>
          <dt className="stat-grid__label">{s.label}</dt>
          <dd
            className={
              'stat-grid__value' +
              (s.sign === '+' ? ' stat-grid__value--add' : '')
            }
          >
            {s.sign}
            {s.value.toLocaleString()}
          </dd>
        </div>
      ))}
    </dl>
  );
}
