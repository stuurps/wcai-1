console.log("wcaiMarker.js connected");

class wcaiMarker {
    constructor(lat, lng, map) {
        this.lat = lat;
        this.lng = lng;
        this.w3wData = null;
        this.init(map);
    }

    init = async (map) => {
        console.log('Getting w3w data');
        const responseObject = await what3words.api.convertTo3wa({lat:this.lat, lng:this.lng});
        this.w3wData = responseObject;
        console.log(this.w3wData);
        this.addToMap(map);
    }

    addToMap = (map) => {
        let marker = L.marker([this.lat, this.lng], this.w3wData).addTo(map);
        const header = `<b>${this.w3wData.words}</b>`;
        const body = `<p>${this.w3wData.nearestPlace}</p>`;
        const html = `${header}<br>${body}`;
        marker.bindPopup(html).openPopup();
    }

}