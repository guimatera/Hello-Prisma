import app from "./index";

import router from './routes/routes';

const port = Number(process.env.PORT);

try {
    app.listen(port, () => console.log(`Server ready at: http://localhost:${port}`));
}
catch (error){
    console.error(error);
    process.exit();
}
