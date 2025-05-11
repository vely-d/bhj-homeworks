let xhr1 = new XMLHttpRequest();

let response = {};

xhr1.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");

function answerClick(event) {
    alert("спасибо! ваш голос засчитан");
    getPollResults(this.textContent);
}

function getPollResults(answer) {
    let answerIndex = response.data.answers.indexOf(answer);
    xhr1 = new  XMLHttpRequest();
    xhr1.open("POST", "https://students.netoservices.ru/nestjs-backend/poll");
    xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr1.send(`vote=${response.id}&answer=${answerIndex}`);
    xhr1.addEventListener("readystatechange", function() {
        if(this.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        let stat = JSON.parse(this.response).stat;
        document.querySelector(".poll__answers_active").classList.remove("poll__answers_active");
        let pollResults = document.querySelector(".poll__results"); 
        pollResults.classList.add("poll__results_active");
        let totalVotes = stat.reduce((a, b) => { return a + b.votes }, 0);
        for(let s of stat) {
            pollResults.innerHTML += `<div class="poll__result">${s.answer}: ${s.votes / totalVotes * 100}%</div>`;
        }
    });
}

xhr1.addEventListener("readystatechange", function() {
    if(this.readyState === XMLHttpRequest.DONE) {
        response = JSON.parse(this.responseText);
        let pollElement = document.querySelector(".poll");
        let pollTitle = pollElement.querySelector(".poll__title");
        pollTitle.textContent = response.data.title;

        let pollAnswers = pollElement.querySelector(".poll__answers");
        for(let a of response.data.answers) {
            let btn = document.createElement("button");
            btn.classList.add("poll__answer");
            btn.textContent = a;
            btn.addEventListener("click", answerClick);
            pollAnswers.appendChild(btn);
            // pollAnswers.innerHTML += `<button class="poll__answer">${a}</button>`; 
        }
    }
});

xhr1.send();