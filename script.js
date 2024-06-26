const fs = require('fs');
const path = require('path');

function repairJPEG(filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // Convert the data to a hex string for easy searching
    const hexString = data.toString('hex');

    // Find the index of 'ffd8ff'(which marks the start of the file)
    const startIndex = hexString.indexOf('ffd8ff');
    if (startIndex === -1) {
      console.error('Start Marker not found in file');
      return;
    }

    // Convert the start index in the hex string back to a byte index in the buffer
    const byteStartIndex = startIndex / 2;

    // Create a new buffer starting from the 'ff d8' marker
    const modifiedData = data.slice(byteStartIndex);

    // Extract the base name without extension
    const baseName = path.basename(filePath, path.extname(filePath));

    // Construct the new file name with '_repaired' prefix
    const newFileName = `${baseName}_repaired${path.extname(filePath)}`;

    // Construct newFilePath to save in the same directory
    const newFilePath = path.join(path.dirname(filePath), newFileName);

    // Save the modified data to a new file
    fs.writeFile(newFilePath, modifiedData, (err) => {
      if (err) {
        console.error('Error writing modified file:', err);
        return;
      }
      console.log('Modified file saved as:', newFilePath);
    });

  });
}

function repairJPEGsInFolder(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(folderPath, file);
      // Check if the file is a JPEG by extension
      if (path.extname(file).toLowerCase() === '.jpg' || path.extname(file).toLowerCase() === '.jpeg') {
        repairJPEG(filePath);
      }
    });
  });
}

// repairJPEG(filePath);
// repairJPEG('corrupted_image.jpg');

// repairJPEGsInFolder(folderPath);
// repairJPEGsInFolder('C:\\Users\\username\\Desktop\\corrupted_images_folder');