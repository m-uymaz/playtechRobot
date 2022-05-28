"use strict";
;
var RobotType;
(function (RobotType) {
    RobotType["male"] = "male";
    RobotType["female"] = "female";
})(RobotType || (RobotType = {}));
;
const robotModels = [];
const deleteRobotsBtn = document.querySelector(".deleteRobots");
window.onload = () => {
    if (localStorage.getItem("robots")) {
        deleteRobotsBtn.disabled = false;
        deleteRobotsBtn.textContent = "Delete Robots";
        const robotsFromStorage = localStorage.getItem("robots");
        const parsed = JSON.parse(robotsFromStorage);
        robotModels.push(...parsed);
        for (let i = 0; i < robotModels.length; i++) {
            createRobot(robotModels[i]);
        }
        ;
        carouselButtonsSlide();
    }
    ;
    console.log(robotModels);
};
const form = document.querySelector("#robot-form");
const phrase = form.querySelector("input[name='phrase']");
form.addEventListener("submit", formSubmit);
const onCheckboxChange = () => {
    const talkCheckbox = form.querySelector("input[name='canTalk']");
    const phrase = form.querySelector("input[name='phrase']");
    phrase.disabled = !talkCheckbox.checked;
    if (!talkCheckbox.checked) {
        phrase.value = "";
    }
    ;
};
function formSubmit(event) {
    event.preventDefault();
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
    const robotType = (type.value === "male") ? RobotType.male : RobotType.female;
    const createdRobot = {
        id: `${robotModels.length + 1}`,
        name: name.value,
        type: robotType,
        color: color.value,
        phrase: phrase.value,
        options
    };
    robotModels.push(createdRobot);
    localStorage.setItem("robots", JSON.stringify(robotModels));
    createRobot(createdRobot);
    phrase.value = "";
    clearErrorMessages();
    console.log(robotModels);
    form.reset();
    phrase.disabled = !talkCheckbox.checked;
    removeNoRobotsYet();
}
;
const showError = (input, errorMessage, spanError) => {
    if (input.value === "") {
        spanError.textContent = errorMessage;
    }
    ;
};
const clearErrorMessages = () => {
    const allErrorSpans = document.querySelectorAll(".error");
    allErrorSpans.forEach(el => el.textContent = "");
};
const createRobot = (robotModels) => {
    const body = document.querySelector("body");
    const slide1 = buildSection();
    const robotFriend = slide1.querySelector(".robotFriend");
    const eye = slide1.querySelector("#eyes div:nth-of-type(2)");
    const torso = slide1.querySelector(".torso");
    const mouth = slide1.querySelector(".mouth");
    const leftHand = slide1.querySelector(".leftHand");
    const rightHand = slide1.querySelector(".rightHand");
    const leftLeg = slide1.querySelector(".leftLeg");
    const rightLeg = slide1.querySelector(".rightLeg");
    const robotNameContainer = slide1.querySelector(".robotNameContainer");
    const ribon = slide1.querySelector("#basicRobot > h3");
    if (robotModels.type === RobotType.male) {
        torso.classList.add("torso-male");
        leftHand.classList.add("leftHand-male");
        rightHand.classList.add("rightHand-male");
        const torsoMale = slide1.querySelector(".torso-male");
        torsoMale.style.borderTop = `100px solid ${robotModels.color}`;
        ribon.textContent = "Male Robot";
    }
    else {
        torso.classList.add("torso-female");
        leftHand.classList.add("leftHand-female");
        rightHand.classList.add("rightHand-female");
        const torsoFemale = slide1.querySelector(".torso-female");
        torsoFemale.style.borderBottom = `100px solid ${robotModels.color}`;
        ribon.textContent = "Female Robot";
    }
    ;
    if (robotModels.options.includes("can jump")) {
        robotFriend.classList.add("wholeRobotJump");
        leftLeg.classList.add("legsJump");
        rightLeg.classList.add("legsJump");
    }
    ;
    if (robotModels.phrase) {
        const robotContainer = slide1.querySelector("#robotContainer");
        const talkingBubble = document.createElement("div");
        talkingBubble.classList.add("bubble", "bubble-bottom-left");
        const spanBubble = document.createElement("span");
        spanBubble.classList.add("spanBubble");
        spanBubble.textContent = robotModels.phrase;
        talkingBubble.appendChild(spanBubble);
        robotContainer.appendChild(talkingBubble);
        mouth.classList.add("talk");
    }
    ;
    if (robotModels.options.includes("can blink")) {
        eye.classList.add("blink");
    }
    ;
    robotNameContainer.textContent = robotModels.name;
    const carouselContainer = body.querySelector(".ct");
    carouselContainer.classList.add("carousel-container");
    const slideButtons = body.querySelector(".slide-buttons");
    slideButtons.style.display = "flex";
    const carousel = body.querySelector(".carousel");
    carousel.prepend(slide1);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    carousel.style.transform = `translateX(0px)`;
    deleteRobotsBtn.disabled = false;
    deleteRobotsBtn.textContent = "Delete Robots";
    slideMove = 0;
    carouselButtonsSlide();
};
const carousel = document.querySelector(".carousel");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
let slideMove = 0;
const carouselButtonsSlide = () => {
    if (robotModels.length === 1) {
        nextBtn.disabled = true;
        prevBtn.disabled = true;
    }
    else {
        nextBtn.disabled = false;
        prevBtn.disabled = true;
    }
    ;
    return;
};
nextBtn.onclick = () => {
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
prevBtn.onclick = () => {
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
deleteRobotsBtn.onclick = () => {
    robotModels.length = 0;
    localStorage.clear();
    removeCarouselChild(carousel);
    removeTable(afterForm);
    const ct = document.querySelector(".ct");
    ct.style.border = "none";
    slideMove = 0;
    const slideButtons = document.querySelector(".slide-buttons");
    slideButtons.style.display = "none";
    deleteRobotsBtn.disabled = true;
    deleteRobotsBtn.textContent = "No Robots To Delete";
    showRobotsBtn.value = "false";
};
function removeCarouselChild(carousel) {
    while (carousel.firstChild) {
        carousel.removeChild(carousel.firstChild);
    }
    ;
}
;
function removeTable(tableContainer) {
    while (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
    }
    ;
}
;
//# sourceMappingURL=robotFormAndCreation.js.map