const afterForm = document.querySelector<HTMLDivElement>("#after-form") as HTMLDivElement;
const showRobotsBtn = document.querySelector<HTMLButtonElement>(".showCreatedRobots") as HTMLButtonElement;

showRobotsBtn.onclick = (): void => {
    if (robotModels.length > 0 && afterForm.querySelector(".noRobotsYet")) {
        const noRobotsYet = afterForm.querySelector<HTMLHeadElement>(".noRobotsYet") as HTMLHeadElement;
        afterForm.removeChild(noRobotsYet);
    } else if (robotModels.length === 0) {
        if (!afterForm.querySelector(".noRobotsYet")) {
            const noRobotsYet: HTMLHeadElement = document.createElement("h3") as HTMLHeadElement;
            noRobotsYet.className = "noRobotsYet";
            noRobotsYet.textContent = "No robots created yet";
            afterForm.style.justifyContent = "center";
            afterForm.appendChild(noRobotsYet);
        }
        return
    };
    // If we don't have table -> create
    if (showRobotsBtn.value === "false") {
        createRobotTable();
    };

    addRobotsToTable(robotModels);
    const name = form.querySelector<HTMLInputElement>("#robotName") as HTMLInputElement;
    const type = form.querySelector<HTMLInputElement>("#selectType") as HTMLInputElement;

    if ((name.value || type.value) && afterForm.children.length > 0) {
        let robotsToShow: Robot[] = [];
        for (let i = 0; i < robotModels.length; i++) {
            if ((name.value === robotModels[i].name || !name.value) && (type.value === robotModels[i].type || !type.value)) {
                robotsToShow.push(robotModels[i]);
            };
        };
        addRobotsToTable(robotsToShow);
        form.reset();
    };
};

const showRobotFromATag = (event: Event): void => {
    const name: string = (event.target as HTMLInputElement).value;
    const carousel = document.querySelector<HTMLDivElement>(".carousel") as HTMLDivElement;
    const curWidth: number = carousel.offsetWidth;
    const widthToMove: number = curWidth * slideMove;
    console.log(event.target);
};

const addRobotsToTable = (robotsToShow: Robot[]): void => {
    // Upon search remove old table
    const table = document.querySelector<HTMLTableElement>("table") as HTMLTableElement;
    if (table.querySelector(".tBody")) {
    const tBody = table.querySelector<HTMLTableSectionElement>(".tBody") as HTMLTableSectionElement;
    table.removeChild(tBody);
    };
    // If n of robots changes
    const h4RobotCount = afterForm.querySelector<HTMLDivElement>(".h4RobotCount") as HTMLDivElement;
    if (robotsToShow.length < 2) {
        h4RobotCount.textContent = `${robotsToShow.length} robot found`;

    } else {
        h4RobotCount.textContent = `${robotsToShow.length} robots found`;
    };
    const tBody: HTMLTableSectionElement = document.createElement("tbody");
    tBody.className = "tBody";
    for (let i = 0; i < robotsToShow.length; i++) {
        const trBody = document.createElement("tr");

        const aName: HTMLAnchorElement = document.createElement("a");

        const tdName: HTMLTableCellElement = document.createElement("td");
        const tdType: HTMLTableCellElement = document.createElement("td");
        const tdColor: HTMLTableCellElement = document.createElement("td");
        const divColor: HTMLDivElement = document.createElement("div");
        const tdOptions: HTMLTableCellElement = document.createElement("td");

        aName.textContent = `${robotsToShow[i].name}`;
        aName.href = "#";
        aName.onclick = showRobotFromATag;
        tdName.appendChild(aName);

        tdType.textContent = `${robotsToShow[i].type}`;

        divColor.style.backgroundColor = `${robotsToShow[i].color}`;
        divColor.style.width = "50%";
        divColor.style.height = "20px";
        divColor.style.margin = "auto";
        divColor.style.border = "1px solid black";
        tdColor.appendChild(divColor);

        const options: string = robotsToShow[i].options.join(", ");
        tdOptions.textContent = `${options}`;

        trBody.appendChild(tdName);
        trBody.appendChild(tdType);
        trBody.appendChild(tdColor);
        trBody.appendChild(tdOptions);

        tBody.appendChild(trBody);
        table.appendChild(tBody);
    };
};

