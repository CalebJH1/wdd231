const hamburgerButton = document.getElementById("hamButton");
const membershipLevels = [
  {
      id: "non-profit",
      name: "Non-Profit Membership",
      cost: "$100 per year",
      benefits: [
          "Access to special events designed for non-profit organizations.",
          "Discounted rates on training sessions and workshops.",
          "Opportunities to network with other non-profit professionals.",
          "Event participation discounts to maximize your organization's reach."
      ]
  },
  {
      id: "bronze",
      name: "Bronze Membership",
      cost: "$250 per year",
      benefits: [
          "All the benefits of the Non-Profit Membership.",
          "Additional advertising opportunities on our platform.",
          "Basic training sessions to help grow your business.",
          "Discounted rates on various events and workshops."
      ]
  },
  {
      id: "silver",
      name: "Silver Membership",
      cost: "$500 per year",
      benefits: [
          "Includes all the benefits of the Bronze Membership.",
          "Access to advanced training sessions and professional development.",
          "Premium advertising slots to showcase your organization.",
          "Higher event and workshop discounts, allowing you to save more."
      ]
  },
  {
      id: "gold",
      name: "Gold Membership",
      cost: "$1,000 per year",
      benefits: [
          "Full access to all benefits of the Silver Membership.",
          "Exclusive invitations to VIP events and networking sessions.",
          "Maximum advertising positions, including spotlight placements.",
          "Priority customer support and assistance.",
          "Highest event and workshop discounts available."
      ]
  }
];


const modalCloseBtn = document.querySelector("#close-button");
const dialogBox = document.querySelector("dialog");
const openButtons = document.querySelectorAll(".member");

modalCloseBtn.addEventListener("click", () => {
  dialogBox.close();
})

openButtons.forEach(link => {
  link.addEventListener("click", (event) => {
      event.preventDefault();

      const getId = link.getAttribute("id");

      const getMember = membershipLevels.filter((level) => level.id == getId)[0];

      const modalName = document.querySelector("#modal-name");
      const modalCost = document.querySelector("#modal-cost");
      const modalContent = document.querySelector("#modal-content");

      modalName.textContent = getMember.name;
      modalCost.innerHTML = `<strong>Cost:</strong> ${getMember.cost}`;
      modalContent.innerHTML = `<strong>Benefits:</strong><br>${getMember.benefits}`;

      dialogBox.showModal();
  })
})

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
