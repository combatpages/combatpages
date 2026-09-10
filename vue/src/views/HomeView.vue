<template>
  <PageSection title="Welcome" code="home">
      <div id="intro-home">
        <p>These Combat Pages are an exploration of combat sport gyms and organisations, especially - but not limited to
          - those in the greater area of Sydney, NSW, Australia.</p>
        <p>I share not only my story and my gym visits, but also as much information as I can find on gyms, combat sport
          organisations (e.g. fight promotions and competitions), and learning resources of all kinds.</p>
        <p>I want you all to benefit from the work I've done scrolling, messaging, emailing, reading, watching,
          striking, clinching, and rolling. On that note, check out <router-link to="/visits">My Visits</router-link> to get started on
          the journey!</p>
      </div>
  </PageSection>
</template>

<script>
import PageSection from '../components/PageSection.vue';
export default {
  components: {
    PageSection
  },
  name: 'HomeView',
};
</script>

<style scoped>
/* Add any specific styles for HomeView here */
</style>