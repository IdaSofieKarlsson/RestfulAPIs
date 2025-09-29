# Swedish Pastries Bakery Management System


## Description
This project manages inventory for a bakery specializing in Swedish pastries.


## Zod Schema Explanation
- `PastrySchema`: Validates the structure of pastry objects, ensuring each has an 'id', 'name', and 'price'.
  - Example:
  ```typescript
  const PastrySchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number()
  });
