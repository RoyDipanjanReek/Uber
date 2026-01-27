import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { query } from "express-validator";
import { getAutoCompleteSuggestion, getCoordinates, getDistanceTime } from "../controller/map.controller.js";


const router = express.Router();


router.get('/get-coordinates', query('address').isString().isLength({min:3}), authUser, getCoordinates)

router.get("/get-distance-time", query("origin").isString().isLength({min:3}),  query("destination").isString().isLength({min:3}), authUser, getDistanceTime)


router.get('get-suggestion', query("input").isString().isLength({min:3}), authUser, getAutoCompleteSuggestion)

export default router