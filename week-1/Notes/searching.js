// write a funtction that receive skills arraya and skillsname as argument and return the index if skillname existed, otherwise skill not found


let skills = ['react', 'angular', 'nodejs', 'java'];

function findSkill(skills, skillName) {
   for (let i = 0; i < skills.length; i++) {
      if (skills[i] == skillName) {
         return i;
      }
   }
}

let result = findSkill(skills, 'java');
console.log("index: " + result);

result = findSkill(skills, 'react');
   console.log("skill not found");