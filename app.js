// selectors
const takenlijstInput = document.querySelector('.invoer');
const takenlijstKnop = document.querySelector('.todo-knop');
const takenlijst = document.querySelector('.lijst-met-taken');

// event listerners
takenlijstKnop.addEventListener('click', voegTaakToe)
takenlijst.addEventListener('click', verwijderTaak);

// alle functies

function oprotten(){
    this.remove();
    console.log("opgerot");
}

function voegTaakToe(event){
    event.preventDefault();
    console.log('voegTaakToe() wordt aangeroepen');
    //taak div
    const taakDiv = document.createElement("div");
    taakDiv.classList.add('taak');

    //maak listitem
    const nieuweTaak = document.createElement('li');
    nieuweTaak.innerText= takenlijstInput.value;
    nieuweTaak.classList.add('taak-item');

    taakDiv.appendChild(nieuweTaak);

    //knopje voor gedaan
    const voltooidKnop = document.createElement('button');
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

function verwijderTaak(event){
    console.log(event.target);
    const voorwerp = event.target;
    // verwijder todo
    if(voorwerp.classList[0] === "verwijderknopje"){
        const taakje = voorwerp.parentElement;
        taakje.classList.add("verdwijn");
        taakje.addEventListener('transitionend', oprotten);
    }

    if(voorwerp.classList[0] === "voltooidknopje"){
        const taakje = voorwerp.parentElement;
        taakje.classList.toggle('voltooid');
    }
}