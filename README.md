# ✨ Tail Image Hosting - 轻量级图床系统

一个基于 Next.js 14 + React 18 + shadcn/ui 的现代化图床系统。

## 🚀 技术栈

- **框架**: Next.js 14 (App Router)
- **UI**: React 18 + shadcn/ui + Tailwind CSS
- **状态管理**: MobX 6
- **存储**: AWS S3 / 兼容 S3 协议的对象存储
- **数据库**: MySQL 2
- **认证**: JWT

## 📦 更新内容 (v0.2.0)

### UI 框架迁移
- ✅ **Ant Design → shadcn/ui**
- ✅ 添加 Tailwind CSS
- ✅ 自定义 UI 组件：checkbox, dialog, toast, toaster
- ✅ 全局 Toast 通知系统
- ✅ 更简约现代的设计风格

### 依赖更新
- ✅ AWS SDK 3.592 → **3.782**
- ✅ TypeScript 5.4 → **5.8.3**

### 代码规范
- ✅ 添加 Prettier 配置
- ✅ 更新 ESLint 配置
- ✅ 现代化 TypeScript 配置
- ✅ 启用 ESM 模块系统

## 🛠️ 开发

**推荐使用 pnpm**（更快、更节省磁盘空间）

```bash
# 安装 pnpm（如果未安装）
npm install -g pnpm

# 安装依赖
pnpm install

# 运行开发服务器
pnpm run dev

# 构建生产版本
pnpm run build

# 启动生产服务器
pnpm start

# 代码检查
pnpm run lint
pnpm run lint:fix

# 格式化代码
pnpm run format

# 类型检查
pnpm run type-check
```

### CI/CD

项目配置了 GitHub Actions，每次 push 和 PR 会自动：
- ✅ 安装依赖 (pnpm)
- ✅ Lint 检查
- ✅ TypeScript 类型检查
- ✅ 构建验证
- ✅ 上传构建产物

## 📁 项目结构

```
tail-image/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   ├── components/        # 组件
│   ├── components/ui/     # shadcn UI 组件
│   └── page.tsx           # 首页
├── components/            # 共享组件
├── lib/                   # 工具函数
├── public/                # 静态资源
└── package.json           # 依赖配置
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

## 🚀 部署

### Vercel 部署 (推荐)

1. 在 [Vercel](https://vercel.com) 导入 GitHub 仓库
2. 配置环境变量
3. 自动构建部署

```bash
# 本地安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 服务器部署

```bash
# 安装依赖
pnpm install

# 构建
pnpm build

# 使用 PM2 运行
pm2 start npm --name "tail-image" -- start

# 配置 nginx 反向代理
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📄 许可证

MIT

---

**更新日志**: 
- 2026-03-03 - v0.2.0 UI 框架迁移 (Ant Design → shadcn/ui)
- 2026-03-03 - v0.2.0 依赖现代化更新
