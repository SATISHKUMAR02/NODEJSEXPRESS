const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const employee = await Employee.find();
    if (!employee) {
        return res.status(204).json({ 'message': 'no Employees found' });
    }
    res.json(employee);
}


const createNewEmployee = async (req, res) => {
    if (!req?.body.firstname || !req.body?.lastname) {
        return res.status(400).json({ 'message': 'need input credentials' });
    }
    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        res.json(201).json(result);

    } catch (err) {
        console.log("error", err);

    }


}

const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Id is required' });
    }
    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ 'message': 'no user found ' });

    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
}
const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Id is required' });


    }
    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(400).json({ 'message': 'no user found' });

    }
    const result = await employee.deleteOne({ _id: req.body.id });
    res.json(result);


}

const GetEmployeeById = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Id is required' });


    }
    const employee = await Employee.findOne({_id:req.body.id}).exec();
    if (!employee) {
        return res.status(400).json({ 'message': 'no user found' });
    }
    res.json(employee);

}
module.exports = {
    getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, GetEmployeeById
}