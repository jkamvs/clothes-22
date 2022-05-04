const { Router } = require("express");
const { Users } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRam = 10
// SECRET_KEY

                //   SANTEAGUEÑO VIGILANTE

router.post("", async (req, res) => {
    const {legajo_user, user_name, user_password, rol } = req.body;
    // const user = await Users.findOne({user_name})
    // const passwordCorrect = user === null ? false : await bcrypt.compare(user_password, user.passwordHash)
    
    try {
          const passwordHash = await bcrypt.hash(user_password, saltRam)
          const createdUser = await Users.create({legajo_user,user_name, user_password:passwordHash, rol});
          res.status(200).json(createdUser + "creado");
    
} catch (error) {
    console.log(error)
}
});

module.exports = router;