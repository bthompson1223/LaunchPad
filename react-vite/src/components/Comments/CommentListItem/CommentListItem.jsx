import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import { DeleteCommentModal } from "../DeleteCommentModal/DeleteCommentModal";
import './commentListItem.css'

const CommentListItem = ({ comment }) => {
  const user = useSelector(state => state.session.user)

  const msDay = 60*60*24*1000;
  const daysAfterPosting =  ((new Date() - new Date(comment.created_at)) / msDay);

  let postedDaysAgo = Math.floor(daysAfterPosting)
 
  let hoursAfterPosting;
  if (daysAfterPosting < 1) {
    hoursAfterPosting = Math.round(daysAfterPosting*24)
  }
  
  const isCommenter = user.id == comment.user_id

  return (
    <div>
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
            modalComponent={<DeleteCommentModal comment={comment} />}/>
        </div>}
      </div>
      <div className="comment">
        <p>{comment.comment}</p>
      </div>
    </div>
  )
}

export default CommentListItem