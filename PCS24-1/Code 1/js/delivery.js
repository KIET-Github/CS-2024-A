document.getElementById('delivery-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const retailerId = document.getElementById('retailer-id').value;
    const boxNumber = document.getElementById('box-number').value;

    alert(`Retailer ID: ${retailerId}, Box Number: ${boxNumber}`);
});
