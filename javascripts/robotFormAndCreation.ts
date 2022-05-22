//Robot Storage
const robotModels: {
    id: string,
    name: string,
    type: string,
    color: string,
    phrase: string,
    options: string[]
}[] = [];
const form = document.querySelector("#robot-form") as HTMLFormElement;
const phrase = form.querySelector("input[name='phrase']") as HTMLButtonElement;
form.addEventListener("submit", formSubmit);

//Checkbox for "Phrase" input
const onCheckboxChange = () => {
    const talkCheckbox = form.querySelector("input[name='canTalk']") as HTMLInputElement;
    const phrase = form.querySelector("input[name='phrase']") as HTMLInputElement;
    phrase.disabled = !talkCheckbox.checked;
    if (!talkCheckbox.checked) {
        phrase.value = "";
    };
};

//Form submission and validation
function formSubmit(event: Event) {
    event.preventDefault();
    // Checking if robots can jump, talk, blink
    const jumpCheckbox = form.querySelector("input[name='canJump']") as HTMLInputElement;
    const talkCheckbox = form.querySelector("input[name='canTalk']") as HTMLInputElement;
    const blinkCheckbox = form.querySelector("input[name='canBlink']") as HTMLInputElement;
    const options: string[] = [];
    let jump;
    let talk;
    let blink;

    if (jumpCheckbox.checked) {
        jump = "can jump";
        options.push(jump);
    };
    if (talkCheckbox.checked) {
        talk = "can talk";
        options.push(talk);
    };
    if (blinkCheckbox.checked) {
        blink = "can blink";
        options.push(blink);
    };

    const name = form.querySelector("#robotName") as HTMLInputElement;
    const type = form.querySelector("#selectType") as HTMLInputElement;
    const color = form.querySelector("#selectColor") as HTMLInputElement;

    const phrase = form.querySelector("input[name='phrase']") as HTMLInputElement;
    clearErrorMessages();
    if (!name.value || !type.value || !color.value || !phrase.disabled && phrase.value === "") {
        if (!name.value) {
            const spanErrorName = document.querySelector(".errorName") as HTMLSpanElement;
            const nameErrorMessage = "Please enter a name";
            showError(name, nameErrorMessage, spanErrorName);
        }
        if (!type.value) {
            const spanErrorType = document.querySelector(".errorType") as HTMLSpanElement;
            const typeErrorMessage = "Select a type";
            showError(type, typeErrorMessage, spanErrorType);
        }
        if (!color.value) {
            const spanErrorColor = document.querySelector(".errorColor") as HTMLSpanElement;
            const colorErrorMessage = "Chose a color";
            showError(color, colorErrorMessage, spanErrorColor);
        }
        if (!phrase.disabled && phrase.value === "") {
            const spanErrorPhrase = document.querySelector(".errorPhrase") as HTMLSpanElement;
            const phraseErrorMessage = "Please write a phrase";
            showError(phrase, phraseErrorMessage, spanErrorPhrase);
        };
        return;
    };
    robotModels.push({
        id: `${robotModels.length + 1}`,
        name: name.value,
        type: type.value,
        color: color.value,
        phrase: phrase.value,
        options
    });
    createRobot(name, type, color, phrase);
    phrase.value = "";
    
    clearErrorMessages();
    console.log(robotModels);
    form.reset();
    phrase.disabled = !talkCheckbox.checked;

    // Removing "No robots yet" upon creation
    removeNoRobotsYet();
};

//Shows the error
const showError = (input: HTMLInputElement, errorMessage: string, spanError: HTMLSpanElement) => {
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
const createRobot = (name: HTMLInputElement, type: HTMLInputElement, color: HTMLInputElement, phrase: HTMLInputElement) => {
    const body = document.querySelector("body") as HTMLBodyElement;
    const slide1 = buildSection();

    const robotFriend = slide1.querySelector(".robotFriend") as HTMLDivElement;

    //Checkboxes
    const jumpCheckbox = form.querySelector("input[name='canJump']") as HTMLInputElement;
    const talkCheckbox = form.querySelector("input[name='canTalk']") as HTMLInputElement;
    const blinkCheckbox = form.querySelector("input[name='canBlink']") as HTMLInputElement;

    //Robot body
    const eye = slide1.querySelector("#eyes div:nth-of-type(2)") as HTMLDivElement;
    const torso = slide1.querySelector(".torso") as HTMLDivElement;
    const mouth = slide1.querySelector(".mouth") as HTMLDivElement;
    const leftHand = slide1.querySelector(".leftHand") as HTMLDivElement;
    const rightHand = slide1.querySelector(".rightHand") as HTMLDivElement;
    const leftLeg = slide1.querySelector(".leftLeg") as HTMLDivElement;
    const rightLeg = slide1.querySelector(".rightLeg") as HTMLDivElement;

    const robotNameContainer = slide1.querySelector(".robotNameContainer") as HTMLDivElement;
    const ribon = slide1.querySelector("#basicRobot > h3") as HTMLHeadElement;

    if (type.value === "male") {
        torso.classList.add("torso-male");
        leftHand.classList.add("leftHand-male");
        rightHand.classList.add("rightHand-male");
        const torsoMale = slide1.querySelector(".torso-male") as HTMLDivElement;
        torsoMale.style.borderTop = `100px solid ${color.value}`;
        ribon.textContent = "Male Robot";
    } else {
        torso.classList.add("torso-female");
        leftHand.classList.add("leftHand-female");
        rightHand.classList.add("rightHand-female");
        const torsoFemale = slide1.querySelector(".torso-female") as HTMLDivElement;
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
        const robotContainer = slide1.querySelector("#robotContainer") as HTMLDivElement;
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
    const carouselContainer = body.querySelector(".ct") as HTMLDivElement;
    carouselContainer.classList.add("carousel-container");
    const slideButtons = body.querySelector(".slide-buttons") as HTMLDivElement;
    slideButtons.style.display = "flex";
    const carousel = body.querySelector(".carousel") as HTMLDivElement;
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
    } else {
        nextBtn.disabled = false;
        prevBtn.disabled = true;
    };
};

//selectors
const carousel = document.querySelector(".carousel") as HTMLDivElement;
const nextBtn = document.querySelector("#next") as HTMLButtonElement;
const prevBtn = document.querySelector("#prev") as HTMLButtonElement;
let slideMove = 0;

// event listeners
nextBtn.onclick = function () {
    const sectionsCount = carousel.children.length;
    slideMove++
    if (slideMove - 1 >= 0) {
        prevBtn.disabled = false;
    };
    if (slideMove >= sectionsCount) {
        carousel.style.transform = `translateX(0px)`;
        slideMove = 0;
        prevBtn.disabled = true;
        return
    };
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
    const curWidth = carousel.offsetWidth;
    const widthToMove = curWidth * slideMove;
    carousel.style.transform = `translateX(-${widthToMove}px)`;
};