<template>
    <div class="config">
        <editer :value="value" @input="emit"></editer>
    </div>
</template>
<script>
import editer from '../buildin/editer-generate';

export default {
    name: 'conf-test',
    props: ['value'],
    components: {
        editer
    },
    data() {
        return {};
    },
    computed: {},
    methods: {
        emit(value) {
            this.$bus.$emit('xxx', value);
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