const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Import the path module
//const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/web2', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});//schema for teacher cred

//schema for student cred
//app.use(cors);
// Define Schema for Student_details

const studentSchema = new mongoose.Schema({
    name: {
       type: String,
        require:true
    },
    regNo: String,
    branch: String,
    year: String,
    cgpa: String,
    certifications: String,
    projects: String,
    domain: String,
    about: String,
    phone: String,
    email: String,
    linkedin: String
});


const teacherSchema = new mongoose.Schema({
    name: {
       type: String,
        require:true
    },
    
    department: String,
 
 
    certifications: String,
    projects: String,
    domain: String,
    about: String,
    phone: String,
    email: String,
    linkedin: String
});
const listingSchema = new mongoose.Schema({
    
     department: String,
    project_name: String,
    project_details: String,
    status: String,
    name_of_faculty: String,
    email_id: String,
    contact: String,
    cabin: String

});
// Define Model for Student
const Student_details= mongoose.model('Student_info', studentSchema);
//const user_cred = mongoose.model('user_cred', user_credSchema);
const teacher_details = mongoose.model('teacher_details', teacherSchema);
const listing = mongoose.model('checklist', listingSchema);

// Middleware to parse JSON
app.use(express.json());
// Route for '/reg_as_stu' to handle form submission
app.post('/reg_as_teach', async (req, res) => {

    try {
        // Check if student already exists in the database
        const existingteach = await teacher_details.findOne({ name: req.body.name } );

        if (existingteach) { 
            console.log("teacher exists. Please log in.");
            // Redirect the user to the login page
            res.redirect("./teach_login.html");
            return; // Stop execution here
        }

        // Create a new student details document
        const newteacherDetails = new teacher_details(req.body);

        await newteacherDetails.save();
       

        res.status(201).json({ message: 'teacher registered successfully' });
            res.redirect("./teach_passet.html");
        // Go to set password after registering (You can add redirection logic here)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Route for '/reg_as_stu' to handle form submission
app.post('/reg_as_stu', async (req, res) => {
    try {
        // Check if student already exists in the database
        const existingStudent = await Student_details.findOne({ regNo: req.body.regNo });

        if (existingStudent) { 
            console.log("Student exists. Please log in.");
            // Redirect the user to the login page
            res.redirect("./stu_login.html");
            return; // Stop execution here
        }

        // Create a new student details document
        const newStudentDetails = new Student_details(req.body);
        await newStudentDetails.save();
      
        res.status(201).json({ message: 'Student registered successfully' });
        // Go to set password after registering (You can add redirection logic here)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Assuming you have imported the 'listing' model and any required libraries

app.post('/listing', async (req, res) => {
    const data = req.body;
    console.log(data);

    // Validate request body
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'Request body is empty' });
    }

    // Perform further validation if needed

    try {
        // Check if listing already exists in the database (if applicable)

        // Create a new listing document
        const newListing = new listing(data); // Assuming your model is named 'Listing'
        await newListing.save();
        
        // Respond with success message
        return res.status(201).json({ message: 'Listing created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Assuming you have a Mongoose model named 'Listing'
async function retrieveListingData(department) {
    try {
        // Your code to retrieve listing data based on the department goes here
        // For example, if you're using Mongoose to query a MongoDB database:
        const listings = await listing.find({ department: department });

        // Return the fetched listing data
        return listings;
    } catch (error) {
        // If an error occurs during the data retrieval process, throw the error
        throw error;
    }
}

// Assuming you have a Mongoose model named 'Project' and 'retrieveListingData' function defined

app.get('/fetch-listing', async (req, res) => { 
    const department = req.query.department; // Access department from query parameters

    try {
        // Retrieve data from the listing based on the department
        const listingData = await retrieveListingData(department);

        // Respond with the fetched listing data
        res.status(200).json(listingData);
    } catch (error) {
        console.error('Error fetching listing:', error);
        res.status(500).json({ message: 'Failed to fetch listing data' });
    }
});


app.use(express.static('koool'));

// Specify the entry point file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'koool', 'searchi.html'));
});

 // Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
