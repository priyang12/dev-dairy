// @ts-nocheck

import Agenda from "agenda";
import config from "../config/keys";

export default ({ mongoConnection }: any) => {
  return new Agenda({
    mongo: mongoConnection,
    db: { collection: config.agenda.dbCollection, address: config.mongoURL },
    processEvery: config.agenda.pooltime,
    maxConcurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  });
};
