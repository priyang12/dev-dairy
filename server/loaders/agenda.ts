import Agenda from "agenda";
import config from "../config/keys";

export default ({ mongoConnection }: any) => {
  const agenda = new Agenda({
    mongo: mongoConnection,
    db: {
      collection: config.agenda.dbCollection,
      address: config.mongoURL as string,
    },
    processEvery: config.agenda.pooltime,
    maxConcurrency: parseInt(process.env.AGENDA_CONCURRENCY as string, 10),
  });

  agenda
    .on("ready", () => console.log("Agenda started!"))
    .on("error", () => console.log("Agenda connection error!"));

  return agenda;
};
