// Get parking ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const parkingId = urlParams.get('id');

if (!parkingId) {
    window.location.href = 'index.html';
} else {
    const parking = getParkingById(parkingId);
    
    if (!parking) {
        window.location.href = 'index.html';
    } else {
        displayBookingForm(parking);
    }
}

function displayBookingForm(parking) {
    const card = document.getElementById('bookingCard');
    
    card.innerHTML = `
        <h2 style="color: #2F80ED; text-align: center; margin-bottom: 20px;">Book Your Space</h2>
        <p style="text-align: center; margin-bottom: 20px;">${parking.name}</p>
        
        <div id="errorMessage" style="display: none; background: #EB5757; color: white; padding: 12px; border-radius: 8px; margin-bottom: 15px; text-align: center;">
        </div>
        
        <form id="bookingForm">
            <div class="form-group">
                <label>License Plate Number</label>
                <input type="text" id="plate" name="plate" required placeholder="e.g., ABC-1234">
            </div>
            
            <div class="form-group">
                <label>Arrival Time</label>
                <input type="datetime-local" id="arrivalTime" name="arrival" required>
                <div class="warning">
                    ⚠️ If you do not arrive on time, the receipt will no longer be active.
                </div>
            </div>
            
            <div class="form-group">
                <label>Departure Time</label>
                <input type="datetime-local" id="departureTime" name="departure" required>
            </div>
            
            <button type="submit" class="btn">Calculate Cost & Continue</button>
        </form>
    `;
    
    // Handle form submission
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const plate = document.getElementById('plate').value;
        const arrival = document.getElementById('arrivalTime').value;
        const departure = document.getElementById('departureTime').value;
        
        if (!arrival || !departure) {
            showError('Please fill in both arrival and departure times.');
            return;
        }
        
        const arrivalDate = new Date(arrival);
        const departureDate = new Date(departure);
        
        if (departureDate <= arrivalDate) {
            showError('⚠️ Departure time must be after arrival time!');
            return;
        }
        
        // Calculate duration and cost
        const durationHours = (departureDate - arrivalDate) / (1000 * 60 * 60);
        
        if (durationHours <= 0) {
            showError('Invalid time range!');
            return;
        }
        
        // Round up to nearest 30-minute increment
        const durationInHalfHours = Math.ceil(durationHours * 2) / 2;
        
        let totalCost;
        let duration;
        
        if (durationInHalfHours <= 0.5) {
            totalCost = parking.price_30min;
            duration = "30 minutes";
        } else if (durationInHalfHours <= 1) {
            totalCost = parking.price_hour;
            duration = "1 hour";
        } else if (durationInHalfHours >= 24) {
            const days = Math.ceil(durationHours / 24);
            totalCost = parking.price_24h * days;
            duration = `${days} day${days > 1 ? 's' : ''}`;
        } else {
            totalCost = parking.price_hour * durationInHalfHours;
            const hours = Math.floor(durationInHalfHours);
            const minutes = Math.round((durationInHalfHours - hours) * 60);
            if (minutes > 0) {
                duration = `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minutes`;
            } else {
                duration = `${hours} hour${hours !== 1 ? 's' : ''}`;
            }
        }
        
        // Save booking data to localStorage for payment page
        const bookingData = {
            parking_id: parking.id,
            parking_name: parking.name,
            plate: plate,
            arrival: arrival,
            departure: departure,
            duration: duration,
            total_cost: totalCost
        };
        
        localStorage.setItem('currentBooking', JSON.stringify(bookingData));
        
        // Redirect to payment page
        window.location.href = 'payment.html';
    });
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Hide error after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}