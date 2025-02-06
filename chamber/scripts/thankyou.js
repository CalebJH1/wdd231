const hamburgerButton = document.getElementById("hamButton");
const currentUrl = window.location.href;

const timeStamp = new Date().toISOString();

const formData = currentUrl.split("?")[1].split("&");

function show(field) {
    let result = "";

    formData.forEach((e) => {
        if (e.startsWith(field)) {

            result = e.split("=")[1];
            result = result.replace("%40", "@");

            let count = result.split("+").length - 1;

            for (let i = 0; i < count; i++) result = result.replace("+", " ");

            count = result.split("%2B").length - 1;

            for (let i = 0; i < count; i++) result = result.replace("%2B", "+");

        }
    })

    return result;
}

const showInfo = document.querySelector("#form-results");

showInfo.innerHTML = `
<p>First Name: ${show("first")}</p>
<p>Last Name: ${show("last")}</p>
<p>Organization Title: ${show("organization-title")}</p>
<p>Email: <a href="mailto:${show("email")}">${show("email")}</a></p>
<p>Mobile Phone Number: ${show("mobile-phone")}</p>
<p>Organization Name: ${show("org")}</p>
<p>Membership Level: ${show("membership-level")}</p>
<p>Time created: ${timeStamp}</p>
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