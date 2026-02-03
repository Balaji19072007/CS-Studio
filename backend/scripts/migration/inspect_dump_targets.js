const fs = require('fs').promises;
const path = require('path');

const DUMP_FILE = path.join(__dirname, 'firebase_dump.json');

async function inspect() {
    const content = await fs.readFile(DUMP_FILE, 'utf8');
    const dump = JSON.parse(content);

    const targets = dump.courses.filter(c =>
        c.title.includes('Python') || c.title.includes('C++')
    );

    console.log('Found targets:', targets.length);
    targets.forEach(t => {
        console.log(`Title: ${t.title}`);
        console.log(`ID: ${t._id}`);
        console.log(`Phases: ${t.phases ? t.phases.length : 0}`);
        if (t.phases && t.phases.length > 0) {
            console.log(`  - First Phase: ${t.phases[0].title} (Topics: ${t.phases[0].topics ? t.phases[0].topics.length : 0})`);
        }
        console.log('---');
    });
}
inspect();
