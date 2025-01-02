class DataLoader {
    // 加载教练数据
    static async loadCoaches() {
        try {
            console.log('开始加载教练数据...');
            console.log('请求URL:', window.location.origin + '/data/coaches.json');
            const response = await fetch('data/coaches.json');
            console.log('fetch 响应状态:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
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