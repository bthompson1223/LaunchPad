// action type
const RETURN_INITIAL = "projects/RETURN_INITIAL";
const GET_REWARDS = "rewards/GET_REWARDS"
const CREATE_REWARD = "rewards/CREATE_REWARD"
const DELETE_REWARD = "rewards/DELETE_REWARD"

// action creator
const getRewards = (rewards) => ({
    type: GET_REWARDS,
    rewards
})

const createReward = (reward) => ({
    type: CREATE_REWARD,
    reward
})

const deleteReward = (rewardId) => ({
    type: DELETE_REWARD,
    rewardId
})

export const returnInitial = () => {
    return {
      type: RETURN_INITIAL,
    };
  };

// thunk - get rewards
export const thunkGetRewards = (projectId) => async (dispatch) => {
    const res = await fetch(`/api/projects/${projectId}/rewards`)
    
    if (res.ok) {
        const rewards = await res.json();
        dispatch(getRewards(rewards));
      } else {
        const errs = await res.json();
        return errs;
      }
}

// thunk - create a reward for a project
export const thunkCreateReward = (formData, projectId) => async (dispatch) => {
    const res = await fetch(`/api/projects/${projectId}/rewards`, {
        method: "POST",
        body: formData
    });

    if (res.ok) {
        const reward = await res.json();
        dispatch(createReward(reward))
        console.log("🚀 ~ thunkCreateReward ~ reward:", reward)
        return reward
    } else {
        const errs = await res.json();
        return errs;
    }
 }

 // thunk - Delete a reward
 export const thunkDeleteReward = (rewardId) => async (dispatch) => {
    const res = await fetch(`/api/rewards/${rewardId}`, {
        method: "DELETE"
    })

    console.log("🚀 ~ thunkDeleteReward ~ reward:", `inside thunk delete reward with id of  ${rewardId}`)

    if (res.ok) {
        dispatch(deleteReward(rewardId))
        return rewardId
    } else {
        const errs = await res.json();
        return errs;
    }
 } 

const initialState = {}

function rewardReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REWARDS: {
            const newState = { ...state }
            action.rewards.forEach(reward => {
                newState[reward.id] = reward
            })
            return newState;
        }
        case CREATE_REWARD: {
            const newState = { ...state }
            newState[action.reward.id] = action.reward
            return newState;
        }
        case DELETE_REWARD: {
            const newState = { ...state };
            delete newState[action.rewardId];
            return newState;
          }
        case RETURN_INITIAL: {
            return initialState;
        }
        default:
            return state;
    }
}

export default rewardReducer