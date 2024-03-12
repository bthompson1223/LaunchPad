import { setPaginationData } from "./pagination";

const GET_PROJECTS = "projects/GET_PROJECTS";
const RETURN_INITIAL = "projects/RETURN_INITIAL";
const GET_ONE_PROJECT = "projects/GET_ONE_PROJECT";
const DELETE_PROJECT = "projects/DELETE_PROJECT";
const CREATE_PROJECT = "projects/CREATE_PROJECT";
const UPDATE_PROJECT = "projects/UPDATE_PROJECT";


export const returnInitial = () => {
  return {
    type: RETURN_INITIAL,
  };
};

const getProjects = (projects) => {
  return {
    type: GET_PROJECTS,
    projects,
  };
};

const getOneProject = (project) => ({
  type: GET_ONE_PROJECT,
  project,
});

const deleteProject = (projectId) => ({
  type: DELETE_PROJECT,
  projectId,
});

const createProject = (project) => ({
  type: CREATE_PROJECT,
  project,
});

const updateProject = (project) => ({
  type: UPDATE_PROJECT,
  project,
});


export const thunkGetCategoryProjects = (category, page, perPage) => async (dispatch) => {
  page = page || 1;
  perPage = perPage || 20;
  const res = await fetch(`/api/projects?category=${category}&page=${page}&per_page=${perPage}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getProjects(data.projects));
    dispatch(setPaginationData(data.pagination))
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkGetOneProject = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}`);

  if (res.ok) {
    const project = await res.json();
    dispatch(getOneProject(project));
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkDeleteProject = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteProject(projectId));
    return projectId;
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkCreateProject = (formData) => async (dispatch) => {
  const res = await fetch("/api/projects/", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    const project = await res.json();
    dispatch(createProject(project));
    return project;
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkUpdateProject = (formData, projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}`, {
    method: "PUT",
    body: formData,
  });

  if (res.ok) {
    const project = await res.json();
    dispatch(updateProject(project));
    return project;
  } else {
    const errs = await res.json();
    return errs;
  }
};

const initialState = {};

function projectReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS: {
      const newState = { ...state };
      action.projects.forEach((project) => {
        newState[project.id] = project;
      });
      return newState;
    }
    case GET_ONE_PROJECT: {
      return { ...state, [action.project.id]: action.project };
    }
    case RETURN_INITIAL: {
      return initialState;
    }
    case DELETE_PROJECT: {
      const newState = { ...state };
      delete newState[action.projectId];
      return newState;
    }
    case CREATE_PROJECT: {
      const newState = { ...state };
      newState[action.project.id] = action.project;
      return newState;
    }
    case UPDATE_PROJECT: {
      const newState = { ...state };
      newState[action.project.id] = action.project;
      return newState;
    }
    default:
      return state;
  }
}

export default projectReducer;
