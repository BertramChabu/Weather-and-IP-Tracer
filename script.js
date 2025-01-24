// Select the table body and form elements
const apiTable = document.querySelector("#apiTable tbody");
const ipForm = document.getElementById("ipForm");
const ipInput = document.getElementById("ip");


// Fetch data from the API
function fetchData() {
  const ip = ipInput.value.trim(); // Get the value of the IP input field

  if (!ip) {
    console.error("IP address cannot be empty.");
    return;
  }

  const apiUrl = `http://api.ipstack.com/${ip}?access_key=place your key here`; // Dynamic API URL

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data: " + response.statusText);
      }
      return response.json(); // Convert response to JSON
    })
    .then((data) => {
      populateTable(data); // Call fetchWeather with the location data
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Populate the table with geolocation data
function populateTable(data) {
  apiTable.innerHTML = ""; // Clear existing rows

  if (!data || !data.ip) {
    console.error("No valid data returned from the API.");
    return;
  }

  // Create a new table row for the geolocation data
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${data.ip}</td>
    <td>${data.continent_name}</td>
    <td>${data.country_code}</td>
    <td>${data.country_name}</td>
    <td>${data.region_name}</td>
    <td>${data.city}</td>
    <td>${data.zip}</td>
    <td>${data.latitude}</td>
    <td>${data.longitude}</td>
  `;
  apiTable.appendChild(row);
}


// Form submission event listener
ipForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from refreshing the page
  fetchData();// Call fetchData to retrieve and display data
});
