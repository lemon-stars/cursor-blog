import { listPosts } from '@/lib/api';
import { createPostAction } from './actions';

export default async function HomePage() {
  let posts: Awaited<ReturnType<typeof listPosts>> = [];
  let apiError: string | null = null;
  try {
    posts = await listPosts();
  } catch (e) {
    apiError = e instanceof Error ? e.message : '无法连接到后端 API';
  }

  return (
    <main className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">cursor-blog</h1>
        <p className="text-sm text-zinc-400">Next.js 14 + NestJS + MongoDB 起步模板</p>
      </header>

      {apiError ? (
        <section className="rounded-xl border border-amber-900/60 bg-amber-950/30 p-5">
          <h2 className="text-sm font-medium text-amber-200">后端未就绪</h2>
          <p className="mt-2 text-sm text-amber-200/80">
            当前无法请求 <span className="font-mono">/posts</span>（{apiError}）。请先启动 MongoDB，再启动/等待
            NestJS 连接成功后刷新页面。
          </p>
          <div className="mt-3 text-xs text-amber-200/70">
            例如在根目录执行：<span className="font-mono">docker compose up -d</span>
          </div>
        </section>
      ) : null}

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
        <h2 className="text-lg font-medium">新建文章</h2>
        <form action={createPostAction} className="mt-4 space-y-3">
          <input
            name="title"
            placeholder="标题"
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm outline-none ring-0 focus:border-zinc-600"
          />
          <textarea
            name="content"
            placeholder="内容"
            rows={5}
            className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm outline-none ring-0 focus:border-zinc-600"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
          >
            发布
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">文章列表</h2>
        {posts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 p-6 text-sm text-zinc-400">
            {apiError ? '后端未就绪，暂时无法加载列表。' : '还没有文章。先在上面创建一篇试试。'}
          </div>
        ) : (
          <ul className="space-y-3">
            {posts.map((p) => (
              <li key={p._id} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold">{p.title}</h3>
                  {p.createdAt ? (
                    <time className="shrink-0 text-xs text-zinc-500">
                      {new Date(p.createdAt).toLocaleString()}
                    </time>
                  ) : null}
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-300">{p.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

