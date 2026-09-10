<template>
  <section class="page-view" :id="resolvedSectionId">
    <h1>{{ title }}</h1>
    <div class="main_section"><slot /></div>
  </section>
</template>

<script>
export default {
  name: 'PageSection',
  props: {
    title: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    sectionId: {
      type: String,
      default: ''
    }
  },
  computed: {
      resolvedSectionId(){
        return this.sectionId || `view-${this.code}`;
      }
  }
}
</script>

<style scoped>
.page-section {
  margin: 20px 0;
}
</style>