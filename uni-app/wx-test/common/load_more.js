
import http from '@/common/http'

class LoadMore {
  constructor (params) {
    this.config = Object.assign({
      list: [], // 数据 
      pageNo: 1, // 页码
      size: 10, // 每页数量
      totalPage: 1, // 总页数
      total: 0, // 总数量
      loading: 1, // 加载状态,1: 加载中，2：加载完成
      data: null, // 额外参数
    }, params)
   
    this._getData()
  }

  async _getData(type){
    uni.showToast({
      title: '加载中...',
      icon: 'loading'
    }) 
    let list = this.config.list

    const dataParams = Object.assign({
      pageNo: this.config.pageNo
    }, this.config.data);
    const data = await http.get(this.config.intf, {
      data: dataParams
    })

    if(type != 1) list = list.length > 0 ? list.concat(data.list) : data.list
    else list = data.list
    
    this.config.list = list
    this.config.pageTotal = data.pageTotal
    this.config.success && this.config.success(list, this.config.loading)
  }

  lower(){
    console.log(`上拉加载`)
    let curPage = this.config.pageNo + 1
    let totalPage = this.config.pageTotal

    if(curPage > totalPage){
      console.log(`没有更多数据了`)
      uni.hideToast()
      this.config.loading = 2
      return
    }

    this.config.pageNo = curPage
    this._getData()
  }

  upper(callback){
    console.log(`下拉刷新`)
    this.config.pageNo = 1
    this.config.loading = 1
    this._getData(1)
  }
}

const loadMore = function(params){
  return new LoadMore(params)
}

export default loadMore