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
        console.log("add to map");
        let marker = L.marker([this.lat, this.lng], this.siteData).addTo(map);
        const markerHTML = this.buildPopupContent();
        marker.bindPopup(markerHTML);
        marker.getPopup().on('remove', () => {
            map.removeLayer(marker);
        })
        marker.openPopup();
        // Now that the popup is open we can use Leaflet's DomUtil and DomEvent
        // to attach an event listener to the form
        //this.popupSubmitButton = L.DomUtil.get('buttonSubmit');
        //L.DomEvent.addListener(this.popupSubmitButton, 'click', this.capturePopupFormData);
        document.getElementById("buttonSubmit").onclick = capturePopupFormData();
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
        console.log("capturing data");
        const userData = { canEmail: false };
        const popupForm = L.DomUtil.get('popupForm');
        const formData = new FormData(popupForm);
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host     : "database-2.ccahmvjzqkuz.eu-west-1.rds.amazonaws.com",
            user     : "admin",
            password : "admin1234",
            port     : "3306"
        });

        connection.connect(function(err) {
            if (err) throw err;
                connection.query("insert into wcdb.wcai_loc (upload_date, w3w_id, lat, lng, rating, stay_date, description, user_email, user_optin) VALUES (" 
                + Date.now()
                + "abc"
                + "abc"
                + "abc"
                + "0"
                + Date.now()
                + "abc"
                + "abc"
                + "abc"
                + ";"
                , function (err, result, fields) {
                if (err) throw err;
                    console.log(result);
                });
            });
    }
}




