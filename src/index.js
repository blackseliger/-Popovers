import Router from './router/index.js';

const router = Router.instance();

router
  .addRoute(/^$/, 'popovers')
  .addRoute(/^404\/?$/, 'error404')
  .setNotFoundPagePath('popovers')
  .listen();
