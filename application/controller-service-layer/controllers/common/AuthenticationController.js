var AuthenticationService = require("../../services/common/AuthenticationService").AuthenticationService;


module.exports = (function () {

    /*
     *  This method allow user to login
     *  call authenticate function of AuthenticationService
     *  generate authentication token for the end user and return the token
     */
    var loginAction = function (req, res) {
        console.log("login action")
      

        AuthenticationService.authenticate(req.body.email, req.body.password, res)
    }

    var logoutAction = function (req, res) {
        var authToken = req.get("X-Auth-Token")
        Logger.info("logout action" + authToken)
        if (authToken != null && authToken != "undefined")
            AuthenticationService.logoutService(authToken, res);
        else
            configurationHolder.ResponseUtil.responseHandler(res, null, configurationHolder.errorMessage.failedAuthorization, true, 401)
    }

    //public methods are  return
    return {
        loginAction: loginAction,
        logoutAction: logoutAction
    };

})();