class CoachFilter {
    constructor() {
        this.specialtyTags = document.querySelectorAll('.specialty-tags input');
        this.priceFilter = document.getElementById('price-filter');
        this.coaches = [];

        this.init();
    }

    async init() {
        console.log('初始化 CoachFilter...');
        // 加载教练数据
        this.coaches = await DataLoader.loadCoaches();
        console.log('加载到的教练数据:', this.coaches);
        this.renderCoaches(this.coaches);
        this.bindEvents();
    }

    bindEvents() {
        // 绑定专长筛选事件
        this.specialtyTags.forEach(tag => {
            tag.addEventListener('change', () => this.filterCoaches());
        });

        // 绑定价格筛选事件
        this.priceFilter.addEventListener('change', () => this.filterCoaches());
    }

    filterCoaches() {
        // 获取选中的专长
        const selectedSpecialties = Array.from(this.specialtyTags)
            .filter(tag => tag.checked)
            .map(tag => tag.value);

        // 获取选中的价格范围
        const priceRange = this.priceFilter.value;

        // 筛选教练
        let filteredCoaches = this.coaches;

        // 按专长筛选
        if (selectedSpecialties.length > 0) {
            filteredCoaches = filteredCoaches.filter(coach =>
                coach.specialties.some(specialty =>
                    selectedSpecialties.includes(specialty)
                )
            );
        }

        // 按价格筛选
        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(Number);
            filteredCoaches = filteredCoaches.filter(coach => {
                if (priceRange === '2000+') {
                    return coach.pricePerHour >= 2000;
                }
                return coach.pricePerHour >= min && coach.pricePerHour <= (max || Infinity);
            });
        }

        // 渲染筛选结果
        this.renderCoaches(filteredCoaches);
    }

    renderCoaches(coaches) {
        const coachesGrid = document.querySelector('.coaches-grid');
        coachesGrid.innerHTML = coaches.map(coach => this.createCoachCard(coach)).join('');
    }

    createCoachCard(coach) {
        return `
            <article class="coach-card">
                <div class="coach-avatar">
                    <img src="${coach.avatar}" alt="${coach.name}的头像">
                </div>
                <div class="coach-info">
                    <h2 class="coach-name">${coach.name}</h2>
                    <div class="coach-tags">
                        ${coach.specialties.map(specialty =>
                            `<span class="tag">${specialty}</span>`
                        ).join('')}
                    </div>
                    <div class="coach-price">
                        <span class="price-range">￥${coach.pricePerHour}/小时</span>
                    </div>
                    <p class="coach-intro">${coach.introduction}</p>
                    <a href="coach-detail.html?id=${coach.id}" class="view-more-btn">查看详情</a>
                </div>
            </article>
        `;
    }
} 