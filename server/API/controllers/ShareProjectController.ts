import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import ProjectService from "../../services/ShareProjectService";
import Container from "typedi";

/**
 * @route   POST api/shareProject
 * @desc    Share Project
 * @access  Private
 * @param   {Request} req
 * @param   {Response} res
 * @returns {Promise<Response>}
 */
export const ShareProject = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { projectId, expirationTime } = req.body;
    const projectServiceInstance = Container.get(ProjectService);
    const ServiceRes = await projectServiceInstance.ShareProject(
      projectId,
      req.user._id,
      expirationTime
    );
    return res.status(200).json(ServiceRes);
  }
);

/**
 * @route   GET api/shareProject/:Id
 * @desc    Get shared project
 * @access  Private
 * @param   {string} Id - Token ID
 * @returns {object} Project
 * @returns {object} Error
 */
export const GetSharedProject = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const SharedToken = req.header("shared-token");
    if (!SharedToken) {
      return res.status(401).json({ msg: "no token, authorization denied" });
    }
    const projectServiceInstance = Container.get(ProjectService);
    const ServiceRes = await projectServiceInstance.GetSharedProject(
      SharedToken
    );
    return res.status(200).json(ServiceRes);
  }
);

/**
 * @route   GET api/shareProject/:ProjectId
 * @desc Get Project Token
 * @access  Private
 * @param   {string} ProjectId - Project ID
 * @returns {object} Project Token
 */
export const GetProjectToken = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { ProjectId } = req.params;
    const projectServiceInstance = Container.get(ProjectService);
    const ServiceRes = await projectServiceInstance.GetProjectToken(
      ProjectId,
      req.user._id
    );
    return res.status(200).json(ServiceRes);
  }
);

/**
 * @route DELETE api/shareProject/:Id
 * @desc Delete a shared project
 * @access Private
 * @param {string} Id - Project ID
 * @returns {object} 200 - Success
 * @returns {Error}  404 - Bad request
 */
export const DeleteSharedProject = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { ProjectId } = req.params;
    const projectServiceInstance = Container.get(ProjectService);
    const ServiceRes = await projectServiceInstance.DeleteSharedProject(
      req.user._id,
      ProjectId
    );
    return res.status(200).json(ServiceRes);
  }
);
