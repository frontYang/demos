<template>
  <div class="crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{label}}</el-breadcrumb-item>      
    </el-breadcrumb>
  </div>	
</template>

<script>
export default {
  props: {
    label: ''
  },
  data() {
    return {

    }
  },
  components: {

  }
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
