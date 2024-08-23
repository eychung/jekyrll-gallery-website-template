const fs = require('fs');
const path = require('path');
const exiftool = require("exiftool-vendored").exiftool

const projectRoot = path.join(__dirname, '../');  // Root directory of the project
const imagesDir = path.join(__dirname, '../assets/images');
const outputFilePath = path.join(__dirname, '../_data', 'images.json');  // Path to store the JSON file

async function getJpgImages(dir) {
    let results = [];

    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat && stat.isDirectory()) {
            if (!fullPath.includes('thumbnail')) {
                results = results.concat(await getJpgImages(fullPath));
            }
        } else if (path.extname(file).toLowerCase() === '.jpg') {
            const relativePath = fullPath.replace(projectRoot, '/');
            let imageTags = [];

            try {
                const metadata = await exiftool.read(fullPath);
                const tagArray = metadata.Subject;

                if (Array.isArray(tagArray)) {
                    // If metadata.Subject is an array, process it
                    imageTags = tagArray.flatMap(tagString =>
                        tagString.split(',').map(tag => tag.trim()).filter(tag => tag)
                    );
                } else if (tagArray && typeof tagArray === 'string') {
                    // If metadata.Subject is a string
                    imageTags = tagArray.split(',').map(tag => tag.trim()).filter(tag => tag);
                }
                results.push({
                    path: relativePath,
                    tags: imageTags || [], // Extract tags
                });
            } catch (err) {
                console.error(`Error reading metadata for ${relativePath}:`, err);
                results.push({
                    path: relativePath,
                    tags: [], // Default to empty tags in case of error
                });
            }
        }
    }

    return results;
}

(async () => {
    try {
        const jpgImages = await getJpgImages(imagesDir);

        // Write the list of image paths to a JSON file
        fs.writeFileSync(outputFilePath, JSON.stringify(jpgImages, null, 2));
        console.log('Image paths saved to:', outputFilePath);
    } catch (err) {
        console.error("Error processing images:", err);
    } finally {
        await exiftool.end(); // Ensure the exiftool process is closed
    }
})();
