/* eslint-disable react-hooks/exhaustive-deps */
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { getBlogs } from "../server/blogs"
import { BlogPost } from "../types/blog"
import BlogPreview from "../components/BlogPreview"
import { useEffect, useMemo, useState } from "react"

const Home: NextPage = ({
  blogData,
  tagsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // console.log(blogData)
  const [filterWord, setFilterword] = useState<string[]>([])
  const [selectedIdx, setSelectedIdx] = useState<number[]>([])
  const filteredBlog: BlogPost[] = useMemo(() => {
    return filterWord.length > 0
      ? blogData.filter((blog: BlogPost) => {
          return filterWord.every((filter) => blog.tags.includes(filter))
        })
      : blogData
  }, [filterWord])

  const filterlabel = (tag: any, idx: number) => {
    if (selectedIdx.includes(idx)) {
      setSelectedIdx(selectedIdx.filter((id) => id !== idx))
      setFilterword(filterWord.filter((filter) => filter !== tag.innerText))
    } else {
      setSelectedIdx([...selectedIdx, idx])
      setFilterword([...filterWord, tag.innerText])
    }
  }

  useEffect(() => {
    console.log(filterWord)
  }, [selectedIdx])

  return (
    <main className="layout">
      <title> Home Page </title>
      <section className="font-poppins">
        <div className="mt-3 text-center">
          <h1>Welcome to DevBlog</h1>
          <p>A sflkjaskd</p>
        </div>
      </section>
      <section className="flex flex-col items-center text-[1.15rem] mt-12">
        <div className="flex gap-3 mb-12">
          {tagsData.map((tag: string, idx: number) => {
            return (
              <button
                key={idx}
                className={`${
                  selectedIdx.includes(idx)
                    ? "label-selected hover:bg-sky-400 transition-all duration-300S"
                    : "label hover:bg-sky-400 transition-all duration-300"
                }`}
                onClick={(e) => filterlabel(e.target, idx)}
              >
                {tag}
              </button>
            )
          })}
        </div>
        <div className="flex flex-col gap-3 mb-12">
          {filteredBlog.map((blog: BlogPost) => {
            return (
              <div
                key={blog.id}
                className="max-w-[28em] max-h-[20em] overflow-hidden mx-6 mb-6 bg-neutral-300 text-zinc-800 rounded-lg p-4 hover:bg-neutral-500 hover:text-neutral-300 transition-all duration-300"
              >
                <a href={blog.url} target="_blank" rel="noreferrer">
                  <BlogPreview
                    title={blog.title}
                    bodyText={blog.bodyText}
                    createdAt={blog.createdAt}
                    author={blog.author}
                    tags={blog.tags}
                    // lastEditedAt={blog.lastEditedAt}
                  />
                </a>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs()
  let tags: string[] = []
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    }
  }
  // console.log(tags)
  // solving JSON serializable error
  blogs = JSON.parse(JSON.stringify(blogs))
  // console.log(blogs)
  return {
    props: {
      blogData: blogs || null,
      tagsData: tags || null,
    },
  }
}
