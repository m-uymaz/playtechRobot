const robot1 = {
    name: "Roboty",
    color: "orange",
    type: "male",
    recievedPhrases: []
};

const robot2 = {
    name: "Robota",
    color: "purple",
    type: "female",
    recievedPhrases: []
};

robot1.recievedPhrases += (`Hello there, ${robot1.name}!`);
robot2.recievedPhrases += (`Hi there, ${robot2.name}!`);

//Mоже да се направи и с .push
//Грешна практика ли е да се използва += вместо .push?

console.log(robot1.recievedPhrases);
console.log(robot2.recievedPhrases);

console.log(robot1);
console.log(robot2);