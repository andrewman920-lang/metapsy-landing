(() => {
'use strict';
const root=document.documentElement;
const texts={
  "front": {
    "label": "Front · с чего начинается поиск",
    "title": "О проекте «Мета»",
    "paragraphs": [
      "Мы смотрим на мир изнутри собственного «я». Мета начинается там, где желание понять себя выходит за границы собственного «я».",
      "Мы начинаем с того, что ближе всего: собственного восприятия. С желания, которое направляет мысль. С удовольствия, которое меняет переживание жизни. С поиска, который не дает покоя и продолжает требовать ответа даже тогда, когда все внешние цели уже достигнуты."
    ],
    "question": "Если тебе знакомо желание понять, кто или что стоит за собственным «я», — отсюда можно начать."
  },
  "meta": {
    "label": "Meta · от внутреннего мира к общей жизни",
    "title": "За границами собственного «я»",
    "paragraphs": [
      "Мы всматриваемся в собственные мысли, но пользуемся общим языком. Считаем желание своим, но обнаруживаем в нём следы отношений, ожиданий, чужого присутствия. Даже внутренний разговор связывает нас с другими людьми.",
      "В книге этот поиск выходит к культуре и истории. Как желание становится идеей? Как идея получает силу объединять людей? Почему возникают запреты, складываются устойчивые порядки, меняются формы общей жизни?"
    ],
    "question": "Что именно нами живёт, когда мы думаем, будто действуем сами?"
  }
};
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
