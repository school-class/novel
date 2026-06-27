import os
import re

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Get novelId (filename without extension)
    novel_id = os.path.basename(filepath).replace('.html', '')

    # Extract Author name
    author_match = re.search(r'作者：([^<|]+)', content)
    author_name = author_match.group(1).strip() if author_match else "不明"

    # Add Heart & Follow buttons before the back-link
    social_html = f"""
        <div class="social-actions">
            <button id="heartBtn" class="btn-social"><span class="icon">🤍</span> いいね</button>
            <button id="followBtn" class="btn-social">フォローする</button>
        </div>
    """

    if '<div class="social-actions">' not in content:
        content = content.replace('<a href="../index.html" class="back-link">', social_html + '\n        <a href="../index.html" class="back-link">')

    # Add script at the end of body
    script_html = f"""
    <script type="module">
        import {{ initSocialFeatures }} from '../js/social.js';
        initSocialFeatures('{novel_id}', '{author_name}');
    </script>
</body>"""

    if 'js/social.js' not in content:
        content = content.replace('</body>', script_html)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

novel_dir = 'novels'
for filename in os.listdir(novel_dir):
    if filename.endswith('.html'):
        update_file(os.path.join(novel_dir, filename))
