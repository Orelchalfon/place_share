const fs = require('fs');
const path = require('path');

const createUploadsDir = () =>
{
  const uploadsPath = path.join('src', 'uploads', 'images');
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
};

module.exports = createUploadsDir;