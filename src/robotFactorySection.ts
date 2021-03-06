const buildSection = (): HTMLElement => {
    const section: HTMLElement = document.createElement("section");
    section.classList.add("factory-section");
    const basicRobot: HTMLDivElement = document.createElement("div");
    basicRobot.setAttribute("id", "basicRobot");
    const h3: HTMLHeadElement = document.createElement("h3");
    h3.textContent = "Basic Robot";
    basicRobot.appendChild(h3);

    // Messageboard and form
    const contentWrapper: HTMLDivElement = document.createElement("div");
    contentWrapper.classList.add("content-wrapper");

    const contentWraperMessages: HTMLDivElement = document.createElement("div");
    contentWraperMessages.style.width = "55%";
    contentWrapper.style.maxHeight = "438.5px";
    contentWraperMessages.style.marginRight = "2%";

    const messagesForm: HTMLFormElement = document.createElement("form");
    messagesForm.id = `${ robotModels.length}`;
    messagesForm.className = "messagesForm";
    messagesForm.style.display = "flex";
    messagesForm.style.flexDirection = "column";
    messagesForm.style.justifyContent = "center";
    messagesForm.style.alignItems = "center";
    messagesForm.style.width = "100%";
    messagesForm.style.height = "45%";
    messagesForm.onsubmit = robotMessageFromForm;

    const inputDiv: HTMLDivElement = document.createElement("div");
    inputDiv.style.display = "flex";
    inputDiv.style.width = "100%";
    inputDiv.style.marginTop = "5%";

    const input: HTMLInputElement = document.createElement("input");
    input.style.width = "100%";

    const messageBtn: HTMLButtonElement = document.createElement("button");
    messageBtn.className = "messageButton";
    messageBtn.textContent = "Send";
    messageBtn.style.alignSelf = "end";
    messageBtn.style.marginTop = "1%";
    messageBtn.style.padding = "0 4%";
    messageBtn.type = "submit";

    const inputDivLabel: HTMLLabelElement = document.createElement("label");
    inputDivLabel.style.whiteSpace = "pre";
    inputDivLabel.textContent = "Send message: ";
    inputDiv.appendChild(inputDivLabel);
    inputDiv.appendChild(input);
    messagesForm.appendChild(inputDiv);
    messagesForm.appendChild(messageBtn);

    const messageBoard: HTMLDivElement = document.createElement("div");
    messageBoard.style.width = "100%";
    messageBoard.style.height = "42%";
    messageBoard.style.overflowX = "hidden";
    messageBoard.className = "messageBoard";

    const messageBtnDiv: HTMLDivElement = document.createElement("div");
    messageBtnDiv.style.display = "flex";
    messageBtnDiv.style.justifyContent = "center";
    messageBtnDiv.style.marginTop = "1%";
    const sortMessagesBtn: HTMLButtonElement = document.createElement("button");
    sortMessagesBtn.textContent = "Sort Messages";
    sortMessagesBtn.className = "sortMessagesBtn";
    sortMessagesBtn.onclick = sortMessages;
    messageBtnDiv.appendChild(sortMessagesBtn);

    const lastMessagesDiv: HTMLDivElement = document.createElement("div");
    const hrLastMessages: HTMLHRElement = document.createElement("hr");
    hrLastMessages.className = "hrLastMessages";
    lastMessagesDiv.appendChild(hrLastMessages);

    contentWraperMessages.appendChild(messagesForm);
    contentWraperMessages.appendChild(lastMessagesDiv);
    contentWraperMessages.appendChild(messageBoard);
    contentWraperMessages.appendChild(messageBtnDiv);

    const robotContainer: HTMLDivElement = document.createElement("div");
    robotContainer.setAttribute("id", "robotContainer");
    const robotAndNameSection: HTMLDivElement = document.createElement("div");
    robotAndNameSection.className = "robotAndNameSection";
    const robotFriend: HTMLDivElement = document.createElement("div");
    robotFriend.classList.add("robotFriend");

    // ROBOT HEAD
    const head: HTMLDivElement = document.createElement("div");
    head.setAttribute("id", "head");
    const eyes: HTMLDivElement = document.createElement("div");
    eyes.setAttribute("id", "eyes");
    const eyeLeft: HTMLDivElement = document.createElement("div");
    eyeLeft.classList.add("eye");
    const eyeRight: HTMLDivElement = document.createElement("div");
    eyeRight.classList.add("eye");
    const mouth: HTMLDivElement = document.createElement("div");
    mouth.classList.add("mouth");

    eyes.appendChild(eyeLeft);
    eyes.appendChild(eyeRight);
    head.appendChild(eyes);
    head.appendChild(mouth);

    // ROBOT BODY AND NAME
    const body: HTMLDivElement = document.createElement("div");
    body.setAttribute("id", "body");
    const leftHand: HTMLDivElement = document.createElement("div");
    leftHand.classList.add("hand", "leftHand");
    const torso: HTMLDivElement = document.createElement("div");
    torso.classList.add("torso");
    const rightHand: HTMLDivElement = document.createElement("div");
    rightHand.classList.add("hand", "rightHand");
    const leftLeg: HTMLDivElement = document.createElement("div");
    leftLeg.classList.add("leg", "leftLeg");
    const rightLeg: HTMLDivElement = document.createElement("div");
    rightLeg.classList.add("leg", "rightLeg");

    body.appendChild(leftHand);
    body.appendChild(torso);
    body.appendChild(rightHand);
    body.appendChild(leftLeg);
    body.appendChild(rightLeg);

    const robotNameContainer: HTMLDivElement = document.createElement("div");
    robotNameContainer.classList.add("robotNameContainer");

    robotFriend.appendChild(head);
    robotFriend.appendChild(body);

    // // PARAGRAPHS
    // const paragraphs = document.createElement("div");
    // paragraphs.setAttribute("id", "paragraphs");

    // // P1
    // const p1Div = document.createElement("div");
    // p1Div.classList.add("paragraph", "p1", "tooltip");
    // const p1Span = document.createElement("span");
    // p1Span.classList.add("paragraphTooltip");
    // p1Span.textContent =
    //     "Paragraph text here. Text-align on left, 3% space from right border." +
    //     "Text is only 2 lines and ends with three dots... because it too long." +
    //     "On hover full text is shown as tooltip. First letter is bold.";
    // const p1 = document.createElement("p");
    // p1.classList.add("p", "pTransition1");
    // const p1SpanBold = document.createElement("span");
    // p1SpanBold.classList.add("bold");
    // p1SpanBold.textContent = "Paragraph ";
    // p1.textContent =
    //     "text here. Text-align on left, 3% space from right border." +
    //     "Text is only 2 lines and ends with three dots... because it too long." +
    //     "On hover full text is shown as tooltip. First letter is bold.";
    // p1.prepend(p1SpanBold);
    // p1Div.appendChild(p1Span);
    // p1Div.appendChild(p1);

    // // P2
    // const p2Div = document.createElement("div");
    // p2Div.classList.add("paragraph", "p2", "tooltip");

    // const p2Span = document.createElement("span");
    // p2Span.textContent =
    //     "Paragraph text here. Text justified, 6% space from right border." +
    //     "Text is only 2 lines and ends with three dots... because it too long." +
    //     "On hover full text is shown. First word is Italic.";
    // p2Span.classList.add("paragraphTooltip");
    // const p2 = document.createElement("p");
    // p2.classList.add("p", "pTransition2");
    // p2.textContent =
    //     "text here. Text justified, 6% space from right border." +
    //     "Text is only 2 lines and ends with three dots... because it too long." +
    //     "On hover full text is shown. First word is Italic.";
    // const p2SpanItalic = document.createElement("span");
    // p2SpanItalic.classList.add("italic");
    // p2SpanItalic.textContent = "Paragraph ";
    // p2.prepend(p2SpanItalic);

    // p2Div.appendChild(p2Span);
    // p2Div.appendChild(p2);

    // // P3
    // const p3Div = document.createElement("div");
    // p3Div.classList.add("paragraph", "p3");
    // const p3Img = document.createElement("img");
    // p3Img.setAttribute("src", "good_luck.jpg");
    // const p3 = document.createElement("p");
    // p3.classList.add("p", "pTransition3");
    // p3.textContent = "Paragraph text here. Text-align in left, 9% from right border. Image on left side.";

    // p3Div.appendChild(p3Img);
    // p3Div.appendChild(p3);

    // // Last appendments

    // paragraphs.appendChild(p1Div);
    // paragraphs.appendChild(p2Div);
    // paragraphs.appendChild(p3Div);

    robotContainer.appendChild(robotFriend);
    robotContainer.appendChild(robotNameContainer);

    robotAndNameSection.appendChild(basicRobot);
    robotAndNameSection.appendChild(robotContainer);
    contentWrapper.appendChild(robotAndNameSection);
    contentWrapper.appendChild(contentWraperMessages);

    section.appendChild(contentWrapper);

    const ct: HTMLDivElement = document.querySelector<HTMLDivElement>(".ct");
    ct.style.border = "3px solid #006cbe";

    return section;
}