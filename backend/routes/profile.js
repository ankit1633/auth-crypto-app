const express = require('express');
const router = express.Router();
const { getProfile, createOrUpdateProfile } = require('../controllers/profileController');
const { upload } = require('../middleware/uploadMiddleware');

router.get('/:clerkUserId', getProfile);
router.post('/', upload.single('photo'), createOrUpdateProfile);

module.exports = router;
