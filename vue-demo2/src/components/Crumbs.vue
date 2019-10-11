<template>
  <div class="crumbs" v-if="$route.path != '/index'">
    <el-breadcrumb class="breadcrumb-container" separator-class="el-icon-arrow-right">
      <template v-for="item in levelList">
        <el-breadcrumb-item v-if="item.path" :key="item.path" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>	
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  props: {

  },
  data() {
    return {
      levelList: []
    }
  },
  components: {

  },

  computed: {
    ...mapState([
      'nav'
    ])
  },
  watch: {
    $route() {
      this.getBreadCrumb()
    }
  },
  methods:{
    getBreadCrumb(){
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0];
      if (first && first.name.trim().toLocaleLowerCase() !== 'index'.toLocaleLowerCase()) {
          matched = [{ path: '/index', meta: { title: '首页' }}].concat(matched)
      }
      matched.length > 0 && (matched[matched.length - 2].path = matched[matched.length - 2].path.replace(/\:id/, this.nav.current))
      this.levelList = [...matched]
    }
  },
  
  created(){
    this.getBreadCrumb()
  },
}
</script>

<style lang="scss">
	.crumbs{  
    font-size: 12px;
    padding: 20px 0;
    color: #3E3D3D;

    .el-breadcrumb__separator{
      color: #3E3D3D;
    }    
	}
</style>
