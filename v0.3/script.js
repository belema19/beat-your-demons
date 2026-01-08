import { demons } from "./globals.js";
import { createDemon, prevPage, nextPage, changePage, searchDemon,
         updateDemon, findDemon, currentPage, deleteDemon, clickedDemonItem,
         resetForm, registerBattle, findBattle, updateBattle,
         deleteBattle, clickedBattleItem,
         eraseBattles
} from "./functions.js";

const demonName = document.querySelector("#demon-name");
const lore = document.querySelector("#lore");
const circle = document.querySelector("#circle");
const lastBattle = document.querySelector("#last-battle");

const description = document.querySelector("#battle-description");
const notes = document.querySelector("#battle-notes");
const date = document.querySelector("#battle-date");

const createBtn = document.querySelector("#create-btn");
const showBtn = document.querySelector("#show-btn");
const battleBtn = document.querySelector(".battle-btn");

const editIndex = document.querySelector("#edit-index");
const editBattleIndex = document.querySelector("#edit-battle-index");
const modalTitle = document.querySelector("#modal-title");
let demonIndex = null;
let battleIndex = null;

const createModal = document.querySelector("#invoke-demon-modal");
const createModalCloseBtn = document.querySelector("#invoke-demon-modal .close-btn");

const showModal = document.querySelector("#watch-demons-modal");
const showModalCloseBtn = document.querySelector("#watch-demons-modal .modal-footer .close-btn");
const showModalPrevBtn = document.querySelector("#watch-demons-modal .modal-footer .prev-btn");
const showModalNextBtn = document.querySelector("#watch-demons-modal .modal-footer .next-btn");

const showBattleModal = document.querySelector("#watch-battles-modal");
const showBattleModalCloseBtn = document.querySelector("#watch-battles-modal .modal-footer .close-btn")
const showBattleModalDeleteAllBtn = document.querySelector("#watch-battles-modal .modal-footer .delete-all-btn");
const battleModal = document.querySelector("#battle-demons-modal");
const battleModalCloseBtn = document.querySelector("#battle-demons-modal .modal-footer .close-btn");
const battleModalDeleteBtn = document.querySelector("#battle-demons-modal .modal-footer .delete-btn");

const showModalDeleteAllBtn = document.querySelector("#watch-demons-modal .modal-footer .delete-all-btn");
const annihilateBtn = document.querySelector(".annihilate-btn");
const registerBtn = document.querySelector(".register-btn");
const invokeBtn = document.querySelector("#invoke-demon-modal .invoke-btn");
const invokeBattleBtn = document.querySelector("#battle-demons-modal .invoke-btn");
const searchInput = document.querySelector("#search-input");

if (createBtn) {

    createBtn.addEventListener('click', () => {
        editIndex.value = "0";
        modalTitle.innerText = "INVOKE A DEMON";
        invokeBtn.innerText = "Invoke";
        annihilateBtn.style.visibility = "hidden";
        battleBtn.style.visibility = "hidden";
        resetForm(demonName, lore, circle, lastBattle);
        createModal.classList.toggle("modal-hidden");
    });

}

if (createModalCloseBtn) {

    createModalCloseBtn.addEventListener('click', () => {
        if (editIndex.value === "1") {

            createModal.classList.toggle('modal-hidden');
            showModal.classList.toggle('modal-hidden');

        } else {

            createModal.classList.toggle("modal-hidden");

        }
    });

}

if (showBtn) {

    showBtn.addEventListener('click', () => {
        showModal.classList.toggle("modal-hidden");

        if (Array.isArray(demons) && demons.length > 0) {
            changePage(1);
        }
    });

}

if (showModalCloseBtn) {

    showModalCloseBtn.addEventListener('click', () => {
        showModal.classList.toggle("modal-hidden");
        editIndex.value = "0";
        resetForm(demonName, lore, circle, lastBattle);
    });

    showModalPrevBtn.addEventListener('click', () => {
        prevPage();
    });

    showModalNextBtn.addEventListener('click', () => {
        nextPage();
    })

}

if (battleBtn) {
    battleBtn.addEventListener('click', () => {
        createModal.classList.toggle("modal-hidden");

        changePage(1, "battles", demons[demonIndex]);

        showBattleModal.classList.toggle("modal-hidden");
    });
}

if (showBattleModalCloseBtn) {
    showBattleModalCloseBtn.addEventListener('click', () => {
        showBattleModal.classList.toggle("modal-hidden");
        createModal.classList.toggle("modal-hidden");
    })
}

