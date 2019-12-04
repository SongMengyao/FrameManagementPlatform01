<template>
  <a-card :bordered="false">
    <a-table 
      :columns="columns" 
      :dataSource="houseData"
      :pagination="pagination"
      @change="changeHandle">
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="addEditHandle('edit')">编辑</a>
        </template>
      </span>
    </a-table>
  </a-card>
</template>

<script>
// 表头
const columns = [
  {
    title: '模块',
    dataIndex: 'dictionaryCode'
  },
  {
    title: '字典项',
    dataIndex: 'dictionaryName'
  },
  {
    title: '字典值',
    dataIndex: 'dictionaryItemStr'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
// 表body
const houseData = [{
  key: '1',
  dictionaryCode: '大床房',
  dictionaryName: '大床',
  dictionaryItemStr: '落地窗'
}, {
  key: '2',
  dictionaryCode: '大床房',
  dictionaryName: '大床',
  dictionaryItemStr: '落地窗'
}, {
  key: '3',
  dictionaryCode: '大床房',
  dictionaryName: '大床',
  dictionaryItemStr: '落地窗'
}];

export default {
  name: 'Dictionary',
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
      }
    }
  },
  methods: {
    // 编辑字典
    addEditHandle(parm) {
      console.log("编辑字典------------->")
    },
    // 分页 change
    changeHandle(pagination) {
      console.log('分页-------------->', pagination)
    }
  }
}
</script>
