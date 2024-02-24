import { Link } from "react-router-dom";
import "./BackedListItem.css";
import OpenModalButton from "../OpenModalButton";
import { DeleteBackingModal } from "./DeleteBackingModal";
import './BackedListItem.css'

const BackedListItem = ({ backing }) => {
  const deliveryDate = new Date(
    backing.reward?.est_delivery_date
  ).toLocaleString("default", { month: "long", year: "numeric" });
  const numOfBackers = backing?.reward?.backers; 
  const quantityLeft = backing?.reward?.quantity;
  const purchaseDate = backing?.created_at

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getUTCDate(); 
    const month = date.toLocaleString('en-us', { month: 'short' }); 
    const year = date.getUTCFullYear(); 
    
    return `${month} ${day}, ${year}`; 
  }

  return (
    <div className="backing-container">
      
      <div className="backed-list-item-reward-info">
        <div className="backed-image-container">
          <img src={backing.reward.img_url} alt="" className="backing-image" />
        </div>
        <div className="backing-stats-title-container">
          <div className="reward-link-container">
            <Link to={`/projects/${backing.project.id}/rewards`}>
              <h3>{backing.reward.name}</h3>
            </Link>
            <p>${backing.reward.amount}</p>
          </div>
          <div className="backing-stats">
            <div className="backing-stats-container">
              <p className="backed-card-small-title">Estimated Delivery</p>
              <p className="backed-details-not-title ">{deliveryDate}</p>
            </div>
            <div className="backing-stats-container">
              <p className="backed-card-small-title">Backers</p>
              <p className="backed-details-not-title ">{numOfBackers}</p>
            </div>
              {/* <p>{backing.reward.description}</p> */}
            <div className="delete-pledge-button">
              <OpenModalButton
                buttonText="Delete My Pledge"
                modalComponent={<DeleteBackingModal backing={backing} />}
              />
            </div>
          </div>
          

        </div>
        
      </div>

      <div className="pledge-info">
        
        <Link to={`/projects/${backing.project.id}`}>
          <div className="backed-list-item-project-div">
            <img
              id="backed-list-item-project-thumbnail"
              src={backing.project.coverImage}
              alt=""
            />
            <h4>{backing.project.title}</h4>
          </div>
        </Link>

        <div className="relevant-pledge-info">
            <div className="backing-stats-container">
              <p className="backed-card-small-title">Pledge Date</p>
              <p className="backed-details-not-title ">You plurchased this reward on {formatDate(purchaseDate)}</p>
            </div>
            <div className="backing-stats-container">
              <p className="backed-card-small-title">Quantity</p>
              <p className="backed-details-not-title ">Only {quantityLeft} left</p>
            </div>
        </div>


      </div>
    </div>
  );
};

export default BackedListItem;
