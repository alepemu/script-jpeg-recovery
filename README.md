# Corrupt JPEG recovery script

JPEG files start with an image marker that always contains the marker code with hex values FF D8 FF.
See [JPG Signature Format: Documentation & Recovery Example](https://www.file-recovery.com/jpg-signature-format.htm)

This script works for the particular case where this marker has been shifted by random or empty data, resulting in a corrupted and unopenable image file.

## How to run the script

Manually add the desired function calls at the end of the file:

``repairJPEG(filePath)``  
``repairJPEGsInFolder(folderPath');``

Then execure the script by running:

 ``node script.js``

### Hint

To help you understand what is going on, you can use the 'Hex Editor' extension from Microsoft in VSCode to visualize the binary data and hex values of the files.