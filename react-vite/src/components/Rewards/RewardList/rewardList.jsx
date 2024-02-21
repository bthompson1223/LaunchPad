import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetRewards} from '../../../redux/reward'
import { useParams } from 'react-router-dom';
import RewardListItem from '../RewardListItem/rewardListItem';
import { thunkGetOneProject } from '../../../redux/project';


const RewardList =  () => {
    const dispatch = useDispatch();
    const {projectId} = useParams(); 
    const rewardObj = useSelector(state => state.rewards);
    const project = useSelector(state => state.projects[projectId]);
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
    
    return (
        <div>
            <div className='rewards-titles'>
                <h1>Select your reward</h1>
                <p>select and option below</p>
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
                        />
                    ))
                }
            </div>
            
        </div>
    )
}

export default RewardList