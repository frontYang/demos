/**
 *  项目配置信息
 */
//  开发环境域名
let DOMAIN_DEV = '//localhost:8081'

// 生产环境域名
let DOMAIN_PROD = ''

// 判断环境
let IS_DEV = process.env.NODE_ENV == 'development'

// 接口域名
export const DOMAIN = IS_DEV ? DOMAIN_DEV : DOMAIN_PROD

// 基本配置
export let CONFIG =  {
  // 接口
  intf: {
    login: '/api/login',
    list: '/api/list',
    search: '/api/search',
    table_tree: '/api/table_tree',
    table_tree_child: '/api/table_tree_child',
    cascader: '/api/cascader',
    cascader1: '/api/cascader1',
    cascader2: '/api/cascader2',
    cascade3r: '/api/cascader3',

    get_account: '/api/get_account', // 获取账户信息
    get_appid: '/api/get_appid', // 获取应用id
    get_channel_package: '/api/get_channel_package', // 渠道包
    get_promot_plan: '/api/get_promot_plan', // 推广计划
    get_direct_package: '/api/get_direct_package', // 定向包
  }
}