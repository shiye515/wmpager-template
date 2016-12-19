import Vue from 'vue';
import App from './App';
import mixin from '../buildin/mixin';
Vue.mixin(mixin);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    render(h) {
        return h(App);
    }
});