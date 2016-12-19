<template>
    <div class="config">
        <h1>{{k}}</h1>
        <div v-if="type === 'object'" class="config-sub">
            <config v-for="(v, key) in value" :value="v" :k="key" @input="updateTree"></config>
        </div>
        <div v-if="type === 'array'" class="config-sub array">
            <config v-for="(v, key) in value" :value="v" :k="key" @input="updateTree"></config>
            <button @click="value.push('')">添加一行</button>
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
            }
            else {
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
</style>