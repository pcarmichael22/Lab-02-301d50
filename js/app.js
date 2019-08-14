'use strict'

const imageData = [];

const Image = function(img, title, desc, keyword, horns) {
    this.img = img;
    this.title = title;
    this.desc = desc;
    this.keyword = keyword;
    this.horns = horns;
    imageData.push(this);
}

Image.prototype.renderWithJquery = function() {
    const $myTemplateHtml = $('#photo-template').html();

}

$.get('data/page-1.json').then(data => {
    data.forEach(eachImage => {
        new Image(
            eachImage.image_url,
            eachImage.title,
            eachImage.description,
            eachImage.keyword,
            eachImage.horns);
    });
    imageData[0].renderWithJquery();
});