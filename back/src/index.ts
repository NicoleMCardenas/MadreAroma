import { PORT } from "./config/envs";
import server from "./server";

//*LEVANTAR SERVIDOR
server.listen(PORT, () => {
    console.log(`Listening server on http://localhost:${PORT}`)
});
