import uploader from '../../utilities/singleUploader';

function avatarUpload(req, res, next) {
  const upload = uploader(
    'avatars',
    ['image/jpg', 'image/png', 'image/jpeg'],
    1000000,
    'Only .jpg, .jpeg and .png format is allowed'
  );
  /// call the middler function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatars: {
            message: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

export default avatarUpload;
