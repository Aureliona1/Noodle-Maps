Workspace:Import

0:Import
    path:ExpertStandard.dat

0:AssignPlayerToTrack
    track:player

0:AppendNotes
    disablespawneffect:true
    appendtechnique:1

0:AppendNotes
    select:{_type=1}
    track:rnotes

0:AppendNotes
    select:{_type=0}
    track:lnotes

0:AppendNotes
    tobeat:68
    select:{_type=1}
    NJS:13
    NJSOffset:1
    animateposition:[2,2,0,0],[0,0,0,0.3,"easeInOutSine"]
    animatescale:[0,0,0,0],[0,0,0,0.1],[1,1,1,0.3,"easeInOutSine"]
    animatelocalrotation:[Random(-180,180),Random(-180,180),Random(-180,180),0],[0,0,0,0.3,"easeOutSine"]

0:AppendNotes
    tobeat:68
    select:{_type=0}
    NJS:13
    NJSOffset:1
    animateposition:[-2,2,0,0],[0,0,0,0.3,"easeInOutSine"]
    animatescale:[0,0,0,0],[0,0,0,0.1],[1,1,1,0.3,"easeInOutSine"]
    animatelocalrotation:[Random(-180,180),Random(-180,180),Random(-180,180),0],[0,0,0,0.3,"easeOutSine"]

0:ParentTrack
    parenttrack:player
    childtracks:["lnotes","rnotes","notes"]

0:AnimateTrack
    track:rnotes
    animatecolor:[{14/255},{210/255},{110/255},1,0],[0.5,0.85,0.9,1,1]
    duration:68

0:AnimateTrack
    track:lnotes
    animatecolor:[{200/255},{219/255},{209/255},1,0],[0.7,0.2,1,1,1]
    duration:68

68:AnimateTrack
    track:rnotes
    animatecolor:[0.5,0.85,0.85,1,0]

68:AnimateTrack
    track:lnotes
    animatecolor:[0.8,0.2,1,1,0]

132:AnimateTrack
    track:lnotes
    animatecolor:[0.8,0.8,0.8,1,0]

132:AnimateTrack
    track:rnotes
    animatecolor:[0.4,0.7,1,1,0]

166:AppendNotes
    tobeat:192
    animateposition:[0,30,10,0],[0,0,0,0.4,"easeInOutExpo"]
    animaterotation:[-45,0,0,0],[0,0,0,0.4,"easeOutSine"]
    NJSOffset:2

166:AnimateTrack
    track:lnotes
    duration:4
    animatecolor:[0.8,0.8,0.8,1,0],[1,{240/255},{163/255},1,1,"easeInQuint"]

166:AnimateTrack
    track:rnotes
    duration:4
    animatecolor:[0.4,0.7,1,1,0],[1,0.7,0,1,1,"easeInQuint"]

192:AnimateTrack
    track:lnotes
    duration:4
    animatecolor:[1,{240/255},{163/255},1,0],[1,1,1,1,1]

192:AnimateTrack
    track:rnotes
    duration:4
    animatecolor:[1,0.7,0,1,0],[1,1,1,1,1]

196:AnimateTrack
    track:lnotes
    animatecolor:[0,1,0.6,1,0]

196:AnimateTrack
    track:rnotes
    animatecolor:[0,0.6,1,1,0]

196:AppendNotes
    tobeat:228
    NJS:20

228:AnimateTrack
    track:lnotes
    animatecolor:[1,0.5,0.5,1,0]

228:AnimateTrack
    track:rnotes
    animatecolor:[1,0.67,0.35,1,0]

228:AppendNotes
    tobeat:260
    animatelocalrotation:[Random(-45,45),Random(-45,45),0,0],[0,0,0,0.3]
    NJS:18

260:AnimateTrack
    track:lnotes
    duration:32
    animatecolor:[0.4,0.4,0.4,1,0],[1,0.3,0.3,1,1,"easeInCirc"]

260:AnimateTrack
    track:rnotes
    animatecolor:[0.4,0.7,1,1,0]

324:AnimateTrack
    track:lnotes
    animatecolor:[1,0.7,0,1,0]

324:AnimateTrack
    track:rnotes
    animatecolor:[0.8,0.8,0.8,1,0]

326:AppendNotes
    select:{_type=0}
    color:[1,0.7,0,1]
    tobeat:387
    NJS:12
    NJSOffset:3.7
    animateposition:[Random(-20,20),Random(0,20),Random(-10,-20),0],[0,0,0,0.45,"easeInOutSine","splineCatmullRom"]
    animatelocalrotation:[Random(-10,10),Random(-20,20),Random(-45,45),0],[0,0,0,0.45,"easeInOutSine"]
    animaterotation:[0,Random(-10,10),Random(-45,45),0],[0,0,0,0.45,"easeOutSine"]
    animatescale:[0,0,0,0],[1,1,1,0.2]
    disablespawneffect:true
    track:notes
    appendtechnique:1

