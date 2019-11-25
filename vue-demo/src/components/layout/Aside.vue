<template>
  <div :class="navData[nav.current].subNav ? 'menu-open' : ''">
    <el-menu
      :default-active="activeIndex"
      :collapse="nav.toggle"
      @open="handleOpen"
      @close="handleClose"
      class="el-menu-aside"
      mode="vertical"
      router="router"
      v-if="nav.current != -1"
    >
      <MenuItem
        v-for="item in navData[nav.current].subNav"
        :key="item.index"
        :item="item"
        :toggle="nav.toggle"
      />
    </el-menu>
  </div>
</template>

<script>
import MenuItem from '@/components/layout/MenuItem'
import { mapState, mapMutations } from 'vuex'
import { CONFIG } from '@/utils/config'

export default {
  props: {

  },
  data() {
    return {
      activeIndex: '0',
      router: true,
      navData: CONFIG.nav
    }
  },
  components: {
    MenuItem
  },
  computed: {
    ...mapState([
      'nav'
    ])
  },
  methods: {
    ...mapMutations([
      'setToggle'
    ]),

    handleClose() {

    },
    handleOpen() {

    }
  },

  mounted() {

  }
}
</script>

<style  lang="scss">
  .menu-open {
    .el-menu-aside{
      min-height: 100vh;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
