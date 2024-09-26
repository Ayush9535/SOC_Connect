require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const {StudentModel} = require("./Model/userSchema")
const bcrypt = require("bcrypt")
const { transporter } = require("./Utils/MailTransporter.js")
const crypto = require("crypto")
const cors = require("cors")
const { AssignmentModel } = require("./Model/Assignments.js");
const {FacultyModel} = require("./Model/Faculties.js");

const app = express()
app.use(cors())
app.use(express.json())

let connectToDb = async () =>{
    try{
        await mongoose.connect(process.env.URI)
        console.log("Connected to Database Successfully..!!")
    }catch(err){
        console.log(err)
    }
}

connectToDb()

app.get("/" , (req,res)=>{
    res.send(mongoose.connection.readyState == 1? "Connected to Database" : "Not Connected to DataBase")
})

app.get("/users" , async (req,res)=>{
    let users = await userModel.find({})
    res.send(users)
})

app.post("/login", async (req, res) => {
    let { email, password } = req.body
    let user = await StudentModel.findOne({ email: email })
    
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ email: user.email, role: user.role }, process.env.SECRETKEY)
            res.json({ message: "Login successful", token, user })
        } else {
            res.status(401).send("Wrong password")
        }
    } else {
        res.status(404).send("User does not exist")
    }
})


app.post("/register", async (req, res) => {
    console.log(req.body);
    let { email, password, role, name, personalInfo, academicInfo } = req.body;

    // Check if user already exists in either Student or Faculty collection based on role
    let user;
    if (role === 'student') {
        user = await StudentModel.findOne({ email: email });
    } else if (role === 'faculty') {
        user = await FacultyModel.findOne({ email: email });
    }

    if (user) {
        console.log("User already exists");
        return res.status(400).send("User already exists");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === 'student') {
            await StudentModel.create({
                name: name,
                email: email,
                password: hashedPassword,
                personalInfo: personalInfo,
                academicInfo: academicInfo,
                role: role
            });
        } else if (role === 'faculty') {
            await FacultyModel.create({
                name: name,
                email: email,
                password: hashedPassword,
                personalInfo: personalInfo,
                academicInfo: academicInfo,
                role: role
            });
        } else {
            return res.status(400).send("Invalid role specified");
        }

        res.status(201).send("Registration successful");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error during registration");
    }
})



app.post("/forgotpassword" , async (req , res)=>{
    let email = req.body.email
    let user = await userModel.findOne({email : email})
    console.log(user)
    if (user){
        const verificationCode = Math.floor((crypto.randomInt(999999 - 100000 + 1) + 100000));
        
        let mailOptions = {
            from: {
                name : "MIT_School_of_Computing",
                address : process.env.APP_ADDRESS
            },
            to: req.body.email,
            subject: 'Verification Code for Reset Password',
            html: `Thank you for reaching out to us at SOC_Connect! We received your request to reset your password. Please use the following verification code to proceed with the password reset:<br><br> Verification Code: <b>${verificationCode}</b><br><br>This verification code is valid for a limited time period. If you did not initiate this password reset request, please disregard this email.<br><br>If you have any questions or concerns, feel free to contact us. We're here to help!<br><br>Best Regards,<br><b>MIT School of Computing</b>`
        }
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(501).send(error)
            }else{
                console.log('Email Sent..!');
                res.send({code : verificationCode})
            }
        });
    }else{
        res.send("User Not Found..!!")
    }
})

app.put("/resetpass", async (req, res) => {
    let { email, new_pass } = req.body
    console.log(email, new_pass)
    
    try {
        let hashedPassword = await bcrypt.hash(new_pass, 10)
        
        await userModel.updateOne(
            { email: email }, 
            { $set: { password: hashedPassword } }
        )
        res.status(200).send("Password updated")
    } catch (err) {
        res.status(500).send("Error updating password")
    }
})
  
app.post('/assignments/create', async (req, res) => {
    const { title, description, subjectId, facultyId, studentId, deadline } = req.body;
    try {
        const newAssignment = await AssignmentModel.create({
            title,
            description,
            subjectId,
            facultyId,
            studentId,
            deadline
        });
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating assignment', error });
    }
});

app.put('/assignments/submit/:assignmentId', async (req, res) => {
    const assignmentId = req.params.assignmentId;
    try {
        const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
            assignmentId,
            { status: 'Submitted', submissionDate: new Date() },
            { new: true }
        );
        res.status(200).json(updatedAssignment);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting assignment', error });
    }
});
app.get('/getstudents', async (req, res) => {
    try {
        const students = await StudentModel.find({})
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Error fetching students' });
    }
});

app.get('/getfaculties' , async (req,res)=>{
    try{
        const faculties = await FacultyModel.find({})
        res.json(faculties)
    }catch(err){
        console.error('Error fetching faculties:', error);
        res.status(500).json({ message: 'Error fetching faculties' });
    }
})

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
})