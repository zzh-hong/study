/*
基本功能：
1、查找元素
2、单个绑定事件
3、多个绑定事件
4、log重新定义this对象
* */
const log = console.log.bind(console)

//查找元素，使用querySelector，直接返回一个对象
const e = function(selector) {
    let element = document.querySelector(selector)
    if(element === null){
        let s = `选择器 ${selector} 写错了, 请仔细检查`
        // alert(s)
        return null
    } else {
        return element
    }
}

//查找多个元素使用querySelectorAll，返回的是一个数组
const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if(elements.length === 0){
        let s = `选择器 ${selector} 写错了, 请仔细检查`
        // alert(s)
        return []
    } else {
        return elements
    }
}

//单个元素绑定事件
const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)

}
//多个元素绑定事件
const bindEvents = function(selector, eventName, callback) {
    let elements = es(selector)
    for(let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

//插入html内容，插入元素内部的最后一个子节点之后
const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

// 移除className，根据类名找到所有元素，将找到的元素的对应类名一一删除
const removeAllClass = function (className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
}
