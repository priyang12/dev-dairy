import asyncHandler from "express-async-handler";

import Container from "typedi";

import WorkSessionsService from "../../services/WorkSessionsService";
import type { Request, Response } from "express";
import NodeCache from "node-cache";

const WorkSessionCache = new NodeCache({ stdTTL: 600 });

/**
 * @route   GET api/WorkSessions
 * @desc    Get all WorkSessions
 * @access  Private
 * @returns Promise<WorkSessionsService[]>
 *
 */

export const GetWorkSessions = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const CacheKey = `User + ${req.user._id}`;
    if (WorkSessionCache.get(CacheKey)) {
      return res.status(200).json(WorkSessionCache.get(CacheKey));
    } else {
      const workSessionsServiceInstance = Container.get(WorkSessionsService);
      const workSessions = await workSessionsServiceInstance.GetWorkSessions(
        req.user._id
      );
      WorkSessionCache.set(CacheKey, workSessions, 3600 / 2);
      return res.status(200).json(workSessions);
    }
  }
);

/**
 * @route   GET api/WorkSessions/:id
 * @desc    Get WorkSessions by id
 * @access  Private
 * @param   id
 * @returns Promise<WorkSessionsService[]>
 */
export const GetWorkSession = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const CacheKey = `User + ${req.user._id} + Id + ${req.params.id}`;
    if (WorkSessionCache.get(CacheKey)) {
      return res.status(200).json(WorkSessionCache.get(CacheKey));
    } else {
      const workSessionsServiceInstance = Container.get(WorkSessionsService);
      const workSessions = await workSessionsServiceInstance.GetWorkSession(
        req.user._id,
        req.params.id
      );
      WorkSessionCache.set(CacheKey, workSessions, 3600 / 2);
      return res.status(200).json(workSessions);
    }
  }
);

/**
 * @route   GET api/WorkSessions/project/:projectId
 * @desc    Get WorkSessions by projectId
 * @access  Private
 * @param   projectId
 * @returns Promise<WorkSessionsService[]>
 */
export const GetProjectWorkSessions = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const CacheKey = `User + ${req.user._id} + projectId + ${req.params.projectId}`;
    if (WorkSessionCache.get(CacheKey)) {
      return res.status(200).json(WorkSessionCache.get(CacheKey));
    } else {
      const workSessionsServiceInstance = Container.get(WorkSessionsService);
      const workSessions =
        await workSessionsServiceInstance.GetProjectWorkSessions(
          req.user._id,
          req.params.projectId
        );
      WorkSessionCache.set(CacheKey, workSessions, 3600 / 2);
      return res.status(200).json(workSessions);
    }
  }
);

/**
 * @route   POST api/WorkSessions
 * @desc    Create WorkSessions
 * @access  Private
 * @param   req.body
 * @returns Promise<WorkSessionsService[]>
 * @throws 400 - ValidationError
 * @throws 500 - InternalServerError
 * @throws 401 - Unauthorized
 */

export const CreateWorkSession = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const workSessionsServiceInstance = Container.get(WorkSessionsService);
    const workSessions = await workSessionsServiceInstance.CreateWorkSession(
      req.user._id,
      req.params.projectId
    );
    return res.status(200).json(workSessions);
  }
);

/**
 * @route   PUT api/WorkSessions/:id
 * @desc    Update WorkSessions
 * @access  Private
 * @param   req.body
 * @returns Promise<WorkSessionsService[]>
 * @throws 400 - ValidationError
 * @throws 500 - InternalServerError
 * @throws 401 - Unauthorized
 */

export const PushWorkSession = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { Select } = req.query;
    if (Select && typeof Select !== "string") {
      return res.status(422).json({
        message: "Select must be a string",
      });
    }

    const workSessionsServiceInstance = Container.get(WorkSessionsService);
    const workSessions = await workSessionsServiceInstance.PushWorkSession(
      req.user._id,
      req.params.id,
      req.body,
      Select
    );
    WorkSessionCache.flushAll();
    return res.status(200).json(workSessions);
  }
);

/**
 * @route   PATCH api/WorkSessions/:id
 * @desc    DeleLe One WorkSession
 * @access  Private
 * @param   req.body
 * @returns Promise<WorkSessionsService[]>
 * @throws 400 - ValidationError
 * @throws 500 - InternalServerError
 * @throws 401 - Unauthorized
 */

export const PullWorkSession = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const workSessionsServiceInstance = Container.get(WorkSessionsService);

    const { Select } = req.query;
    if (Select && typeof Select !== "string") {
      return res.status(422).json({
        message: "Select must be a string",
      });
    }

    const workSessions = await workSessionsServiceInstance.PullWorkSession(
      req.user._id,
      req.params.id,
      req.body,
      Select
    );
    WorkSessionCache.flushAll();
    return res.status(200).json(workSessions);
  }
);

/**
 * @route   PUT api/WorkSessions/:id
 * @desc    Update WorkSessions
 * @access  Private
 * @param   req.body
 * @returns Promise<WorkSessionsService[]>
 * @throws 400 - ValidationError
 * @throws 500 - InternalServerError
 * @throws 401 - Unauthorized
 */

export const UpdateWorkSession = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const workSessionsServiceInstance = Container.get(WorkSessionsService);
    const workSessions = await workSessionsServiceInstance.UpdateWorkSession(
      req.user._id,
      req.params.id,
      req.body
    );
    WorkSessionCache.flushAll();
    return res.status(200).json(workSessions);
  }
);

/**
 * @route   DELETE api/WorkSessions/:id
 * @desc    Delete WorkSessions
 * @access  Private
 * @param   req.body
 * @returns Promise<WorkSessionsService[]>
 * @throws 400 - ValidationError
 * @throws 500 - InternalServerError
 * @throws 401 - Unauthorized
 **/
export const DeleteWorkSession = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const workSessionsServiceInstance = Container.get(WorkSessionsService);
    const workSessions = await workSessionsServiceInstance.DeleteWorkSession(
      req.user._id,
      req.params.id
    );
    WorkSessionCache.flushAll();
    return res.status(200).json(workSessions);
  }
);

/**
 * @route   DELETE api/WorkSessions
 * @desc    Delete All WorkSessions of User
 * @access  Private
 * @param   req.body
 * @returns Promise<WorkSessionsService[]>
 * @throws 400 - ValidationError
 * @throws 500 - InternalServerError
 * @throws 401 - Unauthorized
 **/
export const DeleteWorkSessions = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const workSessionsServiceInstance = Container.get(WorkSessionsService);
    const workSessions =
      await workSessionsServiceInstance.DeleteAllWorkSessions(req.user._id);
    WorkSessionCache.flushAll();
    return res.status(200).json(workSessions);
  }
);

/**
 * @route   DELETE api/WorkSessions/:id
 * @desc    Delete WorkSessions of Project
 * @access  Private
 * @param   req.body
 * @returns Promise<WorkSessionsService[]>
 * @throws 400 - ValidationError
 * @throws 500 - InternalServerError
 * @throws 401 - Unauthorized
 **/

export const DeleteWorkSessionsOfProject = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const workSessionsServiceInstance = Container.get(WorkSessionsService);
    const workSessions =
      await workSessionsServiceInstance.DeleteAllWorkSessionsForProject(
        req.user._id,
        req.params.projectId
      );
    WorkSessionCache.flushAll();
    return res.status(200).json(workSessions);
  }
);
