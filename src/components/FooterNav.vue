<template>
    <van-tabbar v-model="active" >
        <van-tabbar-item name="home" icon="home-o" to="/container" >首页</van-tabbar-item>
        <van-tabbar-item name="parking" to="/container/parking" icon="stop" >
            <template #icon>
                <svg-icon icon-class="tingche" style="font-size:19px"></svg-icon>
            </template>
            停车
        </van-tabbar-item>
        <van-tabbar-item name="announcement" icon="comment-o" to="/container/announcement">社区公告</van-tabbar-item>
        <van-tabbar-item name="me" to="/container/me" icon="https://b.yzcdn.cn/vant/icon-demo-1126.png">我</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {

    data() {
        return {
            active: this.$route.meta.name
        }
    },
    components: {
        Tabbar,
       TabbarItem,
    },
}
</script>

<style>

</style>