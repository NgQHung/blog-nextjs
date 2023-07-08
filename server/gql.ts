export function discussionGql(ghDiscussionCategoryId: string | undefined) {
  return `{
        repository(owner: "NgQHung", name: "blog-nextjs"){
            discussions(first: 100, categoryId:"${ghDiscussionCategoryId}"){
                nodes {
                    title
                    url
                    number
                    bodyHTML
                    bodyText
                    createdAt
                    lastEditedAt
                    author{
                        login
                        url
                        avatarUrl
                    }
                    labels(first: 100)	{
                        nodes {
                            name
                        }
                    }
                }
            }
        }
    }`
}

export function discussionDetailGql(postId: number | undefined) {
  console.log("postId: ", postId)
  return `{
        repository(owner: "NgQHung", name: "blog-nextjs"){
            discussion(number: ${postId}){
                title
                bodyHTML
                createdAt
                author{
                    login
                    url
                    avatarUrl
                }
            }
        }
    }`
}
