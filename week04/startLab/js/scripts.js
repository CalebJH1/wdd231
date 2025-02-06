const openButtons = document.querySelectorAll(".openButton");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");
const dialogBoxText = document.querySelector("#dialogBox div");

// "Show the dialog" button opens the dialog modally

openButtons.forEach(openButton => {
    openButton.addEventListener("click", () => {
        switch (openButton.id) {
            case "openButton1":
                dialogBox.showModal();
                dialogBoxText.innerHTML = `One Apple contains 95 calories`;
                break;
            case "openButton2":
                dialogBox.showModal();
                dialogBoxText.innerHTML = `One Orange contains 45 calories`;
                break;
            case "openButton3":
                dialogBox.showModal();
                dialogBoxText.innerHTML = `One Banana contains 105 calories`;
                break;
            default:
                console.log("Unknown button");
        }
    });
});

closeButton.addEventListener("click", () => {
    dialogBox.close();
});