import z from "zod";

export const SchemaCreateSystem = {
   schema: {
    body: z.object({
      payload: z.array(
        z.object({
          type: z.string().min(8),
          user_id: z.uuid(),
          message: z.string().min(20)
        })
      ),
      run_at: z.coerce.date(),
      recurrence_pattern: z.string(),
      is_recurring: z.boolean()
    })
  },
}