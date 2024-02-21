// action type
const ADD_BACKING = "backings/ADD_BACKING"
const GET_BACKINGS = "backings/GET_BACKINGS"
const CLEAR_BACKINGS = 'backings/CLEAR_BACKINGS'
const DELETE_BACKING = 'backings/DELETE_BACKING'

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

const deleteBacking = (backingId) => ({
  type: DELETE_BACKING,
  backingId
})

// thunk - add backer to a reward
export const thunkAddBacking = (rewardId) => async (dispatch) => {
  const res = await fetch(`/api/rewards/${rewardId}/backing`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: null
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

export const thunkDeleteBacking = (backingId, rewardId) => async (dispatch) => {
  const res = await fetch(`/api/rewards/${rewardId}/backing/${backingId}`, {
    method: "DELETE"
  })

  if (res.ok) {
    const message = await res.json();
    dispatch(deleteBacking(backingId))
    return message
  } else {
    const errs = await res.json()
    return errs
  }
}

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
    case DELETE_BACKING: {
      const newState = { ...state }
      delete newState[action.backingId]
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