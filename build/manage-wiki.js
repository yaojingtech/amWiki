/**
 * @desc 工作端·文库管理模块
 * @author Tevin
 */

var fs = require('fs');

module.exports = {
    //创建文库id
    createWikiId: function (path) {
        path = path.replace(/\\/g, '/');
        //累加地址字符串每个字符Unicode值与此字符序号的乘积
        var code = 0;
        for (var j = 0; j < path.length; j++) {
            code += path.charCodeAt(j) * j;
        }
        //再与地址字符串长度拼合
        code = parseInt(path.length + '' + code);
        return code;
    },
    //判断一个文件夹是否为amWiki文库项目
    isAmWiki: function (path) {
        path = path.indexOf('library') < 0 ? path : path.split('library')[0];
        path = path.indexOf('config.json') < 0 ? path : path.split('config.json')[0];
        path = path.indexOf('index.html') < 0 ? path : path.split('index.html')[0];
        var states = [
            fs.existsSync(path + '/library/'),
            fs.existsSync(path + '/amWiki/'),
            fs.existsSync(path + '/config.json'),
            fs.existsSync(path + '/index.html')
        ];
        return states[0] && states[1] && states[2] && states[3] ? path : false;
    }
};