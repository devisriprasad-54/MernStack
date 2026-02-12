// Task Management System (ToDo App Modules):
//      Building a task manager like Todoist

// Requirements:
//      Create a modular todo app with 3 separate files:

       
          
//         i. validator.js - Input validation
//                       // TODO: Export these validation functions
                      
// 1. Validate task title (not empty, min 3 chars)
export function validateTitle(title)
{
   if (title.length === 0 && title.length < 3) {
      return "Title must be at least 3 characters long.";
   }
   else {
      return true;
   }
}
                      
// 2. Validate priority (must be: low, medium, high)
export function validatePriority(priority)
{
   const validPriorities = ["low", "medium", "high"];
   return validPriorities.includes(priority.toLowerCase());
}

// 3. Validate due date (must be future date)
export function validateDueDate(date)
{
   const dueDate = new Date(date);
   const currentDate = new Date();
   return dueDate > currentDate; 
}






