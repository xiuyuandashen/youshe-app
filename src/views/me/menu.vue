<template>
  <div style="margin:0 10px 0 10px">
    <div class="me-avatar" >
        <van-image
            round
            width="80"
            height="80"
            :src="user.avatar"
        />
        <div style="width:50%;display:flex;align-items: flex-start;flex-direction: column;">
            <span style="font-size:1.2rem;margin-bottom:3px">{{user.name}}</span>
            <span style="color:#969799;font-size:0.5rem">UID:{{user.id}}</span>    
        </div>
    </div>
    <van-cell-group style="margin-top:10px;margin-bottom:10px">
        
        <van-cell  is-link  icon="balance-list" style="color:#d0b242">
            <template #title>
                <span style="color:#000">账单</span>
            </template>
        </van-cell>
        <van-cell  is-link  icon="bill" style="color:red">
            <template #title>
                <span style="color:#000">积分</span>
            </template>
        </van-cell>
        
        <van-cell  is-link  icon="card" style="color:red">
            <template #title>
                <span style="color:#000">优惠劵</span>
            </template>
        </van-cell>
        <van-cell  is-link  icon="chat" style="color:#dcc72f">
            <template #title>
                <span style="color:#000">信息</span>
            </template>
        </van-cell>
        <van-cell  is-link  icon="phone" style="color:rgb(59 199 13)">
            <template #title>
                <span style="color:#000">联系我们</span>
            </template>
        </van-cell>
        <van-cell  is-link  icon="setting" style="color:#fffff" to="">
            <template #title>
                <span style="color:#000">设置</span>
            </template>
        </van-cell>
        
    </van-cell-group>
  </div>
</template>

<script>
export default {
    computed:{
        user(){
            return localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):this.$store.state.user
        }
    }
}
</script>

<style>
    .me-avatar{
        display: flex;
        justify-content: space-around;
        background-color: white;
        margin-top: 10px;
        height: 90px;
        align-items: center;
        
        
    }
</style>