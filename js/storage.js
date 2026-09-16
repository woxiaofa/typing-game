// 存储管理模块
const Storage = {
    // 获取进度数据
    getProgress() {
        const progress = localStorage.getItem('typingProgress');
        return progress ? JSON.parse(progress) : {
            levels: {
                1: { completed: false, stars: 0 },
                2: { completed: false, stars: 0 },
                3: { completed: false, stars: 0 },
                4: { completed: false, stars: 0 },
                5: { completed: false, stars: 0 }
            },
            totalStars: 0,
            settings: {
                sound: true,
                music: true,
                fontSize: 'normal'
            }
        };
    },

    // 保存进度数据
    saveProgress(progress) {
        localStorage.setItem('typingProgress', JSON.stringify(progress));
    },

    // 更新关卡进度
    updateLevel(level, stars) {
        const progress = this.getProgress();
        progress.levels[level] = {
            completed: true,
            stars: Math.max(progress.levels[level].stars || 0, stars)
        };
        
        // 计算总星星数
        progress.totalStars = Object.values(progress.levels).reduce((sum, l) => sum + (l.stars || 0), 0);
        
        this.saveProgress(progress);
        return progress;
    },

    // 获取设置
    getSettings() {
        const progress = this.getProgress();
        return progress.settings || {
            sound: true,
            music: true,
            fontSize: 'normal'
        };
    },

    // 保存设置
    saveSettings(settings) {
        const progress = this.getProgress();
        progress.settings = settings;
        this.saveProgress(progress);
    }
};

