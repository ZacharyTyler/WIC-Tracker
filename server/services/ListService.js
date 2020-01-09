import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _model = new Schema({
    listItem: { type: String, required: true },
    checkStatus: { type: Boolean, required: true },
    authorId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export default class ListService {
    get repository() {
        return mongoose.model('list', _model)
    }
}