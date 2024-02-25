// action type
const RETURN_INITIAL = "projects/RETURN_INITIAL";
const GET_REWARDS = "rewards/GET_REWARDS";
const GET_ONE_REWARD = "rewards/GET_ONE_REWARDS";
const CREATE_REWARD = "rewards/CREATE_REWARD";
const DELETE_REWARD = "rewards/DELETE_REWARD";
const UPDATE_REWARD = "rewards/UPDATE_REWARD";

// action creator
const getRewards = (rewards) => ({
  type: GET_REWARDS,
  rewards,
});

const getOneReward = (reward) => ({
  type: GET_ONE_REWARD,
  reward,
});

const createReward = (reward) => ({
  type: CREATE_REWARD,
  reward,
});

const deleteReward = (rewardId) => ({
  type: DELETE_REWARD,
  rewardId,
});

const updateReward = (reward) => ({
  type: UPDATE_REWARD,
  reward,
});

export const returnInitial = () => {
  return {
    type: RETURN_INITIAL,
  };
};

// thunk - get rewards
export const thunkGetRewards = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}/rewards`);

  if (res.ok) {
    const rewards = await res.json();
    dispatch(getRewards(rewards));
  } else {
    const errs = await res.json();
    return errs;
  }
};

// thunk - get one reward
export const thunkGetOneReward = (rewardId) => async (dispatch) => {
  const res = await fetch(`/api/rewards/${rewardId}`);

  if (res.ok) {
    const reward = await res.json();
    dispatch(getOneReward(reward));
  } else {
    const errs = await res.json();
    return errs;
  }
};

// thunk - create a reward for a project
export const thunkCreateReward = (formData, projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}/rewards`, {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    const reward = await res.json();
    dispatch(createReward(reward));
    return reward;
  } else {
    const errs = await res.json();
    return errs;
  }
};

// thunk - Delete a reward
export const thunkDeleteReward = (rewardId) => async (dispatch) => {
  const res = await fetch(`/api/rewards/${rewardId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteReward(rewardId));
    return rewardId;
  } else {
    const errs = await res.json();
    return errs;
  }
};

// thunk - update a reward
export const thunkUpdateReward = (formData, rewardId) => async (dispatch) => {
  console.log("🚀 ~ thunkUpdateReward ~ :", "inside reward thunk function" )
  const res = await fetch(`/api/rewards/${rewardId}`, {
    method: "PUT",
    
    body: formData,
  });

  if (res.ok) {
    const reward = await res.json();
    dispatch(updateReward(reward));
    return reward;
  } else {
    const errs = await res.json();
    return errs;
  }
};

const initialState = {};

function rewardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REWARDS: {
      const newState = { ...state };
      if (action.rewards) {
        action.rewards.forEach((reward) => {
          newState[reward.id] = reward;
        });
      }
      return newState;
    }
    case GET_ONE_REWARD: {
      return { ...state, [action.reward.id]: action.reward };
    }
    case CREATE_REWARD: {
      const newState = { ...state };
      newState[action.reward.id] = action.reward;
      return newState;
    }
    case DELETE_REWARD: {
      const newState = { ...state };
      delete newState[action.rewardId];
      return newState;
    }
    case UPDATE_REWARD: {
      const newState = { ...state };
      newState[action.reward.id] = action.reward;
      return newState;
    }
    case RETURN_INITIAL: {
      return initialState;
    }
    default:
      return state;
  }
}

export default rewardReducer;
