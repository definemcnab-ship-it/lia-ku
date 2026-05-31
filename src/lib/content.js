// 斯俪 Slique 静态内容数据 —— 动作库、法律协议、饮食方案。
// 与产品方案《斯俪 Slique》§4 体态分类 / §5 报告 / §8 饮食 / §11-12 合规对齐。

// —— 动作库（七大体态分类 → 三级动作详情） ——
export const LIBRARY = [
  {
    id: 'upper-crossed', name: '上交叉综合征', en: 'Upper Crossed', color: 'bg-[#e9e2d4] text-on-surface-variant',
    desc: '头前引、圆肩、含胸——长期伏案的典型代偿。目标：放松胸小肌与上斜方，强化深层颈屈肌与中下斜方。',
    exercises: [
      { name: '下巴后缩', dur: '3 组 × 15 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['坐直或靠墙站立，目视前方', '下巴水平向后收，做出"双下巴"', '保持 2 秒，感受颈后伸展', '缓慢回到起始位'],
        breath: '后缩时吐气，回位时吸气', tip: '不要低头，保持视线水平。' },
      { name: '弹力带划船', dur: '3 组 × 12 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['弹力带固定于胸前高度', '双手握带，肘部贴近身体', '向后拉至肩胛骨夹紧', '控制 2 秒缓慢还原'],
        breath: '后拉吐气，还原吸气', tip: '想象用背夹住一支笔，避免耸肩。' },
      { name: '墙角胸大肌拉伸', dur: '2 组 × 30 秒', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['面向墙角，双臂呈门框状贴墙', '身体缓慢前倾', '感受胸前牵拉，停留', '换手臂高度重复'],
        breath: '均匀深呼吸，吐气时加深拉伸', tip: '出现刺痛立即停止。' },
      { name: '俯卧 Y-T-W', dur: '3 组 × 10 次', level: '挑战', lc: 'bg-primary text-on-primary',
        steps: ['俯卧，额头轻贴垫面', '手臂依次摆出 Y / T / W 三个字母', '每个位置肩胛主动后缩', '全程拇指朝上'],
        breath: '抬起吐气，落下吸气', tip: '腰部不要发力代偿，动作宜慢。' },
    ],
  },
  {
    id: 'lower-crossed', name: '下交叉综合征', en: 'Lower Crossed', color: 'bg-[#dfe3dd] text-on-surface-variant',
    desc: '骨盆前倾、腰椎过度前凸。目标：放松髂腰肌与竖脊肌，强化臀大肌与核心。',
    exercises: [
      { name: '臀桥', dur: '3 组 × 15 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['仰卧屈膝，双脚与髋同宽', '收紧臀部抬起骨盆', '顶端停留 1 秒', '逐节落下脊柱'],
        breath: '抬起吐气，落下吸气', tip: '用臀部发力而非腰部。' },
      { name: '死虫式', dur: '3 组 × 12 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['仰卧，手臂指向天花板', '对侧手脚缓慢伸出', '下背始终贴地', '换边交替'],
        breath: '伸出吐气，收回吸气', tip: '腰部一旦离地就缩小幅度。' },
      { name: '髂腰肌弓步拉伸', dur: '2 组 × 30 秒', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['弓步跪姿，后腿髋部下沉', '收紧后侧臀部', '骨盆后倾感受髋前伸展', '换边'],
        breath: '均匀呼吸，吐气加深', tip: '上身保持直立，不要塌腰。' },
    ],
  },
  {
    id: 'diastasis', name: '产后腹直肌分离', en: 'Diastasis Recti', color: 'bg-[#ece0d8] text-on-surface-variant',
    desc: '产后腹白线松弛、腹直肌分离。目标：唤醒腹横肌，避免卷腹等增加腹压的动作。',
    exercises: [
      { name: '腹式呼吸激活', dur: '3 组 × 10 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['仰卧屈膝，双手放于腹部', '吸气腹部鼓起', '吐气时收紧下腹、肚脐内收', '感受腹横肌收缩'],
        breath: '4 秒吸、6 秒吐，缓慢绵长', tip: '产后需经医生评估后再训练。' },
      { name: '脚跟滑动', dur: '3 组 × 10 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['仰卧屈膝，收紧核心', '一侧脚跟缓慢滑出伸直', '腹部保持收紧、腰不离地', '收回换边'],
        breath: '滑出吐气，收回吸气', tip: '腹部凸起（顶起）说明腹压过大，减小幅度。' },
    ],
  },
  {
    id: 'scoliosis', name: '脊柱侧弯', en: 'Scoliosis', color: 'bg-[#e7e4ea] text-on-surface-variant',
    desc: '脊柱左右不对称。原型仅提供温和对称性训练，结构性侧弯请遵医嘱。',
    exercises: [
      { name: '猫牛式', dur: '3 组 × 10 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['四足跪姿，手腕在肩下', '吸气塌腰抬头（牛）', '吐气拱背低头（猫）', '脊柱逐节活动'],
        breath: '随动作节奏配合呼吸', tip: '动作轻柔，活动度优先。' },
      { name: '单侧侧平板', dur: '2 组 × 20 秒', level: '挑战', lc: 'bg-primary text-on-primary',
        steps: ['侧卧，肘在肩下支撑', '抬髋使身体成直线', '保持核心收紧', '换边时间一致'],
        breath: '保持均匀呼吸不憋气', tip: '凹侧多练有助对称，遵专业指导。' },
    ],
  },
  {
    id: 'shoulder', name: '高低肩 / 翼状肩胛', en: 'Shoulder Imbalance', color: 'bg-[#e4e6ea] text-on-surface-variant',
    desc: '双肩高低不一、肩胛内侧翘起。目标：强化前锯肌与下斜方，建立肩胛稳定。',
    exercises: [
      { name: '靠墙天使', dur: '3 组 × 12 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['后背贴墙，手臂呈 W', '手臂沿墙上滑成 Y', '全程手背贴墙', '缓慢下滑还原'],
        breath: '上滑吸气，下滑吐气', tip: '腰部贴墙，避免拱起。' },
      { name: '前锯肌推墙', dur: '3 组 × 15 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['俯身手撑墙', '保持手肘伸直', '主动外推使上背隆起', '回收使肩胛靠拢'],
        breath: '前推吐气，回收吸气', tip: '感受肩胛"包住"肋骨。' },
    ],
  },
  {
    id: 'leg', name: '膝超伸 / X·O 型腿', en: 'Leg Alignment', color: 'bg-[#ebe6d6] text-on-surface-variant',
    desc: '膝关节过伸或腿型不正。目标：强化臀中肌与腘绳肌，改善下肢力线。',
    exercises: [
      { name: '蚌式开合', dur: '3 组 × 15 次', level: '基础', lc: 'bg-surface-container text-outline',
        steps: ['侧卧屈膝，双脚并拢', '上侧膝盖向上打开', '骨盆保持稳定不后翻', '控制还原'],
        breath: '打开吐气，还原吸气', tip: '感受臀部外侧发力。' },
      { name: '靠墙静蹲', dur: '3 组 × 30 秒', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant',
        steps: ['后背贴墙，下蹲至大腿接近水平', '膝盖不超过脚尖', '保持膝盖朝向脚尖', '稳定呼吸坚持'],
        breath: '保持均匀呼吸不憋气', tip: '膝盖不要内扣。' },
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
