const destinations = [
  {
    name: "Lo Manthang",
    region: "Mustang",
    altitude: "3,810m",
    category: "Hidden Gem",
    icon: "🏯",
    badge: "badge-amber",
  },
  {
    name: "Tsum Valley",
    region: "Gorkha",
    altitude: "2,000–3,700m",
    category: "Cultural",
    icon: "🌿",
    badge: "badge-teal",
  },
  {
    name: "Rara Lake",
    region: "Mugu",
    altitude: "2,990m",
    category: "Nature",
    icon: "🏞",
    badge: "badge-blue",
  },
  {
    name: "Khaptad National Park",
    region: "Doti",
    altitude: "3,000m",
    category: "Open",
    icon: "⛩",
    badge: "badge-teal",
  },
  {
    name: "Upper Dolpo",
    region: "Dolpa",
    altitude: "3,600m",
    category: "Hidden Gem",
    icon: "🏔",
    badge: "badge-amber",
  },
  {
    name: "Panch Pokhari",
    region: "Sindhupalchok",
    altitude: "4,100m",
    category: "Nature",
    icon: "💧",
    badge: "badge-blue",
  },
  {
    name: "Sailung Hill",
    region: "Dolakha",
    altitude: "3,146m",
    category: "Scenic",
    icon: "🌄",
    badge: "badge-teal",
  },
];

function renderDestinations(list) {
  const container = document.getElementById("destinationList");
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML =
      "<p style='color:var(--text-muted);font-size:13px;'>No destinations found.</p>";
    return;
  }
  list.forEach((dest) => {
    container.innerHTML += `
      <div class="dest-card">
        <div class="dest-thumb">${dest.icon}</div>
        <div class="dest-info">
          <h3>${dest.name}</h3>
          <p>${dest.region} · ${dest.altitude}</p>
          <span class="badge ${dest.badge}">${dest.category}</span>
        </div>
      </div>
    `;
  });
}

function filterDestinations() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(query) ||
      d.region.toLowerCase().includes(query) ||
      d.category.toLowerCase().includes(query),
  );
  renderDestinations(filtered);
}

document
  .getElementById("searchInput")
  .addEventListener("input", filterDestinations);
renderDestinations(destinations);
