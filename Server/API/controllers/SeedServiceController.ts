import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import SeedService from "../../services/SeedService";
import Container from "typedi";

/**
 * @route   GET api/Seed
 * @desc    Seed Test User
 * @access  Private
 * @param   {Request} req
 * @param   {Response} res
 * @returns {Promise<Response>}
 */
export const GetTestUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const id = req.query.id;
    const SeedServiceInstance = Container.get(SeedService);
    const ServiceRes = await SeedServiceInstance.GetUserToken(id as string);
    return res.status(201).json(ServiceRes);
  }
);

/**
 * @route   POST api/Seed
 * @desc    Seed Test User
 * @access  Private
 * @param   {Request} req
 * @param   {Response} res
 * @returns {Promise<Response>}
 */
export const SeedUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { UUID } = req.body;
    const SeedServiceInstance = Container.get(SeedService);
    const ServiceRes = await SeedServiceInstance.SeedDataBase(UUID);
    return res.status(201).json(ServiceRes);
  }
);

/**
 * @route   DELETE api/Seed
 * @desc    Seed Test User
 * @access  Private
 * @param   {Request} req
 * @param   {Response} res
 * @returns {Promise<Response>}
 */
export const DeleteUsers = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const Ids = req.query.ids;
    const IdsArray = typeof Ids === "string" && Ids.split(",");

    if (IdsArray) {
      const SeedServiceInstance = Container.get(SeedService);
      const ServiceRes = await SeedServiceInstance.DeleteManyTestUsers(
        IdsArray
      );
      return res.status(201).json(ServiceRes);
    } else {
      res.status(406);
      throw new Error("Need Ids");
    }
  }
);
