# Dapp
the final project

开发环境以及运行环境
- Windows 10
- npm -v 6.4.1
- node -v 11.4.0
- solc -v ^0.4.24

# 安装
1.全局安装 Truffle 
```javascript
npm install -g truffle
```
2.安装ganache/ganache-cli
```javascript
npm install -g ganache-cli
```
或者到对应的github上下载GUI
https://github.com/trufflesuite/ganache/releases
# 下载部署
3. 从github上下载此项目
4.打开至对应的项目文件夹，下载相应的node_modules
```javascript
npm install
```
5.打开ganache-cli/ganache，使得ganache中的host于port与truffle.js文件一致，默认为127.0.0.1:8545
6.将项目在本地运行,运行前台以及后台
```javascript
npm run dev-front
npm run dev-back
```
# 运行项目
7. 运行完成之后，提示成功打包bundle.js，即可打开浏览器运行 http://127.0.0.1:8080

# 项目截图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20181224153533377.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzA0NTk2,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181224153644390.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzA0NTk2,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20181224153657789.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzA0NTk2,size_16,color_FFFFFF,t_70)

（Note! 由于使用IPFS存储以及获取文件，文件传输较慢显示时间可能较长，若长时间显示不了，请检查网络环境）
