const path = require('path');
const File = require('../models/File');

const uploadFile = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  const file = req.files.file;
  const uploadPath = path.join(__dirname, '../../uploads/', file.name);

  file.mv(uploadPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'File upload failed', error: err });
    }

    const newFile = new File({
      filename: file.name,
      path: uploadPath
    });

    newFile.save()
      .then(() => {
        res.status(200).json({ message: 'File uploaded successfully' });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Failed to save file to database', error: err });
      });
  });
};

module.exports = {
  uploadFile
};

