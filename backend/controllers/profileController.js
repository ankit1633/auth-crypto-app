const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    let user = await User.findOne({ clerkUserId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createOrUpdateProfile = async (req, res) => {
  try {
    const { clerkUserId, email, name, bio, phone, photo } = req.body;
    let user = await User.findOne({ clerkUserId });

    if (user) {
      // Update
      user.name = name || user.name;
      user.bio = bio || user.bio;
      user.phone = phone || user.phone;
      if (photo) user.photo = photo;
      if (req.file) user.photo = req.file.path; // from cloudinary

      await user.save();
      res.json(user);
    } else {
      // Create
      let photoUrl = photo || '';
      if (req.file) {
        photoUrl = req.file.path;
      }
      user = new User({
        clerkUserId,
        email,
        name: name || '',
        bio: bio || '',
        phone: phone || '',
        photo: photoUrl
      });
      await user.save();
      res.status(201).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProfile,
  createOrUpdateProfile
};
