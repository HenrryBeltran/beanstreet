import { app } from "./main.js";

const port = process.env.PORT ?? 3500;

app.listen(port, () => console.log(`~ Running on http://localhost:${port}`));
