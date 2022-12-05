import { Request } from "express";

export type params = {
  sort: string;
  filter: string;
  page: string;
  limit: string;
  select: string;
};

export type ParamsRequest = Request<{}, {}, {}, params>;

type defaultType = {
  filter: object;
  sort: object | string;
  select: string;
  page: number;
  limit: number;
};

export const GetParams = (
  query: Partial<params>,
  DefaultValue: Partial<defaultType>
) => {
  const { select, page, filter, limit, sort } = query;

  const NewObj = {
    select: select ? select : DefaultValue.select,
    filter: filter ? JSON.parse(filter) : DefaultValue.filter,
    sort: sort ? JSON.parse(JSON.stringify(sort)) : DefaultValue.sort,
    page: page ? parseInt(page) : (DefaultValue.page as number),
    limit: limit ? parseInt(limit) : (DefaultValue.limit as number),
  };
  return NewObj;
};
