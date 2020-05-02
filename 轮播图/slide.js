/*思路：
1、图片：有自定义的index：图片和小圆点
点击左右切换的时候，根据当前自定义数据算出要切换的图片，改变活动的图片和小圆点样式
循环播放的时候，获取的是点击右按钮的功能
点击小圆点，根据小圆点的index更改当前活动的图片，改变图片和小圆点样式
*/

//变更父元素的自定义属性imgactive=index，修改对应的img的class

const showAtIndexImg = (slide, nextIndex) =>{
    slide.dataset.imgactive = String(nextIndex)
    let nextActiveId = `#img-index-${nextIndex}`
    log('getNextIndex-nextActiveId', nextActiveId)
    //将所有活动的去掉
    removeAllClass('img-active')
    //或者如下
    // let nowImg = e('.img-active')
    // nowImg.classList.remove('.img-active')
    let nextActiveImg = e(nextActiveId)
    nextActiveImg.classList.add('img-active')

}

// 修改小圆点的样式
const showAtIndexIndication = (nextIndex) =>{
    let nextActiveId = `#indi-index-${nextIndex}`
    //将所有活动的去掉
    removeAllClass('white')
    //或者如下
    // let nowImg = e('.white')
    // nowImg.classList.remove('.white')
    let nextActiveIndi = e(nextActiveId)
    nextActiveIndi.classList.add('white')
}



// 变更图片和父元素上的自定义信息，和小圆点图片的样式
const showAtIndex = (slide, nextIndex) =>{
    showAtIndexImg(slide, nextIndex)
    showAtIndexIndication(nextIndex)
}

//根据slide上的自定义属性的图片总数和当前活动图片，和offset计算下一个轮播图的index
const getNextIndex = (slide, offset) =>{
    let totalImgs = parseInt(slide.dataset.imgs, 10)
    let nowIndex = parseInt(slide.dataset.imgactive, 10)

    //加上totalImgs，是为了offset为负数不产生被除数为负数
    let nextIndex = (nowIndex + offset + totalImgs) % totalImgs
    if(nextIndex === 0 || !nextIndex) {
        nextIndex = 3
    }
    return nextIndex
}


//找到它的父级，根据当前的被点击元素的自定义属性进行切换图片和小圆点
const changeSlideToButton = (event) =>{
    let button = event.target
    let slide = button.closest('.slide-imgs')
    //自定义dataset的内容度是字符串
    let offset = Number(button.dataset.offset)
    let nextIndex = getNextIndex(slide, offset)
    showAtIndex(slide, nextIndex)

}

//根据当前的被点击元素的自定义属性进行切换图片和小圆点
const changeSlideToIndi = (event) =>{
    let indi = event.target
    let slide = indi.closest('.slide-imgs')
    //自定义dataset的内容度是字符串
    let index = Number(indi.dataset.index)
    showAtIndex(slide, index)
}

//给左右键绑定点击事件
const bindButtonEvents = () =>{
    bindEvents('button', 'click', (event) =>{
        changeSlideToButton(event)
    })

}

//给小圆点绑定点击事件
const bindIndicationEvents = () =>{
    bindEvents('.slide-indi', 'click', (event) =>{
        changeSlideToIndi(event)
    })

}

// 给左右键和小圆点绑定点击事件
const autoPlay = () => {
        let slide = e('.slide-imgs')
        let nextIndex = getNextIndex(slide, 1)
        showAtIndex(slide, nextIndex)
}

//鼠标移入轮播图范围清除循环，移出继续轮播
const bindMouseEvents = () =>{
    bindEvents('.slide-imgs', 'mouseover', () =>{
        clearInterval(dsq)
    })
    bindEvents('.slide-imgs', 'mouseout', () =>{
        dsq = setInterval(autoPlay, 1500)
    })

}

// 给左右键和小圆点绑定点击事件
const bindSlideEvents = () => {
    bindButtonEvents()
    bindIndicationEvents()
    bindMouseEvents()

}

//循环播放轮播图
var dsq = setInterval(autoPlay, 1500)

const __main = function() {
    //给左右键和小圆点绑定点击事件
    bindSlideEvents()
    // autoPlay()
}

__main()