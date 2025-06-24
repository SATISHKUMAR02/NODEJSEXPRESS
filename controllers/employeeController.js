const data ={
    employees : require("../model/data.json"),
    setEmployees : function(data){this.employees=data}

}

const getAllEmployees = (req,res)=>{
    res.json(data.employees);
}


const createNewEmployee = (req,res)=>{
    

    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname
    });
}

const updateEmployee = (req,res)=>{
    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname
    })
}
const deleteEmployee = (req,res)=>{
    res.json({"id":req.body.id});
}

const GetEmployeeById = (req,res)=>{
    res.json({"id":req.params.id});

}
module.exports = {
    getAllEmployees,createNewEmployee,updateEmployee,deleteEmployee,GetEmployeeById
}