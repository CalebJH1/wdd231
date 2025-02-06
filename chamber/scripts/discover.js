const hamburgerButton = document.getElementById("hamButton");

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