import { Link } from "react-router-dom";
import "./BackedListItem.css";
import OpenModalButton from "../OpenModalButton";
import { DeleteBackingModal } from "./DeleteBackingModal";

const BackedListItem = ({ backing }) => {
  const deliveryDate = new Date(
    backing.reward.est_delivery_date
  ).toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div className="backing-container">
      <Link to={`/projects/${backing.project.id}`}>
        <div className="backed-list-item-project-div">
          <img
            id="backed-list-item-project-thumbnail"
            src={backing.project.coverImage}
            alt=""
          />
          <h2>{backing.project.title}</h2>
        </div>
      </Link>
      <div className="backed-list-item-reward-info">
        <div className="backed-image-container">
          <img src={backing.reward.img_url} alt="" className="backing-image" />
        </div>
        <div className="backing-stats-title-container">
          <div className="reward-link-container">
            <Link to={`/projects/${backing.project.id}/rewards`}>
              <h3>{backing.reward.name}</h3>
            </Link>
          </div>
          <div className="backing-stats-container">
            <h3>Amount pledged: ${backing.reward.amount}</h3>
            <h3>Estimated Delivery: {deliveryDate}</h3>
          </div>
        </div>
        <p>{backing.reward.description}</p>
        <div className="delete-pledge-button">
          <OpenModalButton
            buttonText="Delete My Pledge"
            modalComponent={<DeleteBackingModal backing={backing} />}
          />
        </div>
      </div>
    </div>
  );
};

export default BackedListItem;
