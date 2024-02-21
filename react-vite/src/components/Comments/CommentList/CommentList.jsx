import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import CommentListItem from "../CommentListItem/CommentListItem"
import { thunkGetComments, clearComments } from "../../../redux/comments"

const CommentList = () => {
  const dispatch = useDispatch()
  const { projectId } = useParams()
  const commentsObj = useSelector(state => state.comments)

  useEffect(() => {
    dispatch(thunkGetComments(projectId))

    return () => dispatch(clearComments())
  }, [dispatch, projectId])


  const comments = Object.values(commentsObj)
  if (!comments.length) return <h3>There are no comments yet</h3>

  return (
    <div>
      {comments.map(comment => (
        <CommentListItem 
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  )
}

export default CommentList