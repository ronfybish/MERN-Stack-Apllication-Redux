import { setAlert } from '../actions/alert';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	AUTH_ERROR,
	USER_LOADED,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
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
		dispatch(loadUser());
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
	if (localStorage.token) setAuthToken(localStorage.token);
	try {
		const res = await axios.get('/api/auth/loaduser');
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

export const login = (email, password) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({ email, password });
	try {
		const res = await axios.post('/api/auth/login', body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

export const logout = () => dispatch => {
	dispatch({ type: LOGOUT });
};
