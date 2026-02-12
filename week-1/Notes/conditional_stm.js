let isLoggedIn = true;
let isProfileComplete = true;

let message = "";

if (!isLoggedIn){
   message += "Please login";
}
else if (isLoggedIn && !isProfileComplete)
   {
   message += "please complete the profile";
}
else {
   message += "loggined in";
   }
console.log(message)