// Arrays example
const values = [20, 30, 40, 50];
for (let i = 0; i < values.length; i++) {
  console.log(values[i]);
}

/* Function declaration example */
// Do something function prints the value multiplied by 10
const doSomething = (value) => {
  console.log(value * 10);
};

// Do something else function prints value divided by 10
function doSomethingElse(value) {
  console.log(value / 10);
}

// Functions are called with values
doSomething(3);
doSomethingElse(20);
