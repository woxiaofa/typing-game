// 主程序入口
let currentScreen = 'main-menu';
let virtualKeyboard = null;

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initVirtualKeyboard();
    loadProgress();
    loadSettings();
    setupKeyboardListener();
    const ci = document.getElementById('chinese-input');
    if (ci) ci.addEventListener('input', () => Game.handleChineseInput());
});

// 初始化虚拟键盘
function initVirtualKeyboard() {
    const keyboardEl = document.getElementById('virtual-keyboard');
    const layout = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    
    keyboardEl.innerHTML = '';
    
    layout.forEach(row => {
        const rowEl = document.createElement('div');
        rowEl.className = 'keyboard-row';
        
        row.forEach(key => {
            const keyEl = document.createElement('div');
            keyEl.className = 'key';
            keyEl.textContent = key;
            keyEl.dataset.key = key;
            keyEl.onclick = () => handleVirtualKeyClick(key);
            rowEl.appendChild(keyEl);
        });
        
        keyboardEl.appendChild(rowEl);
    });
    
    // 添加空格键行
    const spaceRow = document.createElement('div');
    spaceRow.className = 'keyboard-row';
    const spaceKey = document.createElement('div');
    spaceKey.className = 'key space';
    spaceKey.textContent = '空格';
    spaceKey.dataset.key = ' ';
    spaceKey.onclick = () => handleVirtualKeyClick(' ');
    spaceRow.appendChild(spaceKey);
    keyboardEl.appendChild(spaceRow);
}

// 处理虚拟键盘点击
function handleVirtualKeyClick(key) {
    if (currentScreen === 'game-screen') {
        Game.handleInput(key);
        if (Game.currentLevel === 5) {
            Game.handleBubbleInput(key);
        }
    }
}

// 设置键盘监听
function setupKeyboardListener() {
    document.addEventListener('keydown', (e) => {
        // 中文输入法组合输入中不拦截，避免打断拼音候选
        if (e.isComposing || e.keyCode === 229) return;
        // 中文拼音关使用独立输入框，交给其自身处理
        if (e.target && e.target.id === 'chinese-input') return;
        if (currentScreen === 'game-screen') {
            // 处理空格键
            if (e.key === ' ') {
                e.preventDefault();
                Game.handleInput(' ');
                if (Game.currentLevel === 5) {
                    Game.handleBubbleInput(' ');
                }
                return;
            }
            // 忽略功能键，只处理字母和数字
            if (e.key.length === 1 && /[A-Za-z0-9]/.test(e.key)) {
                const key = e.key.toUpperCase();
                Game.handleInput(key);
                
                if (Game.currentLevel === 5) {
                    Game.handleBubbleInput(key);
                }
                
                // 高亮虚拟键盘
                highlightVirtualKey(key);
            }
        }
    });
}

// 高亮虚拟键盘按键
function highlightVirtualKey(key) {
    document.querySelectorAll('.key').forEach(k => {
        k.classList.remove('active');
        if (k.dataset.key === key.toUpperCase()) {
            k.classList.add('active');
            setTimeout(() => k.classList.remove('active'), 200);
        }
    });
}

// 显示主菜单
function showMainMenu() {
    switchScreen('main-menu');
    loadProgress();
}

// 显示关卡选择
function showLevelSelect() {
    switchScreen('level-select');
    updateLevelStars();
}

// 显示进度
function showProgress() {
    switchScreen('progress-screen');
    displayProgress();
}

// 显示设置
function showSettings() {
    switchScreen('settings-screen');
}

// 切换屏幕
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
}

// 开始关卡
function startLevel(level) {
    switchScreen('game-screen');
    // 复位成绩弹窗与听按钮
    document.getElementById('result-screen').style.display = 'none';
    Game.showListenButton(false);

    const practice = document.getElementById('practice-area');
    const gameArea = document.getElementById('game-area');
    const vkbContainer = document.querySelector('.virtual-keyboard-container');
    const chineseArea = document.getElementById('chinese-area');

    if (level === 5) {
        practice.style.display = 'none';
        gameArea.style.display = 'block';
    } else {
        practice.style.display = 'block';
        gameArea.style.display = 'none';
        if (level === 7) {
            vkbContainer.style.display = 'none';
            chineseArea.style.display = 'block';
        } else {
            vkbContainer.style.display = '';
            chineseArea.style.display = 'none';
        }
    }

    Game.init(level);

    if (level === 7) {
        const ci = document.getElementById('chinese-input');
        if (ci) setTimeout(() => ci.focus(), 60);
    }
}

