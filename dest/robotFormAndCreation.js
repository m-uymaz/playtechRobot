"use strict";
class Robot {
    constructor(id, name, type, color, phrase, options) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._color = color;
        this._phrase = phrase;
        this._options = options;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get color() {
        return this._color;
    }
    get phrase() {
        return this._phrase;
    }
    get options() {
        return this._options;
    }
    saveToLocalstorage(robotModels) {
        return localStorage.setItem("robots", JSON.stringify(robotModels));
    }
    ;
}
;
class ChatManager {
    constructor(name, color, message, date) {
        this._name = name;
        this._color = color;
        this._message = message;
        this._date = date;
    }
    get name() {
        return this._name;
    }
    get color() {
        return this._color;
    }
    get message() {
        return this._message;
    }
    get date() {
        return this._date;
    }
    saveToLocalstorage(robotChats) {
        return localStorage.setItem("robotChats", JSON.stringify(robotChats));
    }
}
var RobotType;
(function (RobotType) {
    RobotType["male"] = "male";
    RobotType["female"] = "female";
})(RobotType || (RobotType = {}));
;
const robotModels = [];
const robotChats = [];
const deleteRobotsBtn = document.querySelector(".deleteRobots");
window.onload = () => {
    if (localStorage.getItem("robots")) {
        deleteRobotsBtn.disabled = false;
        deleteRobotsBtn.textContent = "Delete Robots";
        const robotsFromStorage = localStorage.getItem("robots");
        const parsed = JSON.parse(robotsFromStorage);
        for (let i = 0; i < parsed.length; i++) {
            const localStorageRobot = new Robot(parsed[i]._id, parsed[i]._name, parsed[i]._type, parsed[i]._color, parsed[i]._phrase, parsed[i]._options);
            robotModels.push(localStorageRobot);
            createRobot(localStorageRobot);
        }
        carouselButtonsSlide();
        if (localStorage.getItem("robotChats")) {
            const chatsFromStorage = localStorage.getItem("robotChats");
            localStorage.removeItem("robotChats");
            const parsed = JSON.parse(chatsFromStorage);
            for (let i = 0; i < parsed.length; i++) {
                const messageFromStorage = new ChatManager(parsed[i]._name, parsed[i]._color, parsed[i]._message, parsed[i]._date);
                const dateNow = new Date();
                const chatDate = new Date(messageFromStorage.date);
                if (chatDate.getTime() + 1000 * 60 * 300 > dateNow.getTime()) {
                    messageToBoard(messageFromStorage);
                    robotChats.push(messageFromStorage);
                    messageFromStorage.saveToLocalstorage(robotChats);
                }
                ;
            }
            ;
        }
        ;
    }
    ;
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
    const createdRobot = new Robot(`${robotModels.length + 1}`, name.value, robotType, color.value, phrase.value, options);
    robotModels.push(createdRobot);
    createdRobot.saveToLocalstorage(robotModels);
    createRobot(createdRobot);
    phrase.value = "";
    clearErrorMessages();
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
const createRobot = (createdRobot) => {
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
    if (createdRobot.type === RobotType.male) {
        torso.classList.add("torso-male");
        leftHand.classList.add("leftHand-male");
        rightHand.classList.add("rightHand-male");
        const torsoMale = slide1.querySelector(".torso-male");
        torsoMale.style.borderTop = `100px solid ${createdRobot.color}`;
        ribon.textContent = "Male Robot";
    }
    else {
        torso.classList.add("torso-female");
        leftHand.classList.add("leftHand-female");
        rightHand.classList.add("rightHand-female");
        const torsoFemale = slide1.querySelector(".torso-female");
        torsoFemale.style.borderBottom = `100px solid ${createdRobot.color}`;
        ribon.textContent = "Female Robot";
    }
    ;
    if (createdRobot.options.includes("can jump")) {
        robotFriend.classList.add("wholeRobotJump");
        leftLeg.classList.add("legsJump");
        rightLeg.classList.add("legsJump");
    }
    ;
    if (createdRobot.phrase) {
        const robotContainer = slide1.querySelector("#robotContainer");
        const talkingBubble = document.createElement("div");
        talkingBubble.classList.add("bubble", "bubble-bottom-left");
        const spanBubble = document.createElement("span");
        spanBubble.classList.add("spanBubble");
        spanBubble.textContent = createdRobot.phrase;
        talkingBubble.appendChild(spanBubble);
        robotContainer.appendChild(talkingBubble);
        mouth.classList.add("talk");
    }
    ;
    if (createdRobot.options.includes("can blink")) {
        eye.classList.add("blink");
    }
    ;
    robotNameContainer.textContent = createdRobot.name;
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
    robotChats.length = 0;
    localStorage.removeItem("robots");
    localStorage.removeItem("robotChats");
    removeDivChild(carousel);
    removeDivChild(afterForm);
    const ct = document.querySelector(".ct");
    ct.style.border = "none";
    slideMove = 0;
    const slideButtons = document.querySelector(".slide-buttons");
    slideButtons.style.display = "none";
    deleteRobotsBtn.disabled = true;
    deleteRobotsBtn.textContent = "No Robots To Delete";
    showRobotsBtn.value = "false";
};
function removeDivChild(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    ;
}
;
//# sourceMappingURL=robotFormAndCreation.js.map