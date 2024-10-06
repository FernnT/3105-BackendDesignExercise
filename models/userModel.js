
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

const getUsers = () => {
    try {
    const usersData = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(usersData);
    }catch (error) {
    console.error('Error reading users from file:', error);
    return [];
  }
};

const addUser = (newUser) => {
    try{
        // const users = getUsers();
        // users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(newUser, null, 2));
    }catch (error) {
        console.error('Error adding user to file:', error);
    }
}

const findUserEmail = (email) => {
    const users = getUsers();
    return users.find((user) => user.email === email);
}



module.exports = { getUsers, addUser, findUserEmail };