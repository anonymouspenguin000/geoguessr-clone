export default function mapMarkers() {
    let markers = [];
    return {
        removeAllPins() {
            markers.forEach(el => el.setMap(null));
            markers = [];
        },
        placePin(map, position, icon, url) {
            const marker = new window.google.maps.Marker({map, position, icon});
            markers.push(marker);
            if (url) marker.addListener('click', () => {
                const lnk = document.createElement('a');
                lnk.href = url;
                lnk.target = '_blank';
                lnk.click();
            });
        },
        getMarkers: () => markers
    };
}
