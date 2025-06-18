import express from 'express';
import v1Router from './v1'; // Import v1 routes
// import v2Router from "./v2"; // Future versions

const router = express.Router();

router.use('/v1', v1Router);
// router.use("/v2", v2Router); // Add more versions as needed

export default router;
