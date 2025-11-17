// Initial parking data for Greece - 10 towns with up to 5 parkings each
const INITIAL_PARKINGS = [
    // Athens - 5 parkings
    {
        id: 1,
        name: 'Athens Central Parking',
        lat: 37.9838,
        lng: 23.7275,
        address: 'Syntagma Square, Athens',
        free_spaces: 15,
        total_spaces: 15,
        price_30min: 2.50,
        price_hour: 4.00,
        price_24h: 25.00
    },
    {
        id: 2,
        name: 'Acropolis View Parking',
        lat: 37.9715,
        lng: 23.7267,
        address: 'Plaka, Athens',
        free_spaces: 0,
        total_spaces: 20,
        price_30min: 3.00,
        price_hour: 5.00,
        price_24h: 30.00
    },
    {
        id: 3,
        name: 'Monastiraki Square Parking',
        lat: 37.9762,
        lng: 23.7255,
        address: 'Monastiraki, Athens',
        free_spaces: 8,
        total_spaces: 12,
        price_30min: 2.80,
        price_hour: 4.50,
        price_24h: 28.00
    },
    {
        id: 4,
        name: 'Kolonaki Premium Parking',
        lat: 37.9794,
        lng: 23.7419,
        address: 'Kolonaki, Athens',
        free_spaces: 3,
        total_spaces: 10,
        price_30min: 3.50,
        price_hour: 6.00,
        price_24h: 35.00
    },
    {
        id: 5,
        name: 'Piraeus Port Parking',
        lat: 37.9475,
        lng: 23.6472,
        address: 'Port of Piraeus, Athens',
        free_spaces: 25,
        total_spaces: 30,
        price_30min: 2.00,
        price_hour: 3.50,
        price_24h: 20.00
    },
    
    // Thessaloniki - 5 parkings
    {
        id: 6,
        name: 'Thessaloniki Port Parking',
        lat: 40.6401,
        lng: 22.9444,
        address: 'White Tower Area, Thessaloniki',
        free_spaces: 12,
        total_spaces: 18,
        price_30min: 2.00,
        price_hour: 3.50,
        price_24h: 22.00
    },
    {
        id: 7,
        name: 'Aristotelous Square Parking',
        lat: 40.6332,
        lng: 22.9411,
        address: 'Aristotelous Square, Thessaloniki',
        free_spaces: 5,
        total_spaces: 15,
        price_30min: 2.50,
        price_hour: 4.00,
        price_24h: 25.00
    },
    {
        id: 8,
        name: 'Ladadika District Parking',
        lat: 40.6350,
        lng: 22.9360,
        address: 'Ladadika, Thessaloniki',
        free_spaces: 0,
        total_spaces: 10,
        price_30min: 2.20,
        price_hour: 3.80,
        price_24h: 23.00
    },
    {
        id: 9,
        name: 'IKEA Thessaloniki Parking',
        lat: 40.5950,
        lng: 22.9897,
        address: 'Airport Area, Thessaloniki',
        free_spaces: 50,
        total_spaces: 50,
        price_30min: 1.50,
        price_hour: 2.50,
        price_24h: 15.00
    },
    {
        id: 10,
        name: 'University Campus Parking',
        lat: 40.6272,
        lng: 22.9565,
        address: 'University Campus, Thessaloniki',
        free_spaces: 1,
        total_spaces: 25,
        price_30min: 1.80,
        price_hour: 3.00,
        price_24h: 18.00
    },
    
    // Kavala - 3 parkings
    {
        id: 11,
        name: 'Kavala Port Parking',
        lat: 40.9397,
        lng: 24.4095,
        address: 'Port of Kavala',
        free_spaces: 10,
        total_spaces: 15,
        price_30min: 1.80,
        price_hour: 3.00,
        price_24h: 18.00
    },
    {
        id: 12,
        name: 'Old Town Kavala Parking',
        lat: 40.9420,
        lng: 24.4115,
        address: 'Panagia District, Kavala',
        free_spaces: 0,
        total_spaces: 8,
        price_30min: 2.00,
        price_hour: 3.50,
        price_24h: 20.00
    },
    {
        id: 13,
        name: 'Kavala Beach Parking',
        lat: 40.9360,
        lng: 24.4000,
        address: 'Beach Front, Kavala',
        free_spaces: 18,
        total_spaces: 20,
        price_30min: 1.50,
        price_hour: 2.50,
        price_24h: 15.00
    },
    
    // Volos - 4 parkings
    {
        id: 14,
        name: 'Volos Port Parking',
        lat: 39.3641,
        lng: 22.9429,
        address: 'Port of Volos',
        free_spaces: 8,
        total_spaces: 12,
        price_30min: 1.80,
        price_hour: 3.00,
        price_24h: 18.00
    },
    {
        id: 15,
        name: 'Central Volos Parking',
        lat: 39.3615,
        lng: 22.9444,
        address: 'City Center, Volos',
        free_spaces: 4,
        total_spaces: 10,
        price_30min: 2.00,
        price_hour: 3.50,
        price_24h: 20.00
    },
    {
        id: 16,
        name: 'University of Thessaly Parking',
        lat: 39.3580,
        lng: 22.9520,
        address: 'University Campus, Volos',
        free_spaces: 15,
        total_spaces: 20,
        price_30min: 1.50,
        price_hour: 2.50,
        price_24h: 15.00
    },
    {
        id: 17,
        name: 'Volos Hospital Parking',
        lat: 39.3555,
        lng: 22.9385,
        address: 'Hospital Area, Volos',
        free_spaces: 0,
        total_spaces: 15,
        price_30min: 1.70,
        price_hour: 2.80,
        price_24h: 17.00
    },
    
    // Larissa - 4 parkings
    {
        id: 18,
        name: 'Larissa Central Station Parking',
        lat: 39.6390,
        lng: 22.4191,
        address: 'Train Station, Larissa',
        free_spaces: 20,
        total_spaces: 25,
        price_30min: 1.80,
        price_hour: 3.00,
        price_24h: 18.00
    },
    {
        id: 19,
        name: 'Larissa Central Square Parking',
        lat: 39.6373,
        lng: 22.4145,
        address: 'Central Square, Larissa',
        free_spaces: 6,
        total_spaces: 12,
        price_30min: 2.00,
        price_hour: 3.50,
        price_24h: 20.00
    },
    {
        id: 20,
        name: 'AEL Football Stadium Parking',
        lat: 39.6510,
        lng: 22.4275,
        address: 'Stadium Area, Larissa',
        free_spaces: 0,
        total_spaces: 30,
        price_30min: 2.50,
        price_hour: 4.00,
        price_24h: 22.00
    },
    {
        id: 21,
        name: 'Mall Larissa Parking',
        lat: 39.6285,
        lng: 22.4055,
        address: 'Shopping Mall, Larissa',
        free_spaces: 35,
        total_spaces: 40,
        price_30min: 1.50,
        price_hour: 2.50,
        price_24h: 15.00
    },
    
    // Patras - 3 parkings
    {
        id: 22,
        name: 'Patras Port Parking',
        lat: 38.2466,
        lng: 21.7346,
        address: 'Port of Patras',
        free_spaces: 10,
        total_spaces: 18,
        price_30min: 2.00,
        price_hour: 3.50,
        price_24h: 20.00
    },
    {
        id: 23,
        name: 'Patras University Parking',
        lat: 38.2897,
        lng: 21.7858,
        address: 'University Campus, Patras',
        free_spaces: 12,
        total_spaces: 15,
        price_30min: 1.50,
        price_hour: 2.50,
        price_24h: 15.00
    },
    {
        id: 24,
        name: 'Rio-Antirrio Bridge Parking',
        lat: 38.3197,
        lng: 21.7742,
        address: 'Bridge Area, Patras',
        free_spaces: 0,
        total_spaces: 20,
        price_30min: 1.80,
        price_hour: 3.00,
        price_24h: 18.00
    },
    
    // Heraklion - 4 parkings
    {
        id: 25,
        name: 'Heraklion Port Parking',
        lat: 35.3401,
        lng: 25.1334,
        address: 'Port of Heraklion, Crete',
        free_spaces: 8,
        total_spaces: 15,
        price_30min: 2.20,
        price_hour: 3.80,
        price_24h: 22.00
    },
    {
        id: 26,
        name: 'Knossos Palace Parking',
        lat: 35.2979,
        lng: 25.1631,
        address: 'Knossos Archaeological Site, Heraklion',
        free_spaces: 5,
        total_spaces: 12,
        price_30min: 2.50,
        price_hour: 4.00,
        price_24h: 24.00
    },
    {
        id: 27,
        name: 'Heraklion Airport Parking',
        lat: 35.3387,
        lng: 25.1803,
        address: 'Airport, Heraklion',
        free_spaces: 0,
        total_spaces: 50,
        price_30min: 3.00,
        price_hour: 5.00,
        price_24h: 30.00
    },
    {
        id: 28,
        name: 'Lions Square Parking',
        lat: 35.3387,
        lng: 25.1339,
        address: 'City Center, Heraklion',
        free_spaces: 2,
        total_spaces: 10,
        price_30min: 2.30,
        price_hour: 4.00,
        price_24h: 23.00
    },
    
    // Ioannina - 3 parkings
    {
        id: 29,
        name: 'Ioannina Lake Parking',
        lat: 39.6650,
        lng: 20.8537,
        address: 'Lake Pamvotis, Ioannina',
        free_spaces: 14,
        total_spaces: 18,
        price_30min: 1.80,
        price_hour: 3.00,
        price_24h: 18.00
    },
    {
        id: 30,
        name: 'Ioannina Castle Parking',
        lat: 39.6686,
        lng: 20.8518,
        address: 'Old Castle, Ioannina',
        free_spaces: 0,
        total_spaces: 8,
        price_30min: 2.00,
        price_hour: 3.50,
        price_24h: 20.00
    },
    {
        id: 31,
        name: 'University of Ioannina Parking',
        lat: 39.6208,
        lng: 20.8485,
        address: 'University Campus, Ioannina',
        free_spaces: 22,
        total_spaces: 25,
        price_30min: 1.50,
        price_hour: 2.50,
        price_24h: 15.00
    },
    
    // Chania - 3 parkings
    {
        id: 32,
        name: 'Chania Old Port Parking',
        lat: 35.5138,
        lng: 24.0180,
        address: 'Venetian Port, Chania, Crete',
        free_spaces: 7,
        total_spaces: 12,
        price_30min: 2.50,
        price_hour: 4.00,
        price_24h: 25.00
    },
    {
        id: 33,
        name: 'Chania Market Parking',
        lat: 35.5149,
        lng: 24.0195,
        address: 'Municipal Market, Chania',
        free_spaces: 3,
        total_spaces: 10,
        price_30min: 2.20,
        price_hour: 3.80,
        price_24h: 22.00
    },
    {
        id: 34,
        name: 'Chania Beach Parking',
        lat: 35.5080,
        lng: 24.0100,
        address: 'Beach Area, Chania',
        free_spaces: 0,
        total_spaces: 15,
        price_30min: 2.00,
        price_hour: 3.50,
        price_24h: 20.00
    },
    
    // Rhodes - 4 parkings
    {
        id: 35,
        name: 'Rhodes Old Town Parking',
        lat: 36.4442,
        lng: 28.2253,
        address: 'Medieval Town, Rhodes',
        free_spaces: 4,
        total_spaces: 10,
        price_30min: 2.80,
        price_hour: 4.50,
        price_24h: 28.00
    },
    {
        id: 36,
        name: 'Rhodes Port Parking',
        lat: 36.4506,
        lng: 28.2275,
        address: 'Mandraki Port, Rhodes',
        free_spaces: 9,
        total_spaces: 15,
        price_30min: 2.50,
        price_hour: 4.00,
        price_24h: 24.00
    },
    {
        id: 37,
        name: 'Lindos Acropolis Parking',
        lat: 36.0919,
        lng: 28.0868,
        address: 'Lindos Village, Rhodes',
        free_spaces: 0,
        total_spaces: 20,
        price_30min: 3.00,
        price_hour: 5.00,
        price_24h: 30.00
    },
    {
        id: 38,
        name: 'Rhodes Airport Parking',
        lat: 36.4054,
        lng: 28.0862,
        address: 'Airport, Rhodes',
        free_spaces: 16,
        total_spaces: 25,
        price_30min: 2.50,
        price_hour: 4.00,
        price_24h: 25.00
    }
];

// LocalStorage functions
function loadParkings() {
    const stored = localStorage.getItem('parkings');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error loading parkings:', e);
            return INITIAL_PARKINGS;
        }
    }
    return INITIAL_PARKINGS;
}

function saveParkings(parkings) {
    localStorage.setItem('parkings', JSON.stringify(parkings));
}

function getParkingById(id) {
    const parkings = loadParkings();
    return parkings.find(p => p.id === parseInt(id));
}

function updateParkingSpaces(parkingId, change) {
    const parkings = loadParkings();
    const parking = parkings.find(p => p.id === parseInt(parkingId));
    if (parking) {
        parking.free_spaces = Math.max(0, Math.min(parking.total_spaces, parking.free_spaces + change));
        saveParkings(parkings);
    }
    return parkings;
}

// Receipt management
function getReceipts() {
    const stored = localStorage.getItem('receipts');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return [];
        }
    }
    return [];
}

function saveReceipt(receipt) {
    const receipts = getReceipts();
    receipts.push(receipt);
    localStorage.setItem('receipts', JSON.stringify(receipts));
}

function getReceiptByDate(date) {
    const receipts = getReceipts();
    return receipts.find(r => r.date === date);
}