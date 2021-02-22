const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const config = require("config");
const validator =  require ('validator');
const sendEmail = require('../utils/sendEmail');
const SendEmailTwo = require('../utils/SendEmailTwo');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')
const {SENDGRID_API,EMAIL} = require("../config/default.json")




const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
      api_key:SENDGRID_API
  }
}));

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {


    return res.status(400).json({ message: 'User already exists.'});
    

  }

  




  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role
  });
  

  sendTokenResponse(user, 200, res);
});


// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return res.status(400).json({ message: 'The username or password you provided is incorrect. Please try again.'});
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    // return next(new ErrorResponse({ message: 'The username or password you provided is incorrect. Please try again.'}, 401));


    return res.status(401).json({ message: 'The username or password you provided is incorrect. Please try again.'});
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: 'The username or password you provided is incorrect. Please try again.'});
  }

  sendTokenResponse(user, 200, res);
});




// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    user
  });
});



//// @desc      Get users
// @route     POST /api/v1/auth/me
// @access    Private Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  
  
  
    const users = await User.find({})
    res.json(users)
  
  
  
  
  // try {
  //   const users = await User.find({ admin: req.admin.id }).sort({
  //     date: -1,

  //   });
  //   res.json(users);
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send("Server Error");
  // }
  // res.status(200).json(res.advancedResults);

  
});





// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private Admin
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    role : req.body.role,
    
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});






// @desc      Delete user
// @route     DELETE /api/v1/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }

});
// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});


//@desc   ResetLink
//@route  Post
//access  public

exports.sendResetLink = async (req, res, next) => {
  try {

    // const { email } = req.body;
    // const user = await User.findOne({ where: { email } });
    // if (!email) {
    //   return res.status(400).send({ error: 'Email is required' });
    // }
    const user = await User.findOne({ email: req.body.email });

    
    const email = user.email;
    if (!email) {
      return res.status(400).send({ error: 'Email is required' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: 'Invalid email' });
    }
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    if(!user){
      return res.status(422).json({error:"User dont exists with that email"})
  }
    
    const resetToken = user.getResetPasswordToken();
    const link = `${req.protocol}://localhost:7000/reset_password/${resetToken}`;
    await SendEmailTwo(
      email,
      'noreply@todo.com',
      'Best To Do password reset',
      `
      <div>Click the link below to reset your password</div><br/>
      <div>${link}</div>
      `
    );
    return res.status(200).send({ message: 'Password reset link has been successfully sent to your inbox' });
  } catch (e) {
    return next(new Error(e));
  }
},




// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });


  // const userExists = await User.findOne({ email })

  if (!user) {


    return res.status(400).json({ message: 'There is no user with this email address'});
    

  }


  // if (!user) {
  //   return next(
  //     new ErrorResponse(
  //       `There is no user with the email address ${req.body.email}`,
  //       404
  //     )
  //   );
  // }

  // Get resettoken
  const resetToken = user.getResetPasswordToken();

  user.save({ validateBeforeSave: false });


  // Create reset url
  const resetUrl = `http://localhost:3000/Reset/${resetToken}`



  // const resetUrl = `${req.protocol}://${req.get(
  //   'host',
  // )}/api/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });

    res.status(200).json({
      success: true,
      data: 'Email sent'
    });
  } catch (err) {
    console.error(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Reset email could not be sent', 500));
  }
});





// @desc      RESET-PASSWORD
// @route     POST /api/v1/auth/forgotpassword
// @access    Public

// router.post('/reset-password',(req,res)=>{
// exports.forgotPassword = asyncHandler(async (req, res, next) => 

exports.Reset_Password = (req,res) => {

  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token = buffer.toString("hex")
      User.findOne({email:req.body.email})
      .then(user=>{
          if(!user){
              return res.status(422).json({error:"User dont exists with that email"})
          }
          user.resetPasswordToken = token
          user.resetPasswordExpire = Date.now() + 3600000
          user.save().then((result)=>{
              transporter.sendMail({
                  to:user.email,
                  from: user.EMAIL,
                  subject:"password reset",
                  html:`
                  <p>You requested for password reset</p>
                  <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                  `
              })
              res.json({message:"check your email"})
          })

      })
  })
};





// exports.Reset_Password = asyncHandler(async (req, res, next) => {

//   crypto.randomBytes(32,(err,buffer)=>{
//       if(err){
//           console.log(err)
//       }
//       const token = buffer.toString("hex")
//       const user = await User.findOne({ email: req.body.email });
      
      
//           if(!user){
//               return res.status(422).json({error:"User dont exists with that email"})
//           }
//           user.resetPasswordToken = token
//           user.resetPasswordExpire = Date.now() + 3600000

// 	try{
// 	transporter.sendMail({
// 		to:user.email,
//                   from:"no-replay@insta.com",
//                   subject:"password reset",
//                   html:`
//                   <p>You requested for password reset</p>
//                   <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
//                   `
//               })
//               res.json({message:"check your email"})
          

// 	}catch(err){
// 	console.error(err);

// 	}
          
          

      
//   })
// });






// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});





// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + config.get("jwt_Cookie_Expire") * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (config.get("NODE_ENV") === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};