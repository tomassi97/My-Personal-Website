/* ============================================================
   GLOBAL SCRIPT FILE
   Used across all pages
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    updateFooterYear();
    initializeAccordions();
    initializeSmoothScroll();
    initializeForms();
    initializeWhatsAppButton();
    initializeSamplePreviewButtons();
    initializeSampleFilters();
});

function updateFooterYear() {
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function initializeAccordions() {
    const accordionItems = Array.from(document.querySelectorAll(".accordion-item"));

    if (!accordionItems.length) {
        return;
    }

    accordionItems.forEach(item => {
        const header = item.querySelector(".accordion-header");

        if (!header) {
            return;
        }

        header.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            accordionItems.forEach(otherItem => {
                otherItem.classList.remove("active");
                const otherHeader = otherItem.querySelector(".accordion-header");

                if (otherHeader) {
                    otherHeader.setAttribute("aria-expanded", "false");
                }
            });

            if (!isActive) {
                item.classList.add("active");
                header.setAttribute("aria-expanded", "true");
            }
        });
    });
}

function initializeSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

function initializeForms() {
    const forms = document.querySelectorAll("form");

    forms.forEach(form => {
        form.addEventListener("submit", event => {
            event.preventDefault();

            alert(
                "Thank you for reaching out. Your message has been received, and I will respond promptly."
            );

            form.reset();
        });
    });
}

function initializeWhatsAppButton() {
    const whatsappInput = document.getElementById("whatsappNumber");
    const whatsappButton = document.querySelector(".whatsapp-btn");

    if (!whatsappInput || !whatsappButton) {
        return;
    }

    whatsappButton.addEventListener("click", event => {
        event.preventDefault();

        const userNumber = whatsappInput.value.trim();

        if (!userNumber) {
            alert("Please enter your WhatsApp number before proceeding.");
            whatsappInput.focus();
            return;
        }

        const businessNumber = "254704096155";
        const message = encodeURIComponent(
            `Hello Nelis, I would like professional academic writing assistance. My WhatsApp number is: ${userNumber}`
        );

        window.open(`https://wa.me/${businessNumber}?text=${message}`, "_blank", "noopener");
    });
}

function initializeSamplePreviewButtons() {
    const previewButtons = document.querySelectorAll(".preview-btn");

    if (!previewButtons.length) {
        return;
    }

    previewButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            alert(
                "Sample preview is restricted for confidentiality.\n" +
                "Please request similar work via the 'Request Similar Work' button."
            );
        });
    });
}

function initializeSampleFilters() {
    const grid = document.querySelector(".samples-grid");

    if (!grid) {
        return;
    }

    const cards = Array.from(grid.querySelectorAll(".sample-card"));
    const searchInput = document.getElementById("searchInput");
    const disciplineFilter = document.getElementById("disciplineFilter");
    const citationFilter = document.getElementById("citationFilter");

    const safeLower = value => (value || "").toString().toLowerCase().trim();

    function handleNoResults(count) {
        let noResults = grid.querySelector(".no-results");

        if (count === 0) {
            if (!noResults) {
                noResults = document.createElement("div");
                noResults.className = "no-results";
                noResults.textContent = "No samples found matching your criteria.";
                grid.appendChild(noResults);
            }

            return;
        }

        if (noResults) {
            noResults.remove();
        }
    }

    function filterSamples() {
        const searchValue = searchInput ? safeLower(searchInput.value) : "";
        const disciplineValue = disciplineFilter ? disciplineFilter.value : "";
        const citationValue = citationFilter ? citationFilter.value : "";

        let visibleCount = 0;

        cards.forEach(card => {
            const title = safeLower(card.dataset.title);
            const discipline = safeLower(card.dataset.discipline);
            const citation = safeLower(card.dataset.citation);
            const textContent = safeLower(card.textContent);

            const matchesSearch =
                !searchValue ||
                title.includes(searchValue) ||
                discipline.includes(searchValue) ||
                citation.includes(searchValue) ||
                textContent.includes(searchValue);

            const matchesDiscipline =
                !disciplineValue || discipline === safeLower(disciplineValue);

            const matchesCitation =
                !citationValue || citation === safeLower(citationValue);

            const shouldShow = matchesSearch && matchesDiscipline && matchesCitation;

            card.classList.toggle("is-hidden", !shouldShow);

            if (shouldShow) {
                visibleCount += 1;
            }
        });

        handleNoResults(visibleCount);
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterSamples);
    }

    if (disciplineFilter) {
        disciplineFilter.addEventListener("change", filterSamples);
    }

    if (citationFilter) {
        citationFilter.addEventListener("change", filterSamples);
    }

    filterSamples();
}
