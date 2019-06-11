import { combineReducers } from "redux";
import powerReducer from "./power_reducer";

const rootReducer = combineReducers({
	power: powerReducer
});

export default rootReducer;
