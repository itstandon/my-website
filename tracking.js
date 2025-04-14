function findtype(element) {
    if (element.tagName === "IMG") return "image";
    if (element.tagName === "A") return "hyperlink";
    if (element.tagName === "BUTTON") return "button";
    if (element.tagName === "P") return "text";
    if (element.tagName.match(/^H[1-6]$/)) return "heading";
    return "other";
}

function sectionsel(element) {
    while (element && element !== document.body) {
        if (element.id) return element.id;
        if (element.classList && element.classList.length > 0) return element.classList[0];
        element = element.parentElement;
    }
    return "unknown";
}

window.addEventListener("load", () => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, view, page loaded`);
});

document.addEventListener("click", (event) => {
    const timestamp = new Date().toISOString();
    const element = event.target;
    const type = findtype(element);
    const section = sectionsel(element);
    let content = "";

    if (type === "hyperlink") {
        content = element.getAttribute("href") || element.textContent.trim();
    } else if (type === "image") {
        content = element.getAttribute("src");
    } else {
        content = element.textContent.trim().slice(0, 50);
    }

    console.log(`${timestamp}, click, ${type}, section: ${section}, content: "${content}"`);
});