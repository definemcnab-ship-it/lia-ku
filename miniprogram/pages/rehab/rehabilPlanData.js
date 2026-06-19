// 专属康复计划数据
// 6 大体态问题 × 3 阶段（适应期/成效期/巩固期）× 3 场景（居家/办公室/健身房）× 4周渐进计划
// 内容基于功能解剖学、筋膜链理论、运动控制与神经可塑性原则编写

const REHAB_PLANS = {
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
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '5 min', moves: [
                    { name: '胸锁乳突肌筋膜球滚压', detail: '沿耳后至锁骨找痛点轻停留20s，2min/侧', equipment: '筋膜球' },
                    { name: '枕下肌群自我松解', detail: '仰卧，双手指腹托于枕骨下缘，下颌微收，保持1.5min', equipment: '无' },
                  ]},
                  { category: '神经激活', note: '7 min', moves: [
                    { name: '镜前深颈屈肌激活', detail: '舌尖顶上颚，下巴轻内收（点头不低头），2组×8个呼吸', equipment: '镜子' },
                    { name: '靠墙缩下巴', detail: '后脑靠墙，下巴水平内收，保持8s，2组×8次', equipment: '墙' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '手机屏幕高于肘部', detail: '使用手机时保持屏幕与眼同高，减少低头时长', equipment: '无' },
                    { name: '60分钟起身法则', detail: '每60分钟离座90秒，做颈部回收动作', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：整合+感知（周二/四）', totalMins: 15, blocks: [
                  { category: '呼吸再训练', note: '5 min', moves: [
                    { name: '仰卧腹式呼吸', detail: '一手胸一手腹，吸气仅腹部隆起，4-4-6节律，4min', equipment: '无' },
                    { name: '肋骨下沉训练', detail: '呼气时主动下压肋骨，避免上胸代偿，2组×6次', equipment: '无' },
                  ]},
                  { category: '感觉重建', note: '7 min', moves: [
                    { name: '睁眼头位复位', detail: '主动找中立头位→小幅偏离→缓慢复位校准，2组×6次', equipment: '镜子' },
                    { name: '坐姿轴向延伸', detail: '想象头顶被线轻提，脊柱节节延长，保持8s×6次', equipment: '无' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '枕头高度调整', detail: '仰卧时枕高填满颈曲约一拳，侧卧时与肩同高', equipment: '颈椎枕' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '5 min', moves: [
                    { name: '胸锁乳突肌筋膜球滚压', detail: '沿耳后至锁骨找痛点停留30s并配合缓慢转头，2.5min/侧', equipment: '筋膜球' },
                    { name: '枕下肌群进阶松解', detail: '仰卧托枕骨下缘，缓慢做微幅点头加深松解，保持2min', equipment: '无' },
                  ]},
                  { category: '神经激活', note: '7 min', moves: [
                    { name: '镜前深颈屈肌激活', detail: '舌尖顶上颚，下巴内收，3组×10个呼吸', equipment: '镜子' },
                    { name: '靠墙缩下巴+延长', detail: '后脑靠墙内收同时想象延长，保持10s，3组×10次', equipment: '墙' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '手机屏幕高于肘部', detail: '全天保持屏幕与眼同高，记录低头次数', equipment: '无' },
                    { name: '60分钟起身法则', detail: '每60分钟离座90秒做颈部回收', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：整合+感知（周二/四）', totalMins: 15, blocks: [
                  { category: '呼吸再训练', note: '5 min', moves: [
                    { name: '仰卧腹式呼吸加长呼气', detail: '4-4-8节律延长呼气放松上斜方，5min', equipment: '无' },
                    { name: '侧卧肋骨松动', detail: '侧卧吸气扩张下方肋间，2组×8次', equipment: '无' },
                  ]},
                  { category: '感觉重建', note: '7 min', moves: [
                    { name: '闭眼头位复位', detail: '主动找中立头位→闭眼偏离→复位校准，3组×8次', equipment: '无' },
                    { name: '坐姿轴向延伸+小幅旋转', detail: '延长同时缓慢左右转头感知中立，3组×8次', equipment: '无' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '枕头与睡姿复核', detail: '复核枕高填满颈曲，避免俯睡', equipment: '颈椎枕' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: 'A训练：松解+控制（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '4 min', moves: [
                    { name: '上斜方+肩胛提肌松解', detail: '筋膜球贴墙滚压肩颈交界痛点，2min/侧', equipment: '筋膜球' },
                  ]},
                  { category: '神经控制', note: '8 min', moves: [
                    { name: '仰卧抬头离床控制', detail: '先缩下巴再微抬头2cm缓慢放下，3组×8次', equipment: '无' },
                    { name: '弹力带辅助缩下巴', detail: '带绕后脑给轻阻，对抗中内收下巴，3组×10次', equipment: '弹力带' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '步行头位提示', detail: '步行时耳垂对齐肩峰自我提醒', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：单侧感知（周二/四）', totalMins: 15, blocks: [
                  { category: '呼吸再训练', note: '4 min', moves: [
                    { name: '坐姿膈肌呼吸', detail: '坐位维持中立头位做腹式呼吸，4min', equipment: '无' },
                  ]},
                  { category: '感觉重建', note: '8 min', moves: [
                    { name: '单侧旋转头位定位', detail: '转头至中段定格闭眼校准回正，3组×8次/侧', equipment: '无' },
                    { name: '不稳面坐姿延伸', detail: '坐软垫上维持轴向延伸，3组×30s', equipment: '软垫' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '座椅靠垫支撑', detail: '腰靠垫辅助骨盆中立带动头位', equipment: '靠垫' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: 'A训练：整合评估（周一/三/五）', totalMins: 15, blocks: [
                  { category: '动态松解', note: '4 min', moves: [
                    { name: '颈胸联动活动', detail: '配合呼吸做颈胸椎波浪活动唤醒，2组×8次', equipment: '无' },
                  ]},
                  { category: '复合控制', note: '8 min', moves: [
                    { name: '缩下巴+轴向延伸组合', detail: '内收接延长一气呵成保持10s，3组×10次', equipment: '无' },
                    { name: '靠墙天使滑动', detail: '后脑上背贴墙手臂沿墙滑动，3组×10次', equipment: '墙' },
                  ]},
                  { category: '自我评估', note: '3 min', moves: [
                    { name: '颈屈肌耐力测试', detail: '仰卧缩下巴微抬头计时记录耐力进步', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：综合感知（周二/四）', totalMins: 15, blocks: [
                  { category: '整合感知', note: '9 min', moves: [
                    { name: '闭眼复合头位校准', detail: '多方向偏离后闭眼回正综合校准，3组×10次', equipment: '无' },
                    { name: '负重头位行走', detail: '头顶小书本维持中立行走数步，3组×30s', equipment: '书本' },
                  ]},
                  { category: '习惯固化', note: '6 min', moves: [
                    { name: '日常套路复盘', detail: '复核屏幕/枕头/座椅与起身习惯落实情况', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '神经激活', note: '5 min', moves: [
                    { name: '坐姿缩下巴', detail: '背贴椅背，下巴水平内收，保持6s，2组×8次', equipment: '办公椅' },
                    { name: '颈部轴向延伸', detail: '想象头顶提线，延长颈椎，保持8s×6次', equipment: '无' },
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
                    { name: '靠墙缩下巴', detail: '后脑贴墙内收下巴，8s×8次', equipment: '墙' },
                    { name: '显示器升高', detail: '屏幕上沿与眼平齐，键盘前移使肘成90°', equipment: '显示器支架' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '神经激活', note: '5 min', moves: [
                    { name: '坐姿缩下巴', detail: '背贴椅背内收下巴保持8s，3组×8次', equipment: '办公椅' },
                    { name: '颈部轴向延伸+点头', detail: '延伸基础上加微幅点头激活深层，3组×8次', equipment: '无' },
                  ]},
                ]},
                { title: '午间松解（午休）', totalMins: 5, blocks: [
                  { category: '筋膜松解', note: '5 min', moves: [
                    { name: '肩胛提肌牵伸', detail: '低头转向对侧手轻压加深牵伸，30s/侧×2', equipment: '无' },
                    { name: '枕下网球松解', detail: '靠墙以网球压枕骨下缘缓慢松解1min', equipment: '网球' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '激活+习惯', note: '5 min', moves: [
                    { name: '靠墙缩下巴延长', detail: '内收同时想象延长保持10s×8次', equipment: '墙' },
                    { name: '工位高度复核', detail: '复核屏幕高度与坐姿是否到位', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '抗阻激活', note: '5 min', moves: [
                    { name: '坐姿徒手颈轻抗阻', detail: '手抵额/枕等长轻对抗，8s×每向2次', equipment: '无' },
                  ]},
                ]},
                { title: '午间控制（午休）', totalMins: 5, blocks: [
                  { category: '神经控制', note: '5 min', moves: [
                    { name: '坐姿单侧旋转定位', detail: '转头至中段定格闭眼回正，3组×6次/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '稳定保持', note: '5 min', moves: [
                    { name: '靠墙天使滑动', detail: '上背贴墙手臂滑动维持头位，3组×10次', equipment: '墙' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '复合控制', note: '5 min', moves: [
                    { name: '缩下巴+延伸组合', detail: '内收接延长一气呵成，3组×10次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '感知整合', note: '5 min', moves: [
                    { name: '闭眼头位复位', detail: '闭眼偏离后主动找回中立，3组×8次', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '评估+习惯', note: '5 min', moves: [
                    { name: '头位耐力保持', detail: '中立头位静态保持45s×3记录进步', equipment: '无' },
                    { name: '工位人体工学复核', detail: '检查屏幕高度与坐姿是否到位', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+筋膜松解', note: '8 min', moves: [
                    { name: '胸椎泡沫轴滚压', detail: '上背沿轴上下滚动，停留紧张点，2min', equipment: '泡沫轴' },
                    { name: '胸锁乳突肌花生球松解', detail: '颈侧找痛点缓压，30s/侧×2', equipment: '花生球' },
                  ]},
                  { category: '神经肌肉激活', note: '10 min', moves: [
                    { name: '仰卧点头激活', detail: '垫上仰卧，纯下颌内收点头，3组×10次', equipment: '瑜伽垫' },
                    { name: '四足支撑头位保持', detail: '四点跪姿维持颈椎中立，4组×20s', equipment: '瑜伽垫' },
                  ]},
                  { category: '力量强化', note: '10 min', moves: [
                    { name: '弹力带颈部等长抗阻', detail: '带绕头四方向各加轻阻，保持8s，每向3次', equipment: '弹力带' },
                    { name: '俯身YTW', detail: '徒手做Y-T-W字，激活中下斜方，3组×8次', equipment: '无' },
                  ]},
                  { category: '整合训练', note: '2 min', moves: [
                    { name: '站姿轴向延伸呼吸', detail: '延长脊柱配合腹式呼吸收尾，6个呼吸', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+筋膜松解', note: '8 min', moves: [
                    { name: '胸椎泡沫轴伸展', detail: '轴置上背做被动后伸加深活动度，3min', equipment: '泡沫轴' },
                    { name: '枕下花生球松解', detail: '仰卧枕骨下缘缓压点头松解，2min', equipment: '花生球' },
                  ]},
                  { category: '神经肌肉激活', note: '10 min', moves: [
                    { name: '仰卧抬头离床控制', detail: '缩下巴后微抬头缓慢放下，3组×10次', equipment: '瑜伽垫' },
                    { name: '四足头位+对侧伸臂', detail: '维持颈中立同时伸单臂，3组×10次', equipment: '瑜伽垫' },
                  ]},
                  { category: '力量强化', note: '10 min', moves: [
                    { name: '弹力带颈四向抗阻', detail: '阻力略增，每向保持10s×3', equipment: '弹力带' },
                    { name: '小哑铃俯身YTW', detail: '加小重量做Y-T-W，3组×10次', equipment: '哑铃' },
                  ]},
                  { category: '整合训练', note: '2 min', moves: [
                    { name: '站姿延伸呼吸', detail: '延长脊柱配合呼吸整合，6个呼吸', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+筋膜松解', note: '6 min', moves: [
                    { name: '动态颈胸联动热身', detail: '颈胸椎多向活动唤醒，2组×10次', equipment: '无' },
                  ]},
                  { category: '神经肌肉激活', note: '8 min', moves: [
                    { name: '鸟狗变式头位保持', detail: '鸟狗对侧伸展中维持颈中立，3组×10次', equipment: '瑜伽垫' },
                    { name: '不稳面四足头位', detail: '手撑软垫维持中立头位，3组×20s', equipment: '软垫' },
                  ]},
                  { category: '力量强化', note: '14 min', moves: [
                    { name: '面拉（Face Pull）', detail: '绳索高位拉至面前外旋夹肩，4组×12次', equipment: '绳索器械' },
                    { name: '俯身反向飞鸟', detail: '哑铃后束飞鸟，4组×12次', equipment: '哑铃' },
                    { name: '弹力带颈单侧抗阻', detail: '侧向加阻保持控制，每侧3×10s', equipment: '弹力带' },
                  ]},
                  { category: '整合训练', note: '2 min', moves: [
                    { name: '站姿轴向延伸', detail: '负重姿势下保持头位中立呼吸整合', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '动态颈胸联动热身', detail: '颈胸椎多向活动配合呼吸唤醒，2组×10次', equipment: '无' },
                  ]},
                  { category: '复合功能力量', note: '15 min', moves: [
                    { name: '过头农夫行走', detail: '单臂过头负重行走维持头位，4组×20m', equipment: '壶铃' },
                    { name: '面拉+外旋复合', detail: '绳索面拉接外旋一体完成，4组×12次', equipment: '绳索器械' },
                  ]},
                  { category: '稳定整合+评估', note: '8 min', moves: [
                    { name: 'BOSU球上头位保持', detail: '不稳定面站立维持中立头位，3组×30s', equipment: 'BOSU球' },
                    { name: '颈屈肌耐力复测', detail: '仰卧缩下巴抬头计时对比首周', equipment: '瑜伽垫' },
                  ]},
                  { category: '整合放松', note: '2 min', moves: [
                    { name: '轴向延伸呼吸收尾', detail: '延长脊柱深呼吸整合', equipment: '无' },
                  ]},
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
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
                { title: 'A训练：抗阻强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '颈部抗阻', note: '6 min', moves: [
                    { name: '徒手颈椎四向等长抗阻', detail: '手掌抵前后左右施加阻力，颈不动，10s×每向3次', equipment: '无' },
                    { name: '毛巾颈后伸抗阻', detail: '毛巾绕后脑轻拉，颈做轻微后伸对抗，3组×10次', equipment: '毛巾' },
                  ]},
                  { category: '肩颈联动', note: '7 min', moves: [
                    { name: '俯卧YTW', detail: '俯卧抬胸做Y-T-W，激活中下斜方，3组×8次', equipment: '无' },
                    { name: '前锯肌推墙', detail: '推墙末端肩胛前伸，3组×12次', equipment: '墙' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '走路头位提示', detail: '步行时想象耳垂对齐肩峰', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：动作整合（周二/四）', totalMins: 15, blocks: [
                  { category: '开肩活动', note: '7 min', moves: [
                    { name: '门框胸大肌牵伸', detail: '前臂贴门框上中下三角度各拉30s', equipment: '门框' },
                    { name: '猫牛+颈椎联动', detail: '四足位脊柱波浪带动颈椎延伸，3组×8次', equipment: '无' },
                  ]},
                  { category: '稳定整合', note: '8 min', moves: [
                    { name: '靠墙天使滑动', detail: '后脑上背贴墙手臂沿墙上下滑，3组×10次', equipment: '墙' },
                    { name: '坐姿头位负重保持', detail: '头顶放小书本维持中立行走数步，3组×30s', equipment: '书本' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: 'A训练：递增抗阻（周一/三/五）', totalMins: 15, blocks: [
                  { category: '颈部抗阻', note: '6 min', moves: [
                    { name: '徒手颈四向抗阻加时', detail: '每向等长保持加长至12s×每向3次', equipment: '无' },
                    { name: '弹力带颈后伸抗阻', detail: '弹力带替代毛巾增加阻力，3组×12次', equipment: '弹力带' },
                  ]},
                  { category: '肩颈联动', note: '7 min', moves: [
                    { name: '小哑铃俯卧YTW', detail: '加小重量做Y-T-W，3组×10次', equipment: '哑铃' },
                    { name: '前锯肌推墙加节奏', detail: '推墙末端停留2s再回，3组×12次', equipment: '墙' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '走路头位提示', detail: '步行时耳垂对齐肩峰并加摆臂', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：动作整合（周二/四）', totalMins: 15, blocks: [
                  { category: '开肩活动', note: '6 min', moves: [
                    { name: '门框胸肌动态牵伸', detail: '牵伸中加缓慢转体加深，3角度各30s', equipment: '门框' },
                  ]},
                  { category: '稳定整合', note: '9 min', moves: [
                    { name: '靠墙天使滑动加停留', detail: '滑至顶端停留2s，3组×10次', equipment: '墙' },
                    { name: '负重头位行走加距离', detail: '头顶书本行走加长至45s，3组', equipment: '书本' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: 'A训练：单侧进阶（周一/三/五）', totalMins: 15, blocks: [
                  { category: '颈部抗阻', note: '6 min', moves: [
                    { name: '单侧侧屈等长抗阻', detail: '手抵头侧分别对抗左右，每侧12s×3', equipment: '无' },
                    { name: '弹力带斜向抗阻', detail: '带成斜角加阻强化旋转稳定，3组×10次', equipment: '弹力带' },
                  ]},
                  { category: '肩颈联动', note: '7 min', moves: [
                    { name: '单臂俯卧T字', detail: '单侧做T字提高难度，3组×8次/侧', equipment: '哑铃' },
                    { name: '前锯肌单臂推墙', detail: '单臂推墙前伸增加挑战，3组×10次/侧', equipment: '墙' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '不平面站立头位', detail: '软垫上站立维持头位提示', equipment: '软垫' },
                  ]},
                ]},
                { title: 'B训练：不稳整合（周二/四）', totalMins: 15, blocks: [
                  { category: '开肩活动', note: '6 min', moves: [
                    { name: '泡沫轴胸椎伸展', detail: '轴纵置脊柱做开胸伸展，3组×8次', equipment: '泡沫轴' },
                  ]},
                  { category: '稳定整合', note: '9 min', moves: [
                    { name: '不稳面天使滑动', detail: '踩软垫做天使滑动增难度，3组×10次', equipment: '软垫' },
                    { name: '负重单腿头位保持', detail: '单腿站头顶书本维持中立，3组×20s/侧', equipment: '书本' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: 'A训练：复合强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '复合抗阻', note: '7 min', moves: [
                    { name: '颈抗阻+延伸组合', detail: '四向抗阻后接轴向延伸保持，3组×每向', equipment: '弹力带' },
                    { name: '弓步YTW复合', detail: '弓步位做YTW整合下肢稳定，3组×8次', equipment: '哑铃' },
                  ]},
                  { category: '功能整合', note: '8 min', moves: [
                    { name: '深蹲中头位保持', detail: '徒手深蹲全程维持耳肩对齐，3组×10次', equipment: '无' },
                    { name: '过头水瓶行走', detail: '水瓶过头维持颈中立行走，3组×30s', equipment: '水瓶' },
                  ]},
                ]},
                { title: 'B训练：整合评估（周二/四）', totalMins: 15, blocks: [
                  { category: '综合整合', note: '9 min', moves: [
                    { name: '动态开胸+颈延伸串联', detail: '门框牵伸接天使滑动接延伸串联完成，3轮', equipment: '门框' },
                    { name: '负重头位多向行走', detail: '头顶书本前后左右行走，3组×40s', equipment: '书本' },
                  ]},
                  { category: '自我评估', note: '6 min', moves: [
                    { name: '颈屈肌耐力复测', detail: '仰卧缩下巴抬头计时对比适应期', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '抗阻激活', note: '5 min', moves: [
                    { name: '坐姿徒手颈抗阻', detail: '手抵额/枕等长对抗，10s×每向3次', equipment: '无' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '肩颈联动', note: '5 min', moves: [
                    { name: '坐姿W字夹肩', detail: '肘后拉夹肩胛下沉不耸肩，3组×10次', equipment: '无' },
                    { name: '门框胸肌牵伸', detail: '茶水间门框拉伸胸大肌30s/侧', equipment: '门框' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '稳定保持', note: '5 min', moves: [
                    { name: '靠墙天使滑动', detail: '上背贴墙手臂滑动，3组×10次', equipment: '墙' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '抗阻激活', note: '5 min', moves: [
                    { name: '坐姿徒手颈抗阻加时', detail: '每向保持加长至12s×每向3次', equipment: '无' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '肩颈联动', note: '5 min', moves: [
                    { name: '弹力带坐姿W字', detail: '握弹力带做W字增加阻力，3组×12次', equipment: '弹力带' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '稳定保持', note: '5 min', moves: [
                    { name: '靠墙天使滑动加停留', detail: '顶端停留2s，3组×10次', equipment: '墙' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '抗阻激活', note: '5 min', moves: [
                    { name: '坐姿单侧颈抗阻', detail: '分别对抗左右侧屈，每侧12s×3', equipment: '无' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '肩颈联动', note: '5 min', moves: [
                    { name: '弹力带单臂划船', detail: '单臂后拉夹肩强化单侧，3组×10次/侧', equipment: '弹力带' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '稳定保持', note: '5 min', moves: [
                    { name: '单腿站靠墙滑动', detail: '单腿支撑做天使滑动增难度，3组×8次', equipment: '墙' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '复合控制', note: '5 min', moves: [
                    { name: '抗阻接延伸组合', detail: '颈抗阻后接轴向延伸保持，3组×10次', equipment: '无' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '功能整合', note: '5 min', moves: [
                    { name: '站姿W字+过头', detail: 'W字接过头上举串联激活，3组×10次', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '评估+习惯', note: '5 min', moves: [
                    { name: '头位耐力保持', detail: '中立头位保持60s×3记录进步', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+筋膜松解', note: '6 min', moves: [
                    { name: '胸椎泡沫轴伸展', detail: '轴置上背做被动后伸，2min', equipment: '泡沫轴' },
                  ]},
                  { category: '神经肌肉激活', note: '8 min', moves: [
                    { name: '四足支撑头位+对侧伸展', detail: '鸟狗变式维持颈中立，3组×10次', equipment: '瑜伽垫' },
                  ]},
                  { category: '力量强化', note: '14 min', moves: [
                    { name: '面拉（Face Pull）', detail: '绳索高位拉至面前外旋夹肩，4组×12次', equipment: '绳索器械' },
                    { name: '俯身反向飞鸟', detail: '小重量哑铃后束飞鸟，4组×12次', equipment: '哑铃' },
                    { name: '弹力带颈等长抗阻', detail: '四向加阻保持，每向3×10s', equipment: '弹力带' },
                  ]},
                  { category: '整合训练', note: '2 min', moves: [
                    { name: '站姿轴向延伸', detail: '负重姿势下保持头位中立呼吸整合', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+筋膜松解', note: '6 min', moves: [
                    { name: '胸椎泡沫轴伸展加旋转', detail: '后伸基础上加胸椎旋转，3min', equipment: '泡沫轴' },
                  ]},
                  { category: '神经肌肉激活', note: '8 min', moves: [
                    { name: '鸟狗加停留', detail: '对侧伸展末端停留2s维持头位，3组×10次', equipment: '瑜伽垫' },
                  ]},
                  { category: '力量强化', note: '14 min', moves: [
                    { name: '面拉增重', detail: '加重量绳索面拉，4组×12次', equipment: '绳索器械' },
                    { name: '俯身反向飞鸟增重', detail: '哑铃加重后束飞鸟，4组×12次', equipment: '哑铃' },
                    { name: '弹力带颈抗阻加时', detail: '四向保持加长至12s×3', equipment: '弹力带' },
                  ]},
                  { category: '整合训练', note: '2 min', moves: [
                    { name: '站姿延伸呼吸', detail: '保持头位中立呼吸整合', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+筋膜松解', note: '6 min', moves: [
                    { name: '动态颈胸联动热身', detail: '颈胸椎多向活动唤醒，2组×10次', equipment: '无' },
                  ]},
                  { category: '神经肌肉激活', note: '8 min', moves: [
                    { name: '不稳面鸟狗', detail: '手撑BOSU做鸟狗维持头位，3组×8次', equipment: 'BOSU球' },
                  ]},
                  { category: '力量强化', note: '14 min', moves: [
                    { name: '单臂面拉', detail: '单臂绳索面拉强化单侧，4组×10次/侧', equipment: '绳索器械' },
                    { name: '俯身单臂反向飞鸟', detail: '单臂后束飞鸟，4组×10次/侧', equipment: '哑铃' },
                    { name: '弹力带颈旋转抗阻', detail: '斜向加阻强化旋转控制，每向3×10s', equipment: '弹力带' },
                  ]},
                  { category: '整合训练', note: '2 min', moves: [
                    { name: '单腿站轴向延伸', detail: '单腿站保持头位中立呼吸', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '动态颈胸联动热身', detail: '配合呼吸多向活动唤醒，2组×10次', equipment: '无' },
                  ]},
                  { category: '复合功能力量', note: '15 min', moves: [
                    { name: '过头农夫行走', detail: '单臂过头负重行走维持头位，4组×20m', equipment: '壶铃' },
                    { name: '面拉+外旋复合', detail: '绳索面拉接外旋一体完成，4组×12次', equipment: '绳索器械' },
                  ]},
                  { category: '稳定整合+评估', note: '8 min', moves: [
                    { name: 'BOSU球上头位保持', detail: '不稳定面站立维持中立头位，3组×30s', equipment: 'BOSU球' },
                    { name: '面拉力量复测', detail: '记录面拉负重对比首周进步', equipment: '绳索器械' },
                  ]},
                  { category: '整合放松', note: '2 min', moves: [
                    { name: '轴向延伸呼吸收尾', detail: '延长脊柱深呼吸整合', equipment: '无' },
                  ]},
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
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
                { title: 'A训练：功能整合（周一/三/五）', totalMins: 15, blocks: [
                  { category: '动态头位控制', note: '7 min', moves: [
                    { name: '运动中头位保持', detail: '深蹲/弓步等动作中维持耳-肩对齐，3组×10次', equipment: '无' },
                    { name: '负重过头保持', detail: '水瓶过头维持颈中立行走，3组×30s', equipment: '水瓶' },
                  ]},
                  { category: '本体感觉', note: '8 min', moves: [
                    { name: '闭眼单腿+头位校准', detail: '闭眼单腿站立维持中立头位，3组×20s', equipment: '无' },
                    { name: '快慢节奏点头', detail: '深颈屈肌快慢交替募集，3组×12次', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：压力维持（周二/四）', totalMins: 15, blocks: [
                  { category: '抗疲劳维持', note: '8 min', moves: [
                    { name: '长时间头位耐力保持', detail: '中立头位静态保持配合呼吸，3组×60s', equipment: '无' },
                    { name: '分心任务下保持', detail: '边读文字边维持头位，3组×60s', equipment: '无' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '晨起激活套路', detail: '将缩下巴+延伸固化为晨间1分钟习惯', equipment: '无' },
                    { name: '环境改造复盘', detail: '复核屏幕/枕头/座椅是否长期到位', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: 'A训练：稳定深化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '动态头位控制', note: '7 min', moves: [
                    { name: '负重深蹲头位保持', detail: '持水瓶深蹲全程维持耳肩对齐，3组×12次', equipment: '水瓶' },
                    { name: '过头弓步行走', detail: '水瓶过头做弓步行走维持中立，3组×10步', equipment: '水瓶' },
                  ]},
                  { category: '本体感觉', note: '8 min', moves: [
                    { name: '闭眼单腿+转头校准', detail: '闭眼单腿站立缓慢转头回正，3组×20s', equipment: '无' },
                    { name: '节奏点头加长保持', detail: '快慢交替末端保持5s，3组×12次', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：压力维持（周二/四）', totalMins: 15, blocks: [
                  { category: '抗疲劳维持', note: '8 min', moves: [
                    { name: '头位耐力延长保持', detail: '静态保持延长至90s，3组', equipment: '无' },
                    { name: '双任务下头位保持', detail: '边算数边维持头位增加干扰，3组×60s', equipment: '无' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '晨起套路熟练化', detail: '缩下巴+延伸套路提速至45秒完成', equipment: '无' },
                    { name: '工作间隙微练习', detail: '设定提醒每2小时做1次微激活', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: 'A训练：挑战进阶（周一/三/五）', totalMins: 15, blocks: [
                  { category: '动态头位控制', note: '7 min', moves: [
                    { name: '不稳面深蹲头位', detail: '软垫上深蹲维持耳肩对齐，3组×10次', equipment: '软垫' },
                    { name: '单臂过头行走', detail: '单臂壶铃过头行走维持中立，3组×20s/侧', equipment: '壶铃' },
                  ]},
                  { category: '本体感觉', note: '8 min', moves: [
                    { name: '闭眼软垫单腿头位', detail: '软垫上闭眼单腿维持中立头位，3组×20s', equipment: '软垫' },
                    { name: '快速反应点头', detail: '听口令快速切换点头方向，3组×12次', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：压力维持（周二/四）', totalMins: 15, blocks: [
                  { category: '抗疲劳维持', note: '8 min', moves: [
                    { name: '负重头位耐力保持', detail: '头顶书本静态保持90s，3组', equipment: '书本' },
                    { name: '走动中分心保持', detail: '边走边读边维持头位模拟实景，3组×60s', equipment: '无' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '场景化提醒设置', detail: '在通勤/会议等场景设头位自检触发点', equipment: '无' },
                    { name: '睡姿与枕具复检', detail: '复核侧卧仰卧枕高与颈曲支撑', equipment: '颈椎枕' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: 'A训练：自动固化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '动态头位控制', note: '7 min', moves: [
                    { name: '复合动作头位串联', detail: '深蹲-弓步-过头连续完成维持中立，3轮', equipment: '水瓶' },
                    { name: '无提示头位自检', detail: '随机暂停自查头位是否自动中立，3组×10次', equipment: '无' },
                  ]},
                  { category: '本体感觉+评估', note: '8 min', moves: [
                    { name: '闭眼综合头位校准', detail: '多方向偏离后闭眼回正综合测评，3组×10次', equipment: '无' },
                    { name: '头位耐力终测', detail: '记录静态保持耐力对比全程进步', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：长期固化（周二/四）', totalMins: 15, blocks: [
                  { category: '自动化整合', note: '9 min', moves: [
                    { name: '日常动作中头位习惯', detail: '刷牙/打字/驾驶中刻意维持中立成习惯', equipment: '无' },
                    { name: '过头农夫行走', detail: '水瓶过头长距离行走巩固耐力，3组×40s', equipment: '水瓶' },
                  ]},
                  { category: '维持策略', note: '6 min', moves: [
                    { name: '长期计划制定', detail: '制定每周2次维持训练的长期方案', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
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
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '动态控制', note: '5 min', moves: [
                    { name: '站姿延伸+缩下巴组合', detail: '站立完成延伸接内收提高难度，3组×10次', equipment: '无' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '本体感觉', note: '5 min', moves: [
                    { name: '闭眼转头复位', detail: '闭眼转头至中段回正校准，3组×8次', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '维持策略', note: '5 min', moves: [
                    { name: '头位耐力延长保持', detail: '静态保持延长至75s×3', equipment: '无' },
                    { name: '久坐提醒落实', detail: '复核每60分钟起身回收习惯', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '动态控制', note: '5 min', moves: [
                    { name: '单腿站延伸+缩下巴', detail: '单腿支撑下完成组合增加挑战，3组×8次', equipment: '无' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '本体感觉', note: '5 min', moves: [
                    { name: '双任务头位复位', detail: '边记事边闭眼复位增加干扰，3组×8次', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '维持策略', note: '5 min', moves: [
                    { name: '走动中头位保持', detail: '走廊行走维持中立头位60s×3', equipment: '无' },
                    { name: '场景提醒设置', detail: '会议/通话场景设头位自检触发', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '自动化控制', note: '5 min', moves: [
                    { name: '无提示头位自检', detail: '随机暂停自查头位自动中立，3组×8次', equipment: '无' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '本体感觉+评估', note: '5 min', moves: [
                    { name: '闭眼综合复位测评', detail: '多方向偏离闭眼回正记录精准度，3组×8次', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '长期策略', note: '5 min', moves: [
                    { name: '头位耐力终测', detail: '静态保持耐力计时对比全程', equipment: '无' },
                    { name: '长期维持计划复盘', detail: '确认工位与训练习惯长期落地', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
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
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '动态颈胸联动热身加旋转', detail: '多向活动加胸椎旋转，2组×10次', equipment: '无' },
                  ]},
                  { category: '功能力量', note: '15 min', moves: [
                    { name: '过头农夫行走增距', detail: '过头负重行走加长至30m，4组', equipment: '壶铃' },
                    { name: '面拉+外旋增重', detail: '加重绳索面拉接外旋，4组×12次', equipment: '绳索器械' },
                  ]},
                  { category: '稳定整合', note: '8 min', moves: [
                    { name: 'BOSU头位+移臂', detail: '不稳面站立维持头位同时缓移手臂，3组×30s', equipment: 'BOSU球' },
                  ]},
                  { category: '整合放松', note: '2 min', moves: [
                    { name: '轴向延伸呼吸收尾', detail: '延长脊柱深呼吸整合', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '动态颈胸联动热身', detail: '多向活动唤醒配合呼吸，2组×10次', equipment: '无' },
                  ]},
                  { category: '功能力量', note: '15 min', moves: [
                    { name: '不稳面过头保持', detail: 'BOSU上单臂过头负重维持头位，4组×20s/侧', equipment: 'BOSU球' },
                    { name: '单臂面拉+外旋', detail: '单臂绳索面拉接外旋强化单侧，4组×10次/侧', equipment: '绳索器械' },
                  ]},
                  { category: '稳定整合', note: '8 min', moves: [
                    { name: '闭眼BOSU头位保持', detail: '不稳面闭眼维持中立头位，3组×20s', equipment: 'BOSU球' },
                  ]},
                  { category: '整合放松', note: '2 min', moves: [
                    { name: '轴向延伸呼吸收尾', detail: '延长脊柱深呼吸整合', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '4 min', moves: [
                    { name: '动态全身联动热身', detail: '颈胸髋多关节联动唤醒，2组×10次', equipment: '无' },
                  ]},
                  { category: '复合功能整合', note: '16 min', moves: [
                    { name: '过头农夫行走+转向', detail: '过头负重行走加变向维持头位，4组×30m', equipment: '壶铃' },
                    { name: '面拉外旋+深蹲复合', detail: '面拉外旋接深蹲串联整合全身，4组×10次', equipment: '绳索器械' },
                  ]},
                  { category: '稳定整合+评估', note: '8 min', moves: [
                    { name: 'BOSU头位终测', detail: '不稳面维持时间计时对比成效期', equipment: 'BOSU球' },
                    { name: '面拉力量终测', detail: '记录面拉负重确认全程进步', equipment: '绳索器械' },
                  ]},
                  { category: '整合放松', note: '2 min', moves: [
                    { name: '轴向延伸呼吸收尾', detail: '延长脊柱深呼吸整合放松', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          }
        }
      }
    ]
  },
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
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '6 min', moves: [
                    { name: '胸小肌泡沫轴/球松解', detail: '俯卧将球置喙突下方找痛点缓压，2min/侧', equipment: '筋膜球' },
                    { name: '门框胸大肌牵伸', detail: '前臂贴门框，上中下三角度各30s', equipment: '门框' },
                  ]},
                  { category: '神经激活', note: '7 min', moves: [
                    { name: '俯卧菱形肌激活', detail: '俯卧夹肩胛后缩下沉，保持5s，2组×8次', equipment: '无' },
                    { name: '肩胛骨四象限意识训练', detail: '坐姿做上提/下沉/前伸/后缩，慢速感受，2组×8次', equipment: '无' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '鼠标贴近身体', detail: '避免手臂长时间前伸，肘靠近躯干', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：感知整合（周二/四）', totalMins: 15, blocks: [
                  { category: '呼吸+松解', note: '7 min', moves: [
                    { name: '上斜方肌牵伸', detail: '侧屈头并沉肩，30s/侧×2', equipment: '无' },
                    { name: '侧卧开书式', detail: '侧卧旋开上臂打开胸廓，2组×6次/侧', equipment: '无' },
                  ]},
                  { category: '感觉重建', note: '8 min', moves: [
                    { name: '镜前肩胛对称校准', detail: '对镜调整两侧肩峰等高，保持10s×6次', equipment: '镜子' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: 'A训练：深层松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '7 min', moves: [
                    { name: '胸小肌持续缓压松解', detail: '喙突下找痛点缓压加微动手臂，2.5min/侧', equipment: '筋膜球' },
                    { name: '门框三角度胸肌牵伸', detail: '前臂贴门框上中下各角度各40s', equipment: '门框' },
                  ]},
                  { category: '神经激活', note: '8 min', moves: [
                    { name: '俯卧菱形肌激活', detail: '俯卧夹肩胛后缩下沉，保持8s，3组×10次', equipment: '无' },
                    { name: '俯卧T字后缩', detail: '上臂外展90°做T位后缩下沉，3组×10次', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：感知深化（周二/四）', totalMins: 15, blocks: [
                  { category: '活动度', note: '7 min', moves: [
                    { name: '侧卧开书式加保持', detail: '旋开末端保持5s再回，3组×8次/侧', equipment: '无' },
                    { name: '靠墙肩胛下沉', detail: '背贴墙主动下沉肩胛远离耳朵，3组×10次', equipment: '墙' },
                  ]},
                  { category: '感觉重建', note: '8 min', moves: [
                    { name: '镜前肩胛对称保持', detail: '对镜调两侧肩峰等高，保持15s×8次', equipment: '镜子' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: 'A训练：控制激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '松解', note: '5 min', moves: [
                    { name: '胸小肌快速松解', detail: '喙突下缓压90s/侧后即进入激活', equipment: '筋膜球' },
                  ]},
                  { category: '神经控制', note: '10 min', moves: [
                    { name: '俯卧Y字激活', detail: '上臂120°举至Y位下斜方发力，3组×12次', equipment: '无' },
                    { name: '靠墙天使滑动', detail: '上背贴墙手臂沿墙上下滑全程贴墙，3组×10次', equipment: '墙' },
                  ]},
                ]},
                { title: 'B训练：单侧控制（周二/四）', totalMins: 15, blocks: [
                  { category: '不对称矫正', note: '8 min', moves: [
                    { name: '弱侧单臂后缩下沉', detail: '高位侧少做、低位侧多做1组，3+1组×10次', equipment: '无' },
                  ]},
                  { category: '感知控制', note: '7 min', moves: [
                    { name: '镜前慢速肩胛后缩', detail: '3s收3s放控制离心，3组×8次', equipment: '镜子' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: 'A训练：整合（周一/三/五）', totalMins: 15, blocks: [
                  { category: '松解+激活串联', note: '7 min', moves: [
                    { name: '开肩-夹肩串联', detail: '门框牵伸接俯卧后缩连续做，3组×10次', equipment: '门框' },
                  ]},
                  { category: '组合控制', note: '8 min', moves: [
                    { name: '俯卧YTW组合', detail: 'Y-T-W连续完成为一组，3组×各8次', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：评估整合（周二/四）', totalMins: 15, blocks: [
                  { category: '日常模式', note: '8 min', moves: [
                    { name: '站姿肩胛中立保持', detail: '边日常活动边维持夹肩沉肩，3组×30s', equipment: '无' },
                  ]},
                  { category: '自评', note: '7 min', moves: [
                    { name: '镜前对称自评', detail: '记录双肩峰高度差与圆肩程度对比首周', equipment: '镜子' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
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
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '坐姿W字夹肩', detail: '肘后拉夹肩下沉，保持8s，3组×10次', equipment: '无' },
                  ]},
                ]},
                { title: '午间松解（午休）', totalMins: 5, blocks: [
                  { category: '松解', note: '5 min', moves: [
                    { name: '门框三角度胸肌牵伸', detail: '上中下三角度各40s/侧', equipment: '门框' },
                  ]},
                ]},
                { title: '傍晚复核（下班前）', totalMins: 5, blocks: [
                  { category: '习惯', note: '5 min', moves: [
                    { name: '工位对称复核', detail: '调整鼠标位置与屏幕居中避免单侧前伸', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '控制', note: '5 min', moves: [
                    { name: '坐姿慢速后缩', detail: '3s收3s放控制离心，3组×10次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间松解（午休）', totalMins: 5, blocks: [
                  { category: '不对称', note: '5 min', moves: [
                    { name: '弱侧单臂后缩', detail: '低位侧多做1组，3+1组×10次', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '坐姿Y字举', detail: 'Y位上举激活下斜方，3组×10次', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '坐姿肩胛中立保持', detail: '工作中维持夹肩沉肩，3组×30s', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间松解（午休）', totalMins: 5, blocks: [
                  { category: '松解+激活', note: '5 min', moves: [
                    { name: '开肩接夹肩串联', detail: '门框牵伸接W夹肩连续，3组×10次', equipment: '门框' },
                  ]},
                ]},
                { title: '傍晚自评（下班前）', totalMins: 5, blocks: [
                  { category: '自评', note: '5 min', moves: [
                    { name: '镜前对称自评', detail: '记录双肩峰高度差变化', equipment: '镜子' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+筋膜松解', note: '8 min', moves: [
                    { name: '胸椎泡沫轴滚压', detail: '上背沿轴滚动并被动后伸，3min', equipment: '泡沫轴' },
                    { name: '胸小肌花生球松解', detail: '喙突下找痛点缓压，30s/侧×2', equipment: '花生球' },
                  ]},
                  { category: '神经肌肉激活', note: '12 min', moves: [
                    { name: '俯卧YTW（徒手）', detail: '徒手做Y-T-W学习发力，3组×10次', equipment: '无' },
                    { name: '前锯肌推墙plus', detail: '推末端肩胛前伸上回旋，3组×12次', equipment: '墙/瑜伽垫' },
                  ]},
                  { category: '整合', note: '10 min', moves: [
                    { name: '站姿肩胛中立呼吸', detail: '肩带中立配合呼吸感受位置，3组×8次', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+松解', note: '6 min', moves: [
                    { name: '胸椎泡沫轴+胸小肌松解', detail: '滚压加喙突下缓压，5min', equipment: '泡沫轴' },
                  ]},
                  { category: '激活', note: '12 min', moves: [
                    { name: '俯卧YTW（小重量）', detail: '加小哑铃做Y-T-W，3组×10次', equipment: '哑铃' },
                    { name: '前锯肌推墙plus加保持', detail: '前伸末端保持3s，3组×12次', equipment: '墙' },
                  ]},
                  { category: '强化', note: '12 min', moves: [
                    { name: '弹力带肩外旋', detail: '肘贴体侧外旋，3组×12次/侧', equipment: '弹力带' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '动态肩袖绕环', detail: '弹力带多向激活肩袖，2组×12次', equipment: '弹力带' },
                  ]},
                  { category: '控制强化', note: '15 min', moves: [
                    { name: '俯身反向飞鸟', detail: '小重量后束飞鸟控制离心，3组×12次', equipment: '哑铃' },
                    { name: '弹力带面拉', detail: '拉至面前外旋夹肩，3组×12次', equipment: '弹力带' },
                  ]},
                  { category: '单侧矫正', note: '10 min', moves: [
                    { name: '单臂俯身飞鸟', detail: '弱侧多做1组维持对称，3+1组×10次', equipment: '哑铃' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '4 min', moves: [
                    { name: '胸椎+肩袖动态热身', detail: '旋转加绕环唤醒，2组×10次', equipment: '弹力带' },
                  ]},
                  { category: '组合整合', note: '18 min', moves: [
                    { name: 'YTW组合连贯', detail: 'Y-T-W一组连续完成，3组×各8次', equipment: '哑铃' },
                    { name: '面拉接外旋', detail: '面拉末端加外旋整合，3组×12次', equipment: '弹力带' },
                  ]},
                  { category: '评估收尾', note: '8 min', moves: [
                    { name: '站姿肩胛中立呼吸', detail: '中立位呼吸并自评活动度，3组×30s', equipment: '无' },
                  ]},
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
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
                { title: 'A训练：抗阻强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '肩外旋强化', note: '7 min', moves: [
                    { name: '弹力带面拉', detail: '带固定于门，拉至面前外旋夹肩，3组×12次', equipment: '弹力带' },
                    { name: '弹力带W形夹肩', detail: '双臂W位后拉激活下斜方，3组×12次', equipment: '弹力带' },
                  ]},
                  { category: '前锯肌强化', note: '8 min', moves: [
                    { name: '推墙变式（前伸加压）', detail: '推墙末端额外前伸肩胛，3组×15次', equipment: '墙' },
                  ]},
                ]},
                { title: 'B训练：动作整合（周二/四）', totalMins: 15, blocks: [
                  { category: '活动度', note: '6 min', moves: [
                    { name: '靠墙天使滑动', detail: '上背贴墙手臂沿墙上下滑，3组×10次', equipment: '墙' },
                  ]},
                  { category: '稳定整合', note: '9 min', moves: [
                    { name: '俯撑加正（Plus）', detail: '平板支撑顶端肩胛前伸，3组×10次', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: 'A训练：递增抗阻（周一/三/五）', totalMins: 15, blocks: [
                  { category: '肩外旋强化', note: '7 min', moves: [
                    { name: '弹力带面拉（加阻）', detail: '换粗带或退步增阻，4组×12次', equipment: '弹力带' },
                    { name: '俯卧肩外旋', detail: '上臂外展90°做外旋，3组×12次', equipment: '无' },
                  ]},
                  { category: '前锯肌强化', note: '8 min', moves: [
                    { name: '负重推墙plus', detail: '背包加阻推墙前伸，3组×15次', equipment: '背包' },
                  ]},
                ]},
                { title: 'B训练：稳定递增（周二/四）', totalMins: 15, blocks: [
                  { category: '稳定整合', note: '9 min', moves: [
                    { name: '俯撑加正+提膝', detail: 'Plus基础上交替提膝，3组×10次', equipment: '瑜伽垫' },
                  ]},
                  { category: '不对称矫正', note: '6 min', moves: [
                    { name: '高低肩单侧后缩', detail: '弱侧多做1组单侧后缩下沉，3+1组×12次', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: 'A训练：进阶变式（周一/三/五）', totalMins: 15, blocks: [
                  { category: '外旋进阶', note: '7 min', moves: [
                    { name: '弹力带90/90外旋', detail: '上臂外展90°屈肘90°外旋，3组×12次', equipment: '弹力带' },
                  ]},
                  { category: '前锯肌进阶', note: '8 min', moves: [
                    { name: '熊式支撑肩胛前伸', detail: '四足离地维持前伸，3组×12次', equipment: '瑜伽垫' },
                  ]},
                ]},
                { title: 'B训练：单侧控制（周二/四）', totalMins: 15, blocks: [
                  { category: '单侧稳定', note: '9 min', moves: [
                    { name: '单臂俯撑plus', detail: '单手支撑维持肩胛稳定，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '活动度进阶', note: '6 min', moves: [
                    { name: '靠墙天使慢速离心', detail: '下滑3s控制，3组×10次', equipment: '墙' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: 'A训练：复合（周一/三/五）', totalMins: 15, blocks: [
                  { category: '复合动作', note: '8 min', moves: [
                    { name: '深蹲接面拉', detail: '深蹲起身接弹力带面拉整合，3组×12次', equipment: '弹力带' },
                  ]},
                  { category: '前锯整合', note: '7 min', moves: [
                    { name: '推墙plus接前伸举', detail: '推墙前伸后上举维持上回旋，3组×10次', equipment: '墙' },
                  ]},
                ]},
                { title: 'B训练：模式整合（周二/四）', totalMins: 15, blocks: [
                  { category: '稳定整合', note: '9 min', moves: [
                    { name: '俯撑plus行走', detail: '平板顶端交替前移手维持稳定，3组×8步', equipment: '瑜伽垫' },
                  ]},
                  { category: '自评', note: '6 min', moves: [
                    { name: '镜前对称复核', detail: '对比阶段初双肩对称度，3组×30s', equipment: '镜子' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
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
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '弹力带坐姿外旋（加阻）', detail: '换粗带做外旋，4组×12次', equipment: '弹力带' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '弹力带坐姿面拉', detail: '绕柱拉至面前外旋，3组×12次', equipment: '弹力带' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '稳定', note: '5 min', moves: [
                    { name: '靠墙天使滑动', detail: '上背贴墙手臂滑动，3组×10次', equipment: '墙' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '进阶', note: '5 min', moves: [
                    { name: '弹力带90/90外旋', detail: '坐姿上臂外展90°外旋，3组×12次', equipment: '弹力带' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '单侧', note: '5 min', moves: [
                    { name: '单臂坐姿面拉', detail: '弱侧多做1组，3+1组×10次', equipment: '弹力带' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '稳定', note: '5 min', moves: [
                    { name: '靠墙天使慢速离心', detail: '下滑3s控制，3组×10次', equipment: '墙' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '复合', note: '5 min', moves: [
                    { name: '坐站接面拉', detail: '起立接面拉整合下肢与肩，3组×12次', equipment: '弹力带' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: 'W夹肩接外旋', detail: 'W后拉末端外旋串联，3组×12次', equipment: '弹力带' },
                  ]},
                ]},
                { title: '傍晚自评（下班前）', totalMins: 5, blocks: [
                  { category: '自评', note: '5 min', moves: [
                    { name: '镜前对称复核', detail: '记录双肩对称度变化', equipment: '镜子' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
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
                  ]},
                  { category: '整合', note: '2 min', moves: [
                    { name: '肩带中立呼吸收尾', detail: '中立位深呼吸整合', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '肩袖动态激活', detail: '弹力带多向激活，2组×12次', equipment: '弹力带' },
                  ]},
                  { category: '激活', note: '5 min', moves: [
                    { name: '前锯肌推举加阻', detail: '加重哑铃顶端前伸，3组×12次', equipment: '哑铃' },
                  ]},
                  { category: '力量递增', note: '18 min', moves: [
                    { name: '绳索面拉（加重）', detail: '增加配重，4组×10次', equipment: '绳索器械' },
                    { name: '俯身反向飞鸟（加重）', detail: '渐增哑铃控制离心，4组×10次', equipment: '哑铃' },
                    { name: '弹力带肩外旋（90/90）', detail: '上臂外展90°外旋，3组×12次', equipment: '弹力带' },
                  ]},
                  { category: '整合', note: '2 min', moves: [
                    { name: '肩带中立呼吸收尾', detail: '中立位深呼吸整合', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '胸椎旋转+肩袖', detail: '动态唤醒胸椎活动度，2组×12次', equipment: '弹力带' },
                  ]},
                  { category: '进阶激活', note: '7 min', moves: [
                    { name: '熊式支撑肩胛前伸', detail: '四足离地维持前伸，3组×12次', equipment: '瑜伽垫' },
                  ]},
                  { category: '进阶力量', note: '16 min', moves: [
                    { name: '单臂绳索面拉', detail: '单侧面拉强调旋转控制，4组×10次/侧', equipment: '绳索器械' },
                    { name: '俯身单臂飞鸟', detail: '弱侧多做1组，3+1组×10次', equipment: '哑铃' },
                  ]},
                  { category: '整合', note: '2 min', moves: [
                    { name: '肩带中立呼吸收尾', detail: '中立位深呼吸整合', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '4 min', moves: [
                    { name: '全身动态热身', detail: '胸椎+肩袖+髋联动，2组×10次', equipment: '弹力带' },
                  ]},
                  { category: '复合力量', note: '20 min', moves: [
                    { name: '硬拉接面拉', detail: '硬拉收尾接面拉整合后链，4组×10次', equipment: '杠铃' },
                    { name: '俯身飞鸟+外旋', detail: '飞鸟末端加外旋整合，4组×10次', equipment: '哑铃' },
                  ]},
                  { category: '评估收尾', note: '6 min', moves: [
                    { name: '肩带中立呼吸自评', detail: '中立呼吸并评估对称与力量', equipment: '无' },
                  ]},
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
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
                { title: 'A训练：功能整合（周一/三/五）', totalMins: 15, blocks: [
                  { category: '过头稳定', note: '8 min', moves: [
                    { name: '过头推举稳定（水瓶）', detail: '推举全程维持肩胛上回旋，3组×12次', equipment: '水瓶' },
                  ]},
                  { category: '功能控制', note: '7 min', moves: [
                    { name: '功能性肩胛控制', detail: '推/拉/举多方向维持节律，3组×10次', equipment: '弹力带' },
                  ]},
                ]},
                { title: 'B训练：日常整合（周二/四）', totalMins: 15, blocks: [
                  { category: '日常动作整合', note: '8 min', moves: [
                    { name: '提物模式训练', detail: '模拟提袋保持肩下沉后缩，3组×10次', equipment: '购物袋' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '晨间开肩套路', detail: '门框牵伸+夹肩固化为晨间习惯', equipment: '门框' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: 'A训练：稳定深化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '过头稳定', note: '8 min', moves: [
                    { name: '土耳其起立分解', detail: '分解练习中保持肩稳定，3组×5次/侧', equipment: '无' },
                  ]},
                  { category: '功能控制', note: '7 min', moves: [
                    { name: '弹力带过头推稳定', detail: '推举维持上回旋慢速控制，3组×12次', equipment: '弹力带' },
                  ]},
                ]},
                { title: 'B训练：日常深化（周二/四）', totalMins: 15, blocks: [
                  { category: '日常整合', note: '8 min', moves: [
                    { name: '负重提物模式', detail: '加重提袋维持肩下沉，3组×10次', equipment: '购物袋' },
                  ]},
                  { category: '对称维持', note: '7 min', moves: [
                    { name: '镜前对称保持', detail: '镜前确认双肩等高维持，3组×40s', equipment: '镜子' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: 'A训练：挑战进阶（周一/三/五）', totalMins: 15, blocks: [
                  { category: '不稳定面', note: '8 min', moves: [
                    { name: '单腿站过头推', detail: '单腿支撑过头推增本体挑战，3组×10次', equipment: '水瓶' },
                  ]},
                  { category: '动态控制', note: '7 min', moves: [
                    { name: '行进间肩胛控制', detail: '走动中推拉维持节律，3组×10次', equipment: '弹力带' },
                  ]},
                ]},
                { title: 'B训练：负载挑战（周二/四）', totalMins: 15, blocks: [
                  { category: '单侧负载', note: '8 min', moves: [
                    { name: '单臂农夫提走', detail: '单侧负重抗侧倾维持水平，3组×20步', equipment: '购物袋' },
                  ]},
                  { category: '对称维持', note: '7 min', moves: [
                    { name: '闭眼肩位本体感', detail: '闭眼维持中立再睁眼校验，3组×8次', equipment: '镜子' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: 'A训练：自动固化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '自动化整合', note: '8 min', moves: [
                    { name: '日常多模式串联', detail: '推拉举提连贯无提示完成，3组×8次', equipment: '弹力带' },
                  ]},
                  { category: '习惯固化', note: '7 min', moves: [
                    { name: '微习惯触发训练', detail: '设环境触发点自动夹肩沉肩，全天执行', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：评估收尾（周二/四）', totalMins: 15, blocks: [
                  { category: '功能评估', note: '8 min', moves: [
                    { name: '过头举活动度自测', detail: '靠墙举臂记录贴墙程度', equipment: '墙' },
                  ]},
                  { category: '长期策略', note: '7 min', moves: [
                    { name: '维持计划制定', detail: '镜前确认对称并定每周维持清单', equipment: '镜子' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
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
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '弹力带过头推慢速', detail: '坐姿推举3s控制离心，3组×10次', equipment: '弹力带' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '对称控制', note: '5 min', moves: [
                    { name: '镜前对称保持', detail: '双肩等高保持40s，3组', equipment: '镜子' },
                  ]},
                ]},
                { title: '傍晚维持（下班前）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '门框开肩牵伸', detail: '收尾拉伸胸肌30s/侧', equipment: '门框' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '挑战', note: '5 min', moves: [
                    { name: '单腿坐站过头推', detail: '增本体挑战的过头推，3组×10次', equipment: '弹力带' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '本体感', note: '5 min', moves: [
                    { name: '闭眼肩位校验', detail: '闭眼维持中立再睁眼对镜，3组×8次', equipment: '镜子' },
                  ]},
                ]},
                { title: '傍晚维持（下班前）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '门框开肩牵伸', detail: '收尾拉伸胸肌40s/侧', equipment: '门框' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '自动化', note: '5 min', moves: [
                    { name: '无提示肩胛中立', detail: '工作中自动维持夹肩沉肩，全天', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间复盘（午休）', totalMins: 5, blocks: [
                  { category: '自评', note: '5 min', moves: [
                    { name: '镜前对称自测', detail: '记录全程对称改善', equipment: '镜子' },
                  ]},
                ]},
                { title: '傍晚维持（下班前）', totalMins: 5, blocks: [
                  { category: '长期策略', note: '5 min', moves: [
                    { name: '维持清单复核', detail: '门框牵伸收尾并核对每周清单', equipment: '门框' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '动态肩袖热身', detail: '弹力带多向激活肩袖，2组×12次', equipment: '弹力带' },
                  ]},
                  { category: '功能力量', note: '15 min', moves: [
                    { name: '过头推举', detail: '哑铃过头推维持肩胛节律，4组×10次', equipment: '哑铃' },
                    { name: '单臂农夫行走', detail: '抗侧倾维持双肩水平，4组×20m', equipment: '壶铃' },
                  ]},
                  { category: '稳定整合', note: '10 min', moves: [
                    { name: 'TRX划船+外旋', detail: '划船末端外旋夹肩，3组×12次', equipment: 'TRX' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '动态肩袖热身', detail: '弹力带多向激活，2组×12次', equipment: '弹力带' },
                  ]},
                  { category: '功能力量', note: '15 min', moves: [
                    { name: '过头推举（加重）', detail: '渐增哑铃维持节律，4组×8次', equipment: '哑铃' },
                    { name: '土耳其起立', detail: '完整起立维持肩稳定，3组×4次/侧', equipment: '壶铃' },
                  ]},
                  { category: '稳定整合', note: '10 min', moves: [
                    { name: 'TRX划船+外旋慢速', detail: '末端外旋保持2s，3组×12次', equipment: 'TRX' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '动态肩袖+核心', detail: '激活肩袖与抗旋核心，2组×12次', equipment: '弹力带' },
                  ]},
                  { category: '不稳定挑战', note: '16 min', moves: [
                    { name: '单臂过头推', detail: '单侧推举抗旋维持稳定，4组×8次/侧', equipment: '哑铃' },
                    { name: '半跪推举', detail: '半跪位过头推增本体挑战，3组×10次', equipment: '哑铃' },
                  ]},
                  { category: '稳定整合', note: '9 min', moves: [
                    { name: 'TRX单臂划船', detail: '单侧划船抗旋外旋，3组×10次/侧', equipment: 'TRX' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '4 min', moves: [
                    { name: '全身动态热身', detail: '肩袖+核心+髋联动，2组×10次', equipment: '弹力带' },
                  ]},
                  { category: '复合自动化', note: '18 min', moves: [
                    { name: '推举接划船循环', detail: '过头推接TRX划船无停顿循环，4组×8次', equipment: '哑铃' },
                    { name: '农夫行走绕障', detail: '负重行走转向维持双肩水平，4组×30m', equipment: '壶铃' },
                  ]},
                  { category: '评估收尾', note: '8 min', moves: [
                    { name: '肩带中立呼吸自评', detail: '中立呼吸并评估整体进步制定维持计划', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          }
        }
      }
    ]
  },
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
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '6 min', moves: [
                    { name: '髂腰肌弓步拉伸', detail: '后腿跪地骨盆后倾前推，30s/侧×2', equipment: '瑜伽垫' },
                    { name: '股四头肌泡沫轴松解', detail: '大腿前侧沿轴缓滚找痛点轻停，2min/侧', equipment: '泡沫轴' },
                  ]},
                  { category: '神经激活', note: '7 min', moves: [
                    { name: '蚌式臀中肌激活', detail: '侧卧屈膝外旋开合体会臀侧发力，2组×12次/侧', equipment: '瑜伽垫' },
                    { name: '臀桥激活', detail: '仰卧勾脚顶髋夹臀，顶端停2s，2组×10次', equipment: '瑜伽垫' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '避免长期跷二郎腿', detail: '双脚平放均衡承重，减少骨盆旋转', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：呼吸+感知（周二/四）', totalMins: 15, blocks: [
                  { category: '呼吸再训练', note: '7 min', moves: [
                    { name: '腹式呼吸+骨盆中立', detail: '仰卧屈膝呼气找腰部贴地感知中立，5min', equipment: '瑜伽垫' },
                  ]},
                  { category: '感觉重建', note: '8 min', moves: [
                    { name: '骨盆时钟训练', detail: '仰卧将骨盆想象为钟面前后左右倾感知边界，2组×6圈', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '6 min', moves: [
                    { name: '髂腰肌弓步拉伸', detail: '后腿跪地骨盆后倾前推加深角度，40s/侧×2', equipment: '瑜伽垫' },
                    { name: '股四头肌泡沫轴松解', detail: '大腿前侧沿轴滚压痛点处停留下压，2.5min/侧', equipment: '泡沫轴' },
                  ]},
                  { category: '神经激活', note: '7 min', moves: [
                    { name: '蚌式臀中肌激活', detail: '侧卧屈膝外旋开合增至，3组×15次/侧', equipment: '瑜伽垫' },
                    { name: '臀桥激活', detail: '仰卧顶髋夹臀，顶端停3s，3组×12次', equipment: '瑜伽垫' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '骨盆后倾微提示', detail: '久坐时偶尔轻微收尾骨，避免塌腰前倾', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：呼吸+感知（周二/四）', totalMins: 15, blocks: [
                  { category: '呼吸再训练', note: '7 min', moves: [
                    { name: '腹式呼吸+骨盆中立', detail: '仰卧呼气延长至贴地稳定，延长呼气节奏，6min', equipment: '瑜伽垫' },
                  ]},
                  { category: '感觉重建', note: '8 min', moves: [
                    { name: '骨盆时钟训练', detail: '仰卧钟面绕圈更圆滑控制，3组×8圈', equipment: '瑜伽垫' },
                    { name: '镜前骨盆中立校准', detail: '侧对镜调整髂前上棘与耻骨同平面，8s×6次', equipment: '镜子' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '5 min', moves: [
                    { name: '髂腰肌动态弓步拉伸', detail: '弓步配合骨盆后倾节律拉伸，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '神经激活', note: '7 min', moves: [
                    { name: '弹力带蚌式', detail: '膝套弹力带侧卧外旋开合加阻力，3组×15次/侧', equipment: '弹力带' },
                    { name: '单腿臀桥', detail: '单腿顶髋保持骨盆水平，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '核心控制', note: '3 min', moves: [
                    { name: '死虫式', detail: '仰卧对侧手脚伸展维持腰贴地，3组×8次', equipment: '瑜伽垫' },
                  ]},
                ]},
                { title: 'B训练：呼吸+感知（周二/四）', totalMins: 15, blocks: [
                  { category: '感觉重建', note: '8 min', moves: [
                    { name: '骨盆时钟控制训练', detail: '钟面定点停留控制单方向倾度，3组×8点', equipment: '瑜伽垫' },
                  ]},
                  { category: '抗旋控制', note: '7 min', moves: [
                    { name: '鸟狗式', detail: '四足对侧手脚伸展抗旋，3组×10次/侧', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '4 min', moves: [
                    { name: '髂腰肌动态牵伸', detail: '弓步动态拉伸快速过渡热身，2组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '激活整合', note: '8 min', moves: [
                    { name: '弹力带臀桥', detail: '膝带阻力顶髋夹臀，3组×12次', equipment: '弹力带' },
                    { name: '死虫+鸟狗组合', detail: '交替完成两式串联维持骨盆中立，3组×8次', equipment: '瑜伽垫' },
                  ]},
                  { category: '习惯固化', note: '3 min', moves: [
                    { name: '站姿骨盆中立呼吸', detail: '站立中立位深呼吸整合收尾', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：感知评估（周二/四）', totalMins: 15, blocks: [
                  { category: '感知评估', note: '8 min', moves: [
                    { name: '镜前骨盆中立校准', detail: '闭眼找中立后睁眼镜验证准确度，10s×8次', equipment: '镜子' },
                  ]},
                  { category: '整合', note: '7 min', moves: [
                    { name: '骨盆时钟全圈整合', detail: '流畅完成钟面顺逆时针整合，3组×8圈', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '坐姿骨盆前后倾', detail: '坐姿做骨盆前后摆找中立感知，2组×10次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间松解（午休）', totalMins: 5, blocks: [
                  { category: '松解', note: '5 min', moves: [
                    { name: '站姿髂腰肌牵伸', detail: '弓步前推髋拉伸，30s/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚提示（下班前）', totalMins: 5, blocks: [
                  { category: '习惯', note: '5 min', moves: [
                    { name: '双脚均衡站立提示', detail: '避免单腿吃重，纠正侧倾', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '坐姿骨盆前后倾', detail: '坐姿前后摆放慢控制中立，3组×10次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间松解（午休）', totalMins: 5, blocks: [
                  { category: '松解', note: '5 min', moves: [
                    { name: '站姿髂腰肌牵伸', detail: '弓步前推加深拉伸幅度，40s/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚激活（下班前）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '站姿后踢臀激活', detail: '扶椅做髋后伸夹臀，3组×12次/侧', equipment: '办公椅' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '站姿后踢臀激活', detail: '扶椅髋后伸夹臀顶端停留，3组×12次/侧', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间强化（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '靠墙静蹲+骨盆中立', detail: '靠墙半蹲维持骨盆中立，3组×30s', equipment: '墙' },
                  ]},
                ]},
                { title: '傍晚松解（下班前）', totalMins: 5, blocks: [
                  { category: '松解', note: '5 min', moves: [
                    { name: '站姿髂腰肌牵伸', detail: '弓步前推髋拉伸，40s/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '坐姿骨盆中立+后踢臀', detail: '坐姿找中立后站起做后踢臀串联，3组×10次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间强化（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '靠墙静蹲+骨盆中立', detail: '靠墙半蹲维持中立延长保持，3组×40s', equipment: '墙' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '习惯固化', note: '5 min', moves: [
                    { name: '双脚均衡站立固化', detail: '收尾自检双脚承重对称固化习惯', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+筋膜松解', note: '8 min', moves: [
                    { name: '髂腰肌+股四头松解', detail: '泡沫轴松解大腿前侧与屈髋肌，3min', equipment: '泡沫轴' },
                    { name: '90/90髋关节活动', detail: '坐地两腿90度切换打开髋，2min', equipment: '瑜伽垫' },
                  ]},
                  { category: '神经肌肉激活', note: '12 min', moves: [
                    { name: '弹力带蚌式', detail: '膝套带侧卧外旋开合，3组×15次/侧', equipment: '弹力带' },
                    { name: '弹力带臀桥', detail: '膝带阻力顶髋夹臀，3组×12次', equipment: '弹力带' },
                  ]},
                  { category: '基础控制', note: '8 min', moves: [
                    { name: '死虫式', detail: '仰卧对侧手脚伸展维持骨盆中立，3组×10次', equipment: '瑜伽垫' },
                    { name: '鸟狗式', detail: '四足对侧手脚伸展，3组×10次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '整合', note: '2 min', moves: [
                    { name: '站姿骨盆中立呼吸', detail: '中立位深呼吸整合收尾', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+筋膜松解', note: '7 min', moves: [
                    { name: '髂腰肌+股四头松解', detail: '泡沫轴松解大腿前侧痛点深压，3.5min', equipment: '泡沫轴' },
                    { name: '90/90髋关节活动', detail: '坐地90度切换并加躯干前倾加深，2min', equipment: '瑜伽垫' },
                  ]},
                  { category: '神经肌肉激活', note: '11 min', moves: [
                    { name: '弹力带蚌式', detail: '增强阻力侧卧外旋开合，3组×18次/侧', equipment: '弹力带' },
                    { name: '弹力带臀桥', detail: '膝带阻力顶髋夹臀停3s，3组×15次', equipment: '弹力带' },
                  ]},
                  { category: '核心控制', note: '10 min', moves: [
                    { name: '死虫进阶（慢节奏）', detail: '慢速伸展维持腰贴地，3组×12次', equipment: '瑜伽垫' },
                    { name: '鸟狗进阶（停顿）', detail: '伸展顶端停3s抗旋，3组×10次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '整合', note: '2 min', moves: [
                    { name: '站姿骨盆中立呼吸', detail: '中立位深呼吸整合收尾', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '6 min', moves: [
                    { name: '弹力带臀肌激活组', detail: '蚌式+怪兽走唤醒臀中肌，2组×15次', equipment: '弹力带' },
                  ]},
                  { category: '单侧力量', note: '14 min', moves: [
                    { name: '单腿臀桥', detail: '单腿顶髋保持骨盆水平，3组×10次/侧', equipment: '瑜伽垫' },
                    { name: '侧桥+髋外展', detail: '侧桥顶端上腿外展抗侧倾，3组×10次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '抗旋强化', note: '8 min', moves: [
                    { name: '死虫+负重', detail: '手持小重量对侧伸展抗旋，3组×10次', equipment: '哑铃' },
                  ]},
                  { category: '整合', note: '2 min', moves: [
                    { name: '站姿骨盆中立呼吸', detail: '中立位深呼吸整合收尾', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '动态热身', note: '6 min', moves: [
                    { name: '动态髋关节热身', detail: '弓步+髋绕环唤醒，2组×10次', equipment: '无' },
                  ]},
                  { category: '复合整合', note: '16 min', moves: [
                    { name: '弹力带臀桥+单腿过渡', detail: '双腿桥过渡至单腿桥串联，3组×10次', equipment: '弹力带' },
                    { name: '鸟狗+死虫复合循环', detail: '两式连续循环维持骨盆中立，3组×8次', equipment: '瑜伽垫' },
                  ]},
                  { category: '功能评估', note: '8 min', moves: [
                    { name: '单腿站立骨盆水平测试', detail: '单腿站立评估骨盆是否下沉，3组×30s/侧', equipment: '无' },
                  ]},
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
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
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
                  ]},
                  { category: '活动度', note: '7 min', moves: [
                    { name: '髂腰肌动态牵伸', detail: '弓步配合骨盆后倾动态拉伸，3组×8次/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: 'A训练：臀核强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '臀肌强化', note: '8 min', moves: [
                    { name: '单腿臀桥（停顿）', detail: '单腿顶髋顶端停2s保持水平，3组×12次/侧', equipment: '瑜伽垫' },
                    { name: '单腿罗马尼亚硬拉（负重）', detail: '手持水瓶髋铰链单腿下放，3组×12次/侧', equipment: '水瓶' },
                  ]},
                  { category: '核心抗旋', note: '7 min', moves: [
                    { name: '死虫进阶（加节奏）', detail: '慢速伸展维持腰贴地增次，3组×14次', equipment: '瑜伽垫' },
                  ]},
                ]},
                { title: 'B训练：对称矫正（周二/四）', totalMins: 15, blocks: [
                  { category: '侧链强化', note: '8 min', moves: [
                    { name: '侧桥+髋外展', detail: '侧桥外展增至，弱侧多1组，3组×12次/侧', equipment: '瑜伽垫' },
                    { name: '怪兽走（弹力带侧走）', detail: '膝套带屈髋侧向行走，3组×12步', equipment: '弹力带' },
                  ]},
                  { category: '活动度', note: '7 min', moves: [
                    { name: '髂腰肌动态牵伸', detail: '弓步动态拉伸加大幅度，3组×10次/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: 'A训练：臀核强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '臀肌强化', note: '8 min', moves: [
                    { name: '单腿臀桥（脚抬高）', detail: '支撑脚置椅上单腿桥增大行程，3组×10次/侧', equipment: '椅子' },
                    { name: '单腿罗马尼亚硬拉（哑铃）', detail: '哑铃负重单腿下放控制骨盆，3组×10次/侧', equipment: '哑铃' },
                  ]},
                  { category: '核心抗旋', note: '7 min', moves: [
                    { name: '鸟狗+弹力带抗阻', detail: '手脚套带伸展抗回弹抗旋，3组×10次/侧', equipment: '弹力带' },
                  ]},
                ]},
                { title: 'B训练：对称矫正（周二/四）', totalMins: 15, blocks: [
                  { category: '单侧侧链', note: '8 min', moves: [
                    { name: '侧桥抬腿动态', detail: '侧桥维持上腿连续外展动态，3组×12次/侧', equipment: '瑜伽垫' },
                    { name: '负重怪兽走', detail: '膝带加双带侧走增阻，3组×15步', equipment: '弹力带' },
                  ]},
                  { category: '活动度', note: '7 min', moves: [
                    { name: '半跪髂腰肌牵伸+伸展', detail: '半跪后倾骨盆同侧上举增强DFL牵伸，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: 'A训练：复合强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '复合力量', note: '9 min', moves: [
                    { name: '单腿硬拉+提膝串联', detail: '硬拉起身接提膝平衡维持骨盆中立，3组×10次/侧', equipment: '哑铃' },
                    { name: '单腿臀桥保持', detail: '单腿桥顶端静态保持，3组×20s/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '核心整合', note: '6 min', moves: [
                    { name: '死虫+鸟狗复合', detail: '两式串联维持骨盆中立抗旋，3组×8次', equipment: '瑜伽垫' },
                  ]},
                ]},
                { title: 'B训练：对称评估（周二/四）', totalMins: 15, blocks: [
                  { category: '对称评估', note: '8 min', moves: [
                    { name: '单腿平衡左右对比', detail: '左右单腿站立对比骨盆稳定差异，3组×30s/侧', equipment: '无' },
                  ]},
                  { category: '整合', note: '7 min', moves: [
                    { name: '怪兽走+侧桥循环', detail: '侧走接侧桥外展循环整合侧链，3组×10次/侧', equipment: '弹力带' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
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
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '站姿后踢臀（停顿）', detail: '扶椅髋后伸顶端停2s，3组×12次/侧', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '靠墙静蹲+骨盆中立', detail: '靠墙半蹲延长保持，3组×40s', equipment: '墙' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '对称', note: '5 min', moves: [
                    { name: '弹力带侧走', detail: '膝带怪兽走增步数，3组×15步', equipment: '弹力带' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '单侧激活', note: '5 min', moves: [
                    { name: '站姿单腿后踢臀+平衡', detail: '扶椅单腿后伸同时维持站立平衡，3组×10次/侧', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '靠墙单腿静蹲', detail: '靠墙偏单侧承重静蹲，3组×20s/侧', equipment: '墙' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '对称', note: '5 min', moves: [
                    { name: '弹力带前后向侧走', detail: '膝带做X型四向怪兽走，3组×12步', equipment: '弹力带' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '后踢臀+侧走串联', detail: '后踢臀接侧走串联唤醒臀群，3组×10次', equipment: '弹力带' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '靠墙静蹲+提踵', detail: '静蹲中加提踵整合下肢链，3组×40s', equipment: '墙' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '评估', note: '5 min', moves: [
                    { name: '单腿平衡对称自检', detail: '收尾对比左右单腿稳定度', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
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
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '5 min', moves: [
                    { name: '弹力带臀肌激活组', detail: '蚌式+怪兽走唤醒臀中肌，2组×18次', equipment: '弹力带' },
                  ]},
                  { category: '力量强化', note: '19 min', moves: [
                    { name: '臀桥进阶（加重）', detail: '增加杠铃负重顶髋夹臀，4组×10次', equipment: '杠铃' },
                    { name: '单腿罗马尼亚硬拉（加重）', detail: '加大哑铃负重单腿下放，4组×10次/侧', equipment: '哑铃' },
                    { name: '死虫+负重', detail: '增加握重对侧伸展抗旋，3组×12次', equipment: '哑铃' },
                  ]},
                  { category: '整合', note: '6 min', moves: [
                    { name: '鸟狗+负重停顿', detail: '延长停顿至4s维持骨盆中立，3组×10次/侧', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '5 min', moves: [
                    { name: '弹力带臀肌激活组', detail: '蚌式+怪兽走唤醒臀中肌，2组×15次', equipment: '弹力带' },
                  ]},
                  { category: '单侧力量', note: '19 min', moves: [
                    { name: '单腿臀推（脚抬高）', detail: '肩靠凳单腿髋推增大行程，4组×10次/侧', equipment: '哑铃' },
                    { name: '哑铃保加利亚分腿蹲', detail: '后脚抬高单腿蹲维持骨盆水平，4组×8次/侧', equipment: '哑铃' },
                    { name: '半跪推举抗旋', detail: '半跪单臂推举抗骨盆旋转，3组×10次/侧', equipment: '哑铃' },
                  ]},
                  { category: '整合', note: '6 min', moves: [
                    { name: '鸟狗+弹力带抗阻', detail: '套带伸展抗回弹强化抗旋，3组×10次/侧', equipment: '弹力带' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '动态热身', note: '5 min', moves: [
                    { name: '动态髋关节热身', detail: '弓步+髋绕环唤醒，2组×10次', equipment: '无' },
                  ]},
                  { category: '复合力量', note: '17 min', moves: [
                    { name: '高脚杯深蹲+硬拉超级组', detail: '深蹲接硬拉连续维持骨盆中立，4组×8次', equipment: '哑铃' },
                    { name: '行李箱农夫行走', detail: '单侧负重抗侧倾维持骨盆水平，3组×20m', equipment: '壶铃' },
                  ]},
                  { category: '功能评估', note: '8 min', moves: [
                    { name: '单腿硬拉对称评估', detail: '左右单腿硬拉对比稳定与骨盆水平，3组×8次/侧', equipment: '哑铃' },
                  ]},
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
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
                { title: 'A训练：步态整合（周一/三/五）', totalMins: 15, blocks: [
                  { category: '功能步态', note: '8 min', moves: [
                    { name: '功能步态训练', detail: '慢走中维持骨盆水平，臀肌主导推进，3组×20步', equipment: '无' },
                    { name: '弓步行走', detail: '行进弓步维持骨盆中立，3组×10步/侧', equipment: '无' },
                  ]},
                  { category: '平衡强化', note: '7 min', moves: [
                    { name: '单腿平衡强化', detail: '单腿站立维持骨盆水平，3组×30s/侧', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：中立维持（周二/四）', totalMins: 15, blocks: [
                  { category: '骨盆中立维持', note: '8 min', moves: [
                    { name: '负重深蹲中立维持', detail: '徒手/水瓶深蹲全程骨盆中立，3组×12次', equipment: '水瓶' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '久坐微激活习惯', detail: '将后踢臀+骨盆中立固化为间歇习惯', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: 'A训练：步态整合（周一/三/五）', totalMins: 15, blocks: [
                  { category: '功能步态', note: '8 min', moves: [
                    { name: '功能步态训练（变速）', detail: '快慢变速行走维持骨盆水平，3组×24步', equipment: '无' },
                    { name: '弓步行走加幅', detail: '加大步幅弓步行走维持中立，3组×12步/侧', equipment: '无' },
                  ]},
                  { category: '平衡强化', note: '7 min', moves: [
                    { name: '单腿平衡+摆腿', detail: '单腿站立配合对侧腿前后摆增扰动，3组×30s/侧', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：中立维持（周二/四）', totalMins: 15, blocks: [
                  { category: '骨盆中立维持', note: '8 min', moves: [
                    { name: '硬拉模式训练', detail: '髋铰链拾物保持脊柱骨盆中立，3组×12次', equipment: '购物袋' },
                    { name: '单腿臀桥保持', detail: '单腿桥顶端静态保持延时，3组×25s/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '站立办公间歇', detail: '每小时站立活动并自检骨盆中立', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: 'A训练：步态整合（周一/三/五）', totalMins: 15, blocks: [
                  { category: '功能步态', note: '8 min', moves: [
                    { name: '负重农夫步态', detail: '单侧持重行走抗侧倾维持骨盆水平，3组×20步', equipment: '水瓶' },
                    { name: '后撤步弓步', detail: '后撤步弓步控制下蹲维持中立，3组×10步/侧', equipment: '无' },
                  ]},
                  { category: '平衡强化', note: '7 min', moves: [
                    { name: '闭眼单腿平衡', detail: '闭眼单腿站立挑战本体觉，3组×20s/侧', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：中立维持（周二/四）', totalMins: 15, blocks: [
                  { category: '骨盆中立维持', note: '8 min', moves: [
                    { name: '单腿硬拉拾物', detail: '单腿髋铰链拾物维持骨盆中立，3组×10次/侧', equipment: '购物袋' },
                    { name: '深蹲+提膝整合', detail: '深蹲起身接提膝维持骨盆稳定，3组×10次', equipment: '水瓶' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '不平面站立挑战', detail: '软垫上站立维持骨盆中立增难度', equipment: '软垫' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: 'A训练：自动化整合（周一/三/五）', totalMins: 15, blocks: [
                  { category: '自动化步态', note: '8 min', moves: [
                    { name: '日常情境步态固化', detail: '模拟提物上下楼无意识维持骨盆中立，3组×20步', equipment: '无' },
                  ]},
                  { category: '综合评估', note: '7 min', moves: [
                    { name: '单腿平衡左右终测', detail: '对比左右单腿稳定确认对称改善，3组×30s/侧', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：习惯固化（周二/四）', totalMins: 15, blocks: [
                  { category: '中立维持', note: '8 min', moves: [
                    { name: '硬拉+深蹲日常模式', detail: '拾物与起坐统一用中立髋铰链模式，3组×10次', equipment: '购物袋' },
                  ]},
                  { category: '长期策略', note: '7 min', moves: [
                    { name: '维持清单固化', detail: '将均衡承重不跷腿站立办公列为日常清单', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
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
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '靠墙静蹲+提踵', detail: '静蹲中加提踵深化稳定，3组×40s', equipment: '墙' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '平衡', note: '5 min', moves: [
                    { name: '单腿平衡+摆臂', detail: '单腿站立配合摆臂扰动，3组×30s/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '站姿后踢臀维持', detail: '收尾后踢臀巩固臀肌发力，3组×12次/侧', equipment: '办公椅' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '靠墙单腿静蹲', detail: '偏单侧承重静蹲挑战稳定，3组×20s/侧', equipment: '墙' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '平衡', note: '5 min', moves: [
                    { name: '闭眼单腿平衡', detail: '闭眼单腿站立挑战本体觉，3组×20s/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '单腿硬拉拾物模拟', detail: '单腿髋铰链模拟拾物维持中立，3组×8次/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '自动化', note: '5 min', moves: [
                    { name: '起坐中立模式固化', detail: '每次起坐用髋铰链中立模式固化习惯', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '评估', note: '5 min', moves: [
                    { name: '单腿平衡左右终测', detail: '对比左右单腿稳定确认对称，3组×30s/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '长期策略', note: '5 min', moves: [
                    { name: '日常维持清单自检', detail: '收尾核对均衡承重不跷腿习惯', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
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
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '动态髋关节热身', detail: '弓步+髋绕环唤醒，2组×12次', equipment: '无' },
                  ]},
                  { category: '功能力量', note: '17 min', moves: [
                    { name: '高脚杯深蹲（加重）', detail: '增加哑铃负重深蹲维持中立，4组×10次', equipment: '哑铃' },
                    { name: '罗马尼亚硬拉（加重）', detail: '加大杠铃负重髋铰链，4组×8次', equipment: '杠铃' },
                    { name: '保加利亚分腿蹲（停顿）', detail: '底部停2s单腿蹲维持骨盆水平，3组×10次/侧', equipment: '哑铃' },
                  ]},
                  { category: '稳定整合', note: '8 min', moves: [
                    { name: '行李箱农夫行走（加距）', detail: '单侧负重抗侧倾延长距离，3组×25m', equipment: '壶铃' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '动态髋关节热身', detail: '弓步+髋绕环唤醒，2组×12次', equipment: '无' },
                  ]},
                  { category: '进阶力量', note: '17 min', moves: [
                    { name: '单腿罗马尼亚硬拉（重）', detail: '哑铃单腿髋铰链挑战平衡与骨盆水平，4组×8次/侧', equipment: '哑铃' },
                    { name: '行进弓步负重', detail: '哑铃行进弓步维持骨盆中立，4组×10步/侧', equipment: '哑铃' },
                    { name: '侧向跨步蹲', detail: '侧向跨步下蹲强化臀中肌抗侧倾，3组×10次/侧', equipment: '哑铃' },
                  ]},
                  { category: '稳定整合', note: '8 min', moves: [
                    { name: '不平面农夫行走', detail: '软垫线路单侧负重抗侧倾，3组×20m', equipment: '壶铃' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '动态热身', note: '5 min', moves: [
                    { name: '动态髋关节热身', detail: '弓步+髋绕环唤醒，2组×12次', equipment: '无' },
                  ]},
                  { category: '综合整合', note: '17 min', moves: [
                    { name: '深蹲+硬拉+农夫循环', detail: '三式连续循环维持全程骨盆中立，3组×8次', equipment: '哑铃' },
                    { name: '保加利亚分腿蹲终测', detail: '左右对比单腿蹲稳定与骨盆水平，3组×10次/侧', equipment: '哑铃' },
                  ]},
                  { category: '功能评估', note: '8 min', moves: [
                    { name: '负重农夫行走对称终测', detail: '左右侧负重行走对比抗侧倾能力，3组×20m/侧', equipment: '壶铃' },
                  ]},
                ]},
              ]},
            ]
          }
        }
      }
    ]
  },
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
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '6 min', moves: [
                    { name: '腰方肌放松', detail: '侧卧将球置于髂嵴与肋骨间缓压，2min/侧', equipment: '筋膜球' },
                    { name: '臀肌泡沫轴松解', detail: '坐于轴上滚压臀部找痛点，2min/侧', equipment: '泡沫轴' },
                  ]},
                  { category: '神经激活', note: '7 min', moves: [
                    { name: '腹横肌激活（腹部收紧）', detail: '仰卧轻收下腹想象束腰，保持8s，2组×8次', equipment: '瑜伽垫' },
                    { name: '猫牛式', detail: '四足位脊柱节段性屈伸唤醒，2组×8次', equipment: '瑜伽垫' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '髋铰链搬物', detail: '弯腰拾物改用屈髋保持腰曲', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：感知整合（周二/四）', totalMins: 15, blocks: [
                  { category: '呼吸+感知', note: '8 min', moves: [
                    { name: '骨盆时钟', detail: '仰卧前后左右倾骨盆找中立，2组×6圈', equipment: '瑜伽垫' },
                    { name: '360度呼吸', detail: '吸气时肋骨与腰背同步扩张，5min', equipment: '无' },
                  ]},
                  { category: '稳定激活', note: '7 min', moves: [
                    { name: '死虫式（单腿）', detail: '单侧腿伸展维持腰贴地，2组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '6 min', moves: [
                    { name: '腰方肌深层缓压', detail: '侧卧加大球压找痛点呼吸放松，2.5min/侧', equipment: '筋膜球' },
                    { name: '胸腰筋膜滚压', detail: '泡沫轴沿腰段两侧上下滚压，2min', equipment: '泡沫轴' },
                  ]},
                  { category: '神经激活', note: '7 min', moves: [
                    { name: '腹横肌激活（延长保持）', detail: '仰卧轻收下腹保持10s，3组×10次', equipment: '瑜伽垫' },
                    { name: '猫牛式（节段控制）', detail: '逐节卷动脊柱缓慢屈伸，3组×8次', equipment: '瑜伽垫' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '髋铰链搬物', detail: '弯腰拾物改用屈髋保持腰曲', equipment: '无' },
                    { name: '坐姿支撑腰曲', detail: '使用腰靠维持自然腰椎前凸', equipment: '腰靠' },
                  ]},
                ]},
                { title: 'B训练：感知整合（周二/四）', totalMins: 15, blocks: [
                  { category: '呼吸+感知', note: '7 min', moves: [
                    { name: '骨盆时钟（闭眼）', detail: '闭眼增强本体感觉找中立，3组×8圈', equipment: '瑜伽垫' },
                    { name: '360度呼吸', detail: '强化腰背后侧扩张感，5min', equipment: '无' },
                  ]},
                  { category: '稳定激活', note: '8 min', moves: [
                    { name: '死虫式', detail: '对侧手脚伸展维持腰贴地，3组×10次', equipment: '瑜伽垫' },
                    { name: '多裂肌分离激活', detail: '俯卧轻抬单侧腰段微收，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '5 min', moves: [
                    { name: '腰方肌+臀肌快速松解', detail: '球压腰侧与臀部各2min找残留痛点', equipment: '筋膜球' },
                  ]},
                  { category: '神经激活', note: '8 min', moves: [
                    { name: '腹横肌+呼吸协同', detail: '呼气收下腹保持，3组×12次', equipment: '瑜伽垫' },
                    { name: '猫牛+四足支撑稳定', detail: '四足位维持中立轻抬手，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '髋铰链搬物', detail: '弯腰拾物改用屈髋保持腰曲', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：感知整合（周二/四）', totalMins: 15, blocks: [
                  { category: '呼吸+感知', note: '6 min', moves: [
                    { name: '骨盆中立动态切换', detail: '中立与前后倾间快速切换控制，3组×10次', equipment: '瑜伽垫' },
                  ]},
                  { category: '稳定激活', note: '9 min', moves: [
                    { name: '死虫式（慢节奏）', detail: '慢速控制对侧伸展，3组×10次', equipment: '瑜伽垫' },
                    { name: '多裂肌分离（停顿）', detail: '俯卧抬腰段顶端停3s，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '4 min', moves: [
                    { name: '腰背快速放松', detail: '泡沫轴整体滚压收尾，4min', equipment: '泡沫轴' },
                  ]},
                  { category: '神经激活', note: '8 min', moves: [
                    { name: '腹横肌+死虫组合', detail: '激活后接死虫整合，3组×10次', equipment: '瑜伽垫' },
                    { name: '鸟狗式入门', detail: '四足位对侧手脚伸展抗旋，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '髋铰链搬物', detail: '弯腰拾物改用屈髋保持腰曲', equipment: '无' },
                    { name: '坐姿支撑腰曲', detail: '使用腰靠维持自然腰椎前凸', equipment: '腰靠' },
                  ]},
                ]},
                { title: 'B训练：感知整合（周二/四）', totalMins: 15, blocks: [
                  { category: '呼吸+感知', note: '5 min', moves: [
                    { name: '中立呼吸自评', detail: '检查能否自如维持脊柱中立呼吸，5min', equipment: '无' },
                  ]},
                  { category: '稳定激活', note: '10 min', moves: [
                    { name: '死虫+多裂肌组合', detail: '两动作串联强化时序，3组×10次', equipment: '瑜伽垫' },
                    { name: '臀桥', detail: '桥位维持骨盆稳定顶端停2s，3组×10次', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '坐姿腹横肌激活', detail: '坐姿轻收下腹保持8s，2组×8次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间松解（午休）', totalMins: 5, blocks: [
                  { category: '松解', note: '5 min', moves: [
                    { name: '站姿腰方肌侧屈牵伸', detail: '单手过头侧屈拉伸腰侧，30s/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚习惯（下班前）', totalMins: 5, blocks: [
                  { category: '习惯', note: '5 min', moves: [
                    { name: '坐姿变换提示', detail: '每30分钟更换坐姿避免久坐塌腰', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '坐姿腹横肌激活（延长）', detail: '坐姿轻收下腹保持10s，3组×10次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间松解（午休）', totalMins: 5, blocks: [
                  { category: '松解', note: '5 min', moves: [
                    { name: '站姿腰方肌侧屈+旋转', detail: '侧屈后加轻旋转松解腰段，40s/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚习惯（下班前）', totalMins: 5, blocks: [
                  { category: '激活+习惯', note: '5 min', moves: [
                    { name: '站姿骨盆中立找位', detail: '靠墙找脊柱中立保持，3组×20s', equipment: '墙' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '坐姿腹横肌+呼吸协同', detail: '呼气收腹保持，3组×12次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间松解（午休）', totalMins: 5, blocks: [
                  { category: '松解+激活', note: '5 min', moves: [
                    { name: '站姿髋铰链找位', detail: '屈髋下放保持腰曲，3组×10次', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '靠墙中立保持加时', detail: '靠墙维持脊柱中立，3组×30s', equipment: '墙' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '坐起髋铰链固化', detail: '起身维持脊柱中立预激活，3组×10次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '腰方肌牵伸收尾', detail: '侧屈拉伸放松腰侧，40s/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '习惯', note: '5 min', moves: [
                    { name: '坐姿自评+变换', detail: '检查坐姿并定时变换固化习惯', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+筋膜松解', note: '8 min', moves: [
                    { name: '胸椎+腰方肌松解', detail: '泡沫轴松解胸椎与腰侧，3min', equipment: '泡沫轴' },
                    { name: '猫牛+婴儿式', detail: '脊柱节段活动唤醒，2min', equipment: '瑜伽垫' },
                  ]},
                  { category: '神经肌肉激活', note: '12 min', moves: [
                    { name: '死虫式', detail: '对侧伸展抗伸维持中立，3组×8次', equipment: '瑜伽垫' },
                    { name: '鸟狗式', detail: '对侧手脚伸展抗旋，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '基础力量', note: '8 min', moves: [
                    { name: '平板支撑', detail: '维持脊柱中立核心收紧，3组×20s', equipment: '瑜伽垫' },
                  ]},
                  { category: '整合训练', note: '2 min', moves: [
                    { name: '站姿中立呼吸', detail: '脊柱中立深呼吸整合', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+筋膜松解', note: '7 min', moves: [
                    { name: '胸腰筋膜深层松解', detail: '泡沫轴重点滚压腰段两侧，3min', equipment: '泡沫轴' },
                    { name: '猫牛+穿针引线', detail: '加入胸椎旋转唤醒，2min/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '神经肌肉激活', note: '11 min', moves: [
                    { name: '死虫式（慢节奏）', detail: '慢速控制对侧伸展，3组×10次', equipment: '瑜伽垫' },
                    { name: '鸟狗式（停顿）', detail: '顶端停2s抗旋，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '力量强化', note: '10 min', moves: [
                    { name: '平板支撑', detail: '维持脊柱中立核心收紧，3组×30s', equipment: '瑜伽垫' },
                    { name: '侧桥', detail: '维持躯干一直线，3组×20s/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '整合训练', note: '2 min', moves: [
                    { name: '站姿中立呼吸', detail: '脊柱中立深呼吸整合', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '6 min', moves: [
                    { name: '动态热身组合', detail: '猫牛+死虫快速唤醒，3min', equipment: '瑜伽垫' },
                  ]},
                  { category: '神经肌肉激活', note: '10 min', moves: [
                    { name: '鸟狗式（弹力带抗阻）', detail: '带轻阻下伸展抗旋，3组×10次/侧', equipment: '弹力带' },
                    { name: '死虫式（负荷）', detail: '手持轻负荷维持腰贴地，3组×10次', equipment: '哑铃' },
                  ]},
                  { category: '力量强化', note: '12 min', moves: [
                    { name: '平板支撑（加时）', detail: '维持中立延长保持，3组×40s', equipment: '瑜伽垫' },
                    { name: '侧桥（抬髋）', detail: '动态抬髋强化侧链，3组×10次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '整合训练', note: '2 min', moves: [
                    { name: '站姿中立呼吸', detail: '脊柱中立深呼吸整合', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '5 min', moves: [
                    { name: '核心预激活热身', detail: '死虫+鸟狗唤醒，2组×10次', equipment: '瑜伽垫' },
                  ]},
                  { category: '力量整合', note: '15 min', moves: [
                    { name: '髋铰链模式（轻负荷）', detail: '屈髋维持脊柱中立，3组×10次', equipment: '哑铃' },
                    { name: '平板+侧桥循环', detail: '前侧链组合维持，3组×30s', equipment: '瑜伽垫' },
                  ]},
                  { category: '稳定评估', note: '8 min', moves: [
                    { name: '单侧负重站立稳定', detail: '负重抗倾维持躯干，3组×20s/侧', equipment: '哑铃' },
                  ]},
                  { category: '整合训练', note: '2 min', moves: [
                    { name: '站姿中立呼吸', detail: '脊柱中立深呼吸整合', equipment: '无' },
                  ]},
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
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
                { title: 'A训练：背链强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '伸肌强化', note: '8 min', moves: [
                    { name: '超人式（单侧）', detail: '俯卧交替抬手脚顶端停2s，3组×8次/侧', equipment: '瑜伽垫' },
                    { name: '多裂肌分离训练', detail: '俯卧精准抬单侧腰段，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '后链激活', note: '7 min', moves: [
                    { name: '臀桥', detail: '桥位顶端停2s维持骨盆稳定，3组×12次', equipment: '瑜伽垫' },
                  ]},
                ]},
                { title: 'B训练：抗旋整合（周二/四）', totalMins: 15, blocks: [
                  { category: '核心抗旋', note: '8 min', moves: [
                    { name: '鸟狗式', detail: '对侧伸展抗旋稳定，3组×10次/侧', equipment: '瑜伽垫' },
                    { name: '死虫式', detail: '对侧手脚伸展控制，3组×10次', equipment: '瑜伽垫' },
                  ]},
                  { category: '活动度', note: '7 min', moves: [
                    { name: '猫牛+胸椎旋转', detail: '四足位穿针引线打开胸椎，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: 'A训练：背链强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '伸肌强化', note: '8 min', moves: [
                    { name: '超人式（双侧）', detail: '俯卧同时抬手脚顶端停3s，3组×10次', equipment: '瑜伽垫' },
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
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: 'A训练：背链强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '伸肌强化', note: '8 min', moves: [
                    { name: '超人式（划水变式）', detail: '俯卧抬起后做小幅划船动作，3组×10次', equipment: '瑜伽垫' },
                    { name: '单腿臀桥', detail: '单腿支撑抗骨盆下沉，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '后链激活', note: '7 min', moves: [
                    { name: '反向飞鸟（弹力带）', detail: '带阻后束飞鸟，3组×12次', equipment: '弹力带' },
                  ]},
                ]},
                { title: 'B训练：抗旋整合（周二/四）', totalMins: 15, blocks: [
                  { category: '核心抗旋', note: '9 min', moves: [
                    { name: '鸟狗+肘膝相碰', detail: '伸展后收拢肘膝抗旋控制，3组×10次/侧', equipment: '瑜伽垫' },
                    { name: '死虫（弹力带抗阻）', detail: '带阻下对侧伸展，3组×10次', equipment: '弹力带' },
                  ]},
                  { category: '活动度', note: '6 min', moves: [
                    { name: '跪姿胸椎旋转', detail: '坐跟手抱头旋转胸段，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: 'A训练：背链强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '伸肌强化', note: '7 min', moves: [
                    { name: '超人+鸟狗组合', detail: '两动作串联整合后链，3组×8次', equipment: '瑜伽垫' },
                  ]},
                  { category: '后链整合', note: '8 min', moves: [
                    { name: '臀桥+反向飞鸟复合', detail: '桥位同时做后束飞鸟，3组×10次', equipment: '无' },
                    { name: '负重髋铰链', detail: '手持负荷屈髋维持中立，3组×10次', equipment: '水瓶/购物袋' },
                  ]},
                ]},
                { title: 'B训练：抗旋整合（周二/四）', totalMins: 15, blocks: [
                  { category: '核心抗旋', note: '8 min', moves: [
                    { name: '负重死虫', detail: '手持负荷对侧伸展，3组×10次', equipment: '水瓶' },
                    { name: '鸟狗（闭眼）', detail: '闭眼挑战本体感觉抗旋，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '活动度+自评', note: '7 min', moves: [
                    { name: '胸椎旋转自评', detail: '检查左右旋转对称性，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '坐姿背伸激活', detail: '坐姿挺胸延伸脊柱保持，2组×10次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '站姿髋铰链', detail: '屈髋下放保持腰曲，2组×12次', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '抗旋', note: '5 min', moves: [
                    { name: '站姿抗旋保持', detail: '弹力带侧拉静态抗旋，2组×20s/侧', equipment: '弹力带' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '负荷递增', sessions: [
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
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '坐姿背伸+旋转', detail: '延伸后加轻旋转激活，3组×10次/侧', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '单腿站姿髋铰链', detail: '单腿支撑屈髋抗倾，3组×8次/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '抗旋', note: '5 min', moves: [
                    { name: '帕洛夫推（弹力带）', detail: '带阻向前推出抗旋，3组×12次/侧', equipment: '弹力带' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '坐起髋铰链固化', detail: '起身维持脊柱中立预激活，3组×10次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '复合', note: '5 min', moves: [
                    { name: '髋铰链+抗旋组合', detail: '屈髋后接抗旋推出，3组×10次', equipment: '弹力带' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '抗旋', note: '5 min', moves: [
                    { name: '帕洛夫推+保持', detail: '推出末端静态保持，3组×15s/侧', equipment: '弹力带' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '6 min', moves: [
                    { name: '死虫+鸟狗激活组', detail: '核心预激活，2组×10次', equipment: '瑜伽垫' },
                  ]},
                  { category: '力量强化', note: '18 min', moves: [
                    { name: '罗马尼亚硬拉（徒手/轻负荷）', detail: '髋铰链维持脊柱中立，3组×10次', equipment: '哑铃' },
                    { name: '反向飞鸟', detail: '后束强化整合上背，3组×12次', equipment: '哑铃' },
                    { name: '帕洛夫推（抗旋）', detail: '绳索侧向抗旋推出，3组×10次/侧', equipment: '绳索器械' },
                  ]},
                  { category: '稳定整合', note: '6 min', moves: [
                    { name: '侧桥', detail: '维持躯干一直线，3组×25s/侧', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '负荷递增', sessions: [
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
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '5 min', moves: [
                    { name: '动态激活组合', detail: '死虫+鸟狗+臀桥唤醒，2组×10次', equipment: '瑜伽垫' },
                  ]},
                  { category: '力量强化', note: '19 min', moves: [
                    { name: '单腿罗马尼亚硬拉', detail: '单腿屈髋抗旋维持中立，3组×8次/侧', equipment: '哑铃' },
                    { name: '俯身划船', detail: '髋铰链固定划船强化背链，4组×10次', equipment: '哑铃' },
                    { name: '半跪帕洛夫推', detail: '半跪位抗旋增大不稳，3组×12次/侧', equipment: '绳索器械' },
                  ]},
                  { category: '稳定整合', note: '6 min', moves: [
                    { name: '侧桥+旋转', detail: '侧桥下穿手旋转抗旋，3组×8次/侧', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '5 min', moves: [
                    { name: '核心预激活热身', detail: '死虫+鸟狗唤醒，2组×10次', equipment: '瑜伽垫' },
                  ]},
                  { category: '复合力量', note: '19 min', moves: [
                    { name: '硬拉（中等负荷）', detail: '髋铰链整合后链发力，4组×8次', equipment: '杠铃' },
                    { name: '划船+抗旋组合', detail: '划船后接抗旋推整合，3组×10次', equipment: '哑铃' },
                    { name: '负重搬运', detail: '农夫行走维持躯干稳定，3组×30m', equipment: '哑铃' },
                  ]},
                  { category: '稳定评估', note: '6 min', moves: [
                    { name: '侧桥保持双侧对比', detail: '评估左右侧链耐力，3组×30s/侧', equipment: '瑜伽垫' },
                  ]},
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
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
                { title: 'A训练：负荷整合（周一/三/五）', totalMins: 15, blocks: [
                  { category: '复合动作中立', note: '8 min', moves: [
                    { name: '徒手深蹲脊柱中立', detail: '深蹲模式全程维持脊柱中立，3组×10次', equipment: '无' },
                    { name: '髋铰链复习', detail: '屈髋拾物固化模式，3组×10次', equipment: '无' },
                  ]},
                  { category: '动态稳定', note: '7 min', moves: [
                    { name: '臀桥行走唤醒', detail: '桥位交替踏步重启稳定，3组×10次', equipment: '瑜伽垫' },
                  ]},
                ]},
                { title: 'B训练：日常自动化（周二/四）', totalMins: 15, blocks: [
                  { category: '日常整合', note: '8 min', moves: [
                    { name: '弯腰拾物模式固化', detail: '反复练习髋铰链拾物，3组×10次', equipment: '无' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '晨间脊柱唤醒套路', detail: '猫牛+死虫固化为晨间习惯', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '稳定深化', sessions: [
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
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: 'A训练：负荷整合（周一/三/五）', totalMins: 15, blocks: [
                  { category: '复合动作中立', note: '8 min', moves: [
                    { name: '单侧负重深蹲', detail: '酒杯/箱位负重抗倾维持中立，3组×8次', equipment: '购物袋' },
                    { name: '不平整面农夫提', detail: '软垫上负重行走挑战稳定，3组×30s', equipment: '购物袋' },
                  ]},
                  { category: '动态稳定', note: '7 min', moves: [
                    { name: '抗旋走+转向', detail: '负重行走中加入转向控制，3组×20步', equipment: '水瓶' },
                  ]},
                ]},
                { title: 'B训练：日常自动化（周二/四）', totalMins: 15, blocks: [
                  { category: '日常整合', note: '8 min', moves: [
                    { name: '搬重物+转身复合', detail: '拾物起身转身全链固化，3组×8次', equipment: '购物袋' },
                    { name: '台阶上下髋铰链', detail: '上下台阶维持腰曲，3组×10次', equipment: '台阶' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '晨间唤醒+自评', detail: '套路后自检僵硬度，每日记录', equipment: '瑜伽垫' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: 'A训练：负荷整合（周一/三/五）', totalMins: 15, blocks: [
                  { category: '复合动作中立', note: '8 min', moves: [
                    { name: '生活场景模拟搬运', detail: '模拟搬箱拾物全程无痛控制，3组×8次', equipment: '购物袋' },
                  ]},
                  { category: '动态稳定+自评', note: '7 min', moves: [
                    { name: '负荷抗旋走自评', detail: '负重行走自检躯干无晃动，3组×20步', equipment: '水瓶' },
                  ]},
                ]},
                { title: 'B训练：日常自动化（周二/四）', totalMins: 15, blocks: [
                  { category: '日常整合', note: '8 min', moves: [
                    { name: '无意识模式检查', detail: '日常动作中检查自动维持中立，全天', equipment: '无' },
                  ]},
                  { category: '长期维持', note: '7 min', moves: [
                    { name: '制定维持计划', detail: '固化每周最低训练量与晨间套路', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '坐起髋铰链唤醒', detail: '起身保持脊柱中立，2组×10次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '稳定', note: '5 min', moves: [
                    { name: '站姿抗旋保持', detail: '弹力带抗旋静态保持，2组×20s/侧', equipment: '弹力带' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '腰方肌侧屈牵伸', detail: '收尾拉伸腰侧30s/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '稳定深化', sessions: [
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
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '单腿坐起髋铰链', detail: '单腿支撑起身抗倾，3组×8次/侧', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '稳定', note: '5 min', moves: [
                    { name: '帕洛夫推+保持', detail: '弹力带推出末端保持，3组×15s/侧', equipment: '弹力带' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '腰背全段牵伸', detail: '侧屈+前屈组合收尾，40s/向', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '固化', note: '5 min', moves: [
                    { name: '起身自动中立检查', detail: '检查起身是否自动维持中立，全天', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '抗旋保持自评', detail: '检查抗旋稳定无晃动，3组×20s/侧', equipment: '弹力带' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '长期维持', note: '5 min', moves: [
                    { name: '办公习惯清单复盘', detail: '复盘坐姿/搬物/变换是否固化', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '核心预激活热身', detail: '死虫+鸟狗唤醒，2组×10次', equipment: '瑜伽垫' },
                  ]},
                  { category: '功能力量', note: '17 min', moves: [
                    { name: '常规硬拉（轻中负荷）', detail: '维持脊柱中立重建模式，3组×8次', equipment: '杠铃' },
                    { name: '高脚杯深蹲', detail: '负重深蹲核心收紧，3组×10次', equipment: '哑铃' },
                    { name: '负重搬运', detail: '农夫行走整合躯干稳定，3组×20m', equipment: '壶铃' },
                  ]},
                  { category: '稳定整合', note: '8 min', moves: [
                    { name: '帕洛夫推', detail: '绳索抗旋静态保持，3组×15s/侧', equipment: '绳索器械' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '稳定深化', sessions: [
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
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '动态激活热身', detail: '死虫+鸟狗+臀桥唤醒，2组×10次', equipment: '瑜伽垫' },
                  ]},
                  { category: '功能力量', note: '17 min', moves: [
                    { name: '硬拉（较大负荷）', detail: '增重维持脊柱中立，5组×5次', equipment: '杠铃' },
                    { name: '单侧高脚杯深蹲', detail: '单侧负重抗倾深蹲，3组×8次/侧', equipment: '哑铃' },
                    { name: '单侧负重搬运', detail: '单边负重行走强化抗侧屈，3组×30m/侧', equipment: '壶铃' },
                  ]},
                  { category: '稳定整合', note: '8 min', moves: [
                    { name: '帕洛夫推+转向行走', detail: '抗旋行走中加入转向，3组×12步', equipment: '绳索器械' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '核心预激活热身', detail: '死虫+鸟狗唤醒，2组×10次', equipment: '瑜伽垫' },
                  ]},
                  { category: '功能整合', note: '17 min', moves: [
                    { name: '硬拉技术复盘', detail: '中等负荷专注动作质量，4组×6次', equipment: '杠铃' },
                    { name: '复合搬运循环', detail: '深蹲+搬运串联模拟生活，3组×30m', equipment: '壶铃' },
                  ]},
                  { category: '稳定评估+计划', note: '8 min', moves: [
                    { name: '抗旋行走双侧评估', detail: '评估左右稳定对称制定维持量，3组×12步', equipment: '绳索器械' },
                  ]},
                ]},
              ]},
            ]
          }
        }
      }
    ]
  },
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
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '6 min', moves: [
                    { name: 'IT带（髂胫束）泡沫轴松解', detail: '侧卧大腿外侧沿轴缓滚找紧张点，2min/侧', equipment: '泡沫轴' },
                    { name: '小腿三头肌松解', detail: '坐姿小腿置轴上慢滚压，2min/侧', equipment: '泡沫轴' },
                  ]},
                  { category: '神经激活', note: '7 min', moves: [
                    { name: 'VMO终末伸膝激活', detail: '坐姿膝下垫卷毛巾，末端伸直股内侧收紧，3组×12次', equipment: '毛巾' },
                    { name: '踝稳定训练', detail: '单腿站立维持踝中立微调感受重心，3组×20s/侧', equipment: '无' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '站立膝微屈不锁死', detail: '避免站立时膝超伸锁死，建立微屈意识', equipment: '无' },
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
                    { name: '睁眼单腿平衡', detail: '睁眼单腿站立建立本体觉基线，3组×15s/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: 'A训练：深层松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '7 min', moves: [
                    { name: 'IT带分段深松', detail: '侧卧分上中下三段停留按压紧张点，3min/侧', equipment: '泡沫轴' },
                    { name: '股四头肌泡沫轴松解', detail: '俯卧大腿前侧慢滚找压痛点停留，2min/侧', equipment: '泡沫轴' },
                  ]},
                  { category: '神经激活', note: '6 min', moves: [
                    { name: 'VMO终末伸膝（停留加深）', detail: '末端伸直保持5s再放，3组×12次', equipment: '毛巾' },
                    { name: '蚌式激活', detail: '侧卧屈髋开合膝感受臀外侧，3组×15次/侧', equipment: '无' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '坐站不锁膝', detail: '起身落座全程膝微屈控制', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：感知加深（周二/四）', totalMins: 15, blocks: [
                  { category: '激活', note: '7 min', moves: [
                    { name: '臀中肌侧抬腿（增量）', detail: '侧卧直腿上抬末端停留，3组×18次/侧', equipment: '瑜伽垫' },
                    { name: '直腿抬高+外旋保持', detail: '仰卧抬腿外旋顶端停3s，3组×12次/侧', equipment: '瑜伽垫' },
                  ]},
                  { category: '感觉重建', note: '8 min', moves: [
                    { name: '镜前微蹲追踪加深', detail: '对镜慢速加深角度观察膝对位，3组×12次', equipment: '镜子' },
                    { name: '闭眼单腿平衡', detail: '闭眼单腿站立强化本体觉，3组×15s/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: 'A训练：松解+控制（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '5 min', moves: [
                    { name: 'IT带快速松解', detail: '侧卧大腿外侧滚压收尾紧张点，2min/侧', equipment: '泡沫轴' },
                  ]},
                  { category: '控制强化', note: '10 min', moves: [
                    { name: '靠墙微蹲控制', detail: '背靠墙半蹲膝对第二趾保持，3组×25s', equipment: '墙' },
                    { name: 'VMO负重终末伸膝', detail: '踝挂毛巾小负荷末端伸膝，3组×12次/侧', equipment: '毛巾' },
                    { name: '弹力带侧向小步', detail: '膝套带屈髋侧走控制膝不内扣，3组×10步/向', equipment: '弹力带' },
                  ]},
                ]},
                { title: 'B训练：单腿控制（周二/四）', totalMins: 15, blocks: [
                  { category: '单腿控制', note: '9 min', moves: [
                    { name: '单腿浅蹲控制', detail: '单腿浅蹲全程膝对位不内扣，3组×8次/侧', equipment: '无' },
                    { name: '台阶上踏控制', detail: '矮台上踏缓慢控制膝追踪，3组×10次/侧', equipment: '台阶' },
                  ]},
                  { category: '平衡进阶', note: '6 min', moves: [
                    { name: '闭眼单腿+头部转动', detail: '闭眼单腿站立缓慢转头扰动平衡，3组×15s/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: 'A训练：模式整合（周一/三/五）', totalMins: 15, blocks: [
                  { category: '动态整合', note: '9 min', moves: [
                    { name: '微蹲到提踵连贯', detail: '半蹲起身接提踵控制膝踝对位，3组×12次', equipment: '无' },
                    { name: '弹力带侧走+前后走', detail: '膝套带多向行走巩固髋膝控制，3组×12步', equipment: '弹力带' },
                  ]},
                  { category: '巩固', note: '6 min', moves: [
                    { name: '靠墙静蹲计时挑战', detail: '半蹲膝对第二趾尽力保持，3组×40s', equipment: '墙' },
                  ]},
                ]},
                { title: 'B训练：感知评估（周二/四）', totalMins: 15, blocks: [
                  { category: '整合评估', note: '8 min', moves: [
                    { name: '单腿平衡+触地回收', detail: '单腿站立向前点地再回收测稳定，3组×10次/侧', equipment: '无' },
                    { name: '镜前自检对位', detail: '对镜复查微蹲膝对第二趾达成度，3组×10次', equipment: '镜子' },
                  ]},
                  { category: '习惯巩固', note: '7 min', moves: [
                    { name: '日常步态自检', detail: '行走中检查不锁膝、膝对第二趾', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
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
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '坐姿终末伸膝+停留', detail: '末端伸直停5s再放感受VMO，3组×12次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间松解（午休）', totalMins: 5, blocks: [
                  { category: '松解', note: '5 min', moves: [
                    { name: '站姿IT带分段牵伸', detail: '侧倾分上下段拉伸大腿外侧，40s/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '激活+习惯', note: '5 min', moves: [
                    { name: '扶椅单腿平衡（闭眼）', detail: '闭眼单腿站立维持膝对位，3组×15s/侧', equipment: '办公椅' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '控制', note: '5 min', moves: [
                    { name: '扶椅微蹲控制', detail: '轻扶椅背半蹲膝对第二趾，3组×12次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间强化（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '靠墙微蹲保持', detail: '背靠墙半蹲膝对位保持，3组×25s', equipment: '墙' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '侧链', note: '5 min', moves: [
                    { name: '扶椅侧抬腿', detail: '站姿侧抬腿激活臀中肌控制膝，3组×15次/侧', equipment: '办公椅' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '坐站微蹲连贯控制', detail: '起坐全程膝对第二趾控制，3组×12次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间巩固（午休）', totalMins: 5, blocks: [
                  { category: '巩固', note: '5 min', moves: [
                    { name: '靠墙静蹲计时', detail: '半蹲膝对位尽力保持，3组×35s', equipment: '墙' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '习惯', note: '5 min', moves: [
                    { name: '步态对位自检', detail: '走动检查膝对第二趾不锁膝，3min', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+筋膜松解', note: '8 min', moves: [
                    { name: 'IT带+股四头松解', detail: '泡沫轴松解大腿外侧前侧，3min', equipment: '泡沫轴' },
                    { name: '踝关节活动度', detail: '靠墙屈踝找膝过脚尖活动度，2min', equipment: '墙' },
                  ]},
                  { category: '神经肌肉激活', note: '10 min', moves: [
                    { name: '弹力带蚌式', detail: '激活臀中肌控制股骨内旋，3组×15次/侧', equipment: '弹力带' },
                    { name: 'VMO终末伸膝（轻负重）', detail: '踝绑小负荷末端伸膝，3组×12次/侧', equipment: '踝部沙袋' },
                  ]},
                  { category: '力量强化', note: '10 min', moves: [
                    { name: '靠墙静蹲', detail: '膝对第二趾半蹲保持，3组×30s', equipment: '墙' },
                    { name: '弹力带侧向步行', detail: '膝套带屈髋侧走控制膝，3组×12步', equipment: '弹力带' },
                  ]},
                  { category: '整合训练', note: '2 min', moves: [
                    { name: '单腿平衡收尾', detail: '单腿站立维持膝踝对位', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+深层松解', note: '8 min', moves: [
                    { name: 'IT带分段深松+股四头', detail: '泡沫轴分段停留按压紧张点，4min', equipment: '泡沫轴' },
                    { name: '踝活动度+小腿牵伸', detail: '靠墙屈踝结合小腿牵伸，2min', equipment: '墙' },
                  ]},
                  { category: '神经肌肉激活', note: '9 min', moves: [
                    { name: '弹力带蚌式+顶端停留', detail: '开合顶端停3s强化臀中肌，3组×15次/侧', equipment: '弹力带' },
                    { name: 'VMO终末伸膝加量', detail: '踝绑沙袋末端伸膝保持，3组×14次/侧', equipment: '踝部沙袋' },
                  ]},
                  { category: '力量强化', note: '11 min', moves: [
                    { name: '靠墙静蹲加深', detail: '加深角度膝对位保持，3组×40s', equipment: '墙' },
                    { name: '弹力带前后侧多向步', detail: '膝套带多向行走控制膝，3组×12步', equipment: '弹力带' },
                  ]},
                  { category: '整合训练', note: '2 min', moves: [
                    { name: '闭眼单腿平衡收尾', detail: '闭眼单腿站立维持对位', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '6 min', moves: [
                    { name: '蚌式+终末伸膝唤醒', detail: '快速唤醒臀中肌与VMO，2组×15次', equipment: '弹力带' },
                  ]},
                  { category: '控制力量', note: '18 min', moves: [
                    { name: '高脚杯微蹲控制', detail: '轻负重慢速半蹲膝对第二趾，4组×10次', equipment: '哑铃' },
                    { name: '后撤步弓步控制', detail: '后撤弓步膝对位下蹲，3组×10次/侧', equipment: '无' },
                    { name: '台阶上踏负重', detail: '持铃上踏控制膝追踪，3组×10次/侧', equipment: '哑铃' },
                  ]},
                  { category: '整合训练', note: '6 min', moves: [
                    { name: '单腿平衡+触地', detail: '单腿站立前点地回收控制膝，3组×10次/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '动态热身', note: '5 min', moves: [
                    { name: '弓步+侧走唤醒', detail: '动态弓步结合弹力带侧走，2组×10次', equipment: '弹力带' },
                  ]},
                  { category: '整合力量', note: '19 min', moves: [
                    { name: '高脚杯深蹲', detail: '负重深蹲膝对第二趾，4组×10次', equipment: '哑铃' },
                    { name: '单腿罗马尼亚硬拉', detail: '单腿髋铰链控制膝踝对位，3组×8次/侧', equipment: '哑铃' },
                    { name: '侧向跨步蹲', detail: '侧弓步整合髋膝控制，3组×10次/侧', equipment: '哑铃' },
                  ]},
                  { category: '稳定评估', note: '6 min', moves: [
                    { name: '单腿平衡计时评估', detail: '闭眼单腿站立测稳定时长', equipment: '无' },
                  ]},
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
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
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
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: 'A训练：负荷强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '蹲控制', note: '8 min', moves: [
                    { name: '负重微蹲（背包/水壶）', detail: '持轻负荷半蹲膝对位，3组×12次', equipment: '背包' },
                    { name: '靠墙静蹲负重保持', detail: '抱重物加深静蹲，3组×45s', equipment: '背包' },
                  ]},
                  { category: '侧链强化', note: '7 min', moves: [
                    { name: '弹力带侧走加阻', detail: '加强弹力带阻力侧走，3组×14步/向', equipment: '弹力带' },
                    { name: '单腿微蹲增次', detail: '单腿浅蹲控制膝，3组×10次/侧', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：单腿负荷（周二/四）', totalMins: 15, blocks: [
                  { category: '单腿力量', note: '8 min', moves: [
                    { name: '负重后撤弓步', detail: '持水壶后撤弓步膝对位，3组×10次/侧', equipment: '水壶' },
                    { name: '台阶上踏增高', detail: '稍高台阶上踏控制膝，3组×10次/侧', equipment: '台阶' },
                  ]},
                  { category: '平衡进阶', note: '7 min', moves: [
                    { name: '单腿平衡多向触地', detail: '单腿向前侧后点地回收，3组×9次/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: 'A训练：变式强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '蹲变式', note: '9 min', moves: [
                    { name: '节奏微蹲（慢下快起）', detail: '3秒离心下蹲快速起身膝对位，3组×10次', equipment: '无' },
                    { name: '保加利亚分腿蹲（徒手）', detail: '后脚抬高单腿蹲控制膝，3组×8次/侧', equipment: '椅子' },
                  ]},
                  { category: '侧链变式', note: '6 min', moves: [
                    { name: '弹力带怪兽走', detail: '半蹲位带阻前进控制膝外展，3组×12步', equipment: '弹力带' },
                  ]},
                ]},
                { title: 'B训练：动态变式（周二/四）', totalMins: 15, blocks: [
                  { category: '单腿变式', note: '9 min', moves: [
                    { name: '侧向跨步蹲', detail: '侧弓步控制髋膝不内扣，3组×9次/侧', equipment: '无' },
                    { name: '台阶下放离心控制', detail: '缓慢下台阶离心控制膝，3组×8次/侧', equipment: '台阶' },
                  ]},
                  { category: '平衡挑战', note: '6 min', moves: [
                    { name: '软垫单腿平衡', detail: '软垫上单腿站立扰动平衡，3组×20s/侧', equipment: '软垫' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: 'A训练：复合整合（周一/三/五）', totalMins: 15, blocks: [
                  { category: '复合动作', note: '9 min', moves: [
                    { name: '微蹲接前后弓步串联', detail: '半蹲后接弓步连贯控制膝对位，3组×10次', equipment: '无' },
                    { name: '保加利亚分腿蹲负重', detail: '持水壶单腿蹲控制膝，3组×8次/侧', equipment: '水壶' },
                  ]},
                  { category: '整合', note: '6 min', moves: [
                    { name: '弹力带多向行走组合', detail: '前后侧走串联巩固髋膝控制，3组×12步', equipment: '弹力带' },
                  ]},
                ]},
                { title: 'B训练：动作评估（周二/四）', totalMins: 15, blocks: [
                  { category: '单腿整合', note: '8 min', moves: [
                    { name: '单腿蹲对位评估', detail: '单腿浅蹲自检膝是否内扣，3组×8次/侧', equipment: '镜子' },
                    { name: '侧向跨步蹲连贯', detail: '左右连续侧弓步控制膝，3组×10次', equipment: '无' },
                  ]},
                  { category: '平衡评估', note: '7 min', moves: [
                    { name: '单腿多向触地计分', detail: '单腿向多向点地评估稳定，3组×9次/侧', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
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
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '坐站微蹲增次', detail: '起坐控制膝对位增加次数，3组×15次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '靠墙静蹲延时', detail: '半蹲膝对位延长保持，3组×50s', equipment: '墙' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '侧链', note: '5 min', moves: [
                    { name: '弹力带侧走加阻', detail: '加强阻力侧向步行，3组×14步', equipment: '弹力带' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '变式', note: '5 min', moves: [
                    { name: '坐站节奏蹲', detail: '慢起坐3秒离心控制膝，3组×10次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '扶椅单腿微蹲', detail: '轻扶椅背单腿浅蹲控制膝，3组×8次/侧', equipment: '办公椅' },
                  ]},
                ]},
                { title: '傍晚强化（下班前）', totalMins: 5, blocks: [
                  { category: '侧链', note: '5 min', moves: [
                    { name: '弹力带怪兽走', detail: '半蹲位带阻前后走控制膝，3组×12步', equipment: '弹力带' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '坐站接侧抬腿', detail: '起身后接侧抬腿整合控制，3组×10次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '靠墙静蹲计时挑战', detail: '半蹲膝对位尽力保持，3组×55s', equipment: '墙' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '评估', note: '5 min', moves: [
                    { name: '扶椅单腿蹲自检', detail: '单腿浅蹲自检膝对位，3组×8次/侧', equipment: '办公椅' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
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
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '6 min', moves: [
                    { name: '臀中肌+VMO激活组', detail: '蚌式+终末伸膝唤醒，2组×15次', equipment: '弹力带' },
                  ]},
                  { category: '力量强化', note: '18 min', moves: [
                    { name: '高脚杯深蹲加重', detail: '增加负荷深蹲膝对位，4组×8次', equipment: '哑铃' },
                    { name: '保加利亚分腿蹲加重', detail: '加重单腿蹲控制膝，4组×8次/侧', equipment: '哑铃' },
                    { name: '侧向跨步蹲加重', detail: '负重侧弓步控制髋膝，4组×9次/侧', equipment: '哑铃' },
                  ]},
                  { category: '整合', note: '6 min', moves: [
                    { name: '单腿罗马尼亚硬拉加重', detail: '加重单腿髋铰链控制对位，3组×8次/侧', equipment: '哑铃' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '6 min', moves: [
                    { name: '动态弓步+怪兽走', detail: '动态唤醒髋膝控制，2组×10次', equipment: '弹力带' },
                  ]},
                  { category: '变式力量', note: '18 min', moves: [
                    { name: '节奏高脚杯深蹲', detail: '3秒离心深蹲爆发起身，4组×8次', equipment: '哑铃' },
                    { name: '行走弓步', detail: '负重行走弓步控制膝对位，3组×10次/侧', equipment: '哑铃' },
                    { name: '侧向跨步蹲到提踵', detail: '侧弓步起身接提踵整合，3组×9次/侧', equipment: '哑铃' },
                  ]},
                  { category: '整合', note: '6 min', moves: [
                    { name: '单腿硬拉+触地变式', detail: '单腿髋铰链向多向触地控制，3组×8次/侧', equipment: '哑铃' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '动态热身', note: '5 min', moves: [
                    { name: '下肢综合动态热身', detail: '弓步+侧走+提踵唤醒，2组×10次', equipment: '弹力带' },
                  ]},
                  { category: '复合力量', note: '19 min', moves: [
                    { name: '高脚杯深蹲（复合）', detail: '中负荷深蹲膝对位，4组×8次', equipment: '哑铃' },
                    { name: '保加利亚分腿蹲+提膝', detail: '单腿蹲起身接提膝整合，3组×8次/侧', equipment: '哑铃' },
                    { name: '侧向跨步蹲串联', detail: '左右连续侧弓步控制膝，3组×10次', equipment: '哑铃' },
                  ]},
                  { category: '整合评估', note: '6 min', moves: [
                    { name: '单腿硬拉稳定评估', detail: '单腿髋铰链测对位稳定，3组×8次/侧', equipment: '哑铃' },
                  ]},
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
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
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
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: 'A训练：稳定深化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '功能性下蹲', note: '8 min', moves: [
                    { name: '负重功能下蹲', detail: '持物全幅深蹲维持膝对位，3组×12次', equipment: '背包' },
                    { name: '单腿深蹲减扶', detail: '减少扶持单腿下蹲控制膝，3组×8次/侧', equipment: '无' },
                  ]},
                  { category: '落地缓冲', note: '7 min', moves: [
                    { name: '单腿落地缓冲', detail: '单腿小跳落地缓冲控制膝，3组×8次/侧', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：步态深化（周二/四）', totalMins: 15, blocks: [
                  { category: '步态整合', note: '8 min', moves: [
                    { name: '爬坡走加速', detail: '上坡加快节奏维持膝对位，3组×25步', equipment: '楼梯' },
                    { name: '下台阶单腿离心', detail: '单腿缓慢下台阶离心控制膝，3组×8次/侧', equipment: '台阶' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '软垫单腿稳定', detail: '软垫上单腿站立扰动维持膝对位，3组×20s/侧', equipment: '软垫' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: 'A训练：动态挑战（周一/三/五）', totalMins: 15, blocks: [
                  { category: '功能挑战', note: '9 min', moves: [
                    { name: '跳深落地缓冲', detail: '从台阶跳下缓冲落地控制膝，3组×8次', equipment: '台阶' },
                    { name: '单腿深蹲无扶', detail: '徒手单腿深蹲控制膝不内扣，3组×6次/侧', equipment: '无' },
                  ]},
                  { category: '敏捷', note: '6 min', moves: [
                    { name: '侧向跳落地控制', detail: '侧向小跳单腿落地稳定膝，3组×8次/侧', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：步态进阶（周二/四）', totalMins: 15, blocks: [
                  { category: '步态进阶', note: '9 min', moves: [
                    { name: '快速上下楼梯', detail: '提速上下楼控制膝对位，3组×2层', equipment: '楼梯' },
                    { name: '变向行走控制', detail: '行走中急停变向维持膝对位，3组×8次', equipment: '无' },
                  ]},
                  { category: '平衡挑战', note: '6 min', moves: [
                    { name: '闭眼软垫单腿平衡', detail: '闭眼软垫单腿站立挑战本体觉，3组×20s/侧', equipment: '软垫' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: 'A训练：自动固化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '功能整合', note: '9 min', moves: [
                    { name: '蹲跳落地连贯', detail: '深蹲接跳跃落地缓冲自动控制膝，3组×8次', equipment: '无' },
                    { name: '单腿深蹲自检', detail: '单腿深蹲对镜自检膝对位，3组×6次/侧', equipment: '镜子' },
                  ]},
                  { category: '维持固化', note: '6 min', moves: [
                    { name: '日常动作迁移', detail: '将膝对位带入提物/上下楼日常，3min', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：长期评估（周二/四）', totalMins: 15, blocks: [
                  { category: '功能评估', note: '8 min', moves: [
                    { name: '下台阶离心评估', detail: '缓慢下台阶自检离心控制膝，3组×8次/侧', equipment: '台阶' },
                    { name: '单腿跳远落地评估', detail: '单腿跳远落地测稳定膝对位，3组×6次/侧', equipment: '无' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '长期步态习惯固化', detail: '建立步态自检与鞋具选择习惯', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
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
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '坐站单腿起身', detail: '尝试单腿起坐控制膝对位，3组×6次/侧', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '步态', note: '5 min', moves: [
                    { name: '爬楼梯增层', detail: '上下楼增加层数控制膝，3组×2层', equipment: '楼梯' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '扶椅单腿稳定', detail: '单腿站立扰动维持膝对位，3组×20s/侧', equipment: '办公椅' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '挑战', note: '5 min', moves: [
                    { name: '坐站节奏单腿', detail: '慢速单腿起坐控制膝，3组×6次/侧', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '步态', note: '5 min', moves: [
                    { name: '快速上下楼梯', detail: '提速上下楼控制膝对位，3组×2层', equipment: '楼梯' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '平衡', note: '5 min', moves: [
                    { name: '闭眼单腿平衡', detail: '闭眼单腿站立挑战本体觉，3组×15s/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '固化', note: '5 min', moves: [
                    { name: '坐站自动对位', detail: '自然起坐自检膝对位达成，3组×12次', equipment: '办公椅' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '步态', note: '5 min', moves: [
                    { name: '楼梯步态自检', detail: '上下楼自检膝对第二趾习惯，3组×2层', equipment: '楼梯' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: 'IT带+股四头收尾牵伸', detail: '收尾拉伸大腿外侧前侧30s/侧', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
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
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '下肢动态热身', detail: '弓步+侧走+提踵唤醒，2组×10次', equipment: '弹力带' },
                  ]},
                  { category: '功能力量', note: '17 min', moves: [
                    { name: '后蹲加重', detail: '增加负荷深蹲膝对位，4组×6次', equipment: '杠铃' },
                    { name: '箱式跳单腿落地', detail: '跳上箱单腿缓冲落地控制膝，4组×6次/侧', equipment: '跳箱' },
                    { name: '保加利亚分腿蹲加重', detail: '加重单腿蹲控制膝踝，4组×8次/侧', equipment: '哑铃' },
                  ]},
                  { category: '稳定整合', note: '8 min', moves: [
                    { name: 'BOSU单腿+扰动', detail: '不稳定面单腿站立外加抛接扰动，3组×30s/侧', equipment: 'BOSU球' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '下肢动态热身+激活', detail: '动态弓步+怪兽走唤醒髋膝，2组×10次', equipment: '弹力带' },
                  ]},
                  { category: '进阶力量', note: '17 min', moves: [
                    { name: '后蹲（爆发起身）', detail: '深蹲底部爆发起身控制膝，4组×6次', equipment: '杠铃' },
                    { name: '深跳落地缓冲', detail: '从箱跳下立即缓冲落地控制膝，4组×6次', equipment: '跳箱' },
                    { name: '侧向跨步蹲到单腿跳', detail: '侧弓步接单腿跳整合控制膝，3组×6次/侧', equipment: '哑铃' },
                  ]},
                  { category: '稳定挑战', note: '8 min', moves: [
                    { name: 'BOSU单腿微蹲', detail: '不稳定面单腿微蹲挑战膝对位，3组×8次/侧', equipment: 'BOSU球' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '动态热身', note: '5 min', moves: [
                    { name: '下肢综合动态热身', detail: '弓步+侧走+跳绳唤醒，2组×10次', equipment: '弹力带' },
                  ]},
                  { category: '整合固化', note: '17 min', moves: [
                    { name: '后蹲（中负荷固化）', detail: '中负荷深蹲自动维持膝对位，4组×8次', equipment: '杠铃/哑铃' },
                    { name: '箱跳+落地评估', detail: '箱式跳落地缓冲并自检膝对位，4组×8次', equipment: '跳箱' },
                    { name: '保加利亚分腿蹲整合', detail: '负重单腿蹲整合膝踝控制，3组×8次/侧', equipment: '哑铃' },
                  ]},
                  { category: '稳定评估', note: '8 min', moves: [
                    { name: 'BOSU单腿平衡计时评估', detail: '不稳定面单腿站立测稳定时长，3组×40s/侧', equipment: 'BOSU球' },
                  ]},
                ]},
              ]},
            ]
          }
        }
      }
    ]
  },
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
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '5 min', moves: [
                    { name: '足底筋膜球松解', detail: '坐姿脚踩球前后滚压找痛点，2min/侧', equipment: '筋膜球' },
                    { name: '小腿三头肌松解', detail: '小腿后侧沿轴滚压，1.5min/侧', equipment: '泡沫轴' },
                  ]},
                  { category: '神经激活', note: '8 min', moves: [
                    { name: '短足练习（Short Foot）', detail: '足趾不蜷缩，将前脚掌向脚跟方向轻拱内侧弓，先感受发力，保持3s，2组×8次/侧', equipment: '无' },
                    { name: '趾头抓毛巾', detail: '脚趾抓握毛巾向身体拉，2组×10次/侧', equipment: '毛巾' },
                  ]},
                  { category: '习惯纠正', note: '日常执行', moves: [
                    { name: '增加赤足时间', detail: '居家尽量赤足活动唤醒足内在肌', equipment: '无' },
                    { name: '选择宽楦薄底鞋', detail: '给足趾留空间，减少过度支撑', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：感知整合（周二/四）', totalMins: 15, blocks: [
                  { category: '激活', note: '8 min', moves: [
                    { name: '脚趾分离（大趾独立）', detail: '练习大脚趾单独上抬其余不动，先在坐姿放松状态尝试，2组×8次/侧', equipment: '无' },
                    { name: '赤足三点压力感知', detail: '坐姿/站立感受大趾球、小趾球、脚跟三点均匀受力，3组×15s', equipment: '无' },
                  ]},
                  { category: '感觉重建', note: '7 min', moves: [
                    { name: '不同材质踩踏感知', detail: '赤足踩踏地毯、地板、按摩垫感受触觉差异，3组×20s', equipment: '按摩垫' },
                    { name: '双腿静态平衡', detail: '赤足并脚闭眼站立感受足底压力，3组×20s', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '6 min', moves: [
                    { name: '足底筋膜球深层松解', detail: '加大压力沿足弓分段滚压并定点加压痛点，2.5min/侧', equipment: '筋膜球' },
                    { name: '小腿+跟腱松解', detail: '泡沫轴松小腿并向下延伸至跟腱区，2min/侧', equipment: '泡沫轴' },
                  ]},
                  { category: '神经激活', note: '7 min', moves: [
                    { name: '短足练习（延长保持）', detail: '短足拱弓保持5s，体会内侧弓抬起，3组×10次/侧', equipment: '无' },
                    { name: '趾头抓毛巾（加阻）', detail: '毛巾末端压小重物增加抓握阻力，3组×10次/侧', equipment: '毛巾' },
                  ]},
                ]},
                { title: 'B训练：感知整合（周二/四）', totalMins: 15, blocks: [
                  { category: '激活', note: '8 min', moves: [
                    { name: '脚趾分离（站姿尝试）', detail: '站立位练习大趾独立上抬，2组×10次/侧', equipment: '无' },
                    { name: '弹珠/小物抓取', detail: '脚趾抓取小物移入碗中，3组×8个/侧', equipment: '小物件' },
                  ]},
                  { category: '感觉重建', note: '7 min', moves: [
                    { name: '赤足三点压力转移', detail: '站立缓慢在三点间转移重心保持足弓，3组×20s', equipment: '无' },
                    { name: '睁眼单腿平衡', detail: '赤足睁眼单腿站立维持三点受力，3组×20s/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: 'A训练：松解+激活（周一/三/五）', totalMins: 15, blocks: [
                  { category: '筋膜松解', note: '4 min', moves: [
                    { name: '足底+小腿快速松解', detail: '滚压足底与小腿作为激活前准备，2min/侧', equipment: '筋膜球/泡沫轴' },
                  ]},
                  { category: '神经激活', note: '11 min', moves: [
                    { name: '短足练习（站姿负重）', detail: '站立单腿支撑做短足拱弓控制不旋前，3组×10次/侧', equipment: '无' },
                    { name: '提踵+短足组合', detail: '维持足弓缓慢提踵再落，3组×12次', equipment: '无' },
                    { name: '脚趾分离逐趾控制', detail: '大趾与其余趾交替上抬下压，3组×8次/侧', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：感知整合（周二/四）', totalMins: 15, blocks: [
                  { category: '激活', note: '7 min', moves: [
                    { name: '短足行走（短距）', detail: '维持短足姿态缓慢行走，3组×15步', equipment: '无' },
                  ]},
                  { category: '感觉重建', note: '8 min', moves: [
                    { name: '闭眼单腿平衡', detail: '赤足闭眼单腿站立强化本体觉，3组×15s/侧', equipment: '无' },
                    { name: '软垫双腿平衡', detail: '软垫上赤足站立维持足弓稳定，3组×20s', equipment: '软垫/枕头' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: 'A训练：整合复盘（周一/三/五）', totalMins: 15, blocks: [
                  { category: '激活整合', note: '9 min', moves: [
                    { name: '短足全流程串联', detail: '松解后立即做短足激活并保持行走，3组×12次/侧', equipment: '无' },
                    { name: '提踵+趾屈整合', detail: '提踵末端加趾屈强化前足链，3组×12次', equipment: '无' },
                  ]},
                  { category: '自评', note: '6 min', moves: [
                    { name: '足弓自评测试', detail: '湿足印或站立观察内侧弓抬起情况记录进步', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：平衡整合（周二/四）', totalMins: 15, blocks: [
                  { category: '平衡整合', note: '8 min', moves: [
                    { name: '闭眼单腿+短足', detail: '闭眼单腿站立同时维持足弓拱起，3组×20s/侧', equipment: '无' },
                    { name: '软垫单腿平衡', detail: '软垫上单腿站立挑战稳定，3组×20s/侧', equipment: '软垫/枕头' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '赤足习惯固化', detail: '将赤足与短足提示纳入日常作为长期习惯', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '桌下短足练习', detail: '脱鞋坐姿做短足拱弓体会发力，2组×8次/侧', equipment: '无' },
                  ]},
                ]},
                { title: '午间松解（午休）', totalMins: 5, blocks: [
                  { category: '松解', note: '5 min', moves: [
                    { name: '足底球滚压', detail: '脚踩小球轻柔滚压足底，2min/侧', equipment: '小球' },
                  ]},
                ]},
                { title: '傍晚习惯（下班前）', totalMins: 5, blocks: [
                  { category: '习惯', note: '5 min', moves: [
                    { name: '通勤赤足提示', detail: '到家后赤足活动增加足部刺激', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '桌下短足（延长保持）', detail: '坐姿短足拱弓保持5s，3组×10次/侧', equipment: '无' },
                  ]},
                ]},
                { title: '午间松解（午休）', totalMins: 5, blocks: [
                  { category: '松解', note: '5 min', moves: [
                    { name: '足底球定点加压', detail: '足底痛点定点加压松解，2.5min/侧', equipment: '小球' },
                  ]},
                ]},
                { title: '傍晚激活（下班前）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '桌下趾抓毛巾', detail: '脚趾抓握毛巾，3组×10次/侧', equipment: '毛巾' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '站姿短足保持', detail: '扶桌站立维持足弓拱起，3组×15s', equipment: '办公桌' },
                  ]},
                ]},
                { title: '午间强化（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '扶桌提踵', detail: '扶桌缓慢提踵控制足弓，3组×12次', equipment: '办公桌' },
                  ]},
                ]},
                { title: '傍晚平衡（下班前）', totalMins: 5, blocks: [
                  { category: '平衡', note: '5 min', moves: [
                    { name: '扶椅单腿站立', detail: '单腿站立维持足三点受力，3组×15s/侧', equipment: '办公椅' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: '晨间整合（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '短足行走（工位）', detail: '维持足弓姿态在工位附近走动，3组×15步', equipment: '无' },
                  ]},
                ]},
                { title: '午间平衡（午休）', totalMins: 5, blocks: [
                  { category: '平衡', note: '5 min', moves: [
                    { name: '单腿平衡渐脱手', detail: '单腿站立逐渐减少扶持，3组×20s/侧', equipment: '办公椅' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '足底球放松', detail: '收尾滚压足底放松，2min/侧', equipment: '小球' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '感知建立', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+筋膜松解', note: '8 min', moves: [
                    { name: '足底+小腿松解', detail: '球滚足底加泡沫轴松小腿，3min', equipment: '筋膜球/泡沫轴' },
                    { name: '踝关节活动度', detail: '屈踝绕环找全幅活动，2min', equipment: '无' },
                  ]},
                  { category: '神经肌肉激活', note: '12 min', moves: [
                    { name: '短足练习（站姿入门）', detail: '站立做短足拱弓体会发力，3组×8次/侧', equipment: '无' },
                    { name: '脚趾分离控制', detail: '大趾与其余趾分离上抬，3组×8次/侧', equipment: '无' },
                  ]},
                  { category: '力量+整合', note: '10 min', moves: [
                    { name: '提踵（双腿）', detail: '缓慢提踵控制内侧弓，3组×12次', equipment: '无' },
                    { name: '赤足平衡收尾', detail: '单腿站立维持足弓与压力均衡，3组×15s/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '加深松解', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+松解', note: '7 min', moves: [
                    { name: '足底深层+小腿松解', detail: '加压滚压足底并松解小腿跟腱，3min', equipment: '筋膜球/泡沫轴' },
                  ]},
                  { category: '激活', note: '10 min', moves: [
                    { name: '短足练习（保持加长）', detail: '短足拱弓保持5s，3组×10次/侧', equipment: '无' },
                    { name: '弹力带踝多向激活', detail: '弹力带做足背屈/内翻激活，3组×12次/侧', equipment: '弹力带' },
                  ]},
                  { category: '力量强化', note: '13 min', moves: [
                    { name: '提踵（双腿离心控制）', detail: '提踵后缓慢离心下落，3组×15次', equipment: '无' },
                    { name: '胫骨后肌抗阻内翻', detail: '弹力带做足内翻抗阻，3组×15次/侧', equipment: '弹力带' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '控制强化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '短足+踝激活组', detail: '短足练习加踝多向激活，2组×10次', equipment: '弹力带' },
                  ]},
                  { category: '力量强化', note: '17 min', moves: [
                    { name: '单腿提踵', detail: '单腿缓慢提踵控制内侧弓不塌，3组×12次/侧', equipment: '无' },
                    { name: '胫骨后肌抗阻内翻（加阻）', detail: '增加弹力带阻力做足内翻，3组×15次/侧', equipment: '弹力带' },
                    { name: '台阶提踵（全幅）', detail: '台阶边缘全幅提踵离心控制，3组×12次', equipment: '台阶' },
                  ]},
                  { category: '整合', note: '8 min', moves: [
                    { name: '赤足单腿平衡（不稳面）', detail: '平衡垫单腿站立维持足弓，3组×20s/侧', equipment: '平衡垫' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '整合巩固', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '足踝动态热身', detail: '短足+踝绕环唤醒，2组×10次', equipment: '无' },
                  ]},
                  { category: '复合力量', note: '17 min', moves: [
                    { name: '负重单腿提踵', detail: '手持哑铃单腿提踵控制足弓，4组×12次/侧', equipment: '哑铃' },
                    { name: '赤足微蹲（足弓维持）', detail: '赤足微蹲膝对第二趾维持足三点，3组×12次', equipment: '无' },
                  ]},
                  { category: '稳定整合+自评', note: '8 min', moves: [
                    { name: '平衡垫单腿+扰动', detail: '不稳面单腿站立加抛接扰动，3组×20s/侧', equipment: '平衡垫/小球' },
                    { name: '阶段足弓自评', detail: '记录提踵、平衡与足弓抬起改善情况', equipment: '无' },
                  ]},
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
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
                { title: 'A训练：足弓强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '提踵强化', note: '8 min', moves: [
                    { name: '单腿提踵', detail: '单腿缓慢提踵控制内侧弓不塌，3组×10次/侧', equipment: '无' },
                    { name: '足弓强化走（短足行走）', detail: '维持短足姿态缓慢行走，3组×20步', equipment: '无' },
                  ]},
                  { category: '足趾控制', note: '7 min', moves: [
                    { name: '脚趾分离控制', detail: '逐趾依次上抬下压，3组×8次/侧', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：平衡整合（周二/四）', totalMins: 15, blocks: [
                  { category: '平衡强化', note: '8 min', moves: [
                    { name: '单腿平衡保持', detail: '赤足单腿站立维持足三点，3组×20s/侧', equipment: '无' },
                  ]},
                  { category: '动力链整合', note: '7 min', moves: [
                    { name: '短足+微蹲', detail: '维持足弓同时微蹲，膝对第二趾，3组×10次', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: 'A训练：足弓强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '提踵强化', note: '8 min', moves: [
                    { name: '单腿提踵（增次）', detail: '单腿缓慢提踵控制足弓，3组×12次/侧', equipment: '无' },
                    { name: '短足行走（加长）', detail: '维持短足姿态行走加长距离，3组×25步', equipment: '无' },
                  ]},
                  { category: '足趾控制', note: '7 min', moves: [
                    { name: '提踵+趾屈组合', detail: '提踵末端加趾屈强化前足，3组×12次', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：平衡整合（周二/四）', totalMins: 15, blocks: [
                  { category: '平衡强化', note: '8 min', moves: [
                    { name: '踮脚单腿保持', detail: '提踵后单腿保持平衡，3组×15s/侧', equipment: '无' },
                  ]},
                  { category: '动力链整合', note: '7 min', moves: [
                    { name: '短足+微蹲（增次）', detail: '维持足弓微蹲膝对第二趾，3组×12次', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: 'A训练：足弓强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '提踵强化', note: '8 min', moves: [
                    { name: '单腿提踵（离心慢放）', detail: '单腿提踵后4秒缓慢离心下落，3组×10次/侧', equipment: '无' },
                    { name: '足趾分离控制进阶', detail: '逐趾依次上抬下压加快节奏，3组×10次/侧', equipment: '无' },
                  ]},
                  { category: '足趾控制', note: '7 min', moves: [
                    { name: '提踵+趾屈（单腿）', detail: '单腿提踵末端加趾屈，3组×10次/侧', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：平衡整合（周二/四）', totalMins: 15, blocks: [
                  { category: '平衡强化', note: '8 min', moves: [
                    { name: '单腿平衡+扰动', detail: '单腿站立同时另手抛接物，3组×20s/侧', equipment: '小球' },
                  ]},
                  { category: '动力链整合', note: '7 min', moves: [
                    { name: '短足+分腿蹲', detail: '维持足弓做分腿蹲膝对位，3组×8次/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: 'A训练：复合强化（周一/三/五）', totalMins: 15, blocks: [
                  { category: '复合提踵', note: '9 min', moves: [
                    { name: '单腿提踵+保持', detail: '单腿提踵顶峰保持2s再慢放，3组×12次/侧', equipment: '无' },
                    { name: '足弓强化走（进阶）', detail: '短足行走结合提踵推进，3组×25步', equipment: '无' },
                  ]},
                  { category: '自评', note: '6 min', moves: [
                    { name: '单腿提踵力量自评', detail: '记录单腿提踵次数与足弓维持情况', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：平衡整合（周二/四）', totalMins: 15, blocks: [
                  { category: '平衡整合', note: '8 min', moves: [
                    { name: '单腿平衡+扰动（闭眼）', detail: '闭眼单腿站立加抛接挑战，3组×20s/侧', equipment: '小球' },
                  ]},
                  { category: '动力链整合', note: '7 min', moves: [
                    { name: '短足+微蹲整合串联', detail: '微蹲起身衔接提踵维持足弓，3组×10次', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '站姿提踵', detail: '扶桌缓慢提踵控制足弓，3组×12次', equipment: '办公桌' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '短足行走', detail: '维持足弓姿态走动，3组×20步', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚平衡（下班前）', totalMins: 5, blocks: [
                  { category: '平衡', note: '5 min', moves: [
                    { name: '扶椅单腿平衡', detail: '单腿站立维持足三点受力，3组×20s/侧', equipment: '办公椅' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '站姿提踵（增次）', detail: '扶桌缓慢提踵，3组×15次', equipment: '办公桌' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '短足行走（加长）', detail: '维持足弓姿态走动加长距离，3组×25步', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚平衡（下班前）', totalMins: 5, blocks: [
                  { category: '平衡', note: '5 min', moves: [
                    { name: '扶椅单腿平衡（减扶持）', detail: '单腿站立逐渐减少扶持，3组×20s/侧', equipment: '办公椅' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '激活', note: '5 min', moves: [
                    { name: '单腿站姿提踵', detail: '扶桌单腿提踵控制足弓，3组×10次/侧', equipment: '办公桌' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '短足行走+转向', detail: '维持足弓行走并加入转向，3组×20步', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚平衡（下班前）', totalMins: 5, blocks: [
                  { category: '平衡', note: '5 min', moves: [
                    { name: '单腿平衡闭眼', detail: '单腿站立闭眼挑战，3组×15s/侧', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '单腿提踵+保持', detail: '单腿提踵顶峰保持2s，3组×10次/侧', equipment: '办公桌' },
                  ]},
                ]},
                { title: '午间整合（午休）', totalMins: 5, blocks: [
                  { category: '强化', note: '5 min', moves: [
                    { name: '短足行走综合', detail: '行走结合转向与提踵推进，3组×25步', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '足底球放松', detail: '收尾滚压足底放松，2min/侧', equipment: '小球' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '基础强化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '6 min', moves: [
                    { name: '短足+踝激活组', detail: '短足练习加踝多向激活，2组×10次', equipment: '弹力带' },
                  ]},
                  { category: '力量强化', note: '18 min', moves: [
                    { name: '负重单腿提踵', detail: '手持哑铃单腿提踵控制足弓，3组×10次/侧', equipment: '哑铃' },
                    { name: '胫骨后肌抗阻内翻', detail: '弹力带强化足内翻，3组×15次/侧', equipment: '弹力带' },
                    { name: '台阶提踵（全幅）', detail: '台阶边缘全幅提踵离心控制，3组×12次', equipment: '台阶' },
                  ]},
                  { category: '整合', note: '6 min', moves: [
                    { name: '赤足单腿平衡+蹲', detail: '不稳面单腿微蹲维持足弓，3组×8次/侧', equipment: '平衡垫' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '负荷递增', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '6 min', moves: [
                    { name: '短足+踝激活组', detail: '短足练习加踝多向激活，2组×10次', equipment: '弹力带' },
                  ]},
                  { category: '力量强化', note: '18 min', moves: [
                    { name: '负重单腿提踵（加重）', detail: '增加哑铃重量单腿提踵，4组×12次/侧', equipment: '哑铃' },
                    { name: '胫骨后肌抗阻内翻（加阻）', detail: '增加弹力带阻力做足内翻，4组×15次/侧', equipment: '弹力带' },
                    { name: '台阶提踵（离心慢放）', detail: '台阶全幅提踵后缓慢离心，3组×12次', equipment: '台阶' },
                  ]},
                  { category: '整合', note: '6 min', moves: [
                    { name: '赤足单腿平衡+蹲（增次）', detail: '不稳面单腿微蹲维持足弓，3组×10次/侧', equipment: '平衡垫' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '进阶变式', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '6 min', moves: [
                    { name: '动态短足+弓步激活', detail: '短足结合行进弓步唤醒动力链，2组×10步', equipment: '无' },
                  ]},
                  { category: '力量强化', note: '18 min', moves: [
                    { name: '负重单腿提踵（不稳面）', detail: '平衡垫上手持哑铃单腿提踵，4组×10次/侧', equipment: '哑铃/平衡垫' },
                    { name: '保加利亚分腿蹲（足弓维持）', detail: '后脚抬高分腿蹲维持前足足弓，3组×8次/侧', equipment: '哑铃' },
                    { name: '台阶提踵（单腿全幅）', detail: '单腿台阶全幅提踵离心控制，3组×10次/侧', equipment: '台阶' },
                  ]},
                  { category: '整合', note: '6 min', moves: [
                    { name: '不稳面单腿平衡+扰动', detail: '平衡垫单腿站立加抛接，3组×20s/侧', equipment: '平衡垫/小球' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '复合整合', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身+激活', note: '6 min', moves: [
                    { name: '足踝综合动态热身', detail: '短足、弓步与踝绕环串联激活，2组×10次', equipment: '无' },
                  ]},
                  { category: '复合力量', note: '18 min', moves: [
                    { name: '负重单腿提踵+保持', detail: '哑铃单腿提踵顶峰保持2s，4组×10次/侧', equipment: '哑铃' },
                    { name: '赤足深蹲（足三点维持）', detail: '赤足深蹲维持足三点受力膝对位，4组×10次', equipment: '哑铃' },
                    { name: '单腿硬拉（足弓维持）', detail: '单腿髋铰链维持足弓不塌，3组×8次/侧', equipment: '哑铃' },
                  ]},
                  { category: '稳定整合+自评', note: '6 min', moves: [
                    { name: '平衡垫单腿挑战+扰动', detail: '不稳面单腿站立加扰动，3组×25s/侧', equipment: '平衡垫' },
                    { name: '阶段力量自评', detail: '记录负重提踵与深蹲足弓维持表现', equipment: '无' },
                  ]},
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
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
                { title: 'A训练：赤足平衡（周一/三/五）', totalMins: 15, blocks: [
                  { category: '赤足站立平衡', note: '8 min', moves: [
                    { name: '赤足单腿站立平衡', detail: '赤足单腿站立维持足弓三点，3组×25s/侧', equipment: '无' },
                    { name: '闭眼赤足平衡', detail: '闭眼单腿站立强化本体觉，3组×15s/侧', equipment: '无' },
                  ]},
                  { category: '动态控制', note: '7 min', moves: [
                    { name: '赤足提踵行走', detail: '踮脚行走维持足弓与平衡，3组×20步', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：步态整合（周二/四）', totalMins: 15, blocks: [
                  { category: '功能步态整合', note: '8 min', moves: [
                    { name: '功能步态整合（足跟到趾推进）', detail: '行走时足跟落地滚动至大趾推离，3组×20步', equipment: '无' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '赤足日常习惯', detail: '将居家赤足与短足提示固化为日常', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: 'A训练：赤足平衡（周一/三/五）', totalMins: 15, blocks: [
                  { category: '赤足站立平衡', note: '8 min', moves: [
                    { name: '赤足站立平衡（不稳面）', detail: '软垫上赤足单腿站立维持足弓，3组×30s/侧', equipment: '软垫/枕头' },
                    { name: '闭眼赤足平衡（加时）', detail: '闭眼单腿站立强化本体觉，3组×20s/侧', equipment: '无' },
                  ]},
                  { category: '动态控制', note: '7 min', moves: [
                    { name: '赤足提踵行走（加长）', detail: '踮脚行走维持足弓加长距离，3组×25步', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：步态整合（周二/四）', totalMins: 15, blocks: [
                  { category: '功能步态整合', note: '8 min', moves: [
                    { name: '短足+弓步行走', detail: '维持足弓做行进弓步，3组×10步/侧', equipment: '无' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '赤足习惯深化', detail: '延长居家赤足时间并加入足趾活动', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: 'A训练：赤足平衡（周一/三/五）', totalMins: 15, blocks: [
                  { category: '赤足站立平衡', note: '8 min', moves: [
                    { name: '不稳面单腿+扰动', detail: '软垫上单腿站立加抛接扰动，3组×25s/侧', equipment: '软垫/小球' },
                    { name: '闭眼不稳面平衡', detail: '软垫上闭眼单腿站立挑战，3组×15s/侧', equipment: '软垫/枕头' },
                  ]},
                  { category: '动态控制', note: '7 min', moves: [
                    { name: '赤足提踵行走+转向', detail: '踮脚行走加入转向维持平衡，3组×20步', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：步态整合（周二/四）', totalMins: 15, blocks: [
                  { category: '功能步态整合', note: '8 min', moves: [
                    { name: '弓步行走+提踵推进', detail: '行进弓步结合提踵推离强化步态，3组×10步/侧', equipment: '无' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '多场景赤足应用', detail: '将足弓控制应用于上下楼与日常行走', equipment: '无' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: 'A训练：自动整合（周一/三/五）', totalMins: 15, blocks: [
                  { category: '自动化平衡', note: '8 min', moves: [
                    { name: '双任务单腿平衡', detail: '单腿站立同时完成简单认知任务，3组×25s/侧', equipment: '无' },
                  ]},
                  { category: '动态控制', note: '7 min', moves: [
                    { name: '功能行走自动化', detail: '自然行走中保持足弓与推进不刻意提示，3组×30步', equipment: '无' },
                  ]},
                ]},
                { title: 'B训练：长期维持（周二/四）', totalMins: 15, blocks: [
                  { category: '步态自评', note: '8 min', moves: [
                    { name: '步态与足弓自评', detail: '观察行走足跟到趾推进与足弓维持情况', equipment: '无' },
                  ]},
                  { category: '维持策略', note: '7 min', moves: [
                    { name: '长期维持计划制定', detail: '制定每周赤足与足弓训练的长期维持方案', equipment: '无' },
                  ]},
                ]},
              ]},
            ]
          },
          office: {
            frequency: '每天3次×5分钟', daysPerWeek: 5,
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '短足站立保持', detail: '站立维持足弓拱起，3组×30s', equipment: '无' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '平衡', note: '5 min', moves: [
                    { name: '单腿平衡保持', detail: '单腿站立维持足三点，3组×20s/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '足底球放松', detail: '收尾滚压足底放松，2min/侧', equipment: '小球' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '短足站立保持（延长）', detail: '站立维持足弓拱起，3组×40s', equipment: '无' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '平衡', note: '5 min', moves: [
                    { name: '单腿平衡进阶', detail: '单腿站立闭眼挑战，3组×20s/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '足底球深层放松', detail: '收尾定点松解足底，2.5min/侧', equipment: '小球' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '整合', note: '5 min', moves: [
                    { name: '单腿短足站立', detail: '单腿站立维持足弓拱起，3组×20s/侧', equipment: '无' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '平衡', note: '5 min', moves: [
                    { name: '单腿平衡+双任务', detail: '单腿站立同时处理简单任务，3组×20s/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '足底球放松', detail: '收尾滚压足底放松，2min/侧', equipment: '小球' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: '晨间激活（到岗后）', totalMins: 5, blocks: [
                  { category: '自动化', note: '5 min', moves: [
                    { name: '无提示足弓站立', detail: '日常站立自然维持足弓不刻意提示，3组×40s', equipment: '无' },
                  ]},
                ]},
                { title: '午间维持（午休）', totalMins: 5, blocks: [
                  { category: '平衡', note: '5 min', moves: [
                    { name: '单腿平衡自动化', detail: '单腿站立融入日常等候情境，3组×20s/侧', equipment: '无' },
                  ]},
                ]},
                { title: '傍晚复盘（下班前）', totalMins: 5, blocks: [
                  { category: '维持', note: '5 min', moves: [
                    { name: '足底球放松+计划', detail: '滚压足底放松并回顾长期维持习惯', equipment: '小球' },
                  ]},
                ]},
              ]},
            ]
          },
          gym: {
            frequency: '每次30分钟，每周3次', daysPerWeek: 3,
            weekPlans: [
              { week: 1, theme: '功能唤醒', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '足踝动态热身', detail: '短足+踝绕环唤醒，2组×10次', equipment: '无' },
                  ]},
                  { category: '功能力量', note: '17 min', moves: [
                    { name: '负重提踵（杠铃/史密斯）', detail: '负重全幅提踵控制足弓，4组×12次', equipment: '杠铃' },
                    { name: '赤足深蹲', detail: '赤足深蹲维持足三点受力膝对位，4组×10次', equipment: '哑铃' },
                  ]},
                  { category: '稳定整合', note: '8 min', moves: [
                    { name: '平衡垫单腿挑战', detail: '不稳面单腿站立维持足弓，3组×25s/侧', equipment: '平衡垫' },
                  ]},
                ]},
              ]},
              { week: 2, theme: '稳定深化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '足踝动态热身', detail: '短足+踝绕环唤醒，2组×10次', equipment: '无' },
                  ]},
                  { category: '功能力量', note: '17 min', moves: [
                    { name: '负重提踵（离心慢放）', detail: '负重全幅提踵后缓慢离心，4组×12次', equipment: '杠铃' },
                    { name: '赤足深蹲（加重）', detail: '增加负重赤足深蹲维持足三点，4组×10次', equipment: '哑铃' },
                    { name: '单腿硬拉（足弓维持）', detail: '单腿髋铰链维持足弓不塌，3组×8次/侧', equipment: '哑铃' },
                  ]},
                  { category: '稳定整合', note: '8 min', moves: [
                    { name: '平衡垫单腿+扰动', detail: '不稳面单腿站立加抛接扰动，3组×25s/侧', equipment: '平衡垫/小球' },
                  ]},
                ]},
              ]},
              { week: 3, theme: '挑战进阶', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '足踝综合动态热身', detail: '短足、弓步与踝绕环串联激活，2组×10次', equipment: '无' },
                  ]},
                  { category: '功能力量', note: '17 min', moves: [
                    { name: '负重单腿提踵（不稳面）', detail: '平衡垫上负重单腿提踵控制足弓，4组×10次/侧', equipment: '哑铃/平衡垫' },
                    { name: '赤足跳跃落地控制', detail: '赤足小幅跳跃落地缓冲维持足弓，3组×8次', equipment: '无' },
                    { name: '单腿硬拉+触地', detail: '单腿硬拉触地维持足弓增加幅度，3组×8次/侧', equipment: '哑铃' },
                  ]},
                  { category: '稳定整合', note: '8 min', moves: [
                    { name: '不稳面单腿+多向扰动', detail: '平衡垫单腿站立多方向扰动，3组×30s/侧', equipment: '平衡垫' },
                  ]},
                ]},
              ]},
              { week: 4, theme: '自动固化', sessions: [
                { title: '完整训练（周一/三/五）', totalMins: 30, blocks: [
                  { category: '热身', note: '5 min', moves: [
                    { name: '足踝综合动态热身', detail: '短足、弓步与踝绕环串联激活，2组×10次', equipment: '无' },
                  ]},
                  { category: '复合功能力量', note: '17 min', moves: [
                    { name: '负重提踵（杠铃顶峰保持）', detail: '负重全幅提踵顶峰保持2s，4组×12次', equipment: '杠铃' },
                    { name: '赤足深蹲+起跳', detail: '赤足深蹲衔接起跳落地控制足弓，3组×8次', equipment: '无' },
                    { name: '单腿硬拉（足弓自动维持）', detail: '单腿髋铰链不刻意提示维持足弓，3组×8次/侧', equipment: '哑铃' },
                  ]},
                  { category: '稳定整合+自评', note: '8 min', moves: [
                    { name: '平衡垫单腿挑战+扰动', detail: '不稳面单腿站立加扰动，3组×30s/侧', equipment: '平衡垫' },
                    { name: '综合功能自评', detail: '记录足弓、平衡与步态自动化改善并制定维持计划', equipment: '无' },
                  ]},
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
