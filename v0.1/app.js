// Glabal vars
const demonsContainer = document.querySelector("#demons-container ul");
const overlay = document.querySelector("#invocation-overlay");
const openBtn = document.querySelector("#open-invocation");
const closeBtn = document.querySelector("#close-invocation");
const invocationForm = document.querySelector("#invocation-form");

const soul = {
    name: "Belema",
    virtuePoints: 100,
    state: "Virtuous",
    demons: [
        {
            id: 1,
            name: "Parálisis Para Programar",
            circle: "Programming",
            isEternal: false,
            lastBattle: new Date(),
            safeUnattendedTime: 2,
            state: "Controlled",
            children: [],
        }
    ]
};

// Global events
demonsContainer.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        registerBattle(event.target.textContent);
    }
})

openBtn.addEventListener("click", () => {
    overlay.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
})

invocationForm.addEventListener("submit", event => {
    event.preventDefault();

    const newDemon = {
        id: Date.now(),
        name: document.querySelector("#name").value,
        circle: document.querySelector("#circle").value,
        isEternal: false,
        lastBattle: new Date(),
        safeUnattendedTime: parseFloat(document.querySelector("#time").value),
        state: "Controlled",
        children: [], 
    }

    soul.demons.push(newDemon);

    renderDemons();
    verifySoulState();

    invocationForm.reset();
    console.log(`New demon invoked: ${newDemon.name}`);
});


// Virtue Vigilant
function verifySoulState() {
    const now = new Date();
    let wildDemons = false;

    soul.demons.forEach(demon => {
        if (demon.state === "Wild") {
            wildDemons = true;
        } else {

            const timePassed = now - demon.lastBattle;
            const daysPassed = timePassed / (1000 * 60 * 60 * 24);

            if (daysPassed > demon.safeUnattendedTime) {
                demon.state = "Wild";
                wildDemons = true;
            }
        }
    });

    if (wildDemons) {
        soul.state = "Corrupted";
        soul.virtuePoints -= 10;

        document.body.className = "corrupted-state";
        console.log("⚠️ Attention! Your soul is getting corrupted...")
    } else {
        soul.state = "Virtuous";
        
        document.body.className = "virtuous-state";
        console.log("✨ Your soul is in peace.");
    }

    const displayState = document.querySelector("#state");
    displayState.textContent = soul.state;
}

// Render demons
function renderDemons() {
    demonsContainer.innerHTML = "";
    
    soul.demons.forEach(demon => {
        demonsContainer.innerHTML += `<li>${demon.name}</li>`; 
    });
}

// Battle demons
function registerBattle(targetedDemon) {
    soul.demons.forEach(demon => {
        if (demon.name === targetedDemon) {
            demon.lastBattle = new Date();

            if (demon.state === "Wild") {
                demon.state = "Controlled";
            }
        }
    });
    verifySoulState()
}

verifySoulState()
renderDemons()