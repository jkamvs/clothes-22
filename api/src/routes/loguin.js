const { Router } = require("express"); 
const { Users } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRam = 10
// SECRET_KEY

              

router.post("", async (req, res) => {
    const {legajo_user, user_name, user_password, rol } = req.body;
    const user = await Users.findOne({user_name})
    const passwordCorrect = user === null ? false : await bcrypt.compare(user_password, user.passwordHash)
    
    if(!(user && passwordCorrect)){
        res.status(401).json({ 
            error: "invalid user or password"
        })
    }

    const userForToken = {
        id: user._id,
        username: user.user_name, 
    }

    const token = jwt.sign(userForToken, process.env.SECRET_KEY)

    res.send({ 
        name: user.name,
        username: user.user_name, 
        token
    })
   
});

module.exports = router;