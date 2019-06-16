const livescript = require('livescript')
const { createFilter } = require('rollup-pluginutils')
const { extname } = require('path')

module.exports = (options = {}) => {
    options = {
        bare: true,
        header: true,
        const: false,
        json: false,
        warn: true,
        map: 'linked',
        sourceMap: true,
        extensions: ['.ls'],
        ...options
    }
    const filter = createFilter(options.include, options.exclude)
    return {
        transform(code, id) {
            if (!filter(id) || options.extensions.indexOf(extname(id)) === -1) {
                return null
            } else {
                options = { filename: id, outputFilename: id.replace(/\.ls$/,'.js'), ...options }
                const output = livescript.compile(code, options)
                return {
                    code: output.code,
                    map: output.map.toString()
                }
            }
        }
    }
}
