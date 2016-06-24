'use strict';

exports.hasAuthorization = function(req, res, next) {
  console.log("Is admin? \t", req.user.isAdmin);
	if (!req.user.isAdmin) {
		return res.status(403).json({error: true, message: 'You are not authorized to perform this action.'});
	}
	next();
};
