// noinspection JSUnresolvedVariable
(function ($) {
    $(function () {
        $(".masonry-grid").isotope({
            layoutMode: 'packery',
            itemSelector: '.grid-item',
            percentPosition: true,
            packery: {
                columnWidth: ".grid-sizer",
                gutter: 15
            }
        });
    });
})(jQuery);