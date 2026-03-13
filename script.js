let selectedProduct = null;

const products = {
1: { name: "Aesthetic Poster", price: 299 },
2: { name: "Women Printed Kurta", price: 799 }
};

function buyProduct(id){
    selectedProduct = products[id];
    document.getElementById('shippingForm').style.display = 'block';
}

function proceedPayment(){
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;

    if(!name || !phone || !address || !city || !pincode){
        alert("Please fill all fields");
        return;
    }

    var options = {
        "key": "https://razorpay.me/@abhishekerri",
        "amount": selectedProduct.price*100,
        "currency": "INR",
        "name": "BM Stores",
        "description": selectedProduct.name,
        "handler": function (response){
            alert("Payment Successful!");
            sendOrderEmail(name, phone, address, city, pincode, selectedProduct.name);
        }
    };
    var rzp = new Razorpay(options);
    rzp.open();
}

function sendOrderEmail(name, phone, address, city, pincode, product){
    emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{
        customer_name:name,
        customer_phone:phone,
        customer_address:address,
        customer_city:city,
        customer_pincode:pincode,
        product_name:product
    });
}
