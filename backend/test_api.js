const axios = require('axios');

const testData = {
    code: 'console.log("Hello, JavaScript!");',
    language: 'JavaScript'
};

// Get a valid token from localStorage (you'll need to replace this)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test'; // Replace with actual token

console.log('Testing API endpoint...');
console.log('URL: http://localhost:5000/api/problems/201/run-tests');
console.log('Data:', testData);

axios.post('http://localhost:5000/api/problems/201/run-tests', testData, {
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
    },
    timeout: 10000
})
    .then(response => {
        console.log('✅ API call successful!');
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('❌ API call failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else if (error.request) {
            console.error('No response received');
            console.error('Request:', error.request._header);
        } else {
            console.error('Error:', error.message);
        }
    });
