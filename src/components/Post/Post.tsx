import { Post as PostType } from "../../@types"
import "./Post.css"

interface PostProps {
  post: PostType
}

function Post({ post }: PostProps) {
  return (
    <article className="post">
      <p className="post-category">{post.category}</p>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-excerpt">{post.excerpt}</p>
    </article>
  )
}

export default Post
