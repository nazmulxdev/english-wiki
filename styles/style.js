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