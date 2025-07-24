import { PORT } from "./config/envs";
import server from "./server";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
.then(res => {
    console.log("Conexión exitosa a la BDD");
    server.listen(PORT, () => {
    console.log(`Listening server on http://localhost:${PORT}`);
});
})
.catch (error => console.log(error));