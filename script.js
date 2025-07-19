let planets = [];

fetch("data.json")
  .then((res) => {
    if (!res.ok) throw new Error("Error fetching data");
    return res.json();
  })
  .then((data) => {
    planets = data;
  })
  .catch((err) => console.error("Fetch error:", err));

const planetList = document.querySelector(".planets-list");
const imgBox = document.querySelector(".img-box");
const tabList = document.querySelector(".tab-ul");
let planetName = "Earth";

planetList.addEventListener("click", (e) => {
  const planetItem = e.target.closest(".planet-item");
  if (!planetItem) return;
  planetName = planetItem.dataset.planet;
  setActivePlanet(planetItem);
  resetTab();
  handleOverview(upperFirst(planetName));
  handleStats(upperFirst(planetName));
});

tabList.addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab) return;

  planetName = upperFirst(planetName);
  document.querySelector(".tab.active").classList.remove("active");
  tab.classList.add("active");
  if (tab.dataset.name === "overview") handleOverview(planetName);
  else if (tab.dataset.name === "structure") handleStructure(planetName);
  else if (tab.dataset.name === "surface") handleSurface(planetName);
});

function handleOverview(planetName) {
  const planetInfo = getPlanet(planetName);
  updateUI_Info(planetInfo.name, planetInfo.overview, planetInfo.images.planet);
}
function handleStructure(planetName) {
  const planetInfo = getPlanet(planetName);
  updateUI_Info(planetInfo.name, planetInfo.structure, planetInfo.images.internal);
}
function handleSurface(planetName) {
  const planetInfo = getPlanet(planetName);
  updateUI_Info(planetInfo.name, planetInfo.geology, planetInfo.images.planet, planetInfo.images.geology);
}
const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);
const getPlanet = (planetName) => planets.find((planet) => planet.name === planetName);

function updateUI_Info(name, { content, source }, img, surface = false) {
  const planetName = document.querySelector(".planet-name");
  const planetDescription = document.querySelector(".planet-description");
  const planetSource = document.querySelector(".planet-source");
  const planetImg = document.querySelector(".planet-img");
  const surfaceImg = document.querySelector(".img-surface");

  planetName.textContent = name;
  planetDescription.textContent = content;
  planetSource.href = source;
  planetImg.src = `${img}`;
  surface ? (surfaceImg.src = surface) : (surfaceImg.src = "#");
}

function resetTab() {
  document.querySelector(".tab.active").classList.remove("active");
  document.querySelector('[data-name="overview"]').classList.add("active");
}

function setActivePlanet(planetItem) {
  const activePlanet = document.querySelector(".planet-item.active");
  activePlanet.classList.remove("active");
  planetItem.classList.add("active");
  document.body.classList.remove(activePlanet.dataset.planet);
  document.body.classList.add(planetItem.dataset.planet);
  document.body.classList.remove("menu-active");
}

function handleStats(planetName) {
  const { rotation, revolution, radius, temperature } = getPlanet(planetName);
  document.querySelector(".rotation").textContent = rotation;
  document.querySelector(".revolution").textContent = revolution;
  document.querySelector(".radius").textContent = radius;
  document.querySelector(".temp").textContent = temperature;
}
