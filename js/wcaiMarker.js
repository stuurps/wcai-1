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
            this.addToMap(map);         // siteData contains all we need
        }
    }

    initFromScratch = async (map) => {
        console.log('Getting w3w data');
        const responseObject = await what3words.api.convertTo3wa({ lat: this.lat, lng: this.lng });
        this.siteData = responseObject;
        console.log(this.siteData);
        this.addToMap(map);
    }

    addToMap = (map) => {
        let marker = L.marker([this.lat, this.lng], this.siteData).addTo(map);
        const markerHTML = this.buildPopupContent();
        marker.bindPopup(markerHTML).openPopup();
    }

    buildPopupContent = () => {
        const form = '\
        <form id="popupForm">\
            <input id="username" class="popup-input" type="text" \
                aria-label="username" placeholder="Your Name"/>\
            <input type="email" aria-label="email" placeholder="name@example.com"/>\
            <textarea id="siteDescription" form="popup-form" \
                aria-label="description" placeholder="Describe the site in a few words..."></textarea>\
            <input type="checkbox" id="mailOptInCheckBox"/>\
            <label for="mailOptInCheckbox">I would like to receive emails from Wildcamping\
            </label>\
            <p>We hate spam too - \
                <a href="#" rel="noopener referrer" target="_blank">click here</a> \
                to see what we will send you.</p>\
            <button id="buttonSubmit" type="button" aria-label="Save details">\
                Save</button>\
        </form>';
        const newSiteText = "You're the first to add a site here - use the \
        form below to tell us a bit about it!";
        const header = `<b>${this.siteData.words}</b><br><p>${newSiteText}</p>`;
        const html = `${header}${form}`;
        return html;
    }

    saveToDB = (formData) => {
        // TODO: There are two parts to the data - the first is the w3w info
        // (location, words and so on) which is generated automatically.
        // The second is an user input (email, photos, #hastags, description,
        // rating or whatever we decide to implement).
        // 
        // Open question: should we create a Site object that is separate from a
        // Marker? I think we should, on the basis that you could have multiple 
        // Markers for one Site, particularly because a Site is unlikely to 
        // really just be a single w3w square. Probably not one to worry about 
        // now though.
        pass
    }

    readHTMLFileTemplate = (file) => {
        // TODO: To avoid embedding HTML strings in JS code, write the HTML elsewhere and
        // read it in. We can use format strings to insert the right values.
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    return allText;
                }
            }
        }
        rawFile.send(null);
    }

}