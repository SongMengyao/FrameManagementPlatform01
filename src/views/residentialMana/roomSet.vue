<template>
  <a-card :bordered="false">
    <a-row :gutter="16">
      <a-col :span="6">
        <div class="contentLayout" :style="{ minHeight: '85vh' }">
          <a-input-search :style="{ marginBottom: '8px', width: '100%' }" @change="onChange" />
          <a-tree
            @expand="onExpand"
            :expandedKeys="expandedKeys"
            :autoExpandParent="autoExpandParent"
            :treeData="gData"
          >
            <template slot="title" slot-scope="{title}">
              <span v-if="title.indexOf(searchValue) > -1">
                {{title.substr(0, title.indexOf(searchValue))}}
                <span style="color: #f50">{{ searchValue }}</span>
                {{title.substr(title.indexOf(searchValue) + searchValue.length)}}
              </span>
              <span v-else>{{title}}</span>
            </template>
          </a-tree>
        </div>
      </a-col>
      <a-col :span="18">
        <div class="contentLayout" :style="{ marginBottom: '15px' }">
          <span :style="{ fontSize: '20px', color: 'black', float: 'right', marginTop: '15px' }">共100间</span>
          <div :style="{ marginBottom: '10px' }">
            <span :style="{ fontSize: '20px', color: 'black' }">1号楼</span>
            <span :style="{ marginLeft: '15px', cursor: 'pointer' }"><a-icon type="form" />修改</span>
          </div>
          <span>全程养老院 / 1号楼</span>
        </div>
        <div class="contentLayout" :style="{ marginBottom: '15px', padding: '0' }">
          <div class="boxTitle">
            <span>下级层区</span>
            <a-button type="primary" :style="{ float: 'right', marginTop: '3px' }" @click="addFloor">添加层区</a-button>
          </div>
          <div class="floorInfo" v-for="(item, index) in lowerLayer" :key="index">
            <span>{{ item.zoneLayerName }}</span>
            <span :style="{ float: 'right' }">{{ item.roomCount }}间 <a-icon type="right" /></span>
          </div>
          <div v-if="lowerLayer.length === 0" :style="{ padding: '15px', textAlign: 'center' }">暂无数据</div>
        </div>
        <div class="contentLayout" :style="{ padding: '0' }">
          <div class="boxTitle">
            <span>1号楼 / 1层床位</span>
            <div :style="{ float: 'right' }">
              <a-button v-if="activeKey === '2'" :style="{ marginRight: '5px' }">批量删除</a-button>
              <a-button v-if="activeKey === '2'" :style="{ marginRight: '5px' }">调整层区</a-button>
              <a-button v-if="activeKey === '2'" :style="{ marginRight: '5px' }" @click="addRoom('batch')">批量添加</a-button>
              <a-button type="primary" @click="addRoom('single')">添加房间</a-button>
            </div>
          </div>
          <div :style="{ margin: '15px' }">
            <a-tabs defaultActiveKey="1" v-model="activeKey" @change="callback">
              <a-tab-pane tab="查看床位" key="1">
                <RoomSetTable v-if="activeKey === '1'" :isRoom="false" :roomSetTableList="roomSetTableList" :total="total" />
              </a-tab-pane>
              <a-tab-pane tab="查看房间" key="2" forceRender>
                <RoomSetTable  v-if="activeKey === '2'" :isRoom="true" :roomSetTableList="roomSetTableList" :total="total" />
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </a-col>
    </a-row>
    <!-- 添加层区弹框 -->
    <AddFloorDia :addFloorVisible="addFloorVisible" @addFloorVisible="addFloorVisibleHandle" :getZoneListHandle="getZoneListHandle" />
    <!-- 添加房间弹框 -->
    <AddRoomDia :addRoomVisible="addRoomVisible" @addRoomVisible="addRoomVisibleHandle"  />
    <!-- 批量添加房间弹框 -->
    <AddRoomBatchDia :addRoomBatchVisible="addRoomBatchVisible" @addRoomBatchVisible="addRoomBatchVisibleHandle" />
  </a-card>
</template>

<script>
import RoomSetTable from './roomSetTable' // 床位 & 房间 table
import AddFloorDia from './addFloorDia' // 添加层区弹框
import AddRoomDia from './addRoomDia' // 添加房间弹框
import AddRoomBatchDia from './addRoomBatchDia' // 批量添加房间弹框

