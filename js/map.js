// Load parkings from localStorage or use initial data
const parkings = loadParkings();

// Create map with OpenStreetMap style
const map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: true,
    dragging: true,
    doubleClickZoom: true
}).setView([38.2466, 23.8093], 6);

// Add zoom control at bottom-right
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// Use OpenStreetMap tile layer (instead of Google Maps)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

// Create custom marker clusters and icons
parkings.forEach(parking => {
    // Determine marker color based on availability
    let markerColor, iconColor;
    const availabilityPercent = (parking.free_spaces / parking.total_spaces) * 100;
    
    if (parking.free_spaces === 0) {
        markerColor = '#EB5757';
        iconColor = '#fff';
    } else if (availabilityPercent < 30) {
        markerColor = '#F2C94C';
        iconColor = '#1A1A1A';
    } else {
        markerColor = '#2F80ED';
        iconColor = '#fff';
    }
    
    const customIcon = L.divIcon({
        className: 'custom-parking-marker',
        html: `
            <div style="position: relative;">
                <div style="
                    background: ${markerColor};
                    width: 28px;
                    height: 28px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid white;
                ">
                    <span style="
                        transform: rotate(45deg);
                        font-size: 13px;
                        color: ${iconColor};
                    ">🅿️</span>
                </div>
                <div style="
                    position: absolute;
                    top: -18px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: ${markerColor};
                    color: white;
                    padding: 2px 5px;
                    border-radius: 6px;
                    font-size: 8px;
                    font-weight: bold;
                    white-space: nowrap;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                ">${parking.free_spaces}</div>
            </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
    });
    
    const marker = L.marker([parking.lat, parking.lng], {icon: customIcon}).addTo(map);
    marker.parkingData = parking;
    
    const popupContent = `
        <div style="min-width: 250px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
            <div style="
                background: linear-gradient(135deg, ${markerColor} 0%, ${markerColor}dd 100%);
                color: white;
                padding: 15px;
                margin: -15px -15px 15px -15px;
                border-radius: 10px 10px 0 0;
                text-align: center;
            ">
                <div style="font-size: 20px; margin-bottom: 5px;">🅿️</div>
                <strong style="font-size: 16px; display: block; margin-bottom: 5px;">${parking.name}</strong>
                <small style="opacity: 0.9;">${parking.address}</small>
            </div>
            
            <div style="padding: 0 5px;">
                <div style="
                    background: ${parking.free_spaces > 0 ? '#F9FAFB' : '#FEE2E2'};
                    padding: 12px;
                    border-radius: 8px;
                    margin-bottom: 12px;
                    text-align: center;
                    border: 2px solid ${parking.free_spaces > 0 ? '#56CCF2' : '#EB5757'};
                ">
                    <div style="font-size: 24px; font-weight: bold; color: ${markerColor};">
                        ${parking.free_spaces}
                    </div>
                    <div style="font-size: 12px; color: #1A1A1A; margin-top: 2px;">
                        of ${parking.total_spaces} spaces available
                    </div>
                </div>
                
                <div style="
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 8px;
                    margin-bottom: 15px;
                ">
                    <div style="text-align: center; background: #F9FAFB; padding: 8px; border-radius: 6px; border: 1px solid #56CCF2;">
                        <div style="font-size: 11px; color: #2F80ED; margin-bottom: 3px;">30 min</div>
                        <div style="font-weight: bold; color: #F2C94C;">€${parking.price_30min.toFixed(2)}</div>
                    </div>
                    <div style="text-align: center; background: #F9FAFB; padding: 8px; border-radius: 6px; border: 1px solid #56CCF2;">
                        <div style="font-size: 11px; color: #2F80ED; margin-bottom: 3px;">1 hour</div>
                        <div style="font-weight: bold; color: #F2C94C;">€${parking.price_hour.toFixed(2)}</div>
                    </div>
                    <div style="text-align: center; background: #F9FAFB; padding: 8px; border-radius: 6px; border: 1px solid #56CCF2;">
                        <div style="font-size: 11px; color: #2F80ED; margin-bottom: 3px;">24 hours</div>
                        <div style="font-weight: bold; color: #F2C94C;">€${parking.price_24h.toFixed(2)}</div>
                    </div>
                </div>
                
                <button 
                    class="popup-book-btn"
                    data-parking-id="${parking.id}"
                    style="
                        width: 100%;
                        padding: 12px;
                        background: linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: bold;
                        cursor: pointer;
                        transition: transform 0.2s;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    "
                >
                    ${parking.free_spaces > 0 ? '📍 Book Your Space' : '🚫 No Spaces Available'}
                </button>
            </div>
        </div>
    `;
    
    marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
    });
});

// Add event delegation for popup buttons
map.on('popupopen', function(e) {
    const popup = e.popup;
    const bookBtn = popup.getElement().querySelector('.popup-book-btn');
    if (bookBtn) {
        bookBtn.addEventListener('click', function() {
            const parkingId = this.getAttribute('data-parking-id');
            window.location.href = 'parking-detail.html?id=' + parkingId;
        });
        
        bookBtn.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        bookBtn.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    }
});

// Nominatim API search
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
let searchTimeout;
let lastSearchTime = 0;

searchInput.addEventListener('input', function(e) {
    const query = e.target.value.trim();
    clearTimeout(searchTimeout);
    
    if (query.length < 3) {
        searchResults.classList.remove('active');
        return;
    }
    
    searchTimeout = setTimeout(() => {
        const now = Date.now();
        const timeSinceLastSearch = now - lastSearchTime;
        
        if (timeSinceLastSearch < 1000) {
            setTimeout(() => {
                lastSearchTime = Date.now();
                searchLocation(query);
            }, 1000 - timeSinceLastSearch);
        } else {
            lastSearchTime = now;
            searchLocation(query);
        }
    }, 500);
});

function searchLocation(query) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=gr&limit=8&addressdetails=1`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                displaySearchResults(data);
            } else {
                searchResults.innerHTML = '<div class="search-result-item">No results found. Try a different search.</div>';
                searchResults.classList.add('active');
            }
        })
        .catch(error => {
            console.error('Search error:', error);
            searchResults.innerHTML = '<div class="search-result-item" style="color: #EB5757;">⚠️ Search unavailable. Try again in a moment.</div>';
            searchResults.classList.add('active');
        });
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        searchResults.classList.add('active');
        return;
    }
    
    results.forEach(result => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        
        let icon = '📍';
        if (result.type === 'supermarket' || result.type === 'shop' || result.type === 'mall') icon = '🏪';
        if (result.type === 'restaurant' || result.type === 'cafe' || result.type === 'fast_food') icon = '🍽️';
        if (result.type === 'hotel' || result.type === 'hostel') icon = '🏨';
        if (result.class === 'highway' || result.class === 'road') icon = '🛣️';
        
        const nameParts = result.display_name.split(',');
        const simpleName = nameParts[0];
        const simpleAddress = nameParts.slice(1, 3).join(',').trim();
        
        item.innerHTML = `
            <div class="search-result-title">
                <span class="search-result-icon">${icon}</span>
                ${simpleName}
            </div>
            <div class="search-result-address">${simpleAddress}</div>
        `;
        
        item.addEventListener('click', () => {
            const lat = parseFloat(result.lat);
            const lon = parseFloat(result.lon);
            map.setView([lat, lon], 16);
            searchResults.classList.remove('active');
            searchInput.value = simpleName;
            
            const tempMarker = L.marker([lat, lon]).addTo(map);
            tempMarker.bindPopup(`<strong>${simpleName}</strong><br><small>${simpleAddress}</small>`).openPopup();
            
            setTimeout(() => {
                map.removeLayer(tempMarker);
            }, 5000);
            
            findNearbyParking(lat, lon);
        });
        
        searchResults.appendChild(item);
    });
    
    searchResults.classList.add('active');
}

function findNearbyParking(lat, lon) {
    let closestParking = null;
    let minDistance = Infinity;
    
    parkings.forEach(parking => {
        const distance = Math.sqrt(
            Math.pow(parking.lat - lat, 2) + Math.pow(parking.lng - lon, 2)
        ) * 111;
        
        if (distance < 2 && distance < minDistance) {
            minDistance = distance;
            closestParking = parking;
        }
    });
    
    if (closestParking) {
        setTimeout(() => {
            map.eachLayer(layer => {
                if (layer instanceof L.Marker && layer.parkingData) {
                    if (layer.parkingData.id === closestParking.id) {
                        layer.openPopup();
                    }
                }
            });
        }, 1000);
    }
}

document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
    }
});

searchResults.addEventListener('wheel', function(e) {
    e.stopPropagation();
}, { passive: false });

document.querySelector('.map-search-box').addEventListener('wheel', function(e) {
    if (searchResults.classList.contains('active')) {
        e.stopPropagation();
    }
}, { passive: false });