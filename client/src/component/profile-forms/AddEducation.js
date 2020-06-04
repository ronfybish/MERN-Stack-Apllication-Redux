import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const AddEducation = () => {
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	return (
		<Fragment>
			<h1 className='large text-primary'>Add Your Education</h1>
			<p className='lead'>
				<i className='fas fa-code-branch' /> Add any school or bootcamp
				that you have attended
			</p>
			<small>* = required field</small>
			<form className='form'>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* School or Bootcamp'
						name='school'
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Degree or Certificate'
						name='degree'
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Field of Study'
						name='fieldofstudy'
					/>
				</div>
				<div className='form-group'>
					<h4>From Date</h4>
					<input type='date' name='from' />
				</div>
				<div className='form-group'>
					<p>
						<input type='checkbox' name='current' /> Current School
					</p>
				</div>
				<div className='form-group'>
					<h4>To Date</h4>
					<input type='date' name='to' />
				</div>
				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Program Description'
					/>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

export default AddEducation;
