const livescript = require('../index.js')
export default {
    input: 'index.ls',
    output: {
        format: 'esm',
        file: 'index.js'
    },
    plugins: [livescript()]
}
