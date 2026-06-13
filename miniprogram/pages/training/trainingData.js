// Slique 斯俪 — Training Data Library
// Evidence-based posture courses and structured programs
// Brand language: 舒展 归位 唤醒 复位 立 松弛 轻盈 生长 秩序 重塑 焕新 安放 从容

const courses = [
  // ─────────────────────────────────────────────────────────────────────────
  // 颈线 — 居家 · 办公室 · 健身房
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'c1',
    name: '颈线 · 归位（居家）',
    desc: '枕下松弛 · 深颈屈肌唤醒 · 颈线向上生长',
    category: 'neck',
    duration: 18,
    level: '初级',
    icon: 'self_improvement',
    bg: '1',
    evidence: 'A',
    scenes: ['home'],
    targetMuscles: {
      activate: ['深颈屈肌', '菱形肌', '中下斜方肌'],
      release: ['上斜方肌', '枕下肌群', '胸锁乳突肌'],
    },
    moves: [
      {
        id: 'c1-m1', name: '枕下肌群 · 指压松弛', duration: 60, sets: 1, reps: '60秒',
        desc: '仰卧，双手四指并拢置于颅骨底部（枕骨下方凹陷），头部重量完全由双手支撑，缓慢做微小的点头（颌内收）10次后静止放松，感受枕下肌群的释放。',
        tip: '闭眼，专注感受颈后根部的温热与松开',
        icon: 'spa', phase: 'release',
      },
      {
        id: 'c1-m2', name: '胸椎泡沫轴 · 伸展', duration: 60, sets: 1, reps: '60秒',
        desc: '泡沫轴横置于肩胛骨下角，双手托头，缓慢向后伸展，每节胸椎停留8-10秒后移动。覆盖T4-T8段。颈椎压力直接来自胸椎活动度不足——松开胸椎才能真正解放颈部。',
        tip: '腰部不要压泡沫轴；呼气时让胸椎自然下沉',
        icon: 'sports_gymnastics', phase: 'release',
      },
      {
        id: 'c1-m3', name: '深颈屈肌 · 颅颈屈曲激活（CCF）', duration: 30, sets: 3, reps: '10次 / 保持10秒',
        desc: '仰卧屈膝，下颌缓慢向喉咙方向内收（做一个微小的点头，不是抬头），颈后轻轻延伸贴向垫面，保持10秒后完全放松。深颈屈肌（头长肌/颈长肌）是头前引纠正的关键靶肌。',
        tip: '幅度极小——只是点头，不是弯曲整个颈部；感受颈后的拉长',
        icon: 'self_improvement', phase: 'activate',
      },
      {
        id: 'c1-m4', name: '颈肩 YTW · 俯卧强化', duration: 30, sets: 3, reps: 'Y/T/W 各10次',
        desc: '俯卧，额头轻放折叠毛巾，依次做：Y（双臂斜上45°，拇指朝上），T（双臂正侧90°），W（肘弯曲90°外旋至耳侧）。每个姿势停留3秒，感受肩胛骨向脊柱归位。中下斜方肌激活减少上斜方肌代偿。',
        tip: '力从肩胛骨发出，手臂只是方向；腰部不要过度用力',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c1-m5', name: '90/90 · 呼吸整合', duration: 180, sets: 1, reps: '3分钟',
        desc: '仰卧，双腿搭于椅上（髋膝各90°），腰背完全贴地放松。双手轻置肋骨两侧，练习360°肋骨扩张呼吸：吸气时肋骨向前后左右四面扩张，呼气时回落同时感受颈部延伸变长。PRI呼吸整合颈-躯干张力。',
        tip: '这是放松整合，不是练习；感受每次呼气后颈部越来越轻盈',
        icon: 'spa', phase: 'integrate',
      },
    ],
  },

  {
    id: 'c2',
    name: '颈线 · 唤醒（办公室）',
    desc: '久坐颈部速效减压 · 全程坐站完成 · 8分钟',
    category: 'neck',
    duration: 8,
    level: '初级',
    icon: 'self_improvement',
    bg: '1',
    evidence: 'A',
    scenes: ['office'],
    targetMuscles: {
      activate: ['深颈屈肌', '中斜方肌'],
      release: ['上斜方肌', '肩胛提肌'],
    },
    moves: [
      {
        id: 'c2-m1', name: '坐姿 · 颌内收（Chin Tuck）', duration: 30, sets: 3, reps: '10次 / 保持5秒',
        desc: '坐直，下颌缓慢内收，做出"双下巴"动作，颈后感受轻微拉长，保持5秒后放松。全程眼神保持水平，不低头。可在颈后与椅背之间感受头部向后靠的压力。',
        tip: '这是办公室最重要的体态复位动作，每小时做一轮',
        icon: 'self_improvement', phase: 'activate',
      },
      {
        id: 'c2-m2', name: '肩胛提肌 · 坐姿拉伸', duration: 30, sets: 2, reps: '30秒 / 侧',
        desc: '坐直，右手置于头顶，将头缓慢向右前方约45°方向倾斜，同时左肩主动下沉，感受左侧颈后深层（肩胛提肌）的拉伸。保持30秒后换边。',
        tip: '拉伸侧的肩膀主动下沉——对抗代偿是关键',
        icon: 'accessibility_new', phase: 'release',
      },
      {
        id: 'c2-m3', name: '坐姿肩胛后缩 · 菱形肌激活', duration: 20, sets: 3, reps: '15次 / 保持3秒',
        desc: '坐直，双臂自然下垂，将双侧肩胛骨向脊柱中间夹紧并略微下沉，保持3秒，感受背部中央的收缩，慢慢放松。反复15次。改善圆肩含胸对颈部的拉伸。',
        tip: '不要耸肩；是肩胛骨后缩，而不是挺胸仰头',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c2-m4', name: '站姿靠墙 · 颈线校准', duration: 60, sets: 2, reps: '60秒',
        desc: '后脑、上背、臀部靠墙站立，下颌内收，颈线向上延伸。每次呼气感受身体更贴近墙面。作为工间操：每次使用电脑1小时后靠墙校准1分钟。',
        tip: '腰部保留自然前凸，不要强行压平；这是体态归位，不是挤压脊柱',
        icon: 'accessibility_new', phase: 'integrate',
      },
    ],
  },

  {
    id: 'c3',
    name: '颈背 · 强化（健身房）',
    desc: '绳索面拉 · 斜板YT · 悬吊划船 · 深层颈背重塑',
    category: 'neck',
    duration: 25,
    level: '中级',
    icon: 'fitness_center',
    bg: '1',
    evidence: 'A',
    scenes: ['gym'],
    targetMuscles: {
      activate: ['深颈屈肌', '中下斜方肌', '菱形肌', '冈下肌'],
      release: ['上斜方肌', '胸锁乳突肌'],
    },
    moves: [
      {
        id: 'c3-m1', name: '颈部热身 · 等长收缩', duration: 30, sets: 2, reps: '各方向 10次 / 5秒',
        desc: '坐姿，手掌分别置于额头、后脑、左右太阳穴，做抵抗手掌的等长收缩（颈部不移动），各方向保持5秒。激活颈部深层稳定肌，安全热身。',
        tip: '力度30-40%即可；不要做大幅度运动',
        icon: 'self_improvement', phase: 'release',
      },
      {
        id: 'c3-m2', name: '绳索面拉（Cable Face Pull）', duration: 30, sets: 4, reps: '15次 / 保持2秒',
        desc: '绳索设置于眼高，绳端配绳索握把。双手握把，肘部抬高至肩膀水平，将绳索拉向面部（拇指朝向耳后），末端停留2秒感受中下斜方肌与冈下肌用力。是改善头前引和圆肩的顶级循证动作。',
        tip: '全程肘高于手；肩胛骨主动后缩——不是用手臂拉',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c3-m3', name: '斜板 Y-T 举（Prone Y-T on Incline）', duration: 30, sets: 3, reps: 'Y和T各12次',
        desc: '俯身于30-45°斜板，双臂悬空。做Y举（双臂斜上45°，拇指朝上）12次，再做T举（双臂正侧90°）12次。斜板减少腰部代偿，让中斜方肌充分发力。可持轻哑铃（1-3kg）。',
        tip: '动作缓慢，2秒举起3秒落下；不要用惯性',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c3-m4', name: '悬吊TRX划船（Inverted Row）', duration: 30, sets: 3, reps: '10次 / 保持2秒',
        desc: 'TRX或固定杠设置腰高，仰卧抓握，身体倾斜（脚越前越难），以肩胛骨后缩带动将身体拉起，顶端停留2秒，肩胛骨最大程度夹紧。慢慢下放。强化菱形肌和中斜方肌。',
        tip: '顶端时肩膀不要耸起；是从背部发力，不是手臂弯曲',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c3-m5', name: '绳索颈屈曲（深颈屈肌）', duration: 20, sets: 3, reps: '12次 / 控制3秒',
        desc: '站于绳索机旁，绳端固定头带或手持绳索置额前，站直保持颈部中立，缓慢做颌内收式点头对抗阻力，控制3秒后缓慢回位。直接强化深颈屈肌（头长肌/颈长肌）。',
        tip: '幅度小而精准；阻力从轻开始，不要为了重量而代偿',
        icon: 'fitness_center', phase: 'integrate',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 肩背 — 居家 · 办公室 · 健身房
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'c4',
    name: '肩背 · 舒展（居家）',
    desc: '胸肌松弛 · 肩胛归位 · 让背部从容展开',
    category: 'shoulder',
    duration: 20,
    level: '初级',
    icon: 'accessibility_new',
    bg: '2',
    evidence: 'A',
    scenes: ['home'],
    targetMuscles: {
      activate: ['中下斜方肌', '菱形肌', '冈下肌', '前锯肌'],
      release: ['胸大肌', '胸小肌', '上斜方肌'],
    },
    moves: [
      {
        id: 'c4-m1', name: '胸椎泡沫轴 · 胸椎伸展', duration: 60, sets: 1, reps: '60秒',
        desc: '泡沫轴横置于上背（T4-T8），双手托头，缓慢向后伸展，每节停留8秒后移动。胸椎活动度不足是圆肩含胸的根本原因之一，松开胸椎才能让肩膀真正归位。',
        tip: '专注于胸椎，不要压腰椎；呼气时让重力帮助伸展',
        icon: 'sports_gymnastics', phase: 'release',
      },
      {
        id: 'c4-m2', name: '门框胸肌拉伸 · 中位', duration: 45, sets: 2, reps: '45秒 × 2组',
        desc: '面对门框，双臂平举（90°）扶住门框两侧，身体缓慢前倾，感受胸肌中部和前肩的拉伸。45秒后换高位（双臂举至120°）再拉伸45秒。',
        tip: '双肩主动下沉；不要让肩膀耸向耳朵',
        icon: 'accessibility_new', phase: 'release',
      },
      {
        id: 'c4-m3', name: '墙天使（Wall Slides）', duration: 30, sets: 3, reps: '12次',
        desc: '背贴墙，双臂弯曲成W字贴墙，缓慢沿墙上滑至Y字再落回。全程手背、肘部、后脑不离墙面。激活中下斜方肌和前锯肌协同控制肩胛骨。RCT研究证实对圆肩有显著改善效果。',
        tip: '当任何部位离墙时立刻缩小幅度，不要强行完成全程',
        icon: 'self_improvement', phase: 'activate',
      },
      {
        id: 'c4-m4', name: '侧卧外旋 · 冈下肌激活', duration: 30, sets: 3, reps: '12次 / 保持2秒',
        desc: '侧卧，上方手臂肘部弯曲90°贴于腰侧，以肘为轴向上外旋至与地面平行，顶端停留2秒后控制下落。冈下肌和小圆肌是防止圆肩复发的关键。',
        tip: '肘部始终贴住腰侧；如需增加阻力可手持水瓶',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c4-m5', name: '弹力带面拉 · 肩后链激活', duration: 30, sets: 3, reps: '15次 / 保持2秒',
        desc: '弹力带固定于眼高，双手握带，肘部抬高外展，将带拉向面部（拇指朝向耳后），末端停留2秒。2秒拉起3秒放松。中下斜方肌+菱形肌联合激活。',
        tip: '肩膀不要随拉力上耸；感受背部中央的用力',
        icon: 'fitness_center', phase: 'integrate',
      },
    ],
  },

  {
    id: 'c5',
    name: '肩背 · 减压（办公室）',
    desc: '久坐肩颈速效减压 · 桌旁完成 · 10分钟',
    category: 'shoulder',
    duration: 10,
    level: '初级',
    icon: 'accessibility_new',
    bg: '2',
    evidence: 'A',
    scenes: ['office'],
    targetMuscles: {
      activate: ['中斜方肌', '菱形肌'],
      release: ['胸小肌', '上斜方肌', '肩胛提肌'],
    },
    moves: [
      {
        id: 'c5-m1', name: '坐姿胸椎旋转 · 松动', duration: 30, sets: 2, reps: '10次 / 侧',
        desc: '坐直，双手交叉置于胸前，以胸椎为轴缓慢向左转动上身至最大舒适角度，停留2秒，回正再向右转动。全程腰部保持稳定，只旋转上背。',
        tip: '不要让椅子跟着旋转；旋转来自胸椎，不是腰椎',
        icon: 'rotate_right', phase: 'release',
      },
      {
        id: 'c5-m2', name: '胸小肌 · 桌旁拉伸', duration: 30, sets: 2, reps: '30秒 / 侧',
        desc: '站于桌角旁，单臂举至约150°扶桌沿，身体缓慢向前向外转动，感受腋窝深处（胸小肌）的拉伸。胸小肌过紧是含胸和肩胛骨前倾的主因。',
        tip: '感受拉伸在腋窝深处，而非表浅的胸肌',
        icon: 'accessibility_new', phase: 'release',
      },
      {
        id: 'c5-m3', name: '坐姿W肩 · 肩后链激活', duration: 20, sets: 3, reps: '15次 / 保持3秒',
        desc: '坐直，双臂弯曲成W字（肘平肩，前臂朝上），向后向外发力将肩胛骨夹紧，保持3秒后慢慢放松。这是办公室最有效的背部激活动作，激活中斜方肌和菱形肌。',
        tip: '保持时感受背部中央两块骨头（肩胛骨）向中间夹紧',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c5-m4', name: '手臂画圆 · 肩关节灵活', duration: 20, sets: 2, reps: '各方向10次',
        desc: '站立，双臂向侧平举，做向前大圆（10次）和向后大圆（10次）。保持肩膀下沉，从肩关节发力，改善久坐后肩关节僵硬。',
        tip: '画圆时肩膀不要耸起；向后画圆时感受肩胛骨的运动',
        icon: 'accessibility_new', phase: 'integrate',
      },
    ],
  },

  {
    id: 'c6',
    name: '肩背 · 重塑（健身房）',
    desc: '杠铃划船 · 绳索外旋 · 哑铃YT · 肩背深层重塑',
    category: 'shoulder',
    duration: 30,
    level: '中级',
    icon: 'fitness_center',
    bg: '2',
    evidence: 'A',
    scenes: ['gym'],
    targetMuscles: {
      activate: ['中下斜方肌', '菱形肌', '冈下肌', '前锯肌'],
      release: ['胸大肌', '胸小肌'],
    },
    moves: [
      {
        id: 'c6-m1', name: '胸椎伸展 · 泡沫轴热身', duration: 60, sets: 1, reps: '60秒',
        desc: '泡沫轴横置上背，双手托头，缓慢向后伸展。覆盖T4-T8段各8-10秒。训练前必须激活胸椎活动度，否则所有背部动作都会被腰椎代偿。',
        tip: '这是必要的热身，不要跳过',
        icon: 'sports_gymnastics', phase: 'release',
      },
      {
        id: 'c6-m2', name: '坐姿绳索划船（Cable Seated Row）', duration: 30, sets: 4, reps: '12次 / 保持2秒',
        desc: '坐于绳索划船机，握窄距把手，以肩胛骨后缩带动将把手拉向下腹部，顶端停留2秒，肘部贴近体侧，慢慢伸直控制回位。强化菱形肌、中下斜方肌和大圆肌。',
        tip: '不要用上身后仰借力；是肩胛骨的主动后缩，不是手臂弯曲',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c6-m3', name: '绳索外旋（Cable External Rotation）', duration: 25, sets: 3, reps: '15次 / 保持2秒',
        desc: '侧站于绳索机，绳索设置腰高，握把手以肘为轴做外旋（前臂从腹部前方旋至与地面平行），顶端保持2秒。直接激活冈下肌和小圆肌——肩袖稳定的核心。',
        tip: '肘部始终夹紧腰侧；控制回位不要让绳索带回',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c6-m4', name: '哑铃俯卧Y-T举', duration: 30, sets: 3, reps: 'Y和T各12次',
        desc: '俯身于训练凳（约45°），手持轻哑铃（2-5kg），做Y举（斜上45°，拇指朝上）12次后立刻做T举（正侧90°）12次。比地面版增加了ROM和阻力挑战。',
        tip: '重量宁轻勿重；动作质量远比重量重要',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c6-m5', name: '哑铃俯身划船（Bent-Over Row）', duration: 30, sets: 3, reps: '10次 / 保持2秒',
        desc: '双脚肩宽，俯身45°，哑铃垂于身前。以肩胛骨后缩带动将哑铃拉向髋部，肘部略超过背平面，顶端停留2秒感受肩胛骨充分夹紧后慢慢下放。',
        tip: '保持背部平直和颈部中立；是"划船"而不是"耸肩"',
        icon: 'fitness_center', phase: 'integrate',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 骨盆/核心 — 居家 · 办公室 · 健身房
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'c7',
    name: '骨盆 · 归位（居家）',
    desc: '髂腰肌松弛 · 臀部唤醒 · 骨盆重回中央',
    category: 'pelvis',
    duration: 20,
    level: '初级',
    icon: 'accessibility_new',
    bg: '3',
    evidence: 'A',
    scenes: ['home'],
    targetMuscles: {
      activate: ['臀大肌', '臀中肌', '腹横肌', '多裂肌'],
      release: ['髂腰肌', '股直肌', '阔筋膜张肌'],
    },
    moves: [
      {
        id: 'c7-m1', name: '髂腰肌 · 半跪深度拉伸', duration: 60, sets: 2, reps: '60秒 / 侧',
        desc: '半跪姿（后膝着地），前腿弓步，骨盆主动后倾（收尾骨），身体直立缓慢前移重心。感受后腿髋前方深处的拉伸。骨盆前倾的核心原因之一是髂腰肌持续缩短——长时间久坐让它几乎忘记了放松。',
        tip: '骨盆后倾是关键：先收尾骨，再前移重心，才能拉到髂腰肌',
        icon: 'accessibility_new', phase: 'release',
      },
      {
        id: 'c7-m2', name: '股直肌 · 沙发拉伸', duration: 45, sets: 2, reps: '45秒 / 侧',
        desc: '半跪，后脚背靠在沙发或椅子上，骨盆保持后倾，感受大腿前侧深层的拉伸。股直肌（大腿前侧）既屈髋又伸膝，是骨盆前倾的另一主因。',
        tip: '腰部不要过度前弓；保持腹部轻收、尾骨向下',
        icon: 'accessibility_new', phase: 'release',
      },
      {
        id: 'c7-m3', name: '仰卧臀桥 · 臀大肌激活', duration: 30, sets: 3, reps: '15次 / 顶端2秒',
        desc: '仰卧屈膝，脚跟与臀同宽，脚踩实地面。收腹，以臀部发力将骨盆推向天花板，顶端保持2秒感受臀部充分收缩，缓慢下落。研究显示臀桥激活臀大肌效率在常见动作中名列前茅。',
        tip: '顶端骨盆水平，不要过度挺腰；臀部用力，不是腰部撑起',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c7-m4', name: '蚌式 · 臀中肌激活', duration: 30, sets: 3, reps: '15次 / 侧',
        desc: '侧卧屈膝，脚跟并拢，上方膝盖缓慢向上打开如蚌壳，顶端停留1秒后慢慢落回。臀中肌是骨盆侧向稳定的核心，弱化会导致行走时骨盆歪斜。',
        tip: '骨盆不要随膝盖一起后倒；可在膝上套弹力带增加阻力',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c7-m5', name: '鸟狗式 · 核心稳定', duration: 30, sets: 3, reps: '10次 / 侧 / 保持5秒',
        desc: '四足跪姿，脊柱中立。先激活腹横肌（轻收腹），再同时伸出对侧手臂与腿，保持5秒，感受腰背肌肉对称发力。麦吉尔Big 3之一，是脊柱稳定的最强循证动作之一。',
        tip: '伸展时腰部不要旋转或塌陷；想象背上放一杯水，保持水平',
        icon: 'fitness_center', phase: 'integrate',
      },
    ],
  },

  {
    id: 'c8',
    name: '骨盆 · 立（办公室）',
    desc: '久坐骨盆意识重建 · 坐站完成 · 10分钟',
    category: 'pelvis',
    duration: 10,
    level: '初级',
    icon: 'accessibility_new',
    bg: '3',
    evidence: 'A',
    scenes: ['office'],
    targetMuscles: {
      activate: ['臀大肌', '腹横肌'],
      release: ['髂腰肌', '股直肌'],
    },
    moves: [
      {
        id: 'c8-m1', name: '坐姿骨盆前后倾 · 意识建立', duration: 20, sets: 2, reps: '10次前后',
        desc: '坐于椅子前三分之一，双脚踩实地面。缓慢做骨盆前倾（腰部前弓，坐骨向后突出）和骨盆后倾（腰部变平，坐骨向前）各10次。找到两端之间的"中立位"——这是正确的坐姿骨盆位置。',
        tip: '中立位是两端之间约30%前倾的自然曲线，不是刻意前弓也不是压平',
        icon: 'self_improvement', phase: 'release',
      },
      {
        id: 'c8-m2', name: '站姿髋屈肌拉伸 · 桌边', duration: 30, sets: 2, reps: '30秒 / 侧',
        desc: '站于桌边，单脚向后迈一大步，前腿弓步，后腿伸直（后脚跟可略抬），骨盆后倾，感受后腿髋前方的温和拉伸。这是给久坐髂腰肌做的快速减压。',
        tip: '骨盆后倾是关键——先收尾骨，否则拉不到正确位置',
        icon: 'accessibility_new', phase: 'release',
      },
      {
        id: 'c8-m3', name: '坐姿臀肌激活 · 等长收缩', duration: 20, sets: 3, reps: '10次 / 保持5秒',
        desc: '坐直，双脚踩实地面，将双侧臀肌同时用力夹紧，保持5秒后放松。重复10次。久坐使臀肌"忘记"发力——这是最简单的神经重连方式，可在开会时悄悄做。',
        tip: '只夹紧臀部，不要憋气或让腰部参与',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c8-m4', name: '站姿小幅深蹲 · 臀肌唤醒', duration: 20, sets: 3, reps: '15次',
        desc: '站立，双脚与肩同宽，做约45°的浅蹲（不需要蹲深），站起时有意识地感受臀部收缩。速度放慢：2秒下，1秒起。帮助打破久坐导致的臀肌失活。',
        tip: '膝盖跟随脚尖，不要内扣；站起时臀部夹紧一下',
        icon: 'fitness_center', phase: 'integrate',
      },
    ],
  },

  {
    id: 'c9',
    name: '核心 · 立（健身房）',
    desc: '臀推 · 保加利亚分腿蹲 · 核心综合强化',
    category: 'pelvis',
    duration: 30,
    level: '中级',
    icon: 'fitness_center',
    bg: '3',
    evidence: 'A',
    scenes: ['gym'],
    targetMuscles: {
      activate: ['臀大肌', '臀中肌', '腹横肌', '多裂肌'],
      release: ['髂腰肌', '阔筋膜张肌'],
    },
    moves: [
      {
        id: 'c9-m1', name: '髂腰肌 · 泡沫轴松弛', duration: 60, sets: 1, reps: '60秒 / 侧',
        desc: '俯卧，泡沫轴置于髋屈肌（腹股沟偏外位置），缓慢滚动并在紧绷处停留10秒。在大重量训练前松弛髂腰肌，改善髋关节活动度和训练动作质量。',
        tip: '避开骨骼突出点；感受深处的酸胀后深呼吸放松',
        icon: 'sports_gymnastics', phase: 'release',
      },
      {
        id: 'c9-m2', name: '杠铃臀推（Hip Thrust）', duration: 30, sets: 4, reps: '10次 / 顶端2秒',
        desc: '上背靠于训练凳，杠铃置于髋部（垫护具），双脚踩实地面。以臀部爆发力将骨盆推至与躯干成一直线，顶端骨盆水平，保持2秒，控制下落。是激活臀大肌效率最高的循证动作（EMG研究验证）。',
        tip: '顶端时腰椎保持中立，不要过度伸展；感受臀部最大收缩',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c9-m3', name: '保加利亚分腿蹲（Bulgarian Split Squat）', duration: 35, sets: 3, reps: '8次 / 侧',
        desc: '后脚搭于训练凳，前脚向前迈出充分，保持上身直立，缓慢下蹲至前腿大腿与地面平行，前腿臀部和股四头肌发力站起。单侧训练暴露左右失衡，同时强化臀中肌稳定。',
        tip: '前腿膝盖不要超过脚尖过多；保持躯干直立，不要前倾过大',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c9-m4', name: '绳索拉力 · 反向弓步', duration: 30, sets: 3, reps: '10次 / 侧',
        desc: '绳索设于高位，单手握把，向后迈步做反向弓步，同时对侧手臂向前拉绳索（模拟走路时的手臂摆动）。训练骨盆在功能性动作中的控制与稳定。',
        tip: '下蹲时保持骨盆水平；感受前腿臀部的稳定发力',
        icon: 'fitness_center', phase: 'integrate',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 腰背 — 居家
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'c10',
    name: '腰背 · 安放（居家）',
    desc: 'DNS呼吸 · 麦吉尔大三 · 找回脊柱的从容',
    category: 'back',
    duration: 22,
    level: '初级',
    icon: 'spa',
    bg: '4',
    evidence: 'A',
    scenes: ['home'],
    targetMuscles: {
      activate: ['腹横肌', '多裂肌', '臀大肌'],
      release: ['竖脊肌', '腰方肌'],
    },
    moves: [
      {
        id: 'c10-m1', name: '猫牛式 · 脊柱律动', duration: 60, sets: 1, reps: '10次缓慢',
        desc: '四足跪姿，吸气胸口向下、尾骨上翘（牛式），呼气背部拱起、尾骨内收（猫式）。随呼吸缓慢完成10次，找到脊柱的流动感。松弛椎间盘和关节突关节，改善腰椎整体活动度。',
        tip: '速度要慢，感受每一节脊椎；不要只做颈部和腰部的极端动作',
        icon: 'self_improvement', phase: 'release',
      },
      {
        id: 'c10-m2', name: 'DNS 90/90 · 呼吸安放', duration: 180, sets: 1, reps: '3分钟',
        desc: '仰卧，双腿搭于椅上（髋膝各90°），腰背完全贴地。双手置肋骨两侧，吸气时感受肋骨向四面八方扩张（360°呼吸），呼气时回落同时轻轻感受腹横肌参与。布拉格学派DNS协议的核心练习，重建胸腔-腹腔-盆底的压力整合。',
        tip: '这是放松与整合，不要用力；让重力帮助腰背安放在垫面',
        icon: 'spa', phase: 'release',
      },
      {
        id: 'c10-m3', name: '麦吉尔卷腹 · 多裂肌保护', duration: 30, sets: 3, reps: '8次 / 保持10秒',
        desc: '仰卧，一腿伸直，一腿屈膝。双手置于腰椎下方支撑自然前凸。缓慢将头肩抬离地面约2-3cm，保持10秒后落回。专门设计为在最小椎间盘压力下激活多裂肌和腹直肌。',
        tip: '幅度极小，不是仰卧起坐；保持颈部中立，不要用力前屈颈部',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c10-m4', name: '鸟狗式 · 深层稳定', duration: 30, sets: 3, reps: '10次 / 侧 / 保持10秒',
        desc: '四足跪姿，先激活腹横肌，同时伸出对侧手脚，保持10秒，感受腰背肌肉对称发力。麦吉尔Big 3之一，在所有脊柱稳定动作中，鸟狗式对多裂肌的激活最为有效。',
        tip: '伸展时腰部不要旋转或塌陷；背部平如桌面',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c10-m5', name: '侧卧改良平板 · 腰方肌', duration: 30, sets: 3, reps: '30秒 / 侧',
        desc: '侧卧，下方肘部支撑，膝盖弯曲（改良版）或双腿伸直，臀部抬离地面保持一条直线，全程均匀呼吸。麦吉尔Big 3之一，专门激活腰方肌和腹斜肌而避免椎间盘压力。',
        tip: '臀部不要前移或后移；当腰部无法保持直线时立刻停止',
        icon: 'fitness_center', phase: 'integrate',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 膝稳 — 居家 · 健身房
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'c11',
    name: '膝稳 · 养成（居家）',
    desc: '小腿松弛 · VMO激活 · 本体感觉重建',
    category: 'knee',
    duration: 20,
    level: '初级',
    icon: 'directions_walk',
    bg: '5',
    evidence: 'A',
    scenes: ['home'],
    targetMuscles: {
      activate: ['股四头肌VMO', '臀中肌', '腘绳肌'],
      release: ['腓肠肌', '比目鱼肌', '髂胫束'],
    },
    moves: [
      {
        id: 'c11-m1', name: '腓肠肌 · 台阶站立拉伸', duration: 45, sets: 2, reps: '45秒 / 侧',
        desc: '站于台阶边沿，单脚前掌踩台阶，脚跟自然下沉，腿伸直，感受小腿上段的拉伸。保持45秒，换边。可扶墙保持平衡。腓肠肌过紧是膝超伸的促成因素之一。',
        tip: '腿保持伸直；脚跟要完全悬空才能充分拉伸',
        icon: 'accessibility_new', phase: 'release',
      },
      {
        id: 'c11-m2', name: '弹力带TKE · 终末膝关节伸展', duration: 30, sets: 3, reps: '15次 / 保持2秒',
        desc: '弹力带固定于低处套于膝盖后方，站立微屈膝，对抗阻力将膝盖最后15°伸直，顶端保持2秒感受大腿内侧（VMO-股内侧肌）收缩，慢慢弯回。TKE专门针对膝内侧稳定和膝超伸的神经肌肉控制。',
        tip: 'VMO的收缩感在大腿前内侧；膝关节不要过度锁死',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c11-m3', name: '蚌式 · 臀中肌激活', duration: 30, sets: 3, reps: '15次 / 侧',
        desc: '侧卧屈膝，弹力带套于膝上，脚跟并拢，上方膝盖缓慢打开，顶端1秒后落回。臀中肌无力导致膝关节内扣，是膝痛和膝超伸最常见的原因之一。',
        tip: '骨盆保持稳定；感受大腿外侧和臀部外侧的用力',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c11-m4', name: '单腿平衡 · 本体感觉重建', duration: 30, sets: 3, reps: '30秒 / 侧',
        desc: '单腿站立，保持膝盖轻微弯曲（10-20°，不锁死），对侧腿悬空，视线固定一点。感受脚踝和膝盖的本体感觉控制。进阶：闭眼或站于折叠毛巾上。',
        tip: '膝盖保持与第二趾对齐；每次晃动是神经肌肉在适应，是好事',
        icon: 'accessibility_new', phase: 'integrate',
      },
    ],
  },

  {
    id: 'c12',
    name: '膝稳 · 进阶（健身房）',
    desc: '北欧腘绳肌 · 单腿压腿机 · 离心深蹲',
    category: 'knee',
    duration: 28,
    level: '中级',
    icon: 'fitness_center',
    bg: '5',
    evidence: 'A',
    scenes: ['gym'],
    targetMuscles: {
      activate: ['腘绳肌', '股四头肌VMO', '臀大肌'],
      release: ['股四头肌', '髂胫束'],
    },
    moves: [
      {
        id: 'c12-m1', name: '股四头肌 · 泡沫轴松弛', duration: 60, sets: 1, reps: '60秒 / 侧',
        desc: '俯卧，泡沫轴置于大腿前侧，缓慢上下滚动（髋到膝），在紧绷处停留10秒。股四头肌过度主导是膝关节问题的常见根源。',
        tip: '把脚踝勾起可增加拉伸效果；在最酸胀处停留多呼吸几次',
        icon: 'sports_gymnastics', phase: 'release',
      },
      {
        id: 'c12-m2', name: '北欧腘绳肌离心弯举（Nordic Curl）', duration: 40, sets: 3, reps: '5-6次 / 离心4秒',
        desc: '跪于垫上，双脚由训练凳或伙伴压住。保持躯干挺直，缓慢向前倒（4秒离心），快到地面时用手撑地控制。Scientific Reports 2025 网络元分析：Nordic curl是预防腘绳肌损伤循证级别最高的动作，也对腘绳肌肌力和膝稳定性有显著改善。',
        tip: '向前倒越慢越好；这个动作难度很高，初次从3-4次开始',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c12-m3', name: '单腿腿举（Single-Leg Leg Press）', duration: 30, sets: 3, reps: '10次 / 侧',
        desc: '腿举机，单腿置于踏板，重量适中，缓慢推起（脚跟发力），控制下落至大腿约90°。专注大腿内侧（VMO）的参与感。单腿排查双腿力量差异。',
        tip: '膝盖跟随脚尖方向；下落阶段控制不要让膝盖内扣',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c12-m4', name: '慢速深蹲 · 离心控制', duration: 30, sets: 3, reps: '8次 / 离心4秒',
        desc: '双脚肩宽，用4秒缓慢下蹲至大腿与地面平行（离心阶段），底部停留1秒，1秒站起。离心阶段的控制能力是膝关节功能的核心指标，比向心阶段更重要。',
        tip: '下蹲时感受股四头肌的离心张力；脊柱中立，不要前倾过大',
        icon: 'fitness_center', phase: 'integrate',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 足弓 — 居家
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'c13',
    name: '足弓 · 生长（居家）',
    desc: '足底松弛 · 短足练习 · 胫后肌离心提踵',
    category: 'foot',
    duration: 15,
    level: '初级',
    icon: 'directions_walk',
    bg: '6',
    evidence: 'A',
    scenes: ['home'],
    targetMuscles: {
      activate: ['足底内在肌', '胫骨后肌', '趾屈肌'],
      release: ['足底筋膜', '腓肠肌', '比目鱼肌'],
    },
    moves: [
      {
        id: 'c13-m1', name: '足底筋膜 · 按摩球松弛', duration: 60, sets: 1, reps: '60秒 / 足',
        desc: '站立，网球或筋膜球置于足底，从脚跟向前滚动，覆盖整个足弓，在酸胀点停留10秒后继续移动。每足60秒。足底筋膜松弛是足弓功能训练的前提，否则内在肌无法充分激活。',
        tip: '体重部分转移到足底球；避开骨骼突起处施压',
        icon: 'sports_gymnastics', phase: 'release',
      },
      {
        id: 'c13-m2', name: '小腿双侧拉伸 · 腓肠+比目鱼', duration: 45, sets: 2, reps: '各45秒 / 侧',
        desc: '扶墙站立，一腿向后伸直（腓肠肌拉伸），再微屈膝（比目鱼肌拉伸），各保持45秒换边。小腿过紧会限制踝关节背屈，影响步态和足弓负重时的形态。',
        tip: '后脚脚跟始终踩实；能感受到拉伸位置在小腿不同高度',
        icon: 'accessibility_new', phase: 'release',
      },
      {
        id: 'c13-m3', name: '短足练习（Short Foot Exercise）', duration: 30, sets: 3, reps: '10次 / 保持10秒',
        desc: '坐或站立，脚掌放松。尝试将前掌球（趾骨头）向脚跟方向靠拢（缩短足部），感受足弓被主动拱起——不是抓地或弯脚趾，而是足底内在肌收缩。保持10秒。多项RCT研究证实SFE能有效激活足底内在肌，改善扁平足。',
        tip: '趾头不要弯曲，脚跟不要离地；这是细微的内在肌控制，需要时间学习',
        icon: 'self_improvement', phase: 'activate',
      },
      {
        id: 'c13-m4', name: '胫后肌 · 离心提踵', duration: 30, sets: 3, reps: '10次 / 侧 / 下落3秒',
        desc: '站于台阶边，用双腿一起踮起脚跟（向心阶段，双腿完成），然后单腿控制脚跟下落（3秒离心）。胫骨后肌是维持内侧足弓的最重要肌肉，离心训练是改善扁平足的最强循证方式。10次后换边。',
        tip: '下落阶段越慢越有效；感受脚踝内侧肌肉的控制力',
        icon: 'fitness_center', phase: 'integrate',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 产后 — 居家
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'c14',
    name: '产后 · 核心归位',
    desc: '温柔唤醒 · 呼吸-盆底-腹横肌连线重建',
    category: 'postpartum',
    duration: 18,
    level: '初级',
    icon: 'spa',
    bg: '3',
    evidence: 'A',
    scenes: ['home'],
    targetMuscles: {
      activate: ['腹横肌', '盆底肌', '多裂肌'],
      release: ['腰方肌', '髋屈肌'],
    },
    moves: [
      {
        id: 'c14-m1', name: '横膈膜 · 360°呼吸唤醒', duration: 180, sets: 1, reps: '3分钟',
        desc: '仰卧屈膝，双手放于下腹两侧。吸气时让腹部、侧腰、后腰向四周轻轻扩张（360°呼吸），呼气时感受腹部自然回落、轻轻向内收拢。这是产后核心重建的第一步——重新激活呼吸与核心的协调。',
        tip: '不要刻意鼓肚子或吸肚子，让呼吸自然带动；这是放松练习',
        icon: 'spa', phase: 'release',
      },
      {
        id: 'c14-m2', name: '盆底 · 轻柔唤醒', duration: 120, sets: 3, reps: '10次 / 保持5秒',
        desc: '仰卧或侧卧，呼气时轻轻上提盆底（像轻轻憋住气流的感觉），保持5秒，吸气时完全放松（放松与收紧同样重要）。强度约30%。产后6-8周后开始，需确认无产后出血。',
        tip: '臀部和大腿保持放松，只用盆底深层发力',
        icon: 'spa', phase: 'activate',
      },
      {
        id: 'c14-m3', name: '腹横肌 · 贴合激活', duration: 120, sets: 3, reps: '10次 / 保持10秒',
        desc: '仰卧屈膝，呼气时将肚脐轻轻向脊柱方向贴近（约30%力度），同时配合盆底轻提，保持10秒自然呼吸后放松。腹直肌分离改善的核心动作——保持腹部中线平整，不要鼓起。',
        tip: '腹部中线如有明显鼓起，立刻减小幅度；轻柔是关键',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c14-m4', name: '脚跟滑动 · 核心稳定进阶', duration: 120, sets: 3, reps: '8次 / 侧',
        desc: '仰卧屈膝，保持腹横肌轻收，一侧脚跟沿地面缓慢向远处滑出伸直，再缓慢收回。全程腰部贴地、骨盆不晃动。',
        tip: '腰部一旦离地或腹部中线鼓起，缩小滑动幅度',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c14-m5', name: '温和臀桥 · 唤醒臀部', duration: 120, sets: 3, reps: '12次 / 保持2秒',
        desc: '仰卧屈膝，呼气时由臀部发力缓慢抬起骨盆，顶端保持2秒，吸气缓慢落回。唤醒臀部，分担腰部压力。高度以腰部无压力为准。',
        tip: '不追求高度；感受臀部的用力，而不是腰部的撑起',
        icon: 'fitness_center', phase: 'integrate',
      },
    ],
  },

  {
    id: 'c15',
    name: '产后 · 骨盆安放',
    desc: '骨盆稳稳安放 · 从里到外重新立住',
    category: 'postpartum',
    duration: 20,
    level: '初级',
    icon: 'spa',
    bg: '6',
    evidence: 'A',
    scenes: ['home'],
    targetMuscles: {
      activate: ['臀中肌', '盆底肌', '腹横肌'],
      release: ['髋屈肌', '梨状肌', '腰方肌'],
    },
    moves: [
      {
        id: 'c15-m1', name: '骨盆 · 时钟律动', duration: 120, sets: 2, reps: '各方向 8次',
        desc: '仰卧屈膝，想象骨盆是一个时钟，缓慢做前倾（12点）、后倾（6点）、左右侧倾（3点/9点）的小幅律动，重新找回骨盆的活动感知。',
        tip: '动作越小越好，专注感受而不是幅度',
        icon: 'rotate_right', phase: 'release',
      },
      {
        id: 'c15-m2', name: '梨状肌 · 4字舒展', duration: 90, sets: 2, reps: '45秒 / 侧',
        desc: '仰卧屈膝，一侧脚踝搭在对侧膝盖上呈4字，双手抱住下方大腿轻轻拉向胸口，感受臀部深层的舒展。',
        tip: '保持呼吸，骨盆贴地不要翘起',
        icon: 'self_improvement', phase: 'stretch',
      },
      {
        id: 'c15-m3', name: '髋前 · 半跪舒展', duration: 120, sets: 2, reps: '60秒 / 侧',
        desc: '半跪姿，骨盆轻轻后倾，身体直立前移，感受后腿髋前方的温和拉伸。孕期被缩短的髋前侧需要慢慢打开。',
        tip: '如膝盖不适可垫毛巾；幅度以舒适为准',
        icon: 'accessibility_new', phase: 'stretch',
      },
      {
        id: 'c15-m4', name: '蚌式 · 臀中肌唤醒', duration: 120, sets: 3, reps: '12次 / 侧',
        desc: '侧卧屈膝，脚跟并拢，呼气时上方膝盖缓慢打开，同时轻收盆底与腹部，顶端停留1秒后落回。唤醒孕产后沉睡的臀中肌。',
        tip: '骨盆保持稳定向前，不要随膝盖向后翻',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c15-m5', name: '靠墙 · 体态整合归位', duration: 120, sets: 2, reps: '60秒',
        desc: '靠墙站立，从足底到头顶逐一对齐：足弓轻拱→膝盖微弯→骨盆中立→腹部轻收→肩膀下沉→颈线向上。带着这份秩序感走入日常。',
        tip: '每天抱娃前后做一次，让身体记住归位的感觉',
        icon: 'accessibility_new', phase: 'integrate',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 全身整合 — 居家
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'c16',
    name: '松而不塌 · 全身整合',
    desc: '全身秩序 · 松弛与力量共存',
    category: 'full',
    duration: 30,
    level: '中级',
    icon: 'fitness_center',
    bg: '1',
    evidence: 'A',
    scenes: ['home'],
    targetMuscles: {
      activate: ['深颈屈肌', '中下斜方肌', '腹横肌', '臀大肌', '臀中肌'],
      release: ['上斜方肌', '胸肌', '髂腰肌'],
    },
    moves: [
      {
        id: 'c16-m1', name: '全身动态热身 · 律动唤醒', duration: 300, sets: 1, reps: '5分钟',
        desc: '包含：颈部缓慢侧弯旋转（各5次）、肩绕环（10次）、胸椎旋转（10次/侧）、髋绕环（10次/侧）、踝绕环（10次/侧）。节奏缓慢，唤醒全身关节。',
        tip: '热身不可省略；感受每个关节的流动感',
        icon: 'directions_run', phase: 'release',
      },
      {
        id: 'c16-m2', name: 'CCF颌内收 + YTW · 颈背联合', duration: 30, sets: 3, reps: '各10次',
        desc: '仰卧做CCF颌内收10次（每次保持10秒），翻身俯卧做YTW各10次。颈背协同训练——深颈屈肌与中下斜方肌是改善头前引和圆肩的最佳拍档。',
        tip: '颌内收幅度小而精准；YTW保持肩胛骨稳定后缩',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c16-m3', name: '臀桥 + 死虫 · 核心超级组', duration: 40, sets: 3, reps: '各10次',
        desc: '先做臀桥15次（顶端2秒），不休息立即做死虫8次/侧（腰部始终贴地）。臀部激活后核心的跟进——建立骨盆稳定到腰背控制的神经联结。',
        tip: '死虫腰部离地立刻停止；超级组无组间休息',
        icon: 'fitness_center', phase: 'activate',
      },
      {
        id: 'c16-m4', name: '短足 + 单腿平衡 · 地面整合', duration: 30, sets: 3, reps: '30秒 / 侧',
        desc: '单腿站立时，同时保持短足练习（足弓主动拱起），感受从地面到脊柱的整体体态秩序。足弓→踝→膝→骨盆→脊柱的整体对齐。',
        tip: '从足弓开始建立，向上依次检查膝盖、骨盆、肩膀的位置',
        icon: 'accessibility_new', phase: 'integrate',
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROGRAMS
// ─────────────────────────────────────────────────────────────────────────────

const programs = [
  {
    id: 'p1',
    name: '七日 · 焕新',
    desc: '每天15分钟，重建身体的秩序',
    duration: 7,
    sessionsPerWeek: 7,
    level: '初级',
    icon: 'auto_awesome',
    color: '#c08a7d',
    scenes: ['home', 'office'],
    weeks: [
      {
        week: 1,
        days: [
          { day: 1, label: '第一天', courseId: 'c1', focus: '颈线唤醒' },
          { day: 2, label: '第二天', courseId: 'c4', focus: '肩背舒展' },
          { day: 3, label: '第三天', courseId: 'c7', focus: '骨盆归位' },
          { day: 4, label: '第四天', courseId: 'c10', focus: '腰背安放' },
          { day: 5, label: '第五天', courseId: 'c11', focus: '膝稳养成' },
          { day: 6, label: '第六天', courseId: 'c13', focus: '足弓生长' },
          { day: 7, label: '第七天', courseId: 'c16', focus: '全身整合' },
        ],
      },
    ],
  },

  {
    id: 'p2',
    name: '八周 · 立',
    desc: '循序渐进，八周重建身体的立体秩序',
    duration: 56,
    sessionsPerWeek: 3,
    level: '中级',
    icon: 'trending_up',
    color: '#7d9fc0',
    scenes: ['home', 'gym'],
    weeks: [
      {
        week: 1,
        days: [
          { day: 1, label: '第一天', courseId: 'c1', focus: '颈线基础' },
          { day: 3, label: '第三天', courseId: 'c4', focus: '肩背舒展' },
          { day: 5, label: '第五天', courseId: 'c7', focus: '骨盆归位' },
        ],
      },
      {
        week: 2,
        days: [
          { day: 1, label: '第一天', courseId: 'c10', focus: '腰背安放' },
          { day: 3, label: '第三天', courseId: 'c11', focus: '膝稳养成' },
          { day: 5, label: '第五天', courseId: 'c13', focus: '足弓生长' },
        ],
      },
      {
        week: 3,
        days: [
          { day: 1, label: '第一天', courseId: 'c3', focus: '颈背强化' },
          { day: 3, label: '第三天', courseId: 'c6', focus: '肩背重塑' },
          { day: 5, label: '第五天', courseId: 'c9', focus: '核心立' },
        ],
      },
      {
        week: 4,
        days: [
          { day: 1, label: '第一天', courseId: 'c12', focus: '膝稳进阶' },
          { day: 3, label: '第三天', courseId: 'c3', focus: '颈背巩固' },
          { day: 5, label: '第五天', courseId: 'c6', focus: '肩背巩固' },
        ],
      },
      {
        week: 5,
        days: [
          { day: 1, label: '第一天', courseId: 'c9', focus: '核心强化' },
          { day: 3, label: '第三天', courseId: 'c12', focus: '膝稳强化' },
          { day: 5, label: '第五天', courseId: 'c16', focus: '全身预整合' },
        ],
      },
      {
        week: 6,
        days: [
          { day: 1, label: '第一天', courseId: 'c16', focus: '全身整合一' },
          { day: 3, label: '第三天', courseId: 'c6', focus: '肩背专项' },
          { day: 5, label: '第五天', courseId: 'c16', focus: '全身整合二' },
        ],
      },
      {
        week: 7,
        days: [
          { day: 1, label: '第一天', courseId: 'c3', focus: '颈背专项' },
          { day: 3, label: '第三天', courseId: 'c16', focus: '全身整合三' },
          { day: 5, label: '第五天', courseId: 'c9', focus: '核心专项' },
        ],
      },
      {
        week: 8,
        days: [
          { day: 1, label: '第一天', courseId: 'c16', focus: '八周整合一' },
          { day: 3, label: '第三天', courseId: 'c16', focus: '八周整合二' },
          { day: 5, label: '第五天', courseId: 'c16', focus: '八周成果整合' },
        ],
      },
    ],
  },

  {
    id: 'p3',
    name: '十二周 · 归位',
    desc: '十二周系统重塑，让身体回到它本该有的秩序',
    duration: 84,
    sessionsPerWeek: 4,
    level: '进阶',
    icon: 'workspace_premium',
    color: '#8d7dc0',
    scenes: ['home', 'gym'],
    weeks: [
      { week: 1, phase: '基础期', days: [
        { day: 1, label: '第一天', courseId: 'c1', focus: '颈线基础' },
        { day: 2, label: '第二天', courseId: 'c4', focus: '肩背舒展' },
        { day: 4, label: '第四天', courseId: 'c7', focus: '骨盆归位' },
        { day: 6, label: '第六天', courseId: 'c10', focus: '腰背安放' },
      ]},
      { week: 2, phase: '基础期', days: [
        { day: 1, label: '第一天', courseId: 'c11', focus: '膝稳基础' },
        { day: 2, label: '第二天', courseId: 'c13', focus: '足弓生长' },
        { day: 4, label: '第四天', courseId: 'c1', focus: '颈线巩固' },
        { day: 6, label: '第六天', courseId: 'c7', focus: '骨盆巩固' },
      ]},
      { week: 3, phase: '基础期', days: [
        { day: 1, label: '第一天', courseId: 'c4', focus: '肩背巩固' },
        { day: 2, label: '第二天', courseId: 'c10', focus: '腰背巩固' },
        { day: 4, label: '第四天', courseId: 'c11', focus: '膝稳巩固' },
        { day: 6, label: '第六天', courseId: 'c13', focus: '足弓巩固' },
      ]},
      { week: 4, phase: '基础期', days: [
        { day: 1, label: '第一天', courseId: 'c1', focus: '颈线深化' },
        { day: 2, label: '第二天', courseId: 'c4', focus: '肩背深化' },
        { day: 4, label: '第四天', courseId: 'c7', focus: '骨盆深化' },
        { day: 6, label: '第六天', courseId: 'c10', focus: '腰背深化' },
      ]},
      { week: 5, phase: '强化期', days: [
        { day: 1, label: '第一天', courseId: 'c3', focus: '颈背强化' },
        { day: 2, label: '第二天', courseId: 'c6', focus: '肩背重塑' },
        { day: 4, label: '第四天', courseId: 'c9', focus: '核心立' },
        { day: 6, label: '第六天', courseId: 'c12', focus: '膝稳进阶' },
      ]},
      { week: 6, phase: '强化期', days: [
        { day: 1, label: '第一天', courseId: 'c3', focus: '颈背进阶' },
        { day: 2, label: '第二天', courseId: 'c6', focus: '肩背进阶' },
        { day: 4, label: '第四天', courseId: 'c9', focus: '核心进阶' },
        { day: 6, label: '第六天', courseId: 'c12', focus: '膝稳强化' },
      ]},
      { week: 7, phase: '强化期', days: [
        { day: 1, label: '第一天', courseId: 'c3', focus: '颈背功能' },
        { day: 2, label: '第二天', courseId: 'c6', focus: '肩背功能' },
        { day: 4, label: '第四天', courseId: 'c9', focus: '核心功能' },
        { day: 6, label: '第六天', courseId: 'c16', focus: '全身预整合' },
      ]},
      { week: 8, phase: '强化期', days: [
        { day: 1, label: '第一天', courseId: 'c9', focus: '核心综合' },
        { day: 2, label: '第二天', courseId: 'c12', focus: '膝稳综合' },
        { day: 4, label: '第四天', courseId: 'c6', focus: '肩背综合' },
        { day: 6, label: '第六天', courseId: 'c16', focus: '全身整合' },
      ]},
      { week: 9, phase: '整合期', days: [
        { day: 1, label: '第一天', courseId: 'c16', focus: '全身整合一' },
        { day: 2, label: '第二天', courseId: 'c3', focus: '颈背专项' },
        { day: 4, label: '第四天', courseId: 'c16', focus: '全身整合二' },
        { day: 6, label: '第六天', courseId: 'c9', focus: '核心专项' },
      ]},
      { week: 10, phase: '整合期', days: [
        { day: 1, label: '第一天', courseId: 'c16', focus: '全身整合三' },
        { day: 2, label: '第二天', courseId: 'c6', focus: '肩背专项' },
        { day: 4, label: '第四天', courseId: 'c16', focus: '全身整合四' },
        { day: 6, label: '第六天', courseId: 'c12', focus: '膝稳专项' },
      ]},
      { week: 11, phase: '整合期', days: [
        { day: 1, label: '第一天', courseId: 'c16', focus: '全身强化一' },
        { day: 2, label: '第二天', courseId: 'c9', focus: '核心专项强化' },
        { day: 4, label: '第四天', courseId: 'c16', focus: '全身强化二' },
        { day: 6, label: '第六天', courseId: 'c13', focus: '足弓专项' },
      ]},
      { week: 12, phase: '整合期', days: [
        { day: 1, label: '第一天', courseId: 'c16', focus: '十二周收尾一' },
        { day: 2, label: '第二天', courseId: 'c16', focus: '十二周收尾二' },
        { day: 4, label: '第四天', courseId: 'c16', focus: '十二周收尾三' },
        { day: 6, label: '第六天', courseId: 'c16', focus: '十二周成果整合' },
      ]},
    ],
  },
];

module.exports = { courses, programs };
