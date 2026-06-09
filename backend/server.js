import { app } from "./src/app.js";
import { connectDB } from "./src/config/database.js";
import { config_ENV } from "./src/config/config.js";
import { verifyMailConnection } from "./src/config/mail.config.js";

connectDB()
    .then(async () => {
        await verifyMailConnection();
        app.listen(config_ENV.PORT, () => {
            console.log(`Server running on port ${config_ENV.PORT}`);
        });
    })
    .catch((error) => {
        console.log("Server failed:", error.message);
    });