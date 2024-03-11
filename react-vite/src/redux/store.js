import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import projectReducer from "./project";
import rewardReducer from "./reward";
import commentReducer from "./comments";
import backingsReducer from "./backings";
import likesReducer from "./likes";
import PaginationReducer from "./pagination";

const rootReducer = combineReducers({
  session: sessionReducer,
  projects: projectReducer,
  rewards: rewardReducer,
  comments: commentReducer,
  backings: backingsReducer,
  likes: likesReducer,
  pagination: PaginationReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
