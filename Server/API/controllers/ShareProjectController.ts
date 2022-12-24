import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import ProjectService from "../../services/ShareProjectService";
import Container from "typedi";
import NodeCache from "node-cache";

const ShareProjectCache = new NodeCache({ stdTTL: 600 });

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
    return res.status(201).json(ServiceRes);
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
    const CacheKey = `Token + ${SharedToken}` + req.user._id;
    if (ShareProjectCache.get(CacheKey)) {
      const CacheResponse = ShareProjectCache.get(CacheKey) as string;
      return res.status(201).json(JSON.parse(CacheResponse));
    } else {
      const projectServiceInstance = Container.get(ProjectService);
      const ServiceRes = await projectServiceInstance.GetSharedProject(
        SharedToken
      );
      ShareProjectCache.set(CacheKey, JSON.stringify(ServiceRes), 3600 / 2);
      return res.status(201).json(ServiceRes);
    }
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

    const CacheKey = `user + ${req.user._id} + Id + ${ProjectId}`;
    if (ShareProjectCache.get(CacheKey)) {
      return res.status(201).json(ShareProjectCache.get(CacheKey));
    } else {
      const projectServiceInstance = Container.get(ProjectService);
      const ServiceRes = await projectServiceInstance.GetProjectToken(
        ProjectId,
        req.user._id
      );
      ShareProjectCache.set(CacheKey, ServiceRes, 3600 / 2);
      return res.status(200).json(ServiceRes);
    }
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
    ShareProjectCache.flushAll();
    return res.status(200).json(ServiceRes);
  }
);
