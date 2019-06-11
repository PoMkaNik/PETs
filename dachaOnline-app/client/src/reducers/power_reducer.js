import { POWER_FETCH } from "../actions/types";

export default function(state = {}, action) {
	switch (action.type) {
		case POWER_FETCH:
			return { ...state, data: action.payload };
		default:
			return state;
	}
}
