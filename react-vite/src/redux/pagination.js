const SET_PAGINATION_DATA = "projects/SET_PAGINATION_DATA";
const CLEAR_PAGINATION = 'projects/CLEAR_PAGINATION';

export const clearPagination = () => ({
  type: CLEAR_PAGINATION
});


export const setPaginationData = (data) => ({
  type: SET_PAGINATION_DATA,
  data
})

const initialState = {};

const PaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGINATION_DATA: {
      return {...action.data}
    }
    case CLEAR_PAGINATION: {
      return initialState
    }
    default:
      return state;
  }
};

export default PaginationReducer;