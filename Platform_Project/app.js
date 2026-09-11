// التحكم في التبديل بين قسم الدروس وقسم الاختبارات
function switchTab(tabId) {
    // إخفاء كل المحتوى
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active-content');
    });
    
    // إزالة التفعيل من كل الأزرار
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // إظهار القسم المطلوب وتفعيل زره
    document.getElementById(tabId).classList.add('active-content');
    event.currentTarget.classList.add('active');
}

// دالة لتوليد أزرار الوحدات بناءً على البيانات في ملف data.js
function renderUnits() {
    const navContainer = document.getElementById('units-nav');
    
    platformData.forEach((unit, index) => {
        // إنشاء زر لكل وحدة
        const button = document.createElement('button');
        button.className = 'unit-btn';
        button.innerText = unit.unitName;
        
        // عند النقر على الوحدة، نظهر فيديوهاتها
        button.onclick = () => {
            // تلوين الزر النشط
            document.querySelectorAll('.unit-btn').forEach(btn => btn.classList.remove('active-unit'));
            button.classList.add('active-unit');
            
            // استدعاء دالة عرض الفيديوهات
            loadVideos(index);
        };
        
        navContainer.appendChild(button);
    });
}

// دالة لتحميل فيديوهات الوحدة المحددة
function loadVideos(unitIndex) {
    const container = document.getElementById('videos-container');
    container.innerHTML = ''; // تفريغ المحتوى القديم
    
    const videos = platformData[unitIndex].videos;
    
    if(videos.length === 0) {
        container.innerHTML = '<p class="welcome-message">قريباً سيتم رفع دروس هذه الوحدة...</p>';
        return;
    }
    
    // إنشاء كروت الفيديوهات
    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        
        card.innerHTML = `
            <div class="video-title">${video.title}</div>
            <div class="iframe-container">
                <iframe 
                    src="https://www.youtube.com/embed/${video.youtubeId}" 
                    title="${video.title}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// تشغيل التهيئة عند تحميل الصفحة
window.onload = () => {
    renderUnits();
};