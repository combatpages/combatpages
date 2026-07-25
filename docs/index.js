document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      renderTable(data);
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
      document.getElementById("table-body").innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; color: #ef4444; padding: 20px;">
            Failed to load data. Please try again later.
          </td>
        </tr>
      `;
    });
});

function renderTable(items) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  items.forEach((item) => {
    const row = document.createElement("tr");

    // Format website link or fall back to N/A
    const websiteHtml = item.website && item.website !== "N/A"
      ? `<a href="${item.website}" target="_blank" rel="noopener noreferrer" class="site-link">${item.website}</a>`
      : `<span>N/A</span>`;

    // data-label values line up directly with desktop headers for mobile CSS rendering
    row.innerHTML = `
      <td data-label="Name"><strong>${item.name}</strong></td>
      <td data-label="Location">${item.location}</td>
      <td data-label="Website">${websiteHtml}</td>
      <td data-label="Date First Visited">${item.date_visited_first}</td>
    `;

    tableBody.appendChild(row);
  });
}
