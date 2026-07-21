import { Channel } from "amqplib";

export interface Waiter {
  resolve: (channel: Channel) => void,
  reject: (error: unknown) => void
};