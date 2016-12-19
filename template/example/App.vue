<template>
    <div id="root">
        <div class="iphone">
            <div class="component">
                <com :config="config" ref="reft"></com>
            </div>
        </div>
        <div class="editer">
            <cfg :value="config"></cfg>
        </div>
    </div>
</template>
<script>
import com from '../src';
import cfg from '../src/config';

export default {
    name: 'app',
    components: {
        com,
        cfg
    },
    data() {
        return {
            config: {
                a: 'aa',
                b: 2,
                c: {
                    d: 3,
                    e: [1]
                }
            }
        };
    },
    methods: {
        updateTree(key, value) {
            this.config = value;
            // Object.assign(this.config, value);
        }
    },
    mounted() {
        // console.log(this.$refs.reft);
        this.$bus.$on('xxx', value => {
            this.config = value;
        });
    }
};
</script>
<style>
body {
    margin: 0;
}

#root {
    height: 100vh;
}

.iphone {
    float: left;
    border: solid #eee;
    border-width: 40px 15px 60px 15px;
    border-radius: 15px;
    width: 375px;
    height: 667px;
    overflow: hidden;
    margin: 10px;
}

.component {
    background: #fff;
    overflow-x: hidden;
}

.editer {
    /*width: 50%;*/
    margin-left: 450px;
    background: #efefef;
    height: 100%;
}
</style>