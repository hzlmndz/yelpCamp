const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i=0; i<300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '6877641fe5091b0aee0e4fc7',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam a id, cupiditate deserunt fugit tempora cumque placeat voluptatibus reiciendis beatae sint quam incidunt, impedit repellat similique porro totam esse fuga?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:[
                {
                    url: 'https://res.cloudinary.com/doosag37y/image/upload/v1752737189/yelpCamp/omfesym3j18rvwqev4yt.jpg',
                    filename: 'yelpCamp/omfesym3j18rvwqev4yt'
                },
                {
                    url: 'https://res.cloudinary.com/doosag37y/image/upload/v1752737190/yelpCamp/ct8sojwszejqx1q2khme.jpg',
                    filename: 'yelpCamp/ct8sojwszejqx1q2khme',
                }
            ]
        })
    await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
})