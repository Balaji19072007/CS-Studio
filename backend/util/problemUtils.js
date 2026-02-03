const fs = require('fs').promises;
const path = require('path');

exports.loadAllProblems = async () => {
    const dataPath1 = path.join(__dirname, 'problemData.json');
    const dataPath2 = path.join(__dirname, 'courseProblemData.json');

    const [data1, data2] = await Promise.all([
        fs.readFile(dataPath1, 'utf8').then(JSON.parse).catch(() => []),
        fs.readFile(dataPath2, 'utf8').then(JSON.parse).catch(() => [])
    ]);

    // Tag problems with their type
    // Regular problems: ID < 1001 from problemData.json
    // Course problems: ID >= 1001 from courseProblemData.json
    const regularProblems = data1.map(p => ({ ...p, problemType: 'regular' }));
    const courseProblems = data2.map(p => ({ ...p, problemType: 'course' }));

    return [...regularProblems, ...courseProblems];
};

