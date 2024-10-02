document.addEventListener("DOMContentLoaded", () => {
    function generateColumnNumbers(start, end, usedNumbers) {
        const numbers = [];
        while (numbers.length < 5) {
            const num = Math.floor(Math.random() * (end - start + 1)) + start;
            if (!numbers.includes(num) && !usedNumbers.has(num)) {
                numbers.push(num);
                usedNumbers.add(num);
            }
        }
        return numbers;
    }

    function generateBingoCard(usedNumbers) {
        const card = [];
        card.push(generateColumnNumbers(1, 15, usedNumbers)); // B
        card.push(generateColumnNumbers(16, 30, usedNumbers)); // I
        card.push(generateColumnNumbers(31, 45, usedNumbers)); // N
        card.push(generateColumnNumbers(46, 60, usedNumbers)); // G
        card.push(generateColumnNumbers(61, 75, usedNumbers)); // O

        // Randomly select a position for the "FREE" space
        const freeRow = Math.floor(Math.random() * 5);
        const freeCol = Math.floor(Math.random() * 5);
        card[freeCol][freeRow] = "";

        return card;
    }

    function createBingoCardElement(card) {
        const cardElement = document.createElement("div");
        cardElement.className = "bingo-card";
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement("div");
                cell.textContent = card[j][i];
                if (card[j][i] === "FREE") {
                    cell.className = "free";
                }
                cardElement.appendChild(cell);
            }
        }
        return cardElement;
    }

    function generateMultipleBingoCards(pages, cardsPerPage) {
        for (let p = 0; p < pages; p++) {
            const pageElement = document.createElement("div");
            pageElement.className = "page";

            // Add header for the first card on each page
            const header = document.createElement("h1");
            header.textContent = "Musikkbingo";
            pageElement.appendChild(header);

            const usedNumbers = new Set();
            for (let i = 0; i < cardsPerPage; i++) {
                const card = generateBingoCard(usedNumbers);
                const cardElement = createBingoCardElement(card);
                pageElement.appendChild(cardElement);
            }
            document.body.appendChild(pageElement);
        }
    }

    // Generate 40 pages with 3 Bingo cards each
    generateMultipleBingoCards(40, 3);
});
