// vue.config.js
module.exports = {
    // 选项...
    devServer: {
        port: 9000,
        proxy: {
            '/api': {
                target: 'https://api.douban.com/v2',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
