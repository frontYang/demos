
    var koa = require('koa');
    var parse = require('co-body');
    var session = require('koa-session');

    var form = '<form action="/login" method="POST">\
      <input name="username" type="text" value="username">\
      <input name="password" type="password" placeholder="The password is \'password\'">\
      <button type="submit">Submit</button>\
    </form>';

    var app = new koa();

    // use koa-session somewhere at the top of the app
    // we need to set the `.keys` for signed cookies and the cookie-session module
    app.keys = ['secret1', 'secret2', 'secret3'];
    app.use(session(app));

    /**
     * If `this.session.authenticated` exist, user will see 'hello world'
     * otherwise, people will get a `401` error  because they aren't logged in
     */

    app.use(async (ctx, next) => {
      if (ctx.request.path !== '/') await next()
      else ctx.body = 'welcome'
      
    });

    /**
     * If successful, the logged in user should be redirected to `/`.
     * hint: use `this.redirect`
     */

    app.use(async (ctx, next) => {
      if (ctx.request.path !== '/login')  await  next()
      
      if (ctx.request.method === 'GET') 
      ctx.body = form

    });

    /**
     * Let's redirect to `/login` after every response.
     * If a user hits `/logout` when they're already logged out,
     * let's not consider that an error and rather a "success".
     */

    app.use(async (ctx, next) => {
      if (ctx.request.path !== '/logout') await next()
      else ctx.body = 'logout success'
    });

    app.listen(1818);

    console.log(`http://localhost:${1818}`)