<template>
  <PageSection title="Editor" code="editor">
      <div>
          <p><router-link to="/editor/gyms">Edit Gyms</router-link></p>
      </div>
      <hr>
      <div id="cp_editor">
        <router-view />
      </div>
  </PageSection>
</template>

<script>
import PageSection from '../components/PageSection.vue';
export default {
  components: {
    PageSection
  },
  name: 'EditorView',
};
</script>
