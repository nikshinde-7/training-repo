import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';
import users from '../data/UserData.json';

const fs = require('fs');

exports.processJsonData = async (data) => {
  const { email, password } = data;
  // get the filtered user based on email
  const filteredUser = users.filter((el) => el.email === email);

  //
  if (filteredUser.length > 0) {
    if (
      filteredUser[0].email.toString() === email.toString() &&
      filteredUser[0].password.toString() === password.toString()
    ) {
      return {
        message: successMessages.LOGIN_SUCCESS,
      };
    } else {
      return {
        message: errorMessages.INVALID_CREDENTIALS,
      };
    }
  } else {
    (async () => {
      await fs.readFile('./data/UserData.json', (err, content) => {
        if (err) throw err;
        const parseJson = JSON.parse(content) || [];
        parseJson.push(data);
        fs.writeFile(
          './data/UserData.json',
          JSON.stringify(parseJson),
          (error) => {
            if (error) throw error;
          }
        );
      });
    })();
    return {
      message: successMessages.REGISTERED_SUCCESS,
    };
  }
};
