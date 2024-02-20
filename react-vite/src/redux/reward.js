// action type
const GET_REWARDS = "rewards/GET_REWARDS"

// action creator
const getRewards = (rewards) => ({
    type: GET_REWARDS,
    rewards
})

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
        default:
            return state;
    }
}

export default rewardReducer