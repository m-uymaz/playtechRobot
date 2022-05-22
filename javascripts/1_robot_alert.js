"use strict";
const phrases = [
    'Hello, my name is Roboty. Nice to meet you!',
    'Error! Malfunction detected! KILL! ALL! HUMANS!',
    'An antivirus scan a day keeps the viruses and malware away!',
    'Phrase could not be loaded. Please, try again later.',
    'Bip! Bop-Bop-Bip! Bop-Bip-Bop!'
];
const random = Math.floor(Math.random() * phrases.length);
setTimeout(() => { alert(phrases[random]); }, 3000);
//# sourceMappingURL=1_robot_alert.js.map