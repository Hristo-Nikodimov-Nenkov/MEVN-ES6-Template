module.exports = {
    outputDir: './../server/public',
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:9000',
                ws: true,
                changeOrigin: true
            }
        }
    }
}
