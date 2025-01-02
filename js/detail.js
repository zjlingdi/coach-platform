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
        const container = document.querySelector('.coach-profile');
        container.innerHTML = `
            <div class="profile-header">
                <div class="profile-avatar">
                    <img src="${coach.avatar}" alt="${coach.name}的头像">
                </div>
                <div class="profile-info">
                    <h1 class="profile-name">${coach.name}</h1>
                    <div class="profile-tags">
                        ${coach.specialties.map(specialty =>
                            `<span class="tag">${specialty}</span>`
                        ).join('')}
                    </div>
                    <div class="profile-price">
                        <span>咨询价格：￥${coach.pricePerHour}/小时</span>
                    </div>
                    <div class="profile-introduction">
                        ${coach.introduction}
                    </div>
                </div>
            </div>
            <div class="cases-section">
                <h2>成功案例</h2>
                ${coach.cases.map(case_ => `
                    <div class="case-item">
                        <div class="case-title">${case_.title}</div>
                        <div class="case-description">${case_.description}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// 初始化详情页
document.addEventListener('DOMContentLoaded', () => {
    new CoachDetail();
}); 