import { useState } from "react";

// ── 故事節點資料庫 ────────────────────────────────────────────
const story = {
  START: {
    title: "西元 1924 年，同安渡頭",
    scene: `海風很鹹。

接駁的舢舨在海面上搖晃，岸邊全是送行的婦女。你妻子眼眶泛紅，默默不語。你望著大船與碼頭，心底暗自發誓：只要活著，一定要帶大筆「僑匯」回來，在故鄉聚落蓋一棟有著精美花磚的最氣派洋樓。

臨上船前，妻子突然塞給你一枚她當掉嫁妝換來的銀元——這是家裡買糧食的救命錢。水客正在不耐煩地催促……`,
    choices: [
      { label: "A", text: "把銀元塞回妻子手裡。這筆救命錢留在老家更重要。", next: "SHIP_POOR" },
      { label: "B", text: "默默收下銀元。黑水溝凶險未知，多一點盤纏多一分活命機會。", next: "SHIP_MONEY" },
      { label: "C", text: "收下銀元，但偷偷跟水客換成一小包「鴉片膏」，準備去南洋打通關節。", next: "OPIUM" },
    ],
  },

  SHIP_POOR: {
    title: "黑水溝，第七天",
    scene: `你空著手上了船。

船艙底層擠了三百多人，發酵的汗臭、嘔吐物的酸味混在一起。沒有錢，只能睡在最底層。

入夜後，鄰鋪的男人開始發高燒，輾轉說胡話。隔天早上他就死了，屍體被推下海。你發現他的鞋底縫著幾枚銅板——是同鄉的人。`,
    choices: [
      { label: "A", text: "不去碰他的銅板。死者為大，那是他留給家人的。", next: "ARRIVE_WEAK" },
      { label: "B", text: "趁人不注意，把銅板取走。死人用不著，活人卻需要。", next: "COPPER_STEAL" },
    ],
  },

  COPPER_STEAL: {
    title: "黑水溝，第八天",
    scene: `你得到了三枚銅板。但那個死去的男人，和你是同一個鄉的。

隔壁鋪的老頭用眼角瞟了你，什麼都沒說。

你用銅板換了一碗稀粥，勉強撐過了餘下的航程，平安抵達南洋。`,
    choices: [
      { label: "繼續", text: "船靠岸了……", next: "ARRIVE_HEALTHY" },
    ],
  },

  SHIP_MONEY: {
    title: "黑水溝，第三天",
    scene: `你有妻子給的銀元，比多數人富裕一些。一個自稱「老南洋」的男人湊過來，壓低聲音說他知道馬來亞最好的橡膠園，月薪能多三成——但要先繳「介紹費」。

那銀元，你只有一枚。`,
    choices: [
      { label: "A", text: "繳介紹費，跟老南洋走。多三成薪水，值得賭一把。", next: "SCAMMED" },
      { label: "B", text: "婉拒，把銀元用來買一個乾淨的鋪位，先活著到南洋再說。", next: "ARRIVE_HEALTHY" },
    ],
  },

  SCAMMED: {
    title: "黑水溝，第四天深夜",
    scene: `那個「老南洋」消失了，連同你的銀元。

你空著手，睡在甲板下最擁擠的地方。第五天，傳染病在底艙爆發。你也開始發燒，渾身無力，沒有人理會。`,
    choices: [
      { label: "A", text: "什麼都不做，硬撐。一定能熬過去的。", next: "DEAD_DISEASE" },
      { label: "B", text: "鼓起勇氣，向船上的客頭懇求一點藥物。", next: "ARRIVE_SICK" },
    ],
  },

  OPIUM: {
    title: "新加坡港，抵達時",
    scene: `「落地稅」的英殖民地官員正在盤查每一個人。你的鴉片膏藏在行李底層。

前面那個人因為藏著違禁品，當場被帶走了。

輪到你了——`,
    choices: [
      { label: "A", text: "先發制人，悄悄把鴉片膏塞給官員，再拿出一點小費作掩護。", next: "OPIUM_BRIBE" },
      { label: "B", text: "緊張過度，額頭滲出大量的汗。官員死死盯著你看……", next: "OPIUM_CAUGHT" },
    ],
  },

  OPIUM_CAUGHT: {
    title: "【結局：六亡】",
    ending: "death",
    scene: `你被帶走了。

英殖民地監獄潮濕、悶熱，老鼠在夜裡跑過你的腳背。三個月後，你死在那裡——沒有人知道，沒有人收屍。

妻子等了一年又一年，最後把你的名字刻在一塊木牌上，埋在村口的土地公旁邊。`,
    note: "落番者一旦在殖民地被捕，幾乎無從申訴。許多金門男人就此消失在異鄉，家人終身不知其下落。",
    choices: [],
  },

  OPIUM_BRIBE: {
    title: "新加坡，牛車水",
    scene: `賄賂奏效，官員揣著鴉片膏放你過去。

鴉片帶來的人脈讓你認識了秘密社會（義興公司）的腳頭。他說你夠膽識，可以幫他們「帶貨」，每趟給你豐厚酬勞——比任何膠園都多得多。`,
    choices: [
      { label: "A", text: "加入幫會，為他們跑腿。錢多，但危機四伏。", next: "GANG_WORK" },
      { label: "B", text: "婉拒，拿了引薦，去找正當的碼頭工作。", next: "DOCK_WORK" },
    ],
  },

  GANG_WORK: {
    title: "新加坡，三個月後",
    scene: `你賺到了真金白銀，比橡膠園的工人快得多。但幫派的世界從不講仁義。

深夜，有人在你租屋的門縫下塞了一張紙條：

「識相就滾，否則你妻子會收到你的一根手指。」`,
    choices: [
      { label: "A", text: "帶著積蓄連夜逃跑，離開新加坡去馬來亞。", next: "MALAYA_FRESH" },
      { label: "B", text: "向幫主求援，希望他能出面擺平這件事。", next: "DEAD_GANG" },
    ],
  },

  DEAD_GANG: {
    title: "【結局：六亡】",
    ending: "death",
    scene: `幫主沉默了很久，最後說了一句：

「你知道的太多了。」

三天後，他們在柔佛海峽邊找到了你。

那一年，金門的洋樓蓋了又蓋，就是沒有一棟屬於你。`,
    note: "南洋的秘密社會（如義興公司、海山黨）在殖民地時期勢力龐大，許多初來乍到的落番者因此喪命，成為異鄉孤魂。",
    choices: [],
  },

  ARRIVE_WEAK: {
    title: "新加坡港，抵達時",
    scene: `你安然上了岸，但身體虛弱，幾乎沒有盤纏。

港口的「客頭」把你們這批人分配到不同地方。他打量了你一眼，低聲說：

「你這樣的身體，錫礦活不過一個月。膠園還有機會。」`,
    choices: [
      { label: "A", text: "聽客頭的話，去膠園工作。安全第一。", next: "RUBBER_SICK" },
      { label: "B", text: "不服氣，堅持去錫礦，月薪高三倍。", next: "DEAD_MINE" },
    ],
  },

  ARRIVE_SICK: {
    title: "新加坡港，抵達時",
    scene: `你帶著病體上了岸。

船公司的人把你帶到一個黑暗的棚屋裡，說讓你「休息兩天」再分配工作。棚屋裡還有其他生病的人，有人發著高燒，低聲念著他孩子的名字。`,
    choices: [
      { label: "A", text: "在棚屋休息，等身體好一點再出發。", next: "RUBBER_SICK" },
      { label: "B", text: "強撐著爬起來，去碼頭尋找金門同鄉的人。", next: "VILLAGE_NETWORK" },
    ],
  },

  ARRIVE_HEALTHY: {
    title: "新加坡港，抵達時",
    scene: `你健康地踏上了南洋的土地。空氣又濕又熱，跟金門的鹹風完全不同。

港口邊有兩群人在招工：一群是膠園的客頭，另一群是在碼頭搬貨的工人頭。人群邊還站著一個穿著體面的峇峇（Peranakan）老商人，似乎在張望著什麼。`,
    choices: [
      { label: "A", text: "去膠園工作。月薪固定，比較穩定。", next: "RUBBER_HEALTHY" },
      { label: "B", text: "去碼頭搬貨。辛苦但在市區，機會多。", next: "DOCK_WORK" },
      { label: "C", text: "主動上前問那個峇峇老商人，他在找什麼人。", next: "BABA_ENCOUNTER" },
    ],
  },

  DEAD_MINE: {
    title: "【結局：六亡】",
    ending: "death",
    scene: `錫礦的月薪確實高。

第一個月，你寄了一小筆錢回金門，妻子的回信說孩子長高了。

第二個月，礦坑塌了。

沒有人出來立碑，沒有人向殖民地當局申訴。礦主只說了一句「天意」，又招募了下一批人。`,
    note: "馬來亞的錫礦業極度危險，礦坑崩塌、瘧疾肆虐是常態。礦主多為英國或當地華商，工人的死亡幾乎不受任何法律保障。",
    choices: [],
  },

  DEAD_DISEASE: {
    title: "【結局：六亡】",
    ending: "death",
    scene: `你以為自己能撐過去，就像在金門撐過飢荒一樣。

但傳染病不是飢荒。第八天，你燒到說胡話，叫著妻子的名字。第十天，你不再說任何話了。

船艙裡沒有人替你立碑。只有你的名字，歪歪斜斜刻在一根竹棍上，後來也被人扔掉了。`,
    note: "十九、二十世紀初的南洋船班底艙環境惡劣，霍亂、天花等傳染病奪走了無數落番者的生命，許多人甚至沒能踏上南洋的土地。",
    choices: [],
  },

  RUBBER_SICK: {
    title: "馬來亞膠園，第二個月",
    scene: `膠園在內陸，樹木遮天，蚊子多得像雲。每天清晨四點起來割膠，天黑才能休息。

你開始發冷發熱，交替出現——是瘧疾。

膠園裡的老工人說，你要去買「奎寧」，否則一個月就沒命了。但奎寧要錢，你幾乎身無分文。`,
    choices: [
      { label: "A", text: "向同鄉借錢買奎寧。發誓以後一定還，先活命要緊。", next: "DEBT_DANGER" },
      { label: "B", text: "撐著，省下買藥的錢，繼續寄回家。一定能熬過去的。", next: "DEAD_MALARIA" },
    ],
  },

  DEBT_DANGER: {
    title: "馬來亞膠園，第三個月",
    scene: `你借到了錢，買了奎寧，燒慢慢退了。但你欠下一筆債。

同鄉等你好了之後，壓低聲音說：「你欠我的，得幫我做一件事。」

那件事，是替他去另一個村子跟人打一架——幫派地盤之爭。`,
    choices: [
      { label: "A", text: "拒絕。你不是來這裡打架的。就算要還債，也不用這種方式。", next: "DEAD_REPRISAL" },
      { label: "B", text: "答應了。打一架，還清債，然後離開這個膠園。", next: "MALAYA_FRESH" },
    ],
  },

  DEAD_MALARIA: {
    title: "【結局：六亡】",
    ending: "death",
    scene: `第五天，你已經無法站起來割膠。

第八天，燒到說胡話，叫著妻子的名字，叫著還沒蓋好的洋樓。

第十天，你不再說任何話了。

膠園裡沒有人替你立碑。只有你的名字，歪歪斜斜地刻在一根竹棍上，插在泥地裡。`,
    note: "瘧疾是二十世紀初南洋最大的殺手之一。無法負擔奎寧的底層勞工往往在幾週內倒下，死亡對膠園主而言只是一個需要補充的勞動力缺口。",
    choices: [],
  },

  DEAD_REPRISAL: {
    title: "【結局：六亡】",
    ending: "death",
    scene: `你拒絕了他。

兩天後的深夜，有人破門而入。

你沒有留下任何遺言，沒有任何人知道你在哪裡死去。

金門的妻子每年在海邊燒香，對著黑水溝的方向說：「阿水，你在哪裡？」`,
    note: "南洋的幫派勢力覆蓋礦業、橡膠業等所有低薪勞工集中的行業。欠下人情卻無法配合者，往往在無聲無息中消失。",
    choices: [],
  },

  RUBBER_HEALTHY: {
    title: "馬來亞膠園，第六個月",
    scene: `你適應了膠園的生活。身體好，熬了過來，開始有了一點點積蓄。

膠園的管事（本地峇峇）看你勤快，問你願不願意做「記帳仔」——管帳的人，薪水多兩成，但要識字。

你識幾個字。`,
    choices: [
      { label: "A", text: "接受！這是脫離苦力生活的第一步。", next: "MANAGER_TRACK" },
      { label: "B", text: "婉拒，怕做不好被罵，還是繼續割膠比較穩。", next: "SETTLE_MALAYA" },
    ],
  },

  MANAGER_TRACK: {
    title: "馬來亞，第三年",
    scene: `你做了記帳仔，慢慢學，慢慢懂。管事說你是「可造之材」，引薦你認識了他在怡保開商號的峇峇岳父。

商人問你願不願意跟他的女兒相親。她是土生華人（Nyonya），說的是峇峇話和英語，不說金門話，也不說閩南語。

金門的妻子，還在等你。`,
    choices: [
      { label: "A", text: "拒絕相親。你已有妻室，不能做那種事。", next: "RETURN_PLAN" },
      { label: "B", text: "答應相親，娶了Nyonya，在南洋落地生根，繼續寄僑匯回家。", next: "STAY_SETTLED" },
    ],
  },

  DOCK_WORK: {
    title: "新加坡碼頭，第四個月",
    scene: `碼頭的工作辛苦，但你在城市裡，認識了許多同鄉。

一個金門同鄉偷偷告訴你，碼頭工人要秘密組織罷工，要求加薪。他問你要不要加入。

1920年代，罷工是殖民地法律嚴禁的行為，組織者輕則被捕，重則驅逐出境。`,
    choices: [
      { label: "A", text: "加入罷工。工人要有尊嚴，薪水不加哪裡夠活？", next: "STRIKE_RISK" },
      { label: "B", text: "拒絕，默默繼續搬貨。你是來賺錢的，不是來惹麻煩的。", next: "MALAYA_FRESH" },
    ],
  },

  STRIKE_RISK: {
    title: "新加坡碼頭，罷工當天",
    scene: `罷工第一天，氣氛緊繃。殖民地警察全副武裝站在碼頭邊。

帶頭的人被當場逮捕，警察開始清場，舉起警棍大喊：「散！否則全部帶走！」

你站在人群中間，前後都是人。`,
    choices: [
      { label: "A", text: "拔腿就跑，鑽進後巷逃開了。", next: "MALAYA_FRESH" },
      { label: "B", text: "留下來，高喊口號，不退讓。", next: "ARRESTED" },
    ],
  },

  ARRESTED: {
    title: "【結局：六亡】",
    ending: "death",
    scene: `你被帶走了。

殖民地法院以「煽動罪」判你強制遣返，但在關押的那幾個月裡，你感染了監獄裡的傷寒。

遣返的船還沒來，你就走了。`,
    note: "英殖民地當局對華工罷工採取極強硬的鎮壓手段，組織者或被囚禁、或被驅逐。1920年代的新加坡有多次碼頭罷工事件，參與者往往面臨嚴酷後果。",
    choices: [],
  },

  BABA_ENCOUNTER: {
    title: "新加坡港，抵達當天",
    scene: `那個峇峇老商人看著你，說他在找一個「識字、勤快、肯學」的年輕人幫他記帳跑腿，包吃包住，月薪比碼頭搬貨高。

他說家族在這裡三代了，根深蒂固。跟著他，比自己在外面打滾安全得多。`,
    choices: [
      { label: "A", text: "答應跟他走，在他的商號做事。", next: "MANAGER_TRACK" },
      { label: "B", text: "陌生人的好意往往有代價，還是自己去找工作。", next: "ARRIVE_HEALTHY" },
    ],
  },

  MALAYA_FRESH: {
    title: "馬來亞，吉隆坡",
    scene: `你輾轉來到吉隆坡，在一家同鄉開的雜貨店做夥計。老闆是金門人，說話帶著家鄉口音，讓你感到一絲溫暖。

你勤快，老闆逐漸信任你。三年後他年邁，問你願不願意頂下這家店，分期付款。

這是你這輩子最大的機會，也是最大的風險。`,
    choices: [
      { label: "A", text: "頂下來。拼了！就算欠債也要拼。", next: "BUSINESS_RISK" },
      { label: "B", text: "不敢賭，繼續做夥計，穩穩寄錢回金門。", next: "SETTLE_MALAYA" },
    ],
  },

  BUSINESS_RISK: {
    title: "馬來亞，第五年",
    scene: `你頂下了雜貨店，起初生意不錯。

但1929年，世界經濟大恐慌來了。橡膠價格崩盤，工人失業，你的店生意一落千丈。

你欠著購店的債，又要寄錢回金門。一個在怡保做錫礦生意的客人說可以投資你，但要求一半股份。`,
    choices: [
      { label: "A", text: "接受投資，用他的錢渡過難關，日後再贖回股份。", next: "RETURN_PLAN" },
      { label: "B", text: "拒絕，咬牙撐下去，自己想辦法。", next: "BANKRUPT" },
    ],
  },

  BANKRUPT: {
    title: "【結局：六亡】",
    ending: "death",
    scene: `你撐不過去了。

債主來討債，店被查封。你身無分文，流落街頭，後來蝸居在碼頭工棚，做著最底層的苦力。

三年後，你在工棚裡安靜地死去。沒有人知道你的故鄉在哪裡，也沒有人知道金門有個妻子等了你整整二十年。`,
    note: "1929年的全球經濟大恐慌對南洋華商打擊尤烈。許多原本小有成就的華人商號在數年內相繼倒閉，落番者一夕之間傾家蕩產，再也無力回鄉。",
    choices: [],
  },

  VILLAGE_NETWORK: {
    title: "新加坡，金門同鄉會館",
    scene: `你找到了金門同鄉會館。

老鄉們給你一碗粥、一個鋪位，讓你先緩過來。長老說有兩個機會：一是幫怡保的金門老鄉跑帳，薪水不高但管吃住、是同鄉比較可信；另一是附近峇峇商人開的布行缺夥計，薪水比較高但東家是外人。`,
    choices: [
      { label: "A", text: "選擇怡保的同鄉，安全感比薪水重要。", next: "MALAYA_FRESH" },
      { label: "B", text: "選擇布行，薪水高更重要，風險自己扛。", next: "MANAGER_TRACK" },
    ],
  },

  RETURN_PLAN: {
    title: "馬來亞，第八年",
    scene: `你終於存夠了錢。

帳上的數字，足夠回金門蓋一棟氣派的洋樓，再留一筆讓妻子和孩子過活。

但南洋的情勢開始不穩。日本人的勢力往南擴張，打仗的風聲越來越近。若等下去，錢也許更多；若現在走，也許剛好趕上最後的安全船班。`,
    choices: [
      { label: "A", text: "現在就走！命比錢重要，錢夠了就回家。", next: "TRUE_ENDING" },
      { label: "B", text: "再等一年，多存一點，讓洋樓蓋得更氣派。", next: "TRAPPED_WAR" },
    ],
  },

  TRAPPED_WAR: {
    title: "【結局：三在】",
    ending: "stay",
    scene: `1941年12月，日本人打進了新加坡。

船班全部停了，回家的路斷了。

你躲在怡保的鄉親家中，熬過了日占時期。戰後，你終於能夠回家——但那已是二十多年後的事了。

妻子守著你出錢蓋的洋樓，等到頭髮全白，等到了你。你站在洋樓門口，不知道說什麼。她也不說話，只是掉眼淚。`,
    note: "1941年日軍南侵，大量南洋華僑因此與故鄉斷絕聯繫長達數年。許多人就此永遠留在南洋，這是金門僑匯歷史上最沉重的斷點之一。",
    choices: [],
  },

  SETTLE_MALAYA: {
    title: "【結局：三在】",
    ending: "stay",
    scene: `你在南洋紮根了。

每個月，你把省吃儉用存下的錢換成「僑匯」，託水客帶回金門。妻子用這些錢把孩子養大，還蓋起了一棟小小的洋樓——不是最氣派的，但踏踏實實的。

你寫信說：「等存夠了錢，就回來。」

但南洋的根越紮越深，孩子漸漸不認識你，你的鬢角也慢慢白了。最後那封信，你寫道：「此生怕是回不去了，洋樓留給孩子。」`,
    note: "「三在」的落番者，用一生的僑匯撐起了金門最美麗的洋樓群，卻多半老死南洋、葬在異鄉。金門現存的閩南洋樓，正是這些無名者的一生。",
    choices: [],
  },

  STAY_SETTLED: {
    title: "【結局：三在】",
    ending: "stay",
    scene: `你娶了Nyonya，在怡保安了家。

你繼續每年寄一筆僑匯回金門，妻子沒有怨你，只在回信裡說：「人活著就好。」

金門的洋樓蓋好了，是你出錢，你卻沒有親手摸過那些花磚。

你有兩個家，卻哪裡都不完整。`,
    note: "許多落番者在南洋娶了峇峇娘惹，形成獨特的土生華人文化。他們持續寄錢回原鄉，卻再也沒有回去，兩地的牽掛成為一代人永遠的傷。",
    choices: [],
  },

  TRUE_ENDING: {
    title: "【結局：一回頭】",
    ending: "return",
    scene: `你回來了。

船靠岸的那天，海風還是鹹的，和你當年離開時一模一樣。

妻子站在碼頭，頭髮不再烏黑，但眼睛還是你記憶中的樣子。

你把帶回來的錢換成了磚瓦、花磚、燕尾脊——那棟洋樓，一磚一瓦都是你在南洋流的汗。

落成那天，整個聚落的人都來了。你站在門口，對著妻子說：

「我回來了。」

就這五個字。`,
    note: "「一回頭」是金門落番故事中最稀有的結局。那些能衣錦還鄉的人，往往是在最恰當的時機做出最謹慎的選擇，又幸運地躲開了時代的每一道劫難。金門現存的洋樓群，正是這些故事最後留下的形狀。",
    choices: [],
  },
};

