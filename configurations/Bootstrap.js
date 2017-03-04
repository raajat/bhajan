/*
 * @author Abhimanyu
 * This program includes all the function which are required to  initialize before the application start
 */

//call all the function which are required to perform the require initialization before server will start
var actionArray = require('../application-utilities/ActionAccessToWeight.js').ActionJson;
var initApp = function () {


    createRole();
    createAction();
}

function createAction() {
    var i = 0;
  //  console.log("actionArray", actionArray);
    for (i = 0; i < actionArray.length; i++) {

        createOrUpdateAction(actionArray[i]);
    }

}

function createOrUpdateAction(Object) {

    domain.Action.find({
        Action: Object.Action

    }, function (err, productData) {
        console.log(err);
        if (productData.length == 0 || productData == undefined) {
            var newAction = new domain.Action(Object);
            newAction.save(function (err, ProductsObj) {
                if (err) {
                    console.log(err);
                  /*  configurationHolder.ResponseUtil.responseHandler(res, null, configurationHolder.errorMessage.notValidUserData, true, 400)*/
                        //  next(jsonerr, ProductsObj);

                } else {

                }
            })
        } else {

            domain.Action.update({
                Action: Object.Action
            }, Object, {
                upsert: true
            }, function (err, doc) {
                if (err) {}
            });
        }

    });

}

function createRole() {

    domain.Role.count({}, function (err, count) {

        if (count == 0) {
            domain.Role.create({
                RoleType: "ROLE_SUPERADMIN",
                weight: 11,
                Action:['forgetPassword','login','logout','register','users','removeAction','updateRole','dataRecord','topWebsite']
            }, {
                RoleType: "ROLE_DISTRIBUTOR",
                weight: 9,
                 Action:['forgetPassword','login','logout','register','users','dataRecord','topWebsite']
            }, {
                RoleType: "ROLE_SUPPORT",
                weight: 7,
                 Action:['forgetPassword','login','logout','register','users','dataRecord','topWebsite']
            }, {
                RoleType: "ROLE_EMPLOYER",
                weight: 5,
                 Action:['forgetPassword','login','logout','register','users']
            }, {
                RoleType: "ROLE_EMPLOYEE",
                weight: 3,
                 Action:['forgetPassword','login','logout','register','users']
            }, {
                RoleType: "ROLE_ANYNONUS",
                weight: 1,
                 Action:['login','forgetPassword','register']
            }, function (err) {
                if (err) {
                    console.log("role error");
                } else {
                    console.log("role saved");
                }
            }, function (err, doc) {
                if (doc) {
                    Logger.error(err)
                } else {
                    createSuperAdmin();

                }
            });
        } else {
            createSuperAdmin();
            console.log("You have already defind roles once.");
        }
    });
}

function createSuperAdmin() {
    var saltString = uuid.v1()
    var password = crypto.createHmac('sha1', saltString).update("raajat@katiyar").digest('hex')
    domain.User.findOne({
        fullName: 'SuperAdmin'
    }, function (err, doc) {
        Logger.info("document === " + doc);
        if (!doc) {
            var superAdminUser = new domain.User({
                fullName: 'SuperAdmin',
                email: 'raajatkatiyar@gmail.com',
                salt: saltString,
                password: password,
                role: 'ROLE_SUPERADMIN',
                accountLocked: false,
                isAccountActive: true
            });

            superAdminUser.save(function (err, user) {
                if (err) {
                   Logger.error("err",err)
                } else {

                    bootApplication()
                   // Logger.info("user",user)
                }
            })
        } else {
            bootApplication()
        }
        /* Logger.error(err)
         if(!doc){

         }*/
    });


}

// code to start the server
function bootApplication() {
    app.listen(configurationHolder.config.port, function () {
        console.log("Express server listening on port %d in %s mode", configurationHolder.config.port, app.settings.env);
    });
}

module.exports.initApp = initApp
