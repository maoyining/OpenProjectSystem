# OpenProjectSystem
大学生开放项目管理系统（软件过程管理与分析）
- 2019/10/14:初始化sails项目和vue-cli脚手架
- fronted 为前端文件夹(前端在这个文件夹里写代码！)
前端启动步骤：(安装好node.js是前提)
```
cd fronted
```
```
npm install
```
```
npm run dev
```
- rearend 为后端文件夹(别在里面更改东西)
### 启动
1. git pull
2. 进入/fronted文件夹
3. `npm install `
4. npm run dev
5. 分割终端，在vscode最上面的终端那里选择第二个分割
6. 第二个终端进入/rearend文件夹
7. `npm install `
8. `sails lift`
成功启动会显示8000和1337接口，在浏览器访问8000接口
这样启动成功之后，之后每次启动都先pull，但是不需要npm install了！