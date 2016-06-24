'use strict';

module.exports = function(app){
	var main = require('./controllers/main.controller.js');
	var user = require('./controllers/user.controller.js');
	var editor = require('./controllers/admin.editor.controller');

	// 'CORE' ----------------------------
	app.route('/').get(main.index);

	// 'USER'
	app.route('/login').post(user.login);
	app.route('/signup').post(user.signup);
	app.route('/api/profile').get(user.profile);

	// 'ADMIN'
  app.route('/api/admin/editor').post(editor.createCamp);
  app.route('/api/admin/editor').get(editor.retriveCamps);
  app.route('/api/admin/editor/:airCraftId').get(editor.retriveCamp);
  app.route('/api/admin/editor/:airCraftId').put(editor.updateCamp);
  app.route('/api/admin/editor/:airCraftId').delete(editor.deletCamp);
  app.param('airCraftId', editor.airCraftId);


};
