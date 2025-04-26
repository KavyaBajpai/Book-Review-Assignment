import { drizzle } from "drizzle-orm/neon-http";

import { neon, neonConfig } from '@neondatabase/serverless';
import { config } from "dotenv";
import * as schema from "./schema/index.js"; 
neonConfig.fetchConnectionCache = true;
config({ path: ".env.local" }); 


const sql = neon('postgresql://neondb_owner:npg_Jeqhv8GjgbH2@ep-noisy-sea-a4cdkwet-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require');
export const db = drizzle({ client: sql, schema });
