var BaseService = require('./BaseService');

UserService = function (app) {
	this.app = app;
};

UserService.prototype = new BaseService();

UserService.prototype.createUser = function (user, callback) {
	user.save(function (err, userObj) {
		callback(err, userObj);
	});

}

UserService.prototype.getUser = function (id, callback) {
	domain.User.findOne({
		_id: id,
		deleted: false
	}, function (err, user) {
		callback(err, user);
	});
}

UserService.prototype.updateUser = function (id, userObj, callback) {
	domain.User.findOneAndUpdate({
		_id: id,
		deleted: false
	}, userObj, null, function (err, user) {
		if (err) {
			callback(err, userObj);
		} else {
			domain.User.findOne({
				_id: id,
				deleted: false
			}, function (err, user) {
				callback(err, user);
			});
		}
	});
}

UserService.prototype.searchUser = function (firstName,lastName,callback) {
    var firstName = (firstName == null || firstName == "")?'.*':firstName;
	var lastName = (lastName == null || lastName == "")?'.*':lastName;
	domain.User.find({firstName:new RegExp(firstName),lastName:new RegExp(lastName)},function(err,objects){
		callback(err, objects);
	})
}

UserService.prototype.deleteUser = function (id, callback) {
	domain.User.findOne({
		_id: id
	}, function (err, user) {
		if (err) {
			callback(err, user)
		};
		user.softdelete(function (err, deletedUser) {
			callback(err, deletedUser);
		});
	});
}

UserService.prototype.getSongsList = function (params, callback) {
  var skip = parseInt(params.skip);
	var limit = parseInt(params.limit);

	domain.Songs.find({isDeleted:false}).skip(skip).limit(limit).exec(function(err,songs){
		if(!err){
			var resObj = {};
			resObj.success = true;
			resObj.object = songs;
			resObj.message = "Songs List fetched Succesfully"
			resObj.errorMsg = null;
			callback(null, resObj)
		}else {
			var resObj = {};
			resObj.success = false;
			resObj.object = null;
			resObj.message = "Songs List can't be fetched."
			resObj.errorMsg = err;
			callback(null, resObj)
		}
	})
}

UserService.prototype.uploadSong = function (body, file, callback) {
	console.log("the param are",body,file.type);

	var songId = new Date().getTime() + Math.floor(Math.random() * 10000);
  var nameSplitArray = file.name.split('.')
  var extension = nameSplitArray[nameSplitArray.length - 1];
  var fileName = songId + '.' + extension;
	console.log("the filename is",fileName);
  var serverPath = '/opt/bhajan/' + fileName;
  var responseFile = configurationHolder.config.songUrl + fileName;
	var mv = require('mv');
	var filePath = file.path;
	mv(filePath, serverPath,function(err){
    if (err) {
			console.log("the error is",err);
      callback(new Error("Something Went Wrong"))
    } else {
			var songObj = {};
			songObj.songId = songId;
			songObj.songName = body.name;
			songObj.fileName = fileName;
			songObj.songUrl = responseFile.toString();
			songObj.type = file.type.toString();

			var saveSong = new domain.Songs(songObj);
			saveSong.save(function(saveErr,savedObj){
				if(!saveErr){
					var resObj = {};
					resObj.object = savedObj
					resObj.success = true;
					resObj.errorMsg = null;
		      callback(null, resObj);
				}else {
					var resObj = {};
					resObj.object = null
					resObj.success = true;
					resObj.errorMsg = saveErr;
		      callback(null, resObj);
				}
			})
    }
  });
}

module.exports = function (app) {
	return new UserService(app);
};
