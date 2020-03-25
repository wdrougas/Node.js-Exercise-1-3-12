const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises')


const courseScheman = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model("Course", courseScheman)


async function getCourses() {
    return await Course
    .find({isPublished: true})
    .or([
        {price: { $gte: 15}},
    {name: /.*by.*/i}
    ])
    .sort({price: -1})
    .select({name: 1, author: 1, price: 1})
}

async function run() {
    const courses = await getCourses()
    console.log(courses)
}

run()