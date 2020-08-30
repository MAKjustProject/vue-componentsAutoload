/**
 * 自动局部组件预注册
 * Lonay.(Liparty)
 */
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export default _components = (path = '') => {
    let _c = {}
    //格式化路径。
    if (path !== '') {
        path.replace(/^\@/, '')
        path = /\/$/.test(path) ? path.replace(/^\/(*.)/, '') : path + '/';
    }
    const requireComponent = require.context('./' + path, false, /\.vue$/);

    requireComponent.keys().forEach(fileName => {
        const componentConfig = requireComponent(fileName);
        const componentName = upperFirst(
            camelCase(
                fileName.split('/').pop().replace(/\.\w+$/, '')
            )
        );
        _c[componentName] = componentConfig.default || componentConfig;
    })

    return _c;
}