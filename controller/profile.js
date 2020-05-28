const Profile = require('../models/Profile');
const User = require('../models/User');
const normalize = require('normalize-url');
const { validationResult } = require('express-validator');

module.exports = {
	getProfile: async (req, res) => {
		try {
			const profile = await Profile.findOne({
				user: req.user.id,
			}).populate('user', ['name', 'avatar']);

			if (!profile) {
				return res
					.status(400)
					.json({ msg: 'There is no profile for this user' });
			}

			res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				errors: [{ msg: 'Error Server **getUserProfile**' }],
			});
		}
	},

	createOrUpdateProfile: async (req, res) => {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook
    } = req.body;

    const profileFields = {
      user: req.user.id,
      company,
      location,
      website: website && website !== '' ? normalize(website, { forceHttps: true }) : '',
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      status,
      githubusername
    };

    // Build social object and add to profileFields
    const socialfields = { youtube, twitter, instagram, linkedin, facebook };

    for (const [key, value] of Object.entries(socialfields)) {
      if (value && value.length > 0)
        socialfields[key] = normalize(value, { forceHttps: true });
    }
    profileFields.social = socialfields;
		try {
			let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, upsert: true }
              );
              res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				errors: [{ msg: 'Error Server **createOrUpdateProfile**' }],
			});
		}
	},
};
