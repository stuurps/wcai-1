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
        const form = '<form id="popupForm">\
        <label for="username">Your name</label>\
        <input id="username" class="popup-input" type="text" placeholder="Happy Camper"/>\
        <label for="email">Your email</label>\
        <input type="email" placeholder="name@example.com"/>\
        <label for="siteDescription">Tell us about the site!</label>\
        <textarea id="siteDescription" form="popup-form"></textarea>\
        <input type="checkbox" id="mailOptInCheckBox"/>\
        <label for="mailOptInCheckbox">I would like to receive emails from Wildcamping\
        </label>\
        <p>We hate spam too - \
        <a href="#" rel="noopener referrer" target="_blank">click here</a> \
        to see what we will send you.</p>\
        <button id="buttonSubmit" type="button">Save</button>\
        </form>';
        const header = `<b>${this.siteData.words}</b>`;
        const nearestPlace = `<p>${this.siteData.nearestPlace}</p>`;
        const html = `${header}<br>${nearestPlace}<br>${form}`;
        return html;
    }

    saveToDB = (formData) => {
        // TODO: There are two parts to the data - the first is the w3w info
        // (location, words and so on) which is generated automatically.
        // The second is an user input (email, photos, #hastags, description, rating
        // or whatever we decide to implement).
        // 
        // Open question: should we create a Site object that is separate from a Marker?
        // I think we should, on the basis that you could have multiple Markers for one
        // Site, particularly because a Site is unlikely to really just be a single w3w
        // square. Probably not one to worry about now though.
        pass
    }

    readHTMLFileTemplate = (file) => {
        // TODO: To avoid embedding HTML strings in JS code, write the HTML elsewhere and
        // read it in. We can use format strings to insert the right values.
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    return allText;
                }
            }
        }
        rawFile.send(null);
    }

}