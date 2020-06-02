import React, { useEffect } from 'react';
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';

const Dashboard = ({ profile, auth, getCurrentProfile }) => {
	useEffect(() => {
		getCurrentProfile();
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<h1>Dashboard</h1>{' '}
		</div>
	);
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
