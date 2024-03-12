import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkAddLike,
  thunkDeleteLike,
  thunkGetLikes,
} from "../../redux/likes";

const LikeBar = ({ project }) => {
  const likesObj = useSelector((state) => state.likes);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(0);

  const handleLike = async () => {
    await dispatch(thunkAddLike(project.id));
    setLikes((prev) => prev + 1);
  };

  const handleUnlike = async () => {
    const likeId = Object.values(likesObj).find(
      (like) => like.user_id === user.id && like.project_id === project.id
    ).id;

    await dispatch(thunkDeleteLike(project.id, likeId));

    setLikes((prev) => prev - 1);
  };

  useEffect(() => {
    dispatch(thunkGetLikes());
  }, [dispatch]);

  if (!likesObj) return null;

  const likeArr = Object.values(likesObj);
  const currentProjectLikesArr = likeArr.filter(
    (like) => like.projectId === project.id
  );
  set;

  return (
    <div>
      <p>Current Likes: {likes}</p>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleUnlike}>Unlike</button>
    </div>
  );
};

export default LikeBar;
