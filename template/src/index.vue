<template>
    <div class="com" v-if="!shops">loading</div>
    <div class="com" v-else>
        <div>{{config.shops}}</div>
        <div class="shop" v-for="(shop, id) in shops">
            <h1>商户id：{{id}}</h1>
            <div class="item" v-for="item in shop">
                <img :src="item.url + '@w_50,h_50,s_2,q_90'" alt="">
                <div class="name">{{item.name}}</div>
            </div>
        </div>
        <pre>{{JSON.stringify(this.shops, null, '    ')}}</pre>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'c-test',
    props: ['config'],
    data() {
        return {
            shops: false
        };
    },
    methods: {
        fetch() {
            this.$http
                .get('/h5ui/postershopmenulist', {
                    id: this.config.id,
                    shop_ids: this.config.shops.join(',')
                })
                .then(res => {
                    this.shops = res.result;
                });
        }
    },
    watch: {
        config: {
            handler: function () {
                this.fetch();
            },
            deep: true
        }
    },
    mounted() {
        this.fetch();
    }
};
</script>
<style>
.shop {
    background: #e5e5e5;
    margin: 10px 0;
}

.item {
    display: inline-block;
    width: 50%;
    overflow: hidden;
    text-align: center;
}
</style>