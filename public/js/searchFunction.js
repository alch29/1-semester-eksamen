function attachStationFilter(inputSelector, itemSelector) {
    const input = document.querySelector(inputSelector);
    const items = document.querySelectorAll(itemSelector);

    if (!input) return;

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();

        items.forEach(item => {
            const name = item.dataset.name.toLowerCase();
            const address = item.dataset.address.toLowerCase();

            const matches =
                query === "" ||
                name.includes(query) ||
                address.includes(query);

            item.style.display = matches ? "" : "none";
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    attachStationFilter(".searchField", ".stationCard");
    attachStationFilter(".searchField", ".stationCheckboxWrapper");
});

