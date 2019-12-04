<template>
  <div>
    <a-modal
      title="添加层区"
      :visible="addFloorVisible"
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
          label="层区名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          :colon="null"
        >
          <a-input
            v-decorator="[
              'zoneLayerName',
              {rules: [{ required: true, message: '层区名称不能为空' }]}
            ]"
            @change="handleChange"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  props: {
    addFloorVisible: {
      type: Boolean,
      default: true
    },
    getZoneListHandle: {
      type: Function,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
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
          // 新增 区层信息
          this.getZoneSaveHandle(values.zoneLayerName)
          this.$emit('addFloorVisible', this.addFloorVisible)
        }
      });
    },
    // 关闭弹框 => 叉号 || 遮罩层
    handleCancel(e) {
      console.log("handleCancel-------------->", e, this.addFloorVisible);
      this.$emit('addFloorVisible', this.addFloorVisible)
    },
    handleChange (value) {
      console.log('handleChange----->',value);
      console.log('this.form.getFieldsValue----->',this.form.getFieldsValue);
      // this.form.setFieldsValue({
      //   zoneLayerName: value,
      // });
    },
    // 新增 区层信息
    getZoneSaveHandle(name) {
      const parm ={
        zoneLayerAddress: '',
        zoneLayerName: name,
        zoneLayerPeople: '',
        parentId: 6
      }
      this.$store.dispatch('getZoneSave', parm).then(res => {
        console.log(' 新增 区层信息--res-------->', res)
        // 查询 区层信息
        if(this.getZoneListHandle) {
          this.getZoneListHandle()
        }
      }).catch(() => {})
    }
  }
}
</script>
