const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
    let role
    if (req.params.role === "owner") {
     role = "owner";
    }else if(req.params.role === "client") {
        role = "client";   
    }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role : role,
  })
    res.send(user)
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("Email doesn't exist");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(404).send("password wrong");

  const token = jwt.sign({
    _id: user.id,
    name: user.name,
    role: user.role,
  },process.env.SECRET);

  res.header("auth-token", token).send(token);
};

const updateUser = async (request, response) => {
  const user = await userModel.findByIdAndUpdate({ _id: request.params.id},{
    name : request.body.name,
    role : request.body.role,
    // image_cover : request.body.image_cover,
    // images: request.body.images,
    // user_id : request.body.user_id
    },{returnDocument: 'after'});
  try {
    response.send(hotel);
  } catch (error) {
    response.status(500).send(error);
  }
};

const deleteuser =  async (request, response) => {
  try {
    const user = await userModel.findByIdAndDelete(request.params.id);

    if (!users) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports =  {
    register, login ,deleteuser,updateUser
};
