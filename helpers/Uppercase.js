const arrayOfWords = ['hii', 'we', 'are', 'learning', 'Here'];

const capitalizeFirstLetter = (array) => {
  const result = array.map((str) => str.charAt(0).toUpperCase() + str.slice(1));
  console.log(result);
};

capitalizeFirstLetter(arrayOfWords);
