import dateAndTime from "./date-and-time.mjs";

const yearElement = document.getElementById("year");

const lastModifiedElement = document.getElementById("lastModified");

dateAndTime.init(yearElement, lastModifiedElement);