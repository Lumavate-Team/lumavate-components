import HammerJS from 'hammerjs'

export default class pinchZoom {
    img: HTMLElement
    lastX: any
    lastY: any
    imgWidth: any
    imgHeight: any
    viewportWidth: any
    scale: any
    lastScale: any
    viewportHeight: any
    curWidth: any
    curHeight: any
    pinchCenter: any
    MIN_SCALE: number // 1=scaling when first loaded
    MAX_SCALE: number
    pinchCenterOffset: any
    container: any
    hammer: any
    pzManager: any
    x: any
    y: any
    zooming: boolean
    zoomThreshold: number
    marginLeft: any
    marginTop: any
    originalInit: any

    constructor(image) {
        this.img = image
        this.lastX = 0
        this.lastY = 0
        this.imgWidth = this.img.clientWidth
        this.imgHeight = this.img.clientHeight
        this.viewportWidth = this.img.offsetWidth
        this.scale = 1
        this.lastScale = this.scale
        this.viewportHeight = this.img.parentElement.offsetHeight
        this.curWidth = this.imgWidth * this.scale
        this.curHeight = this.imgHeight * this.scale
        this.pinchCenter = null
        this.MIN_SCALE = 1 // 1=scaling when first loaded
        this.MAX_SCALE = 4.5 
        this.pinchCenterOffset = null
        this.container = this.img.parentElement
        this.hammer
        this.pzManager
        this.x = 0
        this.y = 0
        this.zooming = false
        this.zoomThreshold = 1.4

        // this.marginLeft = this.img.style.marginLeft
        // this.marginTop = this.img.style.marginTop



        this.originalInit = this

        this.disableImgEventHandlers()

        let self = this
        this.hammer = new HammerJS(this.container, {
            domEvents: true
        })

        this.hammer.get('pinch').set({
            enable: true
        })

        this.hammer.on('pan', function (e) {
            // console.log('pan: ' + self.zooming)
            if (self.zooming) {
                // console.log('pan')
                self.translate(e.deltaX, e.deltaY)
            }
        })

        this.hammer.on('panend', function () {
            // console.log('panend: ' + self.zooming)
            if (self.zooming) {
                self.updateLastPos()
            }
        })

        this.hammer.on('pinch', function (e) {
            self.zooming = true
            // We only calculate the pinch center on the first pinch event as we want the center to
            // stay consistent during the entire pinch
            if (self.pinchCenter === null) {
                self.pinchCenter = self.rawCenter(e)
                let offsetX = self.pinchCenter.x * self.scale - (-self.x * self.scale + Math.min(self.viewportWidth, self.curWidth) / 2)
                let offsetY = self.pinchCenter.y * self.scale - (-self.y * self.scale + Math.min(self.viewportHeight, self.curHeight) / 2)
                self.pinchCenterOffset = { x: offsetX, y: offsetY }
            }

            // When the user pinch zooms, she/he expects the pinch center to remain in the same
            // relative location of the screen. To achieve this, the raw zoom center is calculated by
            // first storing the pinch center and the scaled offset to the current center of the
            // image. The new scale is then used to calculate the zoom center. This has the effect of
            // actually translating the zoom center on each pinch zoom event.
            let newScale = self.restrictScale(self.scale * e.scale)
            let zoomX = self.pinchCenter.x * newScale - self.pinchCenterOffset.x
            let zoomY = self.pinchCenter.y * newScale - self.pinchCenterOffset.y
            let zoomCenter = { x: zoomX / newScale, y: zoomY / newScale }

            console.log('eScale : ' + e.scale.toFixed(4) +'lastScale: ' + self.lastScale.toFixed(4) +' zoomX: '+ zoomX.toFixed(2)+ ' zoomY: '+ zoomY.toFixed(2) + ' zoomCenter: ' + zoomCenter.x.toPrecision(3)+', '+zoomCenter.y.toPrecision(3))

            self.zoomAround(e.scale, zoomCenter.x, zoomCenter.y, true)
 
        })

        this.hammer.on('pinchend', function () {
            // console.log(e.scale)
            if(self.scale<self.zoomThreshold){
                self.zooming = false
            }
            self.resetPosition()
            self.updateLastScale()
            self.updateLastPos()
            self.pinchCenter = null
            // console.log('pinchend')
        })

        // this.hammer.on('doubletap', function (e) {
        //     let c = self.rawCenter(e)
        //     self.zoomAround(2, c.x, c.y, false)
        // })
    }

    getScale(){
        return this.scale
    }

    getzoomThreshold(){
        return this.zoomThreshold
    }
    resetPosition() {
        if(this.scale<this.zoomThreshold){
            // let i = this.scale
            // for(i; i >=1; i = i - .1){
                //     if(i > 1){
                    //             this.zoom(i)
                    //     }
                    // }
                    // this.zoom(1)
        this.zoomReset()
        console.log('reset: ' + this.scale) 

        // this.restoreOriginalObject()
        }
    }


