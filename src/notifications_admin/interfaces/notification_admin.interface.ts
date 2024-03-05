import { TypeNotification } from "../notifications_admin-status.enum";

export class INotificationAdmin {

    sensor: string;
    type: TypeNotification;
    value_limite: Number;
    emails: Array<string>;

}