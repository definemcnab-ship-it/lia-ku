#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把体态照片合成为带标注的评估示范图（正/侧/背）。"""
from PIL import Image, ImageDraw, ImageFont

FB = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
FR = "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"
FM = "/usr/share/fonts/opentype/noto/NotoSansCJK-Medium.ttc"

# 统一暖色极简风（与 App 主题一致），去蓝
BLUE = (192, 138, 125)   # 主强调色：暖陶土（沿用变量名）
DARK = (43, 39, 32)      # 标题深褐
GREY = (122, 114, 102)   # 正文暖灰
RED  = (188, 112, 96)    # 标志点：陶土红
BG   = (247, 245, 240)   # 背景暖白
CARD = (240, 236, 228)   # 卡片暖灰底
CONN = (198, 184, 168)   # 连线暖灰
GOLD = (200, 168, 120)   # 侧面对齐线（暖金）

def font(path, sz): return ImageFont.truetype(path, sz)

def rounded(d, box, r, fill): d.rounded_rectangle(box, radius=r, fill=fill)

def dashed_line(d, p1, p2, fill, width=2, dash=8, gap=7):
    x1,y1=p1; x2,y2=p2
    import math
    tot=math.hypot(x2-x1,y2-y1);
    if tot==0: return
    dx=(x2-x1)/tot; dy=(y2-y1)/tot; i=0
    while i<tot:
        a=(x1+dx*i, y1+dy*i); b=(x1+dx*min(i+dash,tot), y1+dy*min(i+dash,tot))
        d.line([a,b], fill=fill, width=width); i+=dash+gap

def textlines(d, xy, lines, fnt, fill, lh, anchor_right=False, maxw=None):
    x,y=xy
    for ln in lines:
        if anchor_right:
            w=d.textlength(ln, font=fnt); d.text((x-w,y), ln, font=fnt, fill=fill)
        else:
            d.text((x,y), ln, font=fnt, fill=fill)
        y+=lh

def dot(d, c, r=13, fill=RED):
    x,y=c
    d.ellipse([x-r-3,y-r-3,x+r+3,y+r+3], fill=(255,255,255))
    d.ellipse([x-r,y-r,x+r,y+r], fill=fill)

def numcircle(d, c, n, r=20):
    x,y=c; d.ellipse([x-r,y-r,x+r,y+r], fill=BLUE)
    f=font(FB,24); w=d.textlength(str(n),font=f)
    d.text((x-w/2,y-15), str(n), font=f, fill=(255,255,255))

