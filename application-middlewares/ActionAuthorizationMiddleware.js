/*
 * @author Abhimanyu
 * This module is for the authorization process . Called as middleware function to decide whether user have enough authority to access the
 *
 */
var async = require('async')

module.exports.ActionAuthorizationMiddleware = (function () {

    /*
     *  Verify user is authorized to access the functionality or not
     */
    var verifyIsActionInAccessLevel = function (next, results, res, req) {
        console.log("role--->", results.authorizationTokenObject.Roletype);
            var authorized = false

            domain.Role.findOne({
                RoleType: results.authorizationTokenObject.Roletype,
                Action: {
                            $in: [req.body.action]
                        }
            }, function (err, roleObject) {
                //   console.log("roleObject",roleObject,results.authorizationTokenObject.Roletype,err);
               //var action=""
                if (!roleObject) {
                       console.log("hh")
                    configurationHolder.ResponseUtil.responseHandler(res, null, configurationHolder.errorMessage.ActionfailedAuthorization, true, 401)


                } else {


                            domain.User.findOne({
                                _id: results.authorizationTokenObject.user
                            }, function (err, userObject) {
                                if (userObject) {

                                    authorized = true
                                    //console.log("req.userObject "+userObject);
                                    req.loggedInUser = userObject
                                    req.body.createdId = results.authorizationTokenObject.user
                                    next(results, authorized)
                                } else {

                                    configurationHolder.ResponseUtil.responseHandler(res, null, configurationHolder.errorMessage.failedAuthorization, true, 401)
                                }
                            })

                        }

                    })
                }

      var verifyIsActionInAccessLevelForAnyomous = function ( res, req,next) {
       console.log("inside access in anyomous")
            var authorized = false

            domain.Role.findOne({
                RoleType: 'ROLE_ANYNONUS',
                Action: {
                            $in: [req.body.action]
                        }
            }, function (err, roleObject) {
                //   console.log("roleObject",roleObject,results.authorizationTokenObject.Roletype,err);
               //var action=""
                if (!roleObject) {
                       console.log("hh")
                    configurationHolder.ResponseUtil.responseHandler(res, null, configurationHolder.errorMessage.ActionfailedAuthorization, true, 401)


                } else {


                            authorized = true
                                  Logger.info("api for anonymus user");
                                    req.loggedInUser = null
                                 //   req.body.createdId = results.authorizationTokenObject.user
                                    next()

                        }

                    })
                }

        /*
         * find User and its role using authenticationToken.
         */
    var findWeightByAuthToken = function (next, results, req, res, authToken) {

        console.log("req.action"+req.body.action);
        domain.AuthenticationToken.findOne({
            authToken: authToken
        }, function (err, authObj) {
            if (err || authObj == null) {

                configurationHolder.ResponseUtil.responseHandler(res, null, configurationHolder.errorMessage.failedAuthorization, true, 401)
            } else {
                next(null, authObj)
            }
        })
    }

    /*
     *  call as middleware to decide the accessiblity of the function for the loggedIn user
     *  find user by AuthenticationToken
     *  Decide based on the role of user and accesslevel whether user is authorized or not
     */
    var authority = function () {
        return function (req, res, next) {

            var authToken = req.get("X-Auth-Token")
            if (authToken == null) {
                 verifyIsActionInAccessLevelForAnyomous(res, req,next)
                Logger.info("executed in accesslevel ")
                req.loggedInUser = null
             //   next()
            } else {

                async.auto({
                    authorizationTokenObject: function (next, results) {
                        return findWeightByAuthToken(next, results, req, res, authToken)
                    },
                    isRoleInAccessLevel: ['authorizationTokenObject', function (next, results) {
                         verifyIsActionInAccessLevel(next, results, res, req)
                                         }]
                }, function (err, results) {
                    if (results.isRoleInAccessLevel == true) {
                        next()
                    } else {
                        configurationHolder.ResponseUtil.responseHandler(res, null, configurationHolder.errorMessage.failedAuthorization, true, 401)
                    }
                })
            }
        }
    }
 var extractAction = function () {
        return function (req, res, next) {

      console.log("url--->", req.url.split("/").length - 1);
      var urlExtract = req.url.split("/");
      console.log("url--->", urlExtract[urlExtract.length - 1]);
      var extractedValue = urlExtract[urlExtract.length - 1].split("?");
      console.log("extractedValue " + extractedValue[0]);
      req.body.action = extractedValue[0];
      next();

        }
    }
    //public methods are  return
    return {
        authority: authority,
        extractAction:extractAction
    };
})();
