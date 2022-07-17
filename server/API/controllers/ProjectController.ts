import asyncHandler from "express-async-handler";

import { validationResult } from "express-validator";

import type { Request, Response } from "express";

import ProjectService from "../../services/ProjectsService";
import Container from "typedi";
import { IProject } from "../../models/Project";

// @route   GET api/projects
// @desc    Fetch User Projects
// @access  Private
export const GetProjects = asyncHandler(
  async (req: any, res: Response): Promise<any> => {
    const projectServiceInstance = Container.get(ProjectService);
    const projects = await projectServiceInstance.GetUserProjects(req.user._id);
    return res.status(200).json(projects);
  }
);

// @router GET api/projects/:id
// @desc Get project by id
// @access Private
export const GetProjectById = asyncHandler(
  async (req: any, res: Response): Promise<any> => {
    const projectServiceInstance = Container.get(ProjectService);
    const project = await projectServiceInstance.GetProject(
      req.user._id,
      req.params.id
    );
    return res.status(200).json(project);
  }
);

// @router GET api/projects/:id/roadMap
// @desc Get project by id
// @access Private
export const GetRoadMapProjectById = asyncHandler(
  async (req: any, res: Response): Promise<any> => {
    const projectServiceInstance = Container.get(ProjectService);
    const { roadMap }: IProject = await projectServiceInstance.GetRoadMaps(
      req.user._id,
      req.params.id
    );
    return res.status(200).json(roadMap);
  }
);

// @router POST api/projects
// @desc Create Project
// @access Private
export const CreateProject = asyncHandler(
  async (req: any, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }
    const projectServiceInstance = Container.get(ProjectService);
    const message = await projectServiceInstance.PostProject(
      req.user._id,
      req.body
    );
    return res.status(201).json(message);
  }
);

// @router PUT api/projects/:id
// @desc Update Project
// @access Private
export const UpdateProject = asyncHandler(
  async (req: any, res: Response): Promise<any> => {
    const projectServiceInstance = Container.get(ProjectService);
    const message = await projectServiceInstance.UpdateProject(
      req.user._id,
      req.params.id,
      req.body
    );
    return res.status(200).json(message);
  }
);

// @router PUT api/projects/:id/roadMap
// @desc Add  New RoadMap
// @access Private
export const AddRoadMap = asyncHandler(
  async (req: any, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }
    const projectServiceInstance = Container.get(ProjectService);
    const message = await projectServiceInstance.AddRoadMap(
      req.user._id,
      req.params.id,
      req.body
    );
    return res.status(200).json(message);
  }
);

// @router PATCH api/projects/:id/roadMap
// @desc Add  New RoadMap
// @access Private
export const EditRoadMap = asyncHandler(
  async (req: any, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }
    const projectServiceInstance = Container.get(ProjectService);
    const message = await projectServiceInstance.EditRoadMap(
      req.user._id,
      req.params.id,
      req.body
    );
    return res.status(200).json(message);
  }
);

// @router DELETE api/projects/:id/roadMap/delete
// @desc delete  New RoadMap
// @access Private
export const DeleteRoadMap = asyncHandler(
  async (req: any, res: Response): Promise<any> => {
    const projectServiceInstance = Container.get(ProjectService);
    const message = await projectServiceInstance.DeleteRoadMap(
      req.user._id,
      req.params.id,
      req.body
    );
    return res.status(200).json(message);
  }
);

// @router DELETE api/projects/:id
// @desc Delete Project
// @access Private
export const DeleteProject = asyncHandler(
  async (req: any, res: Response): Promise<any> => {
    const projectServiceInstance = Container.get(ProjectService);
    const message = await projectServiceInstance.DeleteProject(
      req.user._id,
      req.params.id
    );
    return res.status(200).json(message);
  }
);
