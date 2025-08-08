import cloudinary from '../utils/cloudinary.js';

const uploadController = async (req, res) => {
  try {
    console.log('Body: ', req.body);
    console.log('File: ', req.file);

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profile-images',
    });
    console.log(result);

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export { uploadController };
