const express = require('express');
const crypto = require('crypto');
const url = require('url');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));


const urls = {};

// Hash function to generate unique shortened URLs
function generateHash(originalUrl) {
  const hash = crypto.createHash('sha256');
  hash.update(originalUrl);
  return hash.digest('hex').substr(0, 8);
}

// Route for creating a new shortened URL
app.post('/shorten', (req, res) => {
  const originalUrl = req.body.url;
  const hash = generateHash(originalUrl);
  
  urls[hash] = {originalUrl, clicks: 0};
  
  const shortenedUrl = `${req.protocol}://${req.hostname}:${port}/${hash}`;
  
  res.json({
    shortenedUrl,
    originalUrl
  });
});

// Route for redirecting the shortened URL to the original URL
app.get('/:hash', (req, res) => {
  const urlData = urls[req.params.hash];
  if (!urlData) {
    return res.status(404).send('Not found');
  }
  
  // Track clicks here
  urls[req.params.hash].clicks += 1;
  console.log(`Redirecting to ${urlData.originalUrl}. Clicks: ${urlData.clicks}`);
  
  res.redirect(urlData.originalUrl);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
