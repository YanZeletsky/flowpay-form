// Client-side validation: on blur and on submit. Messages are polite and say how to fix the problem.
const form=document.getElementById('reg');
const rules={
  name:v=>v.trim().length<2?'Введите имя: минимум 2 буквы.':'',
  phone:v=>/^\+7[\s(]*\d{3}[\s)]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/.test(v.trim())?'':'Введите номер в формате +7 900 123 45 67.',
  email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())?'':'Введите почту в формате name@mail.ru.',
  birth:v=>{if(!v)return 'Укажите дату рождения.';const a=(Date.now()-new Date(v))/31557600000;return a<18?'Сервис доступен с 18 лет.':''},
  password:v=>v.length<8?'Пароль должен быть не короче 8 символов.':!/\d/.test(v)?'Добавьте в пароль хотя бы одну цифру.':'',
  agree:(v,el)=>el.checked?'':'Нужно согласие с условиями, чтобы создать аккаунт.'
};
function check(el){
  const msg=rules[el.name](el.value,el);
  const err=document.getElementById(el.name+'-err');
  const ok=document.getElementById(el.name+'-ok');
  err.textContent=msg;
  if(ok)ok.textContent=msg?'':'Всё верно';
  el.setAttribute('aria-invalid',msg?'true':'false');
  el.classList.toggle('valid',!msg&&el.type!=='checkbox');
  return !msg;
}
form.querySelectorAll('input[name]').forEach(el=>{
  el.addEventListener('blur',()=>check(el));
  el.addEventListener('input',()=>{if(el.getAttribute('aria-invalid')==='true')check(el)});
});
form.addEventListener('submit',e=>{
  e.preventDefault();
  const bad=[...form.querySelectorAll('input[name]')].filter(el=>!check(el));
  const done=document.getElementById('done');
  if(bad.length){bad[0].focus();done.classList.remove('show');return}
  done.classList.add('show');done.focus();
});
document.getElementById('toggle').addEventListener('click',function(){
  const p=document.getElementById('password');const show=p.type==='password';
  p.type=show?'text':'password';this.textContent=show?'Скрыть':'Показать';this.setAttribute('aria-pressed',show);
});