# ---------- 通用海报骨架 ----------
def build(view, photo_path, out_path, *, crop, dots, left_cards, right_cards,
          title, eval_pts, center_line=True, align_pts=None, header=True):
    W,H = 1200,1500
    cv = Image.new("RGB",(W,H),BG)
    d = ImageDraw.Draw(cv)

    # 照片裁切并居中
    ph = Image.open(photo_path).convert("RGB")
    pw,phh = ph.size
    cx0,cy0,cx1,cy1 = [int(v) for v in (crop[0]*pw,crop[1]*phh,crop[2]*pw,crop[3]*phh)]
    strip = ph.crop((cx0,cy0,cx1,cy1))
    sw,shh = strip.size
    target_h = 1180
    scale = target_h/shh
    new_w = int(sw*scale)
    strip = strip.resize((new_w,target_h), Image.LANCZOS)
    px = (W-new_w)//2
    py = 200
    # 左右边缘羽化，使照片融入背景
    mask = Image.new("L",(new_w,target_h),255)
    md = ImageDraw.Draw(mask)
    feather = 70
    for i in range(feather):
        a = int(255*i/feather)
        md.line([(i,0),(i,target_h)], fill=a)
        md.line([(new_w-1-i,0),(new_w-1-i,target_h)], fill=a)
    cv.paste(strip,(px,py),mask)
    d = ImageDraw.Draw(cv)

    def to_cv(fx,fy):
        # frac of original photo -> canvas
        return (px + (fx*pw - cx0)*scale, py + (fy*phh - cy0)*scale)

    # 中轴线
    if center_line:
        midx = px+new_w/2
        dashed_line(d,(midx,py-20),(midx,py+target_h+10),RED,3,10,9)
    # 对齐连线（侧面 耳肩髋踝）
    if align_pts:
        pts=[to_cv(*p) for p in align_pts]
        for a,b in zip(pts,pts[1:]):
            dashed_line(d,a,b,GOLD,3,4,8)

    # ---- 标题 + 评估要点框（header=False 时整块省略并裁掉顶部）----
    if header:
        d.text((48,40), title[0], font=font(FB,76), fill=DARK)
        rounded(d,(48,138,48+430,138+50),10,BLUE)
        sb=font(FM,26); w=d.textlength(title[1],font=sb)
        d.text((48+215-w/2,150), title[1], font=sb, fill=(255,255,255))

        rounded(d,(770,40,1160,190),18,CARD)
        d.text((806,62), "☆ 评估要点", font=font(FB,30), fill=BLUE)
        yy=116
        for t in eval_pts:
            d.ellipse([812,yy,828,yy+16],fill=BLUE)
            d.text((842,yy-4), t, font=font(FR,24), fill=GREY); yy+=40

    # ---- 标志点 + 连线 ----
    cvdots={k:to_cv(*v) for k,v in dots.items()}

    # 卡片绘制
    def card(side, num, key, head, body):
        c=cvdots[key]
        if side=="L":
            tx=48; cardx=378; ax=cardx
        else:
            tx=772; cardx=792; ax=cardx
        # connector
        dashed_line(d,c,(ax, c[1]),CONN,2,7,7)
        # number + head
        hy=head_y[ (side,key) ]
        if num:
            numcircle(d,(tx+22,hy+20),num)
            d.text((tx+58,hy), head, font=font(FB,38), fill=DARK)
        else:
            d.text((tx,hy), head, font=font(FB,38), fill=DARK)
        textlines(d,(tx,hy+58), body, font(FR,24), GREY, 34)

    for c in left_cards: card("L",*c)
    for c in right_cards: card("R",*c)

    # 标志点最后画（盖在连线上）
    for k,c in cvdots.items(): dot(d,c)

    # ---- 底部小贴士 ----
    rounded(d,(40,1360,1160,1470),20,CARD)
    # 小灯泡图标（手绘，避免 emoji 缺字）
    d.ellipse([78,1388,104,1414], outline=BLUE, width=4)
    d.line([86,1414,96,1414], fill=BLUE, width=4)
    d.line([88,1420,94,1420], fill=BLUE, width=4)
    d.text((118,1392), "小贴士", font=font(FB,28), fill=BLUE)
    tips=[("自然站立",["双脚与髋同宽","放松身体肌肉"]),
          ("多角度观察",["侧面正面背面","综合评估"]),
          ("拍照记录",["定期拍照对比","观察改善效果"]),
          ("专业评估",["如有疼痛不适","建议寻求专业评估"])]
    xs=[230,500,740,940]
    for (h,sub),x in zip(tips,xs):
        d.text((x,1378), h, font=font(FB,23), fill=DARK)
        d.text((x,1412), sub[0], font=font(FR,21), fill=GREY)
        d.text((x,1440), sub[1], font=font(FR,21), fill=GREY)

    if not header:
        cv = cv.crop((0, 196, W, H))
    cv.save(out_path, quality=92)
    print("saved", out_path)

# head_y 由各视图传入（卡片标题纵向位置）
head_y = {}

