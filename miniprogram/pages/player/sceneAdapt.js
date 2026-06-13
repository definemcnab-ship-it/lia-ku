// 场景化改编：把「居家完整版」动作改编为办公室 / 健身房版本
//  office：滤除需要躺/趴/垫的动作，缩短时长与组数，工位坐站即可完成
//  gym：保留全部，强化类动作叠加器械用法提示
//  home / 全部：原样返回

// 需要躺/趴/跪/垫面完成、工位不便做的动作
const FLOOR_RE = /仰卧|俯卧|侧卧|平板|臀桥|死虫|鸟狗|四足|猫牛|泡沫轴|垫面|跪姿|跪地/

function gymCue(move) {
  const t = (move.name || '') + (move.desc || '')
  if (/臀桥|硬拉/.test(t)) return '健身房：肩负杠铃或手持哑铃增加阻力，控制离心下放'
  if (/划船|YTW|面拉|外旋|后缩|肩胛/.test(t)) return '健身房：用龙门绳索 / 弹力带，顶峰收缩保持2秒'
  if (/弓步|分腿|箭步/.test(t)) return '健身房：双手持哑铃负重，全程稳定核心'
  if (/平板|核心|卷腹|抗旋/.test(t)) return '健身房：加负重片，或用悬吊带（TRX）提升难度'
  if (/提踵|足弓|小腿/.test(t)) return '健身房：站踏板边缘做全幅提踵，可手持哑铃负重'
  if (/深蹲|静蹲|靠墙/.test(t)) return '健身房：改用史密斯架 / 哑铃负重深蹲'
  return '健身房：借助器械（哑铃 / 绳索 / 弹力带）增加阻力'
}

function adaptOffice(moves) {
  let list = moves.filter(m => !FLOOR_RE.test((m.name || '') + (m.desc || '')))
  if (list.length < 3) list = moves.slice() // 保底：可坐站完成的太少则保留全部
  return list.map(m => Object.assign({}, m, {
    duration: Math.min(m.duration || 30, 30),
    sets: Math.min(m.sets || 1, 2),
    tip: '工位版 · 坐姿挺拔即可完成：' + (m.tip || '动作放缓，配合呼吸'),
  }))
}

function adaptGym(moves) {
  return moves.map(m => {
    if (m.phase === 'activate' || m.phase === 'integrate') {
      return Object.assign({}, m, { tip: gymCue(m) + (m.tip ? ' · ' + m.tip : '') })
    }
    return m
  })
}

function sceneAdapt(moves, scene) {
  if (scene === 'office') return adaptOffice(moves)
  if (scene === 'gym') return adaptGym(moves)
  return moves
}

const LABELS = { office: '办公室版', gym: '健身房版', home: '居家版' }
function sceneLabel(scene) { return LABELS[scene] || '' }

module.exports = { sceneAdapt, sceneLabel }
