const url = "data/members.json";
const memberDirectory = document.getElementById("memberDirectory");
const gridViewButton = document.getElementById("gridView");
const listViewButton = document.getElementById("listView");
const hamburgerButton = document.getElementById("hamButton");

async function getMembers(view="grid") {
  const response = await fetch(url);
  const members = await response.json();

  const showMembers = (view) => {
    memberDirectory.className = view;

    memberDirectory.innerHTML = members.map(member => `
      <div class="member-card level${member.membershipLevel}">
        <img src="${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p>Membership Level: ${member.membershipLevel}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      </div>
    `).join("");
  };

  showMembers(view);
}

  
gridViewButton.addEventListener("click", () => getMembers());
listViewButton.addEventListener("click", () => getMembers("list"));
hamburgerButton.addEventListener("click", () => {
  const nav = document.querySelector("nav");
  const ul = document.querySelector("nav ul");
  ul.classList.toggle("show");
  nav.classList.toggle("show");
  if (nav.classList.contains("show")) {
    hamburgerButton.innerHTML = "&#x2715;";
  } else {
    hamburgerButton.innerHTML = "&#9776;";
  }
});
  
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

getMembers();
