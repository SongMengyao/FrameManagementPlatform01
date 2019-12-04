<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" @click="addEditHandle('add', null)">新增房型</a-button>
    </div>
    <a-table 
      :columns="columns" 
      :dataSource="houseData"
      :pagination="pagination"
      @change="changeHandle">
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="addEditHandle('edit', record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="detailsHandle(record.id)">查看</a>
        </template>
      </span>
    </a-table>
    <!-- 查看 -->
    <room-Detail v-if="roomDetailsVisible" :roomDetailsVisible="roomDetailsVisible" :detailsData="detailsData" @roomDetailsVisible="RDVHandle" />
  </a-card>
</template>

<script>
import { getHousePage } from '@/api/residentialMana/residential'
import RoomDetail from './roomDetail' // 查看

// 表头
const columns = [
  {
    title: '房型图片',
    dataIndex: 'housePhoto'
  },
  {
    title: '房型名称',
    dataIndex: 'houseName'
  },
  {
    title: '面积',
    dataIndex: 'houseArea'
  },
  {
    title: '规格',
    dataIndex: 'houseSpecs'
  },
  {
    title: '窗户',
    dataIndex: 'houseWindow'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
// 表body
const houseData = [];

export default {
  name: 'RoomMana',
  components: {
    RoomDetail
  },
  data () {
    return {
      columns,
      houseData,
      pagination: {
        showSizeChanger: true,
        defaultCurrent: 1,
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        total: 50
      },
      roomDetailsVisible: false,
      detailsData: {}
    }
  },
  created () {
    // 获取 房型管理 列表数据
    this.getHousePageHandle()
  },
  methods: {
    // 新增编辑房型
    addEditHandle(parm, record) {
      this.$router.push({
        path: '/residentialMana/addEditRoom',
        query: {
          parm: parm,
          rowInfo: JSON.stringify(record)
        }
      })
    },
    // 获取 房型管理 列表数据
    getHousePageHandle () {
      let parm = {
        pageIndex: 1,
        pageSize: 20
      }
      this.$store.dispatch('getHousePage', parm).then(res => {
        const arr = res.data
        this.houseData = []
        arr.forEach((item, index) => {
          this.houseData.push({
            key: index + 1,
            ...item
          })
        })

        this.pagination.total = res.total

        console.log("this.houseData ------------>", this.houseData)
      }).catch(err => {
        console.log("getHousePage --- err--------->", err)
      })
    },
    // 查看
    detailsHandle(id) {
      this.roomDetailsVisible = true

      const parm = {
        id: id
      }
      this.$store.dispatch('getHouseInfo', parm).then(res => {
        this.detailsData = JSON.parse(JSON.stringify(res))
        this.detailsData.houseSpecsList = []
        const arr = res.houseSpecsList
        arr.forEach((item, index) => {
          this.detailsData.houseSpecsList.push({
            key: index + 1,
            ...item
          })
        })
        console.log('查看--------this.detailsData------>', this.detailsData, arr)
      }).catch(() => {})
    },
    // 查看 回调
    RDVHandle(data) {
      this.roomDetailsVisible = !data
    },
    // 分页 change
    changeHandle(pagination) {
      console.log('分页-------------->', pagination)
    }
  }
}
</script>
