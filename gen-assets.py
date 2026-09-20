# -*- coding: utf-8 -*-
"""生成 打字游戏 站点的视觉资源：OG 分享图 1200x630 + PWA 图标 192/512/maskable。
依赖：Pillow（pip install Pillow）。改完参数重跑本脚本即可。"""
import os
from PIL import Image, ImageDraw, ImageFont

OUT = os.path.dirname(os.path.abspath(__file__))
C1 = (102, 126, 234)   # #667eea
C2 = (118, 75, 162)    # #764ba2
WHITE = (255, 255, 255)
SOFT = (226, 220, 255)

FONT_CANDIDATES = [
    r"C:\Windows\Fonts\msyhbd.ttc",
    r"C:\Windows\Fonts\msyh.ttc",
    r"C:\Windows\Fonts\simhei.ttf",
    "/System/Library/Fonts/PingFang.ttc",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


def font(size, bold=True):
    for p in FONT_CANDIDATES:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()


def gradient(size, c1=C1, c2=C2):
    w, h = size
    base = Image.new("RGB", size, c1)
    draw = ImageDraw.Draw(base)
    for y in range(h):
        r = y / max(h - 1, 1)
        draw.line(
            [(0, y), (w, y)],
            fill=tuple(int(c1[i] + (c2[i] - c1[i]) * r) for i in range(3)),
        )
    return base


def center_text(draw, xy, text, f, fill, anchor="mm"):
    draw.text(xy, text, font=f, fill=fill, anchor=anchor)


def make_og():
    w, h = 1200, 630
    img = gradient((w, h))
    d = ImageDraw.Draw(img)

    f_title = font(104)
    f_sub = font(40)
    f_badge = font(34)
    f_url = font(28)

    # 顶部小标签
    center_text(d, (600, 128), "KIDS TYPING GAME", f_badge, SOFT)

    # 主标题
    center_text(d, (600, 262), "打字游戏", f_title, WHITE)

    # 副标题（避免生僻符号，用全角点与短横线）
    center_text(d, (600, 372), "认识键盘 · 字母练习 · 单词练习 · 句子练习 · 打字泡泡", f_sub, SOFT)

    # 三个要点胶囊
    tags = ["5 个关卡", "虚拟键盘提示", "星星奖励", "完全免费"]
    gap = 26
    widths = [d.textlength(t, font=f_badge) for t in tags]
    total = sum(widths) + gap * (len(tags) - 1) + 4 * 44
    x = (w - total) / 2
    y = 452
    for t, tw in zip(tags, widths):
        d.rounded_rectangle([x, y, x + tw + 44, y + 62], radius=31, fill=(255, 255, 255))
        center_text(d, (x + 22, y + 31), t, f_badge, key_c := (90, 75, 156), anchor="lm")
        x += tw + 44 + gap

    center_text(d, (600, 570), "woxiaofa.github.io/typing-game", f_url, SOFT)

    img.save(os.path.join(OUT, "og-image.png"), optimize=True)
    print("og-image.png", img.size)


def make_icon(size, maskable=False):
    img = gradient((size, size))
    d = ImageDraw.Draw(img)
    pad = int(size * 0.22) if maskable else int(size * 0.16)
    kb_w = size - pad * 2
    kb_h = int(kb_w * 0.5)
    x0 = pad
    y0 = int((size - kb_h) / 2)
    d.rounded_rectangle(
        [x0, y0, x0 + kb_w, y0 + kb_h],
        radius=int(kb_h * 0.16),
        fill=(255, 255, 255, 245),
    )
    # 键帽
    key_c = (90, 75, 156)
    cols, rows = 4, 2
    kx0 = x0 + kb_w * 0.07
    ky0 = y0 + kb_h * 0.16
    avail_w = kb_w * 0.86
    gap = avail_w * 0.04
    kw = (avail_w - gap * (cols - 1)) / cols
    kh = (kb_h * 0.68 - gap * (rows - 1)) / rows
    for r in range(rows):
        for c in range(cols):
            l = kx0 + c * (kw + gap)
            t = ky0 + r * (kh + gap)
            d.rounded_rectangle([l, t, l + kw, t + kh], radius=int(min(kw, kh) * 0.22), fill=key_c)
    return img


if __name__ == "__main__":
    make_og()
    make_icon(192).save(os.path.join(OUT, "icon-192.png"), optimize=True)
    make_icon(512).save(os.path.join(OUT, "icon-512.png"), optimize=True)
    make_icon(512, maskable=True).save(os.path.join(OUT, "icon-maskable-512.png"), optimize=True)
    print("done ->", OUT)
