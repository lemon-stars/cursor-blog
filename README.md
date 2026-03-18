# cursor-blog（Next.js 14 + NestJS + MongoDB）

## 目录结构

```
cursor-blog/
  apps/
    web/   Next.js 14 (TS + Tailwind)
    api/   NestJS (TS) + MongoDB(Mongoose)
```

## 环境要求

- Node.js 20+（推荐 LTS）
- Docker（可选，用于一键启动 MongoDB）

## 1) 启动 MongoDB（推荐）

在项目根目录执行：

```bash
docker compose up -d
```

## 2) 配置环境变量

复制根目录环境变量示例：

```bash
copy .env.example .env
```

你也可以单独在 `apps/api/.env` 放置后端环境变量（已提供 `.env.example`）。

## 3) 安装依赖

根目录执行：

```bash
npm install
```

## 4) 开发模式启动

根目录执行（同时跑前后端）：

```bash
npm run dev
```

- Web: `http://localhost:3000`
- API: `http://localhost:4000`

## 常见问题

- **PowerShell 下不要用 `&&` 串联命令**：建议分两行运行，或用 `; if ($LASTEXITCODE -eq 0) { ... }`。
- **Node 版本**：Next.js 14 建议 Node 20+。

## 5) 验证接口

创建文章：

```bash
curl -X POST http://localhost:4000/posts -H "Content-Type: application/json" -d "{\"title\":\"Hello\",\"content\":\"First post\"}"
```

获取列表：

```bash
curl http://localhost:4000/posts
```

