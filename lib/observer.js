/**
 * 把一个对象变成可观察对象
 * @param {Object} target 原对象
 */
function observable(target) {
    new Proxy(target, {
        get(target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver);
            registerReceiveFunction(target, prop, fn);
            return value;
        },
        set(target, prop, value, receiver) {

        }
    });
}

/**
 * 注册一个接受响应的函数
 * @param {Function} fn 函数
 */
function observe(fn) {
    
}

/**
 * 返回一个可观察对象的原对象
 * @param {any} receiver 代理对象 
 */
function raw(receiver) {

}