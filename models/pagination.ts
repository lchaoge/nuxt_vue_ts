export interface Pagination {
  currentPage: number; // 当前页数
  pageSize: number; // 每页显示条目个数
  pageCount: number; // 多少页
  rowCount: number; // 总数
  pageArray: Array<number>; // 每页显示个数选择器的选项设置
  layout: string; // 组件布局
}
