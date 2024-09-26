const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
        "_id": {
          "type": "ObjectId",
          "description": "Unique identifier for each faculty member"
        },
        "name": {
          "type": "String",
          "description": "Full name of the faculty member"
        },
        "email": {
          "type": "String",
          "description": "Email address of the faculty member",
          "unique": true
        },
        "password": {
          "type": "String",
          "description": "Hashed password for authentication"
        },
        "personalInfo": {
          "type": "Object",
          "description": "Personal information of the faculty member",
          "properties": {
            "phone": {
              "type": "String",
              "description": "Phone number of the faculty member"
            },
            "address": {
              "type": "String",
              "description": "Residential address of the faculty member"
            },
            "dateOfBirth": {
              "type": "Date",
              "description": "Date of birth of the faculty member"
            },
            "aadharNumber": {
              "type": "String",
              "description": "Aadhar number of the faculty member"
            },
            "emergencyContact": {
              "type": "String",
              "description": "Emergency contact number"
            },
            "bloodGroup": {
              "type": "String",
              "description": "Blood group of the faculty member"
            }
          }
        },
        "academicInfo": {
          "type": "Object",
          "description": "Academic information of the faculty member",
          "properties": {
            "department": {
              "type": "Object",
              "description": "Department information",
              "properties": {
                "name": {
                  "type": "String",
                  "description": "Name of the department"
                },
                "head": {
                  "type": "String",
                  "description": "Name of the head of the department"
                }
              }
            },
            "courses": {
              "type": "Array",
              "description": "List of courses taught by the faculty member",
              "items": {
                "type": "Object",
                "properties": {
                  "name": {
                    "type": "String",
                    "description": "Name of the course"
                  },
                  "code": {
                    "type": "String",
                    "description": "Course code"
                  }
                }
              }
            }
          }
        }
            

})

const FacultyModel = mongoose.model("Faculties", facultySchema);

module.exports = {
    FacultyModel
}
    

