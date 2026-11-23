import { Channel, ConfirmChannel } from "amqplib";

export interface Waiter {
  resolve: (channel: Channel) => void,
  reject: (error: unknown) => void
};

export interface WaiterConfirm {
  resolve: (channelConfirm: ConfirmChannel) => void,
  reject: (error: unknown) => void
}