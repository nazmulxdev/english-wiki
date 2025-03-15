//global variable list



const navBar = document.getElementById("nav-bar");
const heroSection = document.getElementById("hero-section");
const vocabularySection = document.getElementById("vocabulary-section");
const frequentlyAskQuestionSection = document.getElementById("frequently_ask_question_section");




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
    document.getElementById("name-input-field").value="";
    document.getElementById("password-input-field").value="";
    heroSection.classList.remove("hidden");
    navBar.classList.add("hidden");
    vocabularySection.classList.add("hidden");
    frequentlyAskQuestionSection.classList.add("hidden");
})





//load  lesson buttons

const loadLessonButton=async()=>{
    const response=await fetch("https://openapi.programming-hero.com/api/levels/all");
    const data =await response.json();
    displayLessonButton(data.data);
}

// display lesson buttons

const loadButtonsSection = document.getElementById("lesson-buttons-section");
const displayLessonButton=async (lessonButtons)=>{
    console.log(lessonButtons);

    lessonButtons.forEach(button => {
        console.log(button);

        const learnButton=document.createElement("a");
        learnButton.className ="btn border-[#422AD5] text-[#422AD5] font-semibold text-sm hover:bg-[#422AD5] hover:text-white";
        learnButton.innerHTML = `
        <i class="fa-solid fa-book-open"></i> ${button.lessonName} - ${button.level_no}
        `
        loadButtonsSection.appendChild(learnButton);
    });
}





loadLessonButton();