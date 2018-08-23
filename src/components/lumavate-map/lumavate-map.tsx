import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'lumavate-map',
    styleUrl: 'lumavate-map.scss',
    shadow: true
})

export class LumavateMap {

    @Prop() address: string ='';
    @Prop() key: string = '';
    @Prop() zoom: string = '';

    render() {
        var address = "https://www.google.com/maps/embed/v1/place?key=" + this.key + "&q=" + encodeURIComponent(this.address) + "&zoom=" + this.zoom;
        return (
            <div class="image">
                <div class="mapouter" style={{textAlign:"right", height:"100%"}}>
                    <div class="gmap_canvas" style={{background:"none !important", height:"100%"}}>
                        <iframe id="gmap_canvas" src={address}
                            frameborder="0"
                            scrolling="no"
                            marginheight="0"
                            marginwidth="0"
                            height="100%"
                            width="100%">
                        </iframe>
                    </div>
                </div>
            </div>
        );
    }
}