326:AppendNotes
    select:{_type=1}
    color:[0.8,0.8,0.8,1]
    tobeat:387
    NJS:12
    NJSOffset:3.7
    animateposition:[Random(-20,20),Random(0,20),Random(-10,-20),0],[0,0,0,0.45,"easeInOutSine","splineCatmullRom"]
    animatelocalrotation:[Random(-10,10),Random(-20,20),Random(-45,45),0],[0,0,0,0.45,"easeInOutSine"]
    animaterotation:[0,Random(-10,10),Random(-45,45),0],[0,0,0,0.45,"easeOutSine"]
    animatescale:[0,0,0,0],[1,1,1,0.2]
    disablespawneffect:true
    track:notes
    appendtechnique:1

0:AnimateTrack
    track:notes
    animatedissolve:[0,0]
    animatedissolvearrow:[0,0]

324:AnimateTrack
    track:notes
    animatedissolve:[0.8,0]
    animatedissolvearrow:[0.9,0]

387:AnimateTrack
    track:lnotes
    duration:2
    animatecolor:[1,0.7,0,1,0],[0.4,0.4,0.4,1,1]

387:AnimateTrack
    track:rnotes
    duration:2
    animatecolor:[0.8,0.8,0.8,1,0],[0.25,0.3,0.7,1,1]

420:AnimateTrack
    track:rnotes
    animatecolor:[1,0.8,0.4,1,0]

420:AnimateTrack
    track:lnotes
    animatecolor:[0.5,0.5,0.5,1,0]

452:AnimateTrack
    track:rnotes
    animatecolor:[0.4,0.7,1,1,0]

452:AnimateTrack
    track:lnotes
    animatecolor:[1,0.7,0.4,1,0]

468:AnimateTrack
    track:lnotes
    animatecolor:[0.8,0.8,0.8,1,0]

468:AnimateTrack
    track:rnotes
    animatecolor:[0.4,0.8,1,1,0]

484:AnimateTrack
    track:rnotes
    animatecolor:[0.5,0.5,0.5,1,0]

132:AnimateTrack
    track:player
    duration:64
    animateposition:[0,-230,0,0],[0,-250,100,0.5],[0,-250,200,1]

196:AnimateTrack
    duration:32
    track:player
    animateposition:[0,-250,1000,0],[0,-250,1300,1]

228:AnimateTrack
    track:player
    animateposition:[0,0,1000,0]

260:AnimateTrack
    track:player
    animateposition:[0,0,0,0]

324:AnimateTrack
    track:player
    animateposition:[1.5,-243.5,423,0]
    animatelocalrotation:[0,180,0,0]

388:AnimateTrack
    track:player
    animateposition:[1.5,-243.5,423,0],[1.5,-235,400,{8/31},"easeInSine"],[1.5,-230,200,1,"splineCatmullRom"]
    duration:31

419:AnimateTrack
    track:player
    animateposition:[0,1000,0,0]

420:AnimateTrack
    track:player
    duration:16
    animateposition:[1000,0,1000,0],[1000,0,1200,1]
    animatelocalrotation:[0,0,0,0]

436:AnimateTrack
    track:player
    duration:16
    animateposition:[0,0,-1500,0],[0,0,-1000,1]

452:AnimateTrack
    track:player
    duration:16
    animateposition:[0,-100,-3200,0],[0,-120,-2500,1]

468:AnimateTrack
    track:player
    duration:16
    animateposition:[0,1000,0,0],[0,1000,10,1]

484:AnimateTrack
    duration:32
    track:player
    animateposition:[0,-230,1200,0],[0,-230,1100,1]

####################

Workspace: Text

####################

0:TextToWall
    path:Models/font.dae
    line:HI
    color:[100,100,100,0]
    animatedefiniteposition:[0,0,30,0]
    rotation:[0,180,0]
    size:0.3
    duration:16
    animatedissolve:[0,0],[0,0.1],[1,0.2],[1,0.95],[0,1]

196:TextToWall
    path:Models/font.dae
    line: Oops!
    line: You're not supposed to look here
    color:[100,100,100,0]
    animatedefiniteposition:[0,-250,-900,0],[0,-150,-1000,1,"easeInSine","splineCatmullRom"]
    rotation:[0,180,0]
    size:0.7
    duration:32
    animatedissolve:[0,0],[0,0.1],[1,0.2],[1,0.95],[0,1]

228:TextToWall
    path:Models/font.dae
    line:Definetly not ripping off Nothing Else...
    color:[100,100,100,0]
    animatedefiniteposition:[0,0,-950,0]
    rotation:[0,180,0]
    size:0.4
    letting:0.5
    duration:32
    animatedissolve:[0,0],[0,0.1],[1,0.2],[1,0.95],[0,1]

