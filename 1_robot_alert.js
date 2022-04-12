// const phrases = [
//     'Hello, my name is Roboty. Nice to meet you!',
//     'Error! Malfunction detected! KILL! ALL! HUMANS!',
//     'An antivirus scan a day keeps the viruses and malware away!',
//     'Phrase could not be loaded. Please, try again later.',
//     'Bip! Bop-Bop-Bip! Bop-Bip-Bop!'
// ];

// function showRandomPhrase() {
//     const random = Math.floor(Math.random() * phrases.length);
//     return alert(`Roboty says: ${phrases[random]}`);
// }

// setTimeout(() => { showRandomPhrase() }, 3000);

//Другия вариант е с onload.
//Избрах този вариант, защото така всички анимации минават и устата на роботчето се движи поне веднъж :)


const phrases = [
    'Hello, my name is Roboty. Nice to meet you!',
    'Error! Malfunction detected! KILL! ALL! HUMANS!',
    'An antivirus scan a day keeps the viruses and malware away!',
    'Phrase could not be loaded. Please, try again later.',
    'Bip! Bop-Bop-Bip! Bop-Bip-Bop!'
];

const random = Math.floor(Math.random() * phrases.length);


setTimeout(() => { alert(phrases[random]) }, 3000);