import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env.local' });

export default defineConfig({
  schema: "./utils/schema",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_Jeqhv8GjgbH2@ep-noisy-sea-a4cdkwet-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require',
  },
  mode: "default",
} );

// export default {
//   schema: './utils/schema',
//   out: './drizzle',
//   driver: 'neon-http',
//   dbCredentials: {
//     connectionString: 'postgresql://neondb_owner:npg_Jeqhv8GjgbH2@ep-noisy-sea-a4cdkwet-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require',
//   }
// };

