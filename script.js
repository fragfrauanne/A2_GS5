const tasks = [
    { question: "Ich habe _____ mein___ Freund gedacht.", answer: "an meinen" },
    { question: "W_____ hast du dich geärgert?", answer: "Worüber" },
    { question: "Sie interessieren sich nicht _____ Tanz.", answer: "für" },
    { question: "W_____ interessiert ihr euch?", answer: "Wofür" },
    { question: "Sie träumt _____ ein___ großen Haus.", answer: "von einem" },
    { question: "Wir haben uns _____ d___ Verkäufer geärgert.", answer: "über den" },
    { question: "Kümmerst du dich _____ d___ Essen?", answer: "um das" },
    { question: "Ich möchte mich _____ mein___ Onkel treffen.", answer: "mit meinem" },
    { question: "W_____ denkst du gerade?", answer: "Woran" },
    { question: "Hast du Lust _____ ein___ Kaffee?", answer: "auf einen" },
    { question: "W_____ hast du denn Lust?", answer: "Worauf" },
    { question: "W_____ warten Sie?", answer: "Worauf" },
    { question: "Wir haben uns _____ Anna verabredet.", answer: "mit" },
    { question: "W_____ habt ihr gesprochen?", answer: "Worüber" },
    { question: "Wir haben _____ d___ Film gesprochen.", answer: "über den" },
    { question: "Erinnerst du dich noch _____ d___ Grillfest?", answer: "an das" },
    { question: "Die Gäste haben sich _____ d___ Essen beschwert.", answer: "über das" },
    { question: "Bist du _____ dein___ Wohnung zufrieden?", answer: "mit deiner" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});
