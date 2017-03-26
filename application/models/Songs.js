var softDelete = require('mongoose-softdelete');
var timestamps = require('mongoose-timestamp');
var SongsSchema = new mongooseSchema({
  songName:{
    type:String,
    required:true
  },
  fileName:{
    type:String,
    required:true
  },
  songId:{
    type:String,
    unique:true,
    required:true
  },
  songUrl:{
    type:String,
    required:true
  },
  isDeleted:{
    type:Boolean,
    default:false
  },
  type:{
    type:String,
    default:""
  }
});

// SongsSchema.pre('save', function(next) {
//   this.songId = new Date().getTime() + Math.floor(Math.random() * 10000);
//   this.fileName = this.songId + ".mp3"
//   next();
// });


function stringNotNull(obj){
   return obj.length
}

SongsSchema.plugin(softDelete);
SongsSchema.plugin(timestamps);

var Songs = mongoose.model('Songs', SongsSchema);
module.exports = Songs
