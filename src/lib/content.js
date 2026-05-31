// 斯俪 Slique 静态内容数据 —— 动作库、法律协议、饮食方案。
// 与产品方案《斯俪 Slique》§4 体态分类 / §5 报告 / §8 饮食 / §11-12 合规对齐。

// —— 动作库（七大体态分类 → 三级动作详情） ——
export const LIBRARY = [
  {
    id: 'upper-crossed', name: '上交叉综合征', en: 'Upper Crossed', color: 'bg-[#e9e2d4] text-on-surface-variant',
    desc: '头前引、圆肩、含胸——长期伏案的典型代偿。目标：放松胸小肌与上斜方，强化深层颈屈肌与中下斜方。',
    exercises: [
      { name: '天鹅颈塑形', dur: '3 组 × 15 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['坐直或靠墙站立，目视前方', '下巴水平向后收，做出"双下巴"', '保持 2 秒，感受颈后伸展', '缓慢回到起始位'],
        breath: '后缩时吐气，回位时吸气', tip: '不要低头，保持视线水平。' },
      { name: '展翼开肩·背部唤醒', dur: '3 组 × 12 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['弹力带固定于胸前高度', '双手握带，肘部贴近身体', '向后拉至肩胛骨夹紧', '控制 2 秒缓慢还原'],
        breath: '后拉吐气，还原吸气', tip: '想象展开翅膀把双肩向后打开，避免耸肩。' },
      { name: '胸廓绽放·芭蕾开胸', dur: '2 组 × 30 秒', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['面向墙角，双臂呈门框状贴墙', '身体缓慢前倾', '感受胸廓如花绽放，停留', '换手臂高度重复'],
        breath: '均匀深呼吸，吐气时加深拉伸', tip: '出现刺痛立即停止。' },
      { name: '背部雕塑·振翅式', dur: '3 组 × 10 次', level: '挑战', lc: 'bg-primary text-on-primary',
        steps: ['俯卧，额头轻贴垫面', '手臂依次摆出 Y / T / W 三个字母', '每个位置肩胛主动后缩', '全程拇指朝上'],
        breath: '抬起吐气，落下吸气', tip: '腰部不要发力代偿，动作宜慢。' },
      { name: '颈肩松绑·优雅侧弯', dur: '2 组 × 30 秒', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['坐姿，一手扶头另侧', '头部缓慢向对侧倾斜', '感受颈侧延展，停留', '缓慢回正换边'],
        breath: '均匀深呼吸，吐气加深', tip: '不要耸肩，对侧肩膀下沉。' },
      { name: '深层塑颈·点头唤醒', dur: '3 组 × 12 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['仰卧屈膝，后脑贴地', '做轻微"点头"动作', '感受喉咙下方深层发力', '保持 3 秒缓慢回'],
        breath: '点头吐气，回位吸气', tip: '幅度极小，避免浅层肌肉代偿。' },
      { name: '脊柱绽放·后仰伸展', dur: '2 组 × 8 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['泡沫轴横置于上背', '双手抱头支撑颈部', '上背缓慢后仰伸展', '逐节向上移动滚动'],
        breath: '后仰吐气，回正吸气', tip: '腰部不要塌陷，核心轻收。' },
    ],
  },
  {
    id: 'lower-crossed', name: '下交叉综合征', en: 'Lower Crossed', color: 'bg-[#dfe3dd] text-on-surface-variant',
    desc: '骨盆前倾、腰椎过度前凸。目标：放松髂腰肌与竖脊肌，强化臀大肌与核心。',
    exercises: [
      { name: '蜜桃翘臀唤醒', dur: '3 组 × 15 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['仰卧屈膝，双脚与髋同宽', '收紧臀部抬起骨盆', '顶端停留 1 秒，感受臀峰收紧', '逐节落下脊柱'],
        breath: '抬起吐气，落下吸气', tip: '想象把尾骨向天花板推，臀部主导发力。' },
      { name: '核心深层激活·协调律动', dur: '3 组 × 12 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['仰卧，手臂指向天花板', '对侧手脚缓慢伸出', '下背始终贴地', '换边交替'],
        breath: '伸出吐气，收回吸气', tip: '腰部一旦离地就缩小幅度。' },
      { name: '骨盆解锁·弓步伸展', dur: '2 组 × 30 秒', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['弓步跪姿，后腿髋部下沉', '收紧后侧臀部', '骨盆后倾感受髋前延展', '换边'],
        breath: '均匀呼吸，吐气加深', tip: '感受腰腹前侧被打开、前倾减少。' },
      { name: '腰曲归位·卷腹律动', dur: '3 组 × 15 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['仰卧屈膝，双手放髋两侧', '收腹将下背压向地面', '骨盆轻微后倾', '保持 2 秒缓慢放松'],
        breath: '后倾吐气，放松吸气', tip: '用腹部而非臀部主导。' },
      { name: '脊柱稳定·猎鸟平衡', dur: '3 组 × 10 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['四足跪姿，核心收紧', '对侧手脚同时伸出成直线', '保持骨盆水平不晃', '收回换边'],
        breath: '伸出吐气，收回吸气', tip: '想象背上放杯水不洒出。' },
      { name: '翘臀雕刻·后腿抬升', dur: '3 组 × 12 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['四足跪姿，一腿屈膝', '脚跟向天花板方向抬起', '顶端夹紧臀部', '控制还原不塌腰'],
        breath: '抬腿吐气，还原吸气', tip: '腰不要反弓，发力集中在臀峰。' },
    ],
  },
  {
    id: 'diastasis', name: '产后腹直肌分离', en: 'Diastasis Recti', color: 'bg-[#ece0d8] text-on-surface-variant',
    desc: '产后腹白线松弛、腹直肌分离。目标：唤醒腹横肌，避免卷腹等增加腹压的动作。',
    exercises: [
      { name: '腹腔唤醒·深呼吸疗愈', dur: '3 组 × 10 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['仰卧屈膝，双手放于腹部', '吸气腹部鼓起', '吐气时收紧下腹、肚脐内收', '感受腹横肌收缩'],
        breath: '4 秒吸、6 秒吐，缓慢绵长', tip: '产后需经医生评估后再训练。' },
      { name: '核心复苏·滑动训练', dur: '3 组 × 10 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['仰卧屈膝，收紧核心', '一侧脚跟缓慢滑出伸直', '腹部保持收紧、腰不离地', '收回换边'],
        breath: '滑出吐气，收回吸气', tip: '腹部凸起说明腹压过大，减小幅度。' },
      { name: '腰腹收紧·骨盆协调', dur: '3 组 × 10 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['仰卧或坐姿，放松呼吸', '吐气时同时收紧盆底与下腹', '想象把肚脐"扣向脊柱"', '保持 5 秒缓慢放松'],
        breath: '收紧时吐气，放松时吸气', tip: '产后修复核心动作，循序渐进。' },
      { name: '墙感塑腹·立体感知', dur: '3 组 × 12 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['背靠墙站立，腰部贴墙', '吐气收紧下腹使腰更贴墙', '保持骨盆中立', '维持 3 秒放松'],
        breath: '收腹吐气，放松吸气', tip: '避免憋气与耸肩。' },
      { name: '平板稳核·跪姿修炼', dur: '3 组 × 20 秒', level: '挑战', lc: 'bg-primary text-on-primary',
        steps: ['跪姿前臂撑地', '身体从头到膝成直线', '收紧下腹不让腰下沉', '均匀呼吸保持'],
        breath: '保持均匀呼吸不憋气', tip: '腹部出现凸起即停止，避免分离加重。' },
    ],
  },
  {
    id: 'scoliosis', name: '脊柱侧弯', en: 'Scoliosis', color: 'bg-[#e7e4ea] text-on-surface-variant',
    desc: '脊柱左右不对称。原型仅提供温和对称性训练，结构性侧弯请遵医嘱。',
    exercises: [
      { name: '脊柱流动·猫牛呼吸', dur: '3 组 × 10 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['四足跪姿，手腕在肩下', '吸气塌腰抬头（牛）', '吐气拱背低头（猫）', '脊柱逐节活动'],
        breath: '随动作节奏配合呼吸', tip: '动作轻柔，感受脊柱逐节打开。' },
      { name: '侧腰铁板·对称均衡', dur: '2 组 × 20 秒', level: '挑战', lc: 'bg-primary text-on-primary',
        steps: ['侧卧，肘在肩下支撑', '抬髋使身体成直线', '保持核心收紧', '换边时间一致'],
        breath: '保持均匀呼吸不憋气', tip: '凹侧多练有助对称，遵专业指导。' },
      { name: '体侧延展·优雅侧弯', dur: '2 组 × 8 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['站姿或坐姿，一手上举', '身体向对侧缓慢侧弯', '感受体侧如丝带般延伸', '回正换边'],
        breath: '侧弯吐气，回正吸气', tip: '凸侧一般多做侧伸，遵医嘱方向。' },
      { name: '脊柱均衡·单臂延伸', dur: '3 组 × 10 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['四足跪姿，脊柱中立', '单臂前伸贴近地面', '保持骨盆稳定', '缓慢收回换边'],
        breath: '伸出吐气，收回吸气', tip: '体会脊柱两侧均衡延展。' },
      { name: '脊柱增高·贴墙塑姿', dur: '2 组 × 30 秒', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['背靠墙站立，后脑贴墙', '想象头顶向上无限延伸', '肩膀放松下沉', '保持均匀呼吸'],
        breath: '缓慢深长呼吸', tip: '感受自己在"长高"，建立优雅脊柱。' },
    ],
  },
  {
    id: 'shoulder', name: '高低肩 / 翼状肩胛', en: 'Shoulder Imbalance', color: 'bg-[#e4e6ea] text-on-surface-variant',
    desc: '双肩高低不一、肩胛内侧翘起。目标：强化前锯肌与下斜方，建立肩胛稳定。',
    exercises: [
      { name: '肩胛解锁·天使展臂', dur: '3 组 × 12 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['后背贴墙，手臂呈 W', '手臂沿墙上滑成 Y', '全程手背贴墙', '缓慢下滑还原'],
        breath: '上滑吸气，下滑吐气', tip: '感受双肩像天使展翼一样打开。' },
      { name: '肩背稳定·前推激活', dur: '3 组 × 15 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['俯身手撑墙', '保持手肘伸直', '主动外推使上背隆起', '回收使肩胛靠拢'],
        breath: '前推吐气，回收吸气', tip: '感受肩胛"包住"肋骨。' },
      { name: '肩部松绑·云朵绕环', dur: '2 组 × 10 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['站姿放松，双肩同时上提', '向后缓慢绕环下沉', '感受斜方肌松解', '反向重复'],
        breath: '上提吸气，下沉吐气', tip: '高肩侧可单侧多做下沉。' },
      { name: '美背雕塑·V 字激活', dur: '3 组 × 12 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['俯卧，手臂呈 V 字外展', '拇指朝上抬起手臂', '主动将肩胛向下后收', '控制还原'],
        breath: '抬起吐气，落下吸气', tip: '感受肩胛"向裤兜方向"下沉。' },
      { name: '开肩归位·外旋塑形', dur: '3 组 × 12 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['手肘贴身屈 90 度', '握弹力带做向外旋转', '肩胛保持稳定下沉', '缓慢还原'],
        breath: '外旋吐气，还原吸气', tip: '肘部始终夹紧身体一侧。' },
    ],
  },
  {
    id: 'leg', name: '膝超伸 / X·O 型腿', en: 'Leg Alignment', color: 'bg-[#ebe6d6] text-on-surface-variant',
    desc: '膝关节过伸或腿型不正。目标：强化臀中肌与腘绳肌，改善下肢力线。',
    exercises: [
      { name: '臀外侧塑形·蚌式开合', dur: '3 组 × 15 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['侧卧屈膝，双脚并拢', '上侧膝盖向上打开', '骨盆保持稳定不后翻', '控制还原'],
        breath: '打开吐气，还原吸气', tip: '感受臀部外侧收紧塑形。' },
      { name: '腿型归正·靠墙深蹲', dur: '3 组 × 30 秒', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['后背贴墙，下蹲至大腿接近水平', '膝盖不超过脚尖', '保持膝盖朝向脚尖', '稳定呼吸坚持'],
        breath: '保持均匀呼吸不憋气', tip: '膝盖不要内扣。' },
      { name: '侧腰收紧·抬腿雕刻', dur: '3 组 × 15 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['侧卧，下腿屈膝稳定', '上腿伸直向上抬起', '脚尖朝前不要外翻', '控制还原换边'],
        breath: '抬腿吐气，还原吸气', tip: 'O 型腿尤需强化臀中肌。' },
      { name: '后侧链唤醒·离心控制', dur: '3 组 × 10 次', level: '挑战', lc: 'bg-primary text-on-primary',
        steps: ['仰卧屈膝做臀桥姿', '单腿支撑缓慢下放骨盆', '感受大腿后侧控制', '换边'],
        breath: '下放吸气，抬起吐气', tip: '膝超伸者强化后侧链很关键。' },
      { name: '足弓重建·地基塑形', dur: '3 组 × 12 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['坐姿赤足踩地', '脚趾不卷曲，主动抬起足弓', '把脚掌"缩短"', '保持 3 秒放松'],
        breath: '收足弓吐气，放松吸气', tip: '改善下肢力线从足部地基开始。' },
    ],
  },
]

