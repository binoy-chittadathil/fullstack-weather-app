const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const MyLocation = require('../models/MyLocation')

// function for my location data added to data base

const addLocation = (req, res) => {
    const { token } = req.cookies;

    if (token) {
        //jwt token verification
        jwt.verify(token, JWT_SECRET_KEY, async (err, decodedData) => {
            if (err) {
                res.status(400).json({ error: err })
            }
            const user_id = decodedData.id;
            const { place, longi, latti } = req.body;
            // finding user mylocation data
            const userMyLocationData = await MyLocation.find({ user_id });
            // check whether the data to be added is already executed or not
            const filteredRepeatedData = await userMyLocationData.some(data => {
                return data.place === place
            });

            if (filteredRepeatedData) {
                return res.status(403).json({ error: 'data already executed' })
            }

            const newMyLocation = new MyLocation({
                place,
                longi,
                latti,
                user_id
            });
            await newMyLocation.save().then((data) => {
                res.json({ message: 'data successfully added to database' })
            }).catch(err => {
                res.status(500).json({ error: 'data saving failed', err })
            })
        })
    } else {
        res.status(400).json({ error: 'tocken not found' })
    }
}



// function for get my location data from database

const getMyLocation = (req, res) => {
    const { token } = req.cookies;

    if (token) {
        //jwt token verification
        jwt.verify(token, JWT_SECRET_KEY, async (err, decodedData) => {
            if (err) {
                res.status(400).json({ error: err })
            }
            const user_id = decodedData.id;
            await MyLocation.find({ user_id: user_id }).then((data) => {
                res.status(200).json(data)
            }).catch(err => {
                res.status(400).json('no data found')
            })
        })
    } else {
        res.status(400).json({ error: 'tocken not found' })
    }
}


// function for delete cart items
const deleteCartItem = async (req, res) => {
    const { locationId } = req.params;
    await MyLocation.deleteOne({ _id:locationId }).then(() => {
        res.status(200).json({ message: 'successfully deleted' })
    }).catch(err => {
        res.status(501).json({ error: 'no data deleted', err })
    })
};

module.exports = {
    addLocation,
    getMyLocation,
    deleteCartItem
}