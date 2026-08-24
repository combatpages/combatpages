

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

async function loadData() {
  try {
    // 1. Fetch gyms.json first
    const gymsResponse = await fetch('gyms.json');
    if (!gymsResponse.ok) {
      throw new Error(`Failed to load gyms.json: ${gymsResponse.status}`);
    }
    const gymsData = await gymsResponse.json();

    renderGyms(gymsData)

    // 2. Fetch visits.json second
    const visitsResponse = await fetch('visits.json');
    if (!visitsResponse.ok) {
      throw new Error(`Failed to load visits.json: ${visitsResponse.status}`);
    }
    const visitsData = await visitsResponse.json();

    // Process and render your data here using placesData and visitsData
    renderVisits(visitsData, gymsData);

  } catch (error) {
    console.error('Error loading data:', error);
  }
}


function renderVisits(visits,places) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  visits.reverse().forEach((visit) => {
    const row = document.createElement("tr");

    const code = visit.code;
    const item = places[code];
    if (item){
      // Format website link or fall back to N/A
      const websiteHtml = item.website && item.website !== "N/A"
        ? `<a href="${item.website}" target="_blank" rel="noopener noreferrer" class="site-link">${item.name}</a>`
        : `<span>${item.name}</span>`;

      // data-label values line up directly with desktop headers for mobile CSS rendering
      row.innerHTML = `
        <td data-label="Name"><strong>${websiteHtml}</strong></a></td>
        <td data-label="Classes Taken">${visit.classes_taken}</td>
        <td data-label="Date First Visited">${visit.date_visited_first}</td>
        <td data-label="Location">${item.location}</td>
      `;

      tableBody.appendChild(row);
    }
  });
}

function renderGyms(gymsData) {
  const tableBody = document.getElementById("table-gyms");
  tableBody.innerHTML = "";
  const gym_codes = Object.keys(gymsData).sort((a, b) => 
    gymsData[a].name.localeCompare(gymsData[b].name, undefined, { sensitivity: 'base' })
  );
  gym_codes.forEach((gym_code) => {
    const row = document.createElement("tr");
    const item = gymsData[gym_code];
    if (item){
      // Format website link or fall back to N/A
      const websiteHtml = item.website && item.website !== "N/A"
        ? `<a href="${item.website}" target="_blank" rel="noopener noreferrer" class="site-link">${item.name}</a>`
        : `<span>${item.name}</span>`;

      // data-label values line up directly with desktop headers for mobile CSS rendering
      row.innerHTML = `
        <td data-label="Name"><strong>${websiteHtml}</strong></a></td>
        <td data-label="Classes Taken">${item.classes}</td>
        <td data-label="Location">${item.location}</td>
      `;

      tableBody.appendChild(row);
    }
  });
}

// Listen for hash changes and initial page load
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    // Toggle menu visibility on click
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
    });

    // Close menu when a link is tapped
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
      });
    });
  }
});