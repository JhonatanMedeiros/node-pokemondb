const path = require('path');
const fs = require('fs');


class Database {

  async saveToJson(filename, list) {
    const filePath = path.resolve('./database', filename);
    await fs.writeFile(filePath, JSON.stringify(list, null, 2), (err) => {
      if (err) {
        console.error('[DATABASE] - Error:', err)
        throw err;
      }
      console.log('[DATABASE] - File Saved:', filename);
    });
  }

}

module.exports = Database;
