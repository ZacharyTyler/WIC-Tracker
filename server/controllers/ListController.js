import express from 'express'
import ListService from '../services/ListService';
import { Authorize } from '../middleware/authorize.js'

let _listService = new ListService().repository

export default class ListController {
    constructor() {
        this.router = express.Router()
            //NOTE all routes after the authenticate method will require the user to be logged in to access
            .use(Authorize.authenticated)
            .get('', this.getAll)
            .get('/:id', this.getById)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
    }

    async getAll(req, res, next) {
        try {
            let data = await _listService.find({ authorId: req.session.uid })
            return res.send(data)
        }
        catch (error) { next(error) }
    }

    async getById(req, res, next) {
        try {
            let data = await _listService.findById(req.params.id)

            if (!data) {
                throw new Error("Invalid Id")
            }
            res.send(data)
        } catch (error) { next(error) }
    }

    async create(req, res, next) {
        try {
            //NOTE the user id is accessable through req.body.uid, never trust the client to provide you this information
            req.body.authorId = req.session.uid
            let data = await _listService.create(req.body)
            res.send(data)
        } catch (error) { next(error) }
    }

    async edit(req, res, next) {
        try {
            let data = await _listService.findOneAndUpdate({ _id: req.params.id, }, req.body, { new: true })
            if (data) {
                return res.send(data)
            }
            throw new Error("invalid id")
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            await _listService.findOneAndRemove({ _id: req.params.id })
            res.send("deleted list")
        } catch (error) { next(error) }

    }

}