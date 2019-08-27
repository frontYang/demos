<template>
  <div class="page page-importcard">    
    <Crumbs label="导入卡包"></Crumbs>
    <el-card class="box-card">
      <div class="text item">
        <div class="tit">导入卡包</div>          
        <div class="con">
          <div class="tip"> 使用流程说明：请下载导入模板——在模板中填写卡片正反面信息——在页面中选择导入位置——点击批量导入完成</div>
          <div class="example">
            <a href="https://cdn-images-program.910app.com/memory/card_import_tmp.xlsx" download="卡片批量导入模板.xlsx"  title="下载"><i class="icon-excel"></i>下载卡片导入模板</a>            
          </div>          
          <div class="select-wrap">
            <span class="label">请选择导入的卡片位置</span>
            <el-select v-model="value" :placeholder="placeholder">
              <el-option
                v-for="item in options"
                :key="item.ID"
                :label="item.NAME"
                :value="item.ID">
              </el-option>
            </el-select>
          </div>
          <div class="btn-wrap">
            <el-upload
              class="upload"
              :action="uploadUrl" 
              :data="uploadData"
              accept=".xls,.xlsx"
              :on-success="handleSuccess"
              :before-upload="handleBefore"
              :on-progress="handleProgress"
              :auto-upload="true"
              :show-file-list="false"
              :file-list="fileList">
              <el-button type="primary">选择文件并导入</el-button>
            </el-upload>
            <p class="btn-tip" v-show="showErrorTip">导入的文档格式不正确</p>
          </div>
        </div>
      </div>
    </el-card>
    <div class="pop" v-show="showProgress">
      <div class="pop-mask"></div>
      <div class="pop-inner">
        <p class="pop-tip">导入中……</p>
        <el-progress :percentage="uploadPercent"></el-progress>
      </div>
    </div> 
    
    <el-dialog
      :title="dialogTitle"
      width="40%"
      :visible.sync="dialogVisible"
      :center="true"
      @close='closeDialog'>
      <div>
        <div class="dialog-success" v-if="!importErrorMsg">
          <!-- 导入成功 -->
          <em class="el-icon-success"></em>    
          <div>导入总数为{{uploadResult.all_count}}张，全部导入成功！</div>
        </div>
        <template v-else>
          <!-- 导入失败 -->
          <div class="tip-result">导入总数为{{uploadResult.all_count || 0}}张，{{uploadResult.success_count || 0}}张卡片导入成功，{{uploadResult.failed_count || 0}}张卡片导入失败</div>
          <div class="tip" v-html="importErrorMsg"></div>
          <div class="tip2" v-if="uploadResult.success_count && uploadResult.success_count != 0">重新导入可覆盖原卡片</div>
        </template>
        
      </div>
      <span slot="footer" class="dialog-footer">        
        <el-button type="primary" @click="dialogVisible = false">完成</el-button>
      </span>
    </el-dialog>
  </div>    
</template>

<script>
  import Crumbs from '../components/Crumbs';
  import { getBagList, importCard } from '../utils/request';
  import { CONFIG } from '../utils/config';

	export default {    
    name: 'importcard',
		data() {
			return {
        placeholder: '请选择',
        showErrorTip: false, // 是否显示格式错误提示
        showProgress: false, // 是否显示进度条
        dialogVisible: false, // 是否显示弹窗
        dialogTitle: '', // 弹窗标题
        uploadPercent: 0, // 进度
        fileList: [], // 文件列表
				options: [], // 选项
        value: '',  // 选中值
        uploadData: {}, // 上传额外数据
        importErrorMsg: '', // 导入失败信息
        uploadUrl: CONFIG.intf.import_card, // 导入接口
        uploadResult: {},
			}
		},
		components: {
      Crumbs
		},
		methods: {
      // 上传成功
      handleSuccess(res){
        if(res.code == -2){
          // 操作繁忙
          this.$message({
            message: res.message,
            type: 'warning'
          })
          this.showProgress = false 
          return
        }

        setTimeout(() => {
          this.dialogVisible = true;
        }, 1000);
        
        this.uploadResult = res.data

        if(res.code == -1){
          // 上传不成功
          this.importErrorMsg = res.message
          if(!res.data.success_count){
            this.dialogTitle = '导入失败'
            return 
          }

          if(res.data.success_count != res.data.all_count && res.data.all_count != 0){
            this.dialogTitle = '导入部分成功'
            return 
          }
          this.dialogTitle = '导入失败'
          return
        }
        this.importErrorMsg = ''
        this.dialogTitle = '导入成功'
      },

      // 上传前
      handleBefore(file){
        let bag_id = this.value
        let userInfo = JSON.parse(sessionStorage.getItem('user_info'))  
        this.$set(this.uploadData,'bag_id', bag_id)
        this.$set(this.uploadData,'openid', userInfo.openid)        

        if(bag_id == ''){
          this.$message({
            message: '请选择导入的卡片位置',
            type: 'warning'
          })
          return false
        }

        if (file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          this.showErrorTip = true
          return false
        }
        
        this.showProgress = true
      },

      // 上传进度
      handleProgress(event, file, fileList){
        let percent = (event.loaded / event.total ).toFixed(2) * 100;
        this.uploadPercent = percent; 
        if (this.uploadPercent >= 100){
          setTimeout(() => {
            this.showProgress = false  
          }, 1000);
        }
      },
      // 获取卡包数据
      async fetchCard(){
        let res = await getBagList()

        if(res.code != 0){
          this.$message({
            message: res.message,
            type: 'warning'
          })
          return
        }

        let { list } = res.data

        this.options = list

        if(list.length <= 0) this.placeholder = '您暂无个人卡包'
      },

      // 监听关闭事件
      closeDialog(){
        this.uploadPercent = 0;
      },
		},
		computed: {
		
		},
		mounted() {
      this.fetchCard()
		}
	}
</script>

<style lang="scss">
.page-importcard{
  .example{
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    a{
      color: #4CBEFD;
    }
  }
  .icon-excel{
    display: inline-block;
    background: url('../assets/excel.png') no-repeat;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 5px;
    position: relative;
    top: -2px;
  }  

  .tip{
    font-size: 12px;
    color: #3E3D3D;
    text-align: center;
    padding: 40px 0;
  }
  .select-wrap{
    text-align: center;
    padding-top: 45px;

    .label{
      font-size: 12px;
      padding-right: 13px;
    }
  }

  .btn-tip{
    text-align: center;
    color: #EE4040;
    font-size: 12px;
  }

  .btn-wrap{
    text-align: center;
    margin-top: 33px;
  }

  .el-progress{
    width: 240px;
    transform: scale(2);
    .el-progress-bar__outer{
      border: 1px solid #fff;
    }
    .el-progress__text{
      display: none;
    }
    .el-progress-bar{
      padding-right: 0;
    }
  }
  .pop-tip{
    color: #fff;
    text-align: center;
    font-size: 13px;
  }

  .el-select{
    width: 240px;
  }

  .el-dialog{
    .tip{
      max-height: 200px; 
      overflow-y:auto;
      text-align: left;
      font-size: 14px;
      line-height: 28px;
      color: #8B8B8B;
    }
    .tip2{
      margin-top: 20px;
      color: #EE4040;
    }
    .dialog-success{
      text-align: center;
    }
    .el-icon-success{
      font-size: 60px;
      margin-bottom: 20px; 
      color:#4CBEFD;
    }
    .icon-wrap{
      text-align: center;
    }
  }
}	
</style>

