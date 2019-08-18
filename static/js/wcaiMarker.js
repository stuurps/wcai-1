console.log("wcaiMarker.js connected");

class wcaiMarker {

    constructor(lat = null, lng = null, map, siteData = null) {
        this.lat = lat;
        this.lng = lng;
        this.siteData = siteData;       // Will be null for new sites
        this.userData = null;           // This is where user name, email and so on go
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
        marker.bindPopup(markerHTML);
        marker.getPopup().on('remove', () => {
            map.removeLayer(marker);
        })
        marker.openPopup();
        // Now that the popup is open we can use Leaflet's DomUtil and DomEvent
        // to attach an event listener to the form
        this.popupSubmitButton = L.DomUtil.get('buttonSubmit');
        L.DomEvent.addListener(this.popupSubmitButton, 'click', this.capturePopupFormData);
    }

    buildPopupContent = () => {
        const form = '\
        <form id="popupForm">\
            <input name="username" id="username" class="popup-input" type="text" \
                aria-label="username" placeholder="Your Name"/>\
            <input name="email" type="email" aria-label="email" placeholder="name@example.com"/>\
            <textarea name="siteDescription" id="siteDescription" form="popupForm" \
                aria-label="description" placeholder="Describe the site in a few words..."></textarea>\
            <input name="canEmail" type="checkbox" id="mailOptInCheckBox" value="true"/>\
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
        const header = `<b><a href="https://what3words.com/${this.siteData.words}" target="_blank">${this.siteData.words}</a>
            </b><br>\
            <p>${newSiteText}</p>`;
        const html = `${header}${form}`;
        return html;
    }

    capturePopupFormData = () => {
        const userData = { canEmail: false };
        const popupForm = L.DomUtil.get('popupForm');
        const formData = new FormData(popupForm);
        // formData objects need to be treated slightly differently to regular
        // objects. To save the data we need to iterate through and save the
        // properties one by one.
        for (let [key, value] of formData.entries()) {
            userData[key] = value;
        }
        this.userData = userData;
        console.log(this.userData);
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
}