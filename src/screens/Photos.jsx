import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useStore, setState } from '../lib/store.js'

// 体态照片管理（§12 隐私：可随时删除）。原型存元数据，不存真实图片。
export default function Photos() {
  const nav = useNavigate()
  const { photos } = useStore()
  const [pending, setPending] = useState(null)

  const remove = (id) => setState(s => ({ photos: s.photos.filter(p => p.id !== id) }))

  return (
    <div className="font-body text-on-background">
      <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40">
        <button onClick={() => nav('/profile')} aria-label="返回" className="active:scale-90 transition">
          <Icon name="arrow_back" size={24} className="text-on-surface" />
        </button>
        <span className="font-headline text-[18px] text-on-surface">体态照片管理</span>
        <span className="w-6" />
      </header>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        <div className="bg-mint/40 rounded-lg p-4 flex items-start gap-2">
          <Icon name="verified_user" size={18} className="text-on-surface-variant shrink-0 mt-0.5" />
          <p className="font-body text-[13px] text-on-surface-variant/90 leading-relaxed">
            照片仅保存在你的手机本地，不会上传服务器。你可随时删除任意照片，删除后不可恢复。
          </p>
        </div>

        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Icon name="photo_library" size={48} className="text-outline-variant/50" />
            <p className="font-label text-[15px] text-outline mt-3">暂无体态照片</p>
            <button onClick={() => nav('/scan')}
              className="mt-5 px-6 h-11 bg-primary text-on-primary font-label rounded-lg active:scale-95 transition flex items-center gap-2">
              <Icon name="photo_camera" size={18} className="text-white" />去拍体态照
            </button>
          </div>
        ) : (
          <section className="space-y-stack-md">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-[18px] text-on-surface">我的照片</h2>
              <span className="font-label text-[12px] text-outline">{photos.length} 张</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {photos.map(p => (
                <div key={p.id} className="rounded-lg overflow-hidden bg-surface-container-lowest shadow-[0px_4px_20px_rgba(230,126,102,0.06)]">
                  <div className="aspect-[3/4] bg-primary-fixed/40 flex items-center justify-center relative">
                    <Icon name="accessibility_new" size={48} className="text-primary/30" />
                    <button onClick={() => setPending(p)} aria-label={`删除${p.label}照片`}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center active:scale-90 transition">
                      <Icon name="delete" size={18} className="text-white" />
                    </button>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-label text-[13px] text-on-surface">{p.label}</p>
                      <p className="font-label text-[11px] text-outline">{p.date}</p>
                    </div>
                    <span className="font-label text-[12px] text-primary">{p.score}分</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {pending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-8" onClick={() => setPending(null)}>
          <div className="bg-surface rounded-2xl p-6 w-full max-w-[320px] text-center animate-page-in" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-3">
              <Icon name="delete" size={24} className="text-error" />
            </div>
            <h3 className="font-headline text-[18px] text-on-surface mb-1">删除这张照片？</h3>
            <p className="font-label text-[13px] text-outline mb-5 leading-relaxed">
              「{pending.label} · {pending.date}」删除后不可恢复。
            </p>
            <div className="flex gap-3">
              <button onClick={() => setPending(null)}
                className="flex-1 h-11 bg-surface-container text-on-surface-variant font-label rounded-lg active:scale-95 transition">取消</button>
              <button onClick={() => { remove(pending.id); setPending(null) }}
                className="flex-1 h-11 bg-error text-white font-label rounded-lg active:scale-95 transition">删除</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
