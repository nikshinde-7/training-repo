const args = process.argv;
console.log(args);
const firstDigit = parseInt(args[3], 10);
const secondDigit = parseInt(args[4], 10);
const operation = args[2].toString();

if (operation === 'add') {
  console.log('Well the addition is =>', firstDigit + secondDigit);
} else if (operation === 'sub') {
  console.log('Well the subtraction is =>', firstDigit - secondDigit);
} else if (operation === 'mult') {
  console.log('Well the multiplication is =>', firstDigit * secondDigit);
} else if (operation === 'div') {
  console.log('Well the division is =>', firstDigit / secondDigit);
}
