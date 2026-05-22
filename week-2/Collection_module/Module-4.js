// MODULE 4: ROLE & PERMISSION ENGINE
//   -> Get all role names
//   -> Check if student can delete
//   -> Create a flat list of all unique permissions
//   -> Add new role moderator immutably

import { roles } from "./main.js";

// 1. Get all role names
export function getAllRoleNames() {
  return Object.keys(roles);
}

// 2. Check if student can delete
export function canStudentDelete() {
  return roles.student.includes("delete");
}  

// 3. Create a flat list of all unique permissions
export function getAllUniquePermissions() {
  const allPermissions = Object.values(roles).flat();
  return [...new Set(allPermissions)];
}

// 4. Add new role moderator immutably
export function addModeratorRole() {
  return { ...roles, moderator: ["update", "view"] };
}
