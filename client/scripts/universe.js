// Universe system v1
document.addEventListener('DOMContentLoaded', () => {
  const space = document.getElementById('space');
  const postForm = document.getElementById('postForm');
  const postText = document.getElementById('postText');
  const emotionSelect = document.getElementById('emotionSelect');
  const reactionMenu = document.getElementById('reactionMenu');

  const emotionPositions = {
    abyss: () => randomPos(document.getElementById('abyss')),
    cavern: () => randomPos(document.getElementById('cavern')),
    dross: () => randomPos(document.getElementById('dross')),
    ember: () => randomPos(document.getElementById('ember')),
    glare: () => randomPos(document.getElementById('glare')),
    languish: () => randomPos(document.getElementById('languish')),
    mist: () => randomPos(document.getElementById('mist')),
    oasis: () => randomPos(document.getElementById('oasis')),
    trace: () => randomPos(document.getElementById('trace')),
    zenith: () => randomPos(document.getElementById('zenith')),
  };

  const posts = new Map();

  function randomPos(planet) {
    const rect = planet.getBoundingClientRect();
    const spaceRect = space.getBoundingClientRect();
    const x = rect.left + rect.width/2 - spaceRect.left + (Math.random()*60-30);
    const y = rect.top + rect.height/2 - spaceRect.top + (Math.random()*60-30);
    return {x, y};
  }

  function createPost(text, emotion) {
    const div = document.createElement('div');
    div.classList.add('post');
    div.textContent = text;
    div.dataset.emotion = emotion;
    div.dataset.id = Date.now().toString();
    space.appendChild(div);
    movePost(div, emotion);
    posts.set(div.dataset.id, div);
  }

  function movePost(el, emotion) {
    const pos = emotionPositions[emotion]();
    el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
  }

  postForm.addEventListener('submit', e => {
    e.preventDefault();
    if (postText.value.trim() === '') return;
    createPost(postText.value.trim(), emotionSelect.value);
    postText.value = '';
  });

  space.addEventListener('click', e => {
    if (e.target.classList.contains('post')) {
      const post = e.target;
      const rect = post.getBoundingClientRect();
      reactionMenu.style.left = rect.left + 'px';
      reactionMenu.style.top = rect.bottom + 'px';
      reactionMenu.dataset.postId = post.dataset.id;
      reactionMenu.classList.remove('hidden');
    } else if (!reactionMenu.contains(e.target)) {
      reactionMenu.classList.add('hidden');
    }
  });

  reactionMenu.addEventListener('click', e => {
    if (e.target.dataset.emotion) {
      const postId = reactionMenu.dataset.postId;
      const post = posts.get(postId);
      if (post) {
        const emotion = e.target.dataset.emotion;
        post.dataset.emotion = emotion;
        movePost(post, emotion);
      }
      reactionMenu.classList.add('hidden');
    }
  });
});
