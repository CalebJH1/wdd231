const hamburgerButton = document.getElementById("hamButton");
const currentUrl = window.location.href;

const formData = currentUrl.split("?")[1].split("&");

function show(field) {
    let result = "";

    formData.forEach((pair) => {
        if (pair.startsWith(field)) {
            result = pair.split("=")[1];
            result = result
              .replace("%40", "@")
              .replace("+", " ")
              .replace("%3A", ":")
              .replace("%3A", ":");
        }
    });

    return result;
}

const showInfo = document.querySelector("#form-results");

showInfo.innerHTML = `
<p>First Name: ${show("first")}</p>
<p>Last Name: ${show("last")}</p>
<p>Organization Title: ${show("organization-title")}</p>
<p>Email: ${show("email")}</p>
<p>Mobile Phone Number: ${show("mobile-phone")}</p>
<p>Organization Name: ${show("org")}</p>
<p>Organization Description: ${show("description")}
<p>Membership Level: ${show("membership-level")}</p>
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