import { Container } from "typedi";
import LoggerInstance from "./logger";
import agendaFactory from "./agenda";
import sgMail from "@sendgrid/mail";
import keys from "../config/keys";

export default ({
  mongoConnection,
  models,
}: {
  mongoConnection: any;
  models: { name: string; model: any }[];
}) => {
  try {
    models.forEach((m) => {
      Container.set(m.name, m.model);
    });

    const agendaInstance = agendaFactory({ mongoConnection });
    if (keys.sendGrid) sgMail.setApiKey(keys.sendGrid);
    else LoggerInstance.error("Key not Found");

    Container.set("agendaInstance", agendaInstance);
    Container.set("logger", LoggerInstance);
    Container.set("sgMail", sgMail);

    LoggerInstance.info("✌️ Agenda injected into container");

    return { agenda: agendaInstance };
  } catch (e) {
    LoggerInstance.error("🔥 Error on dependency injector loader: %o", e);
    throw e;
  }
};
