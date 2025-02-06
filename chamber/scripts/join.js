const membershipLevels = [
  {
      id: "non-profit",
      name: "Non-Profit Membership",
      cost: "$100 per year",
      benefits: [
        "Access to community events.",
        "Networking opportunities.",
        "Volunteer opportunities.",
        "Recognition on our website."
      ]
  },
  {
      id: "bronze",
      name: "Bronze Membership",
      cost: "$250 per year",
      benefits: [
        "Access to community events.",
        "Networking opportunities.",
        "Volunteer opportunities.",
        "Recognition on our website.",
        "Discounts on services.",
        "Monthly newsletter."
      ]
  },
  {
      id: "silver",
      name: "Silver Membership",
      cost: "$500 per year",
      benefits: [
        "Access to community events.",
        "Networking opportunities.",
        "Volunteer opportunities.",
        "Recognition on our website.",
        "Discounts on services.",
        "Monthly newsletter.",
        "Priority support.",
        "Exclusive webinars."
      ]
  },
  {
      id: "gold",
      name: "Gold Membership",
      cost: "$1,000 per year",
      benefits: [
          "Access to community events.",
          "Networking opportunities.",
          "Volunteer opportunities.",
          "Recognition on our website.",
          "Discounts on services.",
          "Monthly newsletter.",
          "Priority support.",
          "Exclusive webinars.",
          "Free admission to annual gala.",
          "Personalized business consultation.",
          "Feature in our monthly magazine."
      ]
  }
];

const hamburgerButton = document.getElementById("hamButton");
const closeButton = document.getElementById("closeButton");
const dialogBox = document.querySelector("dialog");
const modalButtons = document.querySelectorAll(".member");


function getTimeStamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

closeButton.addEventListener("click", () => {
  dialogBox.close();
})

modalButtons.forEach(modalButton => {
  modalButton.addEventListener("click", () => {
      const memberId = modalButton.getAttribute("id");
      const membershipLevel = membershipLevels.filter((level) => level.id == memberId)[0];
      const name = document.getElementById("membershipName");
      const cost = document.getElementById("membershipCost");
      const content = document.getElementById("membershipContent");
      name.textContent = membershipLevel.name;
      cost.innerHTML = `<strong>Cost:</strong> ${membershipLevel.cost}`;
      content.innerHTML = `<strong>Benefits: </strong>${membershipLevel.benefits.join(" ")}`;
      dialogBox.showModal();
  })
})

document.getElementById("formTimestamp").setAttribute('value', getTimeStamp())

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