export function findCategory(id) {
  return LIBRARY.find(c => c.id === id)
}

// —— 法律协议（§11 数据合规 / §12 隐私） ——
export const LEGAL = {
  user: {
    title: '用户协议', updated: '2026-05-30',
    intro: '欢迎使用斯俪 Slique。在使用本应用前，请仔细阅读本协议。',
    sections: [
      { h: '一、服务内容', p: '斯俪 Slique 提供体态自测、矫正训练计划、进步追踪与饮食建议等功能。本应用为健康管理工具，不构成医疗诊断或治疗建议。' },
      { h: '二、健康免责', p: '训练前请确保身体状况适宜运动。如有孕期、产后、慢性疾病或疼痛，请先咨询专业医生。训练中出现不适应立即停止。' },
      { h: '三、账号与使用规范', p: '请妥善保管账号信息。您应对账号下的全部行为负责，不得用于任何违法用途。' },
      { h: '四、知识产权', p: '应用内训练内容、文案、设计与算法模型均归斯俪所有，未经授权不得复制或商用。' },
    ],
  },
  privacy: {
    title: '隐私政策', updated: '2026-05-30',
    intro: '我们高度重视您的隐私。本政策说明我们如何收集、使用与保护您的个人信息。',
    sections: [
      { h: '一、我们收集的信息', p: '体态照片、自测结果、训练打卡与饮食记录。本原型版本数据仅存储在您的手机本地（localStorage），不上传任何服务器。' },
      { h: '二、信息用途', p: '用于生成体态报告、训练计划与进步曲线，仅服务于您的个人体态管理。' },
      { h: '三、您的权利', p: '您可随时在「我的 → 清除本地数据」一键删除全部记录，亦可在「体态照片管理」中单独删除照片。' },
      { h: '四、未成年人保护', p: '本应用面向成年女性用户。若您未满 18 周岁，请在监护人指导下使用。' },
      { h: '五、合规承诺', p: '我们遵循《个人信息保护法》最小必要原则，绝不向第三方出售您的个人信息。' },
    ],
  },
  data: {
    title: '数据采集协议', updated: '2026-05-30',
    intro: '为提供体态分析服务，我们需要在您授权后采集以下数据。您可拒绝，但部分功能将不可用。',
    sections: [
      { h: '一、体态照片', p: '用于 AI 姿态识别与体态评分。照片在本原型中仅保存在本机，分析过程在端侧模拟完成。' },
      { h: '二、身体基础信息', p: '身高、体重、生理周期等（可选），用于个性化训练与周期适配。您可随时修改或删除。' },
      { h: '三、训练与饮食行为', p: '打卡记录、完成度、三餐记录，用于生成进步曲线与饮食建议。' },
      { h: '四、授权与撤回', p: '勾选即表示您同意上述采集范围。您可随时在系统设置或本应用内撤回授权。' },
    ],
  },
}

