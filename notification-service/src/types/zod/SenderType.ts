export type SenderType = {
  success: boolean,
  errorMessage?: {
    status?: number | undefined,
    timestamp?: Date,
    attempt?: number,
    message: string
  }
};