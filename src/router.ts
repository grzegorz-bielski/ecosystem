import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'blocks',
            component: () => import('./modules/ecosystem/components/Blocks.vue'),
        },
    ],
});
