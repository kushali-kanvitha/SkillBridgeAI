const form = document.getElementById("careerForm");
const fields = [

    document.getElementById("name"),
    document.getElementById("education"),
    document.getElementById("skills"),
    document.getElementById("goal"),
    document.getElementById("hours"),
    document.getElementById("duration")

];

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");

function updateProgress(){

    let completed = 0;

    fields.forEach(field => {

        if(field.value.trim() !== ""){

            completed++;

        }

    });

    const percent = Math.round((completed / fields.length) * 100);

    progressFill.style.width = percent + "%";

    progressPercent.textContent = percent + "%";

}

fields.forEach(field=>{

    field.addEventListener("input", updateProgress);

    field.addEventListener("change", updateProgress);

});

updateProgress();

form.addEventListener("submit", async (e) => {

    e.preventDefault();
    document.getElementById("loader").style.display="flex";

const fill=document.getElementById("loadingFill");
const text=document.getElementById("loadingText");

const messages=[

"👤 Understanding your profile...",

"💻 Analyzing your skills...",

"📚 Finding learning resources...",

"💼 Searching career opportunities...",

"🚀 Building your personalized roadmap..."

];

let progress=0;

let index=0;

const loading=setInterval(()=>{

progress+=20;

fill.style.width=progress+"%";

text.innerHTML=messages[index];

index++;

if(progress>=100){

clearInterval(loading);

}

},900);

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

        const response = await fetch("/generate-roadmap", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify(data)

});

        const result = await response.json();
        document.getElementById("loader").style.display="none";
        localStorage.setItem("roadmap", result.roadmap);
        localStorage.setItem("careerGoal", data.goal);

        window.location.href = "result.html";

    } catch (err) {

        alert("Something went wrong!");

        console.log(err);

    }

});