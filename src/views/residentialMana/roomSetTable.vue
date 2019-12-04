<template>
  <a-card :bordered="false">
    <a-table 
      :columns="columns" 
      :dataSource="roomSetTableList"
      :pagination="pagination"
      @change="changeHandle">
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="addEditHandle">查看</a>
        </template>
      </span>
    </a-table>
  </a-card>
</template>

<script>
export default {
  name: 'RoomSetTable',
  props: {
    isRoom: {
      type: Boolean,
      default: false
    },
    roomSetTableList: {
      type: Array,
      default: () => {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    }
  },
  created() {
    console.log("isRoom=======>", this.isRoom)
    if(this.isRoom == false) {
      this.columns =  [
        {
          title: '房间号',
          dataIndex: 'houseNum'
        },
        {
          title: '价格',
          dataIndex: 'price'
        },
        {
          title: '所属房间',
          dataIndex: 'belongRoom'
        },
        {
          title: '所属房型',
          dataIndex: 'belongType'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }else {
      this.columns =  [
        {
          title: '房间号',
          dataIndex: 'houseNum'
        },
        {
          title: '房型',
          dataIndex: 'houseType'
        },
        {
          title: '面积',
          dataIndex: 'houseArea'
        },
        {
          title: '窗户',
          dataIndex: 'houseWin'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  data () {
    return {
      columns: [], // 表头
      pagination: {
        showSizeChanger: true,
        defaultCurrent: 1,
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        total: this.total
      }
    }
  },
  methods: {
    // 编辑字典
    addEditHandle() {
      console.log("编辑字典------------->")
    },
    // 分页 change
    changeHandle(pagination) {
      console.log('分页-------------->', pagination)
    }
  }
}
</script>
