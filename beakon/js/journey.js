import { db, ref, push } from "./firebase.js";

let stops = [
  { title: "Kathmandu → Jomsom", detail: "Flight · 35 min" },
  { title: "Lo Manthang", detail: "Explore · 2 days" },
  { title: "Tiji Festival", detail: "Cultural Event · 3 days" },
];

function renderStops() {
  const list = document.getElementById("itineraryList");
  list.innerHTML = "";
  stops.forEach((stop, index) => {
    list.innerHTML += `
      <div class="step-card">
        <div class="step-num">${index + 1}</div>
        <div class="dest-info">
          <h3>${stop.title}</h3>
          <p>${stop.detail}</p>
        </div>
      </div>
    `;
  });
}

window.addStop = function () {
  const input = document.getElementById("newStop");
  const value = input.value.trim();
  if (!value) return;
  stops.push({ title: value, detail: "Added stop" });
  input.value = "";
  renderStops();
};

window.saveTrip = async function () {
  const tripName =
    document.getElementById("tripName").value || "My Beakon Trip";
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const msg = document.getElementById("saveMsg");

  try {
    const tripsRef = ref(db, "trips");
    await push(tripsRef, {
      tripName,
      startDate,
      endDate,
      stops,
      createdAt: new Date().toISOString(),
    });
    msg.textContent = "✅ Trip saved to Firebase!";
    msg.style.color = "#4ECBA0";
  } catch (error) {
    msg.textContent = "❌ Error: " + error.message;
    msg.style.color = "#F09595";
    console.error(error);
  }
};

renderStops();
