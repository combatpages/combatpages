<template>
  <nav>
    <span class="nav-brand">
      <router-link to="/">Combat Pages</router-link>
      <a class="instagram_logo_link" href="https://www.instagram.com/combat.pages/" target="_blank" rel="noopener noreferrer">
        <img class="instagram_logo" src="/src/static/instagram_logo.svg" alt="Instagram Logo">
      </a>
    </span>
    <button class="nav-toggle" aria-label="toggle navigation" @click="toggleNav">
      <span class="hamburger"></span>
    </button>
    <ul class="nav-links" :class="{ 'nav-open': isNavActive }">
      <li><router-link to="/visits" @click="toggleNav">My Visits</router-link></li>
      <li><router-link to="/gyms" @click="toggleNav">Gyms</router-link></li>
      <li><router-link to="/events" @click="toggleNav">Events</router-link></li>
      <li><router-link to="/learn" @click="toggleNav">Learn</router-link></li>
      <!--<li><router-link to="/about" @click="toggleNav">My Story</router-link></li>-->
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isNavActive: false,
    };
  },
  methods: {
    toggleNav() {
      this.isNavActive = !this.isNavActive;
    },
  },
};
</script>

<style scoped>
/*
.nav-toggle {
  display: none;
}

.nav-links {
  list-style: none;
  display: flex;
}

.nav-links.is-active {
  display: block;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
  }

  .nav-toggle {
    display: block;
  }
}
*/
</style>
