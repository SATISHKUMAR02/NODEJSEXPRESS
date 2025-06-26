const data = {
    student:require('../model/student.json'),
    setStudent:function(data){
        this.student=data
    }
}

const getAllStudents = (req,res)=>{
    res.json(data.student)
}

const getStudent = (req,res)=>{
    const student = data.student.find(std=>std.id === parseInt(req.body.id));
    if(!student){
        return res.status(400).json({ 'message': 'no user found' });
    }
    res.json(student);
}

const createNewStudent = (req,res)=>{
    if(!req.body){
        return res.status(400).json({
            'message':'no input data'
        })
    }
    const newStudent = {
        id:data.student[data.student-1].id+1 || 1,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    }
    data.setStudent([...data.student,newStudent]);
    res.json(data.student);
}

module.exports={
    getAllStudents,getStudent,createNewStudent
}
