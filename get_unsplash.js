const https = require('https');
const keywords = ['seoul city day bright', 'korea traditional village day bright', 'korea street food market bright', 'korea beach sunset bright'];

keywords.forEach(keyword => {
    https.get(`https://source.unsplash.com/1600x900/?${encodeURIComponent(keyword)}`, (res) => {
        console.log(keyword + ': ' + res.headers.location);
    }).on('error', (e) => {
        console.error(e);
    });
});
