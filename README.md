# 安装说明

推荐使用`yarn`安装，关于`electron`地址配置推荐

```bash
yarn config set electron_mirror https://mirrors.huaweicloud.com/electron/
npm config set electron_mirror https://mirrors.huaweicloud.com/electron/
npm config set ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/
关于ELECTRON_MIRROR设置，也可以在C:\Users\用户名\目录下找到.npmrc，直接添加ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
```

npm镜像源配置推荐

```bash
npm config set registry https://repo.huaweicloud.com/repository/npm/
```

# 启动

```bash
根目录下创建一个config文件夹，将poetry.db放进去
yarn/npm run dev 本地启动

yarn/npm run build:dir 构建未压缩可执行文件

yarn/npm run build:all 构建跨平台+压缩+未压缩多个可执行文件
```

# 当前库版本

- node 21.0.0
- npm 10.2.0
- yarn 1.22.22

# 特点

- ⚡️ Vue3
- ⚡️ Vite
- ⚡️ TypeScript
- ⚡️ VuetifyUI组件库
- ⚡️ Electron

# 许可证

版权所有 © 2024-2025 [yangming] <[120953990@qq.com](mailto:120953990@qq.com)>，根据 MIT 许可证发布。
