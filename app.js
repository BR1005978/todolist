// selectors
const takenlijstInput = document.querySelector(".invoer");
const takenlijstKnop = document.querySelector(".todo-knop");
const takenlijst = document.querySelector(".lijst-met-taken");
const filteroptie = document.querySelector(".takenlijstfilter");

// event listeners
document.addEventListener("DOMContentLoaded", takenOphalen);
takenlijstKnop.addEventListener("click", voegTaakToe);
takenlijst.addEventListener("click", verwijderTaak);
filteroptie.addEventListener("click", filterTaken);

// alle functies

function oprotten() {
    this.remove();
    console.log("opgerot");
}

function voegTaakToe(event) {
    event.preventDefault();
    console.log("voegTaakToe() wordt aangeroepen");
    //taak div
    const taakDiv = document.createElement("div");
    taakDiv.classList.add("taak");

    //maak listitem
    const nieuweTaak = document.createElement("li");
    nieuweTaak.innerText = takenlijstInput.value;
    nieuweTaak.classList.add("taak-item");

    taakDiv.appendChild(nieuweTaak);

    // voeg taak toe aan lokale opslag
    takenOpslaan(takenlijstInput.value);

    //knopje voor gedaan
    const voltooidKnop = document.createElement("button");
    voltooidKnop.innerHTML = '<i class = "fas fa-check"></i>';
    voltooidKnop.classList.add("voltooidknopje");
    taakDiv.appendChild(voltooidKnop);

    //knopje voor verwijderen
    const verwijderKnop = document.createElement('button');
    verwijderKnop.innerHTML = '<i class = "fas fa-trash"></i>';
    verwijderKnop.classList.add("verwijderknopje");
    taakDiv.appendChild(verwijderKnop);

    //voeg toe aan lijst
    takenlijst.appendChild(taakDiv);

    //verwijderen van een input value
    takenlijstInput.value = "";
}

function verwijderTaak(event) {
    console.log("functie verwijderTaak(), dit is event.target: ", event.target);
    const voorwerp = event.target;
    // verwijder todo
    if (voorwerp.classList[0] === "verwijderknopje") {
        const taakje = voorwerp.parentElement;
        taakje.classList.add("verdwijn");
        taakje.addEventListener('transitionend', oprotten);
        verwijderTaakUitOpslag(taakje);
    }


    // streep taak af als voltooid
    if (voorwerp.classList[0] === "voltooidknopje") {
        const taakje = voorwerp.parentElement;
        taakje.classList.toggle('voltooid');
    }
}

function filterTaken(event) {
    console.log("filterTaken wordt aangeroepen");
    const taken = takenlijst.children;
    console.log("dit is de taken const met takenlijst.childNodes: ", taken);

    Array.from(taken).forEach(function (taak) {
        switch (event.target.value) {
            case "alles":
                taak.style.display = "flex";
                console.log("case alles, stel display in als flex")
                break;
            case "voltooid":
                if (taak.classList.contains("voltooid")) {
                    taak.style.display = "flex";
                    console.log("case voltooid, stel display in als flex")
                }
                else {
                    taak.style.display = "none";
                    console.log("case voltooid, stel display in als none")
                }
                break;
            case "nogNietVoltooid":
                if (!taak.classList.contains("voltooid")) {
                    taak.style.display = "flex";
                    console.log("case nogNietVoltooid, stel display in als flex")
                }
                else {
                    taak.style.display = "none";
                    console.log("case nogNietVoltooid, stel display in als none")
                }
                break;

        }
    });
}


function takenOpslaan(taak) {
    //controleer op al bestaande opslagbestanden
    let taken;
    // als hij er nog niet is, maak een nieuwe lege array aan
    if (localStorage.getItem("takenJSON") === null) {
        taken = [];
    }
    // als hij er wel is, geef de waarde van die json shit door aan takenlijst

    else {
        taken = JSON.parse(localStorage.getItem("takenJSON"));
    }

    // voeg de taak toe aan de theoretische takenlijst
    // daarna sla je die takenlijst lokaal op in je browser
    taken.push(taak);
    localStorage.setItem('takenJSON', JSON.stringify(taken));


}

function takenOphalen() {
    let taken;
    if (localStorage.getItem("takenJSON") === null) {
        taken = [];
    }
    else {
        taken = JSON.parse(localStorage.getItem("takenJSON"));
    }

    Array.from(taken).forEach(function (taak) {
        //taak div
        const taakDiv = document.createElement("div");
        taakDiv.classList.add("taak");

        //maak listitem
        const nieuweTaak = document.createElement("li");
        nieuweTaak.innerText = taak;
        nieuweTaak.classList.add("taak-item");

        taakDiv.appendChild(nieuweTaak);

        //knopje voor gedaan
        const voltooidKnop = document.createElement("button");
        voltooidKnop.innerHTML = '<i class = "fas fa-check"></i>';
        voltooidKnop.classList.add("voltooidknopje");
        taakDiv.appendChild(voltooidKnop);

        //knopje voor verwijderen
        const verwijderKnop = document.createElement('button');
        verwijderKnop.innerHTML = '<i class = "fas fa-trash"></i>';
        verwijderKnop.classList.add("verwijderknopje");
        taakDiv.appendChild(verwijderKnop);

        //voeg toe aan lijst
        takenlijst.appendChild(taakDiv);
    })
}


function verwijderTaakUitOpslag(taak) {
    let taken;

    if (localStorage.getItem("takenJSON") === null) {
        taken = [];
    }
    else {
        taken = JSON.parse(localStorage.getItem("takenJSON"));
    }

    console.log("verwijderTaakUitOpslag() wordt aangeroepen. dit zijn de taken: ", taken);
    console.log("en dit is het taakje wat als argument gebruikt wordt in deze functie", taak);

}
