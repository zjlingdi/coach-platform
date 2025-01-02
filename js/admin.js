class CoachAdmin {
    constructor() {
        this.form = document.getElementById('coachForm');
        this.addCaseButton = document.getElementById('addCase');
        this.addSpecialtyButton = document.getElementById('addSpecialty');
        this.generateJsonButton = document.getElementById('generateJson');
        this.copyJsonButton = document.getElementById('copyJson');
        this.avatarInput = document.getElementById('avatar');
        
        this.bindEvents();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.addCaseButton.addEventListener('click', () => this.addCaseField());
        this.addSpecialtyButton.addEventListener('click', () => this.addSpecialty());
        this.generateJsonButton.addEventListener('click', () => this.generateJson());
        this.copyJsonButton.addEventListener('click', () => this.copyJsonToClipboard());
        this.avatarInput.addEventListener('change', (e) => this.handleImagePreview(e));
    }

    handleImagePreview(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById('avatarPreview');
                preview.innerHTML = `<img src="${e.target.result}" alt="预览图片">`;
            };
            reader.readAsDataURL(file);
        }
    }

    addCaseField() {
        const container = document.getElementById('casesContainer');
        const caseItem = document.createElement('div');
        caseItem.className = 'case-item';
        caseItem.innerHTML = `
            <input type="text" name="caseTitle[]" placeholder="案例标题" required>
            <textarea name="caseDescription[]" placeholder="案例描述" required></textarea>
            <button type="button" class="remove-case">删除案例</button>
        `;
        
        caseItem.querySelector('.remove-case').addEventListener('click', () => {
            container.removeChild(caseItem);
        });
        
        container.appendChild(caseItem);
    }

    addSpecialty() {
        const newSpecialty = document.getElementById('newSpecialty').value.trim();
        if (!newSpecialty) return;

        const checkboxes = document.querySelector('.specialty-checkboxes');
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" name="specialties" value="${newSpecialty}" checked>
            ${newSpecialty}
        `;
        
        checkboxes.insertBefore(label, document.getElementById('newSpecialty'));
        document.getElementById('newSpecialty').value = '';
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = this.getFormData();
        console.log('表单数据：', formData);
        // 这里可以添加保存到本地存储或发送到服务器的逻辑
    }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {
            id: Date.now().toString(), // 生成唯一ID
            name: formData.get('name'),
            specialties: Array.from(formData.getAll('specialties')),
            pricePerHour: parseInt(formData.get('pricePerHour')),
            introduction: formData.get('introduction'),
            cases: this.getCases()
        };

        // 处理头像
        const avatarFile = formData.get('avatar');
        if (avatarFile && avatarFile.name) {
            data.avatar = URL.createObjectURL(avatarFile);
        } else {
            data.avatar = 'images/coaches/default-avatar.jpg';
        }

        return data;
    }

    getCases() {
        const titles = Array.from(document.getElementsByName('caseTitle[]'));
        const descriptions = Array.from(document.getElementsByName('caseDescription[]'));
        
        return titles.map((title, index) => ({
            title: title.value,
            description: descriptions[index].value
        }));
    }

    generateJson() {
        const data = this.getFormData();
        const jsonOutput = document.getElementById('jsonOutput');
        jsonOutput.textContent = JSON.stringify(data, null, 2);
    }

    copyJsonToClipboard() {
        const jsonOutput = document.getElementById('jsonOutput');
        navigator.clipboard.writeText(jsonOutput.textContent)
            .then(() => alert('JSON数据已复制到剪贴板'))
            .catch(err => console.error('复制失败:', err));
    }
}

// 初始化管理页面
document.addEventListener('DOMContentLoaded', () => {
    new CoachAdmin();
}); 