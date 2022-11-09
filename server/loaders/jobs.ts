import { MailDefinition } from "../jobs/definitions";
import Agenda from "agenda";

export default ({ agenda }: { agenda: Agenda }) => {
  MailDefinition(agenda);
  agenda.start();
};
