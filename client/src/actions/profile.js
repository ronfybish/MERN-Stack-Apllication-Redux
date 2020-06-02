import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR, CREATE_OR_UPDATE_PROFILE } from './types';

export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/me');
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

export const createProfile = (
	formData,
	history,
	edit = false
) => async dispatch => {
	try {
		const res = await axios.post('/api/profile', formData);

		dispatch({
			type: CREATE_OR_UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(
			setAlert( 'Profile Updated' , 'success')
		);

		
			history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};
