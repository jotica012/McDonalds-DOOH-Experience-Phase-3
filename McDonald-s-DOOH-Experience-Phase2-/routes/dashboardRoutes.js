import {express} from "../dependencies.js"
import {getInt } from "../controllers/dashboardController.js"

const router = express.Router()
router.get('/', getInt)

export default router