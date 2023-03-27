function avatarUpload(req, res, next) {
  const upload = uploader(
    'avatars',
    ['image/jpg', 'image/png', 'image/jpeg'],
    1000000,
    'Only .jpg, .jpeg and .png format is allowed'
  );
}

export default avatarUpload;
