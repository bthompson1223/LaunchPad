const GET_PROJECTS = "projects/GET_PROJECTS";
const RETURN_INITIAL = "projects/RETURN_INITIAL";
const GET_ONE_PROJECT = "projects/GET_ONE_PROJECT";
const DELETE_PROJECT = 'projects/DELETE_PROJECT';

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
    project
})

const deleteProject = (projectId) => ({
  type: DELETE_PROJECT,
  projectId
})

export const thunkGetCategoryProjects = (category) => async (dispatch) => {
  let res;
  if (category == "all") {
    res = await fetch("/api/projects");
  } else {
    res = await fetch(`/api/projects/${category}`);
  }

  if (res.ok) {
    const projects = await res.json();
    dispatch(getProjects(projects));
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkGetOneProject = (projectId) => async (dispatch) => {
    const res = await fetch(`/api/projects/${projectId}`)

    if (res.ok) {
        const project = await res.json();
        dispatch(getOneProject(project));
      } else {
        const errs = await res.json();
        return errs;
      }
}

export const thunkDeleteProject = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}`, {
    method: "DELETE"
  })

  if (res.ok) {
    dispatch(deleteProject(projectId));
    return projectId
  } else {
    const errs = await res.json();
        return errs;
  }
}

const initialState = {}

function projectReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS: {
            const newState = { ...state }
            action.projects.forEach(project => {
                newState[project.id] = project
            })
            return newState;
        }
        case GET_ONE_PROJECT: {
            return { ...state, [action.project.id]: action.project}
        }
        case RETURN_INITIAL: {
            return initialState;
        }
        case DELETE_PROJECT: {
          const newState = {...state}
          delete newState[action.projectId]
          return newState;
        }
        default:
            return state;
    }
}

export default projectReducer