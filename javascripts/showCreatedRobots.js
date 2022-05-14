const afterForm = document.querySelector("#after-form");
const showRobotsBtn = document.querySelector(".showCreatedRobots");

// Inputs
showRobotsBtn.onclick = function () {
    if (robotModels.length > 0 && afterForm.querySelector(".noRobotsYet")) {
        const noRobotsYet = afterForm.querySelector(".noRobotsYet");
        afterForm.removeChild(noRobotsYet);
    } else if (robotModels.length === 0) {
        if (!afterForm.querySelector(".noRobotsYet")) {
            const noRobotsYet = document.createElement("h3");
            noRobotsYet.className = "noRobotsYet";
            noRobotsYet.textContent = "No robots created yet";
            afterForm.appendChild(noRobotsYet);
        }
        return
    };
    // If we don't have table -> create
    if (showRobotsBtn.value === "false") {
        createRobotTable();
    };

    addRobotsToTable(robotModels);
    const name = form.querySelector("#robotName");
    const type = form.querySelector("#selectType");

    if ((name.value || type.value) && afterForm.children.length > 0) {
        let robotsToShow = []
        for (let i = 0; i < robotModels.length; i++) {
            if ((name.value === robotModels[i].name || !name.value) && (type.value === robotModels[i].type || !type.value)) {
                robotsToShow.push(robotModels[i]);
            };
        };
        addRobotsToTable(robotsToShow);
        form.reset();
    };
};

const showRobotFromATag = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    const carousel = document.querySelector(".carousel");
    const curWidth = carousel.offsetWidth;
    const widthToMove = curWidth * slideMove;
    console.log(widthToMove);
}

const addRobotsToTable = (robotsToShow) => {
    // Upon search remove old table
    const table = document.querySelector("table");
    if (table.querySelector(".tBody")) {
    const tBody = table.querySelector(".tBody");
    table.removeChild(tBody);
    };
    // If n of robots changes
    const h4RobotCount = afterForm.querySelector(".h4RobotCount");
    if (robotsToShow.length < 2) {
        h4RobotCount.textContent = `${robotsToShow.length} robot found`;
    } else {
         h4RobotCount.textContent = `${robotsToShow.length} robots found`;
    };
    const tBody = document.createElement("tbody");
    tBody.className = "tBody";
    for (let i = 0; i < robotsToShow.length; i++) {
        const trBody = document.createElement("tr");

        const aName = document.createElement("a");
        aName.href = "javascript:showRobotFromATag()";

        const tdName = document.createElement("td");
        const tdType = document.createElement("td");
        const tdColor = document.createElement("td");
        const divColor = document.createElement("div");
        const tdOptions = document.createElement("td");

        aName.textContent = `${robotsToShow[i].name}`;
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
    };
};
 
const createRobotTable = () => {
    const h4RobotCount = document.createElement("h4");
    h4RobotCount.className = "h4RobotCount";
    if (robotModels.length < 2) {
        h4RobotCount.textContent = `${robotModels.length} robot found`;
    } else {
        h4RobotCount.textContent = `${robotModels.length} robots found`;
        }
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
    };
};