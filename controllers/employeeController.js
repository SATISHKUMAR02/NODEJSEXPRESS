const data = { // similar to useState in react
    employees: require("../model/data.json"),
    setEmployees: function (data) { this.employees = data }

}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}


const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ 'message': 'input fields are required' });
    }
    data.setEmployees([...data.employees, newEmployee]);
    res.json(data.employees);


}

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ 'message': 'no user found' });
    
    }
    if(req.body.firstname) employee.firstname = req.body.firstname;
    if(req.body.lastname) employee.lastname = req.body.lastname;
    const filterArray = data.employees.filter(emp=>emp.id != parseInt(req.body.id));
    const  unsort = [...filterArray,employee];
    data.setEmployees(unsort.sort((a,b)=>a.id >b.id ? 1 : a.id<b.id ? -1 :0))
    res.json(data.employees);
}
const deleteEmployee = (req, res) => {
     const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ 'message': 'no user found' });
    
    }
    const filterArray = data.employees.filter(emp=>emp.id != parseInt(req.body.id));
    data.setEmployees([...filterArray]);
    res.json(data.employees);

}

const GetEmployeeById = (req, res) => {
     const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ 'message': 'no user found' });
    }
    res.json(employee);

}
module.exports = {
    getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, GetEmployeeById
}