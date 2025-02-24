class CoachDetail {
    constructor() {
        this.coachId = new URLSearchParams(window.location.search).get('id');
        this.init();
    }

    async init() {
        if (!this.coachId) {
            this.showError('未找到教练信息');
            return;
        }

        const coaches = await DataLoader.loadCoaches();
        const coach = coaches.find(c => c.id === this.coachId);

        if (!coach) {
            this.showError('未找到教练信息');
            return;
        }

        this.renderCoachDetail(coach);
    }

    showError(message) {
        const container = document.querySelector('.coach-profile');
        container.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
                <a href="index.html">返回首页</a>
            </div>
        `;
    }

    renderCoachDetail(coach) {
        const profileHtml = `
            <div class="profile-header">
                <img src="${coach.avatar}" alt="${coach.name}的头像" class="profile-avatar">
                <div class="profile-info">
                    <h1>${coach.name}</h1>
                    <div class="profile-tags">
                        ${coach.specialties.map(s => `<span class="profile-tag">${s}</span>`).join('')}
                    </div>
                    <p class="profile-price">咨询价格：${coach.pricePerHour}元/小时</p>
                </div>
            </div>
            
            <div class="profile-section">
                <h2>个人介绍</h2>
                <p class="profile-intro">${coach.introduction}</p>
            </div>
            
            <div class="profile-section">
                <h2>成功案例</h2>
                <div class="cases-list">
                    ${coach.cases.map(c => `
                        <div class="case-item">
                            <h3>${c.title}</h3>
                            <p>${c.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.querySelector('.coach-profile').innerHTML = profileHtml;
        this.wechatId = coach.wechat;
    }
}

function showContactInfo() {
    const modal = document.getElementById('contactModal');
    const wechatSpan = document.getElementById('coachWechat');
    const closeBtn = modal.querySelector('.close');
    
    // 从 URL 获取教练 ID
    const urlParams = new URLSearchParams(window.location.search);
    const coachId = urlParams.get('id');
    
    // 获取教练数据
    DataLoader.loadCoaches().then(coaches => {
        const coach = coaches.find(c => c.id === coachId);
        if (coach) {
            wechatSpan.textContent = coach.wechat;
            modal.style.display = 'block';
        }
    });
    
    // 关闭弹窗
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// 初始化详情页
document.addEventListener('DOMContentLoaded', () => {
    new CoachDetail();
}); 