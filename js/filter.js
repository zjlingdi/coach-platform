class CoachFilter {
    constructor() {
        this.specialtyTags = document.querySelectorAll('.tag-item input');
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
        const selectedSpecialties = Array.from(this.specialtyTags)
            .filter(tag => tag.checked)
            .map(tag => tag.value);

        const selectedPriceRange = this.priceFilter.value;

        const filteredCoaches = this.coaches.filter(coach => {
            const matchesSpecialty = selectedSpecialties.length === 0 || coach.specialties.some(specialty => selectedSpecialties.includes(specialty));
            const matchesPrice = this.filterByPrice(coach.pricePerHour, selectedPriceRange);
            return matchesSpecialty && matchesPrice;
        });

        this.renderCoaches(filteredCoaches);
    }

    filterByPrice(price, range) {
        switch (range) {
            case '0-500':
                return price < 500;
            case '500-1000':
                return price >= 500 && price < 1000;
            case '1000-2000':
                return price >= 1000 && price < 2000;
            case '2000+':
                return price >= 2000;
            default:
                return true; // 全部价格
        }
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