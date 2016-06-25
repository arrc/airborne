'use strict';

module.exports = function(app){
	var main = require('./controllers/main.controller.js');
	var user = require('./controllers/user.controller.js');
	var admin = require('./controllers/admin.controller');
	var editor = require('./controllers/admin.editor.controller');

	// 'CORE' ----------------------------
	app.route('/').get(main.index);

	// 'USER'
	app.route('/login').post(user.login);
	app.route('/signup').post(user.signup);
	app.route('/api/profile').get(user.profile);

	// ADMIN
	app.use('/api/admin', admin.hasAuthorization);

	// 'EDITOR'
	app.route('/api/admin/editor/constants').get(editor.constants);
  app.route('/api/admin/editor').post(editor.createAircraft);
  app.route('/api/admin/editor').get(editor.retriveAircrafts);
  app.route('/api/admin/editor/:airCraftId').get(editor.retriveAircraft);
  app.route('/api/admin/editor/:airCraftId').put(editor.updateAircraft);
  app.route('/api/admin/editor/:airCraftId').delete(editor.deleteAircraft);
  app.param('airCraftId', editor.airCraftId);
};
