const dateAndTime = {
    setYear: function (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    },

    setDateAndTime: function (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    },

    init: function (yearElement, lastModifiedElement) {
        this.setYear(yearElement);
        this.setDateAndTime(lastModifiedElement);
    }
}

export default dateAndTime;
