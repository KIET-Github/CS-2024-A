$(document).ready(function () {
    $("#getDataBtn").click(function () {
        // Make an AJAX request to the server when the button is clicked
        $.ajax({
            url: '/add_admin',
            type: 'POST',
            success: function (response) {
                // Handle the response from the server
                
                var respJSON = JSON.parse(response)
                console.log(respJSON)
                alert(respJSON[0].emp_id)
               console.log(respJSON[0].emp_id);
            },
            error: function (error) {
                alert(2)
                console.error(error);
            }
        });
    });
});
