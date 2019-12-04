<template>
  <div>
    <a-modal
      title="查看房型"
      :footer="null"
      :visible="roomDetailsVisible"
      @cancel="handleCancel"
    >
      <a-form>
        <p :style="{ fontSize: '18px', color: 'black' }">房型信息</p>
        <a-form-item
          label="房型名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :colon="false"
        >
          <span>{{ detailsData.houseName }}</span>
        </a-form-item>
        <a-form-item
          label="房型图片"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :colon="false"
        >
          <img alt="avatar" />
        </a-form-item>
        <a-form-item
          label="面积"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :colon="false"
        >
          <span>{{ detailsData.houseArea }}</span>
        </a-form-item>
        <a-form-item
          label="窗户"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :colon="false"
        >
          <span v-if="detailsData.houseWindow === '1'">有</span>
          <span v-if="detailsData.houseWindow === '2'">无</span>
        </a-form-item>
        <a-form-item
          label="房间设施"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :colon="false"
        >
          <span>{{ detailsData.houseFacility }}</span>
        </a-form-item>
        <a-form-item
          label="房间介绍"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :colon="false"
        >
          <span>{{ detailsData.houseDescription }}</span>
        </a-form-item>
        <p :style="{ fontSize: '18px', color: 'black' }">房型信息</p>
        <a-form-item
          label="规格名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :colon="false"
        >
          <a-input v-model="detailsData.houseSpecs" :disabled="true" />
        </a-form-item>
        <div :style="{ marginLeft: '16.66666%', marginBottom: '24px', width: '66.66666667%' }">
          <a-table :columns="columns" :dataSource="detailsData.houseSpecsList" bordered :pagination="false"></a-table>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
// 表头
const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    width: '100px'
  },
  {
    title: '床位',
    dataIndex: 'houseSpecsName'
  }
]
// 表 body
const specificationData = []

export default {
  props: {
    roomDetailsVisible: {
      type: Boolean,
      default: true
    },
    detailsData: {
      type: Object,
      default: () => {
        return {
          houseName: '',
          housePhoto: '',
          houseArea: '',
          houseWindow: '',
          houseFacility: '',
          houseDescription: '',
          houseSpecs: '',
          houseSpecsList: []
        }
      }
    }
  },
  data () {
    return {
      columns,
      specificationData,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
  },
  methods: {
    // 关闭弹框 => 叉号 || 遮罩层
    handleCancel(e) {
      console.log("handleCancel-------------->", e, this.roomDetailsVisible);
      this.$emit('roomDetailsVisible', this.roomDetailsVisible)
    }
  }
}
</script>