/* --- Functions --- */
if (showModalDeleteAllBtn) {

    showModalDeleteAllBtn.addEventListener('click', () => {

        if (confirm("Do you want to clear all demons?")) {
            localStorage.clear();

            demons.length = 0;
            searchDemon("");
        } else {
            console.log("No changes were made");
            return
        }

    });
}

if (invokeBtn) {

    invokeBtn.addEventListener('click', () => {

        if (editIndex.value === "0") {
            createDemon(demonName.value, lore.value, circle.value, lastBattle.value);
        } else if (editIndex.value === "1") {
            updateDemon(demonIndex, demonName.value, lore.value, circle.value, lastBattle.value);
            changePage(currentPage);
        }

        resetForm(demonName, lore, circle, lastBattle);

    });
}

if (searchInput) {
    searchInput.addEventListener('keydown', event => {
        if (event.key === "Enter" || event.keyCode === 13) {
            searchDemon(searchInput.value);
        }
    });
}

document.addEventListener('click', event => {
    if (event.target.classList.contains('demon-item') ||
        event.target.classList.contains('demon-field')
    ) {
        editIndex.value = "1";
        modalTitle.innerText = "MUTATE A DEMON";
        invokeBtn.innerText = "Mutate";
        annihilateBtn.style.visibility = "visible";
        battleBtn.style.visibility = "visible";

        const demonFields = clickedDemonItem(event);

        for (const field of demonFields) {
            switch (field.classList[0]) {
                case 'demon-name':
                    const itemName = field.innerText;
                    document.querySelector('#demon-name').value = itemName;
                    demonIndex = findDemon(itemName);
                    break;
                case 'demon-circle':
                    const itemCircle = field.innerText;
                    document.querySelector('#circle').value = itemCircle;
                case 'demon-lore':
                    const itemLore = field.innerText;
                    document.querySelector('#lore').value = itemLore;
                case 'demon-date':
                    document.querySelector('#last-battle').value = new Date().toISOString().split('T')[0];
            }
        }


        showModal.classList.toggle('modal-hidden');
        createModal.classList.toggle('modal-hidden');
    }
});

document.addEventListener('click', event => {
    if (event.target.classList.contains('battle-item') ||
        event.target.classList.contains('battle-field')
    ) {
        editBattleIndex.value = "1";

        const battleFields = clickedBattleItem(event);

        for (const field of battleFields) {
            switch (field.classList[0]) {
                case 'battle-description':
                    const itemDescription = field.innerText;
                    document.querySelector('#battle-description').value = itemDescription;
                    battleIndex = findBattle(demonIndex, itemDescription);
                    break;
                case 'battle-notes':
                    const itemNotes = field.innerText;
                    document.querySelector('#battle-notes').value = itemNotes;
                case 'battle-date':
                    document.querySelector('#battle-date').value = new Date().toISOString().split('T')[0];
            }
        }

        showBattleModal.classList.toggle('modal-hidden');
        battleModal.classList.toggle('modal-hidden');
    }
});

if (annihilateBtn) {

    annihilateBtn.addEventListener('click', () => {
        if (demonIndex !== null && 
            confirm("Are you sure you want to annihilate this demon?")
        ) {
            deleteDemon(demonIndex);
            demonIndex = null;
            createModalCloseBtn.click();
            changePage(currentPage);
        }
    });

}

if (registerBtn) {

    registerBtn.addEventListener('click', () => {
        
        resetForm(description, notes, date);
        showBattleModal.classList.toggle("modal-hidden");
        battleModal.classList.toggle("modal-hidden");

    });
}

if (battleModalCloseBtn) {

    battleModalCloseBtn.addEventListener('click', () => {

        battleModal.classList.toggle("modal-hidden");
        showBattleModal.classList.toggle("modal-hidden");
        changePage(currentPage, "battles", demons[demonIndex]);

    });
}

if (invokeBattleBtn) {

    invokeBattleBtn.addEventListener('click', () => {

        if (editBattleIndex.value === "0") {

            registerBattle(demonIndex, description.value, notes.value, date.value);
        }

        if (editBattleIndex.value === "1") {

            updateBattle(demonIndex, battleIndex, description.value, notes.value, date.value)
            battleModalCloseBtn.click();
        }

        resetForm(description, notes, date);

    })
}

if (showBattleModalDeleteAllBtn) {

    showBattleModalDeleteAllBtn.addEventListener('click', () => {

        if (confirm("Do you want to delete all battles?")) {

            eraseBattles(demonIndex);
            changePage(currentPage, "battles", demons[demonIndex]);

        }
    });

}

if (battleModalDeleteBtn) {

    battleModalDeleteBtn.addEventListener('click', () => {

        deleteBattle(demonIndex, battleIndex);
        battleModalCloseBtn.click();

    });
}