const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connection open")
    })
    .catch(err => {
        console.log(`Oh no, Mongo connection error: ${err}`)
    })

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);


// const makeTweets = async () => {
//     // const user = new User({ username: "Bob_Barker", age: 70 });
//     const user = await User.findOne({ username: "Bob_Barker" });
//     // const tweet1 = new Tweet({ text: "Come on down!", likes: 70 });
//     const tweet2 = new Tweet({ text: "To the Price Is Right!", likes: 92 });
//     tweet2.user = user;
//     // await user.save();
//     await tweet2.save();
//     console.log(user, tweet2)
// }


// makeTweets();


const findTweet = async () => {
    const t = await Tweet.find({}).populate('user', 'username')
    console.log(t)
}

findTweet()