// —— 饮食方案详情（§8 体态 × 营养） ——
export const DIET_PLANS = [
  {
    id: 'upper-crossed', issue: '上交叉综合征', focus: '钙 + 维 D',
    why: '圆肩含胸常伴随胸椎活动度下降，充足的钙与维生素 D 有助维持骨骼健康与肌肉收缩功能。',
    foods: ['牛奶 / 酸奶', '深海鱼（三文鱼、沙丁鱼）', '蛋黄', '强化维 D 食品', '晒太阳 15 分钟'],
    avoid: ['过量咖啡因（影响钙吸收）'],
    day: { 早餐: '牛奶燕麦 + 水煮蛋', 午餐: '清蒸三文鱼 + 西兰花', 晚餐: '豆腐蔬菜汤 + 糙米饭', 加餐: '一小把杏仁' },
  },
  {
    id: 'pelvic', issue: '骨盆前倾', focus: '抗炎饮食',
    why: '骨盆前倾常伴腰部紧张，抗炎饮食有助缓解软组织炎症、改善恢复。',
    foods: ['蓝莓 / 莓果', '姜黄', '橄榄油', '深绿叶菜', 'Omega-3 鱼类'],
    avoid: ['高糖加工食品', '反式脂肪', '过量精制碳水'],
    day: { 早餐: '莓果希腊酸奶', 午餐: '橄榄油拌沙拉 + 鸡胸', 晚餐: '姜黄炖鱼 + 时蔬', 加餐: '核桃几颗' },
  },
  {
    id: 'diastasis', issue: '产后腹直肌分离', focus: '胶原蛋白 + 优质蛋白',
    why: '产后结缔组织修复需要充足蛋白质与维生素 C 协同合成胶原。',
    foods: ['骨汤', '鸡蛋', '鱼类 / 鸡胸', '柑橘（维 C）', '豆制品'],
    avoid: ['酒精', '过度节食'],
    day: { 早餐: '蒸蛋 + 全麦面包', 午餐: '鸡胸藜麦碗 + 橙子', 晚餐: '骨汤煮鱼 + 青菜', 加餐: '无糖豆浆' },
  },
  {
    id: 'scoliosis', issue: '脊柱侧弯', focus: '钙镁平衡',
    why: '钙镁协同维持神经肌肉正常功能，有助脊柱周围肌肉的稳定与放松。',
    foods: ['绿叶蔬菜', '坚果（南瓜子、杏仁）', '豆类', '全谷物', '乳制品'],
    avoid: ['过咸饮食（增加钙流失）'],
    day: { 早餐: '杂粮粥 + 凉拌菠菜', 午餐: '鹰嘴豆沙拉 + 糙米', 晚餐: '清炒西兰花 + 豆腐', 加餐: '南瓜子一把' },
  },
]

