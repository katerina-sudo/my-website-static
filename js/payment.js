// Get booking data from localStorage
const bookingData = localStorage.getItem('currentBooking');

if (!bookingData) {
    window.location.href = 'index.html';
} else {
    const booking = JSON.parse(bookingData);
    displayPaymentForm(booking);
}

function displayPaymentForm(booking) {
    const card = document.getElementById('paymentCard');
    
    card.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <button 
                onclick="window.history.back()" 
                style="
                    background: #F9FAFB;
                    border: 2px solid #56CCF2;
                    color: #2F80ED;
                    padding: 8px 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1em;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    transition: all 0.2s;
                "
                onmouseover="this.style.background='#2F80ED'; this.style.color='white';"
                onmouseout="this.style.background='#F9FAFB'; this.style.color='#2F80ED';"
            >
                ← Back
            </button>
            <h2 style="color: #2F80ED; text-align: center; flex: 1; margin: 0;">Payment Details</h2>
            <div style="width: 80px;"></div>
        </div>
        
        <div class="total-cost">
            <div class="label">Total Cost</div>
            <div class="amount">€${booking.total_cost.toFixed(2)}</div>
            <p style="margin-top: 10px; font-size: 0.9em; color: #666;">
                Duration: ${booking.duration}
            </p>
        </div>
        
        <form id="paymentForm">
            <div class="form-group">
                <label>Card Number</label>
                <input type="text" id="cardNumber" name="card_number" placeholder="1234 5678 9012 3456" maxlength="19" required>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="form-group">
                    <label>Expiry Date</label>
                    <input type="text" id="expiryDate" name="expiry" placeholder="MM/YY" maxlength="5" required>
                </div>
                
                <div class="form-group">
                    <label>CVV</label>
                    <input type="text" id="cvv" name="cvv" placeholder="123" maxlength="3" required>
                </div>
            </div>
            
            <div class="form-group">
                <label>Cardholder Name</label>
                <input type="text" id="cardholder" name="cardholder" placeholder="JOHN DOE" required>
            </div>
            
            <button type="submit" class="btn">Complete Payment</button>
        </form>
    `;
    
    // Card Number Formatting: Add space after every 4 digits
    document.getElementById('cardNumber').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, ''); // Remove spaces
        let formattedValue = '';
        
        // Only allow digits
        value = value.replace(/\D/g, '');
        
        // Limit to 16 digits
        value = value.substring(0, 16);
        
        // Add space after every 4 digits
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
    });
    
    // Expiry Date Formatting: Auto add / after 2 digits
    document.getElementById('expiryDate').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Only digits
        
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        
        e.target.value = value;
    });
    
    // CVV: Only allow 3 digits
    document.getElementById('cvv').addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });
    
    // Handle form submission
    document.getElementById('paymentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate card number (should be 16 digits)
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        if (cardNumber.length !== 16) {
            alert('Please enter a valid 16-digit card number');
            return;
        }
        
        // Validate expiry date
        const expiry = document.getElementById('expiryDate').value;
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            alert('Please enter a valid expiry date (MM/YY)');
            return;
        }
        
        // Validate CVV
        const cvv = document.getElementById('cvv').value;
        if (cvv.length !== 3) {
            alert('Please enter a valid 3-digit CVV');
            return;
        }
        
        // Process payment (simulate)
        processPayment(booking);
    });
}

function processPayment(booking) {
    // Update parking spaces (reduce by 1)
    updateParkingSpaces(booking.parking_id, -1);
    
    // Generate barcode and date
    const now = new Date();
    booking.barcode = `PARK${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    booking.date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    
    // Save receipt
    saveReceipt(booking);
    
    // Clear current booking
    localStorage.removeItem('currentBooking');
    
    // Save booking for confirmation page
    localStorage.setItem('lastBooking', JSON.stringify(booking));
    
    // Redirect to confirmation page
    window.location.href = 'confirmation.html';
}