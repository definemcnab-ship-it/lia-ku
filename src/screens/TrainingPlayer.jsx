import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { recordTrainingDone } from '../lib/store.js'

// 今日课表动作数据（与 Training.jsx 保持一致，增加 player 所需字段）
const EXERCISES = [
  {
    name: '下巴后缩',
    en: 'Chin Tuck',
    sets: 3, reps: 15, restSec: 30,
    focus: '颈部前侧',
    tip: '下巴水平向后推，感受颈部后侧轻微拉伸，保持呼吸均匀。',
    highlightY: 20, // 人体图高亮区域 Y%
    color: '#ece8e0',
    level: '基础',
    lc: 'bg-primary-fixed text-on-surface-variant',
  },
  {
    name: '弹力带划船',
    en: 'Band Row',
    sets: 3, reps: 12, restSec: 45,
    focus: '肩背部',
    tip: '肩胛骨主动后缩，手肘贴近身体，避免耸肩代偿。',
    highlightY: 30,
    color: '#e6e1d8',
    level: '进阶',
    lc: 'bg-primary-fixed text-on-surface-variant',
  },
  {
    name: '墙角胸大肌拉伸',
    en: 'Corner Chest Stretch',
    sets: 2, reps: null, holdSec: 30, restSec: 20,
    focus: '胸大肌',
    tip: '面对墙角，双臂撑墙，身体缓慢前倾，感受胸前展开。',
    highlightY: 35,
    color: '#f0ede7',
    level: '基础',
    lc: 'bg-primary-fixed text-on-surface-variant',
  },
  {
    name: '俯卧 Y-T-W',
    en: 'Prone Y-T-W',
    sets: 3, reps: 10, restSec: 60,
    focus: '下斜方肌',
    tip: '俯卧于垫上，依次做 Y / T / W 手臂动作，激活肩胛稳定肌群。',
    highlightY: 45,
    color: '#ece8e0',
    level: '挑战',
    lc: 'bg-primary-fixed text-on-surface-variant',
  },
]

// 阶段：prepare → exercise → rest → (next or complete)
const PHASES = { PREPARE: 'prepare', EXERCISE: 'exercise', REST: 'rest', COMPLETE: 'complete' }

