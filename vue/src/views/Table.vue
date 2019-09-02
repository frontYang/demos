<template>
  <div class="page">
    <p>表格相关</p>

    <router-view/> 
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {

    }
  },
  components: {

  },
  computed: {
    ...mapState([
      'nav'
    ])
  },

  methods: {
    ...mapMutations([
      'setNavCurrent'
    ]),
  },

  mounted(){
    this.setNavCurrent(this.$route.params.id)
  }

}
</script>

<style scoped lang="sass">
</style>
