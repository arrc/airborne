'use strict';

angular.module('Airborne').config(['$stateProvider', function($stateProvider){
  $stateProvider
  $stateProvider
  .state('admin', {
    url: '/admin',
    templateUrl: 'app/views/admin/dashboard.html',
    abstract: true
  })
  .state('admin.users', {
    url: '/users',
    templateUrl: 'app/views/admin/admin.users.html'
  })
  .state('admin.editor', { // EDITOR
    url: '/editor',
    abstract: true,
    template: '<ui-view/>',
    // templateUrl: 'app/views/admin/admin.editor.html'
  })
  .state('admin.editor.list', { // LIST
    url: '/list',
    templateUrl: 'app/views/admin/editor/editor.list.html'
  })
  .state('admin.editor.create', { // CREATE
    url: '/create',
    templateUrl: 'app/views/admin/editor/editor.create.html'
  })
  .state('admin.editor.edit', { // EDIT
    url: '/edit',
    templateUrl: 'app/views/admin/editor/editor.edit.html'
  })
  .state('admin.spam', { // SPAM
    url: '/spams',
    templateUrl: 'app/views/admin/admin.spams.html'
  })
  .state('admin.report', { // REPORT
    url: '/reports',
    templateUrl: 'app/views/admin/admin.reports.html'
  });
}]);