export function findDietPlan(id) {
  return DIET_PLANS.find(p => p.id === id)
}

// —— 斯俪分阶梯等级（按累计打卡天数解锁，对应专属权益） ——
// 以"月相"为视觉隐喻，呼应女性周期与渐进成长。
export const SLIQUE_LEVELS = [
  {
    id: 'l1', name: '初遇', en: 'First Light', need: 0, icon: 'wb_sunny', color: 'bg-[#ece8e0]',
    perk: '体态自测 + 基础训练库', reward: '新人 7 天陪伴计划',
  },
  {
    id: 'l2', name: '晨星', en: 'Morning Star', need: 3, icon: 'wb_sunny', color: 'bg-[#e9e2d4]',
    perk: '解锁进阶动作 · 进步曲线', reward: '8 折训练好物券',
  },
  {
    id: 'l3', name: '新月', en: 'New Moon', need: 7, icon: 'bedtime', color: 'bg-[#dfe3dd]',
    perk: '周期适配训练 · 饮食日历', reward: '定制弹力带礼包',
  },
  {
    id: 'l4', name: '上弦', en: 'First Quarter', need: 15, icon: 'bedtime', color: 'bg-[#e7e4ea]',
    perk: '专属体态报告解读', reward: '线上私教 1 次',
  },
  {
    id: 'l5', name: '满月', en: 'Full Moon', need: 30, icon: 'bedtime', color: 'bg-[#ebe6d6]',
    perk: '挑战动作全解锁', reward: '斯俪瑜伽垫周边',
  },
  {
    id: 'l6', name: '星河', en: 'Galaxy', need: 60, icon: 'auto_awesome', color: 'bg-[#e4e6ea]',
    perk: '终身会员 · 年度体态档案', reward: '季度体态私教营名额',
  },
]

