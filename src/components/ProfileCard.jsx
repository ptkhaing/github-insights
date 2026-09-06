export default function ProfileCard({ user }) {
  const joined = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  return (
    <div className="profile-card">
      <img
        className="profile-card__avatar"
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        width={72}
        height={72}
      />
      <div className="profile-card__info">
        <h2 className="profile-card__name">{user.name || user.login}</h2>
        <a
          className="profile-card__handle"
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
        >
          @{user.login}
        </a>
        {user.bio && <p className="profile-card__bio">{user.bio}</p>}
        <div className="profile-card__meta">
          {user.company && <span>{user.company}</span>}
          {user.location && <span>{user.location}</span>}
          <span>joined {joined}</span>
        </div>
      </div>
    </div>
  );
}
