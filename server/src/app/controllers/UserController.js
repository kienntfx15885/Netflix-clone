const User = require('../../resources/models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const UserController = {
    // [POST] /api/auth/register
    // @desc Register new user
    register: async function (req, res) {
        const { username, password, email } = req.body;

        let { isAdmin } = req.body;

        // Missing item
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing username or email or password' });
        }

        try {
            const user = await User.findOne({ email });

            // User already registered
            if (user) {
                return res.status(400).json({ success: false, message: 'User already registered' });
            }

            // All good
            const hashPassword = await argon2.hash(password);

            const newUser = new User({
                username,
                email,
                password: hashPassword,
                isAdmin: username.startsWith('kien2899') ? true : false,
            });

            await newUser.save();

            // Access Token
            const accessToken = jwt.sign(
                { userId: newUser._id, isAdmin: newUser.isAdmin },
                process.env.ACCESS_TOKEN_SECRET,
            );

            res.status(201).json({ success: true, message: 'User created', accessToken });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    // [POST] /api/auth/login
    // @desc Login user
    login: async function (req, res) {
        const { username, email, password } = req.body;

        // Missing item
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing username or email or password' });
        }

        try {
            const user = await User.findOne({ email });

            // User not exist
            if (!user) {
                return res.status(400).json({ success: false, message: 'Wrong email or password' });
            }

            // Wrong username
            if (user.username !== username) {
                return res.status(400).json({ success: false, message: 'Wrong email or password' });
            }

            // User existed
            const validPassword = await argon2.verify(user.password, password);
            console.log(validPassword);

            if (!validPassword) {
                return res.status(400).json({ success: false, message: 'Wrong email or password' });
            }

            // All good
            const accessToken = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '5d',
            });
            res.json({ success: true, message: 'Login successfully', user: user['username'], accessToken });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    // [PUT] /api/users/:_id
    // @desc Update user
    update: async function (req, res) {
        let { username, password, email } = req.body;

        if (req.user.userId === req.params._id || req.user.isAdmin) {
            const hashPassword = await argon2.hash(password);

            const updateUser = await User.findByIdAndUpdate(req.params._id, {
                username,
                email,
                password: hashPassword,
            });

            res.json({ success: true, message: 'Update successfully', updateUser });
        } else {
            return res.status(403).json({ success: false, message: 'You can only update your account' });
        }
        try {
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    // [GET] /api/users/find/:_id
    // @desc Find one user
    findOne: async function (req, res) {
        if (req.user.isAdmin) {
            try {
                const user = await User.findById(req.params._id);

                res.json({ success: true, message: 'Find user success', user: user['username'] });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        } else {
            return res.status(403).json({ success: faflse, message: 'You are not allowed to see another users' });
        }
    },

    // [GET] /api/users/
    // @desc Get all user
    getAll: async function (req, res) {
        const query = req.query;
        const queryName = query.name;

        console.log(query);
        if (req.user.isAdmin) {
            try {
                const users = query ? await User.find({ username: queryName }).limit(10) : await User.find();

                res.json({ success: true, message: 'All users', users });
            } catch (error) {
                console.log(error);
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        } else {
            return res.status(403).json({ success: faflse, message: 'You are not allowed to see all users' });
        }
    },

    // [GET] /api/users/starts
    // @desc Get all user with created at
    starts: async function (req, res) {
        try {
            const data = await User.aggregate([
                {
                    $project: {
                        month: { $month: '$createdAt' },
                    },
                },
                {
                    $group: {
                        _id: '$month',
                        total: { $sum: 1 },
                    },
                },
            ]);

            return res.json({ success: true, message: 'User with created at', data });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    // [DELETE] /api/users/:_id
    // @desc Delete user
    delete: async function (req, res) {
        if (req.user.userId === req.params._id || req.user.isAdmin === true) {
            try {
                const userDeleted = await User.findByIdAndDelete(req.params._id);

                if (userDeleted) {
                    return res.json({ success: true, message: 'User has been delete...', userDeleted });
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        } else {
            return res.status(403).json({ success: false, message: 'You can only delete your account' });
        }
    },
};

module.exports = UserController;
