const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Create Express app
const app = express();
const PORT = 3000;

// Connection URI
const uri = 'mongodb://localhost:27017/hitch';

// Define schemas
const teacherListingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

// Create a model for teacher listings
const TeacherListing = mongoose.model('teacherlistings', teacherListingSchema);

const userSchema = new mongoose.Schema({
  regno: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
  salt: {
    type: String,
    required: true
 hash: {
     type: String,
     required: true
 }


    }
});


// Create models
const User = mongoose.model('cred', userSchema);
// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// Middleware to parse JSON bodies
app.use(express.json());
//sha
function sha256(input) {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

// Example usage:
//const password = "your_password_here";
//const hashedPassword = sha256(password);
//random salt
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
//route to register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
   
   
    //for checking if the user already exists 
    const salt = User.salt;
    const pass_check = password + salt;
    const hashedPassword2 = sha256(pass_check);
  //db names are case sensitive

    try {
        // Search in users collection
        const user = await User.findOne({ username, hashedPassword2 });
        if (user) {
            console.log("student user exists please login");

           
        }

        
        // If not found in both collections, then ask to register 
        if (!user) {
            //for registering a new user
            const satlty = generateRandomString(10)
            const new_password = password + satlty;
            const hashedPassword1 = sha256(new_password);
        

                  const newUser = new User({
             username: username,
            password: new_password,
            salt: salt,
            hash: hashedPassword1
                                        });
        
        // Save the new user to the database
        await newUser.save();
        }
        
    
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal server error');
    }
});
// Route to handle form submission
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const new_password = password + generateRandomString(10);

    try {
        // Search in users collection
        const user = await User.findOne({ username, password });
        if (user) {
            return res.redirect('/stu.html');
        }

        // Search in teachers collection
        const teacher = await Teacher.findOne({ username, password });
        if (teacher) {
            return res.redirect('/new_listing.html');
        }

        // If not found in both collections, send 401 error
        return res.status(401).send('Unauthorized');
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal server error');
    }
});

// Route to get the teacher listing from the student login page
app.get('/sadata', async (req, res) => {
    const { branch, project } = req.query;

    try {
        // Fetch data from teacher_listings collection based on branch
        const teacherListings = await TeacherListing.find({ branch });

        // Display data in a separate div
        // Here, we'll just send the data as JSON for simplicity
        res.json({ teacherListings });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal server error');
    }
});

// Route to handle form submission for fetching teacher listings by status
app.post('/teachlisting', async (req, res) => {
    const { status } = req.body;

    try {
        // Fetch teacher listings based on the provided status
        const teacherListings = await TeacherListing.find({ status });

        // Send the fetched listings as response
        res.json({ teacherListings });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal server error');
    }
});
// Serve all files from the 'tri' directory
app.use(express.static('gooo'));

// Specify the entry point file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'gooo', 'homepage.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});