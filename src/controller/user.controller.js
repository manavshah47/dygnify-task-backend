const { userService } = require("../services")

const createUser = async (req,res) => {
    const userData =  await userService.createUser(req.body)
    res.json(userData)
}

const createBusiness = async (req,res) => {
    const businessData =  await userService.createBusiness(req.body,req.params)
    res.json(businessData)
}

const createLoan = async (req,res) => {
    const loanData =  await userService.createLoan(req.body,req.params)
    res.json(loanData)
}

const getAllUsers = async (req,res) => {
    const allUsersData = await userService.getAllUsers(req.query)
    res.json(allUsersData)
}

const getAllBusiness = async (req,res) => {
    const allBusinessData = await userService.getAllBusiness(req.query)
    res.json(allBusinessData)
}

const getAllLoan = async (req,res) => {
    const allLoanData = await userService.getAllLoan(req.query)
    res.json(allLoanData)
}

module.exports = {
    createUser,
    createBusiness,
    createLoan,
    getAllUsers,
    getAllBusiness,
    getAllLoan
}