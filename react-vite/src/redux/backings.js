// action type
const ADD_BACKER = "backers/ADD_BACKER"
const GET_BACKINGS = "backers/GET_BACKINGS"
const CLEAR_BACKINGS = 'backers/CLEAR_BACKINGS'

// action creator
const addBacker = (backer) => ({
    type: ADD_BACKER,
    backer
})

const getBackings = (backings) => ({
  type: GET_BACKINGS,
  backings
}) 

export const clearBackings = () => ({
  type: CLEAR_BACKINGS
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
  const res = await fetch(`/api/projects/backed-projects`)

  if (res.ok) {
    const backings = await res.json();
    dispatch(getBackings(backings))
    return backings
  } else {
    const errs = await res.json()
    return errs
  }
}

const initialState = {}

const backingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BACKER: {
      // NOT YET IMPLEMENTED
      return state
    }
    case GET_BACKINGS: {
      const newState = { ...state }
      action.backings.forEach(backing => {
        newState[backing.id] = backing
      })
      return newState
    }
    case CLEAR_BACKINGS: {
      return initialState
    }
    default:
      return state
  }
}

export default backingsReducer;