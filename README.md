# ✨ Tail Image Hosting - 轻量级图床系统

一个基于 Next.js 15 + React 19 + Ant Design 5 的现代化图床系统。

## 🚀 技术栈

- **框架**: Next.js 15 (App Router)
- **UI**: React 19 + Ant Design 5
- **状态管理**: MobX 6
- **存储**: AWS S3 / 兼容 S3 协议的对象存储
- **数据库**: MySQL 2
- **认证**: JWT

## 📦 更新内容 (v0.2.0)

### 依赖更新
- ✅ Next.js 14 → **15.2.4**
- ✅ React 18 → **19.1.0**
- ✅ Ant Design 5.19 → **5.24.8**
- ✅ AWS SDK 3.592 → **3.782**
- ✅ TypeScript 5.4 → **5.8.3**
- ✅ ESLint 8 → **9.25**

### 代码规范
- ✅ 添加 Prettier 配置
- ✅ 更新 ESLint 配置
- ✅ 现代化 TypeScript 配置
- ✅ 启用 ESM 模块系统

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
npm run lint:fix

# 格式化代码
npm run format

# 类型检查
npm run type-check
```

## 📁 项目结构

```
tail-image/
├── app/              # Next.js App Router
│   ├── api/         # API 路由
│   ├── styles/      # 全局样式
│   └── page.tsx     # 首页
├── pages/           # 传统 Pages Router (兼容)
├── public/          # 静态资源
├── scripts/         # 工具脚本
└── package.json     # 依赖配置
```

## 🔧 配置

### 环境变量 (.env)

```env
# AWS S3 配置
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your-bucket

# 数据库配置
DATABASE_URL=mysql://user:password@localhost:3306/tail_image

# JWT 配置
JWT_SECRET=your_jwt_secret
```

## 📄 许可证

MIT

---

**更新日志**: 2026-03-03 - v0.2.0 依赖现代化更新
