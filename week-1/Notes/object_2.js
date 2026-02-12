let student =
{
   sno: 101,
   sname: 'alley',
   marks: [10,10,10,10,10],
   adress: {
      city: 'hyd',
      pincode: 500081
   },

   getAvg: function ()
   {
      let total = 0;
      for (let m of student.marks)
      {
         total += m;
      }
      return total / student.marks.length;
      
   }
}

console.log("Student Number: ", student.sno);
console.log("Student Name: ", student.sname);
console.log("Student Marks: ", student.marks);
console.log("Student Address: ", student.adress);
console.log("Student City: ", student.adress.city);
console.log("Student Pincode: ", student.adress.pincode);
console.log("Student Average Marks: ", student.getAvg());