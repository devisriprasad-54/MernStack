// MODULE 2: COURSE CATALOG ENGINE
//   -> Get published courses
//   -> Sort courses by price (high → low)
//   -> Extract { title, price } only
//   -> Calculate total value of published courses
//   -> Add a new course immutably

import { courses } from "./main.js";

// 1. Get published courses
export function getPublishedCourses() {
  return courses.filter(course => course.published);
}
console.log(getPublishedCourses())

// 2. Sort courses by price (high → low)
export function sortCoursesByPriceDesc() {
  return [...courses].sort((a, b) => b.price - a.price);
}     
console.log(sortCoursesByPriceDesc())

// 3. Extract { title, price } only 
export function extractTitleAndPrice() {
  return courses.map(course => ({ title: course.title, price: course.price }));
}  
console.log(extractTitleAndPrice())

// 4. Calculate total value of published courses
export function calculateTotalValueOfPublishedCourses() {
  const publishedCourses = getPublishedCourses();
  return publishedCourses.reduce((total, course) => total + course.price, 0);
}
console.log(calculateTotalValueOfPublishedCourses())

// 5. Add a new course immutably
export function addNewCourse(newCourse) {
  return [...courses, newCourse];
}  
console.log(addNewCourse({ id: 104, title: "Python", price: 1199, published: true }))