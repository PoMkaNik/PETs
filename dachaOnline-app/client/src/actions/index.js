import axios from "axios";
import { POWER_FETCH } from "./types";

const ROOT_URL = "http://localhost:3030";
const power_API_URL = `${ROOT_URL}/dacha/api/power`;

export function fetchPowerData() {
	return function(dispatch) {
		axios
			.get(power_API_URL)
			.then(response => {
				dispatch({ type: POWER_FETCH, payload: response.data });
			})
			.catch(error => dispatch({ type: POWER_FETCH, payload: error.response }));
	};
}
