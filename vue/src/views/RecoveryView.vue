<template>
  <PageSection title="Recovery" code="recovery">
    <!-- Search bar and faceted search before showing anything... -->
    <!-- Show map with geolocation -->
    <div class="table-container">
      <table id="data-table">
          <thead>
            <tr>
              <th>Business</th>
              <th>Services</th>
              <th>Locations</th>
              <th>Instagram</th>
            </tr>
          </thead>
          <tbody id="table-body">
            <tr v-for="(item, index) in health_providers">
              <td class="business" data-label="Business">
                <strong>
                  <a target="_blank" :href="item.website">
                    {{ item.business }}
                  </a>
                  <p v-if="item.names">({{ item.names }})</p>
                </strong>
              </td>
              <td class="services-container" data-label="Services"><p>{{ item.services }}</p></td>
              <td class="locations-container" data-label="Locations"><p v-for="(location,index) in item.locations">{{ location }}</p></td>
              <td class="instagram-container instagram"data-label="Instagram"><p v-for="(insta,index) in item.instagram"><a target="_blank" :href="insta.url">{{ insta.handle || insta.url  }}</a></p></td>
            </tr>
          </tbody>
      </table>
    </div>
  </PageSection>
</template>

<script>
import healthData from '../data/health_providers.json';
import PageSection from '../components/PageSection.vue';

const health_providers = [];
healthData.sort((a,b) => {
  const nameA = a.business.toUpperCase(); // ignore upper and lowercase
  const nameB = b.business.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
}).forEach((provider) => {
  //Do any other transforms here
  health_providers.push(provider);
});

export default {
  name: 'HealthView',
  components: {
    PageSection
  },
  data() {
    return {
      health_providers,
    };
  },
};
</script>

<style scoped>
.table-container {
  margin: 20px 0;
}
  td.instagram a, td.business {
    white-space: nowrap;
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
  td.instagram a, td.business {
    white-space: inherit;
  }
  /* Parent container wrapping the location <p> tags */
.locations-container, .services-container, .instagram-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Adjust spacing between rows as needed */
}

/* Ensure child p elements take full width */
.locations-container p, .services-container p, .instagram-container p {
  width: 100%;
  margin: 0;
}

}

</style>
