import { users } from "./main.js";

// 1. Get only active users
export function getActiveUsers() {
  return users.filter(user => user.active);
}
console.log(getActiveUsers());

// 2. Extract names of active users
export function getActiveUserNames() {
  const activeUsers = getActiveUsers();
  return activeUsers.map(user => user.name);
}
console.log(getActiveUserNames())  

// 3. Check if any admin exists
export function isAdminExists() {
  return users.some(user => user.role === "admin");
}
console.log(isAdminExists());

// 4. Find user by id
export function findUserById(id) {
  return users.find(user => user.id === id);
}
console.log(findUserById(2));

// 5. Deactivate a user immutably
export function deactivateUser(id) {
  return users.map(user => {
    if (user.id === id) {
      return { ...user, active: false };
    }
    return user;
  });
}
console.log(deactivateUser(1));