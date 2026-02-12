//callback function is function that can pass as argument to another function

function test(a) {
   console.log(a)
}

test(function () {
   return 123;
}
);