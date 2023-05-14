# Cricketpedia

This is a URL hashing system designed to overcome the problems of long URLs with UTM tracking that are at risk of getting ruined by formatters. The application generates unique shortened URLs using a hash function and allows click tracking while also making the URLs privacy-aware.

## Technologies Used
Node.js
Express
Crypto

## Installation
Clone the repository to your local machine.
Install the dependencies by running npm install.
Start the application by running npm start.

## Usage
To create a new shortened URL, send a POST request to the /shorten endpoint with the url parameter in the request body. The application will generate a unique shortened URL and return it along with the original URL in JSON format.

To redirect a shortened URL to its original URL, send a GET request to the /:hash endpoint with the hash of the shortened URL as the parameter. The application will track the click and redirect the user to the original URL.

Note that URL length cannot be restricted and query parameters cannot be ignored.

## API Endpoints
POST /shorten: Create a new shortened URL.
GET /:hash: Redirect a shortened URL to its original URL.

## Security Considerations
The application uses the SHA-256 hashing algorithm to ensure the security of the shortened URLs.







