
const kérdések = [
    {
        kérdés: "Melyik történelmi szín számít Madách Imre jelenének?",
        válaszok: ["Párizs", "Falaszter", "London", "Prága"],
        helyesVálaszIndex: 1,
        kep: "london.webp"

    },
    {
        kérdés: "Kiről mintázta Évát Madách Imre?",
        válaszok: ["A nővéréről", "A felesgéről", "Az nanyósáról", "A lányáról"],
        helyesVálaszIndex: 0,
        kep: "medici.jpg"

    },
    {
        kérdés: "Melyik szín NEM a jövőben játszódik?",
        válaszok: ["Paradicsom", "Falaszter", "Az Űr", "Eszkimó-világ"],
        helyesVálaszIndex: 0,
        kep: "london.webp"

    },
    {
        kérdés: "Az 1862. január 12-én megjelent művet mikor tiltották be a színházakban?",
        válaszok: ["A kommunizmus idején", "A bemutató után egyből", "Az első világháború után.", "Sosem tiltották be."],
        helyesVálaszIndex: 1,
        kep: "jezus.jfif"

    },
    {
        kérdés: "Ádám melyik híres történelmi személyként NEM szerepel a műben?",
        válaszok: ["Miltiadész, arisztokrata", "Fourier, író", "Kepler, csillagász", "Danton, forradalmár"],
        helyesVálaszIndex: 3,
        kep: "fiametta.jpg"

    },
    {
        kérdés: "Melyik az a szín, ahol az álmot nem Lucifer irányítja, hanem Ádám?",
        válaszok: ["Athén", "Róma", "Párizs", "London"],
        helyesVálaszIndex: 3,
        kep: "london.webp"

    },
    {
        kérdés: "Ki Ádám és Éva fia az ötödik színben?",
        válaszok: ["Kimón", "Elpinice", "Erósz", "Kriszposz"],
        helyesVálaszIndex: 2,
        kep: "london.webp"
    }
];

const kvízKonténer = document.getElementById('kvíz-konténer');

let jelenlegiKérdésIndex = 0;
let jelenlegiKérdésMegválaszolva = false; 

function következőKérdés() {
    if (!jelenlegiKérdésMegválaszolva) return; 
    jelenlegiKérdésIndex++;
    jelenlegiKérdésMegválaszolva = false; 
    if (jelenlegiKérdésIndex < kérdések.length) {
        setTimeout(() => {
            addKártya(kérdések[jelenlegiKérdésIndex], jelenlegiKérdésIndex);
        }, 1500);
    }
}
var pontszam=0;
function addKártya(kérdés, index) {
    const kártya = document.createElement('div');
    kártya.classList.add('kártya');

    const kártyaTartalom = `
        <h3>Kérdés ${index + 1}</h3>
        <p>${kérdés.kérdés}</p>
        <div class="lehetőségek">
            ${kérdés.válaszok.map((válasz, válaszIndex) => `
                <button class="lehetőség" data-index="${válaszIndex}">${válasz}</button>
            `).join('')}
        </div>
        <img id="kep" style="max-height:300px; max-width:180px; margin:18px" src="images/${kérdések.indexOf(kérdés) !== -1 ? kérdések[kérdések.indexOf(kérdés)].kep : ''}">
    `;

    kártya.innerHTML = kártyaTartalom;
    kvízKonténer.appendChild(kártya);

    const lehetőségek = kártya.querySelectorAll('.lehetőség');
    lehetőségek.forEach(lehetőség => {
        lehetőség.addEventListener('click', () => {
            const kiválasztottVálaszIndex = parseInt(lehetőség.getAttribute('data-index'));
            const helyesVálaszIndex = kérdés.helyesVálaszIndex;

            if (kiválasztottVálaszIndex === helyesVálaszIndex) {
                lehetőség.style.backgroundColor = 'gray';
                pontszam++;
            } else {
                lehetőség.style.backgroundColor = 'gray';
            }

            // Disable all buttons after an answer is clicked
            lehetőségek.forEach(button => {
                button.disabled = true;
            });

            // Set the flag to indicate that the question has been answered
            jelenlegiKérdésMegválaszolva = true;

            // Move to the next question after a delay
            setTimeout(következőKérdés, 1500);
            if (jelenlegiKérdésIndex == kérdések.length-1) {
                alert(`Elért pontok: ${pontszam}/${kérdések.length}`)
            }
        });
    });
}

addKártya(kérdések[jelenlegiKérdésIndex], jelenlegiKérdésIndex);
