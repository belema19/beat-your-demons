import { demons } from "./globals.js";
export { createDemon, prevPage, nextPage, changePage,
         searchDemon, updateDemon, findDemon, currentPage,
         deleteDemon, clickedDemonItem, resetForm,
         registerBattle, findBattle, updateBattle,
         deleteBattle, clickedBattleItem, eraseBattles
};

function createDemon(name, lore, circle, lastBattle) {

    const newDemon = {
        name: name,
        lore: lore ? lore : "",
        circle: circle,
        lastBattle: lastBattle ? new Date(lastBattle) : new Date(),
        battleLog: [],
    };

    demons.push(newDemon);
    localStorage.setItem("myDemons", JSON.stringify(demons));

    filteredDemons = [...demons];

    console.log(`Demon: ${newDemon.name} created!`)
}

function createDemonHTML(entity, modal = "demons") {

    if (modal === "demons") {

        const lastBattle = new Date(entity.lastBattle);
        const formatter = new Intl.DateTimeFormat('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC'
        });
        const dateFormatted = formatter.format(lastBattle);

        const item = document.createElement("div");
        item.className = "demon-item";
        item.setAttribute("tabindex", "0");
        item.innerHTML += `
            <span class="demon-name demon-field">${entity.name}</span>
            <span class="demon-circle demon-field">${entity.circle}</span>
            <span class="demon-lore demon-field">${entity.lore}</span>
            <span class="demon-date demon-field">${dateFormatted}</span>
        `;

        return item;

    }

    if (modal === "battles") {

        const battleDate = new Date(entity.date);
        const formatter = new Intl.DateTimeFormat('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC'
        });
        const dateFormatted = formatter.format(battleDate);

        const item = document.createElement("div");
        item.className = "battle-item";
        item.setAttribute("tabindex", "0");
        item.innerHTML += `
            <span class="battle-description battle-field">${entity.description}</span>
            <span class="battle-notes battle-field">${entity.notes}</span>
            <span class="battle-date battle-field">${dateFormatted}</span>
        `;

        return item
    }

}

/* --- Pagination --- */
let currentPage = 1;
let recordsPerPage = 5;
let filteredDemons = [...demons];

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }
}

function nextPage() {
    if (currentPage < numPages()) {
        currentPage++;
        changePage(currentPage);
    }
}

function changePage(page, modal = "demons", demon = null) {

    let nextBtn;
    let prevBtn;
    let resultsBox;
    let pageSpan;
    let totalPages;

    if (modal === "demons") {

        nextBtn = document.querySelector("#watch-demons-modal .modal-footer .next-btn");
        prevBtn = document.querySelector("#watch-demons-modal .modal-footer .prev-btn");
        resultsBox = document.querySelector("#watch-demons-modal .modal-form .results-box");
        pageSpan = document.querySelector("#watch-demons-modal .modal-footer .page");
        totalPages = numPages();

    } else if (modal === "battles") {

        nextBtn = document.querySelector("#watch-battles-modal .modal-footer .next-btn");
        prevBtn = document.querySelector("#watch-battles-modal .modal-footer .prev-btn");
        resultsBox = document.querySelector("#watch-battles-modal .modal-form .results-box");
        pageSpan = document.querySelector("#watch-battles-modal .modal-footer .page");
        totalPages = numPages("battles", demon);

    }

    if (!resultsBox) return;

    if (page < 1) page = 1; 
    if (page > totalPages) page = totalPages;

    currentPage = page;
    resultsBox.innerHTML = "";

    if (demon !== null) {

        if (demon.battleLog.length === 0) {
            resultsBox.innerHTML = "<p style='color: white; opacity: 0.5; text-align: center; padding: 10px;'>The abyss is empty...</p>";
            if (pageSpan) pageSpan.innerHTML = 0;
            if (prevBtn) prevBtn.style.visibility = "hidden";
            if (nextBtn) nextBtn.style.visibility = "hidden";
            return;
        }

        const start = (currentPage - 1) * recordsPerPage;
        const end = start + recordsPerPage;
        const paginatedItems = demon.battleLog.slice(start, end);

        paginatedItems.forEach(battle => {
            resultsBox.appendChild(createDemonHTML(battle, "battles"));
        });

    }

    if (demon === null) {

        if (filteredDemons.length === 0) {
            resultsBox.innerHTML = "<p style='color: white; opacity: 0.5; text-align: center; padding: 10px;'>The abyss is empty...</p>";
            if (pageSpan) pageSpan.innerHTML = 0;
            if (prevBtn) prevBtn.style.visibility = "hidden";
            if (nextBtn) nextBtn.style.visibility = "hidden";
            return;
        }

        const start = (currentPage - 1) * recordsPerPage;
        const end = start + recordsPerPage;
        const paginatedItems = filteredDemons.slice(start, end);

        paginatedItems.forEach(demon => {
            resultsBox.appendChild(createDemonHTML(demon));
        });

    }

    if (pageSpan) pageSpan.innerHTML = totalPages > 0 ? currentPage : 0;

    if (prevBtn) prevBtn.style.visibility = (currentPage <= 1) ? "hidden" : "visible";
    if (nextBtn) nextBtn.style.visibility = (currentPage >= totalPages) ? "hidden" : "visible";

}

