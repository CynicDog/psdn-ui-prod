const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8888;

/* TODO: DEVELOPMENT ONLY */
/**
 * @description Implement a mock data serving server for development environment
 *
 * @example
 *      http http://localhost:8888/meta/business/PSDN-master
 *      http http://localhost:8888/meta/business/PSDN-code
 *      http http://localhost:8888/meta/table/T1
 *      http http://localhost:8888/user/JohnDoe/projects
 */
app.get("/*", (req, res) => {
    const filePath = path.join(__dirname, "data", req.path)  + ".json"

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: "File not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
