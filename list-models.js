const https = require('https');
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("No API Key found");
  process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log(`Querying: ${url.replace(apiKey, 'HIDDEN_KEY')}`);

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`\nStatus Code: ${res.statusCode}`);
    try {
      const json = JSON.parse(data);
      if (json.error) {
        console.error("API Error:", JSON.stringify(json.error, null, 2));
      } else {
        console.log("Available Models:");
        if (json.models) {
            json.models.forEach(m => console.log(` - ${m.name}`));
        } else {
            console.log("No models returned (but no error).");
        }
      }
    } catch (e) {
      console.log("Raw Response:", data);
    }
  });
}).on('error', (err) => {
  console.error("Network Error:", err.message);
});