const { db } = require('./config/firebase');

async function check() {
    try {
        console.log('Checking problems...');
        const snapshot = await db.collection('problems').get();
        console.log(`Found ${snapshot.size} problems.`);
        if (snapshot.size > 0) {
            console.log('First problem:', snapshot.docs[0].data().title);
        }

        console.log('Checking discussions...');
        const discSnapshot = await db.collection('discussions').get();
        console.log(`Found ${discSnapshot.size} discussions.`);

        console.log('Checking users...');
        const usersSnapshot = await db.collection('users').get();
        console.log(`Found ${usersSnapshot.size} users.`);

    } catch (err) {
        console.error('Error:', err);
    }
}

check();
