//Robot Storage
// interface Robot {
//     id: string,
//     name: string,
//     type: RobotType,
//     color: string,
//     phrase: string,
//     options: string[]
// };

class Robot {
    private _id: string;
    private _name: string;
    private _type: RobotType;
    private _color: string;
    private _phrase: string;
    private _options: string[];

    constructor(id: string, name: string, type: RobotType, color: string, phrase: string, options: string[]) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._color = color;
        this._phrase = phrase;
        this._options = options
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
    
    saveToLocalstorage(robotModels: Robot[]) {
        return localStorage.setItem("robots", JSON.stringify(robotModels));
    };
};

class ChatManager {
    private _name: string;
    private _color: string;
    private _message: string;
    private _date: Date;

    constructor(name: string, color: string, message: string, date: Date) {
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

    saveToLocalstorage(robotChats: ChatManager[]) {
        return localStorage.setItem("robotChats", JSON.stringify(robotChats));
    }
}

enum RobotType {
    male = "male",
    female = "female"
};

const robotModels: Robot[] = [];
const robotChats: ChatManager[] = [];

const deleteRobotsBtn: HTMLButtonElement = document.querySelector<HTMLButtonElement>(".deleteRobots");
window.onload = (): void => {
    if (localStorage.getItem("robots")) {
        deleteRobotsBtn.disabled = false;
        deleteRobotsBtn.textContent = "Delete Robots";
        const robotsFromStorage:any = localStorage.getItem("robots");
        const parsed: any = JSON.parse(robotsFromStorage);
        for (let i = 0; i < parsed.length; i++) {
            const localStorageRobot: Robot = new Robot(
                parsed[i]._id,
                parsed[i]._name,
                parsed[i]._type,
                parsed[i]._color,
                parsed[i]._phrase,
                parsed[i]._options,
            );
            robotModels.push(localStorageRobot);
            createRobot(localStorageRobot);
        }
        carouselButtonsSlide();
        if (localStorage.getItem("robotChats")) {
            const chatsFromStorage: any = localStorage.getItem("robotChats");
            localStorage.removeItem("robotChats");
            const parsed: any = JSON.parse(chatsFromStorage);
            for (let i = 0; i < parsed.length; i++) {
                const messageFromStorage: ChatManager = new ChatManager(
                parsed[i]._name,
                parsed[i]._color,
                parsed[i]._message,
                parsed[i]._date
                );
                const dateNow: Date = new Date();
                const chatDate: Date = new Date(messageFromStorage.date)
                if (chatDate.getTime() + 1000 * 60 * 300 > dateNow.getTime()) {
                    messageToBoard(messageFromStorage);
                    robotChats.push(messageFromStorage);
                    messageFromStorage.saveToLocalstorage(robotChats);
                };
            };
        };
    };
};

const form: HTMLFormElement = document.querySelector<HTMLFormElement>("#robot-form");
const phrase: HTMLButtonElement = form.querySelector<HTMLButtonElement>("input[name='phrase']");
form.addEventListener("submit", formSubmit);

//Checkbox for "Phrase" input
const onCheckboxChange = (): void => {
    const talkCheckbox: HTMLInputElement = form.querySelector<HTMLInputElement>("input[name='canTalk']");
    const phrase: HTMLInputElement = form.querySelector<HTMLInputElement>("input[name='phrase']");
    phrase.disabled = !talkCheckbox.checked;
    if (!talkCheckbox.checked) {
        phrase.value = "";
    };
};

//Form submission and validation
function formSubmit(event: Event): void {
    event.preventDefault();
    // Checking if robots can jump, talk, blink
    const jumpCheckbox: HTMLInputElement = form.querySelector<HTMLInputElement>("input[name='canJump']");
    const talkCheckbox: HTMLInputElement = form.querySelector<HTMLInputElement>("input[name='canTalk']");
    const blinkCheckbox: HTMLInputElement = form.querySelector<HTMLInputElement>("input[name='canBlink']");
    const options: string[] = [];
    let jump: string;
    let talk: string;
    let blink: string;

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

    const name: HTMLInputElement = form.querySelector<HTMLInputElement>("#robotName");
    const type: HTMLInputElement = form.querySelector<HTMLInputElement>("#selectType");
    const color: HTMLInputElement = form.querySelector<HTMLInputElement>("#selectColor");
    const phrase: HTMLInputElement = form.querySelector<HTMLInputElement>("input[name='phrase']");
    clearErrorMessages();
    if (!name.value || !type.value || !color.value || !phrase.disabled && phrase.value === "") {
        if (!name.value) {
            const spanErrorName: HTMLSpanElement = document.querySelector<HTMLSpanElement>(".errorName");
            const nameErrorMessage: string = "Please enter a name";
            showError(name, nameErrorMessage, spanErrorName);
        }
        if (!type.value) {
            const spanErrorType: HTMLSpanElement = document.querySelector<HTMLSpanElement>(".errorType");
            const typeErrorMessage: string = "Select a type";
            showError(type, typeErrorMessage, spanErrorType);
        }
        if (!color.value) {
            const spanErrorColor: HTMLSpanElement = document.querySelector<HTMLSpanElement>(".errorColor");
            const colorErrorMessage: string = "Chose a color";
            showError(color, colorErrorMessage, spanErrorColor);
        }
        if (!phrase.disabled && phrase.value === "") {
            const spanErrorPhrase: HTMLSpanElement = document.querySelector<HTMLSpanElement>(".errorPhrase");
            const phraseErrorMessage: string = "Please write a phrase";
            showError(phrase, phraseErrorMessage, spanErrorPhrase);
        };
        return;
    };
    const robotType: RobotType = (type.value === "male") ? RobotType.male : RobotType.female;
    const createdRobot: Robot = new Robot(
        `${robotModels.length + 1}`,
        name.value,
        robotType,
        color.value,
        phrase.value,
        options
    );
    robotModels.push(createdRobot);
    createdRobot.saveToLocalstorage(robotModels);
    createRobot(createdRobot);
    phrase.value = "";
    
    clearErrorMessages();
    form.reset();
    phrase.disabled = !talkCheckbox.checked;

    // Removing "No robots yet" upon creation
    removeNoRobotsYet();
};

//Shows the error
const showError = (input: HTMLInputElement, errorMessage: string, spanError: HTMLSpanElement): void => {
    if (input.value === "") {
        spanError.textContent = errorMessage;
    };
};

//Clears messages on a submit or a submit try after an error
const clearErrorMessages = (): void => {
    const allErrorSpans: NodeListOf<Element> = document.querySelectorAll<Element>(".error");
    allErrorSpans.forEach(el => el.textContent = "");
};

//Visual creation of Robots
const createRobot = (createdRobot: Robot): void => {
    const body: HTMLBodyElement = document.querySelector<HTMLBodyElement>("body");
    const slide1 = buildSection();
    const robotFriend: HTMLDivElement = slide1.querySelector<HTMLDivElement>(".robotFriend");

    //Robot body
    const eye: HTMLDivElement = slide1.querySelector<HTMLDivElement>("#eyes div:nth-of-type(2)");
    const torso: HTMLDivElement = slide1.querySelector<HTMLDivElement>(".torso");
    const mouth: HTMLDivElement = slide1.querySelector<HTMLDivElement>(".mouth");
    const leftHand: HTMLDivElement = slide1.querySelector<HTMLDivElement>(".leftHand");
    const rightHand: HTMLDivElement = slide1.querySelector<HTMLDivElement>(".rightHand");
    const leftLeg: HTMLDivElement = slide1.querySelector<HTMLDivElement>(".leftLeg");
    const rightLeg: HTMLDivElement = slide1.querySelector<HTMLDivElement>(".rightLeg");

    const robotNameContainer: HTMLDivElement = slide1.querySelector<HTMLDivElement>(".robotNameContainer");
    const ribon: HTMLHeadElement = slide1.querySelector<HTMLHeadElement>("#basicRobot > h3");

    if (createdRobot.type === RobotType.male) {
        torso.classList.add("torso-male");
        leftHand.classList.add("leftHand-male");
        rightHand.classList.add("rightHand-male");
        const torsoMale: HTMLDivElement = slide1.querySelector<HTMLDivElement>(".torso-male");
        torsoMale.style.borderTop = `100px solid ${createdRobot.color}`;
        ribon.textContent = "Male Robot";
    } else {
        torso.classList.add("torso-female");
        leftHand.classList.add("leftHand-female");
        rightHand.classList.add("rightHand-female");
        const torsoFemale: HTMLDivElement = slide1.querySelector<HTMLDivElement>(".torso-female");
        torsoFemale.style.borderBottom = `100px solid ${createdRobot.color}`;
        ribon.textContent = "Female Robot";
    };

    // Adding animations depending on checked checkbox
    if (createdRobot.options.includes("can jump")) {
        robotFriend.classList.add("wholeRobotJump");
        leftLeg.classList.add("legsJump");
        rightLeg.classList.add("legsJump");
    };
    if (createdRobot.phrase) {
        const robotContainer: HTMLDivElement = slide1.querySelector<HTMLDivElement>("#robotContainer");
        const talkingBubble: HTMLDivElement = document.createElement("div");
        talkingBubble.classList.add("bubble", "bubble-bottom-left");
        
        const spanBubble: HTMLSpanElement = document.createElement("span");
        spanBubble.classList.add("spanBubble");
        spanBubble.textContent = createdRobot.phrase;
        talkingBubble.appendChild(spanBubble);
        robotContainer.appendChild(talkingBubble);
        mouth.classList.add("talk");
    };
    if (createdRobot.options.includes("can blink")) {
        eye.classList.add("blink");
    };
    robotNameContainer.textContent = createdRobot.name;
    const carouselContainer: HTMLDivElement = body.querySelector<HTMLDivElement>(".ct");
    carouselContainer.classList.add("carousel-container");
    const slideButtons: HTMLDivElement = body.querySelector<HTMLDivElement>(".slide-buttons");
    slideButtons.style.display = "flex";
    const carousel: HTMLDivElement = body.querySelector<HTMLDivElement>(".carousel");
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
const carousel: HTMLDivElement = document.querySelector<HTMLDivElement>(".carousel");
const nextBtn: HTMLButtonElement = document.querySelector<HTMLButtonElement>("#next");
const prevBtn: HTMLButtonElement = document.querySelector<HTMLButtonElement>("#prev");
let slideMove: number = 0;

const carouselButtonsSlide = (): void => {
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
nextBtn.onclick = (): void => {
    const sectionsCount: number = carousel.children.length;
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
    const curWidth: number = carousel.offsetWidth;
    const widthToMove: number = curWidth * slideMove;
    carousel.style.transform = `translateX(-${widthToMove}px)`;
};

prevBtn.onclick = (): void => {
    slideMove--;
    if (slideMove <= 0) {
        nextBtn.disabled = false;
        prevBtn.disabled = true;
    };
    const curWidth: number = carousel.offsetWidth;
    const widthToMove: number = curWidth * slideMove;
    carousel.style.transform = `translateX(-${widthToMove}px)`;
};

deleteRobotsBtn.onclick = (): void => {
    robotModels.length = 0;
    robotChats.length = 0;
    localStorage.removeItem("robots");
    localStorage.removeItem("robotChats");
    removeDivChild(carousel);
    removeDivChild(afterForm);
    const ct: HTMLDivElement = document.querySelector<HTMLDivElement>(".ct");
    ct.style.border = "none";
    slideMove = 0;
    const slideButtons: HTMLDivElement = document.querySelector<HTMLDivElement>(".slide-buttons");
    slideButtons.style.display = "none";
    deleteRobotsBtn.disabled = true;
    deleteRobotsBtn.textContent = "No Robots To Delete";
    showRobotsBtn.value = "false";
};

function removeDivChild(div: Element): void {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    };
};