const x = 3
const y = 2
const z = 1
const gData = []

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0'
  const tns = _tns || gData

  const children = []
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`
    tns.push({ title: key, key, scopedSlots: { title: 'title' }})
    if (i < y) {
      children.push(key)
    }
  }
  if (_level < 0) {
    return tns
  }
  const level = _level - 1
  children.forEach((key, index) => {
    tns[index].children = []
    return generateData(level, key, tns[index].children)
  })
}
generateData(z)

const dataList = []
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    const key = node.key
    dataList.push({ key, title: key })
    if (node.children) {
      generateList(node.children, node.key)
    }
  }
}
generateList(gData)

const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

export default {
  name: 'RoomSet',
  components: {
    RoomSetTable,
    AddFloorDia,
    AddRoomDia,
    AddRoomBatchDia
  },
  data () {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      gData,
      activeKey: '1',
      addFloorVisible: false,
      addRoomVisible: false,
      addRoomBatchVisible: false,
      roomSetTableList: [],
      total: 0,
      lowerLayer: []
    }
  },
  created() {
    // 查询 查询 区层树
    this.getZoneTreeHandle()
    // 查询 床位列表
    this.getBedListHandle()
    // 查询 区层信息
    this.getZoneListHandle()
  },
  methods: {
    // 展开/收起节点
    onExpand (expandedKeys) {
      console.log('onExpand-----expandedKeys------>', expandedKeys)

      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    // 树 搜索
    onChange (e) {
      const value = e.target.value
      const expandedKeys = dataList.map((item) => {
        if (item.key.indexOf(value) > -1) {
          return getParentKey(item.key, gData)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      })
    },
    // tabs 切换
    callback (key) {
      console.log('callback------>', key)
      if(key === '1') {
        // 查询 床位列表
        this.getBedListHandle()
      }else if(key === '2') {
        // 查询 房间列表
        this.getRoomListHandle()
      }
    },
    // 添加层区
    addFloor() {
      console.log('添加层区----->')
      this.addFloorVisible = true
    },
    // 添加房间 单个 & 批量
    addRoom(parm) {
      if(parm === 'single') {
        this.addRoomVisible = true
      }else if(parm === 'batch') {
        this.addRoomBatchVisible = true
      }
    },
    // 添加层区 回调
    addFloorVisibleHandle(data) {
      this.addFloorVisible = !data
    },
    // 添加房间 回调
    addRoomVisibleHandle(data) {
      this.addRoomVisible = !data
    },
    // 批量添加房间 回调
    addRoomBatchVisibleHandle(data) {
      this.addRoomBatchVisible = !data
    },
    // 查询 查询 区层树
    getZoneTreeHandle() {
      const parm = {
        organizationId: 1
      }
      this.$store.dispatch('getZoneTree', parm).then(res => {
        console.log('查询 区层树--res-------->', res)
        this.gData = []
        this.gData = res
        console.log('查询 区层树--this.gData-------->', this.gData)
      }).catch(() => {})
    },
    // 查询 床位列表
    getBedListHandle() {
      const parm ={
        fkTLiveZoneLayerId: 1,
        pageIndex: 1,
        pageSize: 10
      }
      this.$store.dispatch('getBedList', parm).then(res => {
        const arr = res.data
        this.total = res.total
        this.roomSetTableList = []
        arr.forEach((ele, index) => {
          this.roomSetTableList.push({
            key: index + 1,
            ...ele
          })
        })
        console.log('查询 床位列表--this.roomSetTableList-------->', this.roomSetTableList)
      }).catch(() => {})
    },
    // 查询 房间列表
    getRoomListHandle() {
      const parm ={
        fkTLiveZoneLayerId: 1,
        pageIndex: 1,
        pageSize: 10
      }
      this.$store.dispatch('getRoomList', parm).then(res => {
        const arr = res.data
        this.total = res.total
        this.roomSetTableList = []
        arr.forEach((ele, index) => {
          this.roomSetTableList.push({
            key: index + 1,
            ...ele
          })
        })
        console.log('查询 房间列表--this.roomSetTableList-------->', this.roomSetTableList)
      }).catch(() => {})
    },
    // 查询 区层信息
    getZoneListHandle() {
      const parm ={
        id: 6
      }
      this.$store.dispatch('getZoneList', parm).then(res => {
        console.log('查询 区层信息--res-------->', res)
        this.lowerLayer = res
      }).catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
  .contentLayout {
    border: 1px solid #e8e8e8;
    padding: 15px;
  }

  .boxTitle {
    background: #fafafa;
    height: 40px; 
    width: 100%;
    border-bottom: 1px solid #e8e8e8; 
    line-height: 39px; 
    padding: 0 15px;
  }

  .floorInfo {
    border: 1px solid #e8e8e8;
    margin: 15px;
    height: 32px;
    line-height: 30px;
    border-radius: 4px;
    padding: 0 15px;
  }
  .floorInfo:hover {
    border-color: #1890ff;
    color: #1890ff;
    cursor: pointer;
  }
</style>
