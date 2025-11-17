// Get receipt date from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const receiptDate = urlParams.get('date');

if (!receiptDate) {
    window.location.href = 'receipts.html';
} else {
    const receipt = getReceiptByDate(receiptDate);
    
    if (!receipt) {
        window.location.href = 'receipts.html';
    } else {
        displayReceiptDetail(receipt);
    }
}

function displayReceiptDetail(receipt) {
    const receiptDiv = document.getElementById('receiptDetail');
    
    // Format dates for display
    const arrivalFormatted = new Date(receipt.arrival).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const departureFormatted = new Date(receipt.departure).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    receiptDiv.innerHTML = `
        <div class="receipt-header">
            <h2 style="color: #2F80ED;">✅ Transaction Completed!</h2>
            <p style="color: #1A1A1A; margin-top: 10px;">Your parking space has been reserved</p>
        </div>
        
        <h3 style="color: #2F80ED; margin-bottom: 15px;">Receipt</h3>
        
        <div class="receipt-item">
            <strong>Parking:</strong>
            <span>${receipt.parking_name}</span>
        </div>
        
        <div class="receipt-item">
            <strong>License Plate:</strong>
            <span>${receipt.plate}</span>
        </div>
        
        <div class="receipt-item">
            <strong>Arrival:</strong>
            <span>${arrivalFormatted}</span>
        </div>
        
        <div class="receipt-item">
            <strong>Departure:</strong>
            <span>${departureFormatted}</span>
        </div>
        
        <div class="receipt-item" style="border-bottom: 2px solid #02A2A2; padding-bottom: 15px;">
            <strong>Duration:</strong>
            <span>${receipt.duration}</span>
        </div>
        
        <div class="receipt-item" style="font-size: 1.2em; margin-top: 15px;">
            <strong>Total Paid:</strong>
            <strong style="color: #F69074;">€${receipt.total_cost.toFixed(2)}</strong>
        </div>
        
        <div class="barcode">
            <p style="color: #02A2A2; font-weight: bold; margin-bottom: 10px;">Scan at Parking Entrance</p>
            <div class="barcode-image"></div>
            <p style="font-family: monospace; font-size: 0.9em;">${receipt.barcode}</p>
        </div>
        
        <button class="btn" onclick="window.location.href='receipts.html'">
            Back to All Receipts
        </button>
    `;
}