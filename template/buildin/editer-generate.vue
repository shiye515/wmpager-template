<template>
    <div class="config">
        <h1>{{k}}</h1>
        <div v-if="type === 'object'" class="config-sub">
            <config v-for="(v, key) in value" :value="v" :k="key" @input="updateTree"></config>
        </div>
        <div v-if="type === 'array'" class="config-sub array">
            <div v-for="(v, key) in value">
                <config :value="v" :k="key" @input="updateTree"></config>
                <button @click="value.splice(key, 1)" class="config-array-del">删除本行</button>
            </div>
            <button @click="value.push('')" class="config-array-add">添加一行</button>
        </div>
        <div v-if="type === 'number'">
            <input type="number" :value="value" @input="updateValue(parseFloat($event.target.value, 10))">
        </div>
        <div v-if="type === 'string'">
            <input type="text" :value="value" @input="updateValue($event.target.value)">
        </div>
    </div>
</template>
<script>
import com from '../src';

export default {
    name: 'config',
    props: ['k', 'value'],
    components: {
        com
    },
    data() {
        return {};
    },
    computed: {
        type() {
            return Object.prototype.toString.call(this.value).match(/^\[object\s(\w+)\]$/)[1].toLowerCase();
        }
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value, this.k);
        },
        updateTree(value, key) {
            let tree;
            if (this.type === 'array') {
                key = parseInt(key, 10);
                tree = this.value.slice();
                tree[key] = value;
            } else {
                tree = Object.assign({}, this.value, {
                    [key]: value
                });
            }
            this.$emit('input', tree, this.k);
        }
    }
};
</script>
<style>
.config {}

.config-sub {
    padding-left: 10px;
    border-left: 5px solid #999;
}

.config-array-del {
    background: red;
}

.config-array-add {
    margin-top: 10px;
    background: lightseagreen;
}
</style>