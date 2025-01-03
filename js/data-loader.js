class DataLoader {
    // 加载教练数据
    static async loadCoaches() {
        try {
            console.log('开始加载教练数据...');
            const response = await fetch('https://cdn.jsdelivr.net/gh/zjlingdi/coach-platform@main/data/coaches.json');
            const data = await response.json();
            console.log('成功加载教练数据:', data);
            return data.coaches;
        } catch (error) {
            console.error('加载教练数据失败:', error.message);
            console.error('完整错误:', error);
            return [];
        }
    }
} 