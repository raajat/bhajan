var RoleManagementService = require("../../services/common/RoleManagementService").RoleManagementService;


module.exports = (function () {

    /*
     *  This method allow user to login
     *  call authenticate function of AuthenticationService
     *  generate authentication token for the end user and return the token
     */
    var updateRole = function (req, res,callback) {
        console.log("login action")
       // callback(null,null);
       RoleManagementService.UpdateRole(req.body.role, req.body.actions, res)
    }

    var removeAction = function (req, res,callback) {
        var authToken = req.get("X-Auth-Token")
   
    if (authToken != null && authToken != "undefined")
            RoleManagementService.RemoveAction(req.body.role,req.body.actions, res);
        else
            configurationHolder.ResponseUtil.responseHandler(res, null, configurationHolder.errorMessage.failedAuthorization, true, 401)
    }

    //public methods are  return
    return {
        updateRole: updateRole,
        removeAction: removeAction
    };

})();