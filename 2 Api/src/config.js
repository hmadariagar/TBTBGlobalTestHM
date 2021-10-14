import { config } from "dotenv";

config();

export default{
    PORT:process.env.PORT || 3000,
    user:process.env.user || "",
    password:process.env.password || "",
    server:process.env.server || "",
    database:process.env.database || "",
}
