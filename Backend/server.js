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
const {AdminModel} = require("./Model/Admin.js");
const {Holiday} = require("./Model/Holiday.js")
const {LeaveModel} = require("./Model/Leaves.js");

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


app.post("/login", async (req, res) => {
    let { email, password, userRole } = req.body
    if (userRole == 'student') {
        userModel = StudentModel;
    } else if (userRole == 'faculty') {
        userModel = FacultyModel;
    } 
    else if(userRole == 'admin'){
        userModel = AdminModel;
    }else {
        return res.status(400).send("Invalid user role specified");
    }

    let user = await userModel.findOne({ email: email })
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
        }else if (role === 'admin') {
            await AdminModel.create({
                name: name,
                email: email,
                password: hashedPassword,
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
    let userRole = req.body.userRole

    if (userRole === 'student') {
        userModel = StudentModel;
    } else if (userRole === 'faculty') {
        userModel = FacultyModel;
    }

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

app.get('/getfaculties/:email' , async (req,res)=>{
    let email = req.params.email
    try{
        const faculties = await FacultyModel.findOne({email: email})
        res.json(faculties)
    }catch(err){
        console.error('Error fetching faculties:', err);
        res.status(500).json({ message: 'Error fetching faculties' });
    }
})

app.put('/faculty/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedFaculty = await FacultyModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!updatedFaculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        res.status(200).json({ message: 'Faculty updated successfully', data: updatedFaculty });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


app.post("/assignment/:facultyId" , async (req,res)=>{
    let facultyId = req.params.facultyId
    let {title , description , subjectId , deadline} = req.body

    let user = await FacultyModel.find({email: facultyId})
    console.log(user , title , description , subjectId , deadline)
    try{
        const assignment = await AssignmentModel.create({
            title,
            description,
            subjectId,
            facultyId: user[0]._id,
            deadline
        })
        res.status(201).json(assignment)
    }catch(err){
        res.status(500).json({ message: 'Error creating assignment', error: err });
    }
})

app.get("/assignments", async (req, res) => {
    try {
        const assignments = await AssignmentModel.find().populate('facultyId');
        
        res.status(200).json(assignments);
    } catch (err) {
        console.error("Error fetching assignments:", err);
        
        res.status(500).json({ message: "Error fetching assignments", error: err });
    }
});

app.post('/addholiday', async (req, res) => {
    const { date, day, description } = req.body;
    try {
      const newHoliday = new Holiday({ date, day, description });
      await newHoliday.save();
      res.status(201).json(newHoliday);
    } catch (err) {
      res.status(500).json({ message: 'Error adding holiday', error: err });
}
});

app.put("/assignments/:id", async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const { status } = req.body;

        const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
            assignmentId,
            { status },
            { new: true }
        );

        res.status(200).json(updatedAssignment);
    } catch (err) {
        console.error("Error updating assignment status:", err);
        res.status(500).json({ message: "Error updating assignment status", error: err });
    }
});


app.post('/apply-leave', async (req, res) => {
    const { facultyId, leaveType, startDate, endDate, reason } = req.body;

    if (!facultyId || !leaveType || !startDate || !endDate || !reason) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    let user = await FacultyModel.findOne({ email:facultyId });

    try {
        const leaveRequest = await LeaveModel.create({
            facultyId: user._id,
            leaveType,
            startDate,
            endDate,
            reason
        });
        res.status(201).json(leaveRequest);
    } catch (error) {
        console.error('Error applying for leave:', error);
        res.status(500).json({ message: 'Error applying for leave', error: error.message });
    }
});

app.get('/getHolidays' , async (req,res)=>{
    try{
        const holidays = await Holiday.find({})
        res.json(holidays)
    }catch(err){
        console.error('Error fetching holidays:', err);
        res.status(500).json({ message: 'Error fetching holidays' });
    }
})

app.get('/getStudents', async (req, res) => {
    try {
        const students = await StudentModel.find({});
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Error fetching students' });
    }
});

app.post('/submitFeedback', async (req, res) => {
    const { studentId, feedback } = req.body;
    try {
        const student = await StudentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        let user = await FacultyModel.findOne({ email:feedback.facultyId });

        student.feedback.push({facultyId: user._id, feedback: feedback.message});
        await student.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ message: 'Error submitting feedback', error: error.message });
    }
});

app.get('/getleaves', async (req, res) => {
    try {
        const leaves = await LeaveModel.find().populate('facultyId');
        res.json(leaves);
    } catch (error) {
        console.error('Error fetching leaves:', error);
        res.status(500).json({ message: 'Error fetching leaves' });
    }
});

app.get('/feedbacks/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const student = await StudentModel.findOne({ email: email }).populate('feedback.facultyId');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student.feedback);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ message: 'Error fetching feedbacks' });
    }
}
);

app.get('/assignments/:facultyId', async (req, res) => {
    const { facultyId } = req.params;

    let user = await FacultyModel.findOne({ email:facultyId });

    try {
        const assignments = await AssignmentModel.find({ facultyId: user._id });

        if (assignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found for this faculty.' });
        }

        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
})