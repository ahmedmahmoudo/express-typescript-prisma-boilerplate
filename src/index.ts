import express from "express";
import cors from "cors";
import routes from "@src/routes";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(`API running on ${PORT}`);
});
