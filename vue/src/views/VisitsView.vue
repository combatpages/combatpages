<template>
  <PageSection title="My Visits" code="visits">
    <div class="table-container">
      <table id="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Classes Taken</th>
              <th>Date First Visited</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody id="table-body">
            <tr v-for="(item, index) in visit_list">
              <td data-label="Name">
                <strong>
                  <a @click.prevent="openModal(item.gym)" href="#">
                    {{ item.gym.name }}
                  </a>
                </strong>
              </td>
              <td data-label="Classes Taken">{{ item.classes_taken }}</td>
              <td data-label="Date First Visited">{{ item.date_visited_first}}</td>
              <td data-label="Location">{{ item.gym?.location }}</td>
            </tr>
          </tbody>
      </table>
    </div>
  </PageSection>
    <GymModal 
    :is-open="isModalOpen" 
    :gym="selectedGym" 
    @close="closeModal" 
  />
</template>

<script>
import visitsData from '../data/visits.json';
import gymsData from '../data/gyms.json';
import DataTable from '../components/DataTable.vue';
import PageSection from '../components/PageSection.vue';
import GymModal from '../components/GymModal.vue';

const visit_list = [];
visitsData.reverse().forEach((visit) => {
  const gym = gymsData[visit.code];
  if (gym){
    visit.gym = gym;
    visit_list.push(visit);
  }
});

export default {
  name: 'VisitsView',
  components: {
    DataTable,
    PageSection,
    GymModal
  },
  data() {
    return {
      visit_list,
      isModalOpen: false,
      selectedGym: null
    };
  },
  methods: {
    openModal(gym) {
      this.selectedGym = gym;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedGym = null;
    }
  }
};
</script>

<style scoped>
.table-container {
  margin: 20px 0;
}

@media screen and (max-width: 768px) {
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
    margin-bottom: 1rem;
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
}

</style>