// 等待 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化筛选功能
    const coachFilter = new CoachFilter();

    // 交互增强
    document.querySelectorAll('.tag-item').forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    // 下拉菜单点击外部关闭
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.price-selector')) {
            document.querySelectorAll('.custom-select').forEach(select => {
                select.blur();
            });
        }
    });
});