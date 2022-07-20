// constants
const ramenMenu = document.getElementById("ramen-menu");
const ramenDetail = document.getElementById("ramen-detail");
const ramenForm = document.getElementById("new-ramen");
const ramenOptions = document.getElementById("ramen-options");

// display ramen details
function displayRamen(ramen, display) {
    ramenDetail.querySelector(".detail-image").src = ramen.image;
    ramenDetail.querySelector(".name").innerHTML = ramen.name;
    ramenDetail.querySelector(".restaurant").innerHTML = ramen.restaurant;
    document.getElementById("rating-display").innerHTML = ramen.rating;
    document.getElementById("comment-display").innerHTML = ramen.comment;
    
    // add event listener so that on button click, ramen is deleted
    ramenOptions.innerHTML = `<h3>Options:</h3> <button id="delete-btn">Delete this ramen</button>`
    let deleteBtn = document.getElementById("delete-btn");
    deleteBtn.addEventListener("click", () => {
        deleteRamen(ramen);
        display.remove();
    });
}

// delete a ramen
function deleteRamen(ramen) {
    let configObj = {
        method: "DELETE"
    };

    fetch(`http://localhost:3000/ramens/${ramen.id}`, configObj)
        .then(response => response.json())
}

// render ramen object in top bar w/ display-details functionality
function renderRamen(ramen) {
    // display image within top bar
    let newImg = document.createElement("img");
    newImg.src = ramen.image;
    ramenMenu.appendChild(newImg);

    // add event listener so that on click, details are displayed
    newImg.addEventListener("click", event => displayRamen(ramen, newImg));
}

// render all ramens & display first one upon load 
function renderAllRamens() {
    fetch("http://localhost:3000/ramens")
        .then(response => response.json())
        .then(data => {
            displayRamen(data[0]);
            data.forEach(ramen => renderRamen(ramen))
        });
}

// create new ramen upon submitting form
function listenForNewRamen() {
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
}

document.addEventListener('DOMContentLoaded', () => {
    renderAllRamens();
    listenForNewRamen();
});
