"use strict";
const afterForm = document.querySelector("#after-form");
const showRobotsBtn = document.querySelector(".showCreatedRobots");
showRobotsBtn.onclick = function () {
    if (robotModels.length > 0 && afterForm.querySelector(".noRobotsYet")) {
        const noRobotsYet = afterForm.querySelector(".noRobotsYet");
        afterForm.removeChild(noRobotsYet);
    }
    else if (robotModels.length === 0) {
        if (!afterForm.querySelector(".noRobotsYet")) {
            const noRobotsYet = document.createElement("h3");
            noRobotsYet.className = "noRobotsYet";
            noRobotsYet.textContent = "No robots created yet";
            afterForm.appendChild(noRobotsYet);
        }
        return;
    }
    ;
    if (showRobotsBtn.value === "false") {
        createRobotTable();
    }
    ;
    addRobotsToTable(robotModels);
    const name = form.querySelector("#robotName");
    const type = form.querySelector("#selectType");
    if ((name.value || type.value) && afterForm.children.length > 0) {
        let robotsToShow = [];
        for (let i = 0; i < robotModels.length; i++) {
            if ((name.value === robotModels[i].name || !name.value) && (type.value === robotModels[i].type || !type.value)) {
                robotsToShow.push(robotModels[i]);
            }
            ;
        }
        ;
        addRobotsToTable(robotsToShow);
        form.reset();
    }
    ;
};
const showRobotFromATag = (event) => {
    const name = event.target.value;
    const carousel = document.querySelector(".carousel");
    const curWidth = carousel.offsetWidth;
    const widthToMove = curWidth * slideMove;
    console.log(event.target);
};
const addRobotsToTable = (robotsToShow) => {
    const table = document.querySelector("table");
    if (table.querySelector(".tBody")) {
        const tBody = table.querySelector(".tBody");
        table.removeChild(tBody);
    }
    ;
    const h4RobotCount = afterForm.querySelector(".h4RobotCount");
    if (robotsToShow.length < 2) {
        h4RobotCount.textContent = `${robotsToShow.length} robot found`;
    }
    else {
        h4RobotCount.textContent = `${robotsToShow.length} robots found`;
    }
    ;
    const tBody = document.createElement("tbody");
    tBody.className = "tBody";
    for (let i = 0; i < robotsToShow.length; i++) {
        const trBody = document.createElement("tr");
        const aName = document.createElement("a");
        const tdName = document.createElement("td");
        const tdType = document.createElement("td");
        const tdColor = document.createElement("td");
        const divColor = document.createElement("div");
        const tdOptions = document.createElement("td");
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
        const options = robotsToShow[i].options.join(", ");
        tdOptions.textContent = `${options}`;
        trBody.appendChild(tdName);
        trBody.appendChild(tdType);
        trBody.appendChild(tdColor);
        trBody.appendChild(tdOptions);
        tBody.appendChild(trBody);
        table.appendChild(tBody);
    }
    ;
};
const createRobotTable = () => {
    const h4RobotCount = document.createElement("h4");
    h4RobotCount.className = "h4RobotCount";
    if (robotModels.length < 2) {
        h4RobotCount.textContent = `${robotModels.length} robot found`;
    }
    else {
        h4RobotCount.textContent = `${robotModels.length} robots found`;
    }
    ;
    h4RobotCount.style.margin = "1% 0";
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    const thName = document.createElement("th");
    thName.textContent = "Name";
    const thType = document.createElement("th");
    thType.textContent = "Type";
    const thColor = document.createElement("th");
    thColor.textContent = "Color";
    const thOptions = document.createElement("th");
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
const removeNoRobotsYet = () => {
    if (afterForm.querySelector(".noRobotsYet")) {
        const noRobotsYet = afterForm.querySelector(".noRobotsYet");
        afterForm.removeChild(noRobotsYet);
        afterForm.style.justifyContent = "flex-start";
    }
    ;
};
const robotMessages = (event) => {
    event.preventDefault();
    const target = event.target;
    const allRobotsMessageBoards = document.querySelectorAll(".messageBoard");
    const messageFromInput = target.querySelector("input");
    const date = new Date();
    const robotSendingMessage = robotModels.filter(x => x.id === target.id);
    function addZero(i) {
        if (parseInt(i) < 10) {
            i = "0" + i;
        }
        return i;
    }
    ;
    const h = addZero(date.getHours().toString());
    const m = addZero(date.getMinutes().toString());
    const ampm = parseInt(h) >= 12 ? 'PM' : 'AM';
    const time = `${h}:${m} ${ampm}`;
    allRobotsMessageBoards.forEach(messageBoard => {
        const messageConatainer = document.createElement("div");
        const messageparagraph = document.createElement("p");
        messageparagraph.style.marginTop = "0";
        if (!messageFromInput.value || messageFromInput.value.trim() === "") {
            messageparagraph.textContent = "...";
        }
        else {
            messageparagraph.textContent = messageFromInput.value;
        }
        ;
        messageparagraph.style.display = "block";
        const nameSpan = document.createElement("span");
        nameSpan.textContent = robotSendingMessage[0].name;
        nameSpan.style.color = robotSendingMessage[0].color;
        const timeSpan = document.createElement("span");
        timeSpan.textContent = time;
        timeSpan.style.fontWeight = "bold";
        const label = document.createElement("label");
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
    target.reset();
    playAudio();
};
function playAudio() {
    const audio = document.querySelector("#audio");
    audio.play();
}
;
//# sourceMappingURL=showCreatedRobots.js.map