function numPages(modal = "demons", demon = null) {

    if (modal === "demons") {
        return Math.ceil(filteredDemons.length / recordsPerPage);
    } else if (modal === "battles") {
        return Math.ceil(demon.battleLog.length / recordsPerPage);
    }
}

/* --- Search --- */
function searchDemon(query) {
    const searchTerm = query.toLowerCase().trim();

    if (searchTerm === "") {
        filteredDemons = [...demons];
    } else {
        filteredDemons = demons.filter(demon =>
            demon.name.toLowerCase().includes(searchTerm) ||
            demon.circle.toLowerCase().includes(searchTerm)
        );
    }

    changePage(1);
}

/* --- Update --- */
function findDemon(name) {
    let index = 0;
    for (const demon of demons) {
        if (demon.name === name) {
            return index;
        }
        index += 1;
    }
    console.log(`Demon "${name}" wasn't found.`);
}

function findBattle(demonIndex, battleDescription) {
    let index = 0;
    const battles = demons[demonIndex].battleLog;
    for (const battle of battles) {
        if (battle.description === battleDescription) {
            return index
        }
        index += 1;
    } 
    console.log(`Battle "${battleDescription}" wasn't found.`);
}

function updateDemon(index, name, lore, circle, lastBattle, battleLog = []) {

    const newDemon = {
        name: name,
        lore: lore ? lore : "",
        circle: circle,
        lastBattle: lastBattle ? new Date(lastBattle) : new Date(),
        battleLog: battleLog ? battleLog : demons[index].battleLog,
    };

    demons[index] = newDemon;
    localStorage.setItem("myDemons", JSON.stringify(demons));

    filteredDemons = [...demons];

    console.log(`Demon: ${newDemon.name} updated!`)
}

function updateBattle(demonIndex, battleIndex, description, notes, date) {

    const newBattle = {
        description: description,
        notes: notes,
        date: date ? new Date(date) : new Date(),
    }

    demons[demonIndex].battleLog[battleIndex] = newBattle;
    localStorage.setItem("myDemons", JSON.stringify(demons));

    filteredDemons = [...demons];

    console.log(`Battle ${newBattle.description} updated!`);
}

/* --- Delete --- */
function clickedDemonItem(event) {
    let demonItem, demonFields;

    if (event.target.classList.contains('demon-item')) {

        demonItem = event.target;

    } else if (event.target.classList.contains('demon-field')) {

        demonItem = event.target.parentElement

    }

    demonFields = demonItem.children;
    return demonFields;
}

function clickedBattleItem(event) {
    let battleItem, battleFields;

    if (event.target.classList.contains('battle-item')) {

        battleItem = event.target;

    } else if (event.target.classList.contains('battle-field')) {

        battleItem = event.target.parentElement

    }

    battleFields = battleItem.children;
    return battleFields;
}

function deleteDemon(index) {

    demons.splice(index, 1);

    localStorage.setItem("myDemons", JSON.stringify(demons));

    filteredDemons = [...demons];

}

function deleteBattle(demonIndex, battleIndex) {

    demons[demonIndex].battleLog.splice(battleIndex, 1);

    localStorage.setItem("myDemons", JSON.stringify(demons));

    filteredDemons = [...demons];

}

/* --- Others --- */
function resetForm(...tags) {

    for (const tag of tags) {
        tag.value = "";
    }

}

/* --- Battle --- */
function registerBattle(demonIndex, description, notes, date) {

    const newBattle = {
        description: description,
        notes: notes,
        date: date ? new Date(date) : new Date(),
    }

    demons[demonIndex].battleLog.push(newBattle);

    localStorage.setItem("myDemons", JSON.stringify(demons));

    filteredDemons = [...demons];

}

function eraseBattles(demonIndex) {

    demons[demonIndex].battleLog.length = 0;

    localStorage.setItem("myDemons", JSON.stringify(demons));

    filteredDemons = [...demons];

}