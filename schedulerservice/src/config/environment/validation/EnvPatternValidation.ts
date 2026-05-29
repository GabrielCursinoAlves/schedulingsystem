
import { SignOptions } from "jsonwebtoken";
import "../config.js";

export function required(name: string): string{
  const enValue = process.env[name];
  if(!enValue){
    throw new Error(`missing field ${enValue}`);
  }

  return enValue;
}

export function toExpires(name: string): SignOptions["expiresIn"] {
  const enValue = process.env[name];

  if(!enValue){
    throw new Error(`missing field ${enValue} not standard expire.`);
  }
  
  return enValue as SignOptions["expiresIn"];
}

export function toNumber(name: string): number {
  const enValue = Number(process.env[name]);
  
  if(isNaN(enValue)){
    throw new Error(`missing field ${enValue} not is number`);
  }

  return enValue;
}