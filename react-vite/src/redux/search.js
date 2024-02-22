const GET_SEARCHED_PROJECTS = 'search/GET_SEARCHED_PROJECTS'
const CLEAR_SEARCH = 'search/CLEAR_SEARCH'

const getSearchedProjects = (projects) => ({
  type: GET_SEARCHED_PROJECTS,
  projects
})

export const clearSearch = () => ({
  type: CLEAR_SEARCH
})

export const thunkSearchProjects = (searchValue) => async dispatch => {
  const res = await fetch(`/api/projects?search=${searchValue}`)

  if (res.ok) {
    const projects = await res.json()
    dispatch(getSearchedProjects(projects))
    return projects
  } else {
    const errors = await res.json()
    console.log(errors)
    return errors
  }
}

const initialState = {}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCHED_PROJECTS: {
      const newState = {}
      action.projects.forEach(project => {
        newState[project.id] = project
      })
      return newState
    }
    case CLEAR_SEARCH: {
      return initialState;
    }
    default:
      return state
  }

}

export default searchReducer