260:TextToWall
    path:Models/font.dae
    line:Ngl, I had no inspiration for this section
    color:[100,100,100,0]
    animatedefiniteposition:[0,0,20,0]
    rotation:[0,180,0]
    size:0.4
    letting:0.5
    duration:32
    animatedissolve:[0,0],[0,0.1],[1,0.2],[1,0.95],[0,1]

484:TextToWall
    path:Models/font.dae
    line:Pathfinder
    duration:36
    animatedefiniteposition:[0,-270,1420,0],[0,-220,1400,1]
    animatedissolve:[0,0],[1,0.75],[0,1]
    size:2
    letting:0
    rotation:[0,1,0]
    color:[100,100,100,0]

####################

Workspace:Environments

####################

0:ModelToWall
    type:3
    path:Models/spiky.dae
    setdeltaposition:true
    deltaposition:[0,0,-1000]
    track:dropenv

0:ModelToWall
    type:3
    path:Models/Triangle.dae
    setdeltaposition:true
    deltaposition:[-1000,150,1400]
    track:dropenv

0:ModelToWall
    type:3
    path:Models/Trees.dae
    setdeltaposition:true
    deltaposition:[10,-208,100]
    track:stalktrees

0:ModelToWall
    path:Models/diag.dae
    setdeltaposition:true
    deltaposition:[0,-200,1950]
    type:3
    track:stalktrees

0:ModelToWall
    type:3
    path:Models/Cave.dae
    setdeltaposition:true
    deltaposition:[0,-200,400]
    track:stalktrees

0:ModelToWall
    type:3
    path:Models/Mountains.dae
    deltaposition:[0,0,-2500]
    setdeltaposition:true
    track:dropenv

0:Run
    script:dropscript.js
    runbefore:false
    refreshonsave:true

0:Run
    script:treescript.js
    runbefore:false
    refreshonsave:true

484:AnimateTrack
    track:dropenv
    animateposition:[-69420,-69420,-69420,0]

0:AssignFogTrack
    track:fog

0:AnimateTrack
    track:fog
    animateattenuation:[0.005,0]

66:AnimateTrack
    track:fog
    duration:4
    animatestarty:[-45,0.5]
    animateheight:[0,0.5]

132:AnimateTrack
    track:fog
    animatestarty:[-500,1]
    animateattenuation:[0.01,0]

164:AnimateTrack
    track:fog
    duration:6
    animateattenuation:[0.01,0],[0.001,1]

0:Environment
    id:MagicDoorSprite\.\[\d\]BloomL$
    lookupmethod:Regex
    scale:[99999,99999,99999]

0:Environment
    id:MagicDoorSprite\.\[\d\]BloomR$
    lookupmethod:Regex
    scale:[99999,99999,99999]

0:Environment
    id:Environment
    lookupmethod:Contains
    position:[-69420,-69420,-69420]

0:Environment
    id:MagicDoorSprite
    lookupmethod:Regex
    position:[0,100,1000]
    localrotation:[0,90,90]
    track:door

0:lights
    repeat:3
    trk:repeat
    lr:-1
    index:{repeat+1}

0:lights
    repeat:3
    trk:{repeat+3}
    lr:1
    index:{repeat+1}

0:Environment
    id:HighCloudsGenerator
    lookupmethod:Regex
    track:hiclouds

132:AnimateTrack
    track:hiclouds
    animateposition:[0,-100,400,0]

196:AnimateTrack
    track:door
    animateposition:[0,100,2000,0]

260:AnimateTrack
    track:door
    animateposition:[0,100,1000,0]

192:AnimateTrack
    track:fog
    duration:4
    animateattenuation:[0.001,0],[0.005,1]

196:AnimateTrack
    track:fog
    animatestarty:[-400,0]
    animateheight:[1,0]
    animateattenuation:[0.001,0]

228:AnimateTrack
    track:fog
    animatestarty:[-50,0]
    animateattenuation:[0.002,0]

260:AnimateTrack
    track:fog
    animateattenuation:[0.01,0]
    animateheight:[10,0]

290:AnimateTrack
    duration:4
    track:fog
    animateattenuation:[0.01,0],[0.002,1,"easeOutSine"]

196:rpillars
    repeat:16
    zpos:{100*repeat}
    trk:repeat

196:lpillars
    repeat:16
    zpos:{100*repeat}
    trk:repeat

324:AnimateTrack
    track:fog
    animatestarty:[-500,1]
    animateheight:[1,0]
    animateattenuation:[0.005,0]

388:AnimateTrack
    track:fog
    animateattenuation:[0.05,0]

324:AnimateTrack
    track:door
    animateposition:[0,100,-1000,0]
    animatelocalrotation:[0,90,0,0]

