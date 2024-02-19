const GET_PROJECTS = "projects/GET_PROJECTS";
const RETURN_INITIAL = "projects/RETURN_INITIAL";

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
        case RETURN_INITIAL: {
            return initialState;
        }
        default:
            return state;
    }
}

export default projectReducer