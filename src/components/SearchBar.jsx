import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span className="search-bar__prompt">$ lookup</span>
      <input
        className="search-bar__input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="a github username"
        autoComplete="off"
        spellCheck={false}
        aria-label="GitHub username"
      />
      <button className="search-bar__submit" type="submit" disabled={loading}>
        {loading ? 'running…' : 'run'}
      </button>
    </form>
  );
}
