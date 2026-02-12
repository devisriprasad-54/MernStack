// MODULE 3: SHOPPING CART ENGINE 
//   -> Merge cart with courses to get full course info
//   -> Calculate total cart amount
//   -> Increase quantity of a course (immutably)
//   -> Remove a course from cart
//   -> Check if all cart items are paid courses

import { cart, courses } from "./main.js";

// 1. Merge cart with courses to get full course info
export function getFullCartInfo() {
  return cart.map(cartItem => {
    const course = courses.find(c => c.id === cartItem.courseId);
    return { ...cartItem, course };
  });
}  

// 2. Calculate total cart amount
export function calculateTotalCartAmount() {
  const fullCart = getFullCartInfo();
  return fullCart.reduce((total, item) => total + (item.course.price * item.qty), 0);
}  

// 3. Increase quantity of a course (immutably)
export function increaseCourseQuantity(courseId, increment) {
  return cart.map(item => {
    if (item.courseId === courseId) {
      return { ...item, qty: item.qty + increment };
    }
    return item;
  });
}  

// 4. Remove a course from cart
export function removeCourseFromCart(courseId) {
   return cart.filter(item => item.courseId !== courseId);
   cart.filter(item => item.courseId !== courseId);
}  

// 5. Check if all cart items are paid courses
export function areAllCartItemsPaidCourses() {
  const fullCart = getFullCartInfo();
  return fullCart.every(item => item.course.price > 0);
}  