import Vue from 'vue';
const bus = new Vue();
import http from './http';
export default {
    beforeCreate() {
        this.$bus = bus;
        this.$http = http;
        // console.log(this._uid, this.$options.name);
    }
};