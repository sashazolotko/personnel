module.exports = {
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel'}
        ]
    }
};