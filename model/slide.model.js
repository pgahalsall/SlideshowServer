var Slide = class {
    constructor(slideId, slideName, slideCode, takenDate, caption, slideHeight, slideWidth, slideMargin, imageUrl) {
        this.slideId = slideId;
        this.slideName = slideName;
        this.slideCode = slideCode;
        this.takenDate = takenDate;
        this.caption = caption;
        this.slideHeight = slideHeight;
        this.slideWidth = slideWidth;
        this.slideMargin = slideMargin;
        this.imageUrl = imageUrl;
    }
}

module.exports = Slide;