420:AnimateTrack
    track:door
    animateposition:[500,100,2000,0]
    animatelocalrotation:[0,90,90,0]

420:AnimateTrack
    track:fog
    animateattenuation:[0.002,0]
    animateheight:[5,0]
    animatestarty:[-100,0]

436:AnimateTrack
    track:fog
    duration:0.1
    repeat:140
    repeataddtime:0.1
    animateattenuation:[Random(0.004,0.005),0],[0.005,1]

450:AnimateTrack
    track:fog
    animateattenuation:[0.0045,0],[0.003,1]
    duration:2

436:AnimateTrack
    track:door
    animateposition:[0,0,0,0]

452:AnimateTrack
    track:fog
    animateattenuation:[0.003,0],[0.0001,1,"easeOutSine"]
    animatestarty:[-500,0]
    duration:1

452:AnimateTrack
    track:door
    animateposition:[0,300,-2050,0]
    animatelocalrotation:[0,0,0,0]
    animatescale:[5,5,5,0]

452:AnimateTrack
    track:hiclouds
    animateposition:[0,500,-2000,0]
    animatescale:[2,2,2,0]

468:AnimateTrack
    track:fog
    animatestarty:[0,0]
    animateattenuation:[0.0005,0]

468:AnimateTrack
    track:door
    animateposition:[0,1000,1000,0]
    animatelocalrotation:[90,0,90,0]
    animatescale:[1,1,1,0]

480:AnimateTrack
    track:fog
    animateattenuation:[0.0005,0],[0.005,1,"easeInSine"]
    duration:4

484:AnimateTrack
    track:door
    animateposition:[0,-200,2000,0]

484:AnimateTrack
    track:fog
    animateattenuation:[0.0001,0]
    animatestarty:[-500,0]
    animateheight:[0,0]

512:AnimateTrack
    duration:13
    track:fog
    animateattenuation:[0.0001,0],[0.01,1,"easeInSine"]

0:morelights
    repeat:12
    index:{repeat+1}
    trk:repeat
    lr:-1

0:morelights
    repeat:12
    index:{repeat+1}
    trk:{repeat+12}
    lr:1

####################

Workspace:Events

####################

388:Event
    repeat:1400
    repeataddtime:0.02
    type:0
    value:5
    color:[1,1,1,Random(0.8,1.5)]

388:Event
    repeat:1400
    repeataddtime:0.02
    type:1
    value:5
    clightid:690
    color:[1,1,1,Random(0.8,1.5)]

420:Event
    repeat:800
    repeataddtime:0.02
    type:0
    value:5
    color:[Random(7.9,8),Random(4.8,5.2),3,{((repeat*repeat)/320000)+Random(2,2.2)}]

####################

Workspace:Functions

####################

function:shardsplash

var:rot
    data:0
    public:true

x:Wall
    repeat:50
    color:[10,10,10,0]
    scale:[0,1,1]
    animatescale:[0,0,0,0],[1,1,1,0.1]
    animatedissolve:[0,0],[1,0.1],[0,1,"easeInSine"]
    rotation:[0,0,rot]
    animaterotation:[0,0,0,0],[0,0,Random({-repeat},repeat),0.75,"easeOutExpo"]
    animatedefiniteposition:[10,-0.5,200,0],[-10,-0.5,{50-repeat},0.75,"easeOutExpo"]
    animatelocalrotation:[0,0,0,0],[Random(-180,180),Random(-180,180),Random(-180,180),0.5,"easeOutExpo"]
    definiteduration:2
    fake:true
    interactable:false

function:sinewall

var:lr
    data:0
    public:true

var:xcoef
    data:0
    public:true

x:Wall
    repeat:50
    repeataddtime:0.1
    definiteduration:{32-(repeat*0.1)}
    definitetime:beats
    animaterotation:[0,0,0,0],[0,{10*lr*(xcoef-1)},0,1]
    animatecolor:HSLtoRGB({repeat/50},10,5,0,0),[10,10,10,0,1]
    animatedefiniteposition:[{lr*50},{30*Sin(repeat/6)},{repeat*8},0],[{(((10*repeat)/(repeat+1))-(repeat/10))*lr*xcoef},{-30*Sin(repeat/4)},{(repeat*5)-25},1,"easeInOutSine"]
    animateposition:[-4,0,0,0]
    scale:[10,10,10]
    animatescale:[1,1,1,0],[1,1,1,0.9],[0,0,0,1,"easeInExpo"]
    fake:true
    interactable:false

function:rpillars

var:zpos
    data:0
    public:true

var:trk
    data:0
    public:true

0:Environment
    id:\[\d\]Environment\.\[\d+\]SmallPillarPair\.\[\d\]\w+L\.\[\d\]Pillar$
    lookupmethod:Regex
    duplicate:1
    scale:[5,20,5]
    position:[0,0,-69420]
    localrotation:[0,45,0]
    track:rdropillar{trk}

