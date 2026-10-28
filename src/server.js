import app from "./app.js";
import { port } from "./config/env.js";
import { verificarConexao } from "./infrastructure/mysql.js";

verificarConexao()
    .then(() => app.listen(port, () => console.log(`GT Store API está disponível em: http://localhost:${port}`)))
    .catch((erro) => {
        console.log('Não possível inicializar a aplicação', erro);
        process.exitCode = 1;
    });