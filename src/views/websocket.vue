<template>
  <div>
      websocket
  </div>
</template>

<script>
export default {
    data(){
        return{
            user : JSON.parse(localStorage.getItem("user"))?JSON.parse(localStorage.getItem("user")):null

        }
    },
    created(){
        this.initWebSocket();
    },
    methods: {
      initWebSocket(){ //初始化weosocket
        const wsuri = "ws://localhost:8002/webSocket/"+this.user.id+'?Authorization='+localStorage.getItem("token");
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        let actions = {"test":"12345"};
        this.websocketsend(JSON.stringify(actions));
      },
      websocketonerror(){//连接建立失败重连
        console.log("----连接失败，，重连")
        this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收

        //const redata = JSON.parse(e.data);
        console.log(e.data);
      },
      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
    },
}
</script>

<style>

</style>