<template>
<div>
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
    <el-menu-item v-for="item in nav.headerNav[nav.current].subNav" :key="item.index" :index="item.index">
      <i class="el-icon-document"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
  </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  props: {
   /*  isCollapse: {
      type: Boolean,
      default: false
    } */
  },
  data() {
    return {
      activeIndex: '0',
      router: true,
      isCollapse: false
    }
  },
  components: {

  },
  computed: {
    ...mapState([
      'nav'
    ]),
  },
  methods: {
    ...mapMutations([
      'setToggle'
    ]),

    handleClose(){

    },
    handleOpen(){

    }
  },

  mounted(){
    
  }
}
</script>

<style  lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
