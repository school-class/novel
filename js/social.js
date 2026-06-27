import { auth, onAuthStateChanged } from './firebase-config.js';

export function initSocialFeatures(novelId, authorName) {
    onAuthStateChanged(auth, (user) => {
        const heartBtn = document.getElementById('heartBtn');
        const followBtn = document.getElementById('followBtn');

        if (!user) {
            if (heartBtn) heartBtn.onclick = () => alert('いいねするにはログインが必要です。');
            if (followBtn) followBtn.onclick = () => alert('フォローするにはログインが必要です。');
            return;
        }

        const userEmail = user.email;

        // --- Heart Logic ---
        if (heartBtn) {
            let likes = JSON.parse(localStorage.getItem(`surge_likes_${userEmail}`)) || [];
            if (likes.includes(novelId)) {
                heartBtn.classList.add('active');
                heartBtn.querySelector('.icon').textContent = '❤️';
            }

            heartBtn.onclick = () => {
                likes = JSON.parse(localStorage.getItem(`surge_likes_${userEmail}`)) || [];
                if (likes.includes(novelId)) {
                    likes = likes.filter(id => id !== novelId);
                    heartBtn.classList.remove('active');
                    heartBtn.querySelector('.icon').textContent = '🤍';
                } else {
                    likes.push(novelId);
                    heartBtn.classList.add('active');
                    heartBtn.querySelector('.icon').textContent = '❤️';
                }
                localStorage.setItem(`surge_likes_${userEmail}`, JSON.stringify(likes));
            };
        }

        // --- Follow Logic ---
        if (followBtn) {
            let follows = JSON.parse(localStorage.getItem(`surge_follows_${userEmail}`)) || [];
            if (follows.includes(authorName)) {
                followBtn.classList.add('active-follow');
                followBtn.textContent = 'フォロー中';
            }

            followBtn.onclick = () => {
                follows = JSON.parse(localStorage.getItem(`surge_follows_${userEmail}`)) || [];
                if (follows.includes(authorName)) {
                    follows = follows.filter(name => name !== authorName);
                    followBtn.classList.remove('active-follow');
                    followBtn.textContent = 'フォローする';
                } else {
                    follows.push(authorName);
                    followBtn.classList.add('active-follow');
                    followBtn.textContent = 'フォロー中';
                }
                localStorage.setItem(`surge_follows_${userEmail}`, JSON.stringify(follows));
            };
        }
    });
}
