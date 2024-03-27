import OpenModalButton from "../../OpenModalButton";
import PledgeRewardModal from "./pledgeRewardModel";
import DeleteRewardModal from "../DeleteReward/DeleteRewardModal";
import { useNavigate } from "react-router-dom";
import "../RewardCSS/rewardListItem.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkGetBackings, clearBackings } from "../../../redux/backings";

const RewardListItem = ({
  reward,
  project,
  isActive,
  onRewardClick,
  isOwner,
}) => {
  const rewardId = reward.id;
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const backingsObj = useSelector((state) => state.backings);
  const backings = Object.values(backingsObj);
  let ifBacked = false;

  useEffect(() => {
    if (user) {
      dispatch(thunkGetBackings());
    }

    return () => dispatch(clearBackings());
  }, [dispatch, user]);

  if (backings?.length > 0 && user) {
    for (let backing of backings) {
      if (backing?.reward_id === reward.id) {
        ifBacked = true;
        break;
      }
    }
  }

  const quantityLeft = reward.quantity - reward.backers;

  return (
    <div className="reward-card" onClick={onRewardClick}>
      <div className="reward-card-details" id="reward-card-details-container">
        <div className="card-reward-text-div">
          <h3>Pledge ${reward.amount}</h3>
          <div className="reward-name-description">
            <h2>{reward.name}</h2>
            <p>{reward.description}</p>
          </div>
          <div className="reward-details">
            <p className="reward-card-grey-title">QUANTITY</p>
            {quantityLeft > 0 ? (
              <p className="reward-details-not-title">{quantityLeft}</p>
            ) : (
              <p className="reward-details-not-title">Sold out!</p>
            )}
          </div>
          <div className="reward-details">
            <p className="reward-card-grey-title">ESTIMATED DELIVERY</p>
            <p className="reward-details-not-title">
              {new Date(reward.est_delivery_date).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="reward-details-backer">{reward.backers} backers</div>
        </div>

        <div className="card-reward-image" >
          <img src={`${reward.img_url}`} alt="reward image" />
        </div>
      </div>

      <div className="reward-button">
        {isActive && !isOwner && user && !ifBacked && quantityLeft > 0 && (
          <div className="pledge-detail">
            <OpenModalButton
              buttonText={`Pledge $${reward.amount}`}
              modalComponent={<PledgeRewardModal reward={reward} />}
            />
          </div>
        )}
        {isActive && !isOwner && user && !ifBacked && !quantityLeft && (
          <div className="pledge-detail">
            <p>This reward is sold out!</p>
          </div>
        )}
        {isActive && !isOwner && user && ifBacked && (
          <div className="pledge-detail">
            <p>You have already pledge this reward!</p>
          </div>
        )}
        {isActive && !user && (
          <div className="pledge-detail">
            <p>You must be logged in to pledge!</p>
          </div>
        )}
        {isOwner && (
          <div className="owner-action">
            <button
              onClick={() =>
                navigate(`/projects/${project.id}/rewards/${rewardId}/edit`)
              }
            >
              Update
            </button>
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteRewardModal rewardId={rewardId} />}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardListItem;
