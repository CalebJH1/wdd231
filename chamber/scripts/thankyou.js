const hamburgerButton = document.getElementById("hamButton");
const url = window.location.href;

const formData = url.split("?")[1].split("&");

function show(field) {
    let result = "";

    formData.forEach((pair) => {
        if (pair.startsWith(field)) {
            result = pair.split("=")[1];
            result = result
              .replace("%40", "@")
              .replaceAll("%3A", ":")
              .replaceAll("+", " ");
        }
    });

    return result;
}

const formResults = document.getElementById("formResults");

formResults.innerHTML = `
<p>First name: ${show("first")}</p>
<p>Last name: ${show("last")}</p>
<p>Organization title: ${show("organization-title")}</p>
<p>Email: ${show("email")}</p>
<p>Mobile Phone number: ${show("mobile-phone")}</p>
<p>Organization name: ${show("org")}</p>
<p>Organization description: ${show("description")}
<p>Membership level: ${show("membership-level")}</p>
<p>Time created: ${show("timestamp")}</p>
`;

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