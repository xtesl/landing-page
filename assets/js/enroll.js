function finishPayment() {
    const screenshot = document.getElementById('paymentScreenshot').files[0];
    // Perform validation or upload to server
    console.log('Payment screenshot uploaded:', screenshot.name);
    alert('Payment completed! You are now enrolled in the course.');
}
