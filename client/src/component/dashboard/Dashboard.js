import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<div className='my-2'>
						<button className='btn btn-danger'>
							<i className='fas fa-user-minus' /> Delete My
							Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>
						You have not yet setup a profile, please add some info
					</p>
					<Link to='/edit-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
