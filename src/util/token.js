const jwt = require("jsonwebtoken");

const checkTonken = async (token , id , key) =>{ 
    jwt.verify(token, key);
};

const setToken = async (id, key) => {
    if(id){
        return jwt.sign({ id }, key , {expiresIn: 28800});
    }
    return false;
};

module.exports = { checkTonken , setToken };