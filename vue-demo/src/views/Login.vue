<template>
	<div class="page page-login">
    <div class="box-th">系统登录</div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0">
      <el-form-item label="" prop="username">
        <el-input v-model="ruleForm.username" placeholder="用户名"/>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="密码" />
      </el-form-item>
      <el-button type="primary" size="large" @click="submitForm('ruleForm')">提交</el-button>
    </el-form>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            validator: this.$validate.validateEmpty,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: this.$validate.validateEmpty,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {

  },
  computed: {
    ...mapState([
      'login'
    ])
  },
  methods: {
    ...mapMutations([
      'setUser'
    ]),

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request.login({
            username: this.ruleForm.username,
            password: this.ruleForm.password
          }).then(res => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', res.data.username)
            this.setUser({
              username: res.data.username
            })
            this.$router.push('/index')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  },
  mounted() {
  }
}
</script>

<style lang="scss">
.page-login{
	background: #fff;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  box-sizing: border-box;
  box-shadow: 0px 0px 2px 2px #eee;
  padding: 30px 0 60px;
  width: 50%;
  min-width: 320px;
  max-width: 500px;
  border-radius: 5px;
  .box-th{
    font-weight: bold;
    font-size: 24px;
    padding-bottom: 26px;
  }
  .el-form{
    width: 85%;
    margin: 0 auto;
  }
  .el-button{
    width: 100%;
  }
}
</style>

