<template>
    <div>
        <keep-alive v-if="$route.meta.keepAlive">
            <router-view></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="wap-home" to="/home">热映</van-tabbar-item>
            <van-tabbar-item icon="hot" to="/hot">榜单</van-tabbar-item>
            <van-tabbar-item icon="setting" to="/setting">设置</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "v-footer",
        computed: {
            active() {
                let path = this.$route.path
                switch (path) {
                    case '/home':
                        return 0;
                    case '/hot':
                        return 1;
                    case '/setting':
                        return 2;
                }
            }
        }
    }
</script>

<style scoped>

</style>
