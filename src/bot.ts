import { config } from "dotenv";
config();

import osloClient from "./client/olsoClient";
const client = new osloClient({ owners: ["304986851310043136"] });
client.start();
