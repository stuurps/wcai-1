console.log('index.js connected');

const components = {}


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
    
    getW3W(clickLat, clickLng);

    addMarker(clickLat, clickLng)
}

const getW3W = async (clickLat, clickLng) => {
    const responseObject = await what3words.api.convertTo3wa({lat:clickLat, lng:clickLng});
    console.log(responseObject);
}

const addMarker = (lat, lng, markerContent = {}) => {
    let marker = L.marker([lat, lng], markerContent).addTo(components.map);
    // TODO: Save marker info to DB
}

window.onload = () => {
    components.map = L.map('map');
    initMap();
}