function useCountdown(target, running, onDone) {
  const [sec, setSec] = useState(target)
  const ref = useRef(null)

  useEffect(() => { setSec(target) }, [target])

  useEffect(() => {
    if (!running) { clearInterval(ref.current); return }
    ref.current = setInterval(() => {
      setSec(s => {
        if (s <= 1) { clearInterval(ref.current); onDone(); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(ref.current)
  }, [running, onDone])

  return sec
}

export default function TrainingPlayer() {
  const nav = useNavigate()
  const [exIdx, setExIdx] = useState(0)
  const [setNum, setSetNum] = useState(1)
  const [phase, setPhase] = useState(PHASES.PREPARE)
  const [paused, setPaused] = useState(false)
  const [repsDone, setRepsDone] = useState(0)

  const ex = EXERCISES[exIdx]
  const totalSets = ex.sets
  const isHold = !!ex.holdSec
  const isLast = exIdx === EXERCISES.length - 1 && setNum === totalSets

  // 计算完成百分比
  const totalWork = EXERCISES.reduce((a, e) => a + e.sets, 0)
  const doneWork = EXERCISES.slice(0, exIdx).reduce((a, e) => a + e.sets, 0) + (setNum - 1)
  const pct = Math.round((doneWork / totalWork) * 100)

  const advancePhase = useCallback(() => {
    if (phase === PHASES.PREPARE) {
      setPhase(PHASES.EXERCISE)
      return
    }
    if (phase === PHASES.EXERCISE) {
      if (isHold || ex.reps) {
        // 进入组间休息
        setPhase(PHASES.REST)
        return
      }
    }
    if (phase === PHASES.REST) {
      if (setNum < totalSets) {
        setSetNum(s => s + 1)
        setRepsDone(0)
        setPhase(PHASES.EXERCISE)
      } else if (exIdx < EXERCISES.length - 1) {
        setExIdx(i => i + 1)
        setSetNum(1)
        setRepsDone(0)
        setPhase(PHASES.PREPARE)
      } else {
        setPhase(PHASES.COMPLETE)
      }
    }
  }, [phase, isHold, ex.reps, setNum, totalSets, exIdx])

  const prepSec = useCountdown(3, phase === PHASES.PREPARE && !paused, advancePhase)
  const holdSec = useCountdown(ex.holdSec || 0, phase === PHASES.EXERCISE && isHold && !paused, advancePhase)
  const restSec = useCountdown(ex.restSec, phase === PHASES.REST && !paused, advancePhase)

  const doneRep = () => {
    if (isHold) return
    const next = repsDone + 1
    setRepsDone(next)
    if (next >= ex.reps) advancePhase()
  }

  // 进入完成态时记录今日打卡（持久化）
  useEffect(() => {
    if (phase === PHASES.COMPLETE) recordTrainingDone()
  }, [phase])

  if (phase === PHASES.COMPLETE) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-primary to-[#6e675b] text-white px-8 text-center">
        <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center mb-6">
          <Icon name="check_circle" size={64} className="text-white" />
        </div>
        <h2 className="font-display text-[32px] font-bold mb-2">训练完成！</h2>
        <p className="font-body text-white/80 mb-2">天鹅颈舒缓拉伸 · {EXERCISES.length} 个动作全部完成</p>
        <p className="font-label text-[14px] text-white/60 mb-10">坚持每天训练，体态改变肉眼可见 ✨</p>
        <div className="w-full space-y-3">
          <button onClick={() => nav('/progress')}
            className="w-full h-14 bg-white text-primary font-label text-lg rounded-lg active:scale-[0.98] transition">
            查看今日进步
          </button>
          <button onClick={() => nav('/home')}
            className="w-full h-12 text-white/70 font-label active:scale-95 transition">
            返回首页
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a] text-white overflow-hidden">
      {/* 顶部进度条 + 标题 */}
      <div className="px-5 pt-5 pb-3 space-y-2">
        <div className="flex items-center justify-between">
          <button onClick={() => nav('/training')} aria-label="退出训练"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <Icon name="close" size={18} className="text-white" />
          </button>
          <div className="text-center">
            <p className="font-label text-[12px] text-white/50 uppercase tracking-wider">
              动作 {exIdx + 1}/{EXERCISES.length} · 第 {setNum}/{totalSets} 组
            </p>
          </div>
          <button onClick={() => setPaused(p => !p)} aria-label={paused ? '继续训练' : '暂停训练'}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <Icon name={paused ? 'play_arrow' : 'pause'} size={18} className="text-white" />
          </button>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-container to-primary rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }} />
        </div>
        <p className="text-right font-label text-[11px] text-white/40">{pct}% 完成</p>
      </div>

      {/* 动作可视化区 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">

        {/* 人体图 + 高亮区域 */}
        <div className="relative">
          <svg width="160" height="300" viewBox="0 0 160 300" className="opacity-30">
            <ellipse cx="80" cy="30" rx="22" ry="26" fill="white" />
            <line x1="80" y1="56" x2="80" y2="160" stroke="white" strokeWidth="10" strokeLinecap="round" />
            <line x1="80" y1="80" x2="30" y2="130" stroke="white" strokeWidth="8" strokeLinecap="round" />
            <line x1="80" y1="80" x2="130" y2="130" stroke="white" strokeWidth="8" strokeLinecap="round" />
            <line x1="80" y1="160" x2="55" y2="240" stroke="white" strokeWidth="8" strokeLinecap="round" />
            <line x1="80" y1="160" x2="105" y2="240" stroke="white" strokeWidth="8" strokeLinecap="round" />
          </svg>
          {/* 高亮圈 跟随动作部位 */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full opacity-70 transition-all duration-700"
            style={{
              top: `${ex.highlightY}%`,
              background: `radial-gradient(circle, ${ex.color}cc, transparent)`,
              boxShadow: `0 0 24px 8px ${ex.color}66`,
            }}
          />
        </div>

        {/* 阶段显示 */}
        {phase === PHASES.PREPARE && (
          <div className="text-center space-y-2 animate-page-in">
            <p className="font-label text-[13px] text-white/50 uppercase tracking-widest">准备开始</p>
            <p className="font-display text-[80px] font-bold leading-none text-primary-container">{prepSec}</p>
            <p className="font-headline text-[26px] text-white">{ex.name}</p>
            <p className="font-label text-[13px] text-white/60">{ex.en} · {ex.focus}</p>
          </div>
        )}

        {phase === PHASES.EXERCISE && (
          <div className="text-center space-y-3 w-full px-4 animate-page-in">
            <p className="font-headline text-[26px] text-white">{ex.name}</p>
            {isHold ? (
              <>
                <p className="font-display text-[72px] font-bold leading-none text-primary-container">{holdSec}</p>
                <p className="font-label text-[13px] text-white/60">秒 · 保持姿势</p>
                <BreathGuide sec={holdSec} />
              </>
            ) : (
              <>
                <div className="flex items-end justify-center gap-2">
                  <span className="font-display text-[72px] font-bold leading-none text-primary-container">{repsDone}</span>
                  <span className="font-label text-[20px] text-white/50 pb-3">/ {ex.reps}</span>
                </div>
                <p className="font-label text-[13px] text-white/60">次 · 点击计数</p>
                <button onClick={doneRep}
                  className="mt-2 w-full h-16 rounded-xl bg-white/10 active:bg-white/20 active:scale-95 transition
                    font-label text-[16px] text-white border border-white/20">
                  ＋ 完成一次
                </button>
              </>
            )}
            <div className="bg-white/8 rounded-lg px-4 py-3 text-left mt-2">
              <p className="font-label text-[12px] text-white/50 mb-1">动作要点</p>
              <p className="font-body text-[13px] text-white/80 leading-relaxed">{ex.tip}</p>
            </div>
          </div>
        )}

        {phase === PHASES.REST && (
          <div className="text-center space-y-3 w-full px-4 animate-page-in">
            <p className="font-label text-[13px] text-white/50 uppercase tracking-widest">组间休息</p>
            <p className="font-display text-[80px] font-bold leading-none text-[#cfc8bb]">{restSec}</p>
            <p className="font-label text-[13px] text-white/60">秒</p>
            {/* 下一动作预告 */}
            {setNum < totalSets ? (
              <div className="bg-white/8 rounded-xl p-4 text-left border border-white/10">
                <p className="font-label text-[11px] text-white/40 mb-1">本组完成 · 下一组</p>
                <p className="font-label text-[16px] text-white">{ex.name} · 第 {setNum + 1}/{totalSets} 组</p>
              </div>
            ) : exIdx < EXERCISES.length - 1 ? (
              <div className="bg-white/8 rounded-xl p-4 text-left border border-white/10">
                <p className="font-label text-[11px] text-white/40 mb-1">下一个动作</p>
                <p className="font-label text-[16px] text-white">{EXERCISES[exIdx + 1].name}</p>
                <p className="font-label text-[12px] text-white/50">{EXERCISES[exIdx + 1].en} · {EXERCISES[exIdx + 1].focus}</p>
              </div>
            ) : null}
            <button onClick={advancePhase}
              className="w-full h-12 rounded-lg bg-primary/80 active:scale-95 transition font-label text-[15px] text-white">
              跳过休息
            </button>
          </div>
        )}
      </div>

      {/* 底部动作列表缩略 */}
      <div className="px-5 pb-6">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {EXERCISES.map((e, i) => (
            <div key={e.name}
              className={`flex-none flex items-center gap-2 px-3 py-2 rounded-lg border transition
                ${i === exIdx
                  ? 'bg-primary/30 border-primary-container text-white'
                  : i < exIdx
                  ? 'bg-white/5 border-white/10 text-white/30'
                  : 'bg-white/5 border-white/10 text-white/50'}`}>
              {i < exIdx
                ? <Icon name="check_circle" size={14} className="text-primary-container flex-none" />
                : <span className="font-bold text-[12px] w-4 text-center flex-none">{i + 1}</span>}
              <span className="font-label text-[12px] whitespace-nowrap">{e.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BreathGuide({ sec }) {
  const cycle = 6
  const phase = sec % cycle
  const isIn = phase < 3
  return (
    <div className="flex items-center justify-center gap-2 mt-1">
      <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${isIn ? 'bg-primary-container scale-150' : 'bg-white/30 scale-100'}`} />
      <p className="font-label text-[12px] text-white/50">{isIn ? '吸气…' : '呼气…'}</p>
    </div>
  )
}
