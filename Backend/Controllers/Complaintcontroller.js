// Assuming you have a Mongoose Complaint model
const Complaint = require("../Models/ComplainModel.js");

const submitComplaint = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      return res.status(400).send("No files were uploaded.");
    }

    const { title, description } = req.body;
    const file = req.files.file; // Access the uploaded file

    // Move the uploaded file to the uploads directory
    const fileName = `${Date.now()}_${file.name}`;

    // Ensure the 'uploads' directory exists
    const uploadPath = `${__dirname}/../uploads/${fileName}`;
    file.mv(uploadPath, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      // Save complaint details to MongoDB
      const newComplaint = new Complaint({
        title,
        description,
        file: `/uploads/${fileName}`, // Store the file path
      });
      await newComplaint.save();

      res.json({ message: "Complaint submitted successfully", complaint: newComplaint });
    });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).send("Failed to submit complaint. Please try again later.");
  }
};

module.exports = {
  submitComplaint,
};
