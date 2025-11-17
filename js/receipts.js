// Parking locations data for directions
const parkingLocations = {
    1: { lat: 37.9838, lng: 23.7275, name: 'Athens Central Parking' },
    2: { lat: 37.9715, lng: 23.7267, name: 'Acropolis View Parking' },
    3: { lat: 37.9762, lng: 23.7255, name: 'Monastiraki Square Parking' },
    4: { lat: 37.9794, lng: 23.7419, name: 'Kolonaki Premium Parking' },
    5: { lat: 37.9475, lng: 23.6472, name: 'Piraeus Port Parking' },
    6: { lat: 40.6401, lng: 22.9444, name: 'Thessaloniki Port Parking' },
    7: { lat: 40.6332, lng: 22.9411, name: 'Aristotelous Square Parking' },
    8: { lat: 40.6350, lng: 22.9360, name: 'Ladadika District Parking' },
    9: { lat: 40.5950, lng: 22.9897, name: 'IKEA Thessaloniki Parking' },
    10: { lat: 40.6272, lng: 22.9565, name: 'University Campus Parking' },
    11: { lat: 40.9397, lng: 24.4095, name: 'Kavala Port Parking' },
    12: { lat: 40.9420, lng: 24.4115, name: 'Old Town Kavala Parking' },
    13: { lat: 40.9360, lng: 24.4000, name: 'Kavala Beach Parking' },
    14: { lat: 39.3641, lng: 22.9429, name: 'Volos Port Parking' },
    15: { lat: 39.3615, lng: 22.9444, name: 'Central Volos Parking' },
    16: { lat: 39.3580, lng: 22.9520, name: 'University of Thessaly Parking' },
    17: { lat: 39.3555, lng: 22.9385, name: 'Volos Hospital Parking' },
    18: { lat: 39.6390, lng: 22.4191, name: 'Larissa Central Station Parking' },
    19: { lat: 39.6373, lng: 22.4145, name: 'Larissa Central Square Parking' },
    20: { lat: 39.6510, lng: 22.4275, name: 'AEL Football Stadium Parking' },
    21: { lat: 39.6285, lng: 22.4055, name: 'Mall Larissa Parking' },
    22: { lat: 38.2466, lng: 21.7346, name: 'Patras Port Parking' },
    23: { lat: 38.2897, lng: 21.7858, name: 'Patras University Parking' },
    24: { lat: 38.3197, lng: 21.7742, name: 'Rio-Antirrio Bridge Parking' },
    25: { lat: 35.3401, lng: 25.1334, name: 'Heraklion Port Parking' },
    26: { lat: 35.2979, lng: 25.1631, name: 'Knossos Palace Parking' },
    27: { lat: 35.3387, lng: 25.1803, name: 'Heraklion Airport Parking' },
    28: { lat: 35.3387, lng: 25.1339, name: 'Lions Square Parking' },
    29: { lat: 39.6650, lng: 20.8537, name: 'Ioannina Lake Parking' },
    30: { lat: 39.6686, lng: 20.8518, name: 'Ioannina Castle Parking' },
    31: { lat: 39.6208, lng: 20.8485, name: 'University of Ioannina Parking' },
    32: { lat: 35.5138, lng: 24.0180, name: 'Chania Old Port Parking' },
    33: { lat: 35.5149, lng: 24.0195, name: 'Chania Market Parking' },
    34: { lat: 35.5080, lng: 24.0100, name: 'Chania Beach Parking' },
    35: { lat: 36.4442, lng: 28.2253, name: 'Rhodes Old Town Parking' },
    36: { lat: 36.4506, lng: 28.2275, name: 'Rhodes Port Parking' },
    37: { lat: 36.0919, lng: 28.0868, name: 'Lindos Acropolis Parking' },
    38: { lat: 36.4054, lng: 28.0862, name: 'Rhodes Airport Parking' }
};

// Load and display receipts
const receipts = getReceipts();
displayReceipts(receipts);

function displayReceipts(receipts) {
    const card = document.getElementById('receiptsCard');
    
    card.innerHTML = `
        <h2 style="color: #2F80ED; text-align: center; margin-bottom: 20px;">My Receipts</h2>
    `;
    
    if (receipts && receipts.length > 0) {
        const receiptsList = document.createElement('ul');
        receiptsList.className = 'receipt-list';
        
        // Reverse to show newest first
        receipts.slice().reverse().forEach(receipt => {
            const li = document.createElement('li');
            li.style.cssText = 'display: flex; justify-content: space-between; align-items: center; cursor: default;';
            
            // Format date for display
            const dateFormatted = receipt.date.substring(6, 8) + '/' + 
                                  receipt.date.substring(4, 6) + '/' + 
                                  receipt.date.substring(0, 4);
            
            li.innerHTML = `
                <div style="flex: 1;" onclick="viewReceipt('${receipt.date}')" style="cursor: pointer;">
                    <strong>${dateFormatted}</strong>
                    <div style="color: #666; font-size: 0.9em; margin-top: 5px;">
                        ${receipt.parking_name} - €${receipt.total_cost.toFixed(2)}
                    </div>
                </div>
                <div style="display: flex; gap: 10px; margin-left: 15px;">
                    <button 
                        onclick="event.stopPropagation(); viewReceipt('${receipt.date}')" 
                        style="
                            padding: 10px 15px;
                            background: linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%);
                            color: white;
                            border: none;
                            border-radius: 8px;
                            font-size: 0.9em;
                            font-weight: bold;
                            cursor: pointer;
                            transition: transform 0.2s;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                        "
                        onmouseover="this.style.transform='translateY(-2px)'"
                        onmouseout="this.style.transform='translateY(0)'"
                    >
                        📄 View Receipt
                    </button>
                    <button 
                        onclick="event.stopPropagation(); openGoogleMaps('${receipt.parking_name}', ${receipt.parking_id})" 
                        style="
                            padding: 10px 15px;
                            background: linear-gradient(135deg, #F2C94C 0%, #F2994A 100%);
                            color: #1A1A1A;
                            border: none;
                            border-radius: 8px;
                            font-size: 0.9em;
                            font-weight: bold;
                            cursor: pointer;
                            transition: transform 0.2s;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                        "
                        onmouseover="this.style.transform='translateY(-2px)'"
                        onmouseout="this.style.transform='translateY(0)'"
                    >
                        🧭 Directions
                    </button>
                </div>
            `;
            
            receiptsList.appendChild(li);
        });
        
        card.appendChild(receiptsList);
    } else {
        card.innerHTML += `
            <p style="text-align: center; color: #666; padding: 40px;">
                No receipts yet. Book a parking space to get started!
            </p>
            <button class="btn" onclick="window.location.href='index.html'">
                Find Parking
            </button>
        `;
    }
}

function viewReceipt(date) {
    const receipt = getReceiptByDate(date);
    if (receipt) {
        // Save to localStorage for the receipt detail view
        localStorage.setItem('lastBooking', JSON.stringify(receipt));
        window.location.href = 'receipt-detail.html?date=' + date;
    }
}

function openGoogleMaps(parkingName, parkingId) {
    const location = parkingLocations[parkingId];
    if (location) {
        // Open Google Maps with directions to the parking location
        const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}&destination_place_id=${encodeURIComponent(location.name)}`;
        window.open(url, '_blank');
    } else {
        // Fallback: search by name
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(parkingName)}`;
        window.open(url, '_blank');
    }
}