x:AnimateTrack
    duration:32
    animateposition:[200,0,{zpos+1100},0]
    track:rdropillar{trk}

x:AnimateTrack
    track:rdropillar{trk}
    duration:1
    repeat:32
    repeataddtime:1
    animatescale:[6,10,6,0],[5,10,5,1]

228:AnimateTrack
    track:rdropillar{trk}
    animateposition:[0,0,-69420,0]

function:lpillars

var:zpos
    data:0
    public:true

var:trk
    data:0
    public:true

0:Environment
    id:\[\d\]Environment\.\[\d+\]SmallPillarPair\.\[\d\]\w+L\.\[\d\]Pillar$
    lookupmethod:Regex
    duplicate:1
    scale:[5,20,5]
    position:[0,0,-69420]
    localrotation:[0,45,0]
    track:ldropillar{trk}

x:AnimateTrack
    duration:32
    animateposition:[-200,0,{zpos+1050},0]
    track:ldropillar{trk}

x:AnimateTrack
    track:ldropillar{trk}
    duration:1
    repeat:32
    repeataddtime:1
    animatescale:[6,10,6,0],[5,10,5,1]

228:AnimateTrack
    track:ldropillar{trk}
    animateposition:[0,0,-69420,0]

function:barscolors

var:xpos
    data:0
    public:true

var:rot
    data:0
    public:true

var:zpos
    data:0
    public:true

x:Wall
    repeat:48
    repeataddtime:0.075
    scale:[0.1,50,0.1]
    color:[1,1,1,50]
    position:[1,0,0]
    animateposition:[0,0,0,0],[0,0,0,0.9],[0,{(zpos-0.5)*20},0,1,"easeOutSine"]
    animatescale:[0,0,0,0],[1,1,1,0.01],[1,1,1,0.95],[0,0,0,1]
    animatedefiniteposition:[xpos,-20,{(4*repeat)+zpos},0],[{xpos*1.5},-25,{(4*repeat)+zpos},0.25,"easeInOutSine"],[xpos,-20,{(4*repeat)+zpos},0.5,"easeInOutSine"],[{xpos*1.5},-25,{(4*repeat)+zpos},0.75,"easeInOutSine"],[xpos,-20,{(5*repeat)+zpos},1,"easeInOutSine"]
    rotation:[0,0,{rot*repeat}]
    animaterotation:[0,0,0,0],[0,0,{(-2*rot*repeat)-45},0.2,"easeOutSine"],[0,0,{-1*rot*repeat},1,"easeOutSine"]
    definitetime:beats
    definiteduration:64
    track:startpluckbeam{repeat}
    fake:true
    interactable:false

function:barscolor

var:col
    data:0
    public:true

x:AnimateTrack
    repeat:48
    repeataddtime:0.05
    duration:0.4
    track:startpluckbeam{repeat}
    animatecolor:HSLtoRGB(col,3,5,10,0)
    animateposition:[0,-2.5,0,0],[0,0,0,1,"easeOutSine"]
    animatescale:[1,1.1,1,0],[1,1,1,1,"easeOutSine"]

function:morelights

var:trk
    data:0
    public:true

var:lr
    data:0
    public:true

var:index
    data:0
    public:true

0:Environment
    id:SmallPillarPair\.\[\d\]PillarL\.\[\d\]LaserL$
    position:[-69420,-69420,-69420]
    lookupmethod:Regex
    duplicate:1
    scale:[1,10,1]
    track:MoreLight{trk}

420:AnimateTrack
    track:MoreLight{trk}
    animatelocalrotation:[{lr*45},45,45,0],[{lr*-45},45,45,0.5]
    duration:16
    animateposition:[{(lr*40)+1000},-100,1000,0],[{(lr*40)+1000},-60,{(index*20)+1000},0.5,"easeOutSine"]

452:AnimateTrack
    track:MoreLight{trk}
    animatelocalrotation:[{lr*-45},Random(30,60),Random(30,60),0],[{lr*Random(-40,-50)},Random(0,90),Random(0,90),1,"easeInOutSine"]
    duration:16
    animateposition:[{lr*200+Random(-10,10)},30,{(index*100)-3000},0]
    animatescale:[Random(2,5),Random(0.1,0.5),Random(2,5),0]

468:AnimateTrack
    track:MoreLight{trk}
    animatelocalrotation:[Random(-180,180),Random(-180,180),Random(-180,180),0],[Random(-180,180),Random(-180,180),Random(-180,180),1,"easeOutSine"]
    animateposition:[Random(-100,100),Random(900,1100),Random(100,-100),0],[Random(-100,100),Random(900,1100),Random(100,-100),1,"easeOutSine"]
    duration:16

