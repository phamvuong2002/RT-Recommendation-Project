const app = require("./src/app");
const mongoose = require("mongoose");
const {
  app: { port },
} = require("./src/v1/configs/config");

const PORT = port || 3055;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port::${PORT}`);
});

// CTRL-C server close
process.on("SIGINT", () => {
  server.close(() => {
    console.log(`Exit Server Express`);
    if (mongoose) {
      mongoose.disconnect().then((_) => {
        console.log("Disconnected with mongoDB ");
      });
    }
    //notify when have crashes
  });
});
