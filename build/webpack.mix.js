let mix = require('laravel-mix');

mix.webpackConfig({
    externals: {
        jquery: "jQuery",
        bootstrap: true
    }
});

mix.setResourceRoot('./');
mix.setPublicPath('../');

mix
    .sass('assets/blocks/masonry_grid/scss/view.scss', 'blocks/gallery/templates/masonry_grid/view.css')
    .js('assets/blocks/masonry_grid/js/view.js', 'blocks/gallery/templates/masonry_grid/view.js')
