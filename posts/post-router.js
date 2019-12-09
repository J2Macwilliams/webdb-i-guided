const express = require('express');

// database access using knex
const knex = require('../data/db-config.js');//renamed to knex from db

const router = express.Router();

// return a list of posts from the db
router.get('/', (req, res) => {
    // select * from posts
    knex
        .select('*')
        .from('posts')
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(500).json({ errorMessage: "Error getting the posts" })
        })
});

router.get('/:id', (req, res) => {
//select * from posts where id = req.params.id

knex.select('*')
.from('posts')
// .where("id", "=", req.params.id)
.where({id: req.params.id})
.first() //equivalent to post[0] only gets the object
.then(post => {
    res.status(200).json(post)
})
.catch(err => {
    res.status(500).json({message: "There was an error"})
})
});

router.post('/', (req, res) => {
    // insert into () values
const postInfo = req.body
if(!postInfo) {
    res.status(404).json({message: "Missing needed info"})
}
else{
   knex("posts")
   .insert(postInfo, "id")
   .then(ids => {
       const id = ids[0];

       return knex('posts')
       .where({id})
       .then(post => {
           res.status(201).json(post)
       })
       .catch(err => {
           res.status(500).json(err)
       })
       
   })
   .catch(err => {
       res.status(500).json(err)
   })
}
});

router.put('/:id', (req, res) => {
const {id} = req.params
const changes = req.body

knex('posts')
.where({id})
.update(changes)
.then(count => {
    if(count > 0) {
        res.status(200).json({message: `${count} record(s) updates`})
    }else{
        res.status(404).json({message: "update not found"})
    }
})
.catch(err => {
    res.status(500).json({message: "error updating the post", err})
})
});


router.delete('/:id', (req, res) => {
    const {id} = res.params
knex('posts')
.where({id})
.del()

});

module.exports = router;