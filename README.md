# forever-z-app
使用 vite、vue-ts、electron 等技术，搭个自用的可视化脚本桌面应用

## 如何使用

```shell
# 安装依赖
pnpm i

# 启动桌面应用
pnpm run dev

# 仅启动网页
pnpm run dev:web

# 打包桌面应用
pnpm run build
```

## 注意事项

### electron 下载问题

若 `pnpm i` 时报 `node_modules/electron postinstall$ node install.js` 相关的错误，请运行以下命令：

```shell
pnpm config set electron_mirror "https://npm.taobao.org/mirrors/electron/"
```

## todo list

- [ ] 项目打包
- [x] `electron` 的初始化
- [x] 主题切换功能
- [x] `tsconfig.json` 的配置
- [x] `eslint` 的配置
- [x] `pnpm workspace` 的初始化
- [x] `pnpm create vite website --template vue`
