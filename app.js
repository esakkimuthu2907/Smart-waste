const hospitalDB = {
  ambattur: [
    { name: "Government Hospital Ambattur", distanceKm: 2.8, trafficLevel: 2, icuAvailability: 8 },
    { name: "Frontier Lifeline Hospital", distanceKm: 6.1, trafficLevel: 3, icuAvailability: 15 },
    { name: "Apollo Hospitals", distanceKm: 9.4, trafficLevel: 4, icuAvailability: 20 }
  ],
  anna_nagar: [
    { name: "Sundaram Medical Foundation", distanceKm: 3.3, trafficLevel: 3, icuAvailability: 10 },
    { name: "MMM Hospital", distanceKm: 5.5, trafficLevel: 2, icuAvailability: 12 }
  ]
};

let emergencyMode = false;
let selectedHospital = null;
let signalsTriggered = 0;

const $ = (id) => document.getElementById(id);
const normalModeBtn = $("normalModeBtn");
const emergencyModeBtn = $("emergencyModeBtn");
const findHospitalsBtn = $("findHospitalsBtn");
const activateRouteBtn = $("activateRouteBtn");
const voiceBtn = $("voiceBtn");
const locationInput = $("locationInput");
const hospitalList = $("hospitalList");
const selectedHospitalLabel = $("selectedHospital");
const etaLabel = $("eta");
const corridorState = $("corridorState");
const signalAlerts = $("signalAlerts");
const vehicleAlerts = $("vehicleAlerts");
const hospitalNotice = $("hospitalNotice");
const voiceStatus = $("voiceStatus");
const eventTimeline = $("eventTimeline");
const signalsPreempted = $("signalsPreempted");
const mapState = $("mapState");

function logEvent(msg) {
  const li = document.createElement("li");
  li.textContent = `${new Date().toLocaleTimeString()} - ${msg}`;
  eventTimeline.prepend(li);
}

function switchMode(isEmergency) {
  emergencyMode = isEmergency;
  normalModeBtn.classList.toggle("active", !isEmergency);
  emergencyModeBtn.classList.toggle("active", isEmergency);
  corridorState.textContent = isEmergency ? "Ready" : "Off";
  mapState.textContent = isEmergency ? "Emergency flow" : "Demo mode";
  logEvent(isEmergency ? "Emergency mode enabled" : "Normal mode enabled");
}

function getAreaKey() {
  const raw = locationInput.value.trim().toLowerCase();
  if (raw.includes("anna")) return "anna_nagar";
  return "ambattur";
}

function aiScore(h) {
  const emergencyBoost = emergencyMode ? 1.25 : 1;
  return (h.distanceKm * 0.5 + h.trafficLevel * 0.3 - h.icuAvailability * 0.05) * emergencyBoost;
}

function renderHospitals() {
  const hospitals = hospitalDB[getAreaKey()] || [];
  const ranked = [...hospitals].sort((a, b) => aiScore(a) - aiScore(b));
  hospitalList.innerHTML = "";

  ranked.forEach((hospital, index) => {
    const li = document.createElement("li");
    li.className = "hospital-item";
    li.innerHTML = `
      <strong>#${index + 1} ${hospital.name}</strong><br>
      Distance: ${hospital.distanceKm} km<br>
      Traffic Level: ${hospital.trafficLevel}/5<br>
      ICU Beds Available: ${hospital.icuAvailability}
      <button>Select Hospital</button>
    `;

    li.querySelector("button").addEventListener("click", () => {
      selectedHospital = hospital;
      const etaMinutes = Math.round(hospital.distanceKm * 4 + hospital.trafficLevel * 3);
      selectedHospitalLabel.textContent = hospital.name;
      etaLabel.textContent = `${etaMinutes} min`;
      hospitalNotice.textContent = `Hospital notified: ${hospital.name} | ETA ${etaMinutes} min`;
      logEvent(`Hospital selected: ${hospital.name} (ETA ${etaMinutes} min)`);
    });

    hospitalList.appendChild(li);
  });

  logEvent(`Hospitals ranked for ${locationInput.value || "Ambattur"}`);
}

function activateSmartRoute() {
  if (!selectedHospital) {
    alert("Please select a hospital first.");
    return;
  }

  const routeSignals = ["Ambattur Estate", "Mogappair", "Anna Nagar West"];
  signalAlerts.innerHTML = "";
  routeSignals.forEach((signal, i) => {
    const li = document.createElement("li");
    li.textContent = `Signal ${i + 1}: ${signal} → Green priority enabled`;
    signalAlerts.appendChild(li);
  });

  vehicleAlerts.innerHTML = "<li>🚑 Ambulance approaching. Please give way.</li><li>Lane advisory sent to nearby drivers.</li>";

  signalsTriggered += routeSignals.length;
  signalsPreempted.textContent = String(signalsTriggered);
  corridorState.textContent = emergencyMode ? "Active" : "Simulation only";
  logEvent(`Smart route activated for ${selectedHospital.name}`);
}

function startVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    voiceStatus.textContent = "Voice not supported in this browser.";
    logEvent("Voice fill unsupported in browser");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  voiceStatus.textContent = "Listening...";

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    locationInput.value = text;
    voiceStatus.textContent = `Heard: ${text}`;
    renderHospitals();
    logEvent(`Voice input received: ${text}`);
  };

  recognition.onerror = () => {
    voiceStatus.textContent = "Voice recognition error. Try again.";
    logEvent("Voice recognition error");
  };

  recognition.start();
}

normalModeBtn.addEventListener("click", () => switchMode(false));
emergencyModeBtn.addEventListener("click", () => switchMode(true));
findHospitalsBtn.addEventListener("click", renderHospitals);
activateRouteBtn.addEventListener("click", activateSmartRoute);
voiceBtn.addEventListener("click", startVoiceInput);

renderHospitals();
logEvent("System ready");

// Optional Google Maps hook:
// function initMap() {
//   const map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: 13.1143, lng: 80.1548 },
//     zoom: 12,
//   });
// }
