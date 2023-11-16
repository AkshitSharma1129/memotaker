const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const NotesSchema = new Schema({
  title:string,
  author:{type:Schema.Types.ObjectId, ref:'User'},//US AUTHOR KA IE REFERNCE IS OF THAT USER
}, {
  timestamps: true,
});

const NotesModel = model('Post', NotesSchema);

module.exports = NotesModel;