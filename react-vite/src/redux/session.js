const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const USER_PROJECTS = "session/userProjects";
const CLEAR_USER_PROJECTS = "session/clearUserProjects";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const userProjects = (projects) => ({
  type: USER_PROJECTS,
  projects,
});

export const clearUserProjects = () => ({
  type: CLEAR_USER_PROJECTS,
});

export const thunkAuthenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(setUser(data));
  }
};

export const thunkLogin = (credentials) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkSignup = (formData) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: formData
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

export const thunkUserProjects = () => async (dispatch) => {
  const res = await fetch("/api/projects/created-projects");

  if (res.ok) {
    const projects = await res.json();
    dispatch(userProjects(projects));
  } else {
    const errs = res.json();
    return errs;
  }
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case USER_PROJECTS: {
      const newState = { ...state };
      newState.user.projects = {};
      for (let project of action.projects) {
        newState.user.projects[project.id] = project;
      }
      return newState;
    }
    case CLEAR_USER_PROJECTS: {
      const newState = { ...state };
      delete newState.user.projects
      return newState;
    }
    default:
      return state;
  }
}

export default sessionReducer;
