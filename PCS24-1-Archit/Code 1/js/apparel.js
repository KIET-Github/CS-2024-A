function loadCSVAndSearchUID(uid) {
    uid = uid || '0101';

    Papa.parse('../csv/product_data.csv', {
        download: true,
        header: true,
        complete: function (results) {
            const data = results.data;
            const matchingProduct = data.find((product) => product.uid === uid);

            if (matchingProduct) {
                document.getElementById('product-name').textContent = matchingProduct.Product_Name;
                document.getElementById('retailer-name').textContent = matchingProduct.Retailer_Name;
                document.getElementById('brand-name').textContent = matchingProduct.Brand_Name;
                document.getElementById('batch-name').textContent = matchingProduct.Batch_Name;

                const imageName = matchingProduct.photo_name;
                const imagePath = '../images/apparel/' + imageName;
                document.getElementById('apparel-pic').src = imagePath;

                const soldStatus = matchingProduct['sold-status'];
                const soldStatusButton = document.getElementById('sold-status-button');
                soldStatusButton.innerHTML = soldStatus;
                soldStatusButton.className = 'sold-status ' + soldStatus.toLowerCase();

                document.getElementById('p-id').value = uid;
                document.getElementById('p-name').value = matchingProduct.Product_Name;
            } else {
                window.location.href = '../pages/error.html';
            }
        },
    });
}

const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get('uid');
document.getElementById('uid-input').value = uid || '0101';

window.onload = function () {
    document.getElementById('generateButton').click();
};

document.getElementById('generateButton').addEventListener('click', function () {
    loadCSVAndSearchUID(uid);
});

function handleStarRating(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

const starElements = document.querySelectorAll('.star');
starElements.forEach((star) => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-value'));
        handleStarRating(rating);
        console.log('Selected Rating:', rating);
    });
});


document.getElementById('p-id').disabled = true;
document.getElementById('p-name').disabled = true;