    zoomReset() {
        this.scale = 1

        // this.curWidth = this.imgWidth * this.scale
        // this.curHeight = this.imgHeight * this.scale

        // this.img.style.width = Math.ceil(this.curWidth) + 'px'
        // this.img.style.height = Math.ceil(this.curHeight) + 'px'

        // Adjust margins to make sure that we aren't out of bounds
        this.zoom(1/this.lastScale)
        this.img.style.marginLeft = '0px'
        this.img.style.marginTop = '0px'
    }

    translateReset() {
        // We restrict to the min of the viewport width/height or current width/height as the
        // current width/height may be smaller than the viewport width/height

        this.img.style.marginLeft = this.marginLeft
        this.img.style.marginTop = this.marginTop
    }



    zoom(scaleBy) {
        this.scale = this.restrictScale(this.lastScale * scaleBy)

        this.curWidth = this.imgWidth * this.scale
        this.curHeight = this.imgHeight * this.scale

        this.img.style.width = Math.ceil(this.curWidth) + 'px'
        this.img.style.height = Math.ceil(this.curHeight) + 'px'

        // Adjust margins to make sure that we aren't out of bounds
        this.translate(0, 0)
    }

    translate(deltaX, deltaY) {
        // We restrict to the min of the viewport width/height or current width/height as the
        // current width/height may be smaller than the viewport width/height
        let newX = this.restrictRawPos(this.lastX + deltaX / this.scale,
            Math.min(this.viewportWidth, this.curWidth), this.imgWidth)

        this.x = newX
        this.img.style.marginLeft = Math.ceil(newX * this.scale) + 'px'

        let newY = this.restrictRawPos(this.lastY + deltaY / this.scale,
            Math.min(this.viewportHeight, this.curHeight), this.imgHeight)
        this.y = newY
        this.img.style.marginTop = Math.ceil(newY * this.scale) + 'px'
    }

    restrictRawPos(pos, viewportDim, imgDim) {
        let temp = viewportDim / this.scale
        if (pos < temp - imgDim) { // too far left/up?
            // pos = temp - imgDim
        } else if (pos > 0) { // too far right/down?
            pos = 0
        }
        return pos
    }

    restrictScale(scale) {
        if (scale < this.MIN_SCALE) {
            scale = this.MIN_SCALE
        } else if (scale > this.MAX_SCALE) {
            scale = this.MAX_SCALE
        }
        return scale
    }

    zoomAround(scaleBy, rawZoomX, rawZoomY, doNotUpdateLast) {
        // Zoom
        this.zoom(scaleBy)

        // New raw center of viewport
        let rawCenterX = -this.x + Math.min(this.viewportWidth, this.curWidth) / 2 / this.scale
        let rawCenterY = -this.y + Math.min(this.viewportHeight, this.curHeight) / 2 / this.scale

        // Delta
        let deltaX = (rawCenterX - rawZoomX) * this.scale
        let deltaY = (rawCenterY - rawZoomY) * this.scale

        // Translate back to zoom center
        this.translate(deltaX, deltaY)

        if (!doNotUpdateLast) {
            this.updateLastScale()
            this.updateLastPos()
        }
    }

    rawCenter(e): any {
        let pos = this.absolutePosition(this.container)

        // We need to account for the scroll position
        let scrollLeft = window.pageXOffset ? window.pageXOffset : document.body.scrollLeft
        let scrollTop = window.pageYOffset ? window.pageYOffset : document.body.scrollTop

        let zoomX = -this.x + (e.center.x - pos.x + scrollLeft) / this.scale
        let zoomY = -this.y + (e.center.y - pos.y + scrollTop) / this.scale

        return { x: zoomX, y: zoomY }
    }

    absolutePosition(el) {
        let x = 0,
            y = 0

        while (el !== null) {
            x += el.offsetLeft
            y += el.offsetTop
            el = el.offsetParent
        }

        return { x: x, y: y }
    }



    panningTranslate(deltaX, deltaY) {
        // We restrict to the min of the viewport width/height or current width/height as the
        // current width/height may be smaller than the viewport width/height

        let newX = this.restrictRawPos(this.lastX + deltaX,
            Math.min(this.viewportWidth, this.curWidth), this.imgWidth)

        this.x = newX
        this.img.style.marginLeft = Math.ceil(newX) + 'px'

        let newY = this.restrictRawPos(this.lastY + deltaY,
            Math.min(this.viewportHeight, this.curHeight), this.imgHeight)
        this.y = newY
        this.img.style.marginTop = Math.ceil(newY) + 'px'

    }


    updateLastPos() {
        this.lastX = this.x
        this.lastY = this.y
    }

    updateLastScale() {
        this.lastScale = this.scale
    }

    disableImgEventHandlers() {
        let events = ['onclick', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover',
            'onmouseup', 'ondblclick', 'onfocus', 'onblur']
        let self = this
        events.forEach(function (event) {
            self.img[event] = function () {
                return false
            }
        })
    }
}