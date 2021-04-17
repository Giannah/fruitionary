<template>
  <div class="main-view" v-if="allFruits">
    <h1>
      <i class="el-icon-grape"></i> Welcome to Fruitionary<i
        class="el-icon-pear"
      ></i>
    </h1>
    <p>Want to add some more fruits ? Click the '+' button below !</p>
    <el-row :gutter="30">
      <FruitCard
        v-for="fruit in allFruits"
        :key="fruit.id"
        :fruit="fruit"
      ></FruitCard>
    </el-row>
    <div class="call" v-if="showPlus">
      <el-button
        icon="el-icon-plus"
        style="width: 5rem; height: 5rem"
        circle
        @click=";(isClicked = true), (showPlus = false)"
      ></el-button>
    </div>
    <div class="call" v-if="!showPlus">
      <el-button
        icon="el-icon-minus"
        style="width: 5rem; height: 5rem"
        @click=";(isClicked = false), (showPlus = true)"
        circle
      ></el-button>
    </div>
    <div class="form" v-show="isClicked">
      <AddFruitForm></AddFruitForm>
    </div>
  </div>
</template>

<script>
import FruitCard from '@/components/FruitCard.vue'
import AddFruitForm from '@/components/AddFruitForm.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'FruitList',
  components: {
    FruitCard,
    AddFruitForm,
  },
  data() {
    return {
      showPlus: true,
      isClicked: false,
    }
  },
  methods: {
    ...mapActions(['getFruits']),
  },
  computed: {
    ...mapGetters(['allFruits']),
  },
  created() {
    this.getFruits()
  },
}
</script>
<style lang="scss" scoped>
.main-view {
  margin-top: 2rem;
  i {
    margin-left: 0.5rem;
  }
  .el-row {
    margin-bottom: 5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .call {
    margin: 3rem;
  }
}
</style>
