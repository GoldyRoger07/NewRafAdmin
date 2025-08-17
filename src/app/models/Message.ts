import { Compte } from "./Compte";

export class Message{
    constructor(
        public id = 0,
        public title = "",
        public content = "",
        public sender: Compte,
        public receiver: Compte,
        public createdAt = new Date(),
        public receiverType:"AGENTS"|"USERS"|"BOTH"|"USER" = "USER",
        public type: "EMAIL"|"PUSH"|"BOTH" = "BOTH",
        public status: "SENT"|"RECEIVE"|"READ" = "SENT",
    ){}
}