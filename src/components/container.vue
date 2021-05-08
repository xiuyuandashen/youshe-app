<template>
  <div>
    <transition name="slide-right">
      <router-view></router-view>
    </transition>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import FooterNav from '@/components/FooterNav'

export default {
  components: { FooterNav },

}
</script>

<style>

</style>