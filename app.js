const http = require('http');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const pmx = require('@pm2/io');
const { createHttpTerminator } = require('http-terminator');

const app = new Koa();
app.use(bodyParser());

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 5000;

app.use(async ctx => {
  console.log(JSON.stringify(ctx.request.body))
  ctx.body = { msg: 'Hello World' };
});

const server = http
  .createServer(app.callback())
  .listen(PORT, HOST, listeningReporter)

const dalek = createHttpTerminator({ server });

function listeningReporter() {
  const { address, port } = this.address();
  const protocol = this.addContext ? 'https' : 'http';
  console.log(`Listening on ${protocol}://${address}:${port}...`);
}

pmx.action('exterminate');

exterminate = async reply => {
  console.log('Exterminate, exterminate!')
  await dalek.terminate()
  !!reply && reply({ success: true });
}

process.on('SIGINT', exterminate)