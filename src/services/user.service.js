const { User,Business,Loan } = require("../models")
const Joi = require("joi");


// 1. POST ROUTE FOR CREATING USER
// endpoint to hit -> http://127.0.0.1:3001/api/user/create-user
const createUser = async (body) => {
  try {
    // joi validation of input data
    const { error } = joiCreateUserValidationSchema.validate(body)
    if(error){
      return {"error in input data":error.message}
    }

    const userDataBody = { ...body, business:[]}

    let userData = await User.create(userDataBody)
    return {response:true,"message":"User created","userId":userData._id}
  } catch (error) {
    console.log(error);
    return {response:false,message:"Internal server error"}
  }
}

// 2. POST REQUEST FOR CREATING BUSINESS
// endpoint to hit -> http://127.0.0.1:3001/api/user/create-business
const createBusiness = async (body,params) => {
  try{
    // joi validation of input data
    const { error } = joiBusinessDetailsValidationSchema.validate(body)
    if(error){
      return {response:false,message:"error in input data",error:error.message}
    }

    const { userId } = params
    const businessBody = {
      ...body,user:userId,loan:[]
    }
    const resp = await Business.create(businessBody)
    await User.findOneAndUpdate({_id:userId},{$push:{business:resp._id}}) // adding userid in user collection document
    return {response:true,"message":"Business Created successfully","businessId":resp._id}

  } catch (error) {
    console.log(error);
    return {response:false,message:"Internal server error"}
  }
}

// 3. POST REQUEST FOR CREATING LOAN
// endpoint to hit -> http://127.0.0.1:3001/api/user/create-loan
const createLoan = async (body,params) => {
  try{
    // joi validation of input data
    const { error } = joiCreateLoanValidationSchema.validate(body)
    if(error){
      return {response:false,message:"error in input data",error:error.message}
    }

    const { businessId } = params
    const loanBody = {
      ...body,business:businessId
    }
    const loanData = await Loan.create(loanBody)

    await Business.findOneAndUpdate({_id:businessId},{$push:{loan:loanData._id}}) // adding loanid in business collection document

    return {response:true,"message":"Loan generated successfully"}
  } catch (error) {
    console.log(error);
    return {response:false,message:"Internal server error"}
  }
}

// 4. GET REQUEST FOR FETCHING ALL USERS WITH PAGINATION
// endpoint to hit -> http://127.0.0.1:3001/api/user/get-all-users?page=2&limit=2
const getAllUsers = async (query) => {
  try{
    let { page, limit } = query;
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 5
        }
        const count = await User.countDocuments()
        const lastPage = Math.ceil(count / limit)
        if (page != lastPage && (page * limit) > count + 1) {
            return { response:true, "message": "reached to the end of the data" }
        }
        const userData = await User.find().select({ _id: 0, __v: 0 }).limit(limit * 1).skip((page - 1) * limit).exec()
        return { response:true, user:userData, totalPages: lastPage, currentPage: page }
  } catch (error){
    return {response:false,message:"Internal server error"}
  }
}

// 5. GET REQUEST FOR FETCHING ALL BUSINESS WITH PAGINATION
// endpoint to hit -> http://127.0.0.1:3001/api/user/get-all-business?page=2&limit=2
const getAllBusiness = async (query) => {
  try{
    let { page, limit } = query;
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 5
        }
        const count = await Business.countDocuments()
        const lastPage = Math.ceil(count / limit)
        if (page != lastPage && (page * limit) > count + 1) {
            return { response:true, "message": "reached to the end of the data" }
        }
        const businessData = await Business.find().select({ _id: 0, __v: 0 }).limit(limit * 1).skip((page - 1) * limit).exec()
        return { response:true, business:businessData, totalPages: lastPage, currentPage: page }
  } catch (error){
    return {response:false,message:"Internal server error"}
  }
}

// 6. GET REQUEST FOR FETCHING ALL LOAN WITH PAGINATION
// endpoint to hit -> http://127.0.0.1:3001/api/user/get-all-loan?page=2&limit=2
const getAllLoan = async (query) => {
  try{
    let { page, limit } = query;
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 5
        }
        const count = await Loan.countDocuments()
        const lastPage = Math.ceil(count / limit)
        if (page != lastPage && (page * limit) > count + 1) {
            return { response:true, "message": "reached to the end of the data" }
        }
        const loanData = await Loan.find().select({ _id: 0, __v: 0 }).limit(limit * 1).skip((page - 1) * limit).exec()
        return { response:true, loan:loanData, totalPages: lastPage, currentPage: page }
  } catch (error){
    return {response:false,message:"Internal server error"}
  }
}

const joiCreateUserValidationSchema =  Joi.object({
  firstName: Joi.string().required().min(2).max(50),
  lastName: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  phoneNo: Joi.string().required().length(10),
  gender:Joi.string().required().valid('male','female','other')
})

const joiBusinessDetailsValidationSchema =  Joi.object({
  name: Joi.string().required().min(2).max(50),
  gstNo: Joi.string().length(12).required(),
  email: Joi.string().email().required(),
  address: Joi.string().min(5).max(255).required(),
  eshYear: Joi.number().min(1800).less(2023).strict().required(),
  empCount: Joi.number().min(1).max(5000).required()
})

const joiCreateLoanValidationSchema = Joi.object({
  principalAmount: Joi.number().required(),
  interestRate: Joi.number().required(),
  loanTenure: Joi.number().required(),
  bank: Joi.string().required(),
  amount: Joi.number().required()
})

module.exports = {
  createUser,
  createBusiness,
  createLoan,
  getAllUsers,
  getAllBusiness,
  getAllLoan
}
