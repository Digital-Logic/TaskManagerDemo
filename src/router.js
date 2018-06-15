import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function loadView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'taskList',
      component: loadView('TaskList'),
      props: true
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: loadView('About')
    // }
  ],
  mode: "history"
});
