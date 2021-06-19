const chalk = require('chalk')
const app = require('./src/app')
const PORT = process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log(chalk.green(`Server Run on PORT:${PORT}`))
})