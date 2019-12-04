<template>
  <div>
    {{ data }}
    <a-table :columns="columns" :dataSource="data"></a-table>
  </div>
</template>

<script>
const columns = [{
  title: 'name',
  dataIndex: 'name'
}, {
  title: 'Age',
  dataIndex: 'age'
}, {
  title: 'Address',
  dataIndex: 'address'
}, {
  title: 'Tags',
  dataIndex: 'tags'
}, {
  title: 'Action',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}];

export default {
  name: 'table1',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      columns,
    }
  }
}
</script>

