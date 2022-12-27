const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type:String,
        required:true,
        unique:true
    },

    address: {
        type: String,
        required: true
    },

    gstNo: {
        type: String,
        required: true
    },

    eshYear: {
        type: Number,
        required: true
    },
    
    empCount: {
        type: Number,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },

    loan: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'loan',
        default: []
    }
});

const Business = mongoose.model("business", businessSchema);
module.exports.Business = Business;
