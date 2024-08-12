import http from 'http';
import querystring from 'querystring';
import url from 'url';
import { JapaneseAIPipeline } from './transformer/class';

const server = http.createServer();
const hostname = '127.0.0.1';
const port = 3000;

server.on('request', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (!req.url) {
    res.end(JSON.stringify({ 'error': 'Bad request' }));
    return
  }

  const parsedUrl = url.parse(req.url);

  if (!parsedUrl.query) {
    res.end(JSON.stringify({ 'error': 'Bad request' }));
    return
  }

  const { text } = querystring.parse(parsedUrl.query);

  let response;
  if (parsedUrl.pathname === '/' && text) {
    const ai = await JapaneseAIPipeline.getInstance();
    // @ts-expect-error NOT TYPED FOR TYPESCRIPT
    response = await ai(String(text), undefined);
    res.statusCode = 200;
  } else {
    response = { 'error': 'Bad request' }
    res.statusCode = 400;
  }

  res.end(JSON.stringify(response));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
