const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
    bank: {
        type: String,
        required: true
    },

    principalAmount: {
        type: Number,
        required: true
    },

    loanTenure: {
        type: Number,
        required: true
    },


    interestRate: {
        type: Number,
        required: true
    },

    amount: {
        type:Number,
        required:true
    },

    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business',
        required:true
    }
});

const Loan = mongoose.model("loan", loanSchema);
module.exports.Loan = Loan;
