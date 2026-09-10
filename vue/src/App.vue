<template>
    <Navbar />
    <main>
      <router-view />
    </main>
    <footer v-if="show_admin_footer">
      <p>Development Mode (127.0.0.1) <router-link to="/editor">Editor</router-link></p>      
    </footer>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  },
  data(){
    return {
      show_admin_footer: 0
    }
  },
  mounted() {
    if ( window.location.hostname === '127.0.0.1'){
      this.show_admin_footer = 1;
    }
  }
}
</script>


