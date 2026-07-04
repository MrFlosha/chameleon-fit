import React, { useState, useEffect, useRef } from 'react';

/* ── Chameleon Forest ── */
const BG='#111C14',CD='#172119',CD2='#1D2E20',BD='rgba(162,208,120,0.13)',TX='#E8F0D6',SB='#7A9A68';
const G_TEST='linear-gradient(145deg,#DC7840,#B44E20)';
const G_PLAN='linear-gradient(145deg,#4EC466,#1E8A38)';
const G_FOOD='linear-gradient(145deg,#CEB03A,#966E10)';
const G_CAL='linear-gradient(145deg,#3EA89A,#15685E)';
const G_TIPS='linear-gradient(145deg,#82B84A,#4C7A1E)';
const G_EMBER=G_TEST,G_VIOLET=G_PLAN,G_LAGOON=G_FOOD,G_MOSS=G_CAL,G_SUNSET=G_TIPS;
const gradText=(g)=>({background:g,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"});

function ChamSVG({type="test",size=26,active=false}){
  const body=active?"rgba(255,255,255,0.92)":"#4EC466";
  const belly=active?"rgba(255,255,255,0.65)":"#A0D870";
  const dk=active?"rgba(255,255,255,0.55)":"#163A18";
  const ew=active?"rgba(255,255,255,0.5)":"#E8F4D8";
  const extras={
    test:<><ellipse cx="7" cy="10" rx="1.3" ry="1.9" fill="#7ED4F8" stroke={dk} strokeWidth="0.7" transform="rotate(-15 7 10)"/><ellipse cx="10.5" cy="7" rx="1" ry="1.5" fill="#7ED4F8" stroke={dk} strokeWidth="0.6" transform="rotate(-10 10.5 7)"/><ellipse cx="5.5" cy="6.5" rx="0.8" ry="1.2" fill="#7ED4F8" stroke={dk} strokeWidth="0.6" transform="rotate(-25 5.5 6.5)"/></>,
    plan:<><path d="M6 8 L7.5 11.5 L11.5 11.5 L8.3 13.8 L9.5 17.5 L6 15.3 L2.5 17.5 L3.7 13.8 L0.5 11.5 L4.5 11.5Z" fill="#FFD84A" stroke="#A07820" strokeWidth="0.9"/></>,
    food:<><path d="M37 22 Q42 17 40 13" stroke="#E05040" strokeWidth="2.2" strokeLinecap="round" fill="none"/><ellipse cx="40" cy="12" rx="3.5" ry="2.2" fill="#4EC466" stroke={dk} strokeWidth="1" transform="rotate(-30 40 12)"/></>,
    cal:<><rect x="2" y="26" width="8.5" height="8" rx="1.8" fill={ew} stroke={dk} strokeWidth="1.2"/><path d="M4 30 L6.2 32.5 L10.5 27.5" stroke="#3EA89A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></>,
    tips:<><circle cx="7" cy="8" r="4.2" fill="#FFD84A" stroke="#A07820" strokeWidth="1.2"/><path d="M7 3.2 L7 1.2 M2.5 5 L1 3.5 M11.5 5 L13 3.5 M7 12.8 L7 14.8" stroke="#FFD84A" strokeWidth="1.2" strokeLinecap="round"/><rect x="5.5" y="12.8" width="3" height="1.4" rx="0.7" fill="#A07820" opacity="0.7"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 25 C3 25 2 30 5.5 32 C9 34.5 6 38 9.5 36.5" stroke={dk} strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="18" cy="25" rx="10" ry="7" fill={body} stroke={dk} strokeWidth="2"/>
      <ellipse cx="18" cy="27" rx="6.2" ry="4.5" fill={belly}/>
      <path d="M10 20 L12 17 L14 20 L16 17 L18 20 L20 17 L23 20" stroke={dk} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="27" cy="21" r="8.5" fill={body} stroke={dk} strokeWidth="2"/>
      <path d="M21 14 Q24 9.5 27 12.5 Q30 8.5 33 12.5" stroke={dk} strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="31" cy="16" r="5.5" fill={ew} stroke={dk} strokeWidth="1.5"/>
      <circle cx="32" cy="15" r="3.5" fill={dk}/>
      <circle cx="33.6" cy="13.5" r="1.2" fill="rgba(255,255,255,0.85)"/>
      <circle cx="36" cy="21" r="0.8" fill={dk}/>
      <path d="M33 23 Q35.5 26 38 23" stroke={dk} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M21 30 L20 36 M20 36 L18 38 M20 36 L22 38" stroke={dk} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M14 30 L13 36 M13 36 L11 38 M13 36 L15 38" stroke={dk} strokeWidth="1.8" strokeLinecap="round"/>
      {extras[type]||null}
    </svg>
  );
}

function IconTile({emoji,gradient,size=42,radius,chamType}){
  return (
    <div style={{width:size,height:size,minWidth:size,borderRadius:radius??size*0.26,background:gradient,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.48,lineHeight:1,boxShadow:"0 4px 16px -4px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.28)",border:"1.5px solid rgba(255,255,255,0.14)",overflow:"hidden"}}>
      {chamType?<ChamSVG type={chamType} size={size*0.74} active/>:emoji}
    </div>
  );
}
function GlowOrb({gradient,size=260,style}){return <div style={{position:"fixed",width:size,height:size,borderRadius:"50%",background:gradient,filter:"blur(90px)",opacity:0.14,pointerEvents:"none",zIndex:0,...style}}/>;}
function Kicker({children,gradient}){return <div style={{display:"inline-block",fontSize:10,fontWeight:800,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:6,...gradText(gradient)}}>{children}</div>;}

const TESTS=[
  {id:"pushups",name:"Отжимания",emoji:"💪",color:"#DC7840",bg:"rgba(220,120,64,0.14)",text:"#E89870",instruction:"Сколько сможешь без остановки",unit:"повт.",mode:"input",tips:["Прямая линия","Грудь к полу","Без читинга"]},
  {id:"squats",name:"Приседания",emoji:"🦵",color:"#4EC466",bg:"rgba(78,196,102,0.14)",text:"#88D498",instruction:"Бёдра ниже параллели",unit:"повт.",mode:"input",tips:["Пятки на полу","Колени над носками","Спина прямая"]},
  {id:"plank",name:"Планка",emoji:"🧱",color:"#3EA89A",bg:"rgba(62,168,154,0.14)",text:"#6ABCB0",instruction:"Держи сколько сможешь",unit:"сек",mode:"timer_up",tips:["Тело в линию","Таз не двигать","Дыши"]},
  {id:"burpees",name:"Берпи / 60с",emoji:"🔥",color:"#CEB03A",bg:"rgba(206,176,58,0.14)",text:"#DCC464",instruction:"Считай за 60 секунд",unit:"повт.",mode:"timer_down",tips:["Присед→упор→прыжок","Своим темпом","Полный цикл = 1"]},
];


const FOOD_CATS=[
  {cat:"🥩 Белок",items:[
    {n:"Яйца (10 шт)",p:"13г",pr:"~90р",e:"🥚",d:"Самый дешёвый белок. Варить, жарить, омлет."},
    {n:"Куриная грудка",p:"23г",pr:"~300р/кг",e:"🍗",d:"150г = готовый обед за 10 мин."},
    {n:"Куриные бёдра",p:"20г",pr:"~200р/кг",e:"🍗",d:"Жирнее, вкуснее и дешевле груди."},
    {n:"Куриные крылья",p:"17г",pr:"~180р/кг",e:"🍗",d:"Запечь в духовке — вкусно и просто."},
    {n:"Творог 5%",p:"17г",pr:"~120р/250г",e:"🫙",d:"Идеальный перекус. Хорошо с бананом."},
    {n:"Творог 0%",p:"18г",pr:"~110р/250г",e:"🫙",d:"Больше белка, меньше жира."},
    {n:"Тунец конс.",p:"25г",pr:"~100р/банка",e:"🐟",d:"Паста + тунец = 10 минут еды."},
    {n:"Сардины конс.",p:"20г",pr:"~80р/банка",e:"🐟",d:"Дешевле тунца, больше омега-3."},
    {n:"Хек / Минтай",p:"16г",pr:"~150р/кг",e:"🐠",d:"Очень дёшево. Запекать с лимоном."},
    {n:"Фарш (смеш.)",p:"17г",pr:"~250р/кг",e:"🥩",d:"Гуляш, котлеты, макароны по-флотски."},
    {n:"Чечевица",p:"24г",pr:"~90р/кг",e:"🫘",d:"Варится 20 мин. Дешёвый растительный белок."},
    {n:"Нут",p:"19г",pr:"~120р/кг",e:"🫘",d:"В суп, хумус или просто отварить."},
    {n:"Фасоль",p:"21г",pr:"~80р/кг",e:"🫘",d:"В суп или рагу. Долгое насыщение."},
    {n:"Греч. йогурт",p:"10г",pr:"~120р/200г",e:"🥛",d:"Замена сметане. Белок + пробиотики."},
    {n:"Кефир 2.5%",p:"3г",pr:"~70р/л",e:"🥛",d:"Вечером или с утра. Полезен для ЖКТ."},
    {n:"Творожный сыр",p:"10г",pr:"~150р/180г",e:"🧀",d:"На хлеб, в пасту или как соус."},
    {n:"Сыр твёрдый",p:"25г",pr:"~350р/кг",e:"🧀",d:"В омлет, пасту или бутерброд."},
    {n:"Скумбрия с/с",p:"18г",pr:"~200р/шт",e:"🐟",d:"Жирная рыба — омега-3 и белок."},
  ]},
  {cat:"🌾 Углеводы",items:[
    {n:"Гречка",p:"13г",pr:"~70р/кг",e:"🌾",d:"Основа рациона. Варить 20 мин."},
    {n:"Овсянка",p:"13г",pr:"~60р/кг",e:"🥣",d:"Завтрак за 5 минут."},
    {n:"Рис",p:"7г",pr:"~80р/кг",e:"🍚",d:"Под курицу или с овощами."},
    {n:"Перловка",p:"9г",pr:"~50р/кг",e:"🌾",d:"Самая дешёвая крупа. С грибами — топ."},
    {n:"Пшено",p:"11г",pr:"~55р/кг",e:"🌾",d:"Каша на молоке или гарнир."},
    {n:"Паста",p:"11г",pr:"~70р/кг",e:"🍝",d:"Быстро. С тунцом — топ."},
    {n:"Макароны цельн.",p:"13г",pr:"~100р/кг",e:"🍝",d:"Медленнее усваиваются — дольше сытость."},
    {n:"Картофель",p:"2г",pr:"~30р/кг",e:"🥔",d:"Варить / запекать. Дёшево и сытно."},
    {n:"Сладкий картофель",p:"2г",pr:"~120р/кг",e:"🍠",d:"Полезнее обычного. Печь целиком."},
    {n:"Хлеб цельноз.",p:"9г",pr:"~60р/буханка",e:"🍞",d:"С яйцами или творогом."},
    {n:"Хлебцы рисов.",p:"8г",pr:"~80р/уп",e:"🫓",d:"Перекус с творожным сыром."},
    {n:"Гречневые хлопья",p:"12г",pr:"~90р/кг",e:"🌾",d:"Быстрее обычной гречки — залить кипятком."},
  ]},
  {cat:"🥦 Овощи и фрукты",items:[
    {n:"Бананы",p:"—",pr:"~80р/кг",e:"🍌",d:"Углеводы до тренировки."},
    {n:"Яблоки",p:"—",pr:"~60р/кг",e:"🍎",d:"Быстрый перекус. Клетчатка."},
    {n:"Заморож. овощи",p:"—",pr:"~90р/кг",e:"🥦",d:"К рису или курице — бросил и готово."},
    {n:"Капуста белокоч.",p:"1г",pr:"~20р/кг",e:"🥬",d:"В суп, тушить, в салат."},
    {n:"Морковь",p:"1г",pr:"~20р/кг",e:"🥕",d:"В суп, в рагу, сырая как перекус."},
    {n:"Свёкла",p:"2г",pr:"~25р/кг",e:"🟣",d:"Варёная в салат или борщ."},
    {n:"Томаты",p:"1г",pr:"~80р/кг",e:"🍅",d:"В омлет, пасту, салат."},
    {n:"Огурцы",p:"1г",pr:"~70р/кг",e:"🥒",d:"Свежие в любой салат."},
    {n:"Лук репчатый",p:"1г",pr:"~20р/кг",e:"🧅",d:"В любое горячее. Основа вкуса."},
    {n:"Чеснок",p:"6г",pr:"~60р/гол",e:"🧄",d:"Пара зубчиков в любое блюдо."},
    {n:"Помидоры черри",p:"1г",pr:"~120р/кг",e:"🍅",d:"В салат или просто так."},
    {n:"Шпинат заморож.",p:"3г",pr:"~100р/уп",e:"🥬",d:"В омлет или смузи. Незаметен на вкус."},
    {n:"Авокадо",p:"2г",pr:"~150р/шт",e:"🥑",d:"На хлеб или в салат. Полезные жиры."},
    {n:"Молоко 2.5%",p:"3г",pr:"~90р/л",e:"🥛",d:"В овсянку, в кофе, просто так."},
    {n:"Томатная паста",p:"4г",pr:"~40р/конс",e:"🥫",d:"Основа соусов. Всегда иметь в запасе."},
  ]},
  {cat:"🧴 Прочее",items:[
    {n:"Масло растит.",p:"—",pr:"~120р/л",e:"🫙",d:"Для жарки и заправок."},
    {n:"Масло оливковое",p:"—",pr:"~400р/л",e:"🫒",d:"В салаты и пасту."},
    {n:"Орехи (смесь)",p:"15г",pr:"~400р/кг",e:"🥜",d:"Перекус. Не больше горсти в день."},
    {n:"Арахисовое масло",p:"25г",pr:"~200р/350г",e:"🥜",d:"На хлеб или в кашу. Белок + жиры."},
    {n:"Мёд",p:"—",pr:"~200р/кг",e:"🍯",d:"В кашу, творог. Замена сахару."},
    {n:"Соевый соус",p:"—",pr:"~80р/бут",e:"🫙",d:"Маринад для курицы — топ."},
    {n:"Специи (набор)",p:"—",pr:"~200р/набор",e:"🌶️",d:"Паприка, куркума, чёрный перец — базовый набор."},
  ]},
];

const RECIPE_CATS=[
  {cat:"☀️ Завтраки",color:"#F59E0B",items:[
    {n:"Овсянка с бананом",t:"7мин",k:"420",p:"18г",i:["100г овсянки","300мл молока","1 банан","Мёд, щепотка соли"],s:["Залить овсянку молоком","Варить 5 мин помешивая","Добавить нарезанный банан и мёд"]},
    {n:"Яичница с томатами",t:"8мин",k:"280",p:"20г",i:["3 яйца","2 томата","Масло, соль, зелень"],s:["Томаты нарезать, обжарить 2 мин","Вбить яйца","Жарить 3–4 мин, посолить"]},
    {n:"Омлет со шпинатом",t:"10мин",k:"300",p:"22г",i:["3 яйца","100г шпината","30г сыра","Масло, соль"],s:["Взбить яйца с солью","Вылить на сковороду","Добавить шпинат и тёртый сыр","Закрыть крышкой на 3 мин"]},
    {n:"Гречневая каша",t:"20мин",k:"350",p:"14г",i:["100г гречки","200мл воды","Масло, соль","3 варёных яйца (отдельно)"],s:["Гречку залить водой 1:2","Варить 15 мин на слабом огне","Добавить масло, посолить","Подавать с варёными яйцами"]},
    {n:"Творог с бананом",t:"3мин",k:"320",p:"28г",i:["250г творога 5%","1 банан","Мёд по вкусу"],s:["Творог выложить в миску","Банан нарезать кружочками","Добавить мёд — готово"]},
    {n:"Тосты с яйцом",t:"10мин",k:"380",p:"24г",i:["2 куска цельнозернового хлеба","2 яйца","50г творожного сыра","Соль, зелень"],s:["Хлеб поджарить в тостере","Намазать творожным сыром","Обжарить яйца глазуньей","Положить яйца на тосты"]},
    {n:"Рисовая каша",t:"20мин",k:"380",p:"10г",i:["100г риса","400мл молока","1 банан","Мёд, соль"],s:["Рис промыть, залить молоком","Варить 15–18 мин помешивая","Добавить банан и мёд"]},
    {n:"Оладьи на кефире",t:"20мин",k:"380",p:"12г",i:["200мл кефира","1 яйцо","1 стакан муки","Сахар, соль, сода"],s:["Смешать кефир, яйцо, сахар","Добавить муку и соду","Жарить 2 мин с каждой стороны"]},
    {n:"Творожники",t:"15мин",k:"350",p:"28г",i:["200г творога","1 яйцо","3 ст.л. муки","Соль, сахар"],s:["Смешать всё до однородности","Сформировать лепёшки","Жарить 3–4 мин с каждой стороны"]},
  ]},
  {cat:"⚡ Быстрые (до 15 мин)",color:"#10B981",items:[
    {n:"Гречка с яичницей",t:"10мин",k:"400",p:"22г",i:["Готовая гречка (порция)","2–3 яйца","Масло, соль, зелень"],s:["Яйца обжарить на масле","Подать с гречкой","Посолить, добавить зелень"]},
    {n:"Паста с тунцом",t:"15мин",k:"450",p:"35г",i:["100г макарон","1 банка тунца","2 томата","Чеснок, соль"],s:["Варить пасту 8–10 мин","Обжарить чеснок 1 мин","Добавить томаты и тунец","Смешать с пастой"]},
    {n:"Яйца по-деревенски",t:"12мин",k:"420",p:"25г",i:["3–4 яйца","2 варёные картофелины","Лук, масло","Соль, зелень"],s:["Картофель нарезать, обжарить 5 мин","Добавить лук, жарить 3 мин","Вбить яйца, перемешать","Готовить 3 мин"]},
    {n:"Бутерброд с тунцом",t:"5мин",k:"350",p:"28г",i:["2 куска хлеба","1 банка тунца","Огурец","Соль, перец"],s:["Слить жидкость с тунца","Выложить на хлеб","Добавить нарезанный огурец"]},
    {n:"Варёные яйца с хлебом",t:"10мин",k:"280",p:"18г",i:["3 яйца","2 куска хлеба","Масло","Соль"],s:["Сварить яйца 7–8 мин","Намазать хлеб маслом","Нарезать яйца, подавать"]},
    {n:"Чечевица из банки",t:"5мин",k:"300",p:"20г",i:["Банка готовой чечевицы","Масло оливковое","Лимон, соль","Зелень"],s:["Слить жидкость с чечевицы","Заправить маслом и лимоном","Посолить, добавить зелень"]},
  ]},
  {cat:"🍗 Основные блюда",color:"#F43F5E",items:[
    {n:"Куриный рис с овощами",t:"25мин",k:"500",p:"40г",i:["150г куриной грудки","100г риса","200г заморож. овощей","Масло, соль"],s:["Рис варить 20 мин","Курицу нарезать, обжарить 7–8 мин","Добавить овощи, жарить 5 мин","Смешать с рисом"]},
    {n:"Запечённая курица",t:"40мин",k:"380",p:"45г",i:["250г куриных бёдер","Чеснок, паприка, соль","Масло растительное"],s:["Замариновать: масло + чеснок + паприка","Положить в форму","Запекать 190°C — 35–40 мин"]},
    {n:"Куринные бёдра с гречкой",t:"30мин",k:"550",p:"42г",i:["2 куриных бёдра","100г гречки","Масло, соль, специи","Чеснок"],s:["Бёдра обжарить 15 мин до корочки","Гречку варить 20 мин","Чеснок добавить к курице в конце","Подавать вместе"]},
    {n:"Гуляш с гречкой",t:"40мин",k:"550",p:"38г",i:["300г мяса","1 луковица, 1 морковь","Томатная паста","Соль, лавровый лист"],s:["Мясо нарезать, обжарить 10 мин","Добавить лук и морковь 5 мин","Добавить томатную пасту и воды","Тушить 20–25 мин"]},
    {n:"Макароны по-флотски",t:"20мин",k:"520",p:"32г",i:["100г макарон","200г фарша","1 луковица","Соль, перец, томатная паста"],s:["Варить макароны 8–10 мин","Лук обжарить, добавить фарш","Фарш до готовности, добавить пасту","Смешать с макаронами"]},
    {n:"Рыба запечённая",t:"30мин",k:"320",p:"38г",i:["300г хека или минтая","Лимон, масло","Соль, паприка","Зелень"],s:["Рыбу выложить в форму","Сбрызнуть лимоном и маслом","Посолить, посыпать паприкой","Запекать 200°C — 20–25 мин"]},
    {n:"Курица с соевым соусом",t:"20мин",k:"420",p:"44г",i:["300г куриного филе","3 ст.л. соевого соуса","Чеснок, масло","Кунжут по желанию"],s:["Нарезать курицу полосками","Замариновать в соевом соусе 10 мин","Обжарить на сильном огне 8–10 мин","Посыпать кунжутом"]},
    {n:"Котлеты из фарша",t:"30мин",k:"480",p:"35г",i:["400г фарша","1 яйцо","1 луковица","Соль, перец, хлеб"],s:["Хлеб замочить в воде, отжать","Смешать с фаршем, яйцом, луком","Сформировать котлеты","Жарить 5–6 мин с каждой стороны"]},
    {n:"Курица тушёная",t:"35мин",k:"430",p:"44г",i:["400г куриных кусочков","1 луковица, 1 морковь","Сметана или йогурт","Соль, специи"],s:["Курицу обжарить 10 мин","Добавить лук и морковь","Влить сметану, посолить","Тушить под крышкой 20 мин"]},
    {n:"Рис с тунцом",t:"20мин",k:"420",p:"32г",i:["100г риса","1 банка тунца","Соевый соус","Зелёный лук"],s:["Рис сварить 20 мин","Тунец выложить сверху","Полить соевым соусом","Нарезать лук, украсить"]},
    {n:"Перловка с грибами",t:"50мин",k:"280",p:"9г",i:["200г перловки","300г шампиньонов","1 луковица","Масло, соль, зелень"],s:["Перловку замочить, варить 40 мин","Грибы с луком обжарить 10 мин","Смешать перловку с грибами","Посолить, добавить зелень"]},
    {n:"Фарш с картофелем",t:"35мин",k:"500",p:"30г",i:["300г фарша","4 картофелины","1 луковица","Соль, перец, томатная паста"],s:["Лук и фарш обжарить 10 мин","Картофель нарезать кубиками","Добавить к фаршу с томатной пастой","Тушить 20 мин до готовности картофеля"]},
  ]},
  {cat:"🍲 Супы",color:"#0EA5E9",items:[
    {n:"Куриный суп",t:"45мин",k:"350",p:"30г",i:["300г куриного филе","2 картофелины","1 морковь, 1 луковица","Соль, укроп"],s:["Курицу варить 20 мин в 1.5л воды","Добавить картофель и морковь","Через 15 мин добавить лук","Соль, укроп — готово"]},
    {n:"Борщ быстрый",t:"45мин",k:"300",p:"18г",i:["200г говядины или свинины","1 свёкла, 1 морковь","Капуста, картофель","Томатная паста, соль"],s:["Мясо варить 20 мин","Добавить картофель и капусту","Свёклу и морковь обжарить с томатной пастой","Добавить в суп, варить 15 мин"]},
    {n:"Чечевичный суп",t:"30мин",k:"320",p:"22г",i:["200г красной чечевицы","1 луковица, 1 морковь","Томатная паста","Специи, соль"],s:["Чечевицу промыть","Лук и морковь обжарить 5 мин","Добавить чечевицу и воду (1л)","Варить 20 мин, специи по вкусу"]},
    {n:"Суп с фрикадельками",t:"35мин",k:"360",p:"25г",i:["300г фарша","2 картофелины","1 морковь","Соль, перец, зелень"],s:["Сформировать небольшие фрикадельки","Вскипятить 1.5л воды","Добавить картофель и морковь","Через 10 мин добавить фрикадельки, варить 15 мин"]},
    {n:"Щи из капусты",t:"40мин",k:"240",p:"15г",i:["300г капусты","2 картофелины","1 морковь, лук","Томатная паста, соль"],s:["Лук и морковь обжарить 5 мин","Добавить в кипящую воду (1.5л)","Добавить картофель и капусту","Варить 25 мин, посолить"]},
    {n:"Тыквенный суп-пюре",t:"30мин",k:"220",p:"5г",i:["500г тыквы","1 луковица","Сливки или молоко","Соль, куркума"],s:["Тыкву нарезать, сварить 20 мин","Лук обжарить отдельно","Всё смешать и пробить блендером","Добавить сливки, посолить"]},
  ]},
  {cat:"🥗 Лёгкие и гарниры",color:"#84CC16",items:[
    {n:"Овощное рагу",t:"30мин",k:"250",p:"8г",i:["Капуста, морковь, лук","Картофель","Томатная паста","Масло, соль"],s:["Лук и морковь обжарить 3 мин","Добавить картофель и капусту","Добавить томатную пасту и воды","Тушить 20 мин"]},
    {n:"Салат с тунцом",t:"10мин",k:"280",p:"25г",i:["1 банка тунца","Огурец, помидор","Яйцо варёное","Оливковое масло, соль"],s:["Всё нарезать","Тунец добавить","Заправить маслом и посолить"]},
    {n:"Капустный салат",t:"5мин",k:"120",p:"2г",i:["300г капусты","1 морковь","Соль, масло","Уксус по желанию"],s:["Капусту тонко нашинковать","Морковь натереть","Заправить маслом и солью","Помять руками до сока"]},
    {n:"Жареный картофель",t:"25мин",k:"350",p:"5г",i:["4 картофелины","Масло растительное","Соль, укроп","Чеснок по желанию"],s:["Картофель нарезать дольками","Обжарить на сильном огне 15 мин","Посолить, добавить чеснок","Посыпать укропом"]},
    {n:"Запечённые овощи",t:"35мин",k:"180",p:"5г",i:["Перец, морковь, лук","Картофель, кабачок","Масло, соль","Специи"],s:["Все овощи нарезать крупно","Перемешать с маслом и специями","Разложить на противне","Запекать 190°C — 30 мин"]},
  ]},
  {cat:"🍫 Перекусы и десерты",color:"#EC4899",items:[
    {n:"Творог с ягодами",t:"3мин",k:"250",p:"22г",i:["200г творога","Замороженные ягоды","Мёд"],s:["Ягоды разморозить","Смешать с творогом","Добавить мёд по вкусу"]},
    {n:"Банановые панкейки",t:"15мин",k:"320",p:"14г",i:["2 банана","2 яйца","Мёд по вкусу"],s:["Размять бананы вилкой","Взбить яйца с бананами","Жарить маленькие блинчики 2 мин с каждой стороны"]},
    {n:"Арахисовое масло с хлебом",t:"2мин",k:"300",p:"12г",i:["2 куска хлеба","2 ст.л. арахисового масла","Банан по желанию"],s:["Намазать хлеб арахисовым маслом","Добавить ломтики банана"]},
    {n:"Смузи протеиновый",t:"3мин",k:"350",p:"20г",i:["200мл молока","150г творога","1 банан","1 ч.л. мёда"],s:["Всё загрузить в блендер","Взбить до однородности","Пить сразу — оседает быстро"]},
    {n:"Яблоко с творогом",t:"2мин",k:"200",p:"15г",i:["1 яблоко","150г творога","Корица, мёд"],s:["Яблоко нарезать","Творог смешать с мёдом","Подавать вместе, посыпать корицей"]},
  ]},
];


const MEALS=[
  {time:"08:00",label:"Завтрак",kcal:"~500",b:"#CEB03A",opts:["Овсянка + яйца + банан","Гречка + яйца","Тост + яичница + творог"]},
  {time:"11:00",label:"Перекус",kcal:"~200",b:"#4EC466",opts:["Творог + банан","Кефир + хлеб","Яйцо + фрукт"]},
  {time:"13:00",label:"Обед",kcal:"~600",b:"#3EA89A",opts:["Рис + курица + овощи","Гречка + тунец","Паста + фарш"]},
  {time:"16:00",label:"До трени",kcal:"~200",b:"#DC7840",opts:["Банан + орехи","Хлеб + арахисовая паста","Творог + мёд"]},
  {time:"19:00",label:"Ужин",kcal:"~550",b:"#82B84A",opts:["Паста с тунцом","Картофель + бёдра","Гречка + яйца"]},
  {time:"21:00",label:"Вечер",kcal:"~150",b:"#4A5568",opts:["Творог 100г","Кефир","Молоко"]},
];

const ANCHORS=[
  {emoji:"⏰",title:"Подъём в одно время",sub:"Каждый день",color:"#82B84A"},
  {emoji:"💪",title:"3 тренировки в неделю",sub:"Время — когда удобно",color:"#DC7840"},
  {emoji:"📵",title:"Телефон за 30 мин до сна",sub:"При любом отбое",color:"#3EA89A"},
];

const TIP_CATS=[
  {id:"sleep",emoji:"💤",label:"Сон",color:"#82B84A"},
  {id:"workout",emoji:"🏋️",label:"Тренировки",color:"#DC7840"},
  {id:"food",emoji:"🥗",label:"Питание",color:"#4EC466"},
  {id:"mind",emoji:"🧠",label:"Голова",color:"#3EA89A"},
  {id:"energy",emoji:"⚡",label:"Энергия",color:"#CEB03A"},
  {id:"life",emoji:"❤️",label:"Жизнь",color:"#DC7840"},
];

const MONTHS=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const WDAYS=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
const toKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const NOW=new Date(); NOW.setHours(0,0,0,0);

function TimerBlock({mode,color,onAutoFill}){
  const [state,setState]=useState("idle");
  const [elapsed,setElapsed]=useState(0);
  const [remaining,setRemaining]=useState(60);
  const iRef=useRef(null),eRef=useRef(0);
  useEffect(()=>()=>clearInterval(iRef.current),[]);
  const start=()=>{
    setState("running");
    if(mode==="timer_up"){
      setElapsed(0);eRef.current=0;
      iRef.current=setInterval(()=>setElapsed(e=>{eRef.current=e+1;return e+1;}),1000);
    } else {
      setRemaining(60);
      iRef.current=setInterval(()=>setRemaining(r=>{if(r<=1){clearInterval(iRef.current);setState("done");return 0;}return r-1;}),1000);
    }
  };
  const stop=()=>{clearInterval(iRef.current);setState("done");if(mode==="timer_up")onAutoFill(String(eRef.current));};
  const fmt=s=>s>=60?`${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`:String(s);
  return (
    <div style={{textAlign:"center",margin:"14px 0 8px"}}>
      <div style={{fontSize:60,fontWeight:800,color,fontVariantNumeric:"tabular-nums",letterSpacing:"-2px",lineHeight:1}}>{fmt(mode==="timer_up"?elapsed:remaining)}</div>
      <div style={{fontSize:12,color:SB,marginBottom:12}}>{mode==="timer_up"?"секунд":state==="running"?"осталось":state==="done"?"время!":"секунд"}</div>
      {state==="idle"&&<button onClick={start} style={{background:color,color:"#fff",border:"none",borderRadius:12,padding:"12px 36px",fontSize:15,fontWeight:700,cursor:"pointer"}}>▶ Старт</button>}
      {state==="running"&&mode==="timer_up"&&<button onClick={stop} style={{background:"#EF4444",color:"#fff",border:"none",borderRadius:12,padding:"12px 36px",fontSize:15,fontWeight:700,cursor:"pointer"}}>⏹ Стоп</button>}
      {state==="running"&&mode==="timer_down"&&<div style={{fontSize:13,color:SB}}>считай повторения...</div>}
      {state==="done"&&<div style={{fontSize:13,color:"#4EC466",fontWeight:700}}>✓ Введи результат ниже</div>}
    </div>
  );
}

const TAB_GRAD={test:G_TEST,plan:G_PLAN,food:G_FOOD,cal:G_CAL,tips:G_TIPS};
const TAB_LABEL={test:"Тест",plan:"Тренировка",food:"Питание",cal:"Прогресс"};

function TabBar({tab,setTab}){
  const ids=["test","plan","food","cal"];
  return (
    <div style={{position:"fixed",bottom:14,left:12,right:12,zIndex:100,display:"flex",justifyContent:"center"}}>
      <div style={{display:"flex",gap:3,background:"rgba(17,28,20,0.92)",backdropFilter:"blur(22px)",WebkitBackdropFilter:"blur(22px)",border:"1px solid rgba(162,208,120,0.14)",borderRadius:26,padding:6,boxShadow:"0 14px 40px -8px rgba(0,0,0,0.75), inset 0 1px 0 rgba(162,208,120,0.08)",width:"100%",maxWidth:440}}>
        {ids.map(id=>{
          const active=tab===id;
          return (
            <button key={id} onClick={()=>setTab(id)} style={{flex:1,border:"none",cursor:"pointer",borderRadius:20,padding:"7px 0 6px",display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:active?TAB_GRAD[id]:"transparent",boxShadow:active?"0 4px 14px -6px rgba(0,0,0,0.6)":"none",transition:"all 0.22s"}}>
              <ChamSVG type={id} size={active?27:23} active={active}/>
              <span style={{fontSize:9,fontWeight:800,letterSpacing:"0.02em",color:active?"rgba(255,255,255,0.95)":SB}}>{TAB_LABEL[id]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


/* ── Rule-based plan generator (no API needed) ── */
function generatePlanLocal(vals, loc){
  const push  = Math.max(0, parseInt(vals.pushups)||0);
  const squat = Math.max(0, parseInt(vals.squats)||0);
  const plank = Math.max(0, parseInt(vals.plank)||0);
  const burp  = Math.max(0, parseInt(vals.burpees)||0);

  // Normalise 0-1
  const ns = (Math.min(push,40)/40 + Math.min(squat,60)/60 + Math.min(plank,120)/120 + Math.min(burp,20)/20) / 4;

  let label, color, summary;
  if(ns < 0.35){
    label='Начинающий'; color='#4EC466';
    summary=`${push} отжиманий — хороший старт. Главное сейчас: регулярность и правильная техника. Через месяц цифры вырастут сами.`;
  } else if(ns < 0.65){
    label='Средний'; color='#CEB03A';
    summary=`${push} отжиманий и ${plank}с планки — крепкая база. Есть куда расти по силе и выносливости. Добавляем объём.`;
  } else {
    label='Продвинутый'; color='#DC7840';
    summary=`Сильный результат: ${push} отжиманий, ${burp} берпи. Фокус на прогрессии и взрывной работе.`;
  }

  // Working reps ≈ 55% of test max, scaled per phase
  const pr = Math.max(5, Math.round(push*0.55));
  const sr = Math.max(10, Math.round(squat*0.50));
  const ps = Math.max(20, Math.round(plank*0.55));

  const home = [
    [
      {name:'Отжимания',              sets:3, reps:`${pr} повт`,                    tip:'Грудь касается пола'},
      {name:'Приседания',             sets:3, reps:`${sr} повт`,                    tip:'Пятки на полу'},
      {name:'Планка',                 sets:3, reps:`${ps} сек`,                     tip:'Тело в одну линию'},
      {name:'Ягодичный мост',         sets:2, reps:'15 повт',                       tip:'Сжать ягодицы наверху'},
      {name:'Обратные отжимания',     sets:2, reps:'10 повт',                       tip:'Локти смотрят назад'},
    ],[
      {name:'Отжимания',              sets:4, reps:`${Math.round(pr*1.2)} повт`,    tip:'Медленно вниз, быстро вверх'},
      {name:'Приседания с паузой',    sets:3, reps:`${Math.round(sr*1.15)} повт`,   tip:'2 сек внизу'},
      {name:'Боковая планка',         sets:3, reps:`${Math.round(ps*0.65)} сек/ст`, tip:'Бедро не опускать'},
      {name:'Выпады',                 sets:3, reps:'10 / нога',                     tip:'Колено не касается пола'},
      {name:'Алмазные отжимания',     sets:2, reps:`${Math.max(5,Math.round(pr*0.7))} повт`, tip:'Локти вдоль тела'},
    ],[
      {name:'Взрывные отжимания',     sets:4, reps:`${Math.max(5,Math.round(pr*0.8))} повт`, tip:'Руки отрываются от пола'},
      {name:'Прыжковые приседания',   sets:3, reps:`${Math.round(sr*0.7)} повт`,   tip:'Мягкое приземление'},
      {name:'Планка с касанием плеч', sets:3, reps:'30 сек',                       tip:'Бёдра не двигаются'},
      {name:'Берпи',                  sets:3, reps:`${Math.max(5,Math.round(burp*0.5))} повт`, tip:'Свой темп'},
      {name:'Пайк-отжимания',         sets:3, reps:`${Math.max(6,Math.round(pr*0.7))} повт`, tip:'Таз высоко'},
    ],
  ];

  const gym = [
    [
      {name:'Жим штанги лёжа',        sets:3, reps:`${Math.max(5,Math.round(pr*0.45))} повт`, tip:'Сводить лопатки'},
      {name:'Приседания со штангой',  sets:3, reps:`${Math.round(sr*0.75)} повт`,  tip:'Спина прямая'},
      {name:'Тяга гантелей в наклоне',sets:3, reps:'10 / рука',                    tip:'Лопатку к позвоночнику'},
      {name:'Жим гантелей стоя',      sets:2, reps:'12 повт',                      tip:'Не прогибать поясницу'},
      {name:'Планка',                 sets:2, reps:`${ps} сек`,                    tip:'Тело в линию'},
    ],[
      {name:'Жим штанги лёжа',        sets:4, reps:`${Math.max(5,Math.round(pr*0.5))} повт`,  tip:'Контролируй опускание'},
      {name:'Приседания со штангой',  sets:4, reps:`${Math.round(sr*0.8)} повт`,   tip:'Бёдра ниже параллели'},
      {name:'Тяга блока к груди',     sets:3, reps:'12 повт',                      tip:'Локти вниз'},
      {name:'Жим гантелей стоя',      sets:3, reps:'10 повт',                      tip:'Полная амплитуда'},
      {name:'Планка с весом',         sets:3, reps:`${Math.round(ps*0.8)} сек`,    tip:'Тарелку на спину'},
    ],[
      {name:'Жим штанги лёжа',        sets:4, reps:`${Math.max(4,Math.round(pr*0.55))} повт`, tip:'Рабочий вес +10%'},
      {name:'Приседания со штангой',  sets:4, reps:`${Math.round(sr*0.85)} повт`,  tip:'Взрывной подъём'},
      {name:'Подтягивания',           sets:3, reps:`${Math.max(3,Math.round(pr*0.35))} повт`, tip:'Полная амплитуда'},
      {name:'Берпи с гантелями',      sets:3, reps:`${Math.max(5,Math.round(burp*0.5))} повт`, tip:'Взрыв в прыжке'},
      {name:'Тяга штанги в наклоне',  sets:3, reps:'10 повт',                      tip:'Спина параллельно полу'},
    ],
  ];

  const exes = loc==='home' ? home : gym;

  const meta = [
    {theme:'Первые шаги',  note:'Форма и регулярность важнее нагрузки.',     dur:'~25 мин',
     wu:'Суставная гимнастика 5 мин: плечи, колени, бёдра по 10 кругов.',
     cd:'Растяжка 5 мин: кошка-корова, квадрицепс, плечи.'},
    {theme:'Набираем объём', note:'Добавляем нагрузку — техника не страдает.', dur:'~30 мин',
     wu:'Лёгкая пробежка на месте 2 мин + суставная гимнастика.',
     cd:'Растяжка 5 мин, пенный валик если есть.'},
    {theme:'Прогресс',     note:'Взрывная работа и максимальная нагрузка.',   dur:'~35 мин',
     wu:'Динамическая разминка 5 мин: прыжки, выпады, маховые движения.',
     cd:'Полная растяжка тела 8 мин.'},
  ];

  const phases = meta.map((m,i)=>({
    phase:i+1, title:`Фаза ${i+1}`, weeks:`${i*2+1}–${i*2+2}`,
    theme:m.theme, note:m.note, duration:m.dur,
    warmup:m.wu, exercises:exes[i], cooldown:m.cd,
  }));

  return {levelLabel:label, levelColor:color, summary, phases, location:loc};
}

export default function App(){
  const [tab,setTab]=useState("test");
  const [tScreen,setTScreen]=useState("intro");
  const [step,setStep]=useState(0);
  const [vals,setVals]=useState({pushups:"",squats:"",plank:"",burpees:""});
  const [location,setLocation]=useState(null);
  const [lastLoc,setLastLoc]=useState(null);
  const [plan,setPlan]=useState(null);
  const [planErr,setPlanErr]=useState(null);
  const [ph,setPh]=useState(0);
  const [loadingMsg,setLoadingMsg]=useState("Анализируем...");
  const [setsDone,setSetsDone]=useState({});
  const [restTimer,setRestTimer]=useState(null);
  const [foodSub,setFoodSub]=useState("recipes");
  const [openRec,setOpenRec]=useState(null);
  const [openRecCat,setOpenRecCat]=useState(0);
  const [openFoodCat,setOpenFoodCat]=useState(null);
  const [shopList,setShopList]=useState([]);
  const [comps,setComps]=useState({});
  const [water,setWater]=useState(0);
  const [weightInput,setWeightInput]=useState("");
  const [weightLog,setWeightLog]=useState([]);
  const [calMonth,setCalMonth]=useState(new Date(NOW.getFullYear(),NOW.getMonth(),1));
  const [tip,setTip]=useState(null);
  const [tipCat,setTipCat]=useState(null);
  const [tipLoading,setTipLoading]=useState(false);
  const [tipHist,setTipHist]=useState([]);
  const [savedTips,setSavedTips]=useState([]);
  const [loaded,setLoaded]=useState(false);

  useEffect(()=>{
    try{
      const hc=localStorage.getItem("hc");if(hc)setComps(JSON.parse(hc));
      const sv=localStorage.getItem("savedVals");if(sv)setVals(JSON.parse(sv));
      const sl=localStorage.getItem("savedLocation");if(sl)setLocation(sl);
      const sp=localStorage.getItem("savedPlan");if(sp){setPlan(JSON.parse(sp));setTScreen("done");}
      const wl=localStorage.getItem("weightLog");if(wl)setWeightLog(JSON.parse(wl));
      const w=localStorage.getItem(`water_${toKey(NOW)}`);if(w)setWater(parseInt(w)||0);
      const st=localStorage.getItem("savedTips");if(st)setSavedTips(JSON.parse(st));
    }catch(e){}
    setLoaded(true);
  },[]);

  useEffect(()=>{
    if(!restTimer||restTimer.secs<=0)return;
    const t=setTimeout(()=>setRestTimer(p=>p?{...p,secs:p.secs-1}:null),1000);
    return()=>clearTimeout(t);
  },[restTimer]);


  const buildPlan=(loc)=>{
    setTScreen("loading");setLastLoc(loc);
    setTimeout(()=>{
      try{
        const pl=generatePlanLocal(vals,loc);
        setPlan(pl);setTScreen("done");setTab("plan");
        localStorage.setItem("savedPlan",JSON.stringify(pl));
        localStorage.setItem("savedVals",JSON.stringify(vals));
        localStorage.setItem("savedLocation",loc);
      }catch(e){setPlanErr(e.message);setTScreen("error");}
    },600);
  };

  const doSet=(name,totalSets)=>{
    const done=(setsDone[name]||0)+1;
    setSetsDone(p=>({...p,[name]:done}));
    if(done<totalSets)setRestTimer({name,secs:90});
  };

  const logWorkout=()=>{
    const dk=toKey(NOW);
    const nc={...comps,[dk]:{...(comps[dk]||{}),workout:true}};
    setComps(nc);setSetsDone({});
    try{localStorage.setItem("hc",JSON.stringify(nc));}catch(e){}
  };

  const reset=()=>{
    setStep(0);setVals({pushups:"",squats:"",plank:"",burpees:""});
    setLocation(null);setTScreen("intro");setPlan(null);setTab("test");setSetsDone({});
    try{
      localStorage.removeItem("savedPlan");
      localStorage.removeItem("savedVals");
      localStorage.removeItem("savedLocation");
    }catch(e){}
  };

  const addWater=()=>{
    if(water>=8)return;const nw=water+1;setWater(nw);
    try{localStorage.setItem(`water_${toKey(NOW)}`,String(nw));}catch(e){}
  };
  const removeWater=()=>{
    if(water<=0)return;const nw=water-1;setWater(nw);
    try{localStorage.setItem(`water_${toKey(NOW)}`,String(nw));}catch(e){}
  };
  const logWeight=()=>{
    if(!weightInput.trim())return;
    const entry={date:toKey(NOW),val:parseFloat(weightInput)};
    const nl=[entry,...weightLog.filter(e=>e.date!==entry.date)].slice(0,14);
    setWeightLog(nl);setWeightInput("");
    try{localStorage.setItem("weightLog",JSON.stringify(nl));}catch(e){}
  };
  const toggleComp=(dk,task)=>{
    const nc={...comps,[dk]:{...(comps[dk]||{})}};
    nc[dk][task]=!nc[dk][task];setComps(nc);
    try{localStorage.setItem("hc",JSON.stringify(nc));}catch(e){}
  };
  const addToShop=(recipe)=>{
    const newItems=recipe.i.map(text=>({text,done:false,from:recipe.n}));
    setShopList(p=>{const ex=p.map(i=>i.text);return [...p,...newItems.filter(i=>!ex.includes(i.text))];});
    setFoodSub("shop");
  };
  const saveTipFn=(tipObj)=>{
    const nl=[tipObj,...savedTips].slice(0,8);setSavedTips(nl);
    try{localStorage.setItem("savedTips",JSON.stringify(nl));}catch(e){}
  };

  const test=TESTS[step];
  const canNext=!!(vals[test?.id]);
  const goNext=()=>{if(step<TESTS.length-1)setStep(s=>s+1);else setTScreen("location");};
  const PC=["#4EC466","#CEB03A","#DC7840"];
  const PBG=["rgba(78,196,102,0.12)","rgba(206,176,58,0.12)","rgba(220,120,64,0.12)"];
  const calY=calMonth.getFullYear(),calM=calMonth.getMonth();
  const daysInM=new Date(calY,calM+1,0).getDate();
  const fd=new Date(calY,calM,1).getDay();
  const offset=fd===0?6:fd-1;
  const cells=Array.from({length:offset+daysInM},(_,i)=>i<offset?null:i-offset+1);
  const streak=(()=>{let s=0,d=new Date(NOW);for(let i=0;i<365;i++){const k=toKey(d);const dy=comps[k];if(dy&&Object.values(dy).some(Boolean)){s++;d.setDate(d.getDate()-1);}else break;}return s;})();
  const weekWorkouts=Object.entries(comps).filter(([k,v])=>{const d=new Date(k);const diff=(NOW-d)/(1000*60*60*24);return diff>=0&&diff<7&&v.workout;}).length;
  const mDone=Object.entries(comps).filter(([k,v])=>{const d=new Date(k);return d.getMonth()===calM&&d.getFullYear()===calY&&Object.values(v).some(Boolean);}).length;
  const C={background:"linear-gradient(170deg,#192B1C 0%,#141F17 100%)",borderRadius:20,padding:"16px",border:`1px solid ${BD}`,boxShadow:"0 10px 28px -16px rgba(0,0,0,0.65)"};
  const bp=(gradient)=>({background:gradient||G_PLAN,color:"#fff",border:"none",borderRadius:16,padding:"14px 0",fontSize:15,fontWeight:700,cursor:"pointer",width:"100%",boxShadow:"0 8px 20px -8px rgba(0,0,0,0.55)"});

  if(!loaded) return (
    <div style={{background:BG,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center"}}><ChamSVG type="plan" size={60}/><div style={{color:SB,fontSize:13,marginTop:12}}>Загрузка...</div></div>
    </div>
  );

  const rTest=()=>{
    if(tScreen==="intro") return (
      <div>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:14}}><IconTile chamType="test" gradient={G_TEST} size={64}/></div>
          <Kicker gradient={G_TEST}>Шаг первый</Kicker>
          <h1 style={{margin:"0 0 4px",fontSize:25,fontWeight:800,color:TX,letterSpacing:"-0.4px"}}>Фитнес-тест</h1>
          <div style={{fontSize:13,color:SB}}>4 упражнения · ~10 мин</div>
        </div>
        {plan && (
          <div style={{background:"rgba(78,196,102,0.08)",borderRadius:14,padding:"12px 14px",marginBottom:14,border:"1px solid rgba(78,196,102,0.2)"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#68C878",marginBottom:6}}>✓ У тебя уже есть план</div>
            <button onClick={()=>setTab("plan")} style={{...bp(G_PLAN),padding:"10px 0",fontSize:13}}>Открыть →</button>
          </div>
        )}
        <div style={{...C,marginBottom:14}}>
          {TESTS.map((t,i)=>(
            <div key={i} style={{display:"flex",gap:12,padding:"9px 0",borderBottom:i<TESTS.length-1?`1px solid ${BD}`:"none",alignItems:"center"}}>
              <IconTile emoji={t.emoji} gradient={t.color} size={36}/>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:TX}}>{t.name}</div>
                <div style={{fontSize:11,color:SB}}>{t.mode==="input"?"на максимум повторений":t.mode==="timer_up"?"на время":"60 секунд"}</div>
              </div>
            </div>
          ))}
        </div>
        <button style={bp(G_TEST)} onClick={()=>setTScreen("testing")}>{plan?"Пройти заново":"Начать тест →"}</button>
      </div>
    );
    if(tScreen==="testing") return (
      <div>
        <div style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:SB,marginBottom:6}}>
            <span>{step+1} / {TESTS.length}</span><span style={{color:test.text}}>{test.name}</span>
          </div>
          <div style={{background:BD,borderRadius:4,height:3}}><div style={{background:test.color,height:3,borderRadius:4,width:`${((step+1)/TESTS.length)*100}%`,transition:"width 0.3s"}}/></div>
        </div>
        <div style={{...C,borderTop:`3px solid ${test.color}`,marginBottom:14}}>
          <div style={{marginBottom:10}}><IconTile emoji={test.emoji} gradient={test.color} size={52}/></div>
          <h2 style={{margin:"0 0 6px",fontSize:19,fontWeight:800,color:TX}}>{test.name}</h2>
          <div style={{fontSize:13,color:SB,marginBottom:12}}>{test.instruction}</div>
          <div style={{background:test.bg,borderRadius:10,padding:"8px 12px",marginBottom:14,border:`1px solid ${test.color}33`}}>
            {test.tips.map((t,i)=>(
              <div key={i} style={{fontSize:12,color:test.text,padding:"2px 0",display:"flex",gap:6}}><span>·</span><span>{t}</span></div>
            ))}
          </div>
          {(test.mode==="timer_up"||test.mode==="timer_down")&&(
            <TimerBlock mode={test.mode} color={test.color} onAutoFill={v=>setVals(p=>({...p,[test.id]:v}))}/>
          )}
          <div style={{marginTop:test.mode==="input"?0:12}}>
            <label style={{fontSize:12,fontWeight:600,color:SB,display:"block",marginBottom:6}}>Результат:</label>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input type="number" min="0" value={vals[test.id]} onChange={e=>setVals(p=>({...p,[test.id]:e.target.value}))} placeholder="0"
                style={{flex:1,background:CD2,border:`2px solid ${canNext?test.color:BD}`,borderRadius:10,padding:"12px",fontSize:22,fontWeight:700,color:TX,outline:"none",textAlign:"center"}}/>
              <div style={{fontSize:13,color:SB,minWidth:36}}>{test.unit}</div>
            </div>
          </div>
        </div>
        <button onClick={canNext?goNext:undefined} disabled={!canNext}
          style={{...bp(canNext?test.color:BD),opacity:canNext?1:0.4,cursor:canNext?"pointer":"not-allowed",marginBottom:8}}>
          {step<TESTS.length-1?"Следующее →":"Дальше →"}
        </button>
        {step>0&&<button onClick={()=>setStep(s=>s-1)} style={{background:"transparent",border:"none",color:SB,fontSize:13,cursor:"pointer",width:"100%",padding:8}}>← Назад</button>}
      </div>
    );
    if(tScreen==="location") return (
      <div>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:14}}><IconTile emoji="📍" gradient={G_PLAN} size={56}/></div>
          <Kicker gradient={G_PLAN}>Последний шаг</Kicker>
          <h2 style={{margin:"0 0 6px",fontSize:21,fontWeight:800,color:TX}}>Где занимаешься?</h2>
          <div style={{fontSize:13,color:SB}}>Это определит упражнения в плане</div>
        </div>
        <button onClick={()=>buildPlan("home")} style={{...C,width:"100%",textAlign:"left",marginBottom:10,cursor:"pointer",display:"flex",alignItems:"center",gap:14}}>
          <IconTile emoji="🏠" gradient={G_CAL} size={48}/>
          <div><div style={{fontSize:15,fontWeight:700,color:TX,marginBottom:2}}>Дома</div><div style={{fontSize:12,color:SB}}>Только вес тела</div></div>
        </button>
        <button onClick={()=>buildPlan("gym")} style={{...C,width:"100%",textAlign:"left",marginBottom:12,cursor:"pointer",display:"flex",alignItems:"center",gap:14}}>
          <IconTile emoji="🏋️" gradient={G_TEST} size={48}/>
          <div><div style={{fontSize:15,fontWeight:700,color:TX,marginBottom:2}}>В зале</div><div style={{fontSize:12,color:SB}}>Гантели, штанга, тренажёры</div></div>
        </button>
        <button onClick={()=>setTScreen("testing")} style={{background:"transparent",border:"none",color:SB,fontSize:13,cursor:"pointer",width:"100%",padding:8}}>← Назад</button>
      </div>
    );
    if(tScreen==="loading") return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh"}}>
        <div style={{marginBottom:16}}><IconTile chamType="plan" gradient={G_PLAN} size={60}/></div>
        <div style={{fontSize:16,fontWeight:700,color:TX,marginBottom:6}}>Строим план...</div>
        <div style={{fontSize:13,fontWeight:700,...gradText(G_PLAN)}}>Подбираем нагрузку...</div>
      </div>
    );
    if(tScreen==="error") return (
      <div style={{...C,textAlign:"center"}}>
        <div style={{fontSize:40,marginBottom:8}}>❌</div>
        <div style={{fontSize:15,fontWeight:700,color:TX,marginBottom:6}}>Что-то пошло не так</div>
        <div style={{fontSize:12,color:SB,marginBottom:14}}>{planErr}</div>
        <button style={bp(G_TEST)} onClick={()=>buildPlan(lastLoc)}>Повторить</button>
      </div>
    );
    return (
      <div style={{...C,textAlign:"center"}}>
        <div style={{fontSize:50,marginBottom:10}}>✅</div>
        <div style={{fontSize:16,fontWeight:700,color:TX,marginBottom:4}}>Готово! Данные сохранены</div>
        <div style={{fontSize:13,color:SB,marginBottom:16}}>Закроешь вкладку — всё останется</div>
        <button style={{...bp(G_PLAN),marginBottom:8}} onClick={()=>setTab("plan")}>К тренировке →</button>
        <button onClick={reset} style={{background:"transparent",border:`1px solid ${BD}`,color:SB,borderRadius:12,padding:"11px 0",fontSize:13,fontWeight:600,cursor:"pointer",width:"100%"}}>Пройти заново</button>
      </div>
    );
  };

  const rWorkout=()=>{
    if(!plan) return (
      <div style={{...C,textAlign:"center",padding:"32px 16px"}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:14}}><IconTile chamType="plan" gradient={G_PLAN} size={56}/></div>
        <div style={{fontSize:15,fontWeight:700,color:TX,marginBottom:6}}>Сначала пройди тест</div>
        <div style={{fontSize:13,color:SB,marginBottom:16}}>Нужны результаты для подбора нагрузки</div>
        <button style={bp(G_TEST)} onClick={()=>setTab("test")}>К тесту →</button>
      </div>
    );
    const phase=plan.phases[ph],pc=PC[ph],pb=PBG[ph];
    const totalExes=phase?.exercises?.length||0;
    const doneExes=phase?.exercises?.filter(ex=>(setsDone[ex.name]||0)>=ex.sets).length||0;
    const allDone=totalExes>0&&doneExes===totalExes;
    return (
      <div>
        <div style={{display:"flex",gap:6,marginBottom:12}}>
          {plan.phases.map((p,i)=>(
            <button key={i} onClick={()=>{setPh(i);setSetsDone({});}} style={{flex:1,border:`1px solid ${ph===i?PC[i]:BD}`,borderRadius:12,padding:"9px 4px",background:ph===i?PBG[i]:CD,color:ph===i?PC[i]:SB,fontWeight:700,fontSize:12,cursor:"pointer",transition:"all 0.18s"}}>
              {p.title}<br/><span style={{fontSize:10,fontWeight:500,opacity:0.8}}>{p.weeks} нед.</span>
            </button>
          ))}
        </div>
        <div style={{...C,marginBottom:10,display:"flex",gap:12,alignItems:"center",borderLeft:`3px solid ${pc}`}}>
          <div style={{flex:1}}>
            <div style={{display:"flex",gap:6,marginBottom:5}}>
              <span style={{background:plan.levelColor+"33",color:plan.levelColor,borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:700}}>{plan.levelLabel}</span>
              {plan.location&&<span style={{background:"rgba(255,255,255,0.05)",color:SB,borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:700}}>{plan.location==="home"?"🏠 Дома":"🏋️ Зал"}</span>}
            </div>
            <div style={{fontSize:14,fontWeight:700,color:TX}}>{phase.theme}</div>
            <div style={{fontSize:12,color:SB,marginTop:2}}>{phase.note}</div>
          </div>
          <div style={{background:pb,color:pc,padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{phase.duration}</div>
        </div>
        {totalExes>0&&(
          <div style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:SB,marginBottom:4}}>
              <span>Сессия</span><span style={{color:pc,fontWeight:700}}>{doneExes}/{totalExes}</span>
            </div>
            <div style={{background:BD,borderRadius:4,height:4}}><div style={{background:pc,height:4,borderRadius:4,width:`${totalExes>0?(doneExes/totalExes)*100:0}%`,transition:"width 0.4s"}}/></div>
          </div>
        )}
        <div style={{...C,marginBottom:8,padding:"12px 14px",display:"flex",gap:10,alignItems:"center"}}>
          <span style={{fontSize:18}}>🔥</span>
          <div><div style={{fontSize:10,color:SB,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:1}}>Разминка</div><div style={{fontSize:13,color:TX}}>{phase.warmup}</div></div>
        </div>
        {phase.exercises.map((ex,i)=>{
          const done=setsDone[ex.name]||0;
          const isComplete=done>=ex.sets;
          return (
            <div key={i} style={{...C,marginBottom:8,borderLeft:`3px solid ${isComplete?pc:BD}`,opacity:isComplete?0.72:1,transition:"opacity 0.3s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:ex.tip?6:10}}>
                <div style={{fontSize:14,fontWeight:700,color:TX}}>{ex.name}</div>
                <div style={{background:pb,color:pc,padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:700}}>{ex.sets}×{ex.reps}</div>
              </div>
              {ex.tip&&<div style={{fontSize:12,color:SB,fontStyle:"italic",marginBottom:8}}>💬 {ex.tip}</div>}
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{display:"flex",gap:5}}>
                  {Array.from({length:ex.sets}).map((_,si)=>(
                    <div key={si} style={{width:10,height:10,borderRadius:"50%",background:si<done?pc:BD,transition:"background 0.25s"}}/>
                  ))}
                </div>
                <div style={{flex:1}}/>
                {isComplete
                  ?<span style={{fontSize:12,color:pc,fontWeight:700}}>✓ Готово</span>
                  :<button onClick={()=>doSet(ex.name,ex.sets)} style={{background:pb,color:pc,border:`1px solid ${pc}44`,borderRadius:10,padding:"7px 14px",fontSize:13,fontWeight:700,cursor:"pointer"}}>▶ Подход {done+1}/{ex.sets}</button>
                }
              </div>
            </div>
          );
        })}
        <div style={{...C,marginBottom:12,padding:"12px 14px",display:"flex",gap:10,alignItems:"center"}}>
          <span style={{fontSize:18}}>🧘</span>
          <div><div style={{fontSize:10,color:SB,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:1}}>Заминка</div><div style={{fontSize:13,color:TX}}>{phase.cooldown}</div></div>
        </div>
        {allDone&&(
          <div style={{background:pb,border:`1px solid ${pc}44`,borderRadius:16,padding:"16px",textAlign:"center",marginBottom:12}}>
            <div style={{fontSize:28,marginBottom:6}}>🎉</div>
            <div style={{fontSize:15,fontWeight:700,color:pc,marginBottom:10}}>Тренировка выполнена!</div>
            <button onClick={logWorkout} style={bp(pc)}>Записать в трекер →</button>
          </div>
        )}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {TESTS.map(t=>(
            <div key={t.id} style={{background:t.bg,borderRadius:12,padding:"10px 12px",border:`1px solid ${t.color}33`}}>
              <div style={{fontSize:10,color:SB,marginBottom:1}}>{t.emoji} {t.name}</div>
              <div style={{fontSize:18,fontWeight:800,color:t.text}}>{vals[t.id]}<span style={{fontSize:11,fontWeight:500,marginLeft:3}}>{t.unit}</span></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const rFood=()=>{
    const subs=[{id:"recipes",l:"Рецепты"},{id:"products",l:"Продукты"},{id:"shop",l:`Список${shopList.length>0?" ("+shopList.filter(i=>!i.done).length+")":""}`}];
    return (
      <div>
        <div style={{textAlign:"center",marginBottom:12}}>
          <Kicker gradient={G_FOOD}>Питание</Kicker>
          <h2 style={{margin:"0 0 2px",fontSize:23,fontWeight:800,color:TX,letterSpacing:"-0.4px"}}>Еда 🍽️</h2>
          <div style={{fontSize:13,color:SB}}>~2500 ккал · 130–150г белка</div>
        </div>
        <div style={{display:"flex",gap:5,marginBottom:14,overflowX:"auto",paddingBottom:2}}>
          {subs.map(s=>(
            <button key={s.id} onClick={()=>setFoodSub(s.id)} style={{flex:"0 0 auto",border:`1px solid ${foodSub===s.id?"#CEB03A":BD}`,borderRadius:20,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",background:foodSub===s.id?"rgba(206,176,58,0.15)":CD,color:foodSub===s.id?"#CEB03A":SB,whiteSpace:"nowrap",transition:"all 0.18s"}}>
              {s.l}
            </button>
          ))}
        </div>
        {foodSub==="products"&&(
          <div>
            {FOOD_CATS.map((cat,ci)=>(
              <div key={ci} style={{marginBottom:8}}>
                <button onClick={()=>setOpenFoodCat(openFoodCat===ci?null:ci)} style={{width:"100%",background:CD2,border:`1px solid ${BD}`,borderRadius:14,padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                  <span style={{fontSize:13,fontWeight:700,color:TX}}>{cat.cat}</span>
                  <span style={{fontSize:11,color:SB}}>{cat.items.length} · {openFoodCat===ci?"▲":"▼"}</span>
                </button>
                {openFoodCat===ci&&(
                  <div style={{...C,borderRadius:"0 0 14px 14px",borderTop:"none",marginTop:-1}}>
                    {cat.items.map((f,i)=>(
                      <div key={i} style={{padding:"8px 0",borderBottom:i<cat.items.length-1?`1px solid ${BD}`:"none",display:"flex",alignItems:"center",gap:10}}>
                        <span style={{fontSize:18}}>{f.e}</span>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13,fontWeight:600,color:TX}}>{f.n}</div>
                          <div style={{fontSize:11,color:SB}}>{f.d}</div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:2}}>
                          <span style={{fontSize:10,color:"#68C878",background:"rgba(78,196,102,0.1)",padding:"2px 6px",borderRadius:10,fontWeight:700,whiteSpace:"nowrap"}}>{f.pr}</span>
                          {f.p!=="—"&&<span style={{fontSize:10,color:"#A0CC7A",padding:"2px 4px",whiteSpace:"nowrap"}}>🥩 {f.p}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {foodSub==="recipes"&&(
          <div>
            <div style={{display:"flex",gap:6,marginBottom:12,overflowX:"auto",paddingBottom:2}}>
              {RECIPE_CATS.map((cat,i)=>(
                <button key={i} onClick={()=>{setOpenRecCat(i);setOpenRec(null);}} style={{flex:"0 0 auto",border:`1px solid ${openRecCat===i?cat.color:BD}`,borderRadius:20,padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer",background:openRecCat===i?`${cat.color}22`:CD,color:openRecCat===i?cat.color:SB,whiteSpace:"nowrap",transition:"all 0.18s"}}>
                  {cat.cat}
                </button>
              ))}
            </div>
            {RECIPE_CATS[openRecCat].items.map((r,i)=>(
              <div key={i} style={{...C,marginBottom:8,borderTop:`3px solid ${RECIPE_CATS[openRecCat].color}`,cursor:"pointer"}} onClick={()=>setOpenRec(openRec===i?null:i)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:TX,marginBottom:4}}>{r.n}</div>
                    <div style={{display:"flex",gap:5}}>
                      <span style={{fontSize:10,color:SB,background:CD2,padding:"2px 6px",borderRadius:10}}>⏱ {r.t}</span>
                      <span style={{fontSize:10,color:"#DCC464",background:"rgba(206,176,58,0.1)",padding:"2px 6px",borderRadius:10}}>🔥 {r.k}</span>
                      <span style={{fontSize:10,color:"#A0D870",background:"rgba(78,196,102,0.1)",padding:"2px 6px",borderRadius:10}}>🥩 {r.p}</span>
                    </div>
                  </div>
                  <span style={{fontSize:14,color:SB,marginLeft:8,flexShrink:0}}>{openRec===i?"▲":"▼"}</span>
                </div>
                {openRec===i&&(
                  <div style={{marginTop:12}}>
                    <div style={{fontSize:10,fontWeight:700,color:SB,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>Ингредиенты</div>
                    {r.i.map((ing,j)=>(<div key={j} style={{fontSize:12.5,color:SB,padding:"2px 0",display:"flex",gap:6}}><span style={{color:RECIPE_CATS[openRecCat].color}}>·</span><span>{ing}</span></div>))}
                    <div style={{fontSize:10,fontWeight:700,color:SB,textTransform:"uppercase",letterSpacing:"0.1em",margin:"10px 0 6px"}}>Приготовление</div>
                    {r.s.map((inst,j)=>(
                      <div key={j} style={{display:"flex",gap:10,padding:"4px 0",alignItems:"flex-start"}}>
                        <div style={{background:CD2,color:RECIPE_CATS[openRecCat].color,borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>{j+1}</div>
                        <div style={{fontSize:12.5,color:SB,lineHeight:1.45}}>{inst}</div>
                      </div>
                    ))}
                    <button onClick={e=>{e.stopPropagation();addToShop(r);}} style={{width:"100%",marginTop:10,background:"rgba(206,176,58,0.1)",color:"#CEB03A",border:"1px solid rgba(206,176,58,0.25)",borderRadius:10,padding:"9px 0",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                      🛒 В список покупок
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {foodSub==="shop"&&(
          <div>
            {shopList.length===0?(
              <div style={{...C,textAlign:"center",padding:"32px 16px"}}>
                <div style={{fontSize:40,marginBottom:10}}>🛒</div>
                <div style={{fontSize:14,fontWeight:700,color:TX,marginBottom:6}}>Список пустой</div>
                <div style={{fontSize:13,color:SB}}>Открой рецепт → «В список покупок»</div>
              </div>
            ):(
              <>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{fontSize:13,color:SB}}>{shopList.filter(i=>i.done).length} / {shopList.length} куплено</div>
                  <button onClick={()=>setShopList([])} style={{background:"transparent",border:"none",color:"#DC7840",fontSize:12,cursor:"pointer",fontWeight:600}}>Очистить</button>
                </div>
                {shopList.map((item,idx)=>(
                  <button key={idx} onClick={()=>setShopList(p=>p.map((it,i)=>i===idx?{...it,done:!it.done}:it))}
                    style={{...C,width:"100%",textAlign:"left",marginBottom:6,display:"flex",alignItems:"center",gap:12,cursor:"pointer",opacity:item.done?0.5:1,padding:"12px 14px"}}>
                    <div style={{width:20,height:20,borderRadius:6,border:`2px solid ${item.done?"#4EC466":BD}`,background:item.done?"rgba(78,196,102,0.2)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {item.done&&<span style={{color:"#4EC466",fontSize:11}}>✓</span>}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600,color:TX,textDecoration:item.done?"line-through":"none"}}>{item.text}</div>
                      <div style={{fontSize:11,color:SB}}>{item.from}</div>
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const rProgress=()=>{
    const tasks=[{id:"workout",e:"💪",l:"Тренировка"},{id:"food",e:"🍽️",l:"Питание"},{id:"sleep",e:"⏰",l:"Режим"}];
    const todayKey=toKey(NOW);
    const todayData=comps[todayKey]||{};
    return (
      <div>
        <div style={{textAlign:"center",marginBottom:12}}>
          <Kicker gradient={G_CAL}>Статистика</Kicker>
          <h2 style={{margin:"0 0 2px",fontSize:23,fontWeight:800,color:TX,letterSpacing:"-0.4px"}}>Прогресс 📊</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
          {[
            {label:"🔥 Серия",val:streak,unit:"дней",grad:G_TEST},
            {label:"💪 Неделя",val:weekWorkouts,unit:"трен.",grad:G_PLAN},
            {label:"📅 Месяц",val:mDone,unit:"дней",grad:G_CAL},
          ].map((s,i)=>(
            <div key={i} style={{...C,textAlign:"center",padding:"12px 8px"}}>
              <div style={{fontSize:28,fontWeight:800,lineHeight:1,...gradText(s.grad)}}>{s.val}</div>
              <div style={{fontSize:9,color:SB,marginTop:2}}>{s.unit}</div>
              <div style={{fontSize:9,color:SB,opacity:0.8}}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{...C,marginBottom:12}}>
          <div style={{fontSize:11,fontWeight:700,color:SB,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.08em"}}>Сегодня</div>
          <div style={{display:"flex",gap:8}}>
            {tasks.map(t=>(
              <button key={t.id} onClick={()=>toggleComp(todayKey,t.id)}
                style={{flex:1,background:todayData[t.id]?"rgba(78,196,102,0.15)":CD2,border:`1px solid ${todayData[t.id]?"#4EC466":BD}`,borderRadius:12,padding:"10px 4px",cursor:"pointer",textAlign:"center",transition:"all 0.2s"}}>
                <div style={{fontSize:18,marginBottom:3}}>{t.e}</div>
                <div style={{fontSize:9,fontWeight:700,color:todayData[t.id]?"#68C878":SB}}>{t.l}</div>
              </button>
            ))}
          </div>
        </div>
        <div style={{...C,marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div><div style={{fontSize:13,fontWeight:700,color:TX}}>💧 Вода</div><div style={{fontSize:11,color:SB}}>{water} из 8 стаканов</div></div>
            <button onClick={removeWater} style={{background:"transparent",border:`1px solid ${BD}`,color:SB,borderRadius:8,width:28,height:28,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
          </div>
          <div style={{display:"flex",gap:5,justifyContent:"center",marginBottom:8}}>
            {Array.from({length:8}).map((_,i)=>(
              <button key={i} onClick={addWater} style={{width:32,height:36,border:`2px solid ${i<water?"#3EA89A":BD}`,borderRadius:8,background:i<water?"rgba(62,168,154,0.2)":"transparent",cursor:"pointer",transition:"all 0.2s",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>
                <span style={{opacity:i<water?1:0.2}}>💧</span>
              </button>
            ))}
          </div>
          <div style={{background:BD,borderRadius:4,height:4}}><div style={{background:G_CAL,height:4,borderRadius:4,width:`${(water/8)*100}%`,transition:"width 0.3s"}}/></div>
        </div>
        <div style={{...C,marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:700,color:TX,marginBottom:10}}>⚖️ Вес</div>
          <div style={{display:"flex",gap:8,marginBottom:8}}>
            <input type="number" step="0.1" placeholder={weightLog[0]?`Последний: ${weightLog[0].val} кг`:"Введи кг"} value={weightInput} onChange={e=>setWeightInput(e.target.value)}
              style={{flex:1,background:CD2,border:`1px solid ${BD}`,borderRadius:10,padding:"10px 12px",fontSize:14,color:TX,outline:"none"}}/>
            <button onClick={logWeight} style={{background:G_PLAN,color:"#fff",border:"none",borderRadius:10,padding:"10px 18px",fontSize:13,fontWeight:700,cursor:"pointer"}}>✓</button>
          </div>
          {weightLog.slice(0,5).length>0&&(
            <div style={{display:"flex",gap:6}}>
              {weightLog.slice(0,5).map((e,i)=>(
                <div key={i} style={{flex:1,textAlign:"center",background:CD2,borderRadius:10,padding:"6px 4px"}}>
                  <div style={{fontSize:13,fontWeight:700,color:i===0?"#4EC466":TX}}>{e.val}</div>
                  <div style={{fontSize:9,color:SB}}>{e.date.slice(5)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={C}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <button onClick={()=>setCalMonth(new Date(calY,calM-1,1))} style={{background:CD2,border:`1px solid ${BD}`,color:TX,borderRadius:8,padding:"5px 12px",cursor:"pointer",fontSize:15}}>‹</button>
            <div style={{fontSize:14,fontWeight:700,color:TX}}>{MONTHS[calM]} {calY}</div>
            <button onClick={()=>setCalMonth(new Date(calY,calM+1,1))} style={{background:CD2,border:`1px solid ${BD}`,color:TX,borderRadius:8,padding:"5px 12px",cursor:"pointer",fontSize:15}}>›</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:4}}>
            {WDAYS.map(d=>(<div key={d} style={{textAlign:"center",fontSize:9,fontWeight:700,color:SB,padding:"2px 0"}}>{d}</div>))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
            {cells.map((day,i)=>{
              if(!day) return (<div key={i}/>);
              const d=new Date(calY,calM,day);
              const dk=toKey(d);
              const dayData=comps[dk]||{};
              const isToday=toKey(NOW)===dk;
              const isFut=d>NOW;
              const doneCount=tasks.filter(t=>dayData[t.id]).length;
              return (
                <div key={i} style={{background:isToday?"rgba(78,196,102,0.18)":CD2,borderRadius:8,padding:"4px 2px",border:isToday?"1px solid #4EC466":`1px solid ${BD}`,opacity:isFut?0.25:1,textAlign:"center"}}>
                  <div style={{fontSize:11,fontWeight:isToday?700:500,color:isToday?"#4EC466":TX,marginBottom:2}}>{day}</div>
                  <div style={{display:"flex",justifyContent:"center",gap:1}}>
                    {tasks.map(t=>(
                      <button key={t.id} onClick={()=>{if(!isFut)toggleComp(dk,t.id);}} style={{background:"transparent",border:"none",padding:"1px",cursor:isFut?"default":"pointer",fontSize:9,opacity:dayData[t.id]?1:0.15,transition:"opacity 0.15s"}}>{t.e}</button>
                    ))}
                  </div>
                  {doneCount>0&&<div style={{fontSize:6,color:doneCount===3?"#4EC466":doneCount===2?"#CEB03A":"#3EA89A",marginTop:1}}>{"●".repeat(doneCount)}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const rTips=()=>(
    <div>
      <div style={{textAlign:"center",marginBottom:14}}>
        <Kicker gradient={G_TIPS}>Каждый раз новый</Kicker>
        <h2 style={{margin:"0 0 2px",fontSize:23,fontWeight:800,color:TX,letterSpacing:"-0.4px"}}>Советы 💡</h2>
      </div>
      <div style={{...C,marginBottom:12,minHeight:130,display:"flex",flexDirection:"column",justifyContent:"center",border:tipCat?`1px solid ${tipCat.color}44`:`1px solid ${BD}`}}>
        {tipLoading?(
          <div style={{textAlign:"center"}}><div style={{fontSize:36,marginBottom:8}}>⚡</div><div style={{fontSize:13,color:SB}}>Генерируем...</div></div>
        ):tip?(
          <div>
            {tipCat&&(
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${tipCat.color}22`,color:tipCat.color,border:`1px solid ${tipCat.color}44`,borderRadius:20,padding:"4px 12px",fontSize:12,fontWeight:700}}>{tipCat.emoji} {tipCat.label}</div>
                <button onClick={()=>saveTipFn({cat:tipCat,text:tip})} style={{background:"transparent",border:"none",color:SB,fontSize:18,cursor:"pointer",padding:"0 4px"}}>🔖</button>
              </div>
            )}
            <div style={{fontSize:14,color:TX,lineHeight:1.65}}>{tip}</div>
          </div>
        ):(
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:8}}>✨</div>
            <div style={{fontSize:13,color:SB}}>Нажми — получишь случайный совет</div>
          </div>
        )}
      </div>
      <button onClick={genTip} disabled={tipLoading} style={{background:G_TIPS,color:"#fff",border:"none",borderRadius:16,padding:"14px 0",fontSize:15,fontWeight:700,cursor:tipLoading?"not-allowed":"pointer",width:"100%",opacity:tipLoading?0.6:1,marginBottom:12,boxShadow:"0 8px 20px -8px rgba(0,0,0,0.55)"}}>
        ✨ {tipLoading?"Загружаем...":"Новый совет"}
      </button>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
        {TIP_CATS.map(tc=>(<div key={tc.id} style={{display:"flex",alignItems:"center",gap:4,background:`${tc.color}11`,border:`1px solid ${tc.color}33`,borderRadius:20,padding:"5px 10px",fontSize:11,color:tc.color,fontWeight:600}}>{tc.emoji} {tc.label}</div>))}
      </div>
      {savedTips.length>0&&(
        <div style={{marginBottom:14}}>
          <div style={{fontSize:10,fontWeight:700,color:SB,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Сохранённые 🔖</div>
          {savedTips.slice(0,3).map((h,i)=>(<div key={i} style={{...C,marginBottom:6,borderLeft:`3px solid ${h.cat.color}`,opacity:1-i*0.1}}><div style={{fontSize:11,color:h.cat.color,fontWeight:700,marginBottom:3}}>{h.cat.emoji} {h.cat.label}</div><div style={{fontSize:12.5,color:SB,lineHeight:1.5}}>{h.text}</div></div>))}
        </div>
      )}
      {tipHist.length>0&&(
        <div style={{marginBottom:14}}>
          <div style={{fontSize:10,fontWeight:700,color:SB,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Недавние</div>
          {tipHist.map((h,i)=>(<div key={i} style={{...C,marginBottom:6,opacity:1-i*0.2,borderLeft:`3px solid ${h.cat.color}`}}><div style={{fontSize:11,color:h.cat.color,fontWeight:700,marginBottom:3}}>{h.cat.emoji} {h.cat.label}</div><div style={{fontSize:12.5,color:SB,lineHeight:1.5}}>{h.text}</div></div>))}
        </div>
      )}
      <div style={{fontSize:10,fontWeight:700,color:SB,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>⚓ Три правила</div>
      {ANCHORS.map((a,i)=>(
        <div key={i} style={{...C,marginBottom:6,display:"flex",gap:10,alignItems:"center",padding:"12px 14px"}}>
          <span style={{fontSize:20,flexShrink:0}}>{a.emoji}</span>
          <div><div style={{fontSize:13,fontWeight:700,color:TX}}>{a.title}</div><div style={{fontSize:11,color:a.color}}>{a.sub}</div></div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{fontFamily:"'Segoe UI','Inter',system-ui,sans-serif",background:BG,minHeight:"100vh",position:"relative",overflow:"hidden"}}>
      <GlowOrb gradient={TAB_GRAD[tab]} size={320} style={{top:-100,left:-80}}/>
      <GlowOrb gradient={TAB_GRAD[tab]} size={280} style={{bottom:60,right:-100,opacity:0.1}}/>
      {restTimer&&(
        <div style={{position:"fixed",inset:0,background:"rgba(17,28,20,0.97)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",zIndex:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
          <div style={{fontSize:11,color:SB,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:12}}>⏸ Отдых</div>
          <div style={{fontSize:88,fontWeight:800,lineHeight:1,...gradText(G_PLAN)}}>{restTimer.secs}</div>
          <div style={{fontSize:13,color:SB,marginTop:6,marginBottom:24}}>секунд</div>
          <div style={{background:"linear-gradient(170deg,#192B1C 0%,#141F17 100%)",borderRadius:16,padding:"14px 20px",marginBottom:28,textAlign:"center",border:`1px solid ${BD}`,minWidth:200}}>
            <div style={{fontSize:11,color:SB,marginBottom:4}}>Следующий подход</div>
            <div style={{fontSize:15,fontWeight:700,color:TX}}>{restTimer.name}</div>
          </div>
          <button onClick={()=>setRestTimer(null)} style={{background:G_CAL,color:"#fff",border:"none",borderRadius:14,padding:"13px 36px",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 8px 20px -8px rgba(0,0,0,0.55)"}}>Пропустить →</button>
        </div>
      )}
      <div style={{padding:"20px 14px 110px",position:"relative",zIndex:1}}>
        {tab==="test"&&rTest()}
        {tab==="plan"&&rWorkout()}
        {tab==="food"&&rFood()}
        {tab==="cal"&&rProgress()}
      </div>
      <TabBar tab={tab} setTab={setTab}/>
    </div>
  );
}
