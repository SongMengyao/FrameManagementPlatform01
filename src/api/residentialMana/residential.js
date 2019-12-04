import residentialApi from './index'
import { axios } from '@/utils/request'

// 查询 房型分页列表
export function getHousePage (data) {
  return axios({
    url: residentialApi.housePage,
    method: 'get',
    params: data
  })
}

// 新增 房型信息
export function getAddHouse (data) {
  return axios({
    url: residentialApi.addHouse,
    method: 'post',
    data: data
  })
}

// 修改 房型信息
export function getEditHouse (data) {
  return axios({
    url: residentialApi.editHouse,
    method: 'post',
    data: data
  })
}

// 查询 房型详细信息
export function getHouseInfo (data) {
  return axios({
    url: residentialApi.houseInfo,
    method: 'get',
    params: data
  })
}

// 查询 区层树
export function getZoneTree (data) {
  return axios({
    url: residentialApi.zoneTree,
    method: 'get',
    params: data
  })
}

// 查询 床位列表
export function getBedList (data) {
  return axios({
    url: residentialApi.bedList,
    method: 'get',
    params: data
  })
}

// 查询 房间列表
export function getRoomList (data) {
  return axios({
    url: residentialApi.roomList,
    method: 'get',
    params: data
  })
}

// 查询 区层信息
export function getZoneList (data) {
  return axios({
    url: residentialApi.zoneList,
    method: 'get',
    params: data
  })
}

// 新增 区层信息
export function getZoneSave (data) {
  return axios({
    url: residentialApi.zoneSave,
    method: 'post',
    data: data
  })
}

// 新增 区层信息
export function getRoomSave (data) {
  return axios({
    url: residentialApi.roomSave,
    method: 'post',
    data: data
  })
}

// 新增 批量添加房间
export function getRoomSaveList (data) {
  return axios({
    url: residentialApi.roomSaveList,
    method: 'post',
    data: data
  })
}
