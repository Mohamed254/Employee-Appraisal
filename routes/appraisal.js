const express = require('express');
const { createAppraisal, getAppraisal, getSingleAppraisal, updateAppraisal, deleteAppraisal, appraisalFileUpload} = require('../controllers/appraisalController');


const Appraisal = require('../models/Appraisal');

const router = express.Router();

// const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');



router.put('/:id/doc', protect, authorize('user', 'admin'), appraisalFileUpload);

router.post('/create', protect, authorize('user', 'admin'), createAppraisal);
router.get('/getall', getAppraisal);
router.get('/getsingle', protect, authorize('user'), getSingleAppraisal);
router.put('/:id', protect, authorize('admin'), updateAppraisal);
router.delete('/:id', protect, authorize('admin'), deleteAppraisal);

module.exports = router;