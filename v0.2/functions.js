import { soul, demons, STATES } from "./globals.js";
export { syncUI, invokeDemon };

function syncUI() {
    let theme = STATES.VIRTUOUS;

    for (const demon of demons) {
        if (demon.state === STATES.WILD) {
            soul.state = STATES.CORRUPTED;
            theme = STATES.CORRUPTED;
            return theme;
        } else {
            const today = new Date();
            const timeElapsed = (today - demon.lastBattle) / (1000 * 60 * 60 * 24);

            if (timeElapsed > demon.safeDays) {
                demon.state = STATES.WILD;
                soul.state = STATES.CORRUPTED;
                theme = STATES.CORRUPTED;
                return theme;
            }
        }
    }

    soul.state = STATES.VIRTUOUS;
    return theme;
}

function invokeDemon() {
    const name = document.querySelector("#demon-name").value;
    const circle = document.querySelector("#circle").value;
    const isEternal = document.querySelector("#is-eternal").value;
    const safeDays = document.querySelector("#safe-days").value;
    const lastBattle = document.querySelector("#last-battle").value;
    const state = document.querySelector("#state").value;
    const parent = document.querySelector("#parent").value;

    if (!name) {
        alert("Please, provide a name for your demon");
        return;
    }

    const newDemon = {
        name,
        circle,
        isEternal,
        safeDays,
        lastBattle: lastBattle ? new Date(lastBattle).getTime() : new Date(),
        state: state ? state : STATES.CONTROLLED,
        parent,
    };

    demons.push(newDemon);
    localStorage.setItem("myDemons", JSON.stringify(demons));

    location.reload();
}