<template>
    <div class="app-container">
        <van-cell >
                <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <span style="font-size:1.0rem;font-weight: 900;">我的</span>
            </template>
        </van-cell>
        <router-view></router-view>
    </div>
    
</template>

<script>
export default {

}
</script>

<style>
    .app-container{
        background-color: #f7f8fa;
        
    }
</style>