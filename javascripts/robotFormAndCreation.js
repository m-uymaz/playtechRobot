"use strict";
//Robot Storage
const robotModels = [];
const form = document.querySelector("#robot-form");
const phrase = form.querySelector("input[name='phrase']");
form.addEventListener("submit", formSubmit);
//Checkbox for "Phrase" input
const onCheckboxChange = () => {
    const talkCheckbox = form.querySelector("input[name='canTalk']");
    const phrase = form.querySelector("input[name='phrase']");
    phrase.disabled = !talkCheckbox.checked;
    if (!talkCheckbox.checked) {
        phrase.value = "";
    }
    ;
};
//Form submission and validation
function formSubmit(event) {
    event.preventDefault();
    // Checking if robots can jump, talk, blink
    const jumpCheckbox = form.querySelector("input[name='canJump']");
    const talkCheckbox = form.querySelector("input[name='canTalk']");
    const blinkCheckbox = form.querySelector("input[name='canBlink']");
    const options = [];
    let jump;
    let talk;
    let blink;
    if (jumpCheckbox.checked) {
        jump = "can jump";
        options.push(jump);
    }
    ;
    if (talkCheckbox.checked) {
        talk = "can talk";
        options.push(talk);
    }
    ;
    if (blinkCheckbox.checked) {
        blink = "can blink";
        options.push(blink);
    }
    ;
    const name = form.querySelector("#robotName");
    const type = form.querySelector("#selectType");
    const color = form.querySelector("#selectColor");
    const phrase = form.querySelector("input[name='phrase']");
    clearErrorMessages();
    if (!name.value || !type.value || !color.value || !phrase.disabled && phrase.value === "") {
        if (!name.value) {
            const spanErrorName = document.querySelector(".errorName");
            const nameErrorMessage = "Please enter a name";
            showError(name, nameErrorMessage, spanErrorName);
        }
        if (!type.value) {
            const spanErrorType = document.querySelector(".errorType");
            const typeErrorMessage = "Select a type";
            showError(type, typeErrorMessage, spanErrorType);
        }
        if (!color.value) {
            const spanErrorColor = document.querySelector(".errorColor");
            const colorErrorMessage = "Chose a color";
            showError(color, colorErrorMessage, spanErrorColor);
        }
        if (!phrase.disabled && phrase.value === "") {
            const spanErrorPhrase = document.querySelector(".errorPhrase");
            const phraseErrorMessage = "Please write a phrase";
            showError(phrase, phraseErrorMessage, spanErrorPhrase);
        }
        ;
        return;
    }
    ;
    robotModels.push({
        id: `${robotModels.length + 1}`,
        name: name.value,
        type: type.value,
        color: color.value,
        phrase: phrase.value,
        options,
    });
    createRobot(name, type, color, phrase);
    phrase.value = "";
    clearErrorMessages();
    console.log(robotModels);
    form.reset();
    phrase.disabled = !talkCheckbox.checked;
    // Removing "No robots yet" upon creation
    removeNoRobotsYet();
}
;
//Shows the error
const showError = (input, errorMessage, spanError) => {
    if (input.value === "") {
        spanError.textContent = errorMessage;
    }
    ;
};
//Clears messages on a submit or a submit try after an error
const clearErrorMessages = () => {
    const allErrorSpans = document.querySelectorAll(".error");
    allErrorSpans.forEach(el => el.textContent = "");
};
//Visual creation of Robots
const createRobot = (name, type, color, phrase) => {
    const body = document.querySelector("body");
    const slide1 = buildSection();
    const robotFriend = slide1.querySelector(".robotFriend");
    //Checkboxes
    const jumpCheckbox = form.querySelector("input[name='canJump']");
    const talkCheckbox = form.querySelector("input[name='canTalk']");
    const blinkCheckbox = form.querySelector("input[name='canBlink']");
    //Robot body
    const eye = slide1.querySelector("#eyes div:nth-of-type(2)");
    const torso = slide1.querySelector(".torso");
    const mouth = slide1.querySelector(".mouth");
    const leftHand = slide1.querySelector(".leftHand");
    const rightHand = slide1.querySelector(".rightHand");
    const leftLeg = slide1.querySelector(".leftLeg");
    const rightLeg = slide1.querySelector(".rightLeg");
    const robotNameContainer = slide1.querySelector(".robotNameContainer");
    const ribon = slide1.querySelector("#basicRobot > h3");
    if (type.value === "male") {
        torso.classList.add("torso-male");
        leftHand.classList.add("leftHand-male");
        rightHand.classList.add("rightHand-male");
        const torsoMale = slide1.querySelector(".torso-male");
        torsoMale.style.borderTop = `100px solid ${color.value}`;
        ribon.textContent = "Male Robot";
    }
    else {
        torso.classList.add("torso-female");
        leftHand.classList.add("leftHand-female");
        rightHand.classList.add("rightHand-female");
        const torsoFemale = slide1.querySelector(".torso-female");
        torsoFemale.style.borderBottom = `100px solid ${color.value}`;
        ribon.textContent = "Female Robot";
    }
    ;
    // Adding animations depending on checked checkbox
    if (jumpCheckbox.checked) {
        robotFriend.classList.add("wholeRobotJump");
        leftLeg.classList.add("legsJump");
        rightLeg.classList.add("legsJump");
    }
    ;
    if (talkCheckbox.checked) {
        const robotContainer = slide1.querySelector("#robotContainer");
        const talkingBubble = document.createElement("div");
        talkingBubble.classList.add("bubble", "bubble-bottom-left");
        const spanBubble = document.createElement("span");
        spanBubble.classList.add("spanBubble");
        spanBubble.textContent = phrase.value;
        talkingBubble.appendChild(spanBubble);
        robotContainer.appendChild(talkingBubble);
        mouth.classList.add("talk");
    }
    ;
    if (blinkCheckbox.checked) {
        eye.classList.add("blink");
    }
    ;
    robotNameContainer.textContent = name.value;
    const carouselContainer = body.querySelector(".ct");
    carouselContainer.classList.add("carousel-container");
    const slideButtons = body.querySelector(".slide-buttons");
    slideButtons.style.display = "flex";
    const carousel = body.querySelector(".carousel");
    carousel.prepend(slide1);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    carousel.style.transform = `translateX(0px)`;
    // CAROUSEL LOGIC STARTS FROM HERE 
    // NEEDED FOR CAROUSEL TO WORK!!!
    slideMove = 0;
    if (robotModels.length === 1) {
        nextBtn.disabled = true;
        prevBtn.disabled = true;
    }
    else {
        nextBtn.disabled = false;
        prevBtn.disabled = true;
    }
    ;
};
//selectors
const carousel = document.querySelector(".carousel");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
let slideMove = 0;
// event listeners
nextBtn.onclick = function () {
    const sectionsCount = carousel.children.length;
    slideMove++;
    if (slideMove - 1 >= 0) {
        prevBtn.disabled = false;
    }
    ;
    if (slideMove >= sectionsCount) {
        carousel.style.transform = `translateX(0px)`;
        slideMove = 0;
        prevBtn.disabled = true;
        return;
    }
    ;
    const curWidth = carousel.offsetWidth;
    const widthToMove = curWidth * slideMove;
    carousel.style.transform = `translateX(-${widthToMove}px)`;
};
prevBtn.onclick = function () {
    slideMove--;
    if (slideMove <= 0) {
        nextBtn.disabled = false;
        prevBtn.disabled = true;
    }
    ;
    const curWidth = carousel.offsetWidth;
    const widthToMove = curWidth * slideMove;
    carousel.style.transform = `translateX(-${widthToMove}px)`;
};
