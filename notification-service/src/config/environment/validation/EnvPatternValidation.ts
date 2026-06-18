
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