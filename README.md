# 打字游戏 / Typing Game

一款专为 10 岁左右小朋友设计的寓教于乐打字学习游戏。纯前端实现，无需安装、无需后端。

A fun typing game designed for kids around 10 years old. Pure front-end, no installation and no backend required.

## 功能特点 / Features

- 🎮 **5 个等级 / 5 Levels**：从键盘认识到游戏模式，循序渐进
- ⌨️ **虚拟键盘 / Virtual Keyboard**：可视化键盘布局，按键高亮提示
- ⭐ **奖励系统 / Reward System**：完成关卡获得星星奖励
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

| Level | Description |
| --- | --- |
| Level 1 | Learn the Keyboard — get to know all 26 letters |
| Level 2 | Letter Practice — vowels first, then all letters |
| Level 3 | Word Practice — simple words with emoji hints |
| Level 4 | Sentence Practice — type complete sentences |
| Level 5 | Game Mode — typing bubbles to boost your speed |

## 使用方法 / Getting Started

直接在浏览器中打开 `index.html` 文件即可使用。

Just open `index.html` in your browser and start playing.

也可以部署到任意静态网站托管服务（如 GitHub Pages）：

You can also deploy it to any static hosting service (e.g. GitHub Pages):

```bash
# 例如使用 GitHub Pages / e.g. with GitHub Pages
git clone https://github.com/your-username/typing-game.git
```

然后在仓库设置中开启 GitHub Pages 即可。

Then enable GitHub Pages in the repository settings.

## 项目结构 / Project Structure

```
typing-game/
├── index.html        # 页面结构 / Page structure
├── css/
│   └── style.css     # 样式与动画 / Styles & animations
├── js/
│   ├── storage.js    # 进度与设置存储（LocalStorage）/ Progress & settings storage
│   ├── game.js       # 游戏逻辑 / Game logic
│   └── main.js       # 入口与界面交互 / Entry & UI interaction
├── favicon.ico
└── README.md
```

## 技术栈 / Tech Stack

- HTML5 + CSS3 + JavaScript（原生，无任何依赖 / vanilla, zero dependencies）
- 数据存储 / Storage: LocalStorage

## 设置 / Settings

- 🔊 音效开关 / Sound on/off
- 🎵 背景音乐开关 / Background music on/off
- 🔠 字体大小（正常 / 大 / 超大）/ Font size (normal / large / x-large)

## 后续计划 / Roadmap

- [ ] 中英文界面切换 / UI language switch (中文 / English)
- [ ] 更多小游戏（打字赛车、单词接龙）/ More mini-games (typing racer, word chain)
- [ ] 家长自定义单词 / Custom word lists for parents
- [ ] 平板电脑适配 / Tablet support

## 许可证 / License

MIT
