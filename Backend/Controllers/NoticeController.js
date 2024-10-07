const fs = require("fs");
const Notice = require("../Models/Notice.js");
const path=require("path")
const addNotice = async (req, res) => {
  try {
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      return res.status(400).send("No files were uploaded.");
    }
    console.log(req.user.hostel);
    const file = req.files.file; // Access the uploaded file
    const hostel=req.user.hostel;
    // Move the uploaded file to the uploads directory
    const fileName = `${Date.now()}_${file.name}`;
    const uploadPath = `${__dirname}/../uploads/${fileName}`;
    
    file.mv(uploadPath, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      // Save notice details to MongoDB
      const newNotice = new Notice({
        file: `uploads/${fileName}`, // Store the file path
        hostel:hostel
      });
      await newNotice.save();

      res.json({ message: "Notice added successfully", notice: newNotice });
    });
  } catch (error) {
    console.error("Error adding notice:", error);
    res.status(500).send("Failed to add notice. Please try again later.");
  }
};

// New function to get all notices
const getNotices = async (req, res) => {
  
  try {
    const hostel=req.user.hostel;
    const notices = await Notice.find({hostel});
   
    res.json(notices);
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).send("Failed to fetch notices. Please try again later.");
  }
};

// New function to delete a notice by ID
const deleteNotice = async (req, res) => {
  try {
    const noticeId = req.params.id;
    const notice = await Notice.findById(noticeId);

    if (!notice) {
      return res.status(404).send("Notice not found.");
    }

    const filePath = path.join(__dirname, "..", notice.file);

    // Delete the file from the filesystem
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res.status(500).send("Failed to delete file.");
      }

      // Delete the notice from the database
      await Notice.findByIdAndDelete(noticeId);
      res.json({ message: "Notice deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting notice:", error);
    res.status(500).send("Failed to delete notice. Please try again later.");
  }
};

module.exports = {
  addNotice,
  getNotices,
  deleteNotice, // Export the new function
};
