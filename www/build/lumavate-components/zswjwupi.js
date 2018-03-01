/*! Built with http://stenciljs.com */
const{h:t}=window.LumavateComponents;class e{navigateHandler(t){window.location.href=t.detail.url}componentWillLoad(){this.innerItems=JSON.parse(this.items)}render(){return t("div",{style:{backgroundColor:this.backgroundcolor?this.backgroundcolor:"#fff"},class:"container"},this.innerItems.map(e=>t("lumavate-toolbar-button",{item:e})))}static get is(){return"lumavate-toolbar"}static get properties(){return{backgroundcolor:{type:String,attr:"backgroundcolor"},items:{type:String,attr:"items"}}}static get style(){return"lumavate-toolbar{flex:0 0 auto;width:100%;min-height:48px}lumavate-toolbar .container{display:flex;width:100%;flex-direction:row;justify-content:space-around;align-items:center}"}}class o{buttonClicked(t){this.item.url&&this.navigate.emit(this.item),console.log(t)}render(){return t("div",null,t("div",{onClick:t=>this.buttonClicked(t)},t("i",{class:"material-icons",style:{color:this.item.color?this.item.color:"#000"}},this.item.icon),t("div",{style:{color:this.item.color?this.item.color:"#000"},class:"button-text"},this.item.title)))}static get is(){return"lumavate-toolbar-button"}static get properties(){return{item:{type:"Any",attr:"item"}}}static get events(){return[{name:"navigate",method:"navigate",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"lumavate-toolbar-button div{position:relative;display:flex;justify-content:center;align-items:center;flex-direction:column}lumavate-toolbar-button div div{padding:4px 4px;cursor:pointer}lumavate-toolbar-button div .button-text{font-size:12px;margin-top:4px;line-height:0}"}}export{e as LumavateToolbar,o as LumavateToolbarButton};