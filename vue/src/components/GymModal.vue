<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <header class="modal-header">
        <h2></h2>
        <button class="close-btn" @click="close">&times;</button>
      </header>
      <div class="modal-body" v-if="gym">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Classes Offered</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Name">{{ gym.name }}</td>
              <td data-label="Classes Offered">{{ gym.classes }}</td>
              <td data-label="Location">{{ gym.location }}</td>
              <td data-label="Website"><a target="_blank":href="gym.website">External Link</a></td>
              <td data-label="Instagram"><a target="_blank" :href="gym.instagram">External Link</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  gym: Object
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #1e293b;
  color: #fff;
  padding: 24px;
  border-radius: 8px;
  min-width: 320px;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
}

tbody tr {
  margin: 0;
}


  table, thead, tbody, th, td, tr {
    display: block;
    width: 100%;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tbody tr {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    padding: 1rem;
  }

  td {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    border: none;
    font-size: 0.95rem;
  }

  /* Render label on the left using the data-label attribute */
  td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #888;
    margin-right: 1rem;
    min-width: 120px;
    text-align: left;
  }

  /* Make Gym Name header style */
  td:first-child {
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
  }
  td:first-child::before {
    display: none; /* Hide label for the title line */
  }


</style>
