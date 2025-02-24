class CoachAdmin {
    constructor() {
        this.form = document.getElementById('coachForm');
        this.addCaseButton = document.getElementById('addCase');
        this.addSpecialtyButton = document.getElementById('addSpecialty');
        this.generateJsonButton = document.getElementById('generateJson');
        this.copyJsonButton = document.getElementById('copyJson');
        this.avatarInput = document.getElementById('avatar');
        
        // 存储教练数据
        this.existingData = {
            "version": "1.0",
            "lastUpdated": new Date().toISOString().split('T')[0],
            "coaches": [
                {
                    "id": "1",
                    "name": "张教练",
                    "avatar": "images/coaches/3.png",
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
                    "avatar": "images/coaches/3.png",
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
                    "avatar": "images/coaches/3.png",
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
        
        this.bindEvents();
        this.initModal();
    }

    // ... 其他方法保持不变 ...

    getFormData() {
        const formData = new FormData(this.form);
        const data = {
            id: Date.now().toString(),
            name: formData.get('name'),
            specialties: Array.from(formData.getAll('specialties')),
            pricePerHour: parseInt(formData.get('pricePerHour')),
            introduction: formData.get('introduction'),
            cases: this.getCases()  // 修复：添加案例数据
        };

        // 处理头像
        const avatarFile = formData.get('avatar');
        if (avatarFile && avatarFile.name) {
            data.avatar = "images/coaches/3.png";  // 统一使用相同的头像
        } else {
            data.avatar = "images/coaches/3.png";
        }

        return data;
    }

    deleteCoach(coachId) {
        if (confirm('确定要删除这位教练吗？此操作不可撤销。')) {
            try {
                // 从列表中移除教练
                const coachItem = document.querySelector(`.coach-item[data-id="${coachId}"]`);
                if (coachItem) {
                    coachItem.remove();
                }
                
                // 从存储的数据中也删除该教练
                this.existingData.coaches = this.existingData.coaches.filter(
                    coach => coach.id !== coachId
                );
                
                // 更新最后修改时间
                this.existingData.lastUpdated = new Date().toISOString().split('T')[0];
                
                // 更新 JSON 输出
                const jsonOutput = document.getElementById('jsonOutput');
                jsonOutput.textContent = JSON.stringify(this.existingData, null, 2);
                
                // 自动显示下载按钮
                this.showDownloadButton();
            } catch (error) {
                console.error('删除教练失败:', error);
                alert('删除失败，请重试');
            }
        }
    }

    showDownloadButton() {
        const jsonActions = document.querySelector('.json-actions');
        if (!document.getElementById('downloadJson')) {
            const downloadBtn = document.createElement('button');
            downloadBtn.id = 'downloadJson';
            downloadBtn.textContent = '下载更新后的完整JSON';
            downloadBtn.onclick = () => this.downloadFullJson();
            jsonActions.insertBefore(downloadBtn, document.querySelector('.update-instructions'));
        }
    }
}

// 初始化管理页面
let coachAdmin;
document.addEventListener('DOMContentLoaded', () => {
    coachAdmin = new CoachAdmin();
});
