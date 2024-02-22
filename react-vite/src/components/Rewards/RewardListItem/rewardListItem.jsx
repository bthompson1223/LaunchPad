import { useState } from "react";
import OpenModalButton from '../../OpenModalButton';
import PledgeRewardModal from "./plegeRewardModel";
import DeleteRewardModal from "../DeleteReward/DeleteRewardModal";
import { useNavigate} from "react-router-dom";

const RewardListItem = ({ reward, project, isActive, onRewardClick, isOwner}) => {
    const [isClicked, setIsClicked] = useState(false) 
    const rewardId = reward.id   
    const navigate = useNavigate();
    
    return (
        <div className="reward-card" onClick={onRewardClick}>
            <div className="card-reward-text-div">
                <h2>Pledge ${reward.amount}</h2>
                <div className="reward-name-description">
                    <h2>{reward.name}</h2>
                    <p>{reward.description}</p>
                </div>
                
                <div>
                    <p>QUANTITY</p>
                    <p>{reward.quantity}</p>
                </div>

                <div>
                    <p>ESTIMATED DELIVERY</p>
                    <p>{new Date(reward.est_delivery_date).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                </div>

                <div>
                    {project.numOfBackers} backers
                </div>
            </div>

            <div className="card-reward-image">
                <img src={`${reward.img_url}`} alt="reward image" />
            </div >
                <div className="details-actions">
                    {
                        isActive && !isOwner && (
                            <div className="plege-detail">
                                <OpenModalButton buttonText={`Pledge ${reward.amount}`} modalComponent={<PledgeRewardModal rewardId = {rewardId} />} />
                            </div>
                        )
                    }
                    {
                        isOwner && (
                            <div>
                                <button onClick={() => navigate(`/projects/${project.id}/rewards/${rewardId }/edit`)} >Update</button>
                                <OpenModalButton  buttonText="Delete" modalComponent={<DeleteRewardModal rewardId = {rewardId} />}/>
                            </div>
                            
                        )
                    }
                </div>
        </div>
    )
}

export default RewardListItem;