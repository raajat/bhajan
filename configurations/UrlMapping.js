	module.exports = function (app) {
		var controllers = app.controllers,
			views = app.views;

		return {
			"/api/v1/bhajan/user/get/songs_list/:skip/:limit": [{
					 method: "GET",
					 action: controllers.userController.getSongsList,
					 views: {
							 json: views.jsonView
					 }
			 }
		 ],
			"/api/v1/bhajan/user/upload/song": [{
					 method: "POST",
					 action: controllers.userController.uploadSong,
					 middleware:[multipartMiddleware],
					 views: {
							 json: views.jsonView
					 }
			 }
		 ],
			"/api/v1/userapi/removeAction": [{
								 method: "POST",
								 action: controllers.roleManagement.removeAction,
								 middleware: [configurationHolder.actionSecurity.extractAction(), configurationHolder.actionSecurity.authority()],
								 views: {
										 json: views.jsonView
								 }
			 }
		 ],
			"/api/v1/userapi/user": [{
					method: "POST",
					action: controllers.userController.createUser,
						middleware: [ configurationHolder.actionSecurity.extractAction(),configurationHolder.actionSecurity.authority()],
					views: {
						json: views.jsonView
					}
				}
			],
             "/api/v1/userapi/logout": [{
	                method: "GET",
	                action: controllers.authenticationController.logoutAction,
	               	middleware: [ configurationHolder.actionSecurity.extractAction(),configurationHolder.actionSecurity.authority()],
	                views: {
	                    json: views.jsonView
	                }
				}
			],
             "/api/v1/userapi/login": [{
	                method: "POST",
	                action: controllers.authenticationController.loginAction,
	               	middleware: [ configurationHolder.actionSecurity.extractAction(),configurationHolder.actionSecurity.authority()],
	                views: {
	                    json: views.jsonView
	                }
				}
			],
             "/api/v1/userapi/user/:id": [{
	                method: "GET",
	                action: controllers.userController.getUser,
	                middleware: [],
	                views: {
	                    json: views.jsonView
	                }
				},
	            {
	                method: "PUT",
	                action: controllers.userController.updateUser,
	                middleware: [],
	                views: {
	                    json: views.jsonView
	                }
				},
	            {
	                method: "delete",
	                action: controllers.userController.deleteUser,
	                middleware: [],
	                views: {
	                    json: views.jsonView
	                }
				}
			],

			"/api/v1/userapi/users": [{
					method: "GET",
					action: controllers.userController.searchUser,
						middleware: [ configurationHolder.actionSecurity.extractAction(),configurationHolder.actionSecurity.authority()],
					views: {
						json: views.jsonView
					}
				}
			]

		};
	};
