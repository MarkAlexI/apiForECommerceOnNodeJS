import { Product, Products, UnitProduct } from "./product.interface";
import { v4 as random } from "uuid";
import fs from "fs";

let products: Products = loadProducts();

function loadProducts(): Products {
  try {
    const data = fs.readFileSync("./products.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(`Error ${error}`);
    return {};
  }
}

export const findAll = async (): Promise<UnitProduct[]> => Object.values(products);

export const findOne = async (id: string): Promise<UnitProduct> => products[id];
