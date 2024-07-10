// app/utils/validation.js

const { body } = require('express-validator');

const uploadFileValidation = [
  body('file').custom((value, { req }) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      throw new Error('File is required');
    }
    return true;
  })
];

module.exports = {
  uploadFileValidation
};
