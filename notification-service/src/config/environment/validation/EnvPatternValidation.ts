
import "../config.js";

export function required(name: string): string {
  const enValue = process.env[name];

  if(!enValue){
    throw new Error(`missing field: ${name} - ${enValue}`);
  }

  return enValue;
}

export function toNumber(name: string): number {
  const enValue = Number(process.env[name]);
  
  if(isNaN(enValue)) {
    throw new Error(`missing field ${enValue} not is number`);
  }

  return enValue;
}

export function toEmail(name: string): string {
  const enValue = process.env[name];
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if(!enValue || !emailPattern.test(enValue)) {
    throw new Error(`missing field ${enValue} not is email`);
  }

  return enValue;
}