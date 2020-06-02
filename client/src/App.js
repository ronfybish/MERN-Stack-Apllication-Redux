import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Alert from './component/layout/Alert';
import Dashboard from './component/dashboard/Dashboard';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './utils/PrivateRoute';
import CreateProfile from './component/profile-forms/CreateProfile'
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import NotFound from './component/layout/NotFound';
import store from './store';
import './App.css';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}
const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route
								exact
								path='/register'
								component={Register}
							/>
							<Route exact path='/login' component={Login} />
							<PrivateRoute
								exact
								path='/dashboard'
								component={Dashboard}
							/>
							<PrivateRoute
								exact
								path='/create-profile'
								component={CreateProfile}
							/>
							<Route component={NotFound} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
