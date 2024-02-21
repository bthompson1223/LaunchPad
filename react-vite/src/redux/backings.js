// action type
const ADD_BACKING = "backings/ADD_BACKING"
const GET_BACKINGS = "backings/GET_BACKINGS"
const CLEAR_BACKINGS = 'backings/CLEAR_BACKINGS'
const REMOVE_BACKING = 'backings/REMOVE_BACKING'

// action creator
const addBacking = (backing) => ({
    type: ADD_BACKING,
    backing
})

const getBackings = (backings) => ({
  type: GET_BACKINGS,
  backings
}) 

export const clearBackings = () => ({
  type: CLEAR_BACKINGS
})

const removeBacking = (backingId) => ({
  type: REMOVE_BACKING,
  backingId
})

// thunk - add backer to a reward
export const thunkAddBacking = (rewardId) => async (dispatch) => {
    const res = await fetch(`/api/rewards/${rewardId}`, {
      method: "POST"
    })

    if (res.ok) {
        const backing = await res.json();
        dispatch(addBacking(backing));
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

// export const thunkRemoveBacking = (backingId) => async (dispatch) => {
//   const res = await fetch(`/api/rewards/${rewardId}/`)
// }

const initialState = {}

const backingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BACKING: {
      const newState = { ...state }
      newState[action.backing.id] = action.backing
      return newState
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