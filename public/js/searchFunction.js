function levenshteinDistance(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
        Array.from({ length: b.length + 1 }, (_, j) =>
            i === 0 ? j : j === 0 ? i : 0
        )
    );

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    return matrix[a.length][b.length];
}

function fuzzyWordMatch(query, text) {
    const queryWords = query.split(/\s+/);
    const textWords = text.split(/\s+/);

    return queryWords.every(qWord =>
        textWords.some(tWord =>
            tWord.includes(qWord) ||
            levenshteinDistance(qWord, tWord) <= 1
        )
    );
}



function attachStationFilter(inputSelector, itemSelector) {
    const input = document.querySelector(inputSelector);
    const items = document.querySelectorAll(itemSelector);

    if (!input) return;

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();

        items.forEach(item => {
            const name = item.dataset.name.toLowerCase();
            const address = item.dataset.address.toLowerCase();

            const directMatch =
                query === "" ||
                name.includes(query) ||
                address.includes(query);

            const fuzzyMatch =
                query.length > 2 && (
                    fuzzyWordMatch(query, name) ||
                    fuzzyWordMatch(query, address)
                );

            item.style.display = (directMatch || fuzzyMatch) ? "" : "none";

        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    attachStationFilter(".searchField", ".stationCard");
    attachStationFilter(".searchField", ".stationCheckboxWrapper");
});


