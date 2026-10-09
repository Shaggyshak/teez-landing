/* Analysts-page deal timeline: one deal, first screen to close, then year-1 actuals that loop back into the next deal. Left: what comes in at each stage. Middle: the Excel workbook, where the
   affected cells change and ripple to Returns. Right: texts and emails going out to the team. Autoplays when visible; click a stage
   to step manually (the only mode under prefers-reduced-motion). */
(function(){
  var root=document.getElementById('life');if(!root)return;
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var ICON={txt:'<svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16v12H8l-4 4V4z" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>',mail:'<svg viewBox="0 0 24 24" fill="none"><path d="M3 6h18v12H3V6zm0 0 9 6 9-6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',pdf:'<svg viewBox="0 0 24 24" fill="none"><path d="M6 3h8l4 4v14H6V3zm8 0v4h4" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>',xls:'<svg viewBox="0 0 24 24" fill="none"><path d="M6 3h8l4 4v14H6V3zm8 0v4h4" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>',data:'<svg viewBox="0 0 24 24" fill="none"><path d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'};
  /* ---- workbook ---- */
  var SH={
    rent:{name:'Rent Roll',cols:['Unit','Type','Status','Rent'],num:[3],rows:[
      ['u101',['101','1BR','Occupied','1,450']],['u102',['102','1BR','Occupied','1,475']],['u103',['103','2BR','Occupied','1,820']],
      ['u104',['104','2BR','Vacant','—']],['u105',['105','1BR','Occupied','1,460']],['u106',['106','2BR','Occupied','1,790']],
      ['occ',['6 of 84 units','','Occupancy','95.2%'],1]]},
    t12:{name:'T-12',cols:['Line','T-12','Adjusted','Source'],num:[1,2],rows:[
      ['gpr',['Gross rent','1,412,000','1,412,000','Rent roll']],['vac',['Vacancy','(68,000)','(63,540)','Assumptions']],
      ['tax',['Taxes','(132,000)','(132,000)','OM']],['ins',['Insurance','(104,000)','(104,000)','Assumptions']],
      ['rep',['Repairs','(91,000)','(91,000)','T-12']],['oth',['Other opex','(160,713)','(160,713)','T-12']],
      ['noi',['NOI','','860,747',''],1]]},
    assump:{name:'Assumptions',cols:['Input','Value','Source'],num:[1],rows:[
      ['price',['Purchase price','13,900,000','Ask']],['vac',['Vacancy','4.5%','T-12']],['ins',['Insurance','104,000','OM']],
      ['tax',['Tax reset','—','OM']],['capex',['Capex reserve','—','OM']],['rate',['Interest rate','6.4%','Lender indication']],
      ['exit',['Exit cap','5.75%','Sale comps']],['dd',['Diligence ends','—','PSA']]]},
    debt:{name:'Debt',cols:['Item','Value','Source'],num:[1],rows:[
      ['loan',['Loan amount','9,400,000','Lender indication']],['rate',['Rate','6.4%','Assumptions']],
      ['amort',['Amortization','30 yr','Lender indication']],['dscr',['Min DSCR','1.20×','Lender indication']]]},
    ret:{name:'Returns',cols:['Metric','Value','Hurdle'],num:[1],rows:[
      ['noi',['NOI','860,747','']],['dscr',['DSCR','1.22×','1.20×']],['cap',['Cap rate','6.19%','']],
      ['irr',['Levered IRR','15.0%','14.0%']],['eq',['Equity required','$4.9M','']]]},
    cases:{name:'Cases',cols:['Case','Levered IRR','Status'],num:[1],rows:[
      ['c1',['Screen case','15.0%','Saved'],0,1],['c2',['Pricing case','14.2%','Saved'],0,1],['c3',['Bid case v1','15.6%','Approved'],0,1],
      ['c4',['Diligence case','14.3%','Pending review'],0,1],['c5',['Financing case','13.8%','Below hurdle'],0,1],['c6',['Closing case','14.1%','Approved'],0,1],
      ['c7',['Actual, year 1','12.9%','Behind closing case'],0,1]]},
    act:{name:'Actuals',cols:['Line','Underwritten','Actual','Variance'],num:[1,2,3],rows:[
      ['gpr',['Rent collected','1,412,000','—','']],['ins',['Insurance','127,700','—','']],
      ['rep',['Repairs','91,000','—','']],['noi',['NOI','792,747','—',''],1]]}
  };
  var ORDER=['rent','t12','assump','debt','ret','cases','act'];
  /* ---- the story: inn = coming in, steps = workbook edits (sheet, cells), out = going out ---- */
  var S=[
   {n:'Screen',
    inn:[['txt','Director of Acquisitions','Text','Can you run this one? 84 units, asking $13.9M'],['mail','Broker','Email, 3 attachments','Fwd: Maple Court OM, rent roll, T-12']],
    steps:[{fill:1,cases:['c1'],sheet:'ret'}],
    out:[['txt','Director of Acquisitions','','Maple Court is screened: 6.19% cap, DSCR 1.22×, IRR 15.0% at $13.9M. 2 conflicts flagged for review.'],
         ['mail','Analyst','Maple Court: model and sources','Model filled, every input cited. T-12 vacancy is 4.5% vs the OM’s 3%.']]},
   {n:'Underwrite',
    inn:[['data','County records','Public data','Tax bill and recorded sales'],['mail','Lender','Indication','65–68% LTV, 6.4%, 30-year amortization'],['mail','Insurance broker','Indication','$109.5K a year vs $104K in the OM']],
    steps:[{sheet:'assump',cells:[['tax',1,'+9,000','Source: County tax bill 2026, reassessment after sale','County records'],
                                  ['ins',1,'109,500','Source: insurance broker indication','Insurance indication'],
                                  ['exit',1,'5.85%','Source: 6 recorded sales, same vintage','Sale comps']]},
           {sheet:'t12',cells:[['tax',2,'(141,000)','=-Assumptions!B5'],['ins',2,'(109,500)','=-Assumptions!B4'],['noi',2,'846,247','=SUM(C2:C7)']]},
           {sheet:'ret',cells:[['noi',1,'846,247','=T-12!C8'],['dscr',1,'1.20×','=NOI / Debt service'],['cap',1,'6.09%','=NOI / Price'],['irr',1,'14.2%','=IRR(cash flows)']],cases:['c2']}],
    out:[['mail','Analyst','Assumptions updated','Tax reset −$9.0K, insurance −$5.5K. NOI now $846K, every change cited.'],
         ['txt','Director of Acquisitions','','Pricing case: IRR 14.2% at $13.9M. A bid near $13.4M gets you back to 15.6%.']]},
   {n:'Bid / LOI',
    inn:[['txt','Director of Acquisitions','Text','Bid it at $13.4M.'],['pdf','Seller’s broker','PDF','Call for offers: due Oct 21']],
    steps:[{sheet:'assump',cells:[['price',1,'13,400,000','Source: Director of Acquisitions, approved bid','Approved bid']]},
           {sheet:'debt',cells:[['loan',1,'9,100,000','=MIN(lender max, 68% × Price)','68% LTV cap']]},
           {sheet:'ret',cells:[['dscr',1,'1.24×','=NOI / Debt service'],['cap',1,'6.31%','=NOI / Price'],['irr',1,'15.6%','=IRR(cash flows)'],['eq',1,'$4.7M','=Price + costs - Debt!B2']],cases:['c3']}],
    out:[['txt','Director of Acquisitions','','Bid case saved at $13.4M: 6.31% cap, DSCR 1.24×, IRR 15.6%.'],
         ['mail','Counsel','Maple Court: LOI economics','Approved terms and bid case v1 attached.']]},
   {n:'PSA',
    inn:[['pdf','Seller’s counsel','PDF','Maple_Court_PSA_draft.pdf'],['mail','Counsel','Email','Redline: deposit and diligence terms']],
    steps:[{sheet:'assump',cells:[['dd',1,'Nov 20, 5pm ET','Source: Maple_Court_PSA_draft.pdf, §4.2','PSA §4.2']]}],
    out:[['mail','Counsel','PSA vs approved terms','2 differences from the LOI. Review before signing.'],
         ['txt','Analyst','','Deadline calendar built: diligence ends Nov 20, 5pm ET. Owners assigned.']]},
   {n:'Diligence',
    inn:[['xls','Seller','XLSX','Rent roll, refreshed'],['mail','Insurance broker','Bound quote','$127.7K a year'],['pdf','Engineer','PDF','Property condition report: roof, 2 boilers']],
    steps:[{sheet:'rent',cells:[['u102',2,'Vacant','Source: Rent_Roll_Oct-2026.xlsx, row 2'],['u105',2,'Vacant','Source: Rent_Roll_Oct-2026.xlsx, row 5'],['u106',2,'Vacant','Source: Rent_Roll_Oct-2026.xlsx, row 6'],['occ',3,'91.7%','=Occupied units / 84']]},
           {sheet:'assump',cells:[['vac',1,'7.0%','=1 - Rent Roll occupancy, rounded','Rent roll'],['ins',1,'127,700','Source: Insurance_Quote.pdf, p.2','Bound quote p.2'],['capex',1,'310,000','Source: Engineer report, p.14','Engineer p.14']]},
           {sheet:'t12',cells:[['vac',2,'(98,840)','=-GrossRent*Assumptions!B3'],['ins',2,'(127,700)','=-Assumptions!B4'],['noi',2,'792,747','=SUM(C2:C7)']]},
           {sheet:'ret',cells:[['noi',1,'792,747','=T-12!C8'],['dscr',1,'1.16×','=NOI / Debt service'],['cap',1,'5.92%','=NOI / Price'],['irr',1,'14.3%','=IRR(cash flows)'],['eq',1,'$5.0M','=Price + costs + capex - Debt!B2']],cases:['c4']}],
    out:[['txt','Director of Acquisitions','','Diligence moved Maple Court: IRR 15.6% to 14.3%. Rent roll −$35.3K, insurance −$18.2K, capex +$310K.'],
         ['mail','Analyst','Bid-to-current bridge','3 changes to review. Nothing applied to the approved case yet.']]},
   {n:'Financing',
    inn:[['mail','Lender','Term sheet','$8.6M at 6.6%, 1.20× DSCR'],['pdf','Appraiser','PDF','Appraisal: $13.0M']],
    steps:[{sheet:'debt',cells:[['loan',1,'8,600,000','Source: Term sheet p.1, appraisal p.3 (66% of $13.0M)','Term sheet'],['rate',1,'6.6%','Source: Term_Sheet.pdf, p.1','Term sheet']]},
           {sheet:'assump',cells:[['rate',1,'6.6%','=Debt!B3','Term sheet']]},
           {sheet:'ret',cells:[['dscr',1,'1.20×','=NOI / Debt service'],['irr',1,'13.8%','=IRR(cash flows)  ·  below the 14.0% hurdle',0,1],['eq',1,'$5.5M','=Price + costs + capex - Debt!B2']],cases:['c5']}],
    out:[['mail','Capital Markets','Lender terms vs model','Proceeds $8.6M vs $9.1M modeled. Equity need +$0.5M.'],
         ['txt','Director of Acquisitions','','IRR is 13.8%, under your 14% hurdle. Credit and price options attached.']]},
   {n:'Close',
    inn:[['pdf','Seller’s counsel','PDF','Amendment: $250K seller credit'],['pdf','Title company','PDF','Settlement statement']],
    steps:[{sheet:'assump',cells:[['price',1,'13,150,000','Source: Amendment 2, $250,000 seller credit','Amendment 2']]},
           {sheet:'ret',cells:[['cap',1,'6.03%','=NOI / Price'],['irr',1,'14.1%','=IRR(cash flows)  ·  clears the 14.0% hurdle',0,0],['eq',1,'$5.3M','=Price + costs + capex - Debt!B2']]},
           {sheet:'cases',cells:[['c4',2,'Superseded','Source: reviewed by Director of Acquisitions'],['c5',2,'Superseded','Source: seller credit negotiated']],cases:['c6']}],
    out:[['txt','Director of Acquisitions','','Closed with a $250K seller credit: IRR 14.1% vs 15.6% at bid. Settlement ties to sources and uses.'],
         ['mail','Asset Manager','Maple Court handoff','Approved case, budget and open items attached. Actual vs underwritten tracking starts.']]},
   {n:'Own',
    inn:[['xls','Property manager','XLSX','Year 1 operating report'],['mail','Insurance broker','Renewal','$139.0K a year at renewal']],
    steps:[{sheet:'cases',cells:[],cases:['c7']},
           {sheet:'act',cells:[['gpr',2,'1,371,000','Source: PM_Year1_Report.xlsx, collections'],['gpr',3,'−2.9%','=Actual / Underwritten − 1',0,1],
                               ['ins',2,'139,000','Source: Insurance renewal, p.1'],['ins',3,'+8.8%','=Actual / Underwritten − 1',0,1],
                               ['rep',2,'104,500','Source: PM_Year1_Report.xlsx, repairs & maintenance'],['rep',3,'+14.8%','=Actual / Underwritten − 1',0,1],
                               ['noi',2,'726,947','=Rent collected − actual opex'],['noi',3,'−8.3%','=Actual / Underwritten − 1',0,1]]}],
    out:[['txt','Director of Acquisitions','','Maple Court year 1: NOI $727K vs $793K underwritten. Rents −2.9%, insurance +8.8%, repairs +14.8%.'],
         ['mail','Analyst','Next deal starts from Maple Court actuals','Insurance $1,655/unit and repairs $1,244/unit now back your assumptions, cited to year 1.']]}
  ];
  var NOTES=['First pass \u00b7 $13.9M ask','Pricing case \u00b7 assumptions updated','Bid case saved \u00b7 v1','PSA checked against the bid case','3 changes to review \u00b7 bid case untouched','Below the 14% hurdle \u00b7 reapproval needed','Closed \u00b7 $250K credit \u00b7 ties to sources and uses','Year 1 actuals \u00b7 3 variances \u00b7 next deal updated'];
  function note(i){fxName.textContent='Maple Court';fxVal.innerHTML='<span class="src">'+NOTES[i]+'</span>'}
  var rail=root.querySelectorAll('.life-rail li'),inEl=document.getElementById('lifeIn'),feed=document.getElementById('lifeFeed'),
      stageName=document.getElementById('lifeStageName'),replay=document.getElementById('lifeReplay'),
      tablesEl=document.getElementById('wbkTables'),tabsEl=document.getElementById('wbkTabs'),
      fxName=document.getElementById('fxName'),fxVal=document.getElementById('fxVal');
  var cells={},tabBtn={},badge={},changes={},timers=[],idx=0,stopped=false,visible=false,gen=0;
  function mk(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
  /* build the workbook */
  tablesEl.innerHTML='';
  ORDER.forEach(function(k,i){
    var s=SH[k],t=mk('table','sheet'+(i===4?' show':''));t.id='t_'+k;
    t.innerHTML='<tr>'+s.cols.map(function(c){return '<th>'+c+'</th>'}).join('')+'</tr>';
    s.rows.forEach(function(r){
      var tr=mk('tr',(r[2]?'foot ':'')+(r[3]?'hid':''));tr.id='r_'+k+'_'+r[0];
      r[1].forEach(function(v,ci){var td=mk('td',s.num.indexOf(ci)>-1?'n':'',v);tr.appendChild(td);cells[k+'.'+r[0]+'.'+ci]=td});
      t.appendChild(tr)});
    tablesEl.appendChild(t);
    var b=mk('button','tab'+(i===4?' act':''),s.name+'<span class="bd">0</span>');b.type='button';
    b.addEventListener('click',function(){showSheet(k)});
    tabsEl.appendChild(b);tabBtn[k]=b;badge[k]=b.querySelector('.bd');changes[k]=0;
  });
  function flow(cls,on){root.classList.toggle(cls,on)}
  function consume(){var k=inEl.children;for(var q=0;q<k.length;q++)(function(el,d){later(function(){el.classList.add('used')},d)})(k[q],q*140)}
  function later(fn,ms){timers.push(setTimeout(fn,ms))}
  function clearTimers(){timers.forEach(clearTimeout);timers=[];flow('fin',false);flow('fout',false)}
  function showSheet(k){ORDER.forEach(function(s){document.getElementById('t_'+s).className='sheet'+(s===k?' show':'');tabBtn[s].className='tab'+(s===k?' act':'')+(changes[s]?' has':'')})}
  function pulse(k){tabBtn[k].classList.remove('pulse');void tabBtn[k].offsetWidth;tabBtn[k].classList.add('pulse')}
  function rails(i){root.classList.toggle('own',i===S.length-1);for(var r=0;r<rail.length;r++){rail[r].className=r<i?'done':(r===i?'on':'');rail[r].querySelector('.dot').textContent=r<i?'✓':String(r+1)}}
  function baseline(){
    Object.keys(SH).forEach(function(k){SH[k].rows.forEach(function(r){r[1].forEach(function(v,ci){var td=cells[k+'.'+r[0]+'.'+ci];td.textContent=v;td.removeAttribute('data-v');td.className=td.className.replace(/\b(chd|flash|warn|sel)\b/g,'').trim()});
      document.getElementById('r_'+k+'_'+r[0]).classList.toggle('hid',!!r[3])})});
    ORDER.forEach(function(k){changes[k]=0;badge[k].textContent='0'});
    fxName.innerHTML='&nbsp;';fxVal.innerHTML='&nbsp;';
  }
  function colTo(k,col){return cells[k+'.'+col]}
  function applyCell(k,c,animate){
    var td=cells[k+'.'+c[0]+'.'+c[1]],old=td.getAttribute('data-v');if(old===null)old=td.textContent;td.setAttribute('data-v',c[2]);
    td.innerHTML=(animate?'<span class="old">'+old+'</span>':'')+c[2];
    td.classList.add('chd');
    if(c[5]!==undefined)td.classList.toggle('warn',!!c[5]);
    if(c[4]){var last=SH[k].cols.length-1;cells[k+'.'+c[0]+'.'+last].textContent=c[4]}
    if(animate){td.classList.remove('flash');void td.offsetWidth;td.classList.add('flash');
      document.querySelectorAll('td.sel').forEach(function(x){x.classList.remove('sel')});td.classList.add('sel');
      var col=String.fromCharCode(65+c[1]),row=SH[k].rows.map(function(r){return r[0]}).indexOf(c[0])+2;
      fxName.textContent=SH[k].name+'!'+col+row;fxVal.innerHTML=(c[3].charAt(0)==='='?c[3]:'<span class="src">'+c[3]+'</span>');
      changes[k]++;badge[k].textContent=changes[k];tabBtn[k].classList.add('has');
      (function(t){later(function(){var o=t.querySelector('.old');if(o)o.style.opacity='0'},3600)})(td)}
    else{changes[k]++;badge[k].textContent=changes[k];tabBtn[k].classList.add('has')}
  }
  function revealRows(ids,animate,cb){
    var i=0;(function nxt(){if(i>=ids.length){if(cb)cb();return}var r=document.getElementById(ids[i++]);if(r)r.classList.remove('hid');if(animate)later(nxt,60);else nxt()})();
  }
  function fillAll(animate,cb){
    var ids=[];ORDER.forEach(function(k){SH[k].rows.forEach(function(r){if(!r[3])ids.push('r_'+k+'_'+r[0])})});
    document.querySelectorAll('tr.hid').forEach(function(r){});
    revealRows(ids,false,cb);
  }
  function addIn(m,animate){
    var li=mk('li','imsg'+(animate?' in':''),'<span class="sm-ic '+m[0]+'">'+ICON[m[0]]+'</span><span class="sm-b"><i></i><b></b></span>');
    li.querySelector('i').textContent='From '+m[1]+' · '+m[2];li.querySelector('b').textContent=m[3];inEl.appendChild(li);
  }
  function addOut(m,animate){
    var li=mk('li','fmsg '+m[0]+(animate?' in':''),'<span class="sm-ic">'+ICON[m[0]]+'</span><span class="sm-b"><i></i>'+(m[2]?'<b class="subj"></b>':'')+'<b class="body"></b></span>');
    li.querySelector('i').textContent=(m[0]==='txt'?'Text':'Email')+' · To '+m[1];
    if(m[2])li.querySelector('.subj').textContent=m[2];li.querySelector('.body').textContent=m[3];
    feed.insertBefore(li,feed.firstChild);while(feed.children.length>5)feed.removeChild(feed.lastChild);
  }
  /* static view of stage i: everything up to and including it, no delays */
  function showStatic(i){
    clearTimers();gen++;baseline();feed.innerHTML='';
    for(var j=0;j<=i;j++){
      if(j===i)S[j].out.forEach(function(m){addOut(m,false)});
      S[j].steps.forEach(function(st){
        if(st.fill)fillAll(false);
        (st.cells||[]).forEach(function(c){applyCell(st.sheet,c,false)});
        (st.cases||[]).forEach(function(id){var r=document.getElementById('r_cases_'+id);if(r)r.classList.remove('hid')});
      });
    }
    rails(i);stageName.textContent=S[i].n;inEl.innerHTML='';S[i].inn.forEach(function(m){addIn(m,false)});
    var last=S[i].steps[S[i].steps.length-1].sheet;showSheet(last);idx=i;note(i);
  }
  var CELL=320,SWITCH=700,IN_STEP=1300,OUT_GAP=2000,PAD=5500;
  function play(i){
    clearTimers();var g=++gen;
    feed.innerHTML='';
    if(i===0){baseline();showSheet('ret')}
    var s=S[i];idx=i;rails(i);stageName.textContent=s.n;inEl.innerHTML='';note(i);
    var t=200;
    flow('fin',true);
    s.inn.forEach(function(m){later(function(){addIn(m,true)},t);t+=IN_STEP});
    t+=900;later(function(){consume();flow('fin',false)},t);t+=500;
    s.steps.forEach(function(st){
      if(st.fill){later(function(){fillAll(true);fxName.innerHTML='&nbsp;';fxVal.innerHTML='<span class="src">Filled from the broker package, every input cited</span>';
        (st.cases||[]).forEach(function(id){document.getElementById('r_cases_'+id).classList.remove('hid')});pulse('ret')},t);t+=2200;return}
      (function(st,t0){later(function(){showSheet(st.sheet);pulse(st.sheet)},t0)})(st,t);t+=SWITCH;
      st.cells.forEach(function(c){(function(c,tt){later(function(){applyCell(st.sheet,c,true)},tt)})(c,t);t+=CELL});
      if(st.cases)(function(ids,tt){later(function(){ids.forEach(function(id){document.getElementById('r_cases_'+id).classList.remove('hid')});pulse('cases')},tt)})(st.cases,t);
      t+=1600;
    });
    t+=150;later(function(){flow('fout',true);addOut(s.out[0],true)},t);
    t+=OUT_GAP;later(function(){addOut(s.out[1],true)},t);t+=700;later(function(){flow('fout',false)},t);t-=700;
    t+=PAD;
    later(function(){[].forEach.call(feed.children,function(el){el.classList.add('gone')})},t-350);
    later(function(){if(i<S.length-1)play(i+1);else later(function(){play(0)},350)},t);
  }
  rail.forEach(function(li,i){li.querySelector('button').addEventListener('click',function(){stopped=true;replay.hidden=false;showStatic(i)})});
  replay.addEventListener('click',function(){stopped=false;replay.hidden=true;if(visible)play(0)});
  showStatic(0);
  if(reduce){replay.hidden=true;return}
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){
      visible=es[0].isIntersecting;
      if(stopped)return;
      if(visible)play(idx);else clearTimers();
    },{threshold:0.3}).observe(root);
  }else{visible=true;play(0)}
})();
