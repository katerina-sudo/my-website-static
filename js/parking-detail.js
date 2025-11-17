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
        displayParkingDetail(parking);
    }
}

function displayParkingDetail(parking) {
    const card = document.getElementById('parkingDetailCard');
    
    const isAvailable = parking.free_spaces > 0;
    
    card.innerHTML = `
        <div class="parking-header">
            <h2>${parking.name}</h2>
            <p>${parking.address}</p>
        </div>
        
        <div class="free-spaces ${isAvailable ? '' : 'no-space'}">
            ${isAvailable ? `${parking.free_spaces} Free Spaces Left` : 'No Spaces Available'}
        </div>
        
        <h3 style="color: #2F80ED; margin-bottom: 15px;">Pricing</h3>
        <div class="price-grid">
            <div class="price-item">
                <div class="label">30 Minutes</div>
                <div class="price">€${parking.price_30min.toFixed(2)}</div>
            </div>
            <div class="price-item">
                <div class="label">1 Hour</div>
                <div class="price">€${parking.price_hour.toFixed(2)}</div>
            </div>
            <div class="price-item">
                <div class="label">24 Hours</div>
                <div class="price">€${parking.price_24h.toFixed(2)}</div>
            </div>
        </div>
        
        ${isAvailable ? `
            <button class="btn" onclick="window.location.href='booking.html?id=${parking.id}'">
                📍 Book Your Space
            </button>
        ` : `
            <button class="btn" style="background: #ccc; cursor: not-allowed;" disabled>
                No Spaces Available
            </button>
        `}
    `;
}