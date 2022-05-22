"use strict";
const buildSection = () => {
    const section = document.createElement("section");
    section.classList.add("factory-section");
    const basicRobot = document.createElement("div");
    basicRobot.setAttribute("id", "basicRobot");
    const h3 = document.createElement("h3");
    h3.textContent = "Basic Robot";
    basicRobot.appendChild(h3);
    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add("content-wrapper");
    const contentWraperMessages = document.createElement("div");
    contentWraperMessages.style.width = "55%";
    contentWrapper.style.maxHeight = "438.5px";
    contentWraperMessages.style.marginRight = "2%";
    const messagesForm = document.createElement("form");
    messagesForm.id = `${robotModels.length}`;
    messagesForm.className = "messagesForm";
    messagesForm.style.display = "flex";
    messagesForm.style.flexDirection = "column";
    messagesForm.style.justifyContent = "center";
    messagesForm.style.alignItems = "center";
    messagesForm.style.width = "100%";
    messagesForm.style.height = "45%";
    messagesForm.onsubmit = robotMessages;
    const inputDiv = document.createElement("div");
    inputDiv.style.display = "flex";
    inputDiv.style.width = "100%";
    inputDiv.style.marginTop = "5%";
    const input = document.createElement("input");
    input.style.width = "100%";
    const messageBtn = document.createElement("button");
    messageBtn.className = "messageButton";
    messageBtn.textContent = "Send";
    messageBtn.style.alignSelf = "end";
    messageBtn.style.marginTop = "1%";
    messageBtn.style.padding = "0 4%";
    messageBtn.type = "submit";
    inputDiv.append("Send message:");
    inputDiv.appendChild(input);
    messagesForm.appendChild(inputDiv);
    messagesForm.appendChild(messageBtn);
    const messageBoard = document.createElement("div");
    messageBoard.style.width = "100%";
    messageBoard.style.maxHeight = "50%";
    messageBoard.style.overflowX = "hidden";
    messageBoard.className = "messageBoard";
    const lastMessagesDiv = document.createElement("div");
    const hrLastMessages = document.createElement("hr");
    hrLastMessages.className = "hrLastMessages";
    lastMessagesDiv.appendChild(hrLastMessages);
    contentWraperMessages.appendChild(messagesForm);
    contentWraperMessages.appendChild(lastMessagesDiv);
    contentWraperMessages.appendChild(messageBoard);
    const robotContainer = document.createElement("div");
    robotContainer.setAttribute("id", "robotContainer");
    const robotAndNameSection = document.createElement("div");
    robotAndNameSection.className = "robotAndNameSection";
    const robotFriend = document.createElement("div");
    robotFriend.classList.add("robotFriend");
    const head = document.createElement("div");
    head.setAttribute("id", "head");
    const eyes = document.createElement("div");
    eyes.setAttribute("id", "eyes");
    const eyeLeft = document.createElement("div");
    eyeLeft.classList.add("eye");
    const eyeRight = document.createElement("div");
    eyeRight.classList.add("eye");
    const mouth = document.createElement("div");
    mouth.classList.add("mouth");
    eyes.appendChild(eyeLeft);
    eyes.appendChild(eyeRight);
    head.appendChild(eyes);
    head.appendChild(mouth);
    const body = document.createElement("div");
    body.setAttribute("id", "body");
    const leftHand = document.createElement("div");
    leftHand.classList.add("hand", "leftHand");
    const torso = document.createElement("div");
    torso.classList.add("torso");
    const rightHand = document.createElement("div");
    rightHand.classList.add("hand", "rightHand");
    const leftLeg = document.createElement("div");
    leftLeg.classList.add("leg", "leftLeg");
    const rightLeg = document.createElement("div");
    rightLeg.classList.add("leg", "rightLeg");
    body.appendChild(leftHand);
    body.appendChild(torso);
    body.appendChild(rightHand);
    body.appendChild(leftLeg);
    body.appendChild(rightLeg);
    const robotNameContainer = document.createElement("div");
    robotNameContainer.classList.add("robotNameContainer");
    robotFriend.appendChild(head);
    robotFriend.appendChild(body);
    robotContainer.appendChild(robotFriend);
    robotContainer.appendChild(robotNameContainer);
    robotAndNameSection.appendChild(basicRobot);
    robotAndNameSection.appendChild(robotContainer);
    contentWrapper.appendChild(robotAndNameSection);
    contentWrapper.appendChild(contentWraperMessages);
    section.appendChild(contentWrapper);
    const ct = document.querySelector(".ct");
    ct.style.border = "3px solid #006cbe";
    return section;
};
//# sourceMappingURL=robotFactorySection.js.map