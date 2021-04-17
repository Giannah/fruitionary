<template>
  <div v-if="fruit" class="fruit-card">
    <h1>{{ fruit.name }}</h1>
    <div class="tags">
      <div v-if="fruit.price > 100" class="tag">
        <el-tag type="danger" size="mini">Expensive</el-tag>
      </div>
      <div v-else class="tag">
        <el-tag type="success" size="mini">Affordable</el-tag>
      </div>
      <el-tag size="mini" class="tag">{{ fruit.taste }}</el-tag>
    </div>
    <div>
      <img :src="fruit.image" alt="fruit image" />
      <p class="description">{{ fruit.description }}</p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['id'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['fruit']),
  },
  methods: {
    ...mapActions(['getFruitById']),
  },
  created() {
    this.getFruitById(this.id)
  },
}
</script>
<style lang="scss" scoped>
.fruit-card {
  width: calc(40vw);
  margin-left: auto;
  margin-right: auto;
  h1 {
    font-size: 2rem;
  }
  .tags {
    display: flex;
    flex: row nowrap;
    justify-content: center;
    align-items: baseline;
    margin-bottom: 1rem;

    .tag {
      margin-left: 0.5rem;
    }
  }

  img {
    width: 35vw;
    height: 40vh;
  }

  .description {
    text-align: justify;
  }
}
</style>
