const form = document.getElementById("careerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        education: document.getElementById("education").value,
        skills: document.getElementById("skills").value,
        goal: document.getElementById("goal").value,
        hours: document.getElementById("hours").value,
        duration: document.getElementById("duration").value
    };

    const button = form.querySelector("button");
    button.innerText = "Generating...";
    button.disabled = true;

    try {

        const response = await fetch("http://localhost:5000/generate-roadmap", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        localStorage.setItem("roadmap", result.roadmap);

        window.location.href = "result.html";

    } catch (err) {

        alert("Something went wrong!");

        console.log(err);

    }

});