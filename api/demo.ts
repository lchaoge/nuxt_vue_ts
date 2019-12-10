import request from '~/plugins/axios';

const Urls = {
  POST_WMOPERCHECK_OPERORG_INIT: '/operplat' + '/pricechgadmin/getPageData', // 页面初始化
  POST_WMOPERCHECK_OPERORG_LIST: '/operplat' + '/pricechgadmin/list', // 页面初始化
  POST_MERCHEXHIBIT_EXPORT: '/operplat' + '/pricechgadmin/export' // 页面初始化
};

export function getPageData(data: any) {
  return request({
    url: Urls.POST_WMOPERCHECK_OPERORG_INIT,
    method: 'post',
    data
  });
}

export function getList(data: any) {
  return request({
    url: Urls.POST_WMOPERCHECK_OPERORG_LIST,
    method: 'post',
    data
  });
}
export function pricechgadminExport() {
  return Urls.POST_MERCHEXHIBIT_EXPORT;
}
