export { soul, demons, STATES };

const STATES = {
    WILD: "Wild",
    CONTROLLED: "Controlled",
    VIRTUOUS: "Virtuous",
    CORRUPTED: "Corrupted",
};

const soul = {
    name: "Belema",
    state: STATES.VIRTUOUS,
    virtuePoints: 100,
};

const savedDemons = localStorage.getItem("myDemons");

const demons = savedDemons ? JSON.parse(savedDemons) : [];