484:AnimateTrack
    track:MoreLight{trk}
    animatelocalrotation:[{lr*45},45,45,0]
    animateposition:[{lr*40},-300,{(index*50)+1000},0]

function:lights

var:trk
    data:0
    public:true

var:lr
    data:0
    public:true

var:index
    data:0
    public:true

0:Environment
    id:SmallPillarPair\.\[\d\]PillarL\.\[\d\]LaserL$
    lookupmethod:Regex
    duplicate:1
    scale:[1,10,1]
    lightid:690
    track:Light{trk}

0:AnimateTrack
    track:Light{trk}
    duration:68
    animateposition:[Random(0,{100*lr}),Random(-50,-10),Random(50,100),0],[Random(0,{-100*lr}),Random(-50,-10),Random(50,100),Random(0.15,0.35),"easeInOutSine"],[Random(0,{100*lr}),Random(-50,-10),Random(50,100),Random(0.45,0.65),"easeInOutSine"],[Random(0,{-100*lr}),Random(-50,-10),Random(50,100),Random(0.65,0.85),"easeInOutSine"],[Random(0,{100*lr}),Random(-50,-10),Random(50,100),Random(0.95,1),"easeInOutSine"]
    animatelocalrotation:[Random(-10,10),Random(-10,10),Random(-10,10),0],[Random(-45,45),Random(-45,45),Random(-45,45),1]

132:AnimateTrack
    repeat:32
    repeataddtime:2
    track:Light{trk}
    animateposition:[Random({lr*30},{lr*300}),-250,Random(10,500),Random(0,1)]
    duration:2
    animatelocalrotation:[0,0,0,0]

196:AnimateTrack
    repeat:32
    repeataddtime:1
    track:Light{trk}
    animateposition:[Random(-100,100),Random(-300,-150),1500,Random(0.1,1)]
    duration:2
    animatelocalrotation:[-75,-45,0,0]

228:AnimateTrack
    duration:32
    track:Light{trk}
    animateposition:[Random(-100,100),Random(0,50),1200,0,"easeInOutSine","splineCatmullRom"],[Random(-100,100),Random(0,50),1200,0.25,"easeInOutSine","splineCatmullRom"],[Random(-100,100),Random(0,50),1200,0.5,"easeInOutSine","splineCatmullRom"],[Random(-100,100),Random(0,50),1200,0.75,"easeInOutSine","splineCatmullRom"],[{(trk*10)-25},-10,1200,1,"easeInOutSine","splineCatmullRom"]

260:AnimateTrack
    track:Light{trk}
    animateposition:[{lr*20},{(index*30)-60},200,0]

292:AnimateTrack
    track:Light{trk}
    animateposition:[{lr*20},{(index*30)-60},200,0],[{(trk*10)-25},-10,200,Random(0.8,1),"easeInOutSine"]
    duration:32

324:AnimateTrack
    track:Light{trk}
    duration:64
    animateposition:[{lr*20},-250,{430-(index*20)},0]
    animatelocalrotation:[{lr*(-45)},45,0,0],[{lr*(-10)},45,0,1]

#388:AnimateTrack
    #track:Light{trk}
    #animatelocalrotation:[-70,-44.5,0,0]

388:AnimateTrack
    track:Light{trk}
    animateposition:[-69420,-69420,-69420,0]

####################

Workspace:Main stuff

####################

0:Wall
    repeat:240
    repeataddtime:0.25
    color:[0,4,10,0]
    animatedefiniteposition:[10,0,50,0],[5,0,25,0.5],[10,0,-10,1,"easeInSine","splineCatmullRom"]
    animaterotation:[0,0,{360*(repeat/680)},0],[0,0,repeat,1,"splineCatmullRom"]
    definitetime:beats
    definiteduration:8
    scale:[0.2,0.2,2]
    animatescale:[0,0,0,0],[1,1,1,0.1],[1,1,1,0.9],[0,0,0,1]
    fake:true
    interactable:false

0:Wall
    repeat:240
    repeataddtime:0.25
    color:[0,4,10,0]
    animatedefiniteposition:[10,0,50,0],[5,0,25,0.5],[10,0,-10,1,"easeInSine","splineCatmullRom"]
    animaterotation:[0,0,{180+(-360*(repeat/680))},0],[0,0,{180-repeat},1,"splineCatmullRom"]
    definitetime:beats
    definiteduration:8
    scale:[0.2,0.2,2]
    animatescale:[0,0,0,0],[0.5,0.5,1,0.1],[1,1,1,0.9],[0,0,0,1]
    fake:true
    interactable:false

68:barscolors
    xpos:10
    rot:1

68:barscolors
    xpos:10
    rot:-1
    zpos:2

68:barscolors
    xpos:-10
    rot:-1

68:barscolors
    xpos:-10
    rot:1
    zpos:2

