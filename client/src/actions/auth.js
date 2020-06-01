import { setAlert } from '../actions/alert';
import axios from 'axios';

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	AUTH_ERROR,
	USER_LOADED,
} from '../actions/types';

export const register = ({ name, email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({ name, email, password });
	try {
		const res = await axios.post('/api/auth/signup', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		axios.defaults.headers.common['Authorization'] = localStorage.token;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}

	try {
        const res =await axios.get('/api/auth');
        console.log(res.data)
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
	} catch (error) {
        console.error(error)
        dispatch({
            type:AUTH_ERROR
        })
    }
};
