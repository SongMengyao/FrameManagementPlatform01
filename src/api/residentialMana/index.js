let residentialApiDevUrl = ''
if (process.env.NODE_ENV === 'development') {
  residentialApiDevUrl = 'http://172.21.64.168:8089'
} else if (process.env.NODE_ENV === 'production') {
  residentialApiDevUrl = ''
}

const residentialApi = {
  housePage: residentialApiDevUrl + '/house/rest/house-page', // 查询 房型分页列表
  addHouse: residentialApiDevUrl + '/house/rest/house-save', // 新增 房型信息
  editHouse: residentialApiDevUrl + '/house/rest/house-update', // 修改 房型信息
  houseInfo: residentialApiDevUrl + '/house/rest/house-info', // 查询 房型详细信息
  zoneTree: residentialApiDevUrl + '/zone/rest/zone-tree', // 查询 区层树
  bedList: residentialApiDevUrl + '/room/rest/bed-page', // 查询 床位列表
  roomList: residentialApiDevUrl + '/room/rest/room-page', // 查询 房间列表
  zoneList: residentialApiDevUrl + '/zone/rest/zone-list', // 查询 区层信息
  zoneSave: residentialApiDevUrl + '/zone/rest/zone-save', // 新增 区层信息
  roomSave: residentialApiDevUrl + '/room/rest/room-save', // 新增 房间信息
  roomSaveList: residentialApiDevUrl + '/room/rest/room-save-list' // 新增 批量添加房间
}
export default residentialApi
