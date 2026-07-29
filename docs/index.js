// Define route mappings: 'hash-path': 'section-id'
const routes = {
  '/': 'view-home',
  '/about': 'view-about',
  '/events': 'view-events',
  '/places': 'view-places',
  '/visits': 'view-visits'
};

function router() {
  // Extract route path from hash (default to '/' if empty or invalid)
  const rawHash = window.location.hash.slice(1);
  const path = rawHash || '/';

  // Get corresponding DOM ID (fallback to home if route doesn't exist)
  const activeViewId = routes[path] || routes['/'];

  // Hide all views
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active');
  });

  // Activate the target view
  const activeView = document.getElementById(activeViewId);
  if (activeView) {
    activeView.classList.add('active');
  }
}

// Listen for hash changes and initial page load
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

async function loadData() {
  try {
    // 1. Fetch places.json first
    const placesResponse = await fetch('places.json');
    if (!placesResponse.ok) {
      throw new Error(`Failed to load places.json: ${placesResponse.status}`);
    }
    const placesData = await placesResponse.json();

    // 2. Fetch visits.json second
    const visitsResponse = await fetch('visits.json');
    if (!visitsResponse.ok) {
      throw new Error(`Failed to load visits.json: ${visitsResponse.status}`);
    }
    const visitsData = await visitsResponse.json();

    // Process and render your data here using placesData and visitsData
    renderVisits(visitsData, placesData);

  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Call the async function on initialization / route handle


document.addEventListener("DOMContentLoaded", () => {
  loadData();
});

function renderVisits(visits,places) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  visits.forEach((visit) => {
    const row = document.createElement("tr");

    const code = visit.code;
    const item = places[code];
    if (item){
      // Format website link or fall back to N/A
      const websiteHtml = item.website && item.website !== "N/A"
        ? `<a href="${item.website}" target="_blank" rel="noopener noreferrer" class="site-link">${item.website}</a>`
        : `<span>N/A</span>`;

      // data-label values line up directly with desktop headers for mobile CSS rendering
      row.innerHTML = `
        <td data-label="Name"><strong>${item.name}</strong></td>
        <td data-label="Classes Taken">${visit.classes_taken}</td>
        <td data-label="Notes">${visit.notes}</td>
        <td data-label="Date First Visited">${visit.date_visited_first}</td>
        <td data-label="Location">${item.location}</td>
        <td data-label="Website">${websiteHtml}</td>
      `;

      tableBody.appendChild(row);
    }
  });
}
