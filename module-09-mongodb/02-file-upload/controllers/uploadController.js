const uploadController = (req, res) => {
  try {
    console.log('Body: ', req.body);
    console.log('File: ', req.file);

    res.json({ message: 'File uploaded successfully!' });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export { uploadController };
