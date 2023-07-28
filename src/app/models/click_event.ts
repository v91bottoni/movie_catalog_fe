import { user } from "./user";

export interface Click_event{
  id: number;
  event_type: string;
  event_date: Date;
  event_user: user;

}
