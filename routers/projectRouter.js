const express = require("express")

const db = require("../data/helpers/projectModel")
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

router.get("/:id", validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post("/", (req, res) => {
    console.log(req.body)
    db.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)

        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "something went wrong"
            })
        })
})

router.delete("/:id", validateProjectId, (req, res) => {
    db.remove(req.params.id)
        .then(removedProject => {
            res.status(201).json({
                message: "project was removed"
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "something went wrong"
            })
        })
})

router.put("/:id", validateProjectId, (req, res) => {
    db.update(req.project.id, req.body)
        .then(updated => {
            res.status(201).json(updated)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "something went wrong"
            })
        })
})

// actions

router.get("/:id/actions", validateProjectId, (req, res) => {
    actionDb.get()
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

router.get("/:id/actions/:actionId", validateProjectId, validateActionId, (req, res) => {
    actionDb.get(req.params.actionId)
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

router.delete("/:id/actions/:actionId", validateProjectId, validateActionId, (req, res) => {
    actionDb.remove(req.action.id)
        .then(deleted => {
            res.status(201).json({
                message: "action was deleted"
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "something went wrong"
            })
        })
})

router.post("/:id/actions", validateProjectId, validateAction, (req, res) => {
    const newAct = { ...req.body, project_id: req.project.id }

    actionDb.insert(newAct)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "something went wrong"
            })
        })
})

router.put("/:id/actions/:actionId", validateProjectId, validateActionId, validateAction, (req, res) => {
    actionDb.update(req.action.id, req.body)
        .then(updatedAction => {
            res.status(201).json(updatedAction)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "something went wrong"
            })
        })
})
// middleware

function validateProjectId(req, res, next) {
    db.get(req.params.id)
        .then(project => {
            if (!project) {
                res.status(404).json({
                    message: "project not found"
                })
            } else {
                req.project = project

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

function validateActionId(req, res, next) {
    db.get(req.params.actionId)
        .then(action => {
            if (!action) {
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

function validateAction(req, res, next) {
    if (req.body.description === "" || req.body.notes === "") {
        res.status(400).json({
            message: "description and notes required"
        })
    } else {
        next()
    }
}

module.exports = router