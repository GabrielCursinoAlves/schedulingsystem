export function cronPatternRecurrence(recurrence_pattern: string){
  return (recurrence_pattern.match(/\*/g) || []).length == 6 ? true : false;
}