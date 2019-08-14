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
    renderDropdown();
});

//found @ https://www.codebyamir.com/blog/populate-a-select-dropdown-list-with-json


let renderDropdown = function() {

    let dropdown = $('select');

    dropdown.empty();
    dropdown.append('<option selected="true" disabled>Filter by Keyword</option>');

    dropdown.prop('selectedIndex', 0);

    // Populate dropdown with list of provinces
    imageData.forEach(image => {
        dropdown.append($('<option></option>').attr('value', image.keyword).text(image.keyword));
    })
};
// let dropdown = $('#locality-dropdown');

// dropdown.empty();

// dropdown.append('<option selected="true" disabled>Choose State/Province</option>');
// dropdown.prop('selectedIndex', 0);

// const url = 'https://api.myjson.com/bins/7xq2x';

// // Populate dropdown with list of provinces
// $.getJSON(url, function (data) {
//   $.each(data, function (key, entry) {
//     dropdown.append($('<option></option>').attr('value', entry.abbreviation).text(entry.name));
//   })
// });