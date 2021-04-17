<template>
  <div class="form">
    <el-form
      @submit.prevent
      :label-position="labelPosition"
      :model="fruit"
      :rules="rules"
      ref="fruit"
    >
      <h2>Add a new fruit to the deck !</h2>
      <el-form-item label="Name" prop="name">
        <el-input v-model="fruit.name" autofocus></el-input>
      </el-form-item>
      <el-form-item label="Image url" prop="image" required>
        <el-input v-model="fruit.image"></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input
          v-model="fruit.description"
          type="textarea"
          minlength="10"
          maxlength="1800"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="Taste" prop="taste">
        <el-input v-model="fruit.taste"></el-input>
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <el-input-number
          v-model="fruit.price"
          :min="1"
          :max="1000"
          :precision="2"
          :step="0.01"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Expiration date" prop="expires">
        <el-date-picker
          v-model="fruit.expires"
          type="datetime"
          placeholder="Select expiration date"
          style="width: 100%"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Color" prop="color">
        <el-color-picker
          v-model="fruit.color"
          style="width: 100%"
        ></el-color-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('fruit')">Cancel</el-button>
        <el-button type="primary" @click="submitForm('fruit')"> Add </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddFruitForm',
  data() {
    const checkImageUrl = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Url is required !'))
      } else if (
        !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
          value
        )
      ) {
        return callback(new Error('Please supply a valid url !'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'top',
      fruit: {
        name: '',
        image: '',
        price: 1,
        color: '#FFF',
        description: '',
        taste: '',
        expires: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please, enter a fruit name',
            trigger: 'change',
          },
          {
            min: 2,
            max: 20,
            message: 'Please, supply a valid fruit name !',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: 'Please, enter a description.',
            trigger: 'blur',
          },
        ],
        taste: [
          {
            required: true,
            message: 'Please enter a taste',
            trigger: 'blur',
          },
        ],
        image: [{ validator: checkImageUrl, trigger: 'blur' }],
        color: [
          { required: true, message: 'Please a color', trigger: 'change' },
        ],
        price: [
          {
            required: true,
            message: 'Please, enter a price.',
            trigger: 'blur',
          },
        ],
        expires: [
          {
            required: true,
            message: 'Please choose a date and time.',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    ...mapActions(['addFruit']),
    handleChange(value) {
      console.log(value)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addFruit({
            ...this.fruit,
            isFruit: true,
          }).then(() => {
            this.$message({
              message: 'Thanks for your contribution',
              type: 'success',
              showClose: true,
            })
            this.resetForm('fruit')
          })
        } else {
          return new Error('An error occured, try submitting again')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
  emits: ['valid'],
}
</script>
<style lang="scss">
.form {
  width: calc(30vw);
  margin-right: auto;
  margin-left: auto;
}
</style>
