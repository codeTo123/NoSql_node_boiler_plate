import { Router } from "express";
import { authentication } from "../utils/authentication";
import { getNearestExpiredProducts, getProductsSummaryReport, getRequestedProductValidity } from "../controllers/product";
const router = Router();

router
    .route('/summary')
    .all(authentication)
    .get(getProductsSummaryReport)

router
    .route("/nearest_expired")
    .all(authentication)
    .get(getNearestExpiredProducts)

router
    .route("/validity/:productId")
    .all(authentication)
    .get(getRequestedProductValidity)


export default router;