68:barscolor
    repeat:4
    repeataddtime:2
    col:Random(0,10)

74:barscolor
    repeat:3
    repeataddtime:0.75
    col:Random(0,10)

76:barscolor
    repeat:3
    repeataddtime:2
    col:Random(0,10)

84:barscolor
    repeat:3
    repeataddtime:2
    col:Random(0,10)

84:AnimateTrack
    repeat:48
    repeataddtime:0.05
    track:startpluckbeam{47-repeat}
    animaterotation:[0,0,0,0],[0,0,90,1,"easeOutSine"]
    duration:2

90:barscolor
    repeat:3
    repeataddtime:0.75
    col:Random(0,10)

92:barscolor
    repeat:3
    repeataddtime:2
    col:Random(0,10)

98:barscolor
    repeat:3
    repeataddtime:0.75
    col:Random(0,10)

100:AnimateTrack
    repeat:48
    repeataddtime:0.05
    track:startpluckbeam{47-repeat}
    animaterotation:[0,0,90,0],[0,0,0,1,"easeOutSine"]
    duration:2

100:barscolor
    repeat:3
    repeataddtime:2
    col:Random(0,10)

106:barscolor
    repeat:3
    repeataddtime:0.75
    col:Random(0,10)

108:barscolor
    repeat:3
    repeataddtime:2
    col:Random(0,10)

116:barscolor
    repeat:3
    repeataddtime:2
    col:Random(0,10)

122:barscolor
    repeat:3
    repeataddtime:0.75
    col:Random(0,10)

124:barscolor
    repeat:3
    repeataddtime:2
    col:Random(0,10)

# Floor

132:Wall
    animatecolor:[0,0.3,1,10,0],[0.2,0.6,1,5,1]
    scale:[10000,0,1000]
    animatedefiniteposition:[-5000,-250,-200,0],[-5000,-250,-250,1]
    definiteduration:128
    definitetime:beats
    fake:true
    interactable:false

324:Wall
    animatecolor:[0,0.3,1,10,0],[0.2,0.6,1,50,1]
    scale:[10000,0,1000]
    animatedefiniteposition:[-5000,-250,-200,0],[-5000,-250,-150,1]
    definiteduration:128
    definitetime:beats
    fake:true
    interactable:false

452:Wall
    color:[0,1.5,3,10]
    scale:[1000,0,10000]
    animatedefiniteposition:[-500,-150,-3200,0]
    definiteduration:16
    definitetime:beats
    fake:true
    interactable:false

# Fireflies

132:Wall
    repeat:400
    repeataddtime:0.01
    definitetime:beats
    definiteduration:{32-(repeat*0.01)}
    scale:[0.01,0.01,0.01]
    fake:true
    interactable:false
    animatecolor:[10,8,1,Random(1,10),0],[10,8,1,Random(1,10),Random(0.1,0.3)],[10,8,1,Random(1,10),Random(0.3,0.6)],[10,8,1,Random(1,10),Random(0.6,0.9)],[10,8,1,50,1]
    animatedissolve:[0,0],[1,0.05],[1,0.95],[0,1]
    animatescale:[1,1,1,0.9],[0,0,0,1]
    animatedefiniteposition:[Random(-100,100),Random(-220,-250),repeat,0]
    animateposition:[Random(-10,10),Random(-10,5),Random(-10,10),0],[Random(-10,10),Random(-10,5),Random(-10,10),Random(0.4,0.7),"easeInOutSine","splineCatmullRom"],[Random(-10,10),Random(-10,-5),Random(-10,10),1,"easeInOutSine","splineCatmullRom"]
    animatelocalrotation:[Random(-180,180),Random(-180,180),Random(-180,180),0],[Random(-180,180),Random(-180,180),Random(-180,180),{1/3}],[Random(-180,180),Random(-180,180),Random(-180,180),{2/3}],[Random(-180,180),Random(-180,180),Random(-180,180),1]

# Pebbles

164:Wall
    repeataddtime:0.05
    interactable:false
    fake:true
    definitetime:beats
    definiteduration:{32-(repeat*0.05)}
    repeat:200
    animateposition:[1,0,0,0]
    animatedefiniteposition:[Random(-5,6),-250,{repeat+100},0]
    localrotation:[0,Random(-180,180),0]
    animatedissolve:[0,0],[1,0.01]
    animatescale:[0,0,0,0],[1,1,1,0.05,"easeOutBack"]
    scale:[1,0.1,1]
    color:[0.5,0.5,0.5,1]

# Epilepsy

