const fs = require('fs')
fs.writeFileSync('./.env', `API_KEY=${process.env.MONGO_KEY}\n`);