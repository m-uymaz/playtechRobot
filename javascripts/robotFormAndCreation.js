//Robot Storage
const robotModels = [];
let numOfSections = 0;

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
    };
};

//Form submission and validation
function formSubmit(event) {
    const talkCheckbox = form.querySelector("input[name='canTalk']");

    const name = form.querySelector("#robotName");
    const type = form.querySelector("#selectType");
    const color = form.querySelector("#selectColor");

    const phrase = form.querySelector("input[name='phrase']");
    clearErrorMessages();
    event.preventDefault();
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
        };
        return false;
    }
    if (phrase.disabled) {
        robotModels.push({
            name: name.value,
            type: type.value,
            color: color.value,
        });
        createRobot(name, type, color, phrase);
    } else {
        robotModels.push({
            name: name.value,
            type: type.value,
            color: color.value,
            phrase: phrase.value,
        });
        createRobot(name, type, color, phrase);
        phrase.value = "";
    };
    clearErrorMessages();
    console.log(robotModels);
    form.reset();
    phrase.disabled = !talkCheckbox.checked;
};

//Shows the error
const showError = (input, errorMessage, spanError) => {
    if (input.value === "") {
        spanError.textContent = errorMessage;
    };
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
    const slide2 = body.querySelector("#slide-2");

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
    } else {
        torso.classList.add("torso-female");
        leftHand.classList.add("leftHand-female");
        rightHand.classList.add("rightHand-female");
        const torsoFemale = slide1.querySelector(".torso-female");
        torsoFemale.style.borderBottom = `100px solid ${color.value}`;
        ribon.textContent = "Female Robot";
    };

    // Adding animations depending on checked checkbox
    if (jumpCheckbox.checked) {
        robotFriend.classList.add("wholeRobotJump");
        leftLeg.classList.add("legsJump");
        rightLeg.classList.add("legsJump");
    };
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
    };
    if (blinkCheckbox.checked) {
        eye.classList.add("blink");
    };
    robotNameContainer.textContent = name.value;
    const carouselContainer = body.querySelector(".ct");
    carouselContainer.classList.add("carousel-container");
    const slideButtons = body.querySelector(".slide-buttons");
    slideButtons.style.display = "flex";
    const carousel = body.querySelector(".carousel");
    carousel.prepend(slide1);
    carousel.style.transform = `translateX(0px)`;

    // NEEDED FOR CAROUSEL TO WORK!!!
    slideMove = 0;
    sectionCount++
    if (sectionCount === 1) {
    nextBtn.disabled = true;
    prevBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
        prevBtn.disabled = true;
    }
};

//selectors
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
let sectionCount = 0;
let slideMove = 0;

// event listeners
nextBtn.onclick = function () {
    const carousel = document.querySelector(".carousel");
    const sectionsCount = carousel.children.length;
    console.log(sectionsCount);
    slideMove++
    if (slideMove - 1 >= 0) {
        prevBtn.disabled = false;
    };
    if (slideMove >= sectionsCount - 1) {
        nextBtn.disabled = true;
    };
    console.log(slideMove);
    const curWidth = carousel.offsetWidth;
    const widthToMove = curWidth * slideMove;
    carousel.style.transform = `translateX(-${widthToMove}px)`;
};

prevBtn.onclick = function () {
    slideMove--;
    if (slideMove <= 0) {
        nextBtn.disabled = false;
        prevBtn.disabled = true;
    };
    console.log(slideMove);
    const carousel = document.querySelector(".carousel");
    const curWidth = carousel.offsetWidth;
    const widthToMove = curWidth * slideMove;
    console.log(widthToMove);
    carousel.style.transform = `translateX(-${widthToMove}px)`;
};