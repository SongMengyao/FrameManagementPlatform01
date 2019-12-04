<template>
  <div>
    <a-card :bordered="false">
      <!-- <a-table :columns="columns" :dataSource="data">
        <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
        <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
        <span slot="tags" slot-scope="tags">
          <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;">Invite 一 {{record.name}}</a>
          <a-divider type="vertical" />
          <a href="javascript:;">Delete</a>
          <a-divider type="vertical" />
          <a href="javascript:;" class="ant-dropdown-link">
            More actions <a-icon type="down" />
          </a>
        </span>
      </a-table> -->

      <!-- <a-pagination
        :pageSizeOptions="pageSizeOptions"
        :total="total"
        showSizeChanger
        :pageSize="pageSize"
        v-model="current"
        @showSizeChange="onShowSizeChange"
      >
          <template slot='buildOptionText' slot-scope='props'>
            <span v-if="props.value!=='50'">{{props.value}}条/页</span>
            <span v-if="props.value==='50'">全部</span>
          </template>
        </a-pagination> -->

      <!-- <a-menu
        @click="handleClick"
        style="width: 256px"
        :defaultSelectedKeys="['1']"
        :openKeys.sync="openKeys"
        mode="inline"
        :selectable="true"
      >
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
          <a-menu-item-group key="g1">
            <template slot="title"><a-icon type="qq" /><span>Item 1</span></template>
            <a-menu-item key="1">Option 1</a-menu-item>
            <a-menu-item key="2">Option 2</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="g2" title="Item 2">
            <a-menu-item key="3">Option 3</a-menu-item>
            <a-menu-item key="4">Option 4</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
          <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="7">Option 7</a-menu-item>
            <a-menu-item key="8">Option 8</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-menu><a-menu
        @click="handleClick"
        style="width: 256px"
        :defaultSelectedKeys="['1']"
        :openKeys.sync="openKeys"
        mode="inline"
        :selectable="true"
      >
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
          <a-menu-item-group key="g1">
            <template slot="title"><a-icon type="qq" /><span>Item 1</span></template>
            <a-menu-item key="1">Option 1</a-menu-item>
            <a-menu-item key="2">Option 2</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="g2" title="Item 2">
            <a-menu-item key="3">Option 3</a-menu-item>
            <a-menu-item key="4">Option 4</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
          <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="7">Option 7</a-menu-item>
            <a-menu-item key="8">Option 8</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-menu> -->

      {{ '1: ' + startValue }}<br>
      {{ '2: ' + moment(startValue, "YYYY-MM-DD HH:mm:ss") }}<br>
      {{ '2.1: ' + moment(startValue).format('"YYYY-MM-DD HH:mm:ss"') }}<br>
      {{ '3: ' + moment('2015-01-01', 'YYYY-MM-DD HH:mm:ss') }}<br>
      {{ '4: ' + moment('2018-09-27').format('YYYY-MM-DD HH:mm:ss') }}
      <a-date-picker
        showTime
        v-model="startValue"
        format="YYYY-MM-DD HH:mm:ss"
      />
      <a-button @click="resetHandle">重置</a-button>
    </a-card>

    <!-- <Table1 :data="tableData" /> -->
  </div>
</template>
<script>
import Table1 from './table1'

import moment from 'moment';
// import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const columns = [{
  dataIndex: 'name',
  key: 'name',
  slots: { title: 'customTitle' },
  scopedSlots: { customRender: 'name' },
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
}, {
  title: 'Action',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];

export default {
  name: 'TableDemo',
  components: {
    Table1
  },
  data() {
    return {
      data,
      columns,
      tableData: [],
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      current: 1,
      pageSize: 10,
      total: 0,
      current: ['mail'],
      openKeys: ['sub1'],
      startValue: null,
      tableSource: [{
        key: 1,
        name: '宋梦瑶1',
        Age: 24,
        Address: '上海市徐汇区',
        Tags: '哈哈'
      }, {
        key: 2,
        name: '宋梦瑶2',
        Age: 18,
        Address: '上海市杨浦区',
        Tags: '哈哈'
      }, {
        key: 3,
        name: '宋梦瑶2',
        Age: 18,
        Address: '上海市松江区',
        Tags: '哈哈'
      }]
    }
  },
  watch: {
    startValue(val) {
      console.log('startValue------>', val)
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    moment,
    getTableData() {
      this.tableData = []
      this.tableSource.forEach((item, index) => {
        this.tableData.push({
          ...item
        })
      })

      console.log('this.tableData----->', this.tableData)
    },
    resetHandle() {
      console.log()
    },
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize
    },
    handleClick (e) {
      console.log('click', e)
    },
    titleClick (e) {
      console.log('titleClick', e)
    }
  }
}
</script>
