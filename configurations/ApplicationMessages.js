var appErrorMessages = {
	failedLogin :"Sorry, Email or password not found.",
	failedAuthorization : "Sorry, you are not authorized.",
    unique:"Oops! Email or username is not unique. Please try with different username or email.",
    notPermit:"You  have not permission to perform this function.",
    ActionfailedAuthorization:"Sorry, you are not authorized. Please provide action .",
     normalError:"error is occure ",
     expireToken:"Your token has expired.",
    notAuthoritytoCreateUser:"You are not authorized to create user of this access.",
    alreadyGroup:"Group is already exist. Choose Another Group Name",
    body:"Body of data is correct way",
    bodyError:"Body of data is Incorrect way"

}


var appSuccessMessage={


logoutSuccessfull:"You have successfully logged out.",
   clickVerficationLink:"We have sent a verification link to your email",
     resetPassword:"Reset Password",
	recordData:"Records updated",
  groupStatus:"Group does not exist",
  changePassword:"Password changed successfully"
}

var RoleAccessMessage={
    
    notRightAuthority:"You are not authorized to create user of this access."
}

var LoginMessage={
    
    
  registerFirst:"You are not yet registered. It only takes a few moments to register.",
  userRole:"Access denied!",
  notUserRole:"Access denied!", 
  clickVerficationLink:"We have sent a verification link to your email",
  passwordNotMatch:"Email or Password doesn't match!",
  resetWebPassword:"Please reset your password.",    
  resetDeactivateUser:"You have been deactivated. To activate again please reset password.",
  successfullyLogin:"You have successfully Logged in"
}

module.exports.LoginMessage = LoginMessage
module.exports.appErrorMessages = appErrorMessages
module.exports.appSuccessMessage = appSuccessMessage
module.exports.RoleAccessMessage = RoleAccessMessage