const generateImg = require('../image-generate');
const fs = require('fs');
const path = require('path');
const {mkdirp} = require('mkdirp');

const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const app = new Koa();

// 日志
const pattern = [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
].join('|');
const pattern2 = new RegExp(pattern, 'g');
const logDirectory = path.resolve(__dirname, '../logs');
const logDirectoryFile = path.resolve(__dirname, '../logs/log.txt');
mkdirp(logDirectory);

app.use(
  logger((str, args) => {
    fs.appendFileSync(logDirectoryFile, (str + '\n').replace(pattern2, ''), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }),
);

// 跨域
app.use(cors());

// 获取参数，生成图片
app.use(async (ctx) => {
  const path = ctx.request.path;
  path.split('/').forEach((item) => {
    if (item) {
      const size = /(\d+)x(\d+)/.exec(item);
      const query = ctx.request.query;

      if (size) {
        ctx.response.status = 200;
        ctx.type = 'image/png';
        ctx.body = generateImg(Number(size[1]), Number(size[2]), query.text);
      }
    } else {
      ctx.response.status = 404;
      ctx.body = '404';
    }
  });
});

app.listen(4000, () => {
  console.log('server is running at http://localhost:4000');
});
