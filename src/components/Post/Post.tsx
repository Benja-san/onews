import type { Post as PostData } from '../../data/posts';
import './Post.css';

interface PostProps {
  post: PostData;
}

function Post({ post }: PostProps) {
  return (
    <article className="post">
      <p className="post-category">{post.category}</p>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-excerpt">{post.excerpt}</p>
    </article>
  );
}

export default Post;
