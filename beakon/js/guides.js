const guides = [
  {
    name: "Raju Bista",
    initials: "RB",
    region: "Mustang",
    speciality: "Trekking",
    years: 8,
    badge: "Verified",
    badgeClass: "badge-teal",
  },
  {
    name: "Sunita Pun",
    initials: "SP",
    region: "Rara",
    speciality: "Cultural",
    years: 5,
    badge: "Verified",
    badgeClass: "badge-teal",
  },
  {
    name: "Tenzin Gurung",
    initials: "TG",
    region: "Tsum Valley",
    speciality: "Cultural & Trekking",
    years: 12,
    badge: "Senior",
    badgeClass: "badge-blue",
  },
  {
    name: "Dawa Sherpa",
    initials: "DS",
    region: "Everest Region",
    speciality: "High Altitude",
    years: 15,
    badge: "Senior",
    badgeClass: "badge-blue",
  },
  {
    name: "Pemba Lama",
    initials: "PL",
    region: "Dolpo",
    speciality: "Trekking",
    years: 6,
    badge: "Verified",
    badgeClass: "badge-teal",
  },
  {
    name: "Anita Thapa",
    initials: "AT",
    region: "Pokhara",
    speciality: "Nature & Wildlife",
    years: 4,
    badge: "Verified",
    badgeClass: "badge-teal",
  },
];

function renderGuides(list) {
  const container = document.getElementById("guideList");
  container.innerHTML = "";
  list.forEach((guide) => {
    container.innerHTML += `
      <div class="guide-card">
        <div class="avatar">${guide.initials}</div>
        <div class="dest-info">
          <h3>${guide.name} <span class="badge ${guide.badgeClass}">${guide.badge}</span></h3>
          <p>${guide.region} · ${guide.speciality} · ${guide.years} yrs</p>
        </div>
      </div>
    `;
  });
}

renderGuides(guides);
