document.addEventListener("DOMContentLoaded", () => {
    const updatesSection = document.getElementById("updates");
    // Example: Fetch updates dynamically (replace URL with your API)
    fetch("/api/updates")
        .then(response => response.json())
        .then(data => {
            if (data.updates && data.updates.length) {
                updatesSection.innerHTML = `
                    <h2>What's New</h2>
                    <ul>
                        ${data.updates.map(update => `<li>${update}</li>`).join('')}
                    </ul>
                `;
            }
        })
        .catch(error => {
            console.error("Failed to load updates:", error);
        });
});
