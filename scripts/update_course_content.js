const fs = require('fs');
const path = require('path');

const targetPath = 'frontend/src/data/courseContent.js';
const sourcePath = 'frontend/src/data/temp_c_content.js';

try {
    const original = fs.readFileSync(targetPath, 'utf8');
    const newContent = fs.readFileSync(sourcePath, 'utf8');

    console.log('Original size:', original.length);
    console.log('New content size:', newContent.length);

    // Find start of c-programming
    // We look for the key 'c-programming': {
    const startIdx = original.indexOf("'c-programming': {");
    if (startIdx === -1) {
        throw new Error("Could not find start of 'c-programming'");
    }
    console.log('Start index found:', startIdx);

    // Find start of dsa-java (the next course)
    const endIdx = original.indexOf("'dsa-java': {");
    if (endIdx === -1) {
        throw new Error("Could not find start of 'dsa-java'");
    }
    console.log('End index found:', endIdx);

    // Find the end of c-programming block (which should be just before dsa-java)
    // We expect the previous course to end with `},` and some whitespace/newlines.
    // The previous run analysis suggested dsa-java starts at 2684.
    // The structure is `    },` followed by newline `    'dsa-java':`.
    // So if we take substring(0, startIdx) we get everything BEFORE c-programming.

    // Extract the new object body. 
    // The temp file structure: export const cProgrammingData = { ... };
    const newObjMatch = newContent.match(/export const cProgrammingData = (\{[\s\S]*\});/);
    if (!newObjMatch) {
        throw new Error("Could not parse exported object from temp file");
    }
    let replacement = newObjMatch[1]; // The object literal { ... }

    // Construct final content
    // part1: Header up to start of c-programming key
    // part2: The key " 'c-programming': "
    // part3: The replacement object
    // part4: The comma ",\n"
    // part5: The rest of the file from dsa-java onwards (endIdx)

    // NOTE: original.substring(0, startIdx) includes indentation?
    // original: 
    // 7:     'c-programming': {
    // startIdx points to the first quote '.
    // So substring(0, startIdx) ends with 4 spaces.

    const part1 = original.substring(0, startIdx);
    const part2 = "'c-programming': ";
    const part3 = replacement;
    const part4 = ",\n\n    "; // Add formatting comma and indentation for next item
    const part5 = original.substring(endIdx);

    const finalContent = part1 + part2 + part3 + part4 + part5;

    fs.writeFileSync(targetPath, finalContent);
    console.log('✅ Successfully updated courseContent.js');

} catch (e) {
    console.error('❌ Error:', e.message);
    process.exit(1);
}
