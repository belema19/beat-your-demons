import { soul, demons, STATES } from "./globals.js";
import { syncUI, invokeDemon } from "./functions.js";

function refreshInterface() {
    const appTheme = syncUI();

    document.body.classList.toggle("corrupted-theme", appTheme === STATES.CORRUPTED);

    const dynamicText = document.querySelector(".dynamic-text");
    if (dynamicText) {
        dynamicText.textContent = `Virtue Points: ${soul.virtuePoints} | State: ${soul.state}`;
    }

    const listContainer = document.querySelector(".battles-list");
    if (listContainer && Array.isArray(demons)) {
        listContainer.innerHTML = "";
        demons.forEach(demon => {
            const item = document.createElement("div");
            item.className = "battle-item";
            item.innerHTML = `
                <strong>${demon.name}</strong>
                <small>- ${demon.circle}</small>
                <span>- ${demon.state}</span>
            `;
            listContainer.appendChild(item);
        });
    }
}

const modal = document.querySelector("#modal-overlay");
const btnOpen = document.querySelector(".add-btn");
const btnclose = document.querySelector("#close-modal");
const btnInvoke = document.querySelector("#confirm-invocation");

btnOpen.addEventListener("click", () => {
    modal.classList.remove('modal-hidden');
});

btnclose.addEventListener("click", () => {
        modal.classList.add("modal-hidden");
});

if (btnInvoke) {
    btnInvoke.addEventListener("click", invokeDemon);
    refreshInterface();
}

console.log(demons);
refreshInterface();