// —— 社群圈子（运营内容，营造活跃氛围） ——
export const COMMUNITY_TOPICS = [
  { id: 'rec', label: '推荐' },
  { id: 'same', label: '同阶段' },
  { id: 'checkin', label: '打卡' },
  { id: 'qa', label: '答疑' },
]

export const COMMUNITY_POSTS = [
  {
    id: 'c1', topic: 'checkin', name: '安妮Annie', level: '满月', avatarBg: 'bg-[#ece0d8]',
    time: '8 分钟前', tag: '圆肩矫正',
    text: '坚持靠墙天使 30 天打卡✅ 今天体态分终于到 90 了！同事说我背挺拔了好多，姐妹们一起冲～',
    img: 'bg-gradient-to-br from-[#e9e2d4] to-[#d8cfbf]', imgIcon: 'self_improvement',
    likes: 128, comments: 32, liked: false,
  },
  {
    id: 'c2', topic: 'qa', name: '柠檬不酸', level: '上弦', avatarBg: 'bg-[#dfe3dd]',
    time: '25 分钟前', tag: '骨盆前倾',
    text: '请问下死虫式练的时候腰一直会离地是怎么回事呀？是核心力量不够吗？有没有姐妹有经验分享一下🙏',
    img: null,
    likes: 46, comments: 18, liked: false,
  },
  {
    id: 'c3', topic: 'checkin', name: 'momo妈妈', level: '新月', avatarBg: 'bg-[#e7e4ea]',
    time: '1 小时前', tag: '产后修复',
    text: '产后第 6 周，按照斯俪的腹式呼吸 + 脚跟滑动方案练了两周，腹直肌分离从三指缩到两指了！循序渐进真的有用💪',
    img: 'bg-gradient-to-br from-[#ece0d8] to-[#d8c4b8]', imgIcon: 'favorite',
    likes: 215, comments: 56, liked: false,
  },
  {
    id: 'c4', topic: 'same', name: '小鹿乱撞', level: '晨星', avatarBg: 'bg-[#ebe6d6]',
    time: '2 小时前', tag: '高低肩',
    text: '新手第三天报到～原来我一直是右肩高，AI 扫描出来差了 11mm😲 准备跟着下斜方激活练起来，求监督！',
    img: null,
    likes: 33, comments: 9, liked: false,
  },
  {
    id: 'c5', topic: 'qa', name: '理疗师·林', level: '星河', avatarBg: 'bg-[#e4e6ea]', pro: true,
    time: '3 小时前', tag: '专业答疑',
    text: '【科普】很多姐妹问圆肩能不能自己练好。结论：功能性圆肩通过放松胸小肌+强化中下斜方，多数 8-12 周可见明显改善；但若是结构性问题建议先就医评估～',
    img: null,
    likes: 402, comments: 88, liked: false,
  },
]

// 根据累计打卡数计算当前等级、下一级与进度。
export function computeLevel(total = 0) {
  let idx = 0
  for (let i = 0; i < SLIQUE_LEVELS.length; i++) {
    if (total >= SLIQUE_LEVELS[i].need) idx = i
  }
  const current = SLIQUE_LEVELS[idx]
  const next = SLIQUE_LEVELS[idx + 1] || null
  const span = next ? next.need - current.need : 1
  const done = next ? total - current.need : 1
  const progress = next ? Math.min(1, done / span) : 1
  const remain = next ? Math.max(0, next.need - total) : 0
  return { index: idx, current, next, progress, remain }
}
