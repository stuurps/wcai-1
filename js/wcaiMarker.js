console.log("wcaiMarker.js connected");

class wcaiMarker {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
        this.w3wData = this.getW3W();
    }

    getW3W = async () => {
        console.log('Getting w3w data');
        const responseObject = await what3words.api.convertTo3wa({lat:this.lat, lng:this.lng});
        this.w3wData = responseObject;
        console.log(this.w3wData);
    }

    addToMap = (map) => {
        let marker = L.marker([this.lat, this.lng], this.w3wData).addTo(map);
    }
}