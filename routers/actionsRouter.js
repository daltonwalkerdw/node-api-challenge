const express = require("express")

const actionDb = require("../data/helpers/actionModel")

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
  .then(proj => {
      res.status(200).json(proj)
  })
  .catch(error => {  
      console.log(error)
      res.status(500).json({
          message: "something went wrong"
      })
  })
})

router.get("/:id", validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

// middleware

function validateActionId(req, res, next) {
    db.get(req.params.id)
    .then(action => {
        if(!action){
            res.status(404).json({
                message: "action not found"
            })
        } else {
            req.action = action

            next()
        }
    })
    .catch(error => {  
        console.log(error)
        res.status(500).json({
            message: "something went wrong"
        })
    })
}


module.exports = router