// ── 主元件 ────────────────────────────────────────────────────
const C = {
  bg:         "#0d0b08",
  bgCard:     "#131109",
  bgNote:     "#100e08",
  border:     "#211d13",
  borderMid:  "#2e2818",
  text:       "#bfaf97",
  textDim:    "#5e5443",
  textBright: "#ddd0b3",
  accent:     "#7a6535",
  accentLt:   "#9a8048",
  death:      "#7a1a1a",
  deathLt:    "#a02a2a",
  deathBg:    "#180808",
  stay:       "#6b5415",
  stayLt:     "#8b6e1e",
  stayBg:     "#130f05",
  return_:    "#3a6b35",
  returnLt:   "#508a48",
  returnBg:   "#071308",
  btnBg:      "#181410",
  btnHover:   "#221e16",
};

function ProverbDisplay({ ending }) {
  const parts = [
    { text: "十去", dim: false },
    { text: "，", dim: true },
    { text: "六亡", dim: ending !== "death" },
    { text: "，", dim: true },
    { text: "三在", dim: ending !== "stay" },
    { text: "，", dim: true },
    { text: "一回頭", dim: ending !== "return" },
  ];
  const col = ending === "death" ? C.deathLt : ending === "stay" ? C.stayLt : C.returnLt;
  return (
    <div style={{ textAlign: "center", letterSpacing: "4px", fontSize: "17px", marginBottom: "6px" }}>
      {parts.map((p, i) => (
        <span key={i} style={{ color: p.dim ? C.textDim : col, fontWeight: p.dim ? "normal" : "bold" }}>
          {p.text}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [nodeId, setNodeId]         = useState("START");
  const [transitioning, setT]       = useState(false);
  const [hovered, setHovered]       = useState(null);
  const [stepCount, setStepCount]   = useState(0);

  const node = story[nodeId];
  const ec   = node.ending === "death"  ? C.death  :
               node.ending === "stay"   ? C.stay   :
               node.ending === "return" ? C.return_ : C.accent;
  const ecLt = node.ending === "death"  ? C.deathLt  :
               node.ending === "stay"   ? C.stayLt   :
               node.ending === "return" ? C.returnLt  : C.accentLt;
  const ecBg = node.ending === "death"  ? C.deathBg  :
               node.ending === "stay"   ? C.stayBg   :
               node.ending === "return" ? C.returnBg  : C.bgCard;

  const go = (next) => {
    if (transitioning) return;
    setT(true);
    setTimeout(() => {
      setNodeId(next);
      setStepCount(s => s + 1);
      setT(false);
    }, 220);
  };

  const restart = () => {
    if (transitioning) return;
    setT(true);
    setTimeout(() => {
      setNodeId("START");
      setStepCount(0);
      setT(false);
    }, 220);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: C.bg,
      color: C.text,
      fontFamily: "'Georgia', 'Noto Serif TC', 'SimSun', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>

      {/* ─ 頂部標題列 ─ */}
      <header style={{
        width: "100%",
        borderBottom: `1px solid ${C.border}`,
        textAlign: "center",
        padding: "18px 16px 14px",
        backgroundColor: "#090806",
      }}>
        <div style={{ color: C.textDim, fontSize: "10px", letterSpacing: "5px", marginBottom: "8px" }}>
          ─ 金 門 落 番 記 ─
        </div>
        <h1 style={{
          margin: 0, fontWeight: "normal",
          fontSize: "21px", letterSpacing: "7px",
          color: C.textBright,
        }}>
          十去，六亡，三在，一回頭
        </h1>
        <div style={{ color: C.textDim, fontSize: "10px", letterSpacing: "2px", marginTop: "7px" }}>
          一九二○年代金門落番文字生存遊戲
        </div>
      </header>

      {/* ─ 主內容 ─ */}
      <main style={{
        maxWidth: "660px",
        width: "100%",
        padding: "36px 20px 48px",
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? "translateY(4px)" : "translateY(0)",
        transition: "opacity 0.22s ease, transform 0.22s ease",
        backgroundColor: node.ending ? ecBg : "transparent",
        boxSizing: "border-box",
      }}>

        {/* 節點標題 */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            fontSize: "10px", letterSpacing: "5px",
            color: node.ending ? ecLt : C.textDim,
            marginBottom: "10px",
          }}>
            {node.ending ? "═══ 結 局 ═══" : `─ 第 ${stepCount + 1} 幕 ─`}
          </div>
          <h2 style={{
            margin: 0, fontWeight: "normal",
            fontSize: node.ending ? "24px" : "17px",
            letterSpacing: node.ending ? "5px" : "2px",
            color: node.ending ? ecLt : C.textBright,
          }}>
            {node.title}
          </h2>
        </div>

        {/* 情境文字框 */}
        <div style={{
          border: `1px solid ${node.ending ? ec + "44" : C.border}`,
          borderRadius: "1px",
          padding: "26px 28px",
          marginBottom: "22px",
          backgroundColor: node.ending ? "transparent" : C.bgCard,
          lineHeight: "2.1",
          fontSize: "15.5px",
          whiteSpace: "pre-wrap",
          color: C.textBright,
        }}>
          {node.scene}
        </div>

        {/* 結局：俗語顯示 */}
        {node.ending && (
          <div style={{
            border: `1px solid ${ec}55`,
            borderRadius: "1px",
            padding: "18px 20px",
            marginBottom: "18px",
            textAlign: "center",
          }}>
            <ProverbDisplay ending={node.ending} />
            <div style={{ color: ecLt, fontSize: "12px", letterSpacing: "3px", marginTop: "6px" }}>
              {node.ending === "death"  && "你，是那個「六」。"}
              {node.ending === "stay"   && "你，是那個「三」。"}
              {node.ending === "return" && "你，是那個「一」。"}
            </div>
          </div>
        )}

        {/* 結局：歷史背景 */}
        {node.ending && node.note && (
          <div style={{
            border: `1px solid ${ec}33`,
            borderRadius: "1px",
            padding: "18px 22px",
            marginBottom: "22px",
            backgroundColor: "#00000033",
          }}>
            <div style={{
              fontSize: "10px", letterSpacing: "4px",
              color: ec, marginBottom: "10px",
            }}>
              ─ 歷 史 背 景 ─
            </div>
            <div style={{ fontSize: "13.5px", color: C.textDim, lineHeight: "1.9" }}>
              {node.note}
            </div>
          </div>
        )}

        {/* 選項按鈕 */}
        {node.choices && node.choices.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
            <div style={{
              fontSize: "10px", letterSpacing: "4px",
              color: C.textDim, marginBottom: "4px",
            }}>
              ─ 你選擇 ─
            </div>
            {node.choices.map((ch, i) => (
              <button
                key={i}
                onClick={() => go(ch.next)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  textAlign: "left",
                  background: hovered === i ? C.btnHover : C.btnBg,
                  border: `1px solid ${hovered === i ? C.accentLt : C.borderMid}`,
                  borderRadius: "1px",
                  color: hovered === i ? C.textBright : C.text,
                  padding: "15px 18px",
                  fontSize: "15px",
                  lineHeight: "1.7",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.15s ease",
                  borderLeft: hovered === i ? `3px solid ${C.accentLt}` : `3px solid transparent`,
                }}
              >
                <span style={{ color: C.accentLt, marginRight: "10px", fontSize: "12px", letterSpacing: "1px" }}>
                  【{ch.label}】
                </span>
                {ch.text}
              </button>
            ))}
          </div>
        )}

        {/* 結局：重新開始 */}
        {node.ending && (
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <button
              onClick={restart}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = ecLt;
                e.currentTarget.style.color = ecLt;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.color = C.textDim;
              }}
              style={{
                background: "transparent",
                border: `1px solid ${C.border}`,
                borderRadius: "1px",
                color: C.textDim,
                padding: "11px 36px",
                fontSize: "12px",
                letterSpacing: "5px",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s ease",
              }}
            >
              ── 重新開始 ──
            </button>
          </div>
        )}
      </main>

      {/* ─ 底部 ─ */}
      <footer style={{
        width: "100%",
        borderTop: `1px solid ${C.border}`,
        padding: "14px",
        textAlign: "center",
        color: C.textDim,
        fontSize: "10px",
        letterSpacing: "2px",
        marginTop: "auto",
      }}>
        金門落番史・1920s・十去六亡三在一回頭
      </footer>
    </div>
  );
}
