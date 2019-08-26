<template>
  <div class="header">
    header
  </div>
</template>

<script>
import { loginOut } from '../utils/request';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      nickName: '',
      avatar: ''
    }
  },
  computed: {
    ...mapState([
      'login'
    ])
  },
  components: {

  },
  methods: {
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
    console.log(this.login)
    this.nickName = this.login ? this.login.nickName : null
    this.avatar = this.login ? this.login.avatar : null
  }
}
</script>

<style scoped lang="scss">
	.header{
		height: 54px;
		line-height: 54px;
		background-color: rgba(62, 76, 89, 1);
    color: #fff;
    .icon-user{
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      position: relative;
      top: -2px;
      background: url('../assets/zh.png') no-repeat;
      width: 15px;
      height: 17px;
    }  
		.header-inner{
			width: 1120px;
			margin: 0 auto;
		}
		.logo{
      font-size: 18px;

      a:active{
        text-decoration: none;
      }
      span{
        color: #fff;
      }
			img{
				vertical-align: middle;
				margin-right: 10px;
			}
		}
		.userinfo{
			float: right;
			font-size: 14px;
      color: #C1BEBE;
      cursor: pointer;
      
      .el-dropdown-link{
        color: #fff;
      }
    }
    
    a{
      color: #fff;
    }

    .avatar{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 5px;
      position: relative;
      top: -1px;
    }
	}
</style>