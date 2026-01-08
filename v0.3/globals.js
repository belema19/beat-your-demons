export { demons };

const savedDemons = localStorage.getItem("myDemons");
const demons = savedDemons ? JSON.parse(savedDemons) : [];