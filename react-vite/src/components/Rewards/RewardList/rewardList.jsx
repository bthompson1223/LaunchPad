import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetRewards} from '../../../redux/reward'
import { useParams, useNavigate } from 'react-router-dom';
import RewardListItem from '../RewardListItem/rewardListItem';
import { thunkGetOneProject } from '../../../redux/project';



const RewardList =  () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {projectId} = useParams(); 
    const rewardObj = useSelector(state => state.rewards);
    const project = useSelector(state => state.projects[projectId]);
    const user = useSelector(state => state.session.user);
    let isOwner = false;
    const [activeRewardId, setActiveRewardId] = useState(null);

    useEffect(() => {
        dispatch(thunkGetRewards(projectId));
    }, [dispatch, projectId])

    useEffect(() => {
        dispatch(thunkGetOneProject(projectId))
    }, [dispatch, projectId])

    if (Object.values(rewardObj).length == 0) return null;
    if (!project) return null;

    const rewards = Object.values(rewardObj);
    console.log("🚀 ~ RewardList ~ rewards:", rewards)
    console.log("🚀 ~ RewardList ~ project:", project)

    if (user) {
        const userId = user.id
        isOwner = project.owner.id === userId
    }
    
    return (
        <div>
            <div className='rewards-titles'>
                {
                    user && isOwner?
                        (
                            <>
                            <h1>Manage Your Rewards</h1>
                            <button onClick={() => navigate(`/projects/${projectId}/rewards/new`)}>Create a New Reward</button>
                            </>
                        ):
                        (   
                            <>
                            <h1>Select your reward</h1>
                            <p>Clicke to select an option below</p>
                            </>
                        )
                }
                
            </div>
            <div>
                {
                    rewards.map(reward => (
                        <RewardListItem 
                        key={reward.id} 
                        reward={reward} 
                        project={project}
                        isActive={activeRewardId === reward.id}
                        onRewardClick={() => setActiveRewardId(reward.id)}
                        isOwner = {isOwner}
                        />
                    ))
                }
            </div>
            
        </div>
    )
}

export default RewardList