const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
  ctx.body = {"msg":"hello"};
});

app.listen(5000);