// Table showing the robots
const createRobotTable = (): void => {
    const h4RobotCount: HTMLHeadElement = document.createElement("h4");
    h4RobotCount.className = "h4RobotCount";
    if (robotModels.length < 2) {
        h4RobotCount.textContent = `${robotModels.length} robot found`;
    } else {
        h4RobotCount.textContent = `${robotModels.length} robots found`;
    };
    h4RobotCount.style.margin = "1% 0";

    const table: HTMLTableElement = document.createElement("table");
    const thead: HTMLTableSectionElement = document.createElement("thead");
    const trHead: HTMLTableRowElement = document.createElement("tr");

    const thName: HTMLTableCellElement = document.createElement("th");
    thName.textContent = "Name";
    const thType: HTMLTableCellElement = document.createElement("th");
    thType.textContent = "Type";
    const thColor: HTMLTableCellElement = document.createElement("th");
    thColor.textContent = "Color";
    const thOptions: HTMLTableCellElement = document.createElement("th");
    thOptions.textContent = "Options";
    thOptions.style.width = "40%";

    trHead.appendChild(thName);
    trHead.appendChild(thType);
    trHead.appendChild(thColor);
    trHead.appendChild(thOptions);

    thead.appendChild(trHead);
    table.appendChild(thead);

    afterForm.appendChild(h4RobotCount);
    afterForm.appendChild(table);
    afterForm.style.justifyContent = "flex-start";

    showRobotsBtn.value = "true";
};

const removeNoRobotsYet = (): void => {
    if (afterForm.querySelector(".noRobotsYet")) {
        const noRobotsYet = afterForm.querySelector<HTMLDivElement>(".noRobotsYet") as HTMLDivElement;
        afterForm.removeChild(noRobotsYet);
        afterForm.style.justifyContent = "flex-start";
    };
};

// Messaging and messageboard
const robotMessageFromForm = (event: Event): void => {
    //Message from FORM
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    const messageFromInput = target.querySelector<HTMLInputElement>("input") as HTMLInputElement;
    const date: Date = new Date();
    let messageValue: string;

    //message to chat history
    const robotSendingMessage: Robot[] = robotModels.filter(x => x.id === target.id);
    if (!messageFromInput.value || messageFromInput.value.trim() === "") {
        messageValue = "...";
    } else {
        messageValue = messageFromInput.value;
    };
    const message: ChatManager = new ChatManager(
        robotSendingMessage[0].name,
        robotSendingMessage[0].color,
        messageValue,
        date
    );
    robotChats.push(message);
    message.saveToLocalstorage(robotChats);
    messageToBoard(message);

    playAudio();
    target.reset();
};

const messageToBoard = (message: ChatManager): void => {
    const allRobotsMessageBoards : NodeListOf<Element> = document.querySelectorAll(".messageBoard");
    allRobotsMessageBoards.forEach(messageBoard => {
        const messageConatainer: HTMLDivElement = document.createElement("div");
        const messageparagraph: HTMLParagraphElement = document.createElement("p");
        messageparagraph.style.marginTop = "0";
        messageparagraph.style.display = "block";
        messageparagraph.textContent = message.message;

        const nameSpan: HTMLSpanElement = document.createElement("span");
        nameSpan.textContent = message.name;
        nameSpan.style.color = message.color;

        const timeSpan: HTMLSpanElement = document.createElement("span");
        timeSpan.textContent = new Date(message.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSpan.style.fontWeight = "bold";

        const label: HTMLLabelElement = document.createElement("label");
        label.appendChild(nameSpan);
        label.append(" ");
        label.appendChild(timeSpan);

        messageConatainer.appendChild(label);
        messageConatainer.appendChild(messageparagraph);

        messageBoard.appendChild(messageConatainer);
    });
    allRobotsMessageBoards.forEach(messageBoard => {
        messageBoard.scrollTop = messageBoard.scrollHeight;
    });
};

const sortMessages = (): void => {
    const messageBoard = document.querySelector<HTMLDivElement>(".messageBoard") as HTMLDivElement;
    removeDivChild(messageBoard);
    robotChats.reverse();
    for (let i = 0; i < robotChats.length; i++) {
        messageToBoard(robotChats[i]);
    };
    localStorage.removeItem("robotChats");
    localStorage.setItem("robotChats", JSON.stringify(robotChats));
};

function playAudio(): void {
    const audio = document.querySelector<HTMLAudioElement>("#audio") as HTMLAudioElement;
    audio.play();
};