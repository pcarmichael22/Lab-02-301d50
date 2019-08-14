'use strict'

const imageData = [];
let uniqueElements = [];

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

    // Create new empty array, to fill with only 1 copy of each unique element

    let dropdown = $('select');

    dropdown.empty();
    dropdown.append('<option selected="true" disabled>Filter by Keyword</option>');

    dropdown.prop('selectedIndex', 0);

    // Populate dropdown with list of provinces

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


// function test() {
//     console.log('click');
// }

// $('select option:selected').change('click', test);
// let test = $('select option:selected').val();

$(function() {
    let optionItems = $('select');
    optionItems.on('click', function() {
        console.log('you clicked ' + this.value)

        // let userClicked = this.value;
        let userClicked = '';

        for (let i = 0; i < uniqueElements.length; i++) {
            if (this.value === uniqueElements[i]) {
                userClicked = uniqueElements[i];
            }
        }
        console.log(userClicked);

    })
})