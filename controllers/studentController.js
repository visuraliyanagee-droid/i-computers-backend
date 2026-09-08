import student from "../models/Student.js"

export function findStudent(req,res){

    if(req.user == null){
        res.status(401).json({
            message : "can not find user please try again"
        })
        return
    }
    if(req.user.role !="admin"){
        res.status(403).json({
            message:"Only admins can view students"
        })
    }

    student.find().then(
        (students)=>{
            res.json(students)
        

        }
    )
}

export function createStudent(req,res){
        
      const student = new Student(req.body)//a student object can be saved in db

         student.save().then(
            ()=>{
                res.json({
                    message : "Student is created sucessfully"
                })
            }
         )

}

export function updateStudent(req,res){
        res.json({
            message : "see you again " + req.body.name       
         })
    }

export function deleteStudent(req,res){
        res.json({
            message : "good bye" + req.body.name       
         })
    }

    