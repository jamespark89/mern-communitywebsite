const router = require("express").Router()
const verify = require("../middleware/verify")
let User = require("../models/user.model")

router.route("/").post((req, res) => {
  verify(req.body.id_token)
    .then((tokeninfo) => {
      //to check that the aud claim contains one of your app's client IDs.
      if (tokeninfo.aud === process.env.CLIENT_ID) {
        const googleId = tokeninfo.sub
        const username = tokeninfo.name
        const email = tokeninfo.email
        const picture = tokeninfo.picture
        const newUser = new User({
          googleId,
          username,
          email,
          picture
        })
        //Check if user is already registered in DB
        User.findOne(
          { googleId: googleId },
          function (err, user) {
            //Exist => send response to FE
            res.json(user)
            //Not Eixst => save user in DB and sned response to FE
            if (err) {
              newUser
                .save()
                .then(() => res.json(user))
                .catch((err) =>
                  res.status(400).json("Error:" + err)
                )
            }
          }
        )
      } else {
        throw new Error("error")
      }
    })
    .catch(console.error)
})

module.exports = router
