//Robot Storage
interface Robot {
    id: string,
    name: string,
    type: RobotType,
    color: string,
    phrase: string,
    options: string[]
};

enum RobotType {
    male = "male",
    female = "female"
};

const robotModels: Robot[] = [];

const deleteRobotsBtn = document.querySelector(".deleteRobots") as HTMLButtonElement;
window.onload = () => {
    if (localStorage.getItem("robots")) {
        deleteRobotsBtn.disabled = false;
        deleteRobotsBtn.textContent = "Delete Robots";
        const robotsFromStorage:any = localStorage.getItem("robots");
        const parsed = JSON.parse(robotsFromStorage);
        robotModels.push(...parsed);
        for (let i = 0; i < robotModels.length; i++) {
            createRobot(robotModels[i]);
        };
        carouselButtonsSlide();
    };
    console.log(robotModels);
};

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
    const robotType = (type.value === "male") ? RobotType.male : RobotType.female;
    const createdRobot: Robot = {
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
const createRobot = (robotModels: Robot) => {
    const body = document.querySelector("body") as HTMLBodyElement;
    const slide1 = buildSection();
    const robotFriend = slide1.querySelector(".robotFriend") as HTMLDivElement;

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

    if (robotModels.type === RobotType.male) {
        torso.classList.add("torso-male");
        leftHand.classList.add("leftHand-male");
        rightHand.classList.add("rightHand-male");
        const torsoMale = slide1.querySelector(".torso-male") as HTMLDivElement;
        torsoMale.style.borderTop = `100px solid ${robotModels.color}`;
        ribon.textContent = "Male Robot";
    } else {
        torso.classList.add("torso-female");
        leftHand.classList.add("leftHand-female");
        rightHand.classList.add("rightHand-female");
        const torsoFemale = slide1.querySelector(".torso-female") as HTMLDivElement;
        torsoFemale.style.borderBottom = `100px solid ${robotModels.color}`;
        ribon.textContent = "Female Robot";
    };

    // Adding animations depending on checked checkbox
    if (robotModels.options.includes("can jump")) {
        robotFriend.classList.add("wholeRobotJump");
        leftLeg.classList.add("legsJump");
        rightLeg.classList.add("legsJump");
    };
    if (robotModels.phrase) {
        const robotContainer = slide1.querySelector("#robotContainer") as HTMLDivElement;
        const talkingBubble = document.createElement("div");
        talkingBubble.classList.add("bubble", "bubble-bottom-left");
        
        const spanBubble = document.createElement("span");
        spanBubble.classList.add("spanBubble");
        spanBubble.textContent = robotModels.phrase;
        talkingBubble.appendChild(spanBubble);
        robotContainer.appendChild(talkingBubble);
        mouth.classList.add("talk");
    };
    if (robotModels.options.includes("can blink")) {
        eye.classList.add("blink");
    };
    robotNameContainer.textContent = robotModels.name;
    const carouselContainer = body.querySelector(".ct") as HTMLDivElement;
    carouselContainer.classList.add("carousel-container");
    const slideButtons = body.querySelector(".slide-buttons") as HTMLDivElement;
    slideButtons.style.display = "flex";
    const carousel = body.querySelector(".carousel") as HTMLDivElement;
    carousel.prepend(slide1);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    carousel.style.transform = `translateX(0px)`;

    deleteRobotsBtn.disabled = false;
    deleteRobotsBtn.textContent = "Delete Robots";

    // CAROUSEL LOGIC STARTS FROM HERE 
    // NEEDED FOR CAROUSEL TO WORK!!!
    slideMove = 0;
    carouselButtonsSlide();
};
//selectors
const carousel = document.querySelector(".carousel") as HTMLDivElement;
const nextBtn = document.querySelector("#next") as HTMLButtonElement;
const prevBtn = document.querySelector("#prev") as HTMLButtonElement;
let slideMove = 0;

const carouselButtonsSlide = () => {
    if (robotModels.length === 1) {
        nextBtn.disabled = true;
        prevBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
        prevBtn.disabled = true;
    };
    return
};

// event listeners
nextBtn.onclick =  () => {
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

prevBtn.onclick = () => {
    slideMove--;
    if (slideMove <= 0) {
        nextBtn.disabled = false;
        prevBtn.disabled = true;
    };
    const curWidth = carousel.offsetWidth;
    const widthToMove = curWidth * slideMove;
    carousel.style.transform = `translateX(-${widthToMove}px)`;
};

deleteRobotsBtn.onclick = () => {
    robotModels.length = 0;
    localStorage.clear();
    removeCarouselChild(carousel);
    removeTable(afterForm);
    const ct = document.querySelector(".ct") as HTMLDivElement;
    ct.style.border = "none";
    slideMove = 0;
    const slideButtons = document.querySelector(".slide-buttons") as HTMLDivElement;
    slideButtons.style.display = "none";
    deleteRobotsBtn.disabled = true;
    deleteRobotsBtn.textContent = "No Robots To Delete";
    showRobotsBtn.value = "false";
};

function removeCarouselChild(carousel: HTMLDivElement) {
    while (carousel.firstChild) {
        carousel.removeChild(carousel.firstChild);
    };
};

function removeTable(tableContainer: HTMLDivElement) {
    while (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
    };
};