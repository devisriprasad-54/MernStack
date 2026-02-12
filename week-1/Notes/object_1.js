let employee =
{
   eno: 1,
   name: 'riyaz'
}

for (let v in employee)
{
   console.log(v, "is ",employee[v]);
}

console.log(Object.keys(employee));
console.log(Object.values(employee));
