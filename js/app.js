'use strict'

let imageData = [];
let uniqueElements = [];

const Image = function(img, title, desc, keyword, horns) {
    this.img = img;
    this.title = title;
    this.desc = desc;
    this.keyword = keyword;
    this.horns = horns;
    imageData.push(this);
};

Image.prototype.renderWithHandlebars = function() {
    // console.log('here');
    let $myTemplateHtml = $('#entry-template').html();
    // console.log($myTemplateHtml)
    const renderImageWithHandlebars = Handlebars.compile($myTemplateHtml);
    // console.log(renderImageWithHandlebars)
    const imageHtml = renderImageWithHandlebars(this);
    $('main').append(imageHtml);
}
let makePage = function(pageURL) {
    imageData = [];
    $(`main`).html('');
    $.get(pageURL).then(data => {
        data.forEach(eachImage => {
            new Image(
                eachImage.image_url,
                eachImage.title,
                eachImage.description,
                eachImage.keyword,
                eachImage.horns);
        });
        console.log(imageData);

        imageData.forEach(image => {
            image.renderWithHandlebars();
        })
        renderDropdown();
    });
}

//found @ https://www.codebyamir.com/blog/populate-a-select-dropdown-list-with-json


let renderDropdown = function() {
    uniqueElements = [];

    // Create new empty array, to fill with only 1 copy of each unique element

    let dropdown = $('select');

    dropdown.empty();
    dropdown.append('<option selected="true" disabled>Filter by Keyword</option>');

    dropdown.prop('selectedIndex', 0);

    // consider using js Set for unique list
    // consider using js filter
    // consider using js indexOf

    imageData.forEach(image => {

        // This is the test for determining wether the element is unique, before passing into the uniqueElements array.
        let uniqueFlag = true;

        // This passes over the new array, and lets us check if the keyword is already in the array, if it is, that changes the flag, and prevents appending to the dropdown.
        uniqueElements.forEach(uniqueImage => {
            if (image.keyword === uniqueImage) {
                uniqueFlag = false;
            }
        })

        // This lets us append the element if the uniqueFlag variable is true, allowing us to only populate the dropdown with unique elements.
        if (uniqueFlag) {
            dropdown.append($('<option></option>').attr('value', image.keyword).text(image.keyword));
            uniqueElements.push(image.keyword);
        }
    })
};

$('#drop-down').on('change', function() {
    $('section').hide();
    const keyword = $('#drop-down option:selected').text();
    $(`img[alt=${keyword}]`).parent().show();
})

$('#page1').on('click', function() {
    makePage('data/page-1.json');
    renderDropdown();
})

$('#page2').on('click', function() {
    makePage('data/page-2.json');
    renderDropdown();
})

makePage('data/page-1.json');