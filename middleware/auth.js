import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    //get the user token
    const token = req.headers.authorization.split(" ")[1];

    //if token length is less than 500 than it is local sign in
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      //for google sign in
      decodedData = jwt.decode(token);
      //sub is the id that differentiates google users
      req.userId = decodedData?.sub;
    }
    next();
  } catch (e) {
    console.log(e);
  }
};

export default auth;
