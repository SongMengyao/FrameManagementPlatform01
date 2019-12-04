<template>
  <a-card :bordered="false">
    <a-form :form="form">
      <p :style="{ fontSize: '18px', color: 'black' }">房型信息</p>
      <a-form-item
        label="房型名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :colon="false"
      >
        <a-input v-decorator="['houseName', {rules: [{required: true, whitespace: true, message: '房型名称不能为空'}]}]" />
      </a-form-item>
      <a-form-item
        label="房型图片"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :colon="false"
      >
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action="//jsonplaceholder.typicode.com/posts/"
          :beforeUpload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-item>
      <a-form-item
        label="面积"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :colon="false"
      >
        <a-input-number v-model="roomForm.houseArea" />
      </a-form-item>
      <a-form-item
        label="窗户"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :colon="false"
      >
        <a-radio-group v-model="roomForm.houseWindow">
          <a-radio value="1">有</a-radio>
          <a-radio value="2">无</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="房间设施"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :colon="false"
      >
        <a-textarea v-model="roomForm.houseFacility" autosize />
      </a-form-item>
      <a-form-item
        label="房间介绍"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :colon="false"
      >
        <a-textarea v-model="roomForm.houseDescription" autosize />
      </a-form-item>
      <p :style="{ fontSize: '18px', color: 'black' }">房型信息</p>
      <a-form-item
        label="规格名"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :colon="false"
      >
        <a-input v-model="roomForm.houseSpecs" defaultValue="床位" :disabled="true" />
      </a-form-item>
      <a-form-item
        label="规格值"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :colon="false"
      >
        <template v-for="(item, index) in roomForm.houseSpecsDtoList">
          <a-input 
            v-model="item.houseSpecsName" 
            :style="{ width: '23%', marginRight: '2%' }" 
            :key="index"
            @change="isClearHouseSpecsName(item.houseSpecsName, index)" />
        </template>
        
        <a @click="addHouseSpecsName">添加规格值</a>
      </a-form-item>
      <div :style="{ marginLeft: '16.66666%', marginBottom: '24px', width: '66.66666667%' }">
        <a-table :columns="columns" :dataSource="specificationData" bordered :pagination="false"></a-table>
      </div>
      <div :style="{ marginLeft: '16.66666%', width: '66.66666667%', textAlign: 'center' }">
        <a-button type="primary" html-type="submit" @click="handleSubmit('confirm')">确定</a-button>
        <a-button :style="{ marginLeft: '15px' }" @click="handleSubmit('cancel')">取消</a-button>
      </div>
    </a-form>
  </a-card>
</template>

<script>
// 房型图片
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

// 表头
const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    width: '100px'
  },
  {
    title: '床位',
    dataIndex: 'bedType'
  }
]
// 表 body
const specificationData = [{
  key: '1',
  number: '1',
  bedType: '床位1'
}]

export default {
  name: 'AddEditRoom',
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
      },
      form: this.$form.createForm(this),
      loading: false,
      imageUrl: '',
      previewVisible: false,
      previewImage: '',
      roomForm: {
        houseArea: null,
        houseWindow: '',
        houseFacility: '',
        houseDescription: '',
        houseSpecs: '床位',
        houseSpecsDtoList: [{
          houseSpecsName: '床位 1'
        }]
      }
    }
  },
  created() {
    if(this.$route.query.parm === 'edit') {
      const rowInfo = JSON.parse(this.$route.query.rowInfo)
      this.roomForm = {
        houseArea: rowInfo.houseArea,
        houseWindow: rowInfo.houseWindow,
        houseFacility: rowInfo.houseFacility,
        houseDescription: rowInfo.houseDescription,
        houseSpecs: rowInfo.houseSpecs
      }
      if(rowInfo.houseSpecsDtoList) {
        if(rowInfo.houseSpecsDtoList.length > 0) {
          this.roomForm.houseSpecsDtoList = []
          rowInfo.houseSpecsDtoList.forEach((item, index) => {
            this.roomForm.houseSpecsDtoList.push(item)
          })
        }
      }else {
        this.roomForm.houseSpecsDtoList = [{
          houseSpecsName: '床位 1'
        }]
      }
    }
  },
  mounted() {
    if(this.$route.query.parm === 'edit') {
      this.form.setFieldsValue({
        houseName: JSON.parse(this.$route.query.rowInfo).houseName
      })
    }
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    // 房型图片
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    // 房型图片 上传之前 进行 格式 & 大小 限制
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    },
    // 确定 || 取消
    handleSubmit (parm) {
      if(parm === 'cancel') {
        this.$router.push({
          path: '/residentialMana/index'
        })
      }else {
        const { form: { validateFields } } = this
        validateFields((errors, values) => {
          if (!errors) {
            const parm = {
              ...values,
              ...this.roomForm
            }

            if(this.$route.query.parm === 'add') {
              this.$store.dispatch('getAddHouse', parm).then(res => {
                this.$router.push({
                  path: '/residentialMana/index'
                })
              }).catch(() => {})
            }else if(this.$route.query.parm === 'edit') {
              parm.id = JSON.parse(this.$route.query.rowInfo).id
              parm.revision = JSON.parse(this.$route.query.rowInfo).revision
              this.$store.dispatch('getEditHouse', parm).then(res => {
                this.$router.push({
                  path: '/residentialMana/index'
                })
              }).catch(() => {})
            }
          }
        })
      }
    },
    // 添加规格值
    addHouseSpecsName() {
      this.roomForm.houseSpecsDtoList.push({
        houseSpecsName: `床位 ${ this.roomForm.houseSpecsDtoList.length + 1 }`
      })
      this.specificationData.push({
        key: this.roomForm.houseSpecsDtoList.length,
        number: this.roomForm.houseSpecsDtoList.length,
        bedType: `床位 ${this.roomForm.houseSpecsDtoList.length}`
      })
    },
    // 规格值 change
    isClearHouseSpecsName(parm, index) {
      if(parm === '') {
        if(this.specificationData.length > 1) {
          this.roomForm.houseSpecsDtoList.splice(index, 1)
          this.specificationData.splice(index, 1)
        }else {
          this.$message.warning('规格值最少为1个');
          this.roomForm.houseSpecsDtoList[index].houseSpecsName = '床位 1'
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
