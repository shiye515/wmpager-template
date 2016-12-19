import Vue from 'vue';
const bus = new Vue();
export default {
    beforeCreate() {
        this.$bus = bus;
        // console.log(this._uid, this.$options.name);
    }
};