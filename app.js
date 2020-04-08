const http = require('http');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const pmx = require('@pm2/io');
const { createHttpTerminator } = require('http-terminator');

const app = new Koa();
app.use(bodyParser());

// Settings
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 5000;

app.use(async ctx => {
  console.log(JSON.stringify(ctx.request.body))
  ctx.body = { msg: 'Hello World' };
});
// Listen
const server = http
  .createServer(app.callback())
  .listen(PORT, HOST, listeningReporter)

const dalek = createHttpTerminator({ server });

// A function that runs in the context of the http server
// and reports what type of server listens on which port
function listeningReporter() {
  // `this` refers to the http server here
  const { address, port } = this.address();
  const protocol = this.addContext ? 'https' : 'http';
  console.log(`Listening on ${protocol}://${address}:${port}...`);
}

const exterminate = async () => {
  console.log('Exterminate, exterminate!')
  await dalek.terminate()
}

const graceful = async reply => {
  await exterminate()
  console.log(reply)
  reply({ success: true });
}

pmx.action('exterminate', graceful);

process.on('SIGINT', exterminate)