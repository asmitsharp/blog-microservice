import axios from "axios"
import React, { useEffect, useState } from "react"

const CommentList = ({postId}) => {
  const [comments, setComments] = useState([])

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`)

    setComments(res.data)
  }

  useEffect(() => {
    fetchData()
  },[])

  console.log(typeof(comments))

  const renderedComments = Object.values(comments).map(comment => {
    return <li key={comment.id}>{comment.content}</li>
  })

  return <ul>{renderedComments}</ul>
}

export default CommentList
