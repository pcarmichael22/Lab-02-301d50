'use strict'

const imageData = [];

const Image = function(img, title, desc, keyword, horns) {
    this.img = img;
    this.title = title;
    this.desc = desc;
    this.keyword = keyword;
    this.horns = horns;
    imageData.push(this);
};

Image.prototype.renderWithJquery = function() {
    const $myTemplateHtml = $('#photo-template').html();

    const $newSection = $('<section></section>');

    $newSection.html($myTemplateHtml);

    $newSection.find('h2').text(this.title);
    $newSection.find('img').attr('src', this.img);
    $newSection.find('p').text(this.desc);

    $('main').append($newSection);

};

$.get('data/page-1.json').then(data => {
    data.forEach(eachImage => {
        new Image(
            eachImage.image_url,
            eachImage.title,
            eachImage.description,
            eachImage.keyword,
            eachImage.horns);

    });
    imageData.forEach(image => {
        image.renderWithJquery();
    })
});