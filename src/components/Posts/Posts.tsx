import type { Post as PostData } from '../../data/posts';
import Post from '../Post/Post';

import './Posts.css';

interface PostsProps {
  posts: PostData[];
  isZenModeEnabled: boolean;
  searchText: string;
  onSearchTextChange: (nextSearchText: string) => void;
}

function Posts({
  posts,
  isZenModeEnabled,
  searchText,
  onSearchTextChange,
}: PostsProps) {
  const cssClass = isZenModeEnabled ? 'posts posts--zen' : 'posts';
  const normalizedSearch = searchText.trim().toLocaleLowerCase('fr');

  const filteredPosts = posts.filter((post) => {
    if (normalizedSearch === '') {
      return true;
    }

    return (
      post.title.toLocaleLowerCase('fr').includes(normalizedSearch) ||
      post.excerpt.toLocaleLowerCase('fr').includes(normalizedSearch)
    );
  });

  const resultMessage =
    filteredPosts.length === 0
      ? 'Aucun article ne correspond à votre recherche.'
      : `${filteredPosts.length} article${filteredPosts.length > 1 ? 's' : ''} trouvé${filteredPosts.length > 1 ? 's' : ''}.`;

  return (
    <main className={cssClass}>
      <header className="posts-header">
        <p className="posts-kicker">
          Le blog des développeuses et développeurs
        </p>
        <h1 className="posts-title">Des idées pour mieux coder</h1>
        <p className="posts-intro">
          Retours d’expérience, outils et réflexions autour du développement
          web.
        </p>
      </header>

      <div className="search-field">
        <label htmlFor="post-search">Rechercher dans les articles</label>
        <input
          id="post-search"
          type="search"
          placeholder="React, JavaScript…"
          value={searchText}
          onChange={(event) => onSearchTextChange(event.currentTarget.value)}
        />
      </div>

      <p className="search-results" aria-live="polite">
        {resultMessage}
      </p>

      <div className="posts-list">
        {filteredPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}

export default Posts;
