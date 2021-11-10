function Construct() {
  let num1;
  let num2;
  this.read = () => {
    const args = process.argv;
    this.num1 = parseInt(args[2], 10);
    this.num2 = parseInt(args[3], 10);
  };
  this.sum = () => +this.num1 + +this.num2;
  this.mul = () => +this.num1 * +this.num2;
  this.num1 = num1;
  this.num1 = num2;
}

const cal = new Construct();
cal.read();
const sum = cal.sum();
const mult = cal.mul();
console.log(`Sum is => ${sum}`);
console.log(`Multiplication is => ${mult}`);
// Deep Cloning the object assuming no inner items are there
const assignClone = { ...cal };
console.log(assignClone);
