import express from "express";
import { globalSearch } from "../../controllers/search/search";

const SearchRouter = express.Router();

SearchRouter.get("/", globalSearch as any);

export default SearchRouter;