if __name__ == "__main__":
    import os
    base = os.path.join(os.path.dirname(__file__), "../../miniprogram/images/poses")
    base = os.path.abspath(base)

    # ===== 正面 =====
    head_y.clear()
    head_y.update({
        ("L","shoulder"):300, ("L","ribs"):510, ("L","knee"):880, ("L","foot"):1100,
        ("R","head"):300, ("R","pelvis"):700, ("R","leg"):1000,
    })
    build(
        "front",
        os.path.join(base,"photo-front.jpg"),
        os.path.join(base,"pose-front.jpg"),
        crop=(0.29,0.0,0.71,1.0),
        dots={
            "head":(0.50,0.115), "shoulder":(0.405,0.255), "ribs":(0.50,0.37),
            "pelvis":(0.50,0.455), "knee":(0.45,0.67), "leg":(0.55,0.71),
            "foot":(0.50,0.875),
        },
        left_cards=[
            (1,"shoulder","肩",["锁骨呈柔和的小倒「八」字，两侧肩","峰等高；据此观察有无高低肩、圆肩。"]),
            (2,"ribs","肋骨架",["两侧肋骨下角在同一水平线，肋廓与","骨盆处于同一冠状面、上下对齐。高低","不平多与脊柱侧弯有关，前后偏移则是","胸廓旋转或平移。"]),
            (3,"knee","膝",["大腿中点、髌骨中点、踝中点应三点一","线。髌骨偏内为膝内扣，偏外为膝外翻。"]),
            (4,"foot","足",["双脚并拢、脚尖朝前，大脚趾向外偏移","即为拇外翻。"]),
        ],
        right_cards=[
            (None,"head","头",["眉心、下巴尖、胸骨柄在一条直线上，","双眼连线与地面平行，两侧脸颊在同一","平面，无歪头或颞下颌关节紊乱。"]),
            (None,"pelvis","骨盆",["两侧髂前上棘在同一平面，连线与地面","平行。一前一后是骨盆旋转，一高一低","则是高低骨盆。"]),
            (None,"leg","腿",["双腿并拢，膝盖先碰到但踝间留缝为 X","型腿；踝先碰到但膝间留缝为 O 型腿。"]),
        ],
        title=("正面体态评估","科学评估体态 · 精准改善问题"),
        eval_pts=["自然站立，放松身体","观察各标志点位置"],
        header=False,
    )

    # ===== 侧面 =====
    head_y.clear()
    head_y.update({
        ("L","ear"):300, ("L","thoracic"):500, ("L","pelvis"):700, ("L","knee"):900,
        ("R","neck"):300, ("R","lumbar"):510, ("R","hipjoint"):730, ("R","ankle"):960,
    })
    build(
        "side",
        os.path.join(base,"photo-side.jpg"),
        os.path.join(base,"pose-side.jpg"),
        crop=(0.27,0.0,0.63,1.0),
        center_line=False,
        align_pts=[(0.455,0.135),(0.445,0.30),(0.465,0.50),(0.455,0.72),(0.45,0.93)],
        dots={
            "ear":(0.455,0.135), "neck":(0.47,0.225), "thoracic":(0.435,0.33),
            "lumbar":(0.475,0.44), "pelvis":(0.455,0.50), "hipjoint":(0.49,0.53),
            "knee":(0.455,0.72), "ankle":(0.45,0.93),
        },
        left_cards=[
            (None,"ear","头",["外耳孔与肩峰在同一垂直线即为标准","中立位。耳跑到肩峰前方就是头前引。"]),
            (None,"thoracic","胸椎",["从侧面看应有自然后凸支撑上半身。","曲度消失为胸椎过直，过大为驼背。"]),
            (None,"pelvis","骨盆",["观察髂前上棘与髂后上棘的相对位置；","髂后高出约 5° 以上为前倾，平行或","更低则为后倾。"]),
            (None,"knee","膝",["股骨大转子与膝关节中心对齐。大转","子在膝前为膝过伸，在膝后为膝屈曲。"]),
        ],
        right_cards=[
            (None,"neck","颈椎",["正常颈椎有自然前凸，额头不前探。曲","度变直甚至反弓会导致颈僵、酸痛。"]),
            (None,"lumbar","腰椎",["正常有自然前凹，深度约可平放一掌。","几乎无凹为腰平，弧度过大为腰椎反弓。"]),
            (None,"hipjoint","髋关节",["髂前上棘与髂后上棘连线中点应与股","骨大转子在同一垂直线。靠前为髋屈，","靠后为髋伸。"]),
            (None,"ankle","踝关节",["小腿胫骨与地面应接近 90°。小于","90° 为背屈，大于 90° 为跖屈。"]),
        ],
        title=("侧面体态评估","科学评估体态 · 精准改善问题"),
        eval_pts=["自然站立，放松身体","从侧面观察各标志点位置"],
        header=False,
    )

    # ===== 背面 =====
    head_y.clear()
    head_y.update({
        ("L","scapula"):300, ("L","pelvis"):560, ("L","foot"):1090,
        ("R","spine"):300, ("R","femur"):640, ("R","tibia"):980,
    })
    build(
        "back",
        os.path.join(base,"photo-back.jpg"),
        os.path.join(base,"pose-back.jpg"),
        crop=(0.29,0.0,0.71,1.0),
        dots={
            "scapula":(0.43,0.30), "spine":(0.50,0.41), "pelvis":(0.455,0.47),
            "femur":(0.55,0.60), "tibia":(0.535,0.80), "foot":(0.50,0.90),
        },
        left_cards=[
            (1,"scapula","肩胛骨",["两侧肩胛对称贴于胸廓，内侧缘与脊柱","距离适中。过近为后缩，过远为前伸。"]),
            (2,"pelvis","骨盆",["两侧髂后上棘在同一水平，无高低差或","前后旋转，需与正面评估交叉验证。"]),
            (3,"foot","足",["两侧跟腱应与地面垂直，观察有无足内","翻或足外翻。"]),
        ],
        right_cards=[
            (4,"spine","脊柱",["颈椎、胸椎、腰椎的棘突应在一条直","线上，没有侧弯或旋转。"]),
            (5,"femur","股骨",["两侧股骨内外髁到身体中线的距离应","相等。内侧缘靠近为内旋，外侧缘靠近","为外旋。"]),
            (6,"tibia","胫骨",["两侧胫骨内外踝到中线的距离应相等，","据此判断小腿有无内外旋。"]),
        ],
        title=("背面体态评估","科学评估体态 · 精准改善问题"),
        eval_pts=["自然站立，放松身体","观察各标志点位置"],
        header=False,
    )
