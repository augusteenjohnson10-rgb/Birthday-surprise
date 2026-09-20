const scenes=[...document.querySelectorAll('.scene')];let current=0;
const dots=document.getElementById('dots');
scenes.forEach((_,i)=>{const d=document.createElement('button');d.className='dot'+(i===0?' active':'');d.title=`Page ${i+1}`;d.setAttribute('aria-label',`Go to page ${i+1}`);d.onclick=()=>go(i);dots.appendChild(d)});
const dotEls=[...dots.children];
function go(i){current=Math.max(0,Math.min(scenes.length-1,i));scenes.forEach((s,n)=>s.classList.toggle('active',n===current));dotEls.forEach((d,n)=>d.classList.toggle('active',n===current));document.getElementById('prev').disabled=current===0;document.getElementById('next').disabled=current===scenes.length-1}
document.getElementById('prev').onclick=()=>go(current-1);document.getElementById('next').onclick=()=>go(current+1);document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(+b.dataset.go));
window.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(current+1);if(e.key==='ArrowLeft')go(current-1);if(e.key==='Escape')closeModal()});
const love=[
['The way you care','I love how you care for me and remind me to sleep early like my mom 😭💖'],
['The time you make','I love how you manage your time to join me on Roblox, even when you know how much problem it could create.'],
['Learning together','I love how we learn our languages and somehow make even that into something special between us.'],
['Your everyday stories','I love how you tell me every part of your day. Even the random things — I genuinely love hearing them.'],
['Those cute pins','I love seeing those cute little pins on our chats, and honestly I wanna know the reaction behind every single one. 😭'],
['Always understanding me',"I love how you've always understood me and stood by my side. 🥹💖"],
['Making it fun','I love how you always tried to make our conversations fun, even when there was absolutely nothing interesting happening.'],
['One little secret',"I love how your mood changes somehow make me like you more every time. 😭 I don't even know why I blush when you— never mind."]];
const opens=[
['Open when you miss me','If you opened this, I hope you know that I probably miss you too. Even when we\'re doing our own things, you still cross my mind in the most random moments. ♡'],
['Open when you need a hug','No fancy words here. Just imagine a really long, comfortable hug, and remember that you deserve to feel safe, cared for and appreciated.'],
["Open when you're having a bad day","One bad day doesn't get to decide what the rest of your week looks like. Take a breath, be gentle with yourself, and remember that tomorrow can be different."],
["Open when you can't sleep","You don't have to solve everything tonight. Get comfortable, breathe slowly, and let your mind rest for a while. 🌙"],
['Open when you need reassurance','You matter. You\'re appreciated. And you don\'t have to be perfect to deserve care. Just be you — that\'s already enough.'],
['Open when you think I forgot your birthday',"I didn't forget. I just accidentally fell asleep like an idiot 😭. I'm genuinely sorry I missed 12, and I hope this whole little surprise makes you smile anyway. ♡"]];
function buildEnvelopes(items,host){items.forEach((x,i)=>{const b=document.createElement('button');b.className='envelope';b.style.setProperty('--rot',`${[-2,2,-1,3,-3,1,2,-2][i]}deg`);b.innerHTML='<span class="env-body"></span><span class="env-flap"></span><span class="env-seal">♡</span><span class="env-label"></span>';b.querySelector('.env-label').textContent=x[0];b.onclick=()=>{b.classList.add('opened');openModal(x[0],x[1])};host.appendChild(b)})}
buildEnvelopes(love,document.getElementById('love-envelopes'));buildEnvelopes(opens,document.getElementById('open-envelopes'));
const modal=document.getElementById('modal');function openModal(t,p){document.getElementById('modal-title').textContent=t;document.getElementById('modal-text').textContent=p;modal.classList.add('open');modal.setAttribute('aria-hidden','false')}function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}document.getElementById('modal-close').onclick=closeModal;modal.onclick=e=>{if(e.target===modal)closeModal()};
const audio=document.getElementById('music'),play=document.getElementById('play'),dock=document.getElementById('dock-play'),progress=document.getElementById('progress'),dockProgress=document.getElementById('dock-progress'),now=document.getElementById('now'),length=document.getElementById('length');
function fmt(s){return Number.isFinite(s)?`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`:'0:00'}function sync(){const p=!audio.paused;play.textContent=p?'❚❚':'▶';dock.textContent=p?'❚❚':'▶';play.setAttribute('aria-label',p?'Pause Lovers Rock':'Play Lovers Rock')}async function toggle(){if(audio.paused){try{await audio.play()}catch(e){}}else audio.pause();sync()}play.onclick=toggle;dock.onclick=toggle;audio.addEventListener('loadedmetadata',()=>length.textContent=fmt(audio.duration));audio.addEventListener('timeupdate',()=>{const pct=audio.duration?audio.currentTime/audio.duration*100:0;progress.style.width=pct+'%';dockProgress.style.width=pct+'%';now.textContent=fmt(audio.currentTime)});audio.addEventListener('play',sync);audio.addEventListener('pause',sync);
const bloom=document.getElementById('bloom'),board=document.getElementById('bouquet'),end=document.getElementById('bouquet-end');bloom.onclick=()=>{board.classList.add('bloom');bloom.textContent='It’s blooming ♡';bloom.disabled=true;setTimeout(()=>end.classList.add('show'),1900)};
go(0);sync();
