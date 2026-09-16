// 游戏逻辑模块
const Game = {
    currentLevel: 1,
    currentTask: null,
    userInput: '',
    correctCount: 0,
    wrongCount: 0,
    stars: 0,
    
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
        
        alert(`恭喜完成 Level ${this.currentLevel}！\n正确: ${this.correctCount}\n错误: ${this.wrongCount}\n获得星星: ${stars}⭐`);
        
        exitGame();
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
        this.cleanupBubbleGame();
        
        const stars = this.bubbleGame.score >= 500 ? 3 : this.bubbleGame.score >= 300 ? 2 : 1;
        Storage.updateLevel(5, stars);
        
        alert(`游戏结束！\n得分: ${this.bubbleGame.score}\n获得星星: ${stars}⭐`);
        
        exitGame();
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

