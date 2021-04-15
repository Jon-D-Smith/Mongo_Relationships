const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connection open")
    })
    .catch(err => {
        console.log(`Oh no, Mongo connection error: ${err}`)
    })


const userSchema = mongoose.Schema({
    first: String,
    last: String,
    //One to few relationship
    //Setting up a list of 1 or more addresses for the user
    addresses: [
        {
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})


const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: "Harry",
        last: "Potter"
    })
    u.addresses.push({
        street: "4 Privet Drive",
        city: "Little Whinging",
        state: "Surrey",
        country: "Paris"
    })

    const res = await u.save()
    console.log(u)
}

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresss.push({
        street: "4 Privet Drive",
        city: "Little Whinging",
        state: "Surrey",
        country: "Paris"
    })
    const res = await user.save()
    console.log(res)
}

makeUser();