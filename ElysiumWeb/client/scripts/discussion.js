// threaded discussion template w/ momentum badges
document.addEventListener("DOMContentLoaded", function () {
    const postButton = document.getElementById("post-button");
    const newPostInput = document.getElementById("new-post");
    const discussionThreads = document.getElementById("discussion-threads");

    postButton.addEventListener("click", function () {
        const content = newPostInput.value.trim();
        if (!content) return;

        const threadElement = document.createElement("div");
        threadElement.classList.add("thread");
        threadElement.innerHTML = `
            <h3>@You</h3>
            <p>${content}</p>
            <div class="momentum-badges">
                <span>⚡ 0 Impact</span>
                <span>🛡️ 0 Bravery</span>
                <span>🧠 0 Wisdom</span>
                <span>🔥 0 Resonance</span>
            </div>
        `;

        discussionThreads.prepend(threadElement);

        newPostInput.value = "";
    });
});
