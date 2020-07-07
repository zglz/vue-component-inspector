<template>
  <div class="input-container"/>
</template>
<script>
export default {
  name: 'Container02',
  components: {
  },
  props: {
    applicationId: {
      type: null,
      default () {
        return ''
      }
    },
    element: {
      type: null,
      default () {
        return false
      }
    },
    listIndex: {
      type: null,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      defaultValue: true,
      time: 1
    }
  },
  watch: {
    defaultValue: function (val) {
      if (val) {
        this.componentsView('com')
      } else {
        this.componentsView('mor')
      }
    }
  },
  mounted () {
  },
  methods: {
    componentsView (view) {
    }
  }

}
</script>

<style scoped>
</style>
<style>
</style>

