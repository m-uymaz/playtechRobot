const robot1: {name: string, color: string, type: string, recievedPhrases: string[]} = {
    name: "Roboty",
    color: "orange",
    type: "male",
    recievedPhrases: []
};

const robot2: {name: string, color: string, type: string, recievedPhrases: string[]} = {
    name: "Robota",
    color: "purple",
    type: "female",
    recievedPhrases: []
};

robot1.recievedPhrases.push(`Hello there, ${robot1.name}!`);
robot2.recievedPhrases.push(`Hi there, ${robot2.name}!`);

console.log(robot1.recievedPhrases);
console.log(robot2.recievedPhrases);