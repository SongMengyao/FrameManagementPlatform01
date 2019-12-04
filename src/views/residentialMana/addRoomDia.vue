<template>
  <div>
    <a-modal
      title="添加房间"
      :visible="addRoomVisible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
        :form="form"
      >
        <a-form-item
          label="所属层区"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          :colon="null"
        >
          <a-input
            v-model="zoneBelong"
            :disabled="true"
          />
        </a-form-item>
        <a-form-item
          label="房间号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          :colon="null"
        >
          <a-input
            v-decorator="[
              'zoneLayerName',
              {rules: [{ required: true, message: '房间号不能为空' }]}
            ]"
            @change="handleChange"
          />
        </a-form-item>
        <a-form-item
          label="房型"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          :colon="null"
        >
          <a-select
            v-decorator="[
              'gender',
              {rules: [{ required: true, message: '房型不能为空' }]}
            ]"
            @change="handleChange"
          >
            <a-select-option value="male">
              male
            </a-select-option>
            <a-select-option value="female">
              female
            </a-select-option>
          </a-select>
        </a-form-item>
        <div :style="{ marginBottom: '24px', marginLeft: '21%', }">
          <a-table :columns="columns" :dataSource="roomData" bordered>
            <span slot="action" slot-scope="text, record">
              <a>删除</a>
            </span>
          </a-table>
        </div>
        <a-form-item
          label="房态"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          :colon="null"
        >
          <a-radio-group 
          v-decorator="[
          'radio-group',
          {rules: [{ required: true, message: '房态不能为空' }]}]">
            <a-radio value="a">
              净房
            </a-radio>
            <a-radio value="b">
              脏房
            </a-radio>
            <a-radio value="c">
              不可用
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
const columns = [{
  title: '序号',
  dataIndex: 'number',
}, {
  title: '床位',
  dataIndex: 'bedName',
}, {
  title: '床位号',
  dataIndex: 'bedNum',
}, {
  title: '操作',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' }
}]

export default {
  props: {
    addRoomVisible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      roomData: [],
      columns,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      zoneBelong: '一号楼'
    }
  },
  methods: {
    // 保存
    handleOk(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          // 新增 房间信息
          this.getRoomSaveHandle()
          this.$emit('addRoomVisible', this.addRoomVisible)
        }
      });
    },
    // 关闭弹框 => 叉号 || 遮罩层
    handleCancel(e) {
      console.log("handleCancel-------------->", e, this.addRoomVisible);
      this.$emit('addRoomVisible', this.addRoomVisible)
    },
    handleChange (value) {
      console.log('handleChange----->',value);
      console.log('this.form.getFieldsValue----->',this.form.getFieldsValue);
      // this.form.setFieldsValue({
      //   zoneLayerName: value,
      // });
    },
    // 新增 房间信息
    getRoomSaveHandle(name) {
      const parm ={
        fkTLiveZoneLayerId: 1,
        fkTLiveHouseId: 1,
        roomNum: 1001,
        roomStatus: 'a',
        bedDtoList: this.roomData
      }
      this.$store.dispatch('getRoomSave', parm).then(res => {
        console.log(' 新增 房间信息--res-------->', res)
      }).catch(() => {})
    }
  }
}
</script>
