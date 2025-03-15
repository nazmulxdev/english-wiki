//global variable list



const navBar = document.getElementById("nav-bar");
const heroSection = document.getElementById("hero-section");
const vocabularySection = document.getElementById("vocabulary-section");
const frequentlyAskQuestionSection = document.getElementById("frequently_ask_question_section");

const vocabularyCardSection = document.getElementById("vocabulary-card-section");



// configuring get started button
document.getElementById("get-started-button").addEventListener("click", (event) => {
    event.preventDefault();

    const nameInputField = document.getElementById("name-input-field").value;
    const passwordInputField = document.getElementById("password-input-field").value;
    if (nameInputField) {
        if (passwordInputField === "123456") {
            Swal.fire({
                title: "অভিনন্দন",
                text: "চলুন আজ নতুন কিছু শেখা যাক",
                icon: "success"
            });

            heroSection.classList.add("hidden");
            navBar.classList.remove("hidden");
            vocabularySection.classList.remove("hidden");
            frequentlyAskQuestionSection.classList.remove("hidden");


        }
        else {
            Swal.fire({
                title: "Oops...",
                text: "Please enter a valid password!!",
                icon: "error"
            });
        }
    }
    else {

        Swal.fire({
            title: "Oops...",
            text: "Please enter your name!!",
            icon: "error"
        });
    }
});




// configuring log out button

document.getElementById("logout-button").addEventListener("click", (event) => {
    // event.preventDefault();
    document.getElementById("name-input-field").value = "";
    document.getElementById("password-input-field").value = "";
    heroSection.classList.remove("hidden");
    navBar.classList.add("hidden");
    vocabularySection.classList.add("hidden");
    frequentlyAskQuestionSection.classList.add("hidden");
})





//load  lesson buttons

const loadLessonButton = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const data = await response.json();
    displayLessonButton(data.data);
}


// load lesson by clicking lesson button


const loadLessonByButton = async (buttonId) => {
    // console.log(event.target);
    event.target.classList.add("bg-[#422AD5]", "text-white");
    const response = await fetch(`https://openapi.programming-hero.com/api/level/${buttonId}`);
    const data = await response.json();
    vocabularyCardSection.innerHTML = "";
    displayLessonByButton(data.data);
}





// display lesson buttons

const loadButtonsSection = document.getElementById("lesson-buttons-section");
const displayLessonButton = async (lessonButtons) => {
    // console.log(lessonButtons);
    lessonButtons.forEach(button => {
        // console.log(button);

        const learnButton = document.createElement("a");
        learnButton.className = "button-effect btn border-[#422AD5] text-[#422AD5] font-semibold text-sm hover:bg-[#422AD5] hover:text-white";
        learnButton.onclick = () => loadLessonByButton(button.level_no);
        learnButton.innerHTML = `
        <i class="fa-solid fa-book-open"></i> ${button.lessonName} - ${button.level_no}
        `
        loadButtonsSection.appendChild(learnButton);
    });
}


// display card

const displayLessonByButton = async (lessonCards) => {
    console.log(lessonCards.length);

    document.getElementById("lesson-selection-alert").classList.add("hidden");
    document.getElementById("vocabulary-card-section").classList.remove("hidden");
    document.getElementById("vocabulary-card-section").classList.add("grid");
    if (!lessonCards.length) {
        document.getElementById("no-lesson-added").classList.remove("hidden")
        document.getElementById("vocabulary-card-section").classList.add("hidden");
        return;

    }
    else {
        document.getElementById("no-lesson-added").classList.add("hidden")
        document.getElementById("vocabulary-card-section").classList.remove("hidden");
    }
    lessonCards.forEach(card => {
        console.log(card);
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <div class="card bg-white shadow-lg p-8">
                    <div class="border border-dashed border-slate-200 card-body text-center p-8">
                        <h2 class="text-center font-bold text-3xl leading-4 mt-1 mb-6">${card.word}</h2>
                        <h2 class="text-center font-medium text-xl leading-4 mb-6">Meaning /Pronounciation</h2>
                        <p class="font-medium text-3xl mb-6">"${card.meaning ? card.meaning : 'অর্থ নেই'} / ${card.pronunciation}"</p>
                        <div class="flex justify-between">
                            <button class="btn hover:bg-slate-200 w-[3.5rem] h-[3.5rem] bg-[#1A91FF10] text-[#374957] text-2xl"><i class="fa-solid fa-circle-info"></i></button>
                            <button onclick=pronounceWord('${card.word}') class="btn hover:bg-slate-200 w-[3.5rem] h-[3.5rem] bg-[#1A91FF10] text-[#374957] text-2xl"><i class="fa-solid fa-volume-high"></i></button>
                        </div>
                    </div>
                </div>
        
        
        `
        vocabularyCardSection.appendChild(cardDiv);

    })


}

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // English
    window.speechSynthesis.speak(utterance);
}




loadLessonButton();