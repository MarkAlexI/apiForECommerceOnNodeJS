import express from "express";
import { Request, Response } from "express";
import { UnitUser, User } from "./user.interface";
import { StatusCodes } from "http-status-codes";
import * as database from "./user.datastorage";

export const userRouter = express.Router();

userRouter.get("/users", async (req: Request, res: Response) => {
  try {
    const allUsers: UnitUser[] = await database.findAll();

    if (!allUsers) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: `No users find.`
      });
    }

    return res.status(StatusCodes.OK).json({
      total_user: allUsers.length,
      allUsers
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error
    });
  }
});
