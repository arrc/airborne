'use strict';

module.exports = function(app){
	var main = require('./controllers/main.controller.js');
	var user = require('./controllers/user.controller.js');
	var admin = require('./controllers/admin.controller');
	var aircraft = require('./controllers/aircraft.controller');
	var gallery = require('./controllers/gallery.controller');
	var editor = require('./controllers/admin.editor.controller');

	// 'CORE' ----------------------------
	app.route('/').get(main.index);

	// 'USER'
	app.route('/login').post(user.login);
	app.route('/signup').post(user.signup);
	app.route('/api/profile').get(user.profile);

	// 'AIRCRAFT'
	app.route('/api/aircrafts').get(aircraft.getAircrafts);
	app.route('/api/aircrafts/search').get(aircraft.searchAircrafts);
	app.route('/api/aircrafts/:airCraftId').get(aircraft.getAircraft);
	app.route('/api/aircrafts/:airCraftId').put(aircraft.favAircraft);
	app.param('airCraftId', aircraft.airCraftId);

	// 'GALLERY'
	app.route('/api/gallery/constants').get(gallery.constants);
	app.route('/api/gallery').get(gallery.retriveImages);
	app.route('/api/gallery').post(gallery.uploadImage);
	app.route('/api/gallery/:slug').get(gallery.retriveImage);
	app.param('slug', gallery.getBySlug);

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
