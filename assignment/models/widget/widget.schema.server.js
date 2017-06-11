var mongoose = require('mongoose');

var widgetSchema  = mongoose.Schema({
    _page: [{type: mongoose.Schema.Types.ObjectId, ref: 'pageModel'}],
    type: {type:String, enum :['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT' , 'TEXT']},
    name: {type: String},
    text: {type: String},
    placeholder: {type: String},
    description: {type: String},
    url: {type: String},
    width: {type: String},
    height: {type: String},
    rows: {type: Number},
    size: {type: Number},
    class: {type: String},
    icon: {type: String},
    deletable: {type: Boolean},
    formatted: {type: Boolean},
    dateCreated:{type:Date, default:Date.now},
    order:{type:Number, default:0},
}, {collection: "widget"});

module.exports = widgetSchema;