// action type
const ADD_BACKER = "backers/ADD_BACKER"

// action creator
const addBacker = (backer) => {
    type: ADD_BACKER,
    backer
}

// thunk - add backer to a reward
export const thunkAddBacker = (rewardId) => async (dispatch) => {
    const res = await fetch(`/api/rewards/${rewardId}`)

    if (res.ok) {
        const rewards = await res.json();
        dispatch(getRewards(rewards));
      } else {
        const errs = await res.json();
        return errs;
      }
} 