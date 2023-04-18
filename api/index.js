const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Post = require('./models/Post');
const app = express();
const jwt = require('jsonwebtoken');
const multer = require('multer');
var cookieParser = require('cookie-parser')
const fs = require('fs')
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// var bcrypt = require('bcrypt-nodejs');
// const bcrypt = require('bcrypt-nodejs');
app.use(express.json());
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
const upload = multer({ dest: 'uploads/' })
const secret = 'asdasdiuhqwiehqihuewiq'
mongoose.connect("mongodb+srv://huntershen10:shenzhihang@cluster0.bbsdrdu.mongodb.net/?retryWrites=true&w=majority")
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const newUser = new User({ username, password });
    newUser.setPassword(password);
    try {
        const userDoc = await newUser.save();
        res.status(200).json({ message: "User created successfully" });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    // const userDoc = await User.findOne({username:username})
    // const isCorrect = userDoc.validatePassword(password);
    // console.log("Received request with username:", username, "and password:", password);

    try {
        const user = await User.findOne({ username })

        if (user === null) {
            return res.status(404).json({
                message: "User not found."
            });
        } else {

            if (user.validPassword(password)) {
                jwt.sign({ username, id: user.id }, secret, {}, (err, token) => {
                    if (err) throw err;
                    console.log(token)
                    res.cookie('token', token).json({ id: user.id, username: user.username })
                })


                // res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });

                // const token = '1234567'
                // res.cookie('token', token, {
                //     httpOnly: false,
                //     sameSite: 'none',
                //     path: '/'
                // })
                // res.status(201).json({
                //     message: "User Logged In",
                // })
            } else {
                res.status(400).json({
                    message: "Wrong Password"
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies
    try {

        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err;
            res.json(info)
        })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

    // Cookies that have been signed
    // console.log('Signed Cookies: ', req.signedCookies)
}
)
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})
app.post('/post', upload.single('file'), async (req, res) => {
    try {

        const { originalname, path } = req.file
        const lst = originalname.split('.')
        const ext = lst[lst.length - 1]
        const name = lst[0]
        if (!req.file || !req.body.title || !req.body.summary) {
            throw ("invalid request")
        }
        const newPath = 'uploads/' + name + '.' + ext
        fs.renameSync(path, newPath)
        const { title, summary, content, location } = req.body
        // get author from cookie
        const { token } = req.cookies
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;
            const postDoc = await Post.create({
                title,
                summary,
                content,
                location,
                cover: newPath,
                author: info.id
            })
            res.json(info);
        })
    }
    catch (e) {

        res.status(400).json({ message: e.message });
    }

})
app.get('/post', async (req, res) => {
    const postDoc = await Post.find().populate({ path: 'author', select: 'username' }).sort({ createdAt: -1 }).limit(20)
    res.json(postDoc);
})
app.get('/post/:id', async (req, res) => {
    const { id } = req.params
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
})
app.put('/post', upload.single('file'), async (req, res) => {
    try {
        if (req.file) {
            const { originalname, path } = req.file
            const lst = originalname.split('.')
            const ext = lst[lst.length - 1]
            const name = lst[0]
            const newPath = 'uploads/' + name + '.' + ext
            fs.renameSync(path, newPath)

        }
        const { token } = req.cookies
        const { id } = req.body
        const { title, summary, content, location } = req.body

        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;
            console.log(id)
            const postDoc = await Post.findById(id).populate('author');
            if (postDoc === null) {
                console.log("not found")
                return res.status(404).json({ message: "Post not found" })
            }
            if (title) {

                postDoc.title = title
            }
            if (summary) {

                postDoc.summary = summary
            }
            if (content) {
                postDoc.content = content
            }
            if (location) {
                postDoc.location = location
            }
            if (req.file) {
                postDoc.cover = newPath
            }
            if (info.id !== postDoc.author.id) {
                return res.status(403).json({ message: "You are not the author of this post" })


            }
            await postDoc.save()
            return res.json(postDoc)
        })
    }
    catch (e) {
        res.status(400).json({ message: e.message });

    }
})
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    const { token } = req.cookies
    try {
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;

            const postDoc = await Post.findById(id).populate('author');
            if (postDoc === null) {
                throw ("Post not found")
            }
            if (info.id !== postDoc.author.id) {
                return res.status(403).json({ message: "You are not the author of this post" })
            }
            // await Post.findByIdAndRemove(id)
            await postDoc.deleteOne()
            res.status(200).json({ message: "Post deleted successfully" })

        })
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }

})
app.listen(4000);