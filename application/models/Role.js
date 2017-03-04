 var timestamps = require('mongoose-timestamp');
 var RoleSchema = new mongooseSchema({
	RoleType: {
		type: String,
		default: '',
		required: true,
		trim: true,
        validate: [stringNotNull, 'Role type required']
	}, 
    weight: {
		type: Number,
		default: 2,
		required: true,
		trim: true
	},
    status: {
		type: String,
		default: 'active',
		required: true,
		trim: true,
      
	}
});


function stringNotNull(obj){
    return obj.length
}


RoleSchema.plugin(timestamps);

var Role = mongoose.model('Role', RoleSchema);
module.exports = Role
