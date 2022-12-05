import { Greet, ResetPassword } from "./handlers";
import Agenda from "agenda";
import config from "../config/keys";

export const MailDefinition = (agenda: Agenda) => {
  agenda.define(
    "greet",
    {
      priority: 20,
      concurrency: config.agenda.concurrency,
    },
    Greet
  );
  agenda.define(
    "reset-password",
    {
      priority: 5,
      concurrency: config.agenda.concurrency,
    },
    ResetPassword
  );
};
