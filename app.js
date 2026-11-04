(() => {
'use strict';
const root=document.documentElement;
const texts={front:{label:'Front · знакомая ситуация',title:'Почему близость\nне отменяет границ?',paragraphs:['Хочется быть рядом с другим человеком — и всё же оставаться собой. Иногда просьба о личном пространстве звучит как отвержение, хотя отношения по-прежнему важны.','Попробуй заметить момент, когда согласие перестаёт быть свободным. Что ты чувствуешь, когда говоришь «да», хотя хотел сказать «нет»?'],question:'Где в отношениях остаётся место для тебя?'},meta:{label:'Meta · устройство отношений',title:'Граница делает\nсвязь возможной.',paragraphs:['Отношение предполагает различие: есть я, есть другой и есть пространство между нами. Если это различие исчезает, становится трудно понять, чьё желание определяет происходящее.','Граница обозначает место каждого в связи. Она позволяет различать своё и чужое, говорить о желании и договариваться о том, как быть вместе.'],question:'Какая связь возникает, когда различие сохраняется?'}};
let transition;
function setMode(mode){
 if(root.dataset.mode===mode)return;
 const apply=()=>{root.dataset.mode=mode;const t=texts[mode];document.querySelector('#reading-label').textContent=t.label;document.querySelector('#reading-title').textContent=t.title;document.querySelector('#reading-body').replaceChildren(...t.paragraphs.map(value=>{const p=document.createElement('p');p.textContent=value;return p;}));document.querySelector('#reading-question').textContent=t.question;document.querySelectorAll('[data-mode][aria-pressed]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));document.querySelector('#switch-reading').textContent=mode==='front'?'Посмотреть в Meta ↗':'Вернуться к Front ↗';document.querySelector('meta[name="theme-color"]').content=mode==='front'?'#f8fafc':'#0d121c';};
 transition?.skipTransition();
 if(document.startViewTransition&&!matchMedia('(prefers-reduced-motion: reduce)').matches){transition=document.startViewTransition(apply);transition.finished.catch(()=>{});}else apply();
}
document.querySelectorAll('.mode-picker button').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
document.querySelector('#switch-reading').addEventListener('click',()=>setMode(root.dataset.mode==='front'?'meta':'front'));
})();
