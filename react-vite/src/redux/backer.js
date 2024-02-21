// action type
const ADD_BACKER = "backers/ADD_BACKER"
const GET_BACKINGS = "backers/GET_BACKINGS"

// action creator
const addBacker = (backer) => ({
    type: ADD_BACKER,
    backer
})

const getBackings = (backings) => ({
  type: GET_BACKINGS,
  backings
}) 

// thunk - add backer to a reward
export const thunkAddBacker = (rewardId) => async (dispatch) => {
    const res = await fetch(`/api/rewards/${rewardId}`, {
      method: "POST"
    })

    if (res.ok) {
        const backer = await res.json();
        dispatch(addBacker(backer));
      } else {
        const errs = await res.json();
        return errs;
      }
} 

export const thunkGetBackings = () => async (dispatch) => {
  const res = await fetch(`/api/rewards/`)
}

const initialState = {}

export const 