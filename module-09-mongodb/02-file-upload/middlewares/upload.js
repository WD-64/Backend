import multer from 'multer';

//This is just for simple configuration
// const upload = multer({ dest: 'uploads' });

//This is for more custom configuration
const storage = multer.diskStorage({
  //To instruct multer where to store the images
  destination: function (req, file, cb) {
    cb(null, 'uploads');

    /*
      Another Example 

      if (file.mimetype === 'image/png') {
        cb(null, 'uploads/images');
      } else if (file.mimetype === 'application/pdf') {
        cb(null, 'uploads/pdf');
      }
    */
  },

  //To instruct multer on how to name the file
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname; //Eg: 1754040182992-profile-pic.jpeg
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/avif',
  ];

  // You can use the startsWith() method to allow all images
  // file.mimetype.startsWith('image');

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const limits = {
  //Example to restrict files to 10mb
  fileSize: 10 * 1024 * 1024, //10  * 1024 kilobytes * 1024 bytes => 10 MB
};

const upload = multer({ storage, fileFilter, limits });

export default upload;
