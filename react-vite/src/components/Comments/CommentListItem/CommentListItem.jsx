import { useSelector } from "react-redux";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import { DeleteCommentModal } from "../DeleteCommentModal/DeleteCommentModal";
import './commentListItem.css'
import { useDispatch } from "react-redux";
import { thunkCreateComment } from "../../../redux/comments";
import { Comments } from "../../Projects/ProjectDetail/CommentSection";

const CommentListItem = ({ comment }) => {
  // console.log("🚀 ~ CommentListItem ~ comment:", comment.replies.length)
  const user = useSelector(state => state.session.user)
  const parentId = comment.id
  const projectId = comment.project_id
  const dispatch = useDispatch()
  const msDay = 60*60*24*1000;
  const daysAfterPosting =  ((new Date() - new Date(comment.created_at)) / msDay);

  const [ showReplyField, setShowReplyField ] = useState(false)
  const [ reply, setReply ] = useState("")
  const [ errors, setErrors ] = useState({})
  const hasReplies = comment?.replies?.length > 0
  console.log("🚀 ~ CommentListItem ~ hasReplies:", hasReplies)


  let postedDaysAgo = Math.floor(daysAfterPosting)
 
  let hoursAfterPosting;
  if (daysAfterPosting < 1) {
    hoursAfterPosting = Math.round(daysAfterPosting*24)
  }
  
  const isCommenter = user.id == comment.user_id

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})
 
    const validationErrors = {}
    if (!reply) validationErrors.reply = "Reply must not be empty"

    if (Object.values(validationErrors).length) {
      setErrors(validationErrors)
    } else {
      const commentData = {
        reply, parentId
      }
      setReply('')
      setShowReplyField(false)

      dispatch(thunkCreateComment(projectId, commentData))
    }
  }

  return (
    <div className="comment-container">
        <div>
          <div>
            <img id='commenter-profile-image' src={comment.user_image} alt="" />
          </div>
          <div>
            <h3>{comment.username}</h3>
            {postedDaysAgo == 0 && <span>posted {hoursAfterPosting} hours ago</span>}
            {postedDaysAgo > 0 && <span>{postedDaysAgo} {postedDaysAgo > 1 ? "days" : "day"} ago</span>}
          </div>
          {isCommenter && <div className="comment-delete-container">
            <OpenModalButton
              buttonText={<FaTimes />}
              modalComponent={<DeleteCommentModal comment={comment} />} />
          </div>}
        </div>
        <div className="comment">
          <p>{comment.comment}</p>
        </div>
        {!showReplyField && <button onClick={() => setShowReplyField(true)}>Reply</button>}
        {showReplyField &&
          <div>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => setShowReplyField(false)}>Cancel</button>
            {"reply" in errors && <div className="errors">
              <p>{errors.reply}</p>
            </div>}
          </div>
        }

        <div className="comment-replies">
            {hasReplies && (
              <div className="replies-container">
                {comment.replies.map(reply => (
                  <CommentListItem key={reply.id} comment={reply} />
                ))}
              </div>
            )}
        </div>
    </div>
  )
}

export default CommentListItem