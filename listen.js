const app = require("./db/app");
<<<<<<< HEAD
app.listen(9090);
=======
const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
>>>>>>> a7fb89737bd8684641032255bca8c8c59eabb21f
