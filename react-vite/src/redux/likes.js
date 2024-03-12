const GET_LIKES = "likes/GET_LIKES";
const DELETE_LIKE = "likes/DELETE_LIKE";
const ADD_LIKE = "likes/ADD_LIKE";

const getLikes = () => {
  return {
    type: GET_LIKES,
  };
};

const deleteLike = (likeId) => {
  return {
    type: DELETE_LIKE,
    likeId,
  };
};

const addLike = (likeObj) => {
  return {
    type: ADD_LIKE,
    likeObj,
  };
};

export const thunkGetLikes = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}/likes`);

  if (res.ok) {
    dispatch(getLikes());
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkDeleteLike = (projectId, likeId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}/likes/${likeId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteLike(likeId));
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkAddLike = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}/likes`, {
    method: "POST",
  });

  if (res.ok) {
    const like = await res.json();
    dispatch(addLike(like));
  } else {
    const errs = await res.json();
    return errs;
  }
};

const initialState = {};

function likesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIKES: {
      return {
        ...state,
      };
    }
    case DELETE_LIKE: {
      const newState = { ...state };
      delete newState[action.likeId];
      return newState;
    }
    case ADD_LIKE: {
      return {
        ...state,
        [action.likeObj.id]: action.likeObj,
      };
    }
    default:
      return state;
  }
}

export default likesReducer;
