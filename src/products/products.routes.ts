import express, { Request, Response } from "express";
import { Product, UnitProduct } from "./product.interface";
import * as database from "./product.datastorage";
import { StatusCodes } from "http-status-codes";

export const productRouter = express.Router();

productRouter.get('/products', async (req: Request, res: Response) => {
  try {
    const allProducts = await database.findAll();

    if (!allProducts) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: `No products found!`
      });
    }

    return res.status(StatusCodes.OK).json({
      total: allProducts.length,
      allProducts
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error
    });
  }
});
