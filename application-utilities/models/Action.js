 var timestamps = require('mongoose-timestamp');
 var ActionSchema = new mongooseSchema({
	Action: {
		type: String,
		default: '',
		required: true,
		trim: true,
        validate: [stringNotNull, 'action  required']
	}, 
    weight: []
   
});


function stringNotNull(obj){
    return obj.length
}


ActionSchema.plugin(timestamps);

var Action = mongoose.model('Action', ActionSchema);
module.exports = Action
