import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkAddLike,
  thunkDeleteLike,
  thunkGetLikes,
} from "../../redux/likes";

const LikeBar = ({ project, likesObj }) => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(Object.values(likesObj).length || 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    await dispatch(thunkAddLike(project.id));
    setLikes((prev) => prev + 1);
    setIsLoading(false);
  };

  const handleUnlike = async () => {
    setIsLoading(true);
    const likeId = Object.values(likesObj).find(
      (like) => like.user_id === user.id && like.project_id === project.id
    ).id;

    await dispatch(thunkDeleteLike(project.id, likeId));

    setLikes((prev) => prev - 1);

    setIsLoading(false);
  };

  useEffect(() => {
    const loadLikes = async () => {
      await dispatch(thunkGetLikes(project.id));
    };
    loadLikes();
  }, [dispatch]);

  if (!likesObj) return null;

  const hasLiked = Object.values(likesObj).some(
    (like) => like.user_id === user?.id && like.project_id === project.id
  );

  //   setLikes(likeNum);

  return (
    <div>
      <h2>{likes}</h2> <span>current like{likes !== 1 ? "s" : ""}</span>
      {!isLoading && user ? (
        <div>
          {!hasLiked ? (
            <button onClick={handleLike}>Like</button>
          ) : likes ? (
            <button onClick={handleUnlike}>Unlike</button>
          ) : null}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default LikeBar;
