<template>
  <PageSection title="Gyms" code="gyms">
    <table id="data-table">
      <tbody id="table-gyms">
        <tr v-for="(item, index) in gym_list">
          <td data-label="Name">
            <strong>
              <a @click.prevent="openModal(item)" href="#">
                {{ item.name }}
              </a>
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  </PageSection>
  <GymModal 
    :is-open="isModalOpen" 
    :gym="selectedGym" 
    @close="closeModal" 
  />
</template>

<script>
import gymsData from '../data/gyms.json';
import DataTable from '../components/DataTable.vue';
import PageSection from '../components/PageSection.vue';
import GymModal from '../components/GymModal.vue';

const gym_codes = Object.keys(gymsData).sort((a, b) => 
  gymsData[a].name.localeCompare(gymsData[b].name, undefined, { sensitivity: 'base' })
);
const gym_list = [];
gym_codes.forEach((gym_code) => {
  gym_list.push(gymsData[gym_code]);
});

export default {
  components: {
    DataTable,
    PageSection,
    GymModal
  },
  data() {
    return {
      gym_list,
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