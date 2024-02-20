
const RewardListItem = ({ reward, project}) => {
    return (
        <div>
            <div className="card-reward-image">
                <img src={`${reward.img_url}`} alt="reward image" />
            </div>

            <div className="card-reward-text-div">
                <h2>Pledge ${reward.amount}</h2>
                <div className="reward-name-description">
                    <h2>{reward.name}</h2>
                    <p>{reward.description}</p>
                </div>
                <div>
                    {project.numOfBackers} backers
                </div>
                
            </div>
        </div>
    )
}

export default RewardListItem;