const express = require('express');
const router = express.Router();
const personal_user = require('../models/PersonalDetails');
const { getUser } = require('../service/auth')

// PUT request to update user profile
router.put('/', async (req, res) => {
    // Extract rollNo from request body
    const { rollNo, ...updateFields } = req.body; // New details to update
    console.log(rollNo);
    try {
        // Find the user by rollNo
        const user = await personal_user.findOne({ rollNo });
        console.log(user);
        // If user not found, return error
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Prevent changing rollNo
        delete updateFields.rollNo;

        // Update user details
        Object.assign(user, updateFields);
        await user.save();

        res.json({ message: "User profile updated successfully." });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// GET request to fetch user profile
router.get('/', async (req, res) => {
    // Extract UID from cookies
    const uid = req.cookies.uid;
    console.log(uid);
    try {
        // If UID is not available, return error
        if (!uid) {
            return res.status(400).json({ message: "UID not found in cookies." });
        }

        // Find the user by UID
        // const user = await personal_user.findOne({ uid });
        const user = getUser(uid);
        // console.log(user);
        // If user not found, return error
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Extract rollNo from the user object
        const rollNo = user.rollNo;
        const userByRollNo = await personal_user.findOne({ rollNo });

        // If user not found, return error
        if (!userByRollNo) {
            return res.status(404).json({ message: "User not found." });
        }

        // Exclude password field from user details
        const { password, ...userDetails } = userByRollNo.toObject(); // Convert Mongoose document to plain JavaScript object

        res.json({ rollNo, ...userDetails });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;
