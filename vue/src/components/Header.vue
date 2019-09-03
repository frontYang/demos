<template>
    <div class="header">
      <el-row>
        <el-col :span="3">
          <!-- logo+toggle -->
          <el-menu 
            class="el-menu-header el-menu-header1" 
            mode="horizontal" 
            router="router"
            v-if="!nav.toggle"
          >
            <el-menu-item index="/index" :style="!nav.toggle ? 'width: 0;' : 'width: 150px;'">
              <span slot="title">网站标题/logo</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="1">
          <!-- logo+toggle -->
          <el-menu 
            class="el-menu-header el-menu-header1" 
            mode="horizontal" 
            router="router"
          >
            <el-menu-item style="padding:0;">
              <i :class="nav.toggle ? 'el-icon-menu' : 'el-icon-menu el-icon-menu-collapse'" @click="toggleAside"></i>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="16">
          <!-- 菜单 -->
          <el-menu 
            :default-active="activeIndex" 
            class="el-menu-header" 
            mode="horizontal" 
            router="router"
          >
            <template v-for="(item, index) in nav.headerNav">
              <el-menu-item v-if="index == 0" :key="item.index" :index="item.index">{{item.label}}</el-menu-item>
              <el-menu-item v-else :key="item.index" :index="item.index + '/' + index">{{item.label}}</el-menu-item>
            </template>
          </el-menu>
        </el-col>
        <el-col :span="4">
          <!-- 信息 -->
          <el-menu 
            class="el-menu-header" 
            mode="horizontal" 
            router="router"
          >      
            <el-menu-item index="/msg">消息</el-menu-item>

            <el-submenu index="/usercenter" v-if="login.username">
              <template slot="title">{{login.username}}</template>
              <el-menu-item @click="loginOut">退出</el-menu-item>
            </el-submenu>

            <el-menu-item v-else index="usercenter">{{login.username}}</el-menu-item>
            
          </el-menu>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  props: {
    /* isCollapse: {
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
  computed: {
    ...mapState([
      'login',
      'nav'
    ])
  },
  components: {

  },
  methods: {
    ...mapMutations([
      'setToggle',
      'setUser'
    ]),

    // 收起/展开
    toggleAside(){
      this.isCollapse = !this.isCollapse
      this.setToggle(this.isCollapse)
    },

    loginOut(){
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      this.setUser({
        username: null
      })
      this.$router.push('/login')
    },
  },
  mounted(){
    
  }
}
</script>

<style lang="scss">
  @import "../assets/styles/_var.scss";

  .el-menu-header1{
    transition: width .3s;
    
    li{
      width: auto !important;
    }
    &.el-menu--horizontal {
      .el-menu-item:not(.is-disabled):focus, 
      .el-menu-item:not(.is-disabled):hover{
        width: auto;
        background-color: initial !important;
        color: $colorHeaderNav !important;
      }
    }
  }

  .header{
    background-color: $bgHeaderNav !important;
  }

  .el-menu-header{
    &.el-menu{
      background-color: $bgHeaderNav !important;
    }

    &.el-menu--horizontal>.el-menu-item,
		.el-icon-menu{
			color: $colorHeaderNav;
    }
    
    &.el-menu--horizontal>.el-menu-item.is-active{
      color: $colorHeaderNav;
    }

    &.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, 
    &.el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, 
    &.el-menu--horizontal>.el-submenu .el-submenu__title:hover{
      background-color: $bgHeaderNav !important;
      color: $colorHeaderNav;
    }

    &.el-menu--horizontal>.el-submenu .el-submenu__title{
      color: #fff;
      i{
        color: #fff;
      }
    }
  }
</style>