(function() {
    // fix VH mobile bug that recalcs VH on navigation bar hide/show
    var background;
    if (background = document.getElementById('bg')) {
        var style = window.getComputedStyle(background);
        var height = style.getPropertyValue('min-height');
        bg.style.minHeight = height;
    }    
})();

if(typeof console === 'object') {
    console.log(
        '%c\n' +
        'Hello there! Thanks for visiting.\n' +
        '%c\nFound an issue? Found something cool?\n' +
        'Let me now! %chttps://twitter.com/fstiehle\n\n',
        'color: #FFDB5C; font-size: 18px;',
        'color: #ccc; font-size: 14px;',
        'text-decoration:underline;'
    );
}
