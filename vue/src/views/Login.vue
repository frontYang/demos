<template>
	<div class="page page-login">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>        
      </el-form-item>
    </el-form>
	</div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';

	export default {
		name: 'login',
		data() {
			return {
        ruleForm: {
          username: '',
          password: '',
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
          ],
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
      
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$request.login({
              username: this.ruleForm.username,
              password: this.ruleForm.password,
            }).then(res => {
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('username', res.data.username)
              this.setUser({
                username: res.data.username
              })
              this.$router.push('/index')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
.page-login{
	background: #fff;
	text-align: center;
	padding-top: 62px;
	margin-top: 25px;
	padding-bottom: 130px;
}
</style>

