module.exports.RoleManagementService = (function () {
   //private variables
    // var encryptedPassword
   // private methods 
   

   /* verify whether the user exist in the system or not
    * find the user by emai
    * match the password
    * generate the authentiction token 
    */
   var RemoveAction = function (role,actions,res) {
         domain.Role.update({RoleType:role},{$pull:{ Action:{$in: actions} }},function(err,user){
            if(user){
                configurationHolder.ResponseUtil.responseHandler(res, user, null, false, 200)
             }else{
                 configurationHolder.ResponseUtil.responseHandler(res, null, "Update roletype error", true, 401)
             }
         })
  }
   
   
    var UpdateRole = function (role,actions,res) {
         domain.Role.update({RoleType:role},{$addToSet:{ Action: { $each: actions }}},function(err,user){
            if(user){
                configurationHolder.ResponseUtil.responseHandler(res, user, null, false, 200)
             }else{
                 configurationHolder.ResponseUtil.responseHandler(res, null, "Update roletype error", true, 401)
             }
         })
  }

   
  //return the method which you want it to be public
  return {
     UpdateRole : UpdateRole,
      RemoveAction:RemoveAction
  };

})();