// 引入封装头信息和请求域名的axios对象
// 实际上 引入的就是axios
import http from './http'
// 引入请求的url地址
import {
  // 正在热映列表请求uri地址
  nowPlayingListUri,
  comingSoonListUri,
} from '@/config/url'

/**
 * 获取正在热映列表分页数据
 * @param {int} page 页码数 默认1 
 * @returns promise对象
 */
export const nowPlayingListData = (page = 1) => {
  return http.get(nowPlayingListUri + page)
}