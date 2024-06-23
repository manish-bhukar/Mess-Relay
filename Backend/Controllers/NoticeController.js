const Notice = require("../Models/Notice.js");
const path = require("path");

const addNotice = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      return res.status(400).send("No files were uploaded.");
    }
    console.log(req.files.file);
    const file = req.files.file; // Access the uploaded file

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
        file: `/uploads/${fileName}`, // Store the file path
      });
      await newNotice.save();

      res.json({ message: "Notice added successfully", notice: newNotice });
    });
  } catch (error) {
    console.error("Error adding notice:", error);
    res.status(500).send("Failed to add notice. Please try again later.");
  }
};

module.exports = {
  addNotice,
};
