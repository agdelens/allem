const http = require('http');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(bodyParser());

// Settings
const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.use(async ctx => {
  console.log(JSON.stringify(ctx.request.body))
  ctx.body = { msg: 'Hello World' };
});
// Listen
const httpServer = http.createServer(app.callback())
  .listen(PORT, HOST, listeningReporter)

// A function that runs in the context of the http server
// and reports what type of server listens on which port
function listeningReporter() {
  // `this` refers to the http server here
  const { address, port } = this.address();
  const protocol = this.addContext ? 'https' : 'http';
  console.log(`Listening on ${protocol}://${address}:${port}...`);
}