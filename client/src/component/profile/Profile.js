import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';

const Profile = ({
	getProfileById,
	profile: { profile },
	auth: { isAuthenticated, loading, user },
	match,
}) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);

	return (
		<Fragment>
			{profile == null ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/profiles' className='btn btn-light'>
						Back To Profiles
					</Link>
					{isAuthenticated &&
						loading === false &&
						user._id === profile.user._id && (
							<Link to='/edit-profile' className='btn btn-dark'>
								Edit Profile
							</Link>
						)}
					<div className='profile-grid my-1'>
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
					</div>
				</Fragment>
			)}
			;
		</Fragment>
	);
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
