let express = require("express")
let Note = require("../models/Notes")
let router = express.Router()
let fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require("express-validator")
const User=require("../models/Users")


// Route 1 get all the notes using :Get "api/notes/getuser".  login required
router.get("/fetchnotes", fetchuser, async (req, res) => {


    try {
        const notes = await Note.find({ user: req.user.id });
        // And then you're trying to send another response here
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occurred in notes");
    }
})
// Route 2  add new  notes using :post "api/notes/getuser".  login required
router.post("/addnotes", fetchuser, [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "add the valid description").isLength({ min: 5 }),
    // body("password","password must be atleast 6 character").isLength({min:6}),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;     //this is destructuring

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Note({
            
            title, description, tag, user: req.user.id
        })
        let savednotes = await note.save()
        res.json(savednotes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occurred in notes");
    }
})
// Route 3 Updating the existing Route Get "api/notes/getuser".  login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    try {
        // create the new note object
        let newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };

        // find the note to be updated and update it
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occurred in notes");
    }
})

// Contributing in Notes
router.put("/contributing", async (req, res) => {
    const { noteId, email, title, description, tag } = req.body;
    
    try {
        let existEmail = await User.findOne({ email: email });
        if (!existEmail) {
            return res.status(404).send("User with this email not found");
        }

        let note = await Note.findOne({noteId});
        console.log(note);
        if(!note){
           return res.json({message:"Note id is Not Found"})
        }

        let updatedNote = {};
        if (title) updatedNote.title = title;
        if (description) updatedNote.description = description;
        if (tag) updatedNote.tag = tag;

        note = await Note.findByIdAndUpdate(noteId, { $set: updatedNote }, { new: true });

        res.json({ success: "Note has been updated with contributions", note });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occurred during contribution");
    }
});




// ROUTE 4  deleting the note
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    let { title, description, tag } = req.body

    try {


        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not found") }


        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note has been deleted", note: note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occurred in notes");
    }
})
module.exports = router




