<template>
  <el-col :span="30">
    <el-card>
      <div class="controls">
        <el-button
          @click="handleClick"
          icon="el-icon-delete"
          circle
        ></el-button>
      </div>
      <router-link :to="{ name: 'FruitDetails', params: { id: fruit.id } }">
        <el-image :src="fruit.image" class="image" alt="fruit"></el-image>
        <div class="bottom">
          <p>{{ fruit.name }}</p>
        </div>
      </router-link>
    </el-card>
    <el-dialog title="Confirm" v-model="isDialogVisible" width="30%">
      <p>Are you sure you want to delete this fruit?</p>
      <span class="warning">Deleting this fruit is irreversible</span>
      <template #footer>
        <span>
          <el-button @click="handleClick" type="info" plain> Cancel </el-button>
          <el-button
            @click="deleteFruit(fruit.id), handleClick"
            type="primary"
            plain
          >
            Yes, delete!
          </el-button>
        </span>
      </template>
    </el-dialog>
  </el-col>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'FruitCard',
  props: {
    fruit: Object,
  },
  data() {
    return {
      isDialogVisible: false,
    }
  },
  methods: {
    ...mapActions(['deleteFruit']),
    handleClick() {
      this.isDialogVisible = !this.isDialogVisible
    },
  },
}
</script>
<style lang="scss" scoped>
.el-col {
  .controls {
    display: flex;
    flex: row nowrap;
    justify-content: flex-end;
    margin: 0.5rem;
    padding: 0.5rem;
  }
  border-radius: 4px;
  margin-bottom: 2rem;
  .image {
    width: 20vw;
    height: 20vh;
  }
  a {
    text-decoration: none;
    color: #000000;
    .bottom {
      margin-top: 1rem;
      padding: 1rem;
      p {
        font-size: 1.2rem;
      }
    }
  }
  .warning {
    font-style: italic;
    font-size: 0.65rem;
  }
}
</style>
