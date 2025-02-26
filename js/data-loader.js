class DataLoader {
    // 加载教练数据
    static async loadCoaches() {
        try {
            console.log('开始加载教练数据...');
            // 直接返回硬编码的数据
            const data = {
                "coaches": [
                    {
                        "id": "1",
                        "name": "张教练",
                        "avatar": "/coach-platform/images/coaches/3.png",
                        "specialties": ["领导力", "团队管理"],
                        "pricePerHour": 800,
                        "introduction": "专注于领导力培训和团队建设的资深教练，拥有10年以上企业管理经验。",
                        "cases": [
                            {
                                "title": "某500强企业管理团队建设",
                                "description": "帮助企业建立高效的管理体系，提升团队协作能力"
                            }
                        ]
                    },
                    {
                        "id": "2",
                        "name": "李教练",
                        "avatar": "/coach-platform/images/coaches/3.png",
                        "specialties": ["个人成长", "职业发展"],
                        "pricePerHour": 600,
                        "introduction": "致力于帮助个人发现潜能，规划职业发展路径的职业发展教练。",
                        "cases": [
                            {
                                "title": "职业转型咨询",
                                "description": "指导多位职场人士成功实现职业转型"
                            }
                        ]
                    },
                    {
                        "id": "1735830736967",
                        "name": "灵犀",
                        "avatar": "/coach-platform/images/coaches/3.png",
                        "specialties": ["个人成长"],
                        "pricePerHour": 499,
                        "introduction": "治愈系教练",
                        "cases": [
                            {
                                "title": "帮助30人成功找到个人的天赋使命",
                                "description": "xxxx测试"
                            }
                        ]
                    }
                ]
            };
            console.log('成功加载教练数据:', data);
            return data.coaches;
        } catch (error) {
            console.error('加载教练数据失败:', error.message);
            console.error('完整错误:', error);
            return [];
        }
    }
} 