const path = require('path');
const Appraisal = require('../models/Appraisal');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const config = require("config");


// @desc      Create new Appraisal
// @route     POST /api/v1/Appraisals
// @access    Private

  exports.createAppraisal = asyncHandler(async (req, res, next) => {
    // Add user to req,body
    req.body.user = req.user.id;

      //adding username
    

    // Check for published Appraisal
    const publishedAppraisal = await Appraisal.findOne({ user: req.user.id });
  
    // If the user is not an admin, they can only add one Appraisal
    if (publishedAppraisal && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `The user with ID ${req.user.id} has already created appraisal`,
          400
        )
      );
    }
  
    
    
    
    
  const appraisal = await Appraisal.create(req.body);

  res.status(201).json({
    success: true,
    data: appraisal
  });

});




// @desc      Get all Appraisal
// @route     GET /api/v1/Appraisal
// @access    Public

  exports.getAppraisal = async (req, res) => {
    try {
      const appraisals = await Appraisal.find();
  
      res.json(appraisals);
    } catch (err) {
      res.status(400).json({ success: false });
    }
  };

  // exports.getAppraisal = asyncHandler(async (req, res, next) => {
  //   res.status(200).json(res.advancedResults);
  // });



// @desc      Get single appraisal
// @route     GET /api/v1/appraisals/:id
// @access    Private

  exports.getSingleAppraisal = async (req, res) => {
    try {
      const appraisal = await Appraisal.find({user: req.user.id});
      

      res.json(appraisal);

      //const appraisal = await Appraisal.findOne({user: req.params.id});
      // const appraisal = await Appraisal.findById(req.params.id);

     
  
      
    } catch (err) {
      res.status(400).json({ success: false });
    }
  };


// @desc      Update Appraisal
// @route     PUT /api/v1/Appraisals/:id
// @access    Private

exports.updateAppraisal = async (req, res) => {

    const { Appraisal_Name, Communication_Skills, Teamwork, Interpersonal_Skills, Problem_solving, Integrity, Status, Feedback, Overall_Score, File_Upload } = req.body;

    // Build appraisal object
    const appraisalFields = {};
    if (Appraisal_Name)appraisalFields.Appraisal_Name = Appraisal_Name;
    if (Communication_Skills)appraisalFields.Communication_Skills = Communication_Skills;
    if (Teamwork)appraisalFields.Teamwork = Teamwork;
    if (Interpersonal_Skills)appraisalFields.Interpersonal_Skills = Interpersonal_Skills;
    if (Problem_solving)appraisalFields.Problem_solving = Problem_solving;
    if (Integrity)appraisalFields.Integrity = Integrity;
    if (Status)appraisalFields.Status = Status;
    if (Feedback)appraisalFields.Feedback = Feedback;
    if (Overall_Score)appraisalFields.Overall_Score = Overall_Score;
    if (File_Upload)appraisalFields.File_Upload = File_Upload;
  


    try{

      let appraisal = await Appraisal.findById(req.params.id);
  
      // if (!appraisal) {
      //   return next(
      //     new ErrorResponse(`Appraisal not found with id of ${req.params.id}`, 404)
      //   );
      // }
  
      if (!appraisal) return res.status(404).json({ msg: "Appraisal not found" });
    
      // Make sure user is Appraisal owner
      if (appraisal.user.toString() !== req.user.id && req.user.role !== 'admin') {
  
  
        return res.status(404).json({ msg: `User ${req.user.id} is not authorized to update this Appraisal` })
        // return res(
        //   new ErrorResponse(
        //     `User ${req.user.id} is not authorized to update this Appraisal`,
        //     401
        //   )
        // );
      }
    
      appraisal = await Appraisal.findByIdAndUpdate(req.params.id, { $set: appraisalFields }, {
  
        new: true
      });
  
      res.json(appraisal);

    }catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
 
  
    // res.status(200).json({ success: true, data: appraisal });
  };


// @desc      Delete Appraisal
// @route     DELETE /api/v1/Appraisals/:id
// @access    Private

  exports.deleteAppraisal = async (req, res, next) => {
    try {
      const appraisal = await Appraisal.findByIdAndDelete(req.params.id);
  
      if (!appraisal) {
        return res.status(400).json({ success: false });
      }
  
      res.status(200).json({ success: true, data: {} });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  };


// @desc      Upload doc for appraisal
// @route     PUT /api/appraisals/:id/doc
// @access    Private
exports.appraisalFileUpload = asyncHandler(async (req, res, next) => {
  const appraisal = await Appraisal.findById(req.params.id);

  if (!appraisal) {
    return next(
      new ErrorResponse(`Appraisal not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is appraisal owner
  if (appraisal.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this appraisal`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }


  const file = req.files.file;

  // Make sure the file is a doc
  if (!file.mimetype.startsWith('application')) {
    return next(new ErrorResponse(`Please upload a document file`, 400));
  }

  // Check filesize
  if (file.size > config.get("MAX_FILE_UPLOAD")) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${config.get("MAX_FILE_UPLOAD")}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `File_Upload,_${appraisal._id}${path.parse(file.name).ext}`;

  file.mv(`${config.get("FILE_UPLOAD_PATH")}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Appraisal.findByIdAndUpdate(req.params.id, { File_Upload: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });


});