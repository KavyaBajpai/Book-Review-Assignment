import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../utils/config.js';  
import { users } from '../utils/schema/UserSchema.js';  
import validator from 'validator';
import { eq } from 'drizzle-orm';
//import localStorage from 'local-storage-fallback'; 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET); 
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await db.select().from(users).where(eq(users.email, email)).limit(1).execute();

        if (!user || user.length === 0) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const foundUser = user[0];  

        
        const isMatch = await bcrypt.compare(password, foundUser.passwordHash);

        if (isMatch) {
            const token = generateToken(foundUser.id);
            //localStorage.setItem('token', token); 
            return res.json({ success: true, user: foundUser, token });
        } else {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


 const registerUser = async (req, res) => {
  try {
    // Safely get fields
    const username = req.body.username?.trim() || '';
    const email = req.body.email?.trim() || '';
    const password = req.body.password || '';
    const bio = req.body.bio || '';
    const avatarUrl = req.body.avatarUrl || '';

    console.log("Incoming body:", req.body);

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Username, Email, and Password are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1).execute();

    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user
    const [newUser] = await db.insert(users).values({
      username,
      email,
      passwordHash: hashedPassword,
      bio,
      avatarUrl,
      isAdmin: false,
    }).returning().execute();

    // Generate token
    const token = generateToken(newUser.id);

    // Respond
    res.status(201).json({ success: true, user: newUser, token });

  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const logoutUser = async (req, res) => {
    try {
      res.clearCookie('token'); 
      return res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout Error:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  

const getUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await db.select().from(users).where(eq(users.id, userId)).limit(1).execute();

        if (!user.length) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user: user[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

  

export {loginUser,  registerUser, logoutUser, getUser};
