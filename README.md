# 打字游戏 / Typing Game

一款专为 10 岁左右小朋友设计的寓教于乐打字学习游戏。纯前端实现，无需安装、无需后端。

A fun typing game designed for kids around 10 years old. Pure front-end, no installation and no backend required.

在线体验 · Live Demo: **https://woxiaofa.github.io/typing-game/**

[![GitHub License](https://img.shields.io/github/license/woxiaofa/typing-game?style=flat-square)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/woxiaofa/typing-game?style=flat-square)](https://github.com/woxiaofa/typing-game/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/woxiaofa/typing-game/pulls)
[![Vanilla JS](https://img.shields.io/badge/dependency-none-informational?style=flat-square)](#技术栈--tech-stack)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-222?style=flat-square)](https://pages.github.com/)

## 功能特点 / Features

- 🎮 **7 个等级 / 7 Levels**：从键盘认识到中文拼音，循序渐进
- ⌨️ **虚拟键盘 / Virtual Keyboard**：可视化键盘布局，按键高亮提示
- ⭐ **奖励系统 / Reward System**：完成关卡获得星星奖励
- ⏱️ **计时与分享 / Timer & Share**：每关自动计时，通关后可分享用时与成绩（Web Share / 复制）
- 🖼️ **英语情景填句 / English Fill-in**：看图补词，答对后用语音读一遍整句
- 🀄 **中文拼音 / Chinese Pinyin**：按英文意思与拼音提示输入中文，从单字晋级到简单句
- 📊 **进度追踪 / Progress Tracking**：使用 LocalStorage 自动保存学习进度
- 🔊 **音效反馈 / Sound Feedback**：即时音效反馈，可自由开关
- 🎨 **友好界面 / Kid-friendly UI**：卡通风格、色彩丰富、大字体可调节

## 游戏关卡 / Levels

| 关卡 | 内容 |
| --- | --- |
| Level 1 | 认识键盘 — 学习 26 个字母的位置 |
| Level 2 | 字母练习 — 从元音开始，熟悉字母输入 |
| Level 3 | 单词练习 — 练习简单单词（带 Emoji 图片提示） |
| Level 4 | 句子练习 — 练习完整句子输入 |
| Level 5 | 游戏模式 — 打字泡泡游戏，提高打字速度 |
| Level 6 | 英语情景填句 — 看图补全缺失单词，答对听语音朗读 |
| Level 7 | 中文拼音 — 根据英文与拼音提示输入中文，从单字到简单句 |

| Level | Description |
| --- | --- |
| Level 1 | Learn the Keyboard — get to know all 26 letters |
| Level 2 | Letter Practice — vowels first, then all letters |
| Level 3 | Word Practice — simple words with emoji hints |
| Level 4 | Sentence Practice — type complete sentences |
| Level 5 | Game Mode — typing bubbles to boost your speed |
| Level 6 | English Fill-in — complete the missing word from a picture, then hear it read aloud |
| Level 7 | Chinese Pinyin — type Chinese by English meaning & pinyin hints, from single chars to simple sentences |

## 在线体验 / Live Demo

👉 https://woxiaofa.github.io/typing-game/

## 使用方法 / Getting Started

### 在线访问 / Online

直接打开上面的 GitHub Pages 地址即可，无需安装任何东西。

Just open the GitHub Pages link above — no installation needed.

### 本地运行 / Local

直接在浏览器中打开 `index.html` 文件即可使用。

Just open `index.html` in your browser and start playing.

也可以部署到任意静态网站托管服务：

You can also deploy it to any static hosting service:

```bash
git clone https://github.com/woxiaofa/typing-game.git
```

本项目通过 **GitHub Pages** 部署：仓库 Settings → Pages → Source 选择 `Deploy from a branch`，分支选 `main`、目录选 `/ (root)` 即可。

This project is deployed with **GitHub Pages**: Settings → Pages → Source: `Deploy from a branch`, branch `main`, folder `/ (root)`.

## 项目结构 / Project Structure

```
typing-game/
├── index.html            # 页面结构 + SEO 内容区 + JSON-LD 结构化数据
├── css/
│   └── style.css         # 样式与动画（含 SEO 内容区样式）
├── js/
│   ├── storage.js        # 进度与设置存储（LocalStorage）
│   ├── game.js           # 游戏逻辑
│   └── main.js           # 入口与界面交互
├── robots.txt            # 爬虫规则（显式放行搜索引擎与 AI 爬虫）
├── sitemap.xml           # 站点地图
├── llms.txt              # AI 助手摘要文件（llmstxt 规范）
├── manifest.webmanifest  # PWA 清单
├── sw.js                 # Service Worker（离线缓存）
├── og-image.png          # 社交分享大图 1200x630
├── icon-*.png            # PWA 图标
├── gen-assets.py         # 重新生成 OG 图与图标的脚本（需 Pillow）
├── favicon.ico / favicon.svg
├── LICENSE               # MIT
└── README.md
```

## 技术栈 / Tech Stack

- HTML5 + CSS3 + JavaScript（原生，无任何依赖 / vanilla, zero dependencies）
- 数据存储 / Storage: LocalStorage
- PWA：manifest + Service Worker，可安装、离线可用
- 结构化数据：Schema.org（`WebApplication` / `FAQPage` / `HowTo`）+ `llms.txt`，对搜索引擎与 AI 助手友好

## 设置 / Settings

- 🔊 音效开关 / Sound on/off
- 🎵 背景音乐开关 / Background music on/off
- 🔠 字体大小（正常 / 大 / 超大）/ Font size (normal / large / x-large)

## 后续计划 / Roadmap

- [ ] 中英文界面切换 / UI language switch (中文 / English)
- [ ] 更多小游戏（打字赛车、单词接龙）/ More mini-games (typing racer, word chain)
- [ ] 家长自定义单词 / Custom word lists for parents
- [ ] 平板电脑适配 / Tablet support

## ☕ 赞助支持 / Sponsor

如果这个项目帮到了你，欢迎请作者喝杯咖啡 ☕ 每一笔支持都会用于项目的持续维护与新功能开发。
If this project saved you some time, consider buying me a coffee ☕ Every contribution goes towards maintenance and new features.

<p align="center">
  <img src="assets/alipay-qr.jpg" alt="支付宝收款码 / Alipay QR code" width="300">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="assets/wechat-qr.jpg" alt="微信收款码 / WeChat Pay QR code" width="300">
</p>

<p align="center"><b>支付宝 Alipay</b> &nbsp;·&nbsp; <b>微信支付 WeChat Pay</b></p>

> 点个 ⭐ Star 也是很大的鼓励。
> A ⭐ star is equally appreciated.

## 许可证 / License

MIT

---

**关键词 Keywords**: 打字游戏, 打字练习, 在线打字练习, 儿童打字, 少儿打字练习, 键盘练习, 指法练习, 打字速度测试, 免费打字软件, 打字泡泡, 虚拟键盘, typing game, typing practice, typing tutor, typing test, kids typing, keyboard practice, learn to type
