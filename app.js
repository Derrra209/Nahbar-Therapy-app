var T=[
    {n:"Dr. Amara Okafor",i:"AO",role:"Psychologische Psychotherapeutin",tags:["Anxiety","Stress","Low mood"],fmt:["Video","Phone"],lang:["Deutsch","English"],today:["16:30","18:00"],week:["Tomorrow 09:00","Fri 12:30"],bio:"Cognitive behavioural therapy, practical and warm."},
    {n:"Marcus Bell",i:"MB",role:"Psychologischer Psychotherapeut",tags:["Relationships","Stress","Grief"],fmt:["Video","Chat"],lang:["English","Deutsch"],today:["19:15"],week:["Tomorrow 17:00","Sat 10:00"],bio:"Helps couples and individuals talk to each other."},
    {n:"Priya Raman",i:"PR",role:"Ärztliche Psychotherapeutin",tags:["Relationships","Anxiety"],fmt:["Video","Phone"],lang:["English"],today:[],week:["Tomorrow 11:00","Thu 15:00"],bio:"Calm, direct and solution-oriented."},
    {n:"Dr. Elena Torres",i:"ET",role:"Psychologische Psychotherapeutin",tags:["Grief","Low mood","Stress"],fmt:["Video","Chat"],lang:["Deutsch","Español"],today:["15:00","17:45"],week:["Fri 09:30"],bio:"Gentle support through loss and change."},
    {n:"Jonah Weiss",i:"JW",role:"Psychologischer Psychotherapeut",tags:["Anxiety","Stress"],fmt:["Phone","Chat"],lang:["Deutsch"],today:["20:00"],week:["Tomorrow 08:00","Fri 18:30"],bio:"Evening sessions for busy schedules."},
    {n:"Deniz Yılmaz",i:"DY",role:"Psychologische Psychotherapeutin",tags:["Relationships","Low mood"],fmt:["Video"],lang:["Deutsch","Türkçe"],today:["17:30"],week:["Tomorrow 14:00","Sat 11:30"],bio:"Therapy in German or Turkish, at your pace."}
    ];
    var S={topic:"Anything",when:"Today",fmt:"Any",lang:"Any"};
    var O={topics:["Anything","Anxiety","Stress","Low mood","Relationships","Grief"],when:["Today","This week"],fmt:["Any","Video","Phone","Chat"],lang:["Any","Deutsch","English","Türkçe","Español"]};
    var K={topics:"topic",when:"when",fmt:"fmt",lang:"lang"};
    function chips(id){var el=document.getElementById(id);el.innerHTML="";O[id].forEach(function(v){var b=document.createElement("button");b.className="chip";b.type="button";b.textContent=v;b.setAttribute("aria-pressed",S[K[id]]===v);b.onclick=function(){S[K[id]]=v;chips(id);render()};el.appendChild(b)})}
    function render(){
    var r=document.getElementById("results");r.innerHTML="";
    var list=T.filter(function(t){return(S.topic==="Anything"||t.tags.indexOf(S.topic)>-1)&&(S.fmt==="Any"||t.fmt.indexOf(S.fmt)>-1)&&(S.lang==="Any"||t.lang.indexOf(S.lang)>-1)&&(S.when==="Today"?t.today.length:true)});
    if(!list.length){r.innerHTML='<p class="empty">No therapists match yet. Try “This week” or another format.</p>';return}
    list.forEach(function(t){
    var d=document.createElement("div");d.className="t";
    var slots=S.when==="Today"?t.today:t.today.map(function(s){return"Today "+s}).concat(t.week);
    d.innerHTML='<div class="t-top"><div class="av">'+t.i+'</div><div><h3>'+t.n+'</h3><div class="meta">'+t.role+'</div></div></div><p class="meta" style="margin:0">'+t.bio+'</p><div class="tags">'+t.tags.concat(t.fmt,t.lang).map(function(x){return"<span>"+x+"</span>"}).join("")+'</div>'+(t.today.length?'<span class="now">Open today</span>':'')+'<div class="slots"></div>';
    var box=d.querySelector(".slots");
    slots.forEach(function(s){var b=document.createElement("button");b.className="slot";b.type="button";b.textContent=s;b.onclick=function(){openD(t,s)};box.appendChild(b)});
    r.appendChild(d)})}
    var dlg=document.getElementById("dlg");
    function openD(t,s){document.getElementById("ds").innerHTML="<b>"+t.n+"</b><br>"+s+" · "+(S.fmt==="Any"?t.fmt[0]:S.fmt)+" session";dlg.showModal()}
    document.getElementById("no").onclick=function(){dlg.close()};
    document.getElementById("ok").onclick=function(){document.getElementById("dt").textContent="You’re booked";document.getElementById("ok").style.display="none";document.getElementById("no").textContent="Done"};
    dlg.addEventListener("close",function(){document.getElementById("dt").textContent="Confirm your session";document.getElementById("ok").style.display="";document.getElementById("no").textContent="Back"});
    ["topics","when","fmt","lang"].forEach(chips);render();
