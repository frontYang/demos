<template>
  <div class="section section-add">
    <el-form ref="form" :model="form" label-width="80px">
      <!-- 基础信息选择 -->
      <el-card>
        <div slot="header" class="clearfix">
          <span>基础信息</span>
        </div>
        <el-form-item label="账号名称">
          <ui-select
            :data="accountData"
            :value="account"
            category="account"
            placeholder="请选择账号"
            :disabled="false"
            @selected="selected"
          >
          </ui-select>
        </el-form-item>
        <el-form-item label="应用ID">
          <el-select
            filterable
            v-model="form.appid"
            placeholder="请选择应用id"
            :disabled="!accountChange"
            @change="selected('appid')"
          >
            <el-option
              v-for="(item, index) in appidData"
              :key="index"
              :value="item.value"
              :label="item.label"
            >{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道包">
          <el-select
            filterable
            v-model="form.channelPackage"
            placeholder="请选择渠道包"
            :disabled="!appidChange"
            @change="selected('channelPackage')"
          >
            <el-option
              v-for="(item, index) in appidData"
              :key="index"
              :value="item.value"
              :label="item.label"
            >{{item.label}}</el-option>
          </el-select>
        </el-form-item>
      </el-card>

      <!-- 排期 -->
      <el-card>
        <div slot="header" class="clearfix">
          <span>排期</span>
        </div>
      </el-card>

      <!-- 广告位创意与出价 -->
      <el-card>
        <div slot="header" class="clearfix">
          <span>广告</span>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import UiSelect from '@/components/sys1/UiSelect'

export default {
  data() {
    return {
      account: '', // 账号名称
      form: {
        account: '', // 账号名称
        appid: '', // 应用id
        channelPackage: '' // 渠道包
      },
      accountData: [], // 账号数据
      appidData: [], // 应用id数据
      channelPackageData: [], // 渠道包数据
      promotPlanData: [], // 渠道包数据
      directPackageData: [], // 渠道包数据
      accountChange: false, // 账号名称是否选择，联动 应用id&推广计划&定向包
      appidChange: false // appid是否有改变，联动 渠道包
    }
  },
  components: {
    UiSelect
  },
  mounted() {
    this.getAccount()
  },

  methods: {
    async getAccount() {
      const data = await this.$request.getAccount()
      this.accountData = data.data
    },
    async getAppid() {
      const data = await this.$request.getAppid()
      this.appidData = data.data
    },
    async getChannelPackage() {
      const data = await this.$request.getChannelPackage()
      this.appidData = data.data
    },
    async getPromotPlan() {
      const data = await this.$request.getPromotPlan()
      this.promotPlanData = data.data
    },
    async getDirectPackage() {
      const data = await this.$request.getDirectPackage()
      this.directPackageData = data.data
    },

    // 选择账号名称 联动数据获取
    loadChangAccountData() {
      this.getAppid()
      this.getPromotPlan()
      this.getDirectPackage()
    },

    // 联动disabled展示
    toggleDisabled(type) {
      const obj = {
        'account': 'accountChange',
        'appid': 'appidChange'
      }
      obj[type] && (this[obj[type]] = true)
    },

    // 联动数据展示
    loadData(type) {
      const obj = {
        'account': 'loadChangAccountData',
        'appid': 'getChannelPackage'
      }
      obj[type] && this[obj[type]]()
    },

    // selected 回调
    selected(type) {
      console.log(this.form, this.account)
      this.toggleDisabled(type)
      this.loadData(type)
    }
  }
}
</script>

<style scoped lang="scss">
.el-card{
  margin-top: 25px;
}
</style>
