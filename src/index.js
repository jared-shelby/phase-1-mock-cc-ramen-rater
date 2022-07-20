// constants
const ramenMenu = document.getElementById("ramen-menu");
const ramenDetail = document.getElementById("ramen-detail");
const ramenForm = document.getElementById("new-ramen");

// render ramen object in top bar w/ display-details functionality
function renderRamen(ramen) {
    // display image within top bar
    let newImg = document.createElement("img");
    newImg.src = ramen.image;
    ramenMenu.appendChild(newImg);

    // add event listener so that on click, details are displayed
    newImg.addEventListener("click", event => {
        ramenDetail.querySelector(".detail-image").src = ramen.image;
        ramenDetail.querySelector(".name").innerHTML = ramen.name;
        ramenDetail.querySelector(".restaurant").innerHTML = ramen.restaurant;
        document.getElementById("rating-display").innerHTML = ramen.rating;
        document.getElementById("comment-display").innerHTML = ramen.comment;
    });
}

// render all ramens upon load
fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(data => data.forEach(ramen => renderRamen(ramen)));

// create new ramen upon submitting form
ramenForm.addEventListener("submit", event => {
    // form should not submit/refresh the page
    event.preventDefault();

    // add details to new ramen object
    let newRamenObj = {
        name: ramenForm.name.value,
        restaurant: ramenForm.restaurant.value,
        image: ramenForm.image.value,
        rating: ramenForm.rating.value,
        comment: ramenForm.comment.value
    };

    // create configuration object for post request
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newRamenObj)
    };

    // create new ramen & persist to db
    fetch("http://localhost:3000/ramens", configObj)
        .then(response => response.json())
        .then(data => renderRamen(data));
});
