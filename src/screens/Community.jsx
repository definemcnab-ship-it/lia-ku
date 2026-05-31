import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { COMMUNITY_TOPICS, COMMUNITY_POSTS } from '../lib/content.js'

// 社群圈子：体态矫正同好动态流。原型为运营内容 + 本地交互（点赞/发布）。
export default function Community() {
  const nav = useNavigate()
  const [topic, setTopic] = useState('rec')
  const [likes, setLikes] = useState(() =>
    Object.fromEntries(COMMUNITY_POSTS.map(p => [p.id, { count: p.likes, on: false }])))
  const [composing, setComposing] = useState(false)
  const [draft, setDraft] = useState('')
  const [myPosts, setMyPosts] = useState([])

  const toggleLike = (id) => setLikes(s => {
    const cur = s[id]
    return { ...s, [id]: { count: cur.count + (cur.on ? -1 : 1), on: !cur.on } }
  })

  const publish = () => {
    if (!draft.trim()) return
    const post = {
      id: `me-${Date.now()}`, name: '若曦', level: '初遇', avatarBg: 'bg-primary-fixed',
      time: '刚刚', tag: '我的动态', text: draft.trim(), img: null, mine: true,
    }
    setMyPosts(p => [post, ...p])
    setLikes(s => ({ ...s, [post.id]: { count: 0, on: false } }))
    setDraft(''); setComposing(false)
  }

  const allPosts = [...myPosts, ...COMMUNITY_POSTS]
  const posts = topic === 'rec' ? allPosts : allPosts.filter(p => p.topic === topic || p.mine)

  return (
    <div className="font-body text-on-background">
      <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40">
        <button onClick={() => nav('/home')} aria-label="返回" className="active:scale-90 transition">
          <Icon name="arrow_back" size={24} className="text-on-surface" />
        </button>
        <span className="font-headline text-[18px] text-on-surface">斯俪圈子</span>
        <span className="w-6" />
      </header>

      {/* 话题标签 */}
      <div className="px-container-padding-mobile pb-2 flex gap-2 overflow-x-auto sticky top-[60px] bg-surface z-30">
        {COMMUNITY_TOPICS.map(t => (
          <button key={t.id} onClick={() => setTopic(t.id)}
            className={`flex-none px-4 py-1.5 rounded-full font-label text-[13px] transition
              ${topic === t.id ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <main className="px-container-padding-mobile pb-24 space-y-3 pt-2">
        {posts.map(p => {
          const lk = likes[p.id] || { count: 0, on: false }
          return (
            <article key={p.id} className="bg-surface-container-lowest rounded-lg p-4 shadow-[0px_4px_20px_rgba(230,126,102,0.06)]">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${p.avatarBg}`}>
                  <Icon name="person" size={20} className="text-[#8f8779]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-label text-[14px] text-on-surface truncate">{p.name}</span>
                    {p.pro
                      ? <span className="font-label text-[10px] text-white bg-[#8f8779] px-1.5 py-0.5 rounded-full shrink-0">认证</span>
                      : <span className="font-label text-[10px] text-on-surface-variant bg-primary-fixed px-1.5 py-0.5 rounded-full shrink-0">{p.level}</span>}
                  </div>
                  <span className="font-label text-[11px] text-outline">{p.time}</span>
                </div>
                <span className="font-label text-[11px] text-primary bg-primary-fixed px-2 py-0.5 rounded-full shrink-0"># {p.tag}</span>
              </div>

              <p className="font-body text-[14px] text-on-surface leading-relaxed">{p.text}</p>

              {p.img && (
                <div className={`mt-3 h-40 rounded-lg flex items-center justify-center ${p.img}`}>
                  <Icon name={p.imgIcon || 'image'} size={40} className="text-[#8f8779]/50" />
                </div>
              )}

              <div className="flex items-center gap-6 mt-3 pt-3 border-t border-surface-variant">
                <button onClick={() => toggleLike(p.id)}
                  className="flex items-center gap-1.5 active:scale-90 transition">
                  <Icon name="favorite" size={18} className={lk.on ? 'text-error' : 'text-outline'} />
                  <span className={`font-label text-[13px] ${lk.on ? 'text-error' : 'text-outline'}`}>{lk.count}</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <Icon name="description" size={17} className="text-outline" />
                  <span className="font-label text-[13px] text-outline">{p.comments ?? 0}</span>
                </div>
                <div className="flex items-center gap-1.5 ml-auto">
                  <Icon name="share" size={16} className="text-outline" />
                </div>
              </div>
            </article>
          )
        })}

        {posts.length === 0 && (
          <p className="text-center font-label text-[13px] text-outline py-10">该话题暂无动态，来发布第一条吧～</p>
        )}
      </main>

      {/* 发布悬浮按钮 */}
      <button onClick={() => setComposing(true)} aria-label="发布动态"
        className="absolute bottom-6 right-5 w-14 h-14 rounded-full bg-primary text-white shadow-lg
          flex items-center justify-center active:scale-90 transition z-40">
        <Icon name="add" size={28} className="text-white" />
      </button>

      {/* 发布抽屉 */}
      {composing && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={() => setComposing(false)}>
          <div className="bg-surface rounded-t-3xl w-full max-w-md p-6 pb-8 animate-page-in" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-outline-variant/40 rounded-full mx-auto mb-4" />
            <h3 className="font-headline text-[18px] text-on-surface mb-3">分享我的体态日记</h3>
            <textarea autoFocus value={draft} onChange={e => setDraft(e.target.value)}
              rows={4} maxLength={200} placeholder="今天的训练感受、进步或疑问…"
              className="w-full bg-surface-container rounded-lg p-3 font-body text-[14px] text-on-surface
                placeholder:text-outline resize-none focus:outline-none" />
            <div className="flex items-center justify-between mt-3">
              <span className="font-label text-[12px] text-outline">{draft.length}/200</span>
              <div className="flex gap-3">
                <button onClick={() => setComposing(false)}
                  className="px-4 h-10 bg-surface-container text-on-surface-variant font-label rounded-lg active:scale-95 transition">取消</button>
                <button onClick={publish} disabled={!draft.trim()}
                  className="px-6 h-10 bg-primary text-white font-label rounded-lg active:scale-95 transition disabled:opacity-40">发布</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
