import React from "react"
import { BlogPost } from "../types/blog"
import BlogHeader from "./BlogHeader"

const BlogPreview: React.FC<BlogPost> = (props) => {
  const { title, bodyText, createdAt, author, tags } = props
  // create a preview text with ...
  const previewText: string = bodyText.substring(0, 150) + "..."

  return (
    <section>
      <BlogHeader createdAt={createdAt} author={author} />
      <h2 className="font-bold">{title}</h2>
      <p className="mt-2">{previewText}</p>
      <div className="flex gap-3">
        {tags.map((tag, idx) => {
          return (
            <p
              key={idx}
              className="label-selected hover:bg-sky-400 transition-all duration-300"
            >
              {tag}
            </p>
          )
        })}
      </div>
    </section>
  )
}

export default BlogPreview
