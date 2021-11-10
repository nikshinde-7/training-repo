const num = 5;

function getFactorial() {
  let factorial = 1;
  /* some comments here =>
    We are returning the function from here, and also invoking
    the function outside of it's parent's lexical scope, so it still does remembers
    the variable inside its lexical scope which gradually forms closure
  */
  function inner() {
    for (let i = 1; i <= num; i++) {
      factorial *= i;
    }
    return factorial;
  }
  return inner;
}

function execute() {
  const factorialValue = getFactorial()();
  console.log(factorialValue);
}

execute();
