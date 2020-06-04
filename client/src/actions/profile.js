import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

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

export const createOrUpdateProfile = (
	formData,
	history,
	edit = false
) => async dispatch => {
	try {
		const res = await axios.post('/api/profile', formData);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Profile Updated', 'success'));

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

export const addExperience = (formData, history) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.put(
			'/api/profile/experience',
			formData,
			config
		);
		
		dispatch = ({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert('Experience Successfuly Added', 'success'));
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

export const deleteExperience=id=>async dispatch=>{
	try {
		const res=await axios.delete(`api/profile/experience/${id}`)
		dispatch({
			type:UPDATE_PROFILE,
			payload:res.data
		})
		dispatch(setAlert('Education Removed', 'success'));
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
}