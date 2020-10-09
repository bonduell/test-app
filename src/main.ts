import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueCompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);

/*
declare global {
    interface Array<T> {
        pipeline(Array: T): Array<T>
    }
}

Array.prototype.pipeline = function( callback: any ) {
    return callback(this);
}

*/

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
