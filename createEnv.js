const fs = require('fs')
fs.writeFileSync('./.env', `MONGO_KEY=${process.env.MONGO_KEY}\n`);