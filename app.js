const scenes=[
{kicker:"EL DESCUBRIMIENTO",title:"Un hallazgo brillante",text:"Un día, Javis encontró un escarabajo brillante.\n¡No tuvo miedo!",emoji:"🪲",prompt:"Toca el ámbar para comenzar la aventura.",art:"beetle"},
{kicker:"EL ELEGIDO",title:"Nace el Capitán Escarabajo",text:"—Javier, tú eres el elegido —dijo el escarabajo. El ámbar brilló y Javis tuvo superpoderes. ¡Había nacido el Capitán Escarabajo!",emoji:"🦸🏻‍♂️",prompt:"¡Has descubierto tus superpoderes! Sigue para conocer tu misión.",art:"hero"},
{kicker:"UNA MISIÓN EN EL TIEMPO",title:"Una mariposa en peligro",text:"El ámbar mostró una misión: ¡una mariposa en peligro en la era de los dinosaurios!",emoji:"🦋",prompt:"La misión está esperando. ¿Listo para viajar al pasado?",art:"butterfly"},
{kicker:"EL PORTAL",title:"Rex y Trico te esperan",text:"Javis tocó el ámbar y se abrió un portal. En la selva lo esperaban Rex y Trico.",emoji:"🦖",prompt:"Cruza el portal y conoce a tus nuevos amigos.",art:"portal"},
{kicker:"¡HAY QUE AYUDAR!",title:"Atrapada en la savia",text:"¡La mariposa estaba atrapada en savia pegajosa! La mariquita y la libélula llegaron a ayudar.",emoji:"🐞",prompt:"Cada amigo tiene una habilidad. Descubre cómo pueden ayudar.",art:"rescue"},
{kicker:"TRABAJO EN EQUIPO",title:"¡Jala, jala, jala!",text:"Rex empujó, Trico protegió, la libélula voló y Javis lanzó su hilo de telaraña. ¡Jala, jala, jala!",emoji:"🕸️",prompt:"Toca «Siguiente» para ayudar al equipo a liberar a la mariposa.",art:"team"},
{kicker:"MISIÓN CUMPLIDA",title:"¡La mariposa quedó libre!",text:"¡La mariposa quedó libre! El ámbar brilló verde: misión cumplida.",emoji:"✨",prompt:"¡Lo lograron! El trabajo en equipo hizo la diferencia.",art:"success"},
{kicker:"DE VUELTA A CASA",title:"Una noche tranquila",text:"Javis volvió a casa y se durmió. El ámbar brilló: ¡pronto habría una nueva misión! FIN",emoji:"🌙",prompt:"El ámbar guarda más secretos…",art:"night"},
{kicker:"FIN… POR AHORA",title:"¿Listo para otra aventura?",text:"La historia termina aquí, pero el ámbar del tiempo sigue brillando. ¡El Capitán Escarabajo volverá!",emoji:"🌟",prompt:"Vuelve a empezar cuando quieras y revive la aventura.",art:"ending"}
];
const $=id=>document.getElementById(id);let current=0,installedEvent=null,soundOn=false;
const intro=$("intro"),reader=$("reader");
function saved(){try{return JSON.parse(localStorage.getItem("javis-progress")||"{}")}catch{return{}}}
function persist(){try{localStorage.setItem("javis-progress",JSON.stringify({scene:current,bookmarks:saved().bookmarks||[]}))}catch{}}
function render(){
 const s=scenes[current];$("sceneCounter").textContent="ESCENA "+(current+1)+" DE "+scenes.length;$("progressPercent").textContent=Math.round((current+1)/scenes.length*100)+"%";$("progressBar").style.width=((current+1)/scenes.length*100)+"%";
 $("sceneNumber").textContent=String(current+1).padStart(2,"0");$("sceneKicker").textContent=s.kicker;$("sceneTitle").textContent=s.title;$("sceneText").textContent=s.text;$("sceneEmoji").textContent=s.emoji;$("promptText").textContent=s.prompt;$("sceneArt").dataset.scene=current+1;
 $("prevBtn").disabled=current===0;$("nextBtn").innerHTML=current===scenes.length-1?'Volver a empezar <span>↻</span>':'Siguiente <span>→</span>';
 $("dots").replaceChildren(...scenes.map((_,i)=>{const b=document.createElement("button");b.className="dot-btn"+(i===current?" active":"");b.setAttribute("aria-label","Ir a escena "+(i+1));b.title="Escena "+(i+1);b.onclick=()=>go(i);return b}));
 const marks=saved().bookmarks||[];$("bookmarkBtn").textContent=marks.includes(current)?"★ Escena guardada":"☆ Guardar escena";$("ending").hidden=current!==scenes.length-1;persist();
}
function go(n){current=(n+scenes.length)%scenes.length;render();if(soundOn)readScene();window.scrollTo({top:0,behavior:"smooth"})}
function start(n=0){intro.hidden=true;reader.hidden=false;current=n;render();window.scrollTo({top:0,behavior:"smooth"})}
function readScene(){if(!("speechSynthesis"in window)){alert("La narración de voz no está disponible en este navegador.");return}speechSynthesis.cancel();const s=scenes[current];const utter=new SpeechSynthesisUtterance(s.title+". "+s.text);utter.lang="es-MX";utter.rate=.92;speechSynthesis.speak(utter)}
$("startBtn").onclick=()=>start(0);$("continueBtn").onclick=()=>start(saved().scene||0);$("backBtn").onclick=()=>{reader.hidden=true;intro.hidden=false;window.scrollTo({top:0,behavior:"smooth"})};$("homeBtn").onclick=e=>{e.preventDefault();reader.hidden=true;intro.hidden=false;window.scrollTo({top:0,behavior:"smooth"})};$("prevBtn").onclick=()=>go(current-1);$("nextBtn").onclick=()=>current===scenes.length-1?go(0):go(current+1);$("restartBtn").onclick=()=>go(0);
$("bookmarkBtn").onclick=()=>{const d=saved(),marks=d.bookmarks||[],idx=marks.indexOf(current);if(idx<0)marks.push(current);else marks.splice(idx,1);d.bookmarks=marks;try{localStorage.setItem("javis-progress",JSON.stringify(d))}catch{}render()};
$("readAloudBtn").onclick=()=>readScene();$("soundBtn").onclick=()=>{soundOn=!soundOn;$("soundBtn").textContent=soundOn?"🔈":"🔊";$("soundBtn").setAttribute("aria-label",soundOn?"Desactivar narración automática":"Activar narración");if(soundOn)readScene();else if("speechSynthesis"in window)speechSynthesis.cancel()};
const previous=saved();if(Number.isInteger(previous.scene)&&previous.scene>0)$("continueBtn").hidden=false;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installedEvent=e;$("installBtn").hidden=false});$("installBtn").onclick=async()=>{if(!installedEvent)return;installedEvent.prompt();await installedEvent.userChoice;installedEvent=null;$("installBtn").hidden=true};window.addEventListener("appinstalled",()=>{$("installBtn").hidden=true});
if("serviceWorker"in navigator&&location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}))}
