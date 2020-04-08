const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
  ctx.body = { "msg": "hello" };
});

console.log(`App running on http://localhost:5000`)
app.listen(5000);
