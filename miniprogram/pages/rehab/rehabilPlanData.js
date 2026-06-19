// 专属康复计划数据
// 6 大体态问题 × 3 阶段（适应期/成效期/巩固期）× 3 场景（居家/办公室/健身房）
// 内容基于功能解剖学、筋膜链理论、运动控制与神经可塑性原则编写

const REHAB_PLANS = {

  // ───────────────────────────────────────── 颈椎 / 头前引 ─────────────────────────────────────────
  neck: {
    name: '颈椎归位专项',
    tagline: '12周重建头颈稳定链',
    icon: 'self_improvement',
    color: '#c08a7d',
    totalWeeks: 12,
    science: {
      anatomy: '解剖学：头前引时，颅骨重心前移，每前移2.5cm，颈椎承重约增加4.5kg。深层稳定肌（头长肌、颈长肌）被抑制，上斜方肌、肩胛提肌与枕下肌群代偿性紧张，形成典型的「上交叉综合征」。',
      fascia: '筋膜学：问题沿浅背线（SBL）的枕下段与前深线（DFL）的颈前筋膜传导。枕下肌群与硬脊膜相连，其张力会沿浅背线一路下传至骶骨，因此松解需兼顾筋膜连续性。',
      neuro: '运动神经学：长期低头使深颈屈肌的本体感觉输入减弱，头颈位置觉变差。重建需通过低负荷、高频率的等长收缩，恢复关节位置觉与运动单位的精准募集。',
      brain: '脑科学：头位是身体的「方向舵」，大量前庭与视觉信息在此整合。通过镜面反馈与缓慢可控的动作，可促进初级运动皮层对深层肌的重新映射，将正确头位由「刻意维持」转为「自动化」。',
      habit: '习惯纠正：屏幕高度、枕头厚度与久坐时长是头前引的三大日常诱因。将屏幕抬高至与眼平齐、采用支撑颈曲的枕头、并以60分钟为周期起身回收，是巩固训练成果的关键。',
    },
    phases: [
      {
        id: 'adapt', name: '适应期', weeks: '第1–4周', weekRange: [1, 4],
        goal: '筋膜松解 · 感觉重建 · 建立运动模式',
        keyWords: ['松解', '唤醒', '感知'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                { category: '筋膜松解', note: '5 min', moves: [
                  { name: '胸锁乳突肌筋膜球滚压', detail: '沿耳后至锁骨找痛点停留30s，2min/侧', equipment: '筋膜球' },
                  { name: '枕下肌群自我松解', detail: '仰卧，双手指腹托于枕骨下缘，下颌微收，保持2min', equipment: '无' },
                ]},
                { category: '神经激活', note: '7 min', moves: [
                  { name: '镜前深颈屈肌激活', detail: '舌尖顶上颚，下巴内收（点头不低头），3组×10个呼吸', equipment: '镜子' },
                  { name: '靠墙缩下巴', detail: '后脑靠墙，下巴水平内收，保持10s，3组×10次', equipment: '墙' },
                ]},
                { category: '习惯纠正', note: '日常执行', moves: [
                  { name: '手机屏幕高于肘部', detail: '使用手机时保持屏幕与眼同高，减少低头时长', equipment: '无' },
                  { name: '60分钟起身法则', detail: '每60分钟离座90秒，做颈部回收动作', equipment: '无' },
                ]},
              ]},
              { title: 'B训练：整合+感知（周二/四）', totalMins: 15, blocks: [
                { category: '呼吸再训练', note: '5 min', moves: [
                  { name: '仰卧腹式呼吸', detail: '一手胸一手腹，吸气仅腹部隆起，4-4-6节律，5min', equipment: '无' },
                  { name: '肋骨下沉训练', detail: '呼气时主动下压肋骨，避免上胸代偿，2组×8次', equipment: '无' },
                ]},
                { category: '感觉重建', note: '7 min', moves: [
                  { name: '闭眼头位复位', detail: '主动找中立头位→闭眼偏离→复位校准，3组×8次', equipment: '无' },
                  { name: '坐姿轴向延伸', detail: '想象头顶被线轻提，脊柱节节延长，保持10s×8次', equipment: '无' },
                ]},
                { category: '习惯纠正', note: '日常执行', moves: [
                  { name: '枕头高度调整', detail: '仰卧时枕高填满颈曲约一拳，侧卧时与肩同高', equipment: '颈椎枕' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '神经激活', note: '5 min', moves: [
                  { name: '坐姿缩下巴', detail: '背贴椅背，下巴水平内收，保持8s，3组×8次', equipment: '办公椅' },
                  { name: '颈部轴向延伸', detail: '想象头顶提线，延长颈椎，保持10s×6次', equipment: '无' },
                ]},
              ]},
              { title: '午间松解（午休）', totalMins: 5, blocks: [
                { category: '筋膜松解', note: '5 min', moves: [
                  { name: '上斜方肌自我牵伸', detail: '一手扶头侧屈，对侧手压肩下沉，30s/侧×2', equipment: '无' },
                  { name: '枕下指压', detail: '指腹按压枕骨下缘痛点，画小圈松解1min', equipment: '无' },
                ]},
              ]},
              { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                { category: '激活+习惯', note: '5 min', moves: [
                  { name: '靠墙缩下巴', detail: '后脑贴墙内收下巴，10s×8次', equipment: '墙' },
                  { name: '显示器升高', detail: '屏幕上沿与眼平齐，键盘前移使肘成90°', equipment: '显示器支架' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身+筋膜松解', note: '8 min', moves: [
                  { name: '胸椎泡沫轴滚压', detail: '上背沿轴上下滚动，停留紧张点，2min', equipment: '泡沫轴' },
                  { name: '胸锁乳突肌花生球松解', detail: '颈侧找痛点缓压，30s/侧×2', equipment: '花生球' },
                ]},
                { category: '神经肌肉激活', note: '10 min', moves: [
                  { name: '仰卧点头激活', detail: '垫上仰卧，纯下颌内收点头，3组×12次', equipment: '瑜伽垫' },
                  { name: '四足支撑头位保持', detail: '四点跪姿维持颈椎中立，5组×20s', equipment: '瑜伽垫' },
                ]},
                { category: '力量强化', note: '10 min', moves: [
                  { name: '弹力带颈部等长抗阻', detail: '带绕头四方向各加阻，保持10s，每向3次', equipment: '弹力带' },
                  { name: '俯身YTW', detail: '小重量或徒手做Y-T-W字，激活中下斜方，3组×8次', equipment: '哑铃' },
                ]},
                { category: '整合训练', note: '2 min', moves: [
                  { name: '站姿轴向延伸呼吸', detail: '延长脊柱配合腹式呼吸，收尾整合，6个呼吸', equipment: '无' },
                ]},
              ]},
            ]
          }
        }
      },
      {
        id: 'progress', name: '成效期', weeks: '第5–8周', weekRange: [5, 8],
        goal: '肌力强化 · 动作模式建立 · 代偿纠正',
        keyWords: ['强化', '整合', '进阶'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：抗阻强化（周一/三/五）', totalMins: 15, blocks: [
                { category: '颈部抗阻', note: '6 min', moves: [
                  { name: '徒手颈椎四向等长抗阻', detail: '手掌抵前后左右施加阻力，颈不动，10s×每向3次', equipment: '无' },
                  { name: '毛巾颈后伸抗阻', detail: '毛巾绕后脑轻拉，颈做轻微后伸对抗，3组×10次', equipment: '毛巾' },
                ]},
                { category: '肩颈联动', note: '7 min', moves: [
                  { name: '俯卧YTW', detail: '俯卧抬胸做Y-T-W，激活中下斜方，3组×8次', equipment: '无' },
                  { name: '前锯肌推墙', detail: '推墙末端肩胛前伸（外展上回旋），3组×12次', equipment: '墙' },
                ]},
                { category: '习惯纠正', note: '日常执行', moves: [
                  { name: '走路头位提示', detail: '步行时想象耳垂对齐肩峰，巩固直立头位', equipment: '无' },
                ]},
              ]},
              { title: 'B训练：动作整合（周二/四）', totalMins: 15, blocks: [
                { category: '开肩活动', note: '7 min', moves: [
                  { name: '门框胸大肌牵伸', detail: '前臂贴门框上中下三角度各拉30s', equipment: '门框' },
                  { name: '猫牛+颈椎联动', detail: '四足位脊柱波浪并带动颈椎自然延伸，3组×8次', equipment: '无' },
                ]},
                { category: '稳定整合', note: '8 min', moves: [
                  { name: '靠墙天使滑动', detail: '后脑/上背贴墙，手臂沿墙上下滑，3组×10次', equipment: '墙' },
                  { name: '坐姿头位负重保持', detail: '头顶放小书本维持中立行走数步，3组×30s', equipment: '书本' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '抗阻激活', note: '5 min', moves: [
                  { name: '坐姿徒手颈抗阻', detail: '手抵额/枕等长对抗，10s×每向3次', equipment: '无' },
                ]},
              ]},
              { title: '午间整合（午休）', totalMins: 5, blocks: [
                { category: '肩颈联动', note: '5 min', moves: [
                  { name: '坐姿W字夹肩', detail: '肘后拉夹肩胛，下沉不耸肩，3组×10次', equipment: '无' },
                  { name: '门框胸肌牵伸', detail: '茶水间门框拉伸胸大肌30s/侧', equipment: '门框' },
                ]},
              ]},
              { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                { category: '稳定保持', note: '5 min', moves: [
                  { name: '靠墙天使滑动', detail: '上背贴墙手臂滑动，3组×10次', equipment: '墙' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身+筋膜松解', note: '6 min', moves: [
                  { name: '胸椎泡沫轴伸展', detail: '轴置上背做被动后伸，2min', equipment: '泡沫轴' },
                ]},
                { category: '神经肌肉激活', note: '8 min', moves: [
                  { name: '四足支撑头位+对侧伸展', detail: '鸟狗变式中维持颈中立，3组×10次', equipment: '瑜伽垫' },
                ]},
                { category: '力量强化', note: '14 min', moves: [
                  { name: '面拉（Face Pull）', detail: '绳索高位拉至面前，外旋夹肩，4组×12次', equipment: '绳索器械' },
                  { name: '俯身反向飞鸟', detail: '小重量哑铃后束飞鸟，4组×12次', equipment: '哑铃' },
                  { name: '弹力带颈等长抗阻', detail: '四向加阻保持，每向3×10s', equipment: '弹力带' },
                ]},
                { category: '整合训练', note: '2 min', moves: [
                  { name: '站姿轴向延伸', detail: '负重姿势下保持头位中立呼吸整合', equipment: '无' },
                ]},
              ]},
            ]
          }
        }
      },
      {
        id: 'consolidate', name: '巩固期', weeks: '第9–12周', weekRange: [9, 12],
        goal: '功能整合 · 自动化 · 长期维持策略',
        keyWords: ['整合', '自动化', '持续'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：功能整合（周一/三/五）', totalMins: 15, blocks: [
                { category: '动态头位控制', note: '7 min', moves: [
                  { name: '运动中头位保持', detail: '深蹲/弓步等动作中维持耳-肩对齐，3组×10次', equipment: '无' },
                  { name: '负重过头保持', detail: '水瓶过头维持颈中立行走，3组×30s', equipment: '水瓶' },
                ]},
                { category: '本体感觉', note: '8 min', moves: [
                  { name: '闭眼单腿+头位校准', detail: '闭眼单腿站立同时维持中立头位，3组×20s', equipment: '无' },
                  { name: '快慢节奏点头', detail: '深颈屈肌快慢交替募集，3组×12次', equipment: '无' },
                ]},
              ]},
              { title: 'B训练：压力维持（周二/四）', totalMins: 15, blocks: [
                { category: '抗疲劳维持', note: '8 min', moves: [
                  { name: '长时间头位耐力保持', detail: '中立头位静态保持配合呼吸，3组×60s', equipment: '无' },
                  { name: '分心任务下保持', detail: '边读文字边维持头位，模拟真实场景，3组×60s', equipment: '无' },
                ]},
                { category: '维持策略', note: '7 min', moves: [
                  { name: '晨起激活套路', detail: '将缩下巴+延伸固化为晨间1分钟习惯', equipment: '无' },
                  { name: '环境改造复盘', detail: '复核屏幕/枕头/座椅是否长期到位', equipment: '无' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '动态控制', note: '5 min', moves: [
                  { name: '坐姿轴向延伸+缩下巴组合', detail: '延伸接内收一气呵成，3组×10次', equipment: '办公椅' },
                ]},
              ]},
              { title: '午间维持（午休）', totalMins: 5, blocks: [
                { category: '本体感觉', note: '5 min', moves: [
                  { name: '闭眼头位复位', detail: '闭眼偏离后主动找回中立，3组×8次', equipment: '无' },
                ]},
              ]},
              { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                { category: '维持策略', note: '5 min', moves: [
                  { name: '头位耐力保持', detail: '中立头位静态保持60s×3', equipment: '无' },
                  { name: '工位人体工学复核', detail: '检查屏幕高度与坐姿是否到位', equipment: '无' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身', note: '5 min', moves: [
                  { name: '动态颈胸联动热身', detail: '颈胸椎多向活动唤醒，2组×10次', equipment: '无' },
                ]},
                { category: '功能力量', note: '15 min', moves: [
                  { name: '过头农夫行走', detail: '单臂过头负重行走维持头位，4组×20m', equipment: '壶铃' },
                  { name: '面拉+外旋复合', detail: '绳索面拉接外旋，4组×12次', equipment: '绳索器械' },
                ]},
                { category: '稳定整合', note: '8 min', moves: [
                  { name: 'BOSU球上头位保持', detail: '不稳定面站立维持中立头位，3组×30s', equipment: 'BOSU球' },
                ]},
                { category: '整合放松', note: '2 min', moves: [
                  { name: '轴向延伸呼吸收尾', detail: '延长脊柱深呼吸整合', equipment: '无' },
                ]},
              ]},
            ]
          }
        }
      }
    ]
  },

  // ───────────────────────────────────────── 肩部 / 圆肩高低肩 ─────────────────────────────────────────
  shoulder: {
    name: '肩带重塑专项',
    tagline: '12周重建肩胛节律',
    icon: 'accessibility_new',
    color: '#c08a7d',
    totalWeeks: 12,
    science: {
      anatomy: '解剖学：圆肩源于胸小肌与胸大肌紧张、中下斜方肌与菱形肌薄弱，使肩胛骨前伸下旋。高低肩与溜肩则反映两侧肩带肌力与斜方肌上束张力的不对称，破坏正常肩肱节律（2:1）。',
      fascia: '筋膜学：问题沿前表线（SFL）的胸部段与臂前线（前臂筋膜）传导。胸小肌是臂前深线的关键站点，其缩短会牵拉整个肩带向前下旋转，松解需顺着臂线整体处理。',
      neuro: '运动神经学：前锯肌与下斜方肌常处于「沉睡」状态，肩胛在抬臂时缺乏上回旋控制，导致上斜方代偿耸肩。需通过分离式激活重建肩胛上回旋的运动时序。',
      brain: '脑科学：肩胛骨缺乏丰富的本体感觉受体，位置觉模糊。借助镜面与触觉提示强化大脑对肩胛位置的感知地图，是把「夹肩沉肩」变为习惯的神经基础。',
      habit: '习惯纠正：长时间鼠标前伸、单肩背包、托腮等使肩带固化于前伸不对称位。调整桌面布局、改用双肩包、保持双侧均衡用力，是维持肩带中立的日常要点。',
    },
    phases: [
      {
        id: 'adapt', name: '适应期', weeks: '第1–4周', weekRange: [1, 4],
        goal: '筋膜松解 · 感觉重建 · 建立运动模式',
        keyWords: ['松解', '唤醒', '感知'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                { category: '筋膜松解', note: '6 min', moves: [
                  { name: '胸小肌泡沫轴/球松解', detail: '俯卧将球置喙突下方找痛点缓压，2min/侧', equipment: '筋膜球' },
                  { name: '门框胸大肌牵伸', detail: '前臂贴门框，上中下三角度各30s', equipment: '门框' },
                ]},
                { category: '神经激活', note: '7 min', moves: [
                  { name: '俯卧菱形肌激活', detail: '俯卧夹肩胛后缩下沉，保持5s，3组×10次', equipment: '无' },
                  { name: '肩胛骨意识训练', detail: '坐姿做肩胛上提/下沉/前伸/后缩四象限，3组×8次', equipment: '无' },
                ]},
                { category: '习惯纠正', note: '日常执行', moves: [
                  { name: '鼠标贴近身体', detail: '避免手臂长时间前伸，肘靠近躯干', equipment: '无' },
                  { name: '改用双肩包', detail: '均衡双侧负重，缓解高低肩', equipment: '无' },
                ]},
              ]},
              { title: 'B训练：感知整合（周二/四）', totalMins: 15, blocks: [
                { category: '呼吸+松解', note: '7 min', moves: [
                  { name: '上斜方肌牵伸', detail: '侧屈头并沉肩，30s/侧×2', equipment: '无' },
                  { name: '侧卧开书式', detail: '侧卧旋开上臂打开胸廓，3组×8次/侧', equipment: '无' },
                ]},
                { category: '感觉重建', note: '8 min', moves: [
                  { name: '镜前肩胛对称校准', detail: '对镜调整两侧肩峰等高，保持10s×8次', equipment: '镜子' },
                  { name: '靠墙肩胛下沉', detail: '背贴墙主动下沉肩胛远离耳朵，3组×10次', equipment: '墙' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '激活', note: '5 min', moves: [
                  { name: '坐姿肩胛后缩下沉', detail: '夹肩并下沉，保持5s，3组×10次', equipment: '办公椅' },
                ]},
              ]},
              { title: '午间松解（午休）', totalMins: 5, blocks: [
                { category: '松解', note: '5 min', moves: [
                  { name: '门框胸肌牵伸', detail: '茶水间门框拉伸胸大肌30s/侧', equipment: '门框' },
                  { name: '上斜方肌牵伸', detail: '侧屈沉肩30s/侧', equipment: '无' },
                ]},
              ]},
              { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                { category: '激活+习惯', note: '5 min', moves: [
                  { name: '坐姿W字夹肩', detail: '肘后拉夹肩胛，3组×10次', equipment: '无' },
                  { name: '工位对称复核', detail: '调整鼠标位置与屏幕居中，避免单侧前伸', equipment: '无' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身+筋膜松解', note: '8 min', moves: [
                  { name: '胸椎泡沫轴滚压', detail: '上背沿轴滚动并被动后伸，3min', equipment: '泡沫轴' },
                  { name: '胸小肌花生球松解', detail: '喙突下找痛点缓压，30s/侧×2', equipment: '花生球' },
                ]},
                { category: '神经肌肉激活', note: '10 min', moves: [
                  { name: '俯卧YTW', detail: '徒手或小重量做Y-T-W，3组×10次', equipment: '哑铃' },
                  { name: '前锯肌推墙plus', detail: '推末端肩胛前伸上回旋，3组×12次', equipment: '墙/瑜伽垫' },
                ]},
                { category: '力量强化', note: '10 min', moves: [
                  { name: '弹力带肩外旋', detail: '肘贴体侧外旋，3组×12次/侧', equipment: '弹力带' },
                  { name: '俯身反向飞鸟', detail: '小重量后束飞鸟，3组×12次', equipment: '哑铃' },
                ]},
                { category: '整合训练', note: '2 min', moves: [
                  { name: '站姿肩胛中立呼吸', detail: '肩带中立配合呼吸收尾', equipment: '无' },
                ]},
              ]},
            ]
          }
        }
      },
      {
        id: 'progress', name: '成效期', weeks: '第5–8周', weekRange: [5, 8],
        goal: '肌力强化 · 动作模式建立 · 代偿纠正',
        keyWords: ['强化', '整合', '进阶'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：抗阻强化（周一/三/五）', totalMins: 15, blocks: [
                { category: '肩外旋强化', note: '7 min', moves: [
                  { name: '弹力带面拉', detail: '带固定于门，拉至面前外旋夹肩，3组×12次', equipment: '弹力带' },
                  { name: '弹力带W形夹肩', detail: '双臂W位后拉，激活下斜方，3组×12次', equipment: '弹力带' },
                ]},
                { category: '前锯肌强化', note: '8 min', moves: [
                  { name: '推墙变式（前伸加压）', detail: '推墙末端额外前伸肩胛，3组×15次', equipment: '墙' },
                  { name: '俯卧肩外旋', detail: '俯卧上臂外展90°做外旋，3组×12次', equipment: '无' },
                ]},
              ]},
              { title: 'B训练：动作整合（周二/四）', totalMins: 15, blocks: [
                { category: '活动度', note: '6 min', moves: [
                  { name: '靠墙天使滑动', detail: '上背贴墙手臂沿墙上下滑，3组×10次', equipment: '墙' },
                ]},
                { category: '稳定整合', note: '9 min', moves: [
                  { name: '俯撑加正（Plus）', detail: '平板支撑顶端肩胛前伸，3组×10次', equipment: '瑜伽垫' },
                  { name: '高低肩对称矫正', detail: '弱侧多做1组单侧后缩下沉，3+1组×10次', equipment: '无' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '激活', note: '5 min', moves: [
                  { name: '弹力带坐姿外旋', detail: '抽屉常备弹力带做外旋，3组×12次', equipment: '弹力带' },
                ]},
              ]},
              { title: '午间整合（午休）', totalMins: 5, blocks: [
                { category: '强化', note: '5 min', moves: [
                  { name: '坐姿W字夹肩', detail: '肘后拉夹肩下沉，3组×12次', equipment: '无' },
                ]},
              ]},
              { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                { category: '稳定', note: '5 min', moves: [
                  { name: '靠墙天使滑动', detail: '上背贴墙手臂滑动，3组×10次', equipment: '墙' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身+松解', note: '5 min', moves: [
                  { name: '胸椎+肩袖动态热身', detail: '胸椎旋转加肩绕环唤醒，2组×10次', equipment: '弹力带' },
                ]},
                { category: '激活', note: '7 min', moves: [
                  { name: '前锯肌推举（Serratus Push）', detail: '仰卧持哑铃顶端前伸肩胛，3组×12次', equipment: '哑铃' },
                ]},
                { category: '力量强化', note: '16 min', moves: [
                  { name: '绳索面拉', detail: '高位拉至面前外旋，4组×12次', equipment: '绳索器械' },
                  { name: '俯身反向飞鸟', detail: '后束飞鸟控制离心，4组×12次', equipment: '哑铃' },
                  { name: '弹力带肩外旋（90/90）', detail: '上臂外展90°外旋，3组×12次', equipment: '弹力带' },
                ]},
                { category: '整合', note: '2 min', moves: [
                  { name: '肩带中立呼吸收尾', detail: '中立位深呼吸整合', equipment: '无' },
                ]},
              ]},
            ]
          }
        }
      },
      {
        id: 'consolidate', name: '巩固期', weeks: '第9–12周', weekRange: [9, 12],
        goal: '功能整合 · 自动化 · 长期维持策略',
        keyWords: ['整合', '自动化', '持续'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：功能整合（周一/三/五）', totalMins: 15, blocks: [
                { category: '过头稳定', note: '8 min', moves: [
                  { name: '过头推举稳定（水瓶）', detail: '推举全程维持肩胛上回旋，3组×12次', equipment: '水瓶' },
                  { name: '土耳其起立分解', detail: '分解练习中保持肩稳定，3组×5次/侧', equipment: '无' },
                ]},
                { category: '功能控制', note: '7 min', moves: [
                  { name: '功能性肩胛控制', detail: '推/拉/举多方向中维持肩胛节律，3组×10次', equipment: '弹力带' },
                ]},
              ]},
              { title: 'B训练：日常整合（周二/四）', totalMins: 15, blocks: [
                { category: '日常动作整合', note: '8 min', moves: [
                  { name: '提物模式训练', detail: '模拟提袋保持肩下沉后缩，3组×10次', equipment: '购物袋' },
                  { name: '对称性复核', detail: '镜前确认双肩等高并维持，3组×30s', equipment: '镜子' },
                ]},
                { category: '维持策略', note: '7 min', moves: [
                  { name: '晨间开肩套路', detail: '门框牵伸+夹肩固化为晨间习惯', equipment: '门框' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '整合', note: '5 min', moves: [
                  { name: '弹力带过头推稳定', detail: '坐姿推举维持肩胛上回旋，3组×10次', equipment: '弹力带' },
                ]},
              ]},
              { title: '午间维持（午休）', totalMins: 5, blocks: [
                { category: '对称控制', note: '5 min', moves: [
                  { name: '镜前肩高对称校准', detail: '调整双肩等高保持，3组×30s', equipment: '镜子' },
                ]},
              ]},
              { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                { category: '维持', note: '5 min', moves: [
                  { name: '门框开肩牵伸', detail: '收尾拉伸胸肌30s/侧', equipment: '门框' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身', note: '5 min', moves: [
                  { name: '动态肩袖热身', detail: '弹力带多向激活肩袖，2组×12次', equipment: '弹力带' },
                ]},
                { category: '功能力量', note: '15 min', moves: [
                  { name: '过头推举', detail: '哑铃过头推维持肩胛节律，4组×10次', equipment: '哑铃' },
                  { name: '单臂农夫行走', detail: '抗侧倾维持双肩水平，4组×20m', equipment: '壶铃' },
                ]},
                { category: '稳定整合', note: '8 min', moves: [
                  { name: 'TRX划船+外旋', detail: '划船末端外旋夹肩，3组×12次', equipment: 'TRX' },
                ]},
                { category: '收尾', note: '2 min', moves: [
                  { name: '肩带中立呼吸', detail: '中立位深呼吸整合', equipment: '无' },
                ]},
              ]},
            ]
          }
        }
      }
    ]
  },

  // ───────────────────────────────────────── 骨盆 / 前倾侧倾 ─────────────────────────────────────────
  pelvis: {
    name: '骨盆归正专项',
    tagline: '12周重建骨盆中立',
    icon: 'fitness_center',
    color: '#c08a7d',
    totalWeeks: 12,
    science: {
      anatomy: '解剖学：骨盆前倾源于髂腰肌与竖脊肌紧张、腹肌与臀大肌薄弱，形成「下交叉综合征」，腰椎过度前凸。侧倾则反映两侧腰方肌与臀中肌力量失衡，髋部一高一低。',
      fascia: '筋膜学：问题沿前深线（DFL）的髂腰肌段与体侧线（LL）传导。髂腰肌是连接膈肌与下肢的核心站点，其张力影响呼吸与骨盆位置；体侧线失衡是骨盆侧倾的筋膜根源。',
      neuro: '运动神经学：臀大肌与臀中肌常被抑制，行走时被腘绳肌与腰部代偿（臀肌失忆症）。需通过分离激活重建髋伸与髋外展的运动时序，恢复正确的发力顺序。',
      brain: '脑科学：骨盆是身体的「重心枢纽」，其位置由前庭、视觉与本体觉共同调节。通过骨盆时钟等精细运动训练，可提升运动皮层对骨盆倾斜度的精准调控。',
      habit: '习惯纠正：久坐缩短髂腰肌、翘二郎腿与单侧站立加剧侧倾。增加站立办公、避免长期跷腿、保持双脚均衡承重，是维持骨盆中立的关键日常调整。',
    },
    phases: [
      {
        id: 'adapt', name: '适应期', weeks: '第1–4周', weekRange: [1, 4],
        goal: '筋膜松解 · 感觉重建 · 建立运动模式',
        keyWords: ['松解', '唤醒', '感知'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                { category: '筋膜松解', note: '6 min', moves: [
                  { name: '髂腰肌弓步拉伸', detail: '后腿跪地骨盆后倾前推，30s/侧×2', equipment: '瑜伽垫' },
                  { name: '股四头肌泡沫轴松解', detail: '大腿前侧沿轴滚压找痛点，2min/侧', equipment: '泡沫轴' },
                ]},
                { category: '神经激活', note: '7 min', moves: [
                  { name: '蚌式臀中肌激活', detail: '侧卧屈膝外旋开合，膝带阻力，3组×15次/侧', equipment: '弹力带' },
                  { name: '臀桥激活', detail: '仰卧勾脚顶髋夹臀，顶端停2s，3组×12次', equipment: '瑜伽垫' },
                ]},
                { category: '习惯纠正', note: '日常执行', moves: [
                  { name: '避免长期跷二郎腿', detail: '双脚平放均衡承重，减少骨盆旋转', equipment: '无' },
                  { name: '骨盆后倾微提示', detail: '久坐时偶尔轻微收尾骨，避免塌腰前倾', equipment: '无' },
                ]},
              ]},
              { title: 'B训练：呼吸+感知（周二/四）', totalMins: 15, blocks: [
                { category: '呼吸再训练', note: '7 min', moves: [
                  { name: '腹式呼吸+骨盆中立', detail: '仰卧屈膝，呼气找腰部贴地骨盆中立，5min', equipment: '瑜伽垫' },
                ]},
                { category: '感觉重建', note: '8 min', moves: [
                  { name: '骨盆时钟训练', detail: '仰卧将骨盆想象为钟面前后左右倾，3组×8圈', equipment: '瑜伽垫' },
                  { name: '镜前骨盆中立校准', detail: '侧对镜调整髂前上棘与耻骨同平面，10s×8次', equipment: '镜子' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '激活', note: '5 min', moves: [
                  { name: '坐姿骨盆前后倾', detail: '坐姿做骨盆前后摆找中立，3组×10次', equipment: '办公椅' },
                ]},
              ]},
              { title: '午间松解（午休）', totalMins: 5, blocks: [
                { category: '松解', note: '5 min', moves: [
                  { name: '站姿髂腰肌牵伸', detail: '弓步前推髋拉伸，30s/侧', equipment: '无' },
                ]},
              ]},
              { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                { category: '激活+习惯', note: '5 min', moves: [
                  { name: '站姿后踢臀激活', detail: '扶椅做髋后伸夹臀，3组×12次/侧', equipment: '办公椅' },
                  { name: '双脚均衡站立提示', detail: '避免单腿吃重，纠正侧倾', equipment: '无' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身+筋膜松解', note: '8 min', moves: [
                  { name: '髂腰肌+股四头松解', detail: '泡沫轴松解大腿前侧与屈髋肌，3min', equipment: '泡沫轴' },
                  { name: '90/90髋关节活动', detail: '坐地两腿90度切换打开髋，2min', equipment: '瑜伽垫' },
                ]},
                { category: '神经肌肉激活', note: '10 min', moves: [
                  { name: '弹力带蚌式', detail: '膝套带侧卧外旋开合，3组×15次/侧', equipment: '弹力带' },
                  { name: '弹力带臀桥', detail: '膝带阻力顶髋夹臀，3组×12次', equipment: '弹力带' },
                ]},
                { category: '力量强化', note: '10 min', moves: [
                  { name: '死虫式', detail: '仰卧对侧手脚伸展维持骨盆中立，3组×10次', equipment: '瑜伽垫' },
                  { name: '鸟狗式', detail: '四足对侧手脚伸展，3组×10次/侧', equipment: '瑜伽垫' },
                ]},
                { category: '整合训练', note: '2 min', moves: [
                  { name: '站姿骨盆中立呼吸', detail: '中立位深呼吸整合收尾', equipment: '无' },
                ]},
              ]},
            ]
          }
        }
      },
      {
        id: 'progress', name: '成效期', weeks: '第5–8周', weekRange: [5, 8],
        goal: '肌力强化 · 动作模式建立 · 代偿纠正',
        keyWords: ['强化', '整合', '进阶'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：臀核强化（周一/三/五）', totalMins: 15, blocks: [
                { category: '臀肌强化', note: '8 min', moves: [
                  { name: '单腿臀桥', detail: '单腿顶髋保持骨盆水平，3组×10次/侧', equipment: '瑜伽垫' },
                  { name: '单腿罗马尼亚硬拉（徒手）', detail: '髋铰链单腿下放保持骨盆中立，3组×10次/侧', equipment: '无' },
                ]},
                { category: '核心抗旋', note: '7 min', moves: [
                  { name: '死虫进阶（加节奏）', detail: '慢速伸展维持腰贴地，3组×12次', equipment: '瑜伽垫' },
                  { name: '鸟狗进阶（停顿）', detail: '伸展顶端停3s抗旋，3组×10次/侧', equipment: '瑜伽垫' },
                ]},
              ]},
              { title: 'B训练：对称矫正（周二/四）', totalMins: 15, blocks: [
                { category: '侧链强化', note: '8 min', moves: [
                  { name: '侧桥+髋外展', detail: '侧桥顶端上腿外展，弱侧多1组，3组×10次/侧', equipment: '瑜伽垫' },
                  { name: '怪兽走（弹力带侧走）', detail: '膝套带屈髋侧向行走，3组×12步', equipment: '弹力带' },
                ]},
                { category: '活动度', note: '7 min', moves: [
                  { name: '髂腰肌动态牵伸', detail: '弓步配合骨盆后倾动态拉伸，3组×8次/侧', equipment: '无' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '激活', note: '5 min', moves: [
                  { name: '站姿后踢臀', detail: '扶椅髋后伸夹臀，3组×12次/侧', equipment: '办公椅' },
                ]},
              ]},
              { title: '午间整合（午休）', totalMins: 5, blocks: [
                { category: '强化', note: '5 min', moves: [
                  { name: '靠墙静蹲+骨盆中立', detail: '靠墙半蹲维持骨盆中立，3组×30s', equipment: '墙' },
                ]},
              ]},
              { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                { category: '对称', note: '5 min', moves: [
                  { name: '弹力带侧走', detail: '膝套带做怪兽走，3组×12步', equipment: '弹力带' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身+激活', note: '6 min', moves: [
                  { name: '弹力带臀肌激活组', detail: '蚌式+怪兽走唤醒臀中肌，2组×15次', equipment: '弹力带' },
                ]},
                { category: '力量强化', note: '18 min', moves: [
                  { name: '臀桥进阶（杠铃/负重）', detail: '负重顶髋夹臀，4组×12次', equipment: '杠铃' },
                  { name: '单腿罗马尼亚硬拉（哑铃）', detail: '髋铰链单腿下放，4组×10次/侧', equipment: '哑铃' },
                  { name: '死虫+负重', detail: '手持小重量对侧伸展抗旋，3组×10次', equipment: '哑铃' },
                ]},
                { category: '整合', note: '6 min', moves: [
                  { name: '鸟狗+负重停顿', detail: '抗旋停顿维持骨盆中立，3组×10次/侧', equipment: '瑜伽垫' },
                ]},
              ]},
            ]
          }
        }
      },
      {
        id: 'consolidate', name: '巩固期', weeks: '第9–12周', weekRange: [9, 12],
        goal: '功能整合 · 自动化 · 长期维持策略',
        keyWords: ['整合', '自动化', '持续'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：步态整合（周一/三/五）', totalMins: 15, blocks: [
                { category: '功能步态', note: '8 min', moves: [
                  { name: '功能步态训练', detail: '慢走中维持骨盆水平，臀肌主导推进，3组×20步', equipment: '无' },
                  { name: '弓步行走', detail: '行进弓步维持骨盆中立，3组×10步/侧', equipment: '无' },
                ]},
                { category: '平衡强化', note: '7 min', moves: [
                  { name: '单腿平衡强化', detail: '单腿站立维持骨盆水平，3组×30s/侧', equipment: '无' },
                  { name: '单腿臀桥保持', detail: '单腿桥顶端静态保持，3组×20s/侧', equipment: '瑜伽垫' },
                ]},
              ]},
              { title: 'B训练：中立维持（周二/四）', totalMins: 15, blocks: [
                { category: '骨盆中立维持', note: '8 min', moves: [
                  { name: '负重深蹲中立维持', detail: '徒手/水瓶深蹲全程骨盆中立，3组×12次', equipment: '水瓶' },
                  { name: '硬拉模式训练', detail: '髋铰链拾物保持脊柱骨盆中立，3组×10次', equipment: '购物袋' },
                ]},
                { category: '维持策略', note: '7 min', moves: [
                  { name: '久坐微激活习惯', detail: '将后踢臀+骨盆中立固化为间歇习惯', equipment: '无' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '整合', note: '5 min', moves: [
                  { name: '靠墙静蹲', detail: '半蹲维持骨盆中立，3组×30s', equipment: '墙' },
                ]},
              ]},
              { title: '午间维持（午休）', totalMins: 5, blocks: [
                { category: '平衡', note: '5 min', moves: [
                  { name: '单腿平衡', detail: '单腿站立维持骨盆水平，3组×30s/侧', equipment: '无' },
                ]},
              ]},
              { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                { category: '维持', note: '5 min', moves: [
                  { name: '站姿髂腰肌牵伸', detail: '收尾弓步拉伸30s/侧', equipment: '无' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身', note: '5 min', moves: [
                  { name: '动态髋关节热身', detail: '弓步+髋绕环唤醒，2组×10次', equipment: '无' },
                ]},
                { category: '功能力量', note: '17 min', moves: [
                  { name: '高脚杯深蹲', detail: '负重深蹲维持骨盆中立，4组×10次', equipment: '哑铃' },
                  { name: '罗马尼亚硬拉', detail: '髋铰链强化臀腘，4组×10次', equipment: '杠铃' },
                  { name: '保加利亚分腿蹲', detail: '后脚抬高单腿蹲维持骨盆水平，3组×10次/侧', equipment: '哑铃' },
                ]},
                { category: '稳定整合', note: '8 min', moves: [
                  { name: '行李箱农夫行走', detail: '单侧负重抗侧倾维持骨盆水平，3组×20m', equipment: '壶铃' },
                ]},
              ]},
            ]
          }
        }
      }
    ]
  },

  // ───────────────────────────────────────── 腰背 ─────────────────────────────────────────
  back: {
    name: '腰背安放专项',
    tagline: '12周重建脊柱稳定',
    icon: 'spa',
    color: '#c08a7d',
    totalWeeks: 12,
    science: {
      anatomy: '解剖学：腰背不适常源于多裂肌与腹横肌等深层稳定肌失能，竖脊肌过度代偿。深层局部稳定系统无法在动作前预激活，导致椎间负荷集中、腰方肌紧张。',
      fascia: '筋膜学：问题沿浅背线（SBL）的腰段与胸腰筋膜传导。胸腰筋膜是连接背阔肌、臀大肌与对侧的力量传递枢纽，其张力分布失衡会让腰段成为整条背线的「卡点」。',
      neuro: '运动神经学：研究显示腰痛者腹横肌的前馈激活延迟。需通过低负荷的分离激活恢复深层肌的预先收缩时序，重建「先稳定后运动」的核心控制策略。',
      brain: '脑科学：慢性腰背不适会模糊大脑对腰椎的本体感觉地图（皮层重组）。通过精准、无痛的运动控制训练，可重塑清晰的躯干感觉运动表征，减少保护性僵硬。',
      habit: '习惯纠正：久坐塌腰、弯腰搬重物与缺乏变换姿势是主要诱因。学会髋铰链搬物、定时改变坐姿、维持自然腰曲，是保护腰椎的日常核心。',
    },
    phases: [
      {
        id: 'adapt', name: '适应期', weeks: '第1–4周', weekRange: [1, 4],
        goal: '筋膜松解 · 感觉重建 · 建立运动模式',
        keyWords: ['松解', '唤醒', '感知'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                { category: '筋膜松解', note: '6 min', moves: [
                  { name: '腰方肌放松', detail: '侧卧将球置于髂嵴与肋骨间缓压，2min/侧', equipment: '筋膜球' },
                  { name: '臀肌泡沫轴松解', detail: '坐于轴上滚压臀部找痛点，2min/侧', equipment: '泡沫轴' },
                ]},
                { category: '神经激活', note: '7 min', moves: [
                  { name: '腹横肌激活（腹部收紧）', detail: '仰卧轻收下腹想象束腰，保持10s，3组×10次', equipment: '瑜伽垫' },
                  { name: '猫牛式', detail: '四足位脊柱节段性屈伸唤醒，3组×8次', equipment: '瑜伽垫' },
                ]},
                { category: '习惯纠正', note: '日常执行', moves: [
                  { name: '髋铰链搬物', detail: '弯腰拾物改用屈髋保持腰曲', equipment: '无' },
                  { name: '坐姿支撑腰曲', detail: '使用腰靠维持自然腰椎前凸', equipment: '腰靠' },
                ]},
              ]},
              { title: 'B训练：感知整合（周二/四）', totalMins: 15, blocks: [
                { category: '呼吸+感知', note: '7 min', moves: [
                  { name: '骨盆时钟', detail: '仰卧前后左右倾骨盆找中立，3组×8圈', equipment: '瑜伽垫' },
                  { name: '360度呼吸', detail: '吸气时肋骨与腰背同步扩张，5min', equipment: '无' },
                ]},
                { category: '稳定激活', note: '8 min', moves: [
                  { name: '死虫式', detail: '对侧手脚伸展维持腰贴地，3组×10次', equipment: '瑜伽垫' },
                  { name: '多裂肌分离激活', detail: '俯卧轻抬单侧腰段微收，3组×8次/侧', equipment: '瑜伽垫' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '激活', note: '5 min', moves: [
                  { name: '坐姿腹横肌激活', detail: '坐姿轻收下腹保持10s，3组×10次', equipment: '办公椅' },
                ]},
              ]},
              { title: '午间松解（午休）', totalMins: 5, blocks: [
                { category: '松解', note: '5 min', moves: [
                  { name: '站姿腰方肌侧屈牵伸', detail: '单手过头侧屈拉伸腰侧，30s/侧', equipment: '无' },
                ]},
              ]},
              { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                { category: '激活+习惯', note: '5 min', moves: [
                  { name: '站姿骨盆中立找位', detail: '靠墙找脊柱中立保持，3组×20s', equipment: '墙' },
                  { name: '坐姿变换提示', detail: '每30分钟更换坐姿避免久坐塌腰', equipment: '无' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身+筋膜松解', note: '8 min', moves: [
                  { name: '胸椎+腰方肌松解', detail: '泡沫轴松解胸椎与腰侧，3min', equipment: '泡沫轴' },
                  { name: '猫牛+婴儿式', detail: '脊柱节段活动唤醒，2min', equipment: '瑜伽垫' },
                ]},
                { category: '神经肌肉激活', note: '10 min', moves: [
                  { name: '死虫式', detail: '对侧伸展抗伸维持中立，3组×10次', equipment: '瑜伽垫' },
                  { name: '鸟狗式', detail: '对侧手脚伸展抗旋，3组×10次/侧', equipment: '瑜伽垫' },
                ]},
                { category: '力量强化', note: '10 min', moves: [
                  { name: '平板支撑', detail: '维持脊柱中立核心收紧，3组×30s', equipment: '瑜伽垫' },
                  { name: '侧桥', detail: '维持躯干一直线，3组×20s/侧', equipment: '瑜伽垫' },
                ]},
                { category: '整合训练', note: '2 min', moves: [
                  { name: '站姿中立呼吸', detail: '脊柱中立深呼吸整合', equipment: '无' },
                ]},
              ]},
            ]
          }
        }
      },
      {
        id: 'progress', name: '成效期', weeks: '第5–8周', weekRange: [5, 8],
        goal: '肌力强化 · 动作模式建立 · 代偿纠正',
        keyWords: ['强化', '整合', '进阶'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：背链强化（周一/三/五）', totalMins: 15, blocks: [
                { category: '伸肌强化', note: '8 min', moves: [
                  { name: '超人式', detail: '俯卧交替/同时抬手脚，顶端停2s，3组×10次', equipment: '瑜伽垫' },
                  { name: '多裂肌分离训练', detail: '俯卧精准抬单侧腰段，3组×10次/侧', equipment: '瑜伽垫' },
                ]},
                { category: '后链激活', note: '7 min', moves: [
                  { name: '反向飞鸟（俯卧）', detail: '俯卧后束飞鸟整合上背，3组×12次', equipment: '无' },
                  { name: '臀桥行走', detail: '桥位交替踏步维持骨盆稳定，3组×10次', equipment: '瑜伽垫' },
                ]},
              ]},
              { title: 'B训练：抗旋整合（周二/四）', totalMins: 15, blocks: [
                { category: '核心抗旋', note: '8 min', moves: [
                  { name: '鸟狗进阶（停顿）', detail: '伸展顶端停3s抗旋，3组×10次/侧', equipment: '瑜伽垫' },
                  { name: '死虫进阶（慢节奏）', detail: '慢速控制维持腰贴地，3组×12次', equipment: '瑜伽垫' },
                ]},
                { category: '活动度', note: '7 min', moves: [
                  { name: '猫牛+胸椎旋转', detail: '四足位穿针引线打开胸椎，3组×8次/侧', equipment: '瑜伽垫' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '激活', note: '5 min', moves: [
                  { name: '坐姿背伸激活', detail: '坐姿挺胸延伸脊柱保持，3组×10次', equipment: '办公椅' },
                ]},
              ]},
              { title: '午间整合（午休）', totalMins: 5, blocks: [
                { category: '强化', note: '5 min', moves: [
                  { name: '站姿髋铰链', detail: '屈髋下放保持腰曲，3组×12次', equipment: '无' },
                ]},
              ]},
              { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                { category: '抗旋', note: '5 min', moves: [
                  { name: '站姿抗旋（弹力带）', detail: '带固定侧拉抵抗旋转，3组×12次/侧', equipment: '弹力带' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身+激活', note: '6 min', moves: [
                  { name: '死虫+鸟狗激活组', detail: '核心预激活，2组×10次', equipment: '瑜伽垫' },
                ]},
                { category: '力量强化', note: '18 min', moves: [
                  { name: '罗马尼亚硬拉（轻负荷）', detail: '髋铰链维持脊柱中立，4组×10次', equipment: '哑铃' },
                  { name: '反向飞鸟', detail: '后束强化整合上背，4组×12次', equipment: '哑铃' },
                  { name: '帕洛夫推（抗旋）', detail: '绳索侧向抗旋推出，3组×12次/侧', equipment: '绳索器械' },
                ]},
                { category: '稳定整合', note: '6 min', moves: [
                  { name: '侧桥+髋抬', detail: '侧桥动态强化侧链，3组×10次/侧', equipment: '瑜伽垫' },
                ]},
              ]},
            ]
          }
        }
      },
      {
        id: 'consolidate', name: '巩固期', weeks: '第9–12周', weekRange: [9, 12],
        goal: '功能整合 · 自动化 · 长期维持策略',
        keyWords: ['整合', '自动化', '持续'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：负荷整合（周一/三/五）', totalMins: 15, blocks: [
                { category: '复合动作中立', note: '8 min', moves: [
                  { name: '复合动作中脊柱中立', detail: '深蹲/硬拉模式全程维持脊柱中立，3组×10次', equipment: '水瓶/购物袋' },
                  { name: '负重搬运（农夫提）', detail: '提物行走维持躯干稳定，3组×30s', equipment: '购物袋' },
                ]},
                { category: '动态稳定', note: '7 min', moves: [
                  { name: '负荷下维持（抗旋走）', detail: '单侧负重行走抗旋，3组×20步', equipment: '水瓶' },
                ]},
              ]},
              { title: 'B训练：日常自动化（周二/四）', totalMins: 15, blocks: [
                { category: '日常整合', note: '8 min', moves: [
                  { name: '弯腰拾物模式固化', detail: '反复练习髋铰链拾物，3组×10次', equipment: '无' },
                  { name: '坐起转身模式', detail: '起身/转身维持核心预激活，3组×8次', equipment: '椅子' },
                ]},
                { category: '维持策略', note: '7 min', moves: [
                  { name: '晨间脊柱唤醒套路', detail: '猫牛+死虫固化为晨间习惯', equipment: '瑜伽垫' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '整合', note: '5 min', moves: [
                  { name: '坐起髋铰链固化', detail: '起身保持脊柱中立，3组×10次', equipment: '办公椅' },
                ]},
              ]},
              { title: '午间维持（午休）', totalMins: 5, blocks: [
                { category: '稳定', note: '5 min', moves: [
                  { name: '站姿抗旋保持', detail: '弹力带抗旋静态保持，3组×20s/侧', equipment: '弹力带' },
                ]},
              ]},
              { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                { category: '维持', note: '5 min', moves: [
                  { name: '腰方肌侧屈牵伸', detail: '收尾拉伸腰侧30s/侧', equipment: '无' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身', note: '5 min', moves: [
                  { name: '核心预激活热身', detail: '死虫+鸟狗唤醒，2组×10次', equipment: '瑜伽垫' },
                ]},
                { category: '功能力量', note: '17 min', moves: [
                  { name: '常规硬拉', detail: '中等负荷维持脊柱中立，4组×8次', equipment: '杠铃' },
                  { name: '高脚杯深蹲', detail: '负重深蹲核心收紧，4组×10次', equipment: '哑铃' },
                  { name: '负重搬运', detail: '农夫行走整合躯干稳定，3组×30m', equipment: '壶铃' },
                ]},
                { category: '稳定整合', note: '8 min', moves: [
                  { name: '帕洛夫推+行走', detail: '抗旋动态行走，3组×12步', equipment: '绳索器械' },
                ]},
              ]},
            ]
          }
        }
      }
    ]
  },

  // ───────────────────────────────────────── 膝 ─────────────────────────────────────────
  knee: {
    name: '膝稳养成专项',
    tagline: '12周重建膝关节追踪',
    icon: 'directions_walk',
    color: '#c08a7d',
    totalWeeks: 12,
    science: {
      anatomy: '解剖学：膝超伸、X/O型腿多源于膝关节排列异常。股内侧肌（VMO）激活不足使髌骨追踪偏移，臀中肌薄弱导致股骨内旋（动态外翻），髂胫束（IT带）过度紧张加剧髌骨外侧应力。',
      fascia: '筋膜学：问题沿体侧线（LL）的髂胫束段与螺旋线（SPL）传导。螺旋线决定足弓-膝-骨盆的旋转对位，其失衡会让膝在动作中出现内扣或外张，松解IT带需结合螺旋链整体处理。',
      neuro: '运动神经学：膝痛者常出现VMO相对外侧肌激活延迟，落地时缺乏髋膝协同减速。需通过终末伸膝与离心控制训练重建髌骨追踪与下肢减速的运动控制。',
      brain: '脑科学：膝关节的位置觉与动态稳定依赖丰富的本体感觉反馈。通过不稳定面与落地训练，可强化小脑与运动皮层对膝对位的实时调控，提升动作中的自动纠偏能力。',
      habit: '习惯纠正：站立锁膝（超伸）、内八/外八步态与不当跑姿是主要诱因。学会站立时膝微屈不锁死、保持膝盖对准第二脚趾、选择合适鞋具，是保护膝关节的日常关键。',
    },
    phases: [
      {
        id: 'adapt', name: '适应期', weeks: '第1–4周', weekRange: [1, 4],
        goal: '筋膜松解 · 感觉重建 · 建立运动模式',
        keyWords: ['松解', '唤醒', '感知'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                { category: '筋膜松解', note: '6 min', moves: [
                  { name: 'IT带（髂胫束）泡沫轴松解', detail: '侧卧大腿外侧沿轴缓滚找紧张点，2min/侧', equipment: '泡沫轴' },
                  { name: '小腿三头肌松解', detail: '坐姿小腿置轴上滚压，2min/侧', equipment: '泡沫轴' },
                ]},
                { category: '神经激活', note: '7 min', moves: [
                  { name: 'VMO终末伸膝激活', detail: '坐姿膝下垫卷毛巾，末端伸直股内侧收紧，3组×12次', equipment: '毛巾' },
                  { name: '踝稳定训练', detail: '单腿站立维持踝中立微调，3组×20s/侧', equipment: '无' },
                ]},
                { category: '习惯纠正', note: '日常执行', moves: [
                  { name: '站立膝微屈不锁死', detail: '避免站立时膝超伸锁死', equipment: '无' },
                  { name: '膝对准第二脚趾', detail: '上下楼/蹲起时保持膝对齐第二趾', equipment: '无' },
                ]},
              ]},
              { title: 'B训练：感知整合（周二/四）', totalMins: 15, blocks: [
                { category: '激活', note: '8 min', moves: [
                  { name: '臀中肌侧抬腿', detail: '侧卧直腿上抬激活臀中肌，3组×15次/侧', equipment: '瑜伽垫' },
                  { name: '直腿抬高（VMO）', detail: '仰卧脚尖微外旋直腿抬，3组×12次/侧', equipment: '瑜伽垫' },
                ]},
                { category: '感觉重建', note: '7 min', moves: [
                  { name: '镜前膝追踪校准', detail: '对镜微蹲观察膝对准第二趾，3组×10次', equipment: '镜子' },
                  { name: '闭眼单腿平衡', detail: '闭眼单腿站立强化本体觉，3组×15s/侧', equipment: '无' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '激活', note: '5 min', moves: [
                  { name: '坐姿终末伸膝', detail: '坐姿伸直膝股内侧收紧保持5s，3组×12次', equipment: '办公椅' },
                ]},
              ]},
              { title: '午间松解（午休）', totalMins: 5, blocks: [
                { category: '松解', note: '5 min', moves: [
                  { name: '站姿股四头/IT带牵伸', detail: '抓脚踝拉股四头并侧倾拉IT带，30s/侧', equipment: '无' },
                ]},
              ]},
              { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                { category: '激活+习惯', note: '5 min', moves: [
                  { name: '扶椅单腿平衡', detail: '单腿站立维持膝对位，3组×20s/侧', equipment: '办公椅' },
                  { name: '坐姿避免锁膝提示', detail: '起身时膝微屈不锁死', equipment: '无' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身+筋膜松解', note: '8 min', moves: [
                  { name: 'IT带+股四头松解', detail: '泡沫轴松解大腿外侧前侧，3min', equipment: '泡沫轴' },
                  { name: '踝关节活动度', detail: '靠墙屈踝找膝过脚尖活动度，2min', equipment: '墙' },
                ]},
                { category: '神经肌肉激活', note: '10 min', moves: [
                  { name: '弹力带蚌式', detail: '激活臀中肌控制股骨内旋，3组×15次/侧', equipment: '弹力带' },
                  { name: 'VMO终末伸膝（负重）', detail: '踝绑小负荷末端伸膝，3组×12次/侧', equipment: '踝部沙袋' },
                ]},
                { category: '力量强化', note: '10 min', moves: [
                  { name: '靠墙静蹲', detail: '膝对第二趾半蹲保持，3组×30s', equipment: '墙' },
                  { name: '弹力带侧向步行', detail: '膝套带屈髋侧走控制膝，3组×12步', equipment: '弹力带' },
                ]},
                { category: '整合训练', note: '2 min', moves: [
                  { name: '单腿平衡收尾', detail: '单腿站立维持膝踝对位', equipment: '无' },
                ]},
              ]},
            ]
          }
        }
      },
      {
        id: 'progress', name: '成效期', weeks: '第5–8周', weekRange: [5, 8],
        goal: '肌力强化 · 动作模式建立 · 代偿纠正',
        keyWords: ['强化', '整合', '进阶'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：控制强化（周一/三/五）', totalMins: 15, blocks: [
                { category: '蹲控制', note: '8 min', moves: [
                  { name: '微蹲控制（膝追踪第二趾）', detail: '慢速半蹲全程膝对第二趾，3组×12次', equipment: '无' },
                  { name: '靠墙静蹲进阶', detail: '加深角度保持膝稳定，3组×40s', equipment: '墙' },
                ]},
                { category: '侧链强化', note: '7 min', moves: [
                  { name: '侧向步行（弹力带）', detail: '膝套带屈髋侧走，3组×12步/向', equipment: '弹力带' },
                  { name: '单腿微蹲', detail: '单腿浅蹲控制膝不内扣，3组×8次/侧', equipment: '无' },
                ]},
              ]},
              { title: 'B训练：单腿整合（周二/四）', totalMins: 15, blocks: [
                { category: '单腿力量', note: '8 min', moves: [
                  { name: '后撤步弓步', detail: '后撤弓步膝对位下蹲，3组×10次/侧', equipment: '无' },
                  { name: '台阶上踏', detail: '矮台上踏控制膝追踪，3组×10次/侧', equipment: '台阶' },
                ]},
                { category: '平衡进阶', note: '7 min', moves: [
                  { name: '单腿平衡+触地', detail: '单腿站立向前点地再回收，3组×10次/侧', equipment: '无' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '激活', note: '5 min', moves: [
                  { name: '坐站微蹲控制', detail: '从椅子起坐控制膝对位，3组×12次', equipment: '办公椅' },
                ]},
              ]},
              { title: '午间整合（午休）', totalMins: 5, blocks: [
                { category: '强化', note: '5 min', moves: [
                  { name: '靠墙静蹲', detail: '半蹲膝对第二趾保持，3组×40s', equipment: '墙' },
                ]},
              ]},
              { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                { category: '侧链', note: '5 min', moves: [
                  { name: '弹力带侧走', detail: '膝套带侧向步行，3组×12步', equipment: '弹力带' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身+激活', note: '6 min', moves: [
                  { name: '臀中肌+VMO激活组', detail: '蚌式+终末伸膝唤醒，2组×15次', equipment: '弹力带' },
                ]},
                { category: '力量强化', note: '18 min', moves: [
                  { name: '高脚杯深蹲', detail: '负重深蹲膝对第二趾，4组×10次', equipment: '哑铃' },
                  { name: '保加利亚分腿蹲', detail: '后脚抬高单腿蹲控制膝，4组×8次/侧', equipment: '哑铃' },
                  { name: '侧向跨步蹲', detail: '侧弓步强化髋膝控制，3组×10次/侧', equipment: '哑铃' },
                ]},
                { category: '整合', note: '6 min', moves: [
                  { name: '单腿罗马尼亚硬拉', detail: '单腿髋铰链控制膝踝对位，3组×8次/侧', equipment: '哑铃' },
                ]},
              ]},
            ]
          }
        }
      },
      {
        id: 'consolidate', name: '巩固期', weeks: '第9–12周', weekRange: [9, 12],
        goal: '功能整合 · 自动化 · 长期维持策略',
        keyWords: ['整合', '自动化', '持续'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：功能下蹲（周一/三/五）', totalMins: 15, blocks: [
                { category: '功能性下蹲', note: '8 min', moves: [
                  { name: '功能性下蹲（深度进阶）', detail: '全幅深蹲维持膝对位，3组×12次', equipment: '无' },
                  { name: '单腿深蹲进阶', detail: '扶物单腿下蹲控制膝，3组×8次/侧', equipment: '无' },
                ]},
                { category: '落地缓冲', note: '7 min', moves: [
                  { name: '落地缓冲训练', detail: '小跳落地屈髋屈膝缓冲膝对位，3组×10次', equipment: '无' },
                ]},
              ]},
              { title: 'B训练：步态整合（周二/四）', totalMins: 15, blocks: [
                { category: '步态整合', note: '8 min', moves: [
                  { name: '爬坡走（楼梯/坡）', detail: '上坡走强化髋膝协同，3组×20步', equipment: '楼梯' },
                  { name: '下台阶控制', detail: '缓慢下台阶离心控制膝，3组×10次/侧', equipment: '台阶' },
                ]},
                { category: '维持策略', note: '7 min', moves: [
                  { name: '步态自检习惯', detail: '走路检查膝对第二趾、不内扣', equipment: '无' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '整合', note: '5 min', moves: [
                  { name: '坐站功能蹲', detail: '起坐全程膝对位控制，3组×12次', equipment: '办公椅' },
                ]},
              ]},
              { title: '午间维持（午休）', totalMins: 5, blocks: [
                { category: '步态', note: '5 min', moves: [
                  { name: '爬楼梯训练', detail: '上下楼控制膝对位，3组×1层', equipment: '楼梯' },
                ]},
              ]},
              { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                { category: '维持', note: '5 min', moves: [
                  { name: 'IT带牵伸', detail: '收尾拉伸大腿外侧30s/侧', equipment: '无' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身', note: '5 min', moves: [
                  { name: '下肢动态热身', detail: '弓步+侧走唤醒髋膝，2组×10次', equipment: '弹力带' },
                ]},
                { category: '功能力量', note: '17 min', moves: [
                  { name: '后蹲/高脚杯深蹲', detail: '中负荷深蹲膝对位，4组×8次', equipment: '杠铃/哑铃' },
                  { name: '箱式跳落地缓冲', detail: '跳上箱并缓冲落地控制膝，4组×8次', equipment: '跳箱' },
                  { name: '保加利亚分腿蹲', detail: '负重单腿蹲控制膝踝，3组×8次/侧', equipment: '哑铃' },
                ]},
                { category: '稳定整合', note: '8 min', moves: [
                  { name: 'BOSU单腿平衡', detail: '不稳定面单腿站立强化本体觉，3组×30s/侧', equipment: 'BOSU球' },
                ]},
              ]},
            ]
          }
        }
      }
    ]
  },

  // ───────────────────────────────────────── 足 / 足弓 ─────────────────────────────────────────
  foot: {
    name: '足弓生长专项',
    tagline: '12周重建足部地基',
    icon: 'directions_walk',
    color: '#c08a7d',
    totalWeeks: 12,
    science: {
      anatomy: '解剖学：扁平足/足弓塌陷源于足底内在肌（如足底方肌、蚓状肌）与胫骨后肌薄弱，无法维持内侧纵弓。足弓塌陷会引发距下关节过度旋前，沿动力链向上影响膝、髋对位。',
      fascia: '筋膜学：问题沿浅背线（SBL）的足底筋膜段与前深线（DFL）的胫骨后肌段传导。足底筋膜是浅背线的起点，其张力影响整条背线；松解与强化需将足部视为全身张力网络的「地基」。',
      neuro: '运动神经学：足部拥有密集的机械感受器，是站立平衡的首要信息源。扁平足者足部感觉输入减弱，需通过「短足」等精细训练重建足内在肌的分离控制与本体感觉。',
      brain: '脑科学：足底是身体与地面的「感觉界面」，其本体输入在大脑形成丰富的足部地图。赤足训练与平衡挑战可强化这一地图，提升姿势控制的自动化程度。',
      habit: '习惯纠正：长期穿高足弓支撑鞋、缺乏赤足活动使足内在肌「用进废退」。增加赤足时间、选择宽楦薄底鞋、日常做足趾活动，是激活足部地基的关键。',
    },
    phases: [
      {
        id: 'adapt', name: '适应期', weeks: '第1–4周', weekRange: [1, 4],
        goal: '筋膜松解 · 感觉重建 · 建立运动模式',
        keyWords: ['松解', '唤醒', '感知'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                { category: '筋膜松解', note: '5 min', moves: [
                  { name: '足底筋膜球松解', detail: '坐姿脚踩球前后滚压找痛点，2min/侧', equipment: '筋膜球' },
                  { name: '小腿三头肌松解', detail: '小腿后侧沿轴滚压，1.5min/侧', equipment: '泡沫轴' },
                ]},
                { category: '神经激活', note: '8 min', moves: [
                  { name: '短足练习（Short Foot）', detail: '足趾不蜷缩，将前脚掌向脚跟方向拱起内侧弓，保持5s，3组×10次/侧', equipment: '无' },
                  { name: '趾头抓毛巾', detail: '脚趾抓握毛巾向身体拉，3组×10次/侧', equipment: '毛巾' },
                ]},
                { category: '习惯纠正', note: '日常执行', moves: [
                  { name: '增加赤足时间', detail: '居家尽量赤足活动唤醒足内在肌', equipment: '无' },
                  { name: '选择宽楦薄底鞋', detail: '给足趾留空间，减少过度支撑', equipment: '无' },
                ]},
              ]},
              { title: 'B训练：感知整合（周二/四）', totalMins: 15, blocks: [
                { category: '激活', note: '8 min', moves: [
                  { name: '脚趾分离（大趾独立）', detail: '练习大脚趾单独上抬其余不动，3组×10次/侧', equipment: '无' },
                  { name: '弹珠/小物抓取', detail: '脚趾抓取小物移入碗中，3组×10个/侧', equipment: '小物件' },
                ]},
                { category: '感觉重建', note: '7 min', moves: [
                  { name: '赤足三点压力感知', detail: '站立感受大趾球/小趾球/脚跟三点均匀受力，3组×20s', equipment: '无' },
                  { name: '闭眼单腿平衡', detail: '赤足闭眼单腿站立，3组×15s/侧', equipment: '无' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '激活', note: '5 min', moves: [
                  { name: '桌下短足练习', detail: '脱鞋坐姿做短足拱弓，3组×10次/侧', equipment: '无' },
                ]},
              ]},
              { title: '午间松解（午休）', totalMins: 5, blocks: [
                { category: '松解', note: '5 min', moves: [
                  { name: '足底球滚压', detail: '脚踩小球滚压足底，2min/侧', equipment: '小球' },
                ]},
              ]},
              { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                { category: '激活+习惯', note: '5 min', moves: [
                  { name: '桌下趾抓毛巾', detail: '脚趾抓握毛巾，3组×10次/侧', equipment: '毛巾' },
                  { name: '通勤赤足提示', detail: '到家后赤足活动增加足部刺激', equipment: '无' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身+筋膜松解', note: '8 min', moves: [
                  { name: '足底+小腿松解', detail: '球滚足底加泡沫轴松小腿，3min', equipment: '筋膜球/泡沫轴' },
                  { name: '踝关节活动度', detail: '屈踝绕环找全幅活动，2min', equipment: '无' },
                ]},
                { category: '神经肌肉激活', note: '10 min', moves: [
                  { name: '短足练习（站姿）', detail: '站立做短足拱弓维持，3组×10次/侧', equipment: '无' },
                  { name: '脚趾分离控制', detail: '大趾与其余趾分离上抬，3组×10次/侧', equipment: '无' },
                ]},
                { category: '力量强化', note: '10 min', moves: [
                  { name: '提踵（双腿）', detail: '缓慢提踵控制内侧弓，3组×15次', equipment: '无' },
                  { name: '胫骨后肌抗阻内翻', detail: '弹力带做足内翻抗阻，3组×15次/侧', equipment: '弹力带' },
                ]},
                { category: '整合训练', note: '2 min', moves: [
                  { name: '赤足平衡收尾', detail: '单腿站立维持足弓与压力均衡', equipment: '无' },
                ]},
              ]},
            ]
          }
        }
      },
      {
        id: 'progress', name: '成效期', weeks: '第5–8周', weekRange: [5, 8],
        goal: '肌力强化 · 动作模式建立 · 代偿纠正',
        keyWords: ['强化', '整合', '进阶'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：足弓强化（周一/三/五）', totalMins: 15, blocks: [
                { category: '提踵强化', note: '8 min', moves: [
                  { name: '单腿提踵', detail: '单腿缓慢提踵控制内侧弓不塌，3组×12次/侧', equipment: '无' },
                  { name: '足弓强化走（短足行走）', detail: '维持短足姿态缓慢行走，3组×20步', equipment: '无' },
                ]},
                { category: '足趾控制', note: '7 min', moves: [
                  { name: '脚趾分离控制进阶', detail: '逐趾依次上抬下压，3组×8次/侧', equipment: '无' },
                  { name: '提踵+趾屈组合', detail: '提踵末端加趾屈强化前足，3组×12次', equipment: '无' },
                ]},
              ]},
              { title: 'B训练：平衡整合（周二/四）', totalMins: 15, blocks: [
                { category: '平衡强化', note: '8 min', moves: [
                  { name: '单腿平衡+扰动', detail: '单腿站立同时另手抛接物，3组×20s/侧', equipment: '小球' },
                  { name: '踮脚单腿保持', detail: '提踵后单腿保持平衡，3组×15s/侧', equipment: '无' },
                ]},
                { category: '动力链整合', note: '7 min', moves: [
                  { name: '短足+微蹲', detail: '维持足弓同时微蹲，膝对第二趾，3组×10次', equipment: '无' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '激活', note: '5 min', moves: [
                  { name: '站姿提踵', detail: '扶桌缓慢提踵控制足弓，3组×15次', equipment: '办公桌' },
                ]},
              ]},
              { title: '午间整合（午休）', totalMins: 5, blocks: [
                { category: '强化', note: '5 min', moves: [
                  { name: '短足行走', detail: '维持足弓姿态走动，3组×20步', equipment: '无' },
                ]},
              ]},
              { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                { category: '平衡', note: '5 min', moves: [
                  { name: '扶椅单腿平衡', detail: '单腿站立维持足三点受力，3组×20s/侧', equipment: '办公椅' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身+激活', note: '6 min', moves: [
                  { name: '短足+踝激活组', detail: '短足练习加踝多向激活，2组×10次', equipment: '弹力带' },
                ]},
                { category: '力量强化', note: '18 min', moves: [
                  { name: '负重单腿提踵', detail: '手持哑铃单腿提踵控制足弓，4组×12次/侧', equipment: '哑铃' },
                  { name: '胫骨后肌抗阻内翻', detail: '弹力带强化足内翻，3组×15次/侧', equipment: '弹力带' },
                  { name: '台阶提踵（全幅）', detail: '台阶边缘全幅提踵离心控制，3组×12次', equipment: '台阶' },
                ]},
                { category: '整合', note: '6 min', moves: [
                  { name: '赤足单腿平衡+蹲', detail: '不稳面单腿微蹲维持足弓，3组×8次/侧', equipment: '平衡垫' },
                ]},
              ]},
            ]
          }
        }
      },
      {
        id: 'consolidate', name: '巩固期', weeks: '第9–12周', weekRange: [9, 12],
        goal: '功能整合 · 自动化 · 长期维持策略',
        keyWords: ['整合', '自动化', '持续'],
        scenes: {
          home: {
            frequency: '每天15分钟', daysPerWeek: 5,
            sessions: [
              { title: 'A训练：赤足平衡（周一/三/五）', totalMins: 15, blocks: [
                { category: '赤足站立平衡', note: '8 min', moves: [
                  { name: '赤足站立平衡（不稳面）', detail: '软垫上赤足单腿站立维持足弓，3组×30s/侧', equipment: '软垫/枕头' },
                  { name: '闭眼赤足平衡', detail: '闭眼单腿站立强化本体觉，3组×20s/侧', equipment: '无' },
                ]},
                { category: '动态控制', note: '7 min', moves: [
                  { name: '赤足提踵行走', detail: '踮脚行走维持足弓与平衡，3组×20步', equipment: '无' },
                ]},
              ]},
              { title: 'B训练：步态整合（周二/四）', totalMins: 15, blocks: [
                { category: '功能步态整合', note: '8 min', moves: [
                  { name: '功能步态整合（足跟到趾推进）', detail: '行走时足跟落地滚动至大趾推离，3组×20步', equipment: '无' },
                  { name: '短足+弓步行走', detail: '维持足弓做行进弓步，3组×10步/侧', equipment: '无' },
                ]},
                { category: '维持策略', note: '7 min', moves: [
                  { name: '赤足日常习惯', detail: '将居家赤足与短足提示固化为日常', equipment: '无' },
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            sessions: [
              { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                { category: '整合', note: '5 min', moves: [
                  { name: '短足站立保持', detail: '站立维持足弓拱起，3组×30s', equipment: '无' },
                ]},
              ]},
              { title: '午间维持（午休）', totalMins: 5, blocks: [
                { category: '平衡', note: '5 min', moves: [
                  { name: '单腿平衡进阶', detail: '单腿站立闭眼挑战，3组×20s/侧', equipment: '无' },
                ]},
              ]},
              { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                { category: '维持', note: '5 min', moves: [
                  { name: '足底球放松', detail: '收尾滚压足底放松，2min/侧', equipment: '小球' },
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            sessions: [
              { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                { category: '热身', note: '5 min', moves: [
                  { name: '足踝动态热身', detail: '短足+踝绕环唤醒，2组×10次', equipment: '无' },
                ]},
                { category: '功能力量', note: '17 min', moves: [
                  { name: '负重提踵（杠铃/史密斯）', detail: '负重全幅提踵控制足弓，4组×12次', equipment: '杠铃' },
                  { name: '赤足深蹲', detail: '赤足深蹲维持足三点受力膝对位，4组×10次', equipment: '哑铃' },
                  { name: '单腿硬拉（足弓维持）', detail: '单腿髋铰链维持足弓不塌，3组×8次/侧', equipment: '哑铃' },
                ]},
                { category: '稳定整合', note: '8 min', moves: [
                  { name: '平衡垫单腿挑战', detail: '不稳面单腿站立+扰动，3组×30s/侧', equipment: '平衡垫' },
                ]},
              ]},
            ]
          }
        }
      }
    ]
  },

}

module.exports = { REHAB_PLANS }
