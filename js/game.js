// 游戏逻辑模块
const Game = {
    currentLevel: 1,
    currentTask: null,
    userInput: '',
    correctCount: 0,
    wrongCount: 0,
    stars: 0,

    // 计时（功能 1）
    startTime: 0,
    timerInterval: null,

    // 当前朗读内容（听按钮 / 自动朗读）
    currentSpeech: null,
    
    // Level 1: 键盘认识
    level1Data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    level1Index: 0,

    // Level 2: 字母练习
    level2Data: ['A', 'E', 'I', 'O', 'U', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 
                 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
    level2Index: 0,

    // Level 3: 单词练习
    level3Data: [
        { word: 'CAT', emoji: '🐱' },
        { word: 'DOG', emoji: '🐶' },
        { word: 'SUN', emoji: '☀️' },
        { word: 'MOON', emoji: '🌙' },
        { word: 'STAR', emoji: '⭐' },
        { word: 'TREE', emoji: '🌳' },
        { word: 'FISH', emoji: '🐟' },
        { word: 'BIRD', emoji: '🐦' },
        { word: 'LION', emoji: '🦁' },
        { word: 'BEAR', emoji: '🐻' },
        { word: 'APPLE', emoji: '🍎' },
        { word: 'BANANA', emoji: '🍌' },
        { word: 'CAR', emoji: '🚗' },
        { word: 'HOUSE', emoji: '🏠' },
        { word: 'HEART', emoji: '❤️' }
    ],
    level3Index: 0,

    // Level 4: 句子练习
    level4Data: [
        'I LOVE YOU',
        'HELLO WORLD',
        'GOOD MORNING',
        'HOW ARE YOU',
        'THANK YOU',
        'YOU ARE GREAT',
        'I AM HAPPY',
        'MY NAME IS WANG ZI CHEN',
        'THE SUN IS BRIGHT',
        'I LIKE TO PLAY',
        'LEARNING IS FUN'
    ],
    level4Index: 0,

    // Level 6: 英语情景填句（看图补词 + 朗读）
    level6Data: [
        { emoji: '🐱', prompt: 'The cat is ___',                answer: 'CUTE',   full: 'The cat is cute.' },
        { emoji: '🐶', prompt: 'The dog is ___',                answer: 'BIG',    full: 'The dog is big.' },
        { emoji: '☀️', prompt: 'The sun is ___',                answer: 'HOT',    full: 'The sun is hot.' },
        { emoji: '🍎', prompt: 'I like ___',                    answer: 'APPLES', full: 'I like apples.' },
        { emoji: '🌧️', prompt: 'It is ___',                     answer: 'RAINING',full: 'It is raining.' },
        { emoji: '🚗', prompt: 'The car is ___',                answer: 'RED',    full: 'The car is red.' },
        { emoji: '🐟', prompt: 'The fish can ___',              answer: 'SWIM',   full: 'The fish can swim.' },
        { emoji: '🌳', prompt: 'The tree is ___',               answer: 'GREEN',  full: 'The tree is green.' },
        { emoji: '⭐', prompt: 'The star is very ___',          answer: 'BRIGHT', full: 'The star is very bright.' },
        { emoji: '📚', prompt: 'I can ___',                     answer: 'READ',   full: 'I can read.' }
    ],
    level6Index: 0,

    // Level 7: 中文拼音（英文意思 + 拼音提示，输入中文）
    level7Data: [
        { emoji: '👋', zh: '你好',       py: 'nǐ hǎo',       en: 'Hello' },
        { emoji: '🙏', zh: '谢谢',       py: 'xiè xie',      en: 'Thank you' },
        { emoji: '🌞', zh: '早上好',     py: 'zǎo shàng hǎo', en: 'Good morning' },
        { emoji: '👶', zh: '我',         py: 'wǒ',           en: 'I / me' },
        { emoji: '🐱', zh: '猫',         py: 'māo',          en: 'cat' },
        { emoji: '🏠', zh: '家',         py: 'jiā',          en: 'home' },
        { emoji: '🍎', zh: '苹果',       py: 'píng guǒ',     en: 'apple' },
        { emoji: '👋', zh: '再见',       py: 'zài jiàn',     en: 'Goodbye' },
        { emoji: '❓', zh: '你在哪里？', py: 'nǐ zài nǎ lǐ', en: 'Where are you?' },
        { emoji: '🍎', zh: '我吃苹果。', py: 'wǒ chī píng guǒ', en: 'I eat an apple.' }
    ],
    level7Index: 0,

    // 初始化游戏
    init(level) {
        this.currentLevel = level;
        this.userInput = '';
        this.correctCount = 0;
        this.wrongCount = 0;
        this.stars = 0;
        
        // 重置索引
        this.level1Index = 0;
        this.level2Index = 0;
        this.level3Index = 0;
        this.level4Index = 0;
        this.level6Index = 0;
        this.level7Index = 0;

        this.currentSpeech = null;
        this.startTimer();
        this.updateStats();
        this.loadTask();
    },

    // 加载任务
    loadTask() {
        const taskTextEl = document.getElementById('task-text');
        const taskImageEl = document.getElementById('task-image');
        const inputDisplayEl = document.getElementById('input-display');
        const inputHintEl = document.getElementById('input-hint');
        const feedbackEl = document.getElementById('feedback-area');
        
        // 清空反馈
        feedbackEl.innerHTML = '';
        this.userInput = '';
        inputDisplayEl.textContent = '';
        inputHintEl.innerHTML = '';

        switch(this.currentLevel) {
            case 1:
                this.loadLevel1();
                break;
            case 2:
                this.loadLevel2();
                break;
            case 3:
                this.loadLevel3();
                break;
            case 4:
                this.loadLevel4();
                break;
            case 5:
                this.startBubbleGame();
                break;
            case 6:
                this.loadLevel6();
                break;
            case 7:
                this.loadLevel7();
                break;
        }
    },

    // Level 1: 键盘认识
    loadLevel1() {
        if (this.level1Index >= this.level1Data.length) {
            this.completeLevel();
            return;
        }

        const letter = this.level1Data[this.level1Index];
        document.getElementById('task-text').textContent = `请找到并按下 "${letter}" 键`;
        document.getElementById('task-image').textContent = letter;
        document.getElementById('input-hint').innerHTML = `按 <span class="highlight">${letter}</span> 键`;
        
        this.highlightKey(letter);
    },

    // Level 2: 字母练习
    loadLevel2() {
        if (this.level2Index >= this.level2Data.length) {
            this.completeLevel();
            return;
        }

        const letter = this.level2Data[this.level2Index];
        document.getElementById('task-text').textContent = letter;
        document.getElementById('task-image').textContent = '';
        document.getElementById('input-hint').innerHTML = `输入字母 <span class="highlight">${letter}</span>`;
        
        this.highlightKey(letter);
    },

    // Level 3: 单词练习
    loadLevel3() {
        if (this.level3Index >= this.level3Data.length) {
            this.completeLevel();
            return;
        }

        const task = this.level3Data[this.level3Index];
        document.getElementById('task-text').textContent = task.word;
        document.getElementById('task-image').textContent = task.emoji;
        document.getElementById('input-hint').innerHTML = `输入单词 <span class="highlight">${task.word}</span>`;
        
        this.highlightKey(task.word[0]);
    },

    // Level 4: 句子练习
    loadLevel4() {
        if (this.level4Index >= this.level4Data.length) {
            this.completeLevel();
            return;
        }

        const sentence = this.level4Data[this.level4Index];
        document.getElementById('task-text').textContent = sentence;
        document.getElementById('task-image').textContent = '';
        const displaySentence = sentence.replace(/ /g, '·');
        document.getElementById('input-hint').innerHTML = `输入句子 <span class="highlight">${displaySentence}</span> (·表示空格)`;
        
        const firstChar = sentence[0];
        if (firstChar !== ' ') {
            this.highlightKey(firstChar);
        } else {
            document.getElementById('input-hint').innerHTML = 
                `输入空格 <span class="highlight">[空格键]</span>`;
        }
    },

    // Level 6: 英语情景填句
    loadLevel6() {
        if (this.level6Index >= this.level6Data.length) {
            this.completeLevel();
            return;
        }

        const item = this.level6Data[this.level6Index];
        const taskTextEl = document.getElementById('task-text');
        const taskImageEl = document.getElementById('task-image');
        const inputDisplayEl = document.getElementById('input-display');
        const inputHintEl = document.getElementById('input-hint');
        const feedbackEl = document.getElementById('feedback-area');

        feedbackEl.innerHTML = '';
        this.userInput = '';
        inputDisplayEl.textContent = '';
        taskImageEl.textContent = item.emoji;
        taskTextEl.innerHTML = item.prompt.replace('___',
            '<span class="blank" id="fill-blank"></span>');

        inputHintEl.innerHTML = `看图，填入正确的单词（<span class="highlight">${item.answer[0]}</span> 开头）`;
        this.currentSpeech = { text: item.full, lang: 'en-US' };
        this.showListenButton(true);

        // 高亮首字母
        this.highlightKey(item.answer[0]);
    },

    // Level 6 输入处理
    handleLevel6Input(key) {
        const item = this.level6Data[this.level6Index];
        const answer = item.answer;
        const expectedChar = answer[this.userInput.length];

        if (key === expectedChar) {
            this.userInput += key;
            const blank = document.getElementById('fill-blank');
            if (blank) {
                blank.textContent = this.userInput;
                blank.classList.add('filled');
            }

            if (this.userInput === answer) {
                this.showFeedback(true, '太棒了！');
                this.correctCount++;
                this.stars += 2;
                this.playSound('correct');
                this.speak(item.full, 'en-US');

                setTimeout(() => {
                    if (this.currentLevel !== 6) return;
                    this.level6Index++;
                    this.userInput = '';
                    this.loadTask();
                }, 1600);
            } else {
                this.playSound('key');
                // 高亮下一个字母
                this.highlightKey(answer[this.userInput.length]);
            }
        } else {
            this.showFeedback(false, '不对，再试试！');
            this.wrongCount++;
            this.userInput = '';
            const blank = document.getElementById('fill-blank');
            if (blank) {
                blank.textContent = '';
                blank.classList.remove('filled');
            }
            this.highlightKey(answer[0]);
            this.playSound('wrong');
        }
        this.updateStats();
    },

    // Level 7: 中文拼音
    loadLevel7() {
        if (this.level7Index >= this.level7Data.length) {
            this.completeLevel();
            return;
        }

        const item = this.level7Data[this.level7Index];
        const taskTextEl = document.getElementById('task-text');
        const taskImageEl = document.getElementById('task-image');
        const feedbackEl = document.getElementById('feedback-area');
        const promptEl = document.getElementById('chinese-prompt');
        const pinyinEl = document.getElementById('chinese-pinyin');
        const inputEl = document.getElementById('chinese-input');
        const charsEl = document.getElementById('chinese-chars');

        feedbackEl.innerHTML = '';
        taskImageEl.textContent = item.emoji;
        taskTextEl.textContent = item.en;
        promptEl.textContent = item.en;
        pinyinEl.textContent = '拼音：' + item.py;
        inputEl.value = '';
        this.currentSpeech = { text: item.zh, lang: 'zh-CN' };
        this.showListenButton(true);

        // 生成选字按钮（按词语原顺序显示，避免误导）
        const chars = item.zh.split('');
        charsEl.innerHTML = '';
        chars.forEach(ch => {
            const b = document.createElement('button');
            b.className = 'char-btn';
            b.textContent = ch;
            b.onclick = () => this.appendChineseChar(ch, b);
            charsEl.appendChild(b);
        });

        this.highlightKey('');
    },

    // Level 7: 选字按钮追加
    appendChineseChar(ch, btn) {
        const inputEl = document.getElementById('chinese-input');
        inputEl.value += ch;
        if (btn) btn.classList.add('used');
        this.handleChineseInput();
    },

    // Level 7: 退格
    chineseBackspace() {
        const inputEl = document.getElementById('chinese-input');
        inputEl.value = inputEl.value.slice(0, -1);
        this.markUsedChars();
    },

    // 根据当前输入标记已用选字
    markUsedChars() {
        const inputEl = document.getElementById('chinese-input');
        const val = inputEl.value;
        document.querySelectorAll('#chinese-chars .char-btn').forEach(b => {
            // 统计该字在目标与已输入中的出现次数
            const ch = b.textContent;
            const total = this.level7Data[this.level7Index].zh.split('').filter(c => c === ch).length;
            const used = val.split('').filter(c => c === ch).length;
            b.classList.toggle('used', used >= total);
        });
    },

    // Level 7: 校验中文输入（输入框 / 选字共用）
    handleChineseInput() {
        if (this.currentLevel !== 7) return;
        const inputEl = document.getElementById('chinese-input');
        const item = this.level7Data[this.level7Index];
        this.markUsedChars();

        if (inputEl.value === item.zh) {
            this.showFeedback(true, '太棒了！');
            this.correctCount++;
            this.stars += 2;
            this.playSound('correct');
            this.speak(item.zh, 'zh-CN');
            this.updateStats();

            setTimeout(() => {
                if (this.currentLevel !== 7) return;
                this.level7Index++;
                this.userInput = '';
                this.loadTask();
            }, 1600);
        }
    },

    // 数组打乱
    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    // 处理输入
    handleInput(key) {
        const keyUpper = key.toUpperCase();
        
        switch(this.currentLevel) {
            case 1:
                this.handleLevel1Input(keyUpper);
                break;
            case 2:
                this.handleLevel2Input(keyUpper);
                break;
            case 3:
                this.handleLevel3Input(keyUpper);
                break;
            case 4:
                this.handleLevel4Input(keyUpper);
                break;
            case 6:
                this.handleLevel6Input(keyUpper);
                break;
        }
    },

    // Level 1 输入处理
    handleLevel1Input(key) {
        const expected = this.level1Data[this.level1Index];
        if (key === expected) {
            this.showFeedback(true, '太棒了！');
            this.correctCount++;
            this.stars++;
            this.playSound('correct');
            
            setTimeout(() => {
                if (this.currentLevel !== 1) return;
                this.level1Index++;
                this.loadTask();
            }, 1000);
        } else {
            this.showFeedback(false, '再试试！');
            this.wrongCount++;
            this.playSound('wrong');
        }
        this.updateStats();
    },

    // Level 2 输入处理
    handleLevel2Input(key) {
        const expected = this.level2Data[this.level2Index];
        if (key === expected) {
            this.showFeedback(true, '正确！');
            this.correctCount++;
            this.stars++;
            this.playSound('correct');
            
            setTimeout(() => {
                if (this.currentLevel !== 2) return;
                this.level2Index++;
                this.loadTask();
            }, 1000);
        } else {
            this.showFeedback(false, '不对，再试试！');
            this.wrongCount++;
            this.playSound('wrong');
        }
        this.updateStats();
    },

    // Level 3 输入处理
    handleLevel3Input(key) {
        const task = this.level3Data[this.level3Index];
        const expectedChar = task.word[this.userInput.length];
        
        if (key === expectedChar) {
            this.userInput += key;
            document.getElementById('input-display').textContent = this.userInput;
            
            // 高亮下一个字母
            if (this.userInput.length < task.word.length) {
                this.highlightKey(task.word[this.userInput.length]);
            }
            
            // 检查是否完成
            if (this.userInput === task.word) {
                this.showFeedback(true, '太棒了！');
                this.correctCount++;
                this.stars += 2;
                this.playSound('correct');
                
                setTimeout(() => {
                    if (this.currentLevel !== 3) return;
                    this.level3Index++;
                    this.userInput = '';
                    this.loadTask();
                }, 1500);
            } else {
                this.playSound('key');
            }
        } else {
            this.showFeedback(false, '不对，再试试！');
            this.wrongCount++;
            this.userInput = '';
            document.getElementById('input-display').textContent = '';
            this.highlightKey(task.word[0]);
            this.playSound('wrong');
        }
        this.updateStats();
    },

    // Level 4 输入处理
    handleLevel4Input(key) {
        const sentence = this.level4Data[this.level4Index];
        const expectedChar = sentence[this.userInput.length];
        
        // 处理空格：如果期望是空格，key应该是空格；如果期望是字母，key应该是字母
        const isMatch = (key === ' ' && expectedChar === ' ') || 
                       (key !== ' ' && expectedChar !== ' ' && key === expectedChar);
        
        if (isMatch) {
            this.userInput += key;
            // 显示时，空格显示为可见字符
            const displayText = this.userInput.replace(/ /g, '·');
            document.getElementById('input-display').textContent = displayText;
            
            // 高亮下一个字符
            if (this.userInput.length < sentence.length) {
                const nextChar = sentence[this.userInput.length];
                if (nextChar !== ' ') {
                    this.highlightKey(nextChar);
                } else {
                    // 如果是空格，显示提示
                    document.getElementById('input-hint').innerHTML = 
                        `输入空格 <span class="highlight">[空格键]</span>`;
                }
            }
            
            // 检查是否完成
            if (this.userInput === sentence) {
                this.showFeedback(true, '完美！');
                this.correctCount++;
                this.stars += 3;
                this.playSound('correct');
                
                setTimeout(() => {
                    if (this.currentLevel !== 4) return;
                    this.level4Index++;
                    this.userInput = '';
                    this.loadTask();
                }, 1500);
            } else {
                this.playSound('key');
            }
        } else {
            this.showFeedback(false, '不对，再试试！');
            this.wrongCount++;
            this.userInput = '';
            document.getElementById('input-display').textContent = '';
            const firstChar = sentence[0];
            if (firstChar !== ' ') {
                this.highlightKey(firstChar);
            } else {
                document.getElementById('input-hint').innerHTML = 
                    `输入空格 <span class="highlight">[空格键]</span>`;
            }
            this.playSound('wrong');
        }
        this.updateStats();
    },

    // 高亮按键
    highlightKey(key) {
        // 移除所有高亮
        document.querySelectorAll('.key').forEach(k => {
            k.classList.remove('highlight', 'active');
        });
        
        // 添加高亮
        const keyEl = document.querySelector(`[data-key="${key}"]`);
        if (keyEl) {
            keyEl.classList.add('highlight');
            setTimeout(() => {
                keyEl.classList.remove('highlight');
            }, 2000);
        }
    },

    // 显示反馈
    showFeedback(isCorrect, message) {
        const feedbackEl = document.getElementById('feedback-area');
        const className = isCorrect ? 'correct' : 'wrong';
        const emoji = isCorrect ? '✓' : '✗';
        
        feedbackEl.innerHTML = `<div class="feedback ${className}">${emoji} ${message}</div>`;
        
        setTimeout(() => {
            feedbackEl.innerHTML = '';
        }, 2000);
    },

    // 更新统计
    updateStats() {
        document.getElementById('current-stars').textContent = this.stars;
        document.getElementById('correct-count').textContent = this.correctCount;
        document.getElementById('wrong-count').textContent = this.wrongCount;
    },

    // 完成关卡
    completeLevel() {
        const accuracy = this.correctCount / (this.correctCount + this.wrongCount) || 0;
        let stars = 1;

        if (accuracy >= 0.9 && this.correctCount >= 10) stars = 3;
        else if (accuracy >= 0.7 && this.correctCount >= 5) stars = 2;

        Storage.updateLevel(this.currentLevel, stars);
        this.finishLevel(stars);
    },

    // 计时：开始
    startTimer() {
        this.startTime = Date.now();
        this.elapsedMs = 0;
        const el = document.getElementById('elapsed-time');
        if (el) el.textContent = '0:00';
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            this.elapsedMs = Date.now() - this.startTime;
            if (el) el.textContent = this.fmtTime(this.elapsedMs);
        }, 250);
    },

    // 计时：停止并返回用时（毫秒）
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.elapsedMs = this.startTime ? Date.now() - this.startTime : 0;
        return this.elapsedMs;
    },

    // 格式化毫秒为 m:ss
    fmtTime(ms) {
        const total = Math.floor(ms / 1000);
        const m = Math.floor(total / 60);
        const s = total % 60;
        return `${m}:${s < 10 ? '0' + s : s}`;
    },

    // 语音朗读
    speak(text, lang) {
        try {
            if (!('speechSynthesis' in window)) return;
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.lang = lang || 'en-US';
            u.rate = 0.9;
            window.speechSynthesis.speak(u);
        } catch (e) { /* 忽略不支持的环境 */ }
    },

    // 朗读当前题目
    speakCurrent() {
        if (this.currentSpeech) this.speak(this.currentSpeech.text, this.currentSpeech.lang);
    },

    // 显示/隐藏「听」按钮
    showListenButton(show) {
        const b = document.getElementById('listen-btn');
        if (b) b.style.display = show ? 'inline-block' : 'none';
    },

    // 弹出成绩卡（功能 1：计时 + 分享）
    finishLevel(stars) {
        const elapsed = this.stopTimer();
        this.showListenButton(false);
        if (typeof showResult === 'function') {
            showResult(this.currentLevel, stars, elapsed, this.correctCount, this.wrongCount);
        }
    },

    // 播放音效
    playSound(type) {
        const settings = Storage.getSettings();
        if (!settings.sound) return;
        
        // 简单的音效提示（可以用实际音频文件替换）
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'correct') {
            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
        } else if (type === 'wrong') {
            oscillator.frequency.value = 300;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
        } else if (type === 'key') {
            oscillator.frequency.value = 600;
            gainNode.gain.value = 0.05;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    },

    // Level 5: 打字泡泡游戏
    startBubbleGame() {
        document.getElementById('practice-area').style.display = 'none';
        document.getElementById('game-area').style.display = 'block';
        
        this.bubbleGame = {
            score: 0,
            timeLeft: 60,
            bubbles: [],
            interval: null,
            timer: null
        };
        
        this.updateGameScore();
        this.startBubbleTimer();
        this.spawnBubble();
    },

    spawnBubble() {
        if (!this.bubbleGame) return;
        
        const canvas = document.getElementById('game-canvas');
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const letter = letters[Math.floor(Math.random() * letters.length)];
        
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = letter;
        bubble.dataset.letter = letter;
        bubble.style.left = Math.random() * (canvas.offsetWidth - 60) + 'px';
        bubble.style.animationDuration = (3 + Math.random() * 2) + 's';
        
        canvas.appendChild(bubble);
        
        // 移除到达顶部的泡泡
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.remove();
                this.bubbleGame.score = Math.max(0, this.bubbleGame.score - 1);
                this.updateGameScore();
            }
        }, 5000);
        
        // 继续生成泡泡
        if (this.bubbleGame.timeLeft > 0) {
            const delay = Math.max(1000, 2000 - this.bubbleGame.score * 10);
            this.bubbleGame.interval = setTimeout(() => this.spawnBubble(), delay);
        }
    },

    handleBubbleInput(key) {
        if (!this.bubbleGame) return;
        
        const keyUpper = key.toUpperCase();
        const bubbles = document.querySelectorAll('.bubble');
        
        bubbles.forEach(bubble => {
            if (bubble.dataset.letter === keyUpper) {
                bubble.remove();
                this.bubbleGame.score += 10;
                this.updateGameScore();
                this.playSound('correct');
                return;
            }
        });
    },

    startBubbleTimer() {
        this.bubbleGame.timer = setInterval(() => {
            this.bubbleGame.timeLeft--;
            document.getElementById('game-time').textContent = this.bubbleGame.timeLeft;
            
            if (this.bubbleGame.timeLeft <= 0) {
                this.endBubbleGame();
            }
        }, 1000);
    },

    endBubbleGame() {
        const score = this.bubbleGame ? this.bubbleGame.score : 0;
        this.cleanupBubbleGame();
        const stars = score >= 500 ? 3 : score >= 300 ? 2 : 1;
        Storage.updateLevel(5, stars);
        this.finishLevel(stars);
    },

    // 清理泡泡游戏
    cleanupBubbleGame() {
        if (this.bubbleGame) {
            if (this.bubbleGame.timer) {
                clearInterval(this.bubbleGame.timer);
            }
            if (this.bubbleGame.interval) {
                clearTimeout(this.bubbleGame.interval);
            }
            document.querySelectorAll('.bubble').forEach(b => b.remove());
            this.bubbleGame = null;
        }
    },

    updateGameScore() {
        if (this.bubbleGame) {
            document.getElementById('game-score').textContent = this.bubbleGame.score;
        }
    }
};

