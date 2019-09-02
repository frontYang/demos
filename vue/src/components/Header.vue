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
            <el-menu-item :style="!nav.toggle ? 'width: 0;' : 'width: 150px;'">
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
        <el-col :span="17">
          <!-- 菜单 -->
          <el-menu 
            :default-active="activeIndex" 
            class="el-menu-header" 
            mode="horizontal" 
            router="router"
          >
            <el-menu-item v-for="(item, index) in nav.headerNav" :key="item.index" :index="item.index">{{item.label}}</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="3">
          <!-- 信息 -->
          <el-menu 
            class="el-menu-header" 
            mode="horizontal" 
            router="router"
          >      
            <el-menu-item index="msg">消息</el-menu-item>
            <el-menu-item index="usercenter">用户</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { loginOut } from '../utils/request';
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
      'setToggle'
    ]),

    // 收起/展开
    toggleAside(){
      this.isCollapse = !this.isCollapse
      this.setToggle(this.isCollapse)
    },

    async loginOut(){
      let res = await loginOut()
      if(res.code != 1){
        sessionStorage.removeItem('user_info')
        this.nickName = null
        this.avatar = null
        this.$router.push('/login')
      }
    },

    handleCommand(command){
      command == 1 && this.loginOut()
    }
  },
  mounted(){
    this.nickName = this.login ? this.login.nickName : null
    this.avatar = this.login ? this.login.avatar : null
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
  }
</style>