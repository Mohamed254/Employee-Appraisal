const mongoose = require("mongoose");


const AppraisalSchema = new mongoose.Schema(
  {
    Appraisal_Name: {
      type: String,
      required: true,
      sparse: true, 
      },
    Communication_Skills: {
      type: String,
      required: true,
      sparse: true, 
      },
      Teamwork: {
        type: String,
        required: true,
        sparse: true, 
      },
      Interpersonal_Skills: {
        type: String,
        required: true,
        sparse: true, 
      },
      Problem_solving: {
        type: String,
        required: true,
        sparse: true, 
      },
      Integrity: {
        type: String,
        required: true,
        sparse: true, 
      },
      File_Upload: {
        type: String,
        default: 'no-file.doc'
      },
      Status: {
        type: String,
        
      },
      Feedback: {
        type: String,
        
      },
      Overall_Score: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must can not be more than 10']
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
     
     
  },

);



module.exports = mongoose.model('Appraisal', AppraisalSchema);