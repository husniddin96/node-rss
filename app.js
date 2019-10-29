
const http = require('http');
const fetch = require('node-fetch');
const parser = require('xml2json-light');
const PORT = 8080;

http.createServer(async (request, response) => {
    request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
    });
    response.on('error', (err) => {
        console.error(err);
    });

    if (request.method === 'GET' && request.url === '/feeds') {

        // Fetching rss
        const data = await fetch('https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en');

        // Converting to text format
        const text = await data.text();

        // Converting from xml text to JSON
        const json = await parser.xml2json(text);

        // Retrieving titles from JSON object
        const titles = json.rss.channel.item.map(item => item.title);

        // Setting status code, headers
        response.writeHead(200, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'bacon'
        });

        response.end(JSON.stringify(arr));
    } else {
        response.statusCode = 404;
        response.end();
    }
}).listen(PORT);