const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/reviews", { useNewUrlParser: true });
const faker = require("faker");
// mongoose will accept an array of objects

let reviewSchema = mongoose.Schema({
  resturantId: Number,
  name: String,
  location: String,
  numFriends: Number,
  numReviews: Number,
  numPhotos: Number,
  elite: Boolean,
  stars: Number,
  date: Date,
  comments: String,
  userPicture: String,
  checkIn: Boolean
});
const Review = mongoose.model("Review", reviewSchema);

let user = [];

for (let i = 0; i < 2; i++) {
  let userInfo = {
    resturantId: i,
    name: faker.name.findName(),
    location: faker.address.city(),
    numFriends: faker.random.number({ min: 1, max: 500 }),
    numReviews: faker.random.number({ min: 1, max: 500 }),
    numPhotos: faker.random.number({ min: 1, max: 500 }),
    elite: faker.random.boolean(),
    stars: faker.random.number({ min: 1, max: 500 }),
    date: faker.date.between("2015-01-01", "2019-01-05"),
    comments: faker.lorem.sentences({ min: 3, max: 30 }),
    userPicture: faker.image.avatar(),
    checkIn: faker.random.boolean()
  };
  user.push(userInfo);
}
console.log(user);

Review.insertMany(user, function(error) {
  if (error) {
    console.log("error", error);
  } else {
    console.log("sucessfully seeded");
    mongoose.connection.close();
  }
});
