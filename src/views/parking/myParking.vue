<template>
  <div>
    <van-panel
      :title="item.parkingSpaceName"
      :desc="'停放时间 ' + item.gmtModified"
      status="占用"
      v-for="(item, index) in list"
      :key="index"
      :id="item.id"
    >
      <template #footer>
        <van-button size="small" type="danger" @click="updateByParting(item.id)"
          >解除占用</van-button
        >
      </template>
    </van-panel>
    <h6 v-if="list.length == 0" style="text-align: center">您未预约车位</h6>
  </div>
</template>

<script>
import parkingSpaceApi from "@/api/PartingSpace/ParkingSpace";
export default {
  data() {
    return {
      list: [],
      userId: this.$route.params.userId,
    };
  },
  created() {
    this.getList();
  },

  methods: {
    getList() {
      parkingSpaceApi.getByUserId(this.userId).then((res) => {
        this.list = res.data.parkingSpaceList;
      });
    },
    // 更新车位信息 主要解除占用车位
    updateByParting(id) {
      let parking = {
        id: id,
        isStop: 0,
        userId: null,
        userName: null,
      };
      console.log(parking);
      parkingSpaceApi.releaseOfOccupancy(parking).then((res) => {
        console.log(res);
        this.list = [];
        this.getList();
      });
    },
  },
};
</script>

<style>
</style>