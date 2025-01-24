document.addEventListener("DOMContentLoaded", async () => {
    const memberDirectory = document.getElementById("memberDirectory");
    const gridViewButton = document.getElementById("gridView");
    const listViewButton = document.getElementById("listView");
  
    // Fetch members data
    const response = await fetch("directory.json");
    const members = await response.json();
  
    // Function to render members
    const renderMembers = (view) => {
      memberDirectory.className = view;
  
      memberDirectory.innerHTML = members.map(member => `
          <div class="member-card">
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
          </div>
      `).join("");
  };
  
  
    // Initial render as grid view
    renderMembers("grid");
  
    // Event listeners for view toggle
    gridViewButton.addEventListener("click", () => renderMembers("grid"));
    listViewButton.addEventListener("click", () => renderMembers("list"));
  
    // Footer dynamic content
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
  });