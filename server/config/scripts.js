'use strict';

module.exports = [
  'app/app.js',
  // services
  'app/services/auth.service.js',
  'app/services/auth.interceptor.js',
  'app/services/user.service.js',
  'app/services/admin.editor.service.js',
  'app/services/aircraft.service.js',
  // controllers
  'app/controllers/home.ctrl.js',
  'app/controllers/user.ctrl.js',
  'app/controllers/admin.ctrl.js',
  'app/controllers/admin.editor.ctrl.js',
  'app/controllers/aircraft.ctrl.js',
  // routes
  'app/routes/user.route.js',
  'app/routes/admin.route.js',
  'app/routes/aircraft.route.js',
];
