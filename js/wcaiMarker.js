console.log("wcaiMarker.js connected");

class wcaiMarker {
    constructor(lat = null, lng = null, map, siteData = null) {
        this.lat = lat;
        this.lng = lng;
        this.siteData = siteData;       // Will be null for new sites
        this.isNewSite = this.siteData == null;
        if (this.isNewSite) {
            this.initFromScratch(map);  // Get w3w data
        } else {
            this.addToMap(map);            // siteData contains all we need
        }
    }

    initFromScratch = async (map) => {
        console.log('Getting w3w data');
        const responseObject = await what3words.api.convertTo3wa({lat:this.lat, lng:this.lng});
        this.siteData = responseObject;
        console.log(this.siteData);
        this.addToMap(map);
    }

    addToMap = (map) => {
        let marker = L.marker([this.lat, this.lng], this.siteData).addTo(map);
        const markerHTML = this.buildPopup();
        marker.bindPopup(markerHTML).openPopup();
    }

    buildPopup = () => {
        const header = `<b>${this.siteData.words}</b>`;
        const body = `<p>${this.siteData.nearestPlace}</p>`;
        const html = `${header}<br>${body}`;
        return html;
    }

    saveData = () => {
        // Take the input data and save to the db
        pass
    }

}