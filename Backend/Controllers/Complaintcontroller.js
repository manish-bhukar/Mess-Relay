const Complaint = require("../Models/ComplainModel.js");
const mongoose=require('mongoose');
const {Types}=mongoose
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

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const resolveComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { resolved: true, resolvedAt: new Date() },
      { new: true }
    );

    res.status(200).json(updatedComplaint);
  } catch (error) {
    console.error('Error resolving complaint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const likeComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { studentId } = req.body;
   
    if (!mongoose.isValidObjectId(studentId)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (complaint.likes.includes(studentId)) {
      // Student has already liked this complaint
      return res.status(400).json({ message: 'You have already liked this complaint' });
    }

    if (complaint.dislikes.includes(studentId)) {
      // Remove from dislikes if already disliked
      complaint.dislikes = complaint.dislikes.filter(id => id.toString() !== studentId);
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { 
        $addToSet: { likes: studentId }, // Using $addToSet to add unique studentId to likes array
        $pull: { dislikes: studentId } // Remove studentId from dislikes array
      },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json({ message: 'Complaint liked successfully', complaint: updatedComplaint });
  } catch (error) {
    console.error('Error liking complaint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const dislikeComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { studentId } = req.body;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (complaint.dislikes.includes(studentId)) {
      return res.status(400).json({ message: 'You have already disliked this complaint' });
    }

    if (complaint.likes.includes(studentId)) {
      // Remove from likes if already liked
      complaint.likes = complaint.likes.filter(id => id.toString() !== studentId);
    }

    complaint.dislikes.push(studentId);
    await complaint.save();

    res.status(200).json({ message: 'Complaint disliked successfully', complaint });
  } catch (error) {
    console.error('Error disliking complaint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
;

module.exports = {
  submitComplaint,
  resolveComplaint,
  getAllComplaints,
  likeComplaint,
  dislikeComplaint,
};
