const Koa = require('koa2');
const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer();
const app = new Koa();

const appVue = new Vue({
    template: '<div>Hello,飘落的枫叶</div>'
});

app.use(async(ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    renderer.renderToString(appVue, (err, html) => {
        if (err) {
            ctx.response.body = '渲染错误';
        } else {
            ctx.response.body = html;
        }
    });
});

//添加端口监听
app.listen(3000, () => {
    console.info('server on port:', 3000);
});