228:Wall
    repeat:320
    repeataddtime:0.1
    definitetime:beats
    definiteduration:8
    scale:[0.1,200,0.1]
    animatedefiniteposition:[0,-10,Random(1000,1200),0]
    animateposition:[Random(-100,100),0,0,0],[Random(-100,100),0,-200,1]
    color:[100,100,100,100]
    animatelocalrotation:[Random(-20,20),Random(-20,20),Random(-20,20),0],[Random(-20,20),Random(-20,20),Random(-20,20),1]
    animaterotation:[0,0,Random(-45,45),0],[0,0,Random(-45,45),1]
    animatedissolve:[0,0],[0.5,0.1]
    track:epilepsy
    fake:true
    interactable:false

258:AnimateTrack
    track:epilepsy
    duration:4
    animatedissolve:[0.5,0],[0,1]
    animatescale:[1,1,1,0],[0,0,0,1,"easeInSine"]

# Sines

292:sinewall
    repeat:3
    lr:-1
    xcoef:{2*repeat+1}

292:sinewall
    repeat:3
    lr:1
    xcoef:{2*repeat+1}

# Bombs thing

260:Note
    repeat:240
    repeataddtime:{2/15}
    fake:true
    interactable:false
    animatescale:[0,0,0,0],[10,10,10,0.2]
    type:3
    animateposition:[0,10,0,0],[0,50,0,1]
    color:HSLtoRGB(0.6,0.1,0,1)
    animaterotation:[0,0,{(repeat/240)*Random(360,720)},0],[0,0,Random(-180,180),1,"easeInSine"]
    animatelocalrotation:[Random(-180,180),Random(-180,180),Random(-180,180),0],[Random(-180,180),Random(-180,180),Random(-180,180),1]
    NJSOffset:10
    NJS:20
    disablespawneffect:true
    disablenotegravity:true
    cutdirection:8
    animatedissolvearrow:[0,0]

261.5:shardsplash
    repeat:16
    repeataddtime:2
    rot:Random(-180,180)

# Floaty Lines!

324:Wall
    track:floatylines
    definitetime:beats
    definiteduration:{Random(63,64.5)-(repeat*0.1)}
    repeat:50
    repeataddtime:0.1
    animatecolor:[10,5,3,1,0],[10,7,5,100,1,"easeInQuint"]
    animatedissolve:[1,0],[0.5,Random(0.2,0.8),"easeInSine"],[1,0.9,"easeOutSine"],[0,1]
    localrotation:[Random(-10,10),Random(-10,10),Random(-45,45)]
    animatelocalrotation:[0,0,0,0],[Random(-45,45),Random(-45,45),Random(-45,45),1]
    scale:[0,Random(2,3),0]
    animatescale:[0,0,0,0],[1,1,1,0.01]
    animatedefiniteposition:[Random(-20,20),Random(-230,-250),Random(390,430),0],[Random(-20,20),Random(-230,-250),Random(390,430),1]
    animateposition:[0,0,0,0],[Random(-5,5),Random(-5,5),Random(-5,5),1]
    fake:true
    interactable:false

# Shooty Lines!

388:Wall
    track:shootylines
    definitetime:beats
    definiteduration:4
    repeat:280
    repeataddtime:0.1
    scale:[0.1,0.1,Random(1,4)]
    animatedefiniteposition:[Random(-20,20),Random(-240,-210),{445-(repeat/2)},0]
    animateposition:[0,0,0,0],[0,0,-200,1,"easeInSine","splineCatmullRom"]
    color:[1,0.8,0.6,1]
    animatelocalrotation:[0,0,Random(-180,180),0],[0,0,Random(-180,180),1]
    fake:true
    interactable:false

# Rain

420:Wall
    repeat:1600
    repeataddtime:0.01
    scale:[0.001,1,0.001]
    color:[1,1,1,0]
    animatedissolve:[0,0],[0.6,0.1]
    animatedefiniteposition:[1000,100,1000,0],[Random(990,1010),-100,990,1,"easeInSine","splineCatmullRom"]
    animateposition:[Random(-100,100),Random(-5,5),Random(10,400),0]
    definiteduration:2
    fake:true
    interactable:false

# Sphere

468:Model
    path:Models/Sphere.dae
    fake:true
    interactable:false
    duration:16
    color:[10,10,10,-100]
    track:bigsphere

468:Model
    path:Models/MSphere.dae
    fake:true
    interactable:false
    duration:16
    color:[10,10,10,100]
    track:megasphere

468:ParentTrack
    parenttrack:msphere
    childtracks:["megasphere"]

468:ParentTrack
    parenttrack:sphere
    childtracks:["bigsphere"]

468:AnimateTrack
    track:sphere
    duration:16
    animateposition:[0,1000,0,0]
    animatelocalrotation:[0,0,0,0],[90,90,0,1,"easeInOutSine"]

468:AnimateTrack
    track:msphere
    duration:16
    animateposition:[0,1000,0,0]
    animatelocalrotation:[0,0,0,0],[-90,-90,0,1,"easeInOutSine"]