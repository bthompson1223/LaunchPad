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
