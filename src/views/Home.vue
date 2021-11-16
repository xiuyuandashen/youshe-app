<template>
  <div class="app-container">
    <van-row
      type="flex"
      justify="space-around"
      align="center"
      style="background-color: white"
    >
      <van-col span="2" style="text-align: center"
        ><van-icon name="wap-nav" style="font-size: 30px"
      /></van-col>
      <van-col offset="" span="18">
        <van-search v-model="value" placeholder="请输入搜索关键词"
      /></van-col>
    </van-row>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" style="height: 15vh">
      <van-swipe-item
        v-for="(image, index) in images"
        :key="index"
        style="text-align: center"
      >
        <img :src="image" style="height: 100%; width: auto" />
      </van-swipe-item>
    </van-swipe>
    <div class="call-item">
      <van-grid square>
        <van-grid-item
          v-for="(value, index) in values"
          :key="index"
          :text="value.title"
          :to="value.path"
        >
          <!-- <span style="font-size:13px">{{value.title}}</span> -->
          <template #icon>
            <svg-icon
              :icon-class="value.icon"
              style="font-size: 24px; margin-bottom: 7px"
            />
          </template>
          <!-- <template #text>
                    <span style="color:red">{{value.title}}</span>
                </template> -->
        </van-grid-item>
      </van-grid>
    </div>

    <div class="call-item2" style="">
      <div v-for="(item, index) in goods" :key="index" class="box">
        <img :src="item.imgUrl" alt="" width="100%" style="" />
        <span style="margin-top: 10px; padding: 3px">{{ item.title }}</span>
        <span style="color: red; padding: 3px">￥{{ item.price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "//img.alicdn.com/bao/uploaded/i2/T1BkSRFv4XXXXXXXXX_!!0-item_pic.jpg_200x200q90.jpg_.webp",
        "//img.alicdn.com/bao/uploaded/i2/89937985/O1CN011yrBl428rBGwz2QuN_!!89937985.jpg_200x200q90.jpg_.webp",
      ],
      values: [
        {
          title: "报修管理",
          path: "/repairs/list",
          icon: "repairs",
        },
        {
          title: "我的家",
          path: "/housing/list",
          icon: "home",
        },
        {
          title: "健康打卡",
          path: "/healthCard/table",
          icon: "card",
        },
        {
          title: "更多",
          path: "",
          icon: "gengduo",
        },
      ],
      value: "",
      goods: [
        {
          title: "xiaomi/小米手表运动手环",
          imgUrl:
            "//g-search2.alicdn.com/img/bao/uploaded/i4/i2/2201242197711/O1CN01Yoiid626pgm73M0ds_!!0-item_pic.jpg_360x360Q90.jpg_.webp",
          price: "999.9",
        },
        {
          title: "华为测压手表",
          imgUrl:
            "//g-search3.alicdn.com/img/bao/uploaded/i4/i2/2212294961591/O1CN01wJlAQq1NcippdNVdr_!!0-item_pic.jpg_360x360Q90.jpg_.webp",
          price: "648.9",
        },
        {
          title: "卫龙 大刀肉",
          imgUrl:
            "https://picasso.alicdn.com/imgextra/ac473c/O1CNA1Pimgrenderac473cO1CN01JqL18C1GtwRM6CPVt_!!0-item_pic.jpg?backup_url=O1CN01JqL18C1GtwRM6CPVt_!!0-item_pic.jpg&p_context=eyJiaXoiOiJzZWFyY2hTdWJzaWR5IiwiYnVja2V0SWQiOiJCIiwiY2hhbm5lbCI6IndzZWFyY2hpY29uLWl0ZW0iLCJpdGVtSWQiOiI1ODA2MDg3MzA2MDUiLCJwaWNUeXBlIjoicDExIiwicmVuZGVyQ29uZGl0aW9uIjp7fSwicmVuZGVyRGF0YSI6eyJzdWJtYWpvcm9iamVjdCI6Imh0dHBzOi8vZ3cuYWxpY2RuLmNvbS9pbWdleHRyYS9PMUNOMDFKcUwxOEMxR3R3Uk02Q1BWdF8hITAtaXRlbV9waWMuanBnIn19&sign=ac473cec1e79144cd3b4e12df6b19e96&v=10.0_360x360Q90.jpg_.webp",
          price: "15.3",
        },
        {
          title: "奥利奥饼干",
          imgUrl:
            "https://picasso.alicdn.com/imgextra/O1CNA16nZshL1wzApIFvpZi_!!787936378-0-psf.jpg",
          price: "88.8",
        },
        {
          title: "良品铺子零食大礼包",
          imgUrl:
            "//g-search2.alicdn.com/img/bao/uploaded/i4/i2/619123122/O1CN01YWaYOg1YvvEiZo35r-619123122.jpg",
          price: "189.9",
        },
      ],
    };
  },
};
</script>

<style>
.call-item {
  margin: 10px;
  background-color: white;
  /* border-radius: 30%; */
}
.app-container {
  background-color: #f7f8fa;
  /* min-height: calc( 100vw - 54px ); */
}
.call-item2 {
  /* display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around; */
  display: grid;
  grid-template-columns: 45% 45%;
  grid-column-gap: 5%;
  margin: 0 10px 0 10px;
  grid-row-gap: 10px;
  justify-content: center;
}
.box {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  background: white;

  border-radius: 10px;

  overflow: hidden;
}
</style>