// 退出游戏
function exitGame() {
    // 清理游戏状态
    if (Game.bubbleGame) {
        Game.cleanupBubbleGame();
    }
    Game.stopTimer();
    Game.showListenButton(false);
    document.getElementById('result-screen').style.display = 'none';
    showMainMenu();
}

// 加载进度
function loadProgress() {
    const progress = Storage.getProgress();
    const completed = Object.values(progress.levels).filter(l => l.completed).length;
    
    document.getElementById('completed-levels').textContent = completed;
    document.getElementById('total-stars').textContent = progress.totalStars;
}

// 更新关卡星星显示
function updateLevelStars() {
    const progress = Storage.getProgress();
    for (let i = 1; i <= 7; i++) {
        const stars = progress.levels[i].stars || 0;
        const starEl = document.getElementById(`level${i}-stars`);
        if (starEl) {
            starEl.textContent = '⭐'.repeat(stars);
        }
    }
}

// 显示进度详情
function displayProgress() {
    const progress = Storage.getProgress();
    const detailsEl = document.getElementById('progress-details');
    
    detailsEl.innerHTML = '';
    
    for (let i = 1; i <= 7; i++) {
        const level = progress.levels[i];
        const item = document.createElement('div');
        item.className = 'progress-item';
        item.innerHTML = `
            <div>
                <strong>Level ${i}</strong>
            </div>
            <div>
                ${level.completed ? '✓ 已完成' : '未完成'} 
                ${'⭐'.repeat(level.stars || 0)}
            </div>
        `;
        detailsEl.appendChild(item);
    }
    
    const totalItem = document.createElement('div');
    totalItem.className = 'progress-item';
    totalItem.style.borderTop = '2px solid #667eea';
    totalItem.style.marginTop = '20px';
    totalItem.innerHTML = `
        <div><strong>总星星数</strong></div>
        <div><strong>${progress.totalStars} ⭐</strong></div>
    `;
    detailsEl.appendChild(totalItem);
}

// 加载设置
function loadSettings() {
    const settings = Storage.getSettings();
    document.getElementById('sound-enabled').checked = settings.sound;
    document.getElementById('music-enabled').checked = settings.music;
    document.getElementById('font-size').value = settings.fontSize;
    
    // 应用字体大小
    document.body.className = `font-${settings.fontSize}`;
}

// 切换音效
function toggleSound(enabled) {
    const settings = Storage.getSettings();
    settings.sound = enabled;
    Storage.saveSettings(settings);
}

// 切换音乐
function toggleMusic(enabled) {
    const settings = Storage.getSettings();
    settings.music = enabled;
    Storage.saveSettings(settings);
}

// 改变字体大小
function changeFontSize(size) {
    const settings = Storage.getSettings();
    settings.fontSize = size;
    Storage.saveSettings(settings);
    
    document.body.className = `font-${size}`;
}

// 显示成绩弹窗（功能 1：计时 + 分享）
function showResult(level, stars, elapsedMs, correct, wrong) {
    const overlay = document.getElementById('result-screen');
    const titleEl = document.getElementById('result-title');
    document.getElementById('result-stars').textContent = '⭐'.repeat(stars) || '☆';

    const total = Math.floor(elapsedMs / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    const timeStr = m + ':' + (s < 10 ? '0' + s : s);

    titleEl.textContent = level === 5 ? '🎮 游戏结束！' : '🎉 通关啦！';
    document.getElementById('result-stats').innerHTML =
        `本关：Level ${level}<br>` +
        `⏱ 用时：<span class="time-big">${timeStr}</span><br>` +
        `✅ 正确 ${correct} 次　❌ 错误 ${wrong} 次<br>` +
        `⭐ 获得 ${stars} 星`;

    document.getElementById('share-toast').textContent = '';
    overlay.style.display = 'flex';
}

// 分享成绩（Web Share API，不支持时复制到剪贴板）
function shareResult() {
    const title = '打字游戏 · 我的成绩';
    const statsText = document.getElementById('result-stats').innerText.replace(/\n/g, '，');
    const text = `🎮 我在「打字游戏」${statsText}！快来一起玩：https://woxiaofa.github.io/typing-game/`;
    const toast = document.getElementById('share-toast');

    if (navigator.share) {
        navigator.share({ title, text }).catch(() => {});
        return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => { toast.textContent = '已复制成绩，去粘贴分享吧！'; })
            .catch(() => { toast.textContent = '复制失败，请截图分享～'; });
    } else {
        toast.textContent = '当前环境不支持分享，请截图分享～';
    }
}

// 再玩一次当前关
function replayLevel() {
    document.getElementById('result-screen').style.display = 'none';
    startLevel(Game.currentLevel);
}

