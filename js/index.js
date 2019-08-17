console.log('index.js connected');

// The `components` object will be populated with the various bits of
// the map we want to interact with. In future we can change the
// populateComponents function to alter what gets put in here, but the
// rest of the functions can just refer to components.[whatever].
// This will make it easier to maintain a consistent API.
const components = {}

const populateComponents = () => {
    components.map = L.map('map');
}

// Once the page has loaded we can start setting things up
window.onload = () => {
    populateComponents();
    initMap();
}


const initMap = () => {
    console.log('Initialising map');
    let map = components.map;

    // Attach click handler
    map.on('click', mapClickHandler);

    // Create the tile layer with correct attribution (OpenStreetMap)
	let osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	let osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
	let osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 18, attribution: osmAttrib});		

	// Start in Brizzle
	map.setView(new L.LatLng(51.452593, -2.597655), 9);
    map.addLayer(osm);
    
    // TODO: Retrieve existing markers from DB and add to map
}

const mapClickHandler = (e) => {
    // Leaflet's click event contains latitude and longitude clicked
    const clickLatLong = e.latlng;
    const clickLat = clickLatLong.lat;
    const clickLng = clickLatLong.lng;
    console.log(`Clicked at: ${clickLatLong}`);
    const marker = new wcaiMarker(clickLat, clickLng);
    // marker.getW3W();
    marker.addToMap(components.map);
}

