const fs = require("fs");
const path = require("path");

const directoryPath =
  "C:/Users/laser/AppData/Roaming/.minecraft/saves/Random Item/datapacks/laser DP - 30sec/data/minecraft/loot_tables/blocks";
const newValue = {
  type: "minecraft:block",
  pools: [
    {
      rolls: 1,
      entries: [
        {
          type: "minecraft:loot_table",
          name: "sec:item",
        },
      ],
    },
  ],
}; // replace with the new object you want to use
fs.readdir(directoryPath, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (path.extname(file) === ".json") {
      const filePath = path.join(directoryPath, file);

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) throw err;

        const json = newValue;

        fs.writeFile(filePath, JSON.stringify(json), (err) => {
          if (err) throw err;
          console.log(`Changed ${file}`);
        });
      });
    }
  });
});
