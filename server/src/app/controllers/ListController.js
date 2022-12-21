
const List = require('../../resources/models/List')

const ListController = {

    // [POST] /api/lists/create
    // @desc Create new lists
    create: async function (req, res) {
        if (req.user.isAdmin) {
            try {
                const newList = new List(req.body)

                await newList.save()

                return res.status(201).json({success: true, message: 'Create list', newList})
            } catch (error) {
                console.log(error)
                return res.status(500).json({success: false, message: 'Internal server error'})
            }
        } else {
            return res.status(403).json({success: false, message: 'You are not allowed'})
        }
    },


    // [DELETE] /api/lists/:_id
    // @desc Delete list
    delete: async function (req, res) {
        if (req.user.isAdmin) {
            try {
                const deleteList = await List.findByIdAndDelete(req.params._id)

                if (!deleteList) {
                    return res.status(400).json({success: false, message: 'Have no list'})
                }

                return res.status(201).json({success: true, message: 'Delete list', deleteList})
            } catch (error) {
                console.log(error)
                return res.status(500).json({success: false, message: 'Internal server error'})
            }
        } else {
            return res.status(403).json({success: false, message: 'You are not allowed'})
        }
    },


    // [DELETE] /api/lists/
    // @desc show lists
    show: async function (req, res) {
        const typeQuery = req.query.type
        const genreQuery = req.query.genre
        let list = []

        try {
            if (typeQuery) {
                if (genreQuery) {
                    list = await List.aggregate([
                        {$sample: {size: 10}},
                        {$match: {type: typeQuery, genre: genreQuery}}
                    ])
                } else {
                    list = await List.aggregate([
                        {$sample: {size: 10}},
                        {$match: {type: typeQuery}}
                    ])
                }
            } else {
                list = await List.aggregate([
                    {$sample: {size: 10}}
                ])
            }

            return res.json({success: true, message: 'Show list', list})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, message: 'Internal server error'})
        }
    },
}

module.exports = ListController