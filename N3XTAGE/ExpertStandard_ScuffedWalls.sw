Workspace:Envremoval

0:Environment
    id:BTSEnvironment.\[0]Environment.\[4]TrackMirror
    lookupmethod:Regex
    active:false

0:Environment
    id:BTSEnvironment.\[0]Environment.\[5]Construction
    lookupmethod:Regex
    active:false

0:Environment
    id:BTSEnvironment.\[0]Environment.\[6]PlayersPlace
    lookupmethod:Regex
    active:false

0:Environment
    id:BTSEnvironment.\[0]Environment.\[14]PillarTrackLaneRingsR \(1\)
    lookupmethod:Regex
    active:false

0:Environment
    id:BTSEnvironment.\[0]Environment.\[13]PillarTrackLaneRingsR
    lookupmethod:Regex
    active:false

Workspace:Environments

#Cube Room

248:cuberoom
    repeat:20
    offset:{repeat*7}
    PosY:-100
    trck:{repeat+10}

248:cuberoom
    repeat:20
    offset:{repeat*7}
    PosY:-140
    trck:{repeat+40}

#Cubes

0:envo
    repeat:200
    xpos:Random(-100,-10)
    ypos:Random(97,100)
    zpos:{repeat-290}
    trk:repeat

0:envo
    repeat:200
    xpos:Random(10,100)
    ypos:Random(97,100)
    zpos:{repeat-290}
    trk:{repeat+500}

0:Environment
    id:Environment.\[17]SmallPillarPair.\[0]PillarL.\[0]Pillar
    lookupmethod:Regex
    duplicate:1
    position:[0,100,-300]
    active:true

0:Environment
    id:Environment.\[17]SmallPillarPair.\[0]PillarL.\[0]Pillar
    lookupmethod:Regex
    duplicate:1
    position:[0,0,0]
    active:true

36:AnimateTrack
    track:fog
    animatestarty:[350,0]
    animateheight:[-20,0]

98:AnimateTrack
    track:fog
    animatestarty:[0,0]
    animateheight:[0,0]

228:AnimateTrack
    track:fog
    animatestarty:[-50,0]
    animateheight:[10,0]

36:AnimateTrack
    track:doorlight
    animateposition:[0,110,100,0]

232:AnimateTrack
    track:doorlight
    animateposition:[0,50,100,0]

248:AnimateTrack
    track:doorlight
    animateposition:[0,50,100,0],[0,100,500,1,"easeOutExpo"]

36:AnimateTrack
    track:lrlasers
    animateposition:[0,100,-100,0]

36:AnimateTrack
    track:llasers
    animatelocalrotation:[0,0,45,0]

36:AnimateTrack
    track:rlasers
    animatelocalrotation:[0,0,-45,0]

536:AnimateTrack
    track:doorlight
    animateposition:[0,110,100,0]

#Init Tracks

0:Environment
    id:Environment.\[6]PlayersPlace.\[1]Feet
    lookupmethod:Regex
    duplicate:1
    position:[0,100,-300]

0:AssignFogTrack
    track:fog

0:ParentTrack
    parenttrack:lrlasers
    childtracks:["llasers","rlasers"]

0:Environment
    id:Environment.\[38]LaserL
    lookupmethod:Regex
    track:llasers

0:Environment
    id:Environment.\[39]LaserR
    lookupmethod:Regex
    track:rlasers

0:Environment
    id:BTSEnvironment.\[0]Environment.\[8]MagicDoorSprite
    lookupmethod:Regex
    track:doorlight

###################################

Workspace:Lights

###################################

0:Event
    type:0
    repeat:400
    repeataddtime:0.01
    value:5
    color:[{repeat/400},{repeat/400},{repeat/400},{repeat/200}]

4:Event
    type:0
    value:5
    color:[0,0,0,0]

33:Event
    type:0
    value:5
    cgradientduration:3
    cgradientstartcolor:[0,0,0,0]
    cgradientendcolor:[1,1,1,2]
    cgradienteasing:easeInQuad

36:Event
    type:0
    value:5
    color:[0.1,0.1,0.1,100]

37:lrpulse
    repeat:29
    repeataddtime:2
    color:Random(0,1)

96:Event
    type:0
    value:5
    repeat:2
    repeataddtime:2
    cgradientduration:2
    cgradientstartcolor:[1,1,1,2]
    cgradientendcolor:[0,0,0,0]

100:Event
    type:0
    value:5
    cgradientduration:0.5
    cgradientstartcolor:[1,1,1,2]
    cgradientendcolor:[0,0,0,0]

100.6:Event
    type:0
    value:5
    cgradientduration:0.5
    cgradientstartcolor:[2,0,1,2]
    cgradientendcolor:[0,0,0,0]

101.3:Event
    type:0
    value:5
    cgradientduration:0.5
    cgradientstartcolor:[2,0,0,2]
    cgradientendcolor:[0,0,0,0]

102:Event
    type:0
    value:5
    cgradientduration:2
    cgradientstartcolor:[2,2,2,10]
    cgradientendcolor:[0,0,0,0]

104:Event
    type:0
    value:5
    color:[1,0,0.7,2]

132:Event
    repeat:4
    repeataddtime:1
    type:0
    value:5
    cgradientduration:1
    cgradientstartcolor:[10,{repeat*3.33},{repeat*3.33},1]
    cgradientendcolor:[0,0,0,0]

136:Event
    type:0
    value:5
    color:[5,0,2,1.5]

168:Event
    type:0
    value:5
    color:[10,0,5,2]

196:Event
    type:0
    value:5
    color:[5,0,2,1.5]

200:Event
    type:0
    value:5
    color:[10,0,5,2]

228:Event
    type:0
    value:5
    cgradientduration:3.5
    cgradientstartcolor:[10,0,5,2]
    cgradientendcolor:[0,0,0,0]

231.8:Event
    type:0
    value:5
    cgradientduration:2
    cgradientstartcolor:[1,1,1,1]
    cgradientendcolor:[0,0,0,0]

234:Event
    type:0
    value:5
    cgradientduration:12
    cgradientendcolor:[1,1,1,2]
    cgradientstartcolor:[0,0,0,0]

246:Event
    type:0
    value:5
    color:[0,0,0,0]

247:Event
    type:0
    value:5
    cgradientduration:1
    cgradientstartcolor:[10,0,0,10]
    cgradientendcolor:[0,0,0,0]

248:Event
    type:0
    value:5
    color:[1,5,6,10]

312:Event
    type:0
    value:5
    cgradientduration:60
    cgradientstartcolor:[0.5,0,0.3,5]
    cgradientendcolor:[5,0,2,10]

440:Event
    type:0
    value:5
    cgradientduration:32
    cgradienteasing:easeInCubic
    cgradientstartcolor:[1,0.45,0,2]
    cgradientendcolor:[1,1,1,5]

472:Event
    type:0
    value:5
    color:[1,0,0.5,20]

536:Event
    type:0
    value:5
    color:[1,0,0.5,5]

596:Event
    type:0
    value:5
    cgradientduration:4
    cgradientstartcolor:[1,0,0.5,5]
    cgradientendcolor:[10,10,10,10]

600:Event
    type:0
    value:5
    color:[0,0,0,0]

#####################################

Workspace:FunctionCallers

#####################################

function:triplethingcaller

var:reps
    data:0
    public:true

x:triplething
    repeat:reps
    repeataddtime:2

function:cuberoom

var:PosY
    data:0
    public:true

var:offset
    data:0
    public:true

var:trck
    data:0
    public:true

x:cubewall
    repeat:30
    xpos:{(repeat*7)-105}
    ypos:PosY
    zpos:offset
    trk:repeat.trck

#####################################

Workspace:Functions

#####################################

function:envo

var:xpos
    data:0
    public:true

var:ypos
    data:0
    public:true

var:zpos
    data:0
    public:true

var:trk
    data:0
    public:true

x:Environment
    id:Environment.\[17]SmallPillarPair.\[0]PillarL.\[0]Pillar
    lookupmethod:Regex
    duplicate:1
    position:[xpos,ypos,zpos]
    localrotation:[Random(-30,30),Random(-30,30),Random(-30,30)]
    active:true
    track:stone{trk}

232:AnimateTrack
    track:stone{trk}
    animateposition:[0,-1000,-1000,0]

232:AnimateTrack
    track:stone{trk}
    animateposition:[0,-1000,-1000,0]

168:AnimateTrack
    track:stone{trk}
    duration:2
    animatescale:[1.1,1.1,1.1,0],[1,1,1,0.5],[1.1,1.1,1.1,0.5001],[1,1,1,1]
    repeat:30
    repeataddtime:2

472:AnimateTrack
    track:stone{trk}
    duration:64
    animateposition:[xpos,{ypos-60},{(zpos+290)*3},0],[xpos,{ypos-55},{((zpos+290)*3)-600},1]

536:AnimateTrack
    track:stone{trk}
    animateposition:[xpos,{ypos+Random(5,10)},zpos,0],[xpos,{ypos+20},{zpos+Random(-10,10)},1]
    duration:64

536:AnimateTrack
    track:stone{trk}
    duration:2
    animatescale:[1.2,1.2,1.2,0],[1,1,1,0.5],[1.2,1.2,1.2,0.5001],[1,1,1,1]
    repeat:30
    repeataddtime:2

function:progt

var:zoff
    data:0
    public:true

var:dura
    data:0
    public:true

var:rep
    data:0
    public:true

x:Wall
    fake:true
    color:HSLtoRGB(Random(0,1),1,10,0)
    scale:[8,8,8]
    definitetime:beats
    definiteduration:{dura-rep}
    animatelocalrotation:[Random(-180,180),Random(-180,180),Random(-180,180),0],[Random(-10,10),Random(-10,10),Random(-10,10),1]
    interactable:false
    animatedefiniteposition:[-1,0,0,0]
    animateposition:[Random(-16,-85),Random(105,150),{zoff-270},0]
    animatedissolve:[0,0],[1,0.05],[1,0.95],[0,1]
    track:progtl{rep}

x:Wall
    fake:true
    color:HSLtoRGB(Random(0,1),1,10,0)
    scale:[8,8,8]
    definitetime:beats
    definiteduration:{dura-rep}
    animatelocalrotation:[Random(-180,180),Random(-180,180),Random(-180,180),0],[Random(-10,10),Random(-10,10),Random(-10,10),1]
    interactable:false
    animatedefiniteposition:[-1,0,0,0]
    animateposition:[Random(15,80),Random(105,150),{zoff-270},0]
    animatedissolve:[0,0],[1,0.05],[1,0.95],[0,1]
    track:progtr{rep}

x:AnimateTrack
    track:progtl{rep}
    repeat:{dura-rep}
    repeataddtime:1
    animatecolor:HSLtoRGB(Random(0,1),Random(0.5,2),Random(5,10),0,0)
    animatescale:[Random(1.1,1.5),Random(1.1,1.5),Random(1.1,1.5),0],[1,1,1,1]
    animatelocalrotation:[Random(-180,180),Random(-180,180),Random(-180,180),0]

x:AnimateTrack
    track:progtr{rep}
    repeat:{dura-rep}
    repeataddtime:1
    animatecolor:HSLtoRGB(Random(0,1),Random(0.5,2),Random(5,10),0,0)
    animatescale:[Random(1.1,1.5),Random(1.1,1.5),Random(1.1,1.5),0],[1,1,1,1]
    animatelocalrotation:[Random(-180,180),Random(-180,180),Random(-180,180),0]

function:cubewall

var:trk
    data:0
    public:true

var:xpos
    data:0
    public:true

var:ypos
    data:0
    public:true

var:zpos
    data:0
    public:true

x:Environment
    id:Environment.\[17]SmallPillarPair.\[0]PillarL.\[0]Pillar
    lookupmethod:Regex
    track:cube{trk}
    duplicate:1
    position:[xpos,ypos,zpos]

x:AnimateTrack
    track:cube{trk}
    animateposition:[xpos,{ypos+200},zpos,0],[xpos,{200+ypos+Random(-5,2)},zpos,Random(0.1,0.4),"easeOutSine"],[xpos,{ypos+200},zpos,0.5,"easeInSine"],[xpos,{200+ypos+Random(-5,2)},zpos,Random(0.6,0.9),"easeOutSine"],[xpos,{ypos+200},zpos,1,"easeInSine"]
    duration:8
    repeat:8
    repeataddtime:8

312:AnimateTrack
    track:cube{trk}
    animateposition:[xpos,{ypos+200},zpos,0],[{xpos+Random(-10,10)},{200+ypos+Random(-10,4)},zpos,0.01,"easeOutExpo"],[{xpos+Random(-10,10)},{200+ypos+Random(-10,6)},{zpos+Random(1,15)},0.9375],[xpos,{ypos+190},Random(-500,-1000),1,"easeInCubic"]
    animatelocalrotation:[0,0,0,0],[Random(-180,180),Random(-180,180),Random(-180,180),0.01,"easeOutExpo"],[Random(-180,180),Random(-180,180),Random(-180,180),0.9375],[0,0,180,1,"easeInCubic"]
    duration:64

376:AnimateTrack
    track:cube{trk}
    animateposition:[0,-1000,-1000,0]

function:progressive

var:zoff
    data:0
    public:true

var:dura
    data:0
    public:true

var:rep
    data:0
    public:true

x:Wall
    fake:true
    color:HSLtoRGB(Random(0,1),1,10,0)
    scale:[4,80,4]
    definitetime:beats
    definiteduration:{dura-rep}
    localrotation:[0,0,Random(0,-30)]
    interactable:false
    animatedefiniteposition:[-1,0,0,0]
    animateposition:[Random(-16,-85),90,{zoff-270+Random(-1,1)},0]
    animatedissolve:[0,0],[1,0.05],[1,0.95],[0,1]
    track:prog{rep}

x:Wall
    fake:true
    color:HSLtoRGB(Random(0,1),1,10,0)
    scale:[4,80,4]
    definitetime:beats
    definiteduration:{dura-rep}
    localrotation:[0,0,Random(0,30)]
    interactable:false
    animatedefiniteposition:[-1,0,0,0]
    animateposition:[Random(15,80),90,{zoff-270+Random(-1,1)},0]
    animatedissolve:[0,0],[1,0.05],[1,0.95],[0,1]
    track:prog{rep}

x:AnimateTrack
    track:prog{rep}
    repeat:{dura-rep}
    repeataddtime:1
    animatecolor:HSLtoRGB(Random(0,1),Random(0.5,2),Random(5,10),0,0)

228:AnimateTrack
    track:prog{rep}
    duration:4
    animatecolor:HSLtoRGB(Random(0,1),Random(0.5,2),Random(5,10),0,0),[0,0,0,0,1]

function:raisingcolors

x:Wall
    fake:true
    repeat:140
    duration:{28-repeat*0.2}
    repeataddtime:0.2
    scale:[0,20,1]
    interactable:false
    animatecolor:HSLtoRGB(Random(0,1),1,3,0,0),HSLtoRGB(Random(0,1),10,10,0,1)
    animatelocalrotation:[0,Random(-180,180),0,0],[0,Random(-180,180),0,1]
    animatedefiniteposition:[Random(-20,20),80,Random(-270,-250),0]
    animateposition:[0,0,0,0],[0,Random(60,100),0,1,"easeInCubic"]
    animatedissolve:[0,0],[1,0.1]
    track:coloraise

x:Wall
    fake:true
    repeat:140
    duration:{28-repeat*0.2}
    repeataddtime:0.2
    scale:[0,20,1]
    interactable:false
    color:HSLtoRGB(Random(0,1),1,3,0)
    animatelocalrotation:[0,Random(-180,180),0,0],[0,Random(-180,180),0,1]
    animatedefiniteposition:[Random(-20,-40),80,Random(-295,-270),0]
    animateposition:[0,0,0,0],[0,Random(60,100),0,1,"easeInCubic"]
    animatedissolve:[0,0],[1,0.1]
    track:coloraise

x:Wall
    fake:true
    repeat:140
    duration:{28-repeat*0.2}
    repeataddtime:0.2
    scale:[0,20,1]
    interactable:false
    color:HSLtoRGB(Random(0,1),1,3,0)
    animatelocalrotation:[0,Random(-180,180),0,0],[0,Random(-180,180),0,1]
    animatedefiniteposition:[Random(20,40),80,Random(-295,-270),0]
    animateposition:[0,0,0,0],[0,Random(60,100),0,1,"easeInCubic"]
    animatedissolve:[0,0],[1,0.1]
    track:coloraise


x:Wall
    fake:true
    repeat:140
    duration:{28-repeat*0.2}
    repeataddtime:0.2
    scale:[0,20,1]
    interactable:false
    animatecolor:HSLtoRGB(Random(0,1),1,3,0,0),HSLtoRGB(Random(0,1),10,10,0,1)
    animatelocalrotation:[0,Random(-180,180),0,0],[0,Random(-180,180),0,1]
    animatedefiniteposition:[Random(-20,20),140,Random(-270,-250),0]
    animateposition:[0,0,0,0],[0,Random(-60,-100),0,1,"easeInCubic"]
    animatedissolve:[0,0],[1,0.1]
    track:coloraise

x:Wall
    fake:true
    repeat:140
    duration:{28-repeat*0.2}
    repeataddtime:0.2
    scale:[0,20,1]
    interactable:false
    color:HSLtoRGB(Random(0,1),1,3,0)
    animatelocalrotation:[0,Random(-180,180),0,0],[0,Random(-180,180),0,1]
    animatedefiniteposition:[Random(-20,-40),140,Random(-295,-270),0]
    animateposition:[0,0,0,0],[0,Random(-60,-100),0,1,"easeInCubic"]
    animatedissolve:[0,0],[1,0.1]
    track:coloraise

x:Wall
    fake:true
    repeat:140
    duration:{28-repeat*0.2}
    repeataddtime:0.2
    scale:[0,20,1]
    interactable:false
    color:HSLtoRGB(Random(0,1),1,3,0)
    animatelocalrotation:[0,Random(-180,180),0,0],[0,Random(-180,180),0,1]
    animatedefiniteposition:[Random(20,40),140,Random(-295,-270),0]
    animateposition:[0,0,0,0],[0,Random(-60,-100),0,1,"easeInCubic"]
    animatedissolve:[0,0],[1,0.1]
    track:coloraise

function:box

x:wall
    color:[5,5,5,1]
    scale:[1,20,50]
    position:[-1,-10,0]
    animateposition:[-2.5,107,-290,0]
    NJS:100
    NJSOffset:-2
    interactable:false

x:wall
    color:[5,5,5,1]
    scale:[1,20,50]
    position:[5,-10,0]
    animateposition:[-2,107,-290,0]
    NJS:100
    NJSOffset:-2
    interactable:false


function:triplething

x:Wall
    fake:true
    repeat:3
    repeataddtime:0.25
    scale:[2,2,10]
    NJS:50
    NJSOffset:-1
    color:[10,10,0,0]
    position:[Random(-6,10),-5,0]
    animateposition:[-2.5,106.5,-290,0]
    interactable:false

x:Wall
    fake:true
    repeat:3
    repeataddtime:0.25
    scale:[2,2,10]
    NJS:50
    NJSOffset:-1
    color:[10,10,0,0]
    position:[10,Random(-5,10),0]
    animateposition:[-2.5,106.5,-290,0]
    interactable:false

x:Wall
    fake:true
    repeat:3
    repeataddtime:0.25
    scale:[2,2,10]
    NJS:50
    NJSOffset:-1
    color:[10,10,0,0]
    position:[Random(-6,10),10,0]
    animateposition:[-2.5,106.5,-290,0]
    interactable:false

x:Wall
    fake:true
    repeat:3
    repeataddtime:0.25
    scale:[2,2,10]
    NJS:50
    NJSOffset:-1
    color:[10,10,0,0]
    position:[-6,Random(-5,10),0]
    animateposition:[-2.5,106.5,-290,0]
    interactable:false


x:Wall
    fake:true
    repeat:3
    repeataddtime:0.25
    scale:[2,2,10]
    NJS:50
    NJSOffset:-1
    color:[10,0,5,0]
    position:[Random(-6,10),0,0]
    animateposition:[-2.5,106.5,-290,0]
    interactable:false

x:Wall
    fake:true
    repeat:3
    repeataddtime:0.25
    scale:[2,2,10]
    NJS:50
    NJSOffset:-1
    color:[10,0,5,0]
    position:[10,Random(-5,10),0]
    animateposition:[-2.5,106.5,-290,0]
    interactable:false

x:Wall
    fake:true
    repeat:3
    repeataddtime:0.25
    scale:[2,2,10]
    NJS:50
    NJSOffset:-1
    color:[10,0,5,0]
    position:[Random(-6,10),10,0]
    animateposition:[-2.5,106.5,-290,0]
    interactable:false

x:Wall
    fake:true
    repeat:3
    repeataddtime:0.25
    scale:[2,2,10]
    NJS:50
    NJSOffset:-1
    color:[10,0,5,0]
    position:[-6,Random(-5,10),0]
    animateposition:[-2.5,106.5,-290,0]
    interactable:false


function:startspines

var:rotation
    data:0
    public:true

var:xpos
    data:0
    public:true

var:dur
    data:0
    public:true

var:inst
    data:0
    public:true

x:Wall
    fake:true
    definiteduration:dur
    definitetime:beats
    animatedefiniteposition:[xpos,Random(-5,5),Random(0,100),0]
    animateposition:[0,0,0,0],[0,{Random(10,5)*2},0,0.7]
    rotation:[0,0,rotation]
    animaterotation:[0,0,0,0],[0,0,{rotation*(-2)},1]
    color:[0.1,0.1,0.1,100]
    animatedissolve:[0,0],[1,0.1],[1,0.9],[0,1]
    scale:[0.01,0.5,0.01]
    animatescale:[1,1,1,0],[5,10,5,0.1]
    track:greyspikes

function:lrpulse

var:color
    data:0
    public:true

x:Event
    type:2
    value:5
    cgradientduration:2
    cgradientstartcolor:HSLtoRGB(color,1,0.5,2)
    cgradientendcolor:[0,0,0,0]

x:Event
    type:3
    value:5
    cgradientduration:2
    cgradientstartcolor:HSLtoRGB(color,1,0.5,2)
    cgradientendcolor:[0,0,0,0]

######################################

Workspace:MapOverrides

######################################

######################################
#Change this!
######################################
0:Import
    path:NormalStandard.dat
######################################
######################################
0:AppendNotes
    track:notes
    NJS:20
    NJSOffset:-0.5

0:ParentTrack
    parenttrack:player
    childtracks:["notes"]

0:AssignPlayerToTrack
    track:player

36:AnimateTrack
    track:player
    animateposition:[0,100,-300,0]

96:AnimateTrack
    track:player
    duration:0.1
    animateposition:[0,100,-300,0],[0,102,-300,1]

98:AnimateTrack
    track:player
    duration:0.1
    animateposition:[0,102,-300,0],[0,100,-300,1]

100:AnimateTrack
    track:player
    duration:0.1
    animateposition:[0,100,-300,0],[0,102,-300,1]

100.6:AnimateTrack
    track:player
    duration:0.1
    animateposition:[0,102,-300,0],[0,104,-300,1]

101.3:AnimateTrack
    track:player
    duration:0.1
    animateposition:[0,104,-300,0],[0,106,-300,1]

102:AnimateTrack
    track:player
    duration:1
    animateposition:[0,106,-300,0],[0,108,-290,1,"easeOutQuad","splineCatmullRom"]

168:AnimateTrack
    track:player
    animateposition:[0,108,-290,0],[0,108,-200,1]
    duration:28

196:AnimateTrack
    track:player
    animateposition:[0,108,-200,0],[0,108,-290,1]
    duration:4

200:AnimateTrack
    track:player
    animateposition:[0,108,-290,0],[0,108,-200,1]
    duration:28

231.7:AnimateTrack
    track:player
    animateposition:[0,0,0,0]

247:AnimateTrack
    track:player
    animateposition:[0,0,0,0],[0,0,50,1,"easeOutSine"]
    duration:1

248:AnimateTrack
    track:player
    animateposition:[0,70,0,0]

376:AnimateTrack
    track:player
    animateposition:[0,70,0,0],[0,40,0,1]
    duration:32

440:AnimateTrack
    track:player
    animateposition:[0,0,0,0]

472:AnimateTrack
    track:player
    animateposition:[0,40,0,0]

536:AnimateTrack
    track:player
    animateposition:[0,108,-290,0],[0,108,-200,1]
    duration:28

564:AnimateTrack
    track:player
    animateposition:[0,108,-200,0],[0,108,-290,1]
    duration:4

568:AnimateTrack
    track:player
    animateposition:[0,108,-290,0],[0,108,-200,1]
    duration:28

600:AnimateTrack
    track:player
    animateposition:[0,0,0,0]

99.5:AppendNotes
    tobeat:102
    animateposition:[0,3,0,0],[0,0,0,0.2,"easeOutBack"]
    animatelocalrotation:[45,0,0,0],[0,0,0,0.2,"easeOutBack"]
    animatedissolvearrow:[0,0],[1,0.1]

105:AppendNotes
    tobeat:111
    animateposition:[Random(-2,2),0,0,0],[0,0,0,0.1,"easeOutBack"]
    NJSOffset:0

111:AppendNotes
    tobeat:113.75
    animateposition:[Random(-10,10),0,Random(0,10),0],[0,0,0,0.2]

113.75:AppendNotes
    tobeat:119
    animateposition:[Random(-2,2),0,0,0],[0,0,0,0.1,"easeOutBack"]
    NJSOffset:0

121:AppendNotes
    tobeat:127
    animateposition:[Random(-2,2),0,0,0],[0,0,0,0.1,"easeOutBack"]
    NJSOffset:0

129:AppendNotes
    tobeat:131
    animateposition:[Random(-2,2),0,0,0],[0,0,0,0.1,"easeOutBack"]
    NJSOffset:0

168:AnimateTrack
    track:notes
    duration:2
    repeat:30
    repeataddtime:2
    animatedissolvearrow:[1,0],[0.4,0.05],[1,0.7]
    animatescale:[1,1,1,0],[1.1,1.1,1.1,0.05],[1,1,1,1]
    animatelocalrotation:[0,0,0,0],[0,0,10,0.25],[0,0,-10,0.75],[0,0,0,1]

536:AnimateTrack
    track:notes
    duration:2
    repeat:30
    repeataddtime:2
    animatedissolvearrow:[1,0],[0.4,0.05],[1,0.7]
    animatescale:[1,1,1,0],[1.1,1.1,1.1,0.05],[1,1,1,1]
    animatelocalrotation:[0,0,0,0],[0,0,10,0.25],[0,0,-10,0.75],[0,0,0,1]

248:AnimateTrack
    track:notes
    duration:64
    animaterotation:[0,0,0,0],[0,10,0,{1/4}],[0,-10,0,{2/4}],[0,0,0,1,"easeInSine"]

313:AppendNotes
    tobeat:372
    NJS:10
    NJSOffset:3
    appendtechnique:1
    animateposition:[Random(-20,20),Random(71,80),Random(0,20),0],[0,70,0,0.4,"easeOutSine","splineCatmullRom"]
    animatelocalrotation:[Random(-10,10),Random(-10,10),Random(-10,10),0],[0,0,0,0.5]
    animatedissolvearrow:[0.0,0],[1,0.6]

######################################

Workspace:Main

######################################

0:startspines
    repeat:150
    repeataddtime:0.2
    rotation:Random(0,45)
    xpos:Random(-1,-6)
    dur:{34-(repeat/10)}
    inst:{repeat}

0:startspines
    repeat:150
    repeataddtime:0.2
    rotation:Random(0,-45)
    xpos:Random(5,10)
    dur:{34-(repeat/10)}
    inst:{repeat}

4:AnimateTrack
    track:greyspikes
    duration:1.5
    animatecolor:[1,1,1,100,0],[0.1,0.1,0.1,100,1]

5.5:AnimateTrack
    repeat:2
    repeataddtime:1
    track:greyspikes
    duration:1
    animatecolor:[1,1,1,100,0],[0.1,0.1,0.1,100,1]

7.5:AnimateTrack
    track:greyspikes
    duration:3
    animatecolor:[1,1,1,100,0],[0.1,0.1,0.1,100,1]

10.5:AnimateTrack
    track:greyspikes
    duration:1
    animatecolor:[1,0,1,100,0],[0.1,0.1,0.1,100,1]

11.5:AnimateTrack
    track:greyspikes
    duration:2
    animatecolor:[1,1,1,100,0],[0.1,0.1,0.1,100,1]

13.5:AnimateTrack
    track:greyspikes
    duration:1
    animatecolor:[1,0,0,100,0],[0.1,0.1,0.1,100,1]

14.5:AnimateTrack
    track:greyspikes
    duration:1
    animatecolor:[0,0,1,100,0],[0.1,0.1,0.1,100,1]

15.5:AnimateTrack
    track:greyspikes
    duration:2.5
    animatecolor:[1,1,1,100,0],[0.1,0.1,0.1,100,1]

18:AnimateTrack
    track:greyspikes
    duration:1
    animatecolor:[1,1,1,100,0],[0.1,0.1,0.1,100,1]

19:AnimateTrack
    track:greyspikes
    duration:1
    animatecolor:[1,1,1,100,0],[0.1,0.1,0.1,100,1]

20:AnimateTrack
    track:greyspikes
    duration:1.5
    animatecolor:[1,0,1,100,0],[0.1,0.1,0.1,100,1]

21.5:AnimateTrack
    track:greyspikes
    duration:1
    animatecolor:[1,1,1,100,0],[0.1,0.1,0.1,100,1]

22.5:AnimateTrack
    track:greyspikes
    duration:1
    animatecolor:[0,1,0,100,0],[0.1,0.1,0.1,100,1]

23.5:AnimateTrack
    track:greyspikes
    duration:3
    animatecolor:[1,1,1,100,0],[0.1,0.1,0.1,100,1]

26.5:AnimateTrack
    track:greyspikes
    duration:1
    animatecolor:[1,0,0,100,0],[0.1,0.1,0.1,100,1]

27.5:AnimateTrack
    track:greyspikes
    duration:2
    animatecolor:[1,0,0,100,0],[0.1,0.1,0.1,100,1]

29.5:AnimateTrack
    track:greyspikes
    duration:1
    animatecolor:[1,0,1,100,0],[0.1,0.1,0.1,100,1]

30.5:AnimateTrack
    track:greyspikes
    duration:1
    animatecolor:[1,1,0,100,0],[0.1,0.1,0.1,100,1]

31.5:AnimateTrack
    track:greyspikes
    duration:2.5
    animatecolor:[0.1,0.1,0.1,100,0],[100,100,100,100,1,"easeInSine"]

# Backdrop

36:Wall
    fake:true
    scale:[1000,0,500]
    animatedefiniteposition:[-500,98,-310,0],[-500,98,-350,1]
    definitetime:beats
    definiteduration:196
    color:[0.1,0.1,0.1,10]
    interactable:false
    animatedissolve:[0,0],[1,0.001]
    track:backdrop

36:Wall
    fake:true
    definitetime:beats
    definiteduration:196
    scale:[2000,500,0]
    animatedefiniteposition:[-1000,90,0,0]
    color:[0,0,0,0]
    track:backdrop

102:AnimateTrack
    track:backdrop
    duration:2
    animatecolor:[0.4,0.4,0.4,0],[10,0,5,10,1]

132:AnimateTrack
    track:backdrop
    duration:1
    repeat:4
    repeataddtime:1
    animatecolor:[10,{repeat*3.33},{repeat*3.33},0,0],[0,0,0,0,1]

136:AnimateTrack
    track:backdrop
    animatecolor:[10,0,5,10,0]

228:AnimateTrack
    track:backdrop
    duration:4
    animatecolor:[10,0,5,10,0],[0,0,0,0,1]

#Floaty things


36:Wall
    fake:true
    repeat:150
    repeataddtime:0.4
    scale:[0,Random(4,8),0.5]
    localrotation:[0,Random(-45,45),0]
    animatedefiniteposition:[Random(5,30),90,Random(-250,-290),0]
    animateposition:[0,0,0,0],[0,Random(10,20),0,1,"easeOutSine"]
    color:[0,0,0,0]
    interactable:false
    animatescale:[1,1,1,0],[1,1,1,0.9],[0,0,0,1]
    animatedissolve:[0,0],[1,0.1],[0,0.9]
    definiteduration:10
    definitetime:beats

36:Wall
    fake:true
    repeat:150
    repeataddtime:0.4
    scale:[0,Random(4,8),0.5]
    localrotation:[0,Random(-45,45),0]
    animatedefiniteposition:[Random(-1,-30),90,Random(-250,-290),0]
    animateposition:[0,0,0,0],[0,Random(10,20),0,1,"easeOutSine"]
    color:[0,0,0,0]
    interactable:false
    animatescale:[1,1,1,0],[1,1,1,0.9],[0,0,0,1]
    animatedissolve:[0,0],[1,0.1],[0,0.9]
    definiteduration:10
    definitetime:beats

104:box
    repeat:4
    repeataddtime:8

106:triplethingcaller
    reps:3
    repeat:3
    repeataddtime:8

130:triplethingcaller
    reps:1

132:box
    repeat:3
    repeataddtime:2

# Beat 138 thing

138:raisingcolors

166:AnimateTrack
    track:coloraise
    animatedissolve:[1,0],[0,1]
    duration:2

# Beat 168 Thing

168:progressive
    repeat:28
    repeataddtime:1
    dura:32
    rep:{repeat}
    zoff:{repeat*5+20}

168:progressive
    repeat:28
    repeataddtime:1
    dura:32
    rep:{repeat}
    zoff:{repeat*5}


# Beat 168 thing but at beat 200

200:progressive
    repeat:28
    repeataddtime:1
    dura:28
    rep:{repeat}
    zoff:{repeat*5+20}

200:progressive
    repeat:28
    repeataddtime:1
    dura:28
    rep:{repeat}
    zoff:{repeat*5}

# Backdrop

248:Wall
    fake:true
    definitetime:beats
    scale:[1500,500,0]
    animatedefiniteposition:[-750,0,300,0]
    definiteduration:192
    color:[1,1,1,0]
    track:backdrop

248:Wall
    fake:true
    definitetime:beats
    definiteduration:192
    color:[1,1,1,0]
    scale:[1000,0,1000]
    animatedefiniteposition:[-500,40,-50,0]
    track:backdrop2

248:AnimateTrack
    track:backdrop
    animatecolor:[1,5,6,10,0]

312:AnimateTrack
    track:backdrop
    animatecolor:[0.5,0,0.3,5,0],[1,0,0.5,20,1]
    duration:60

248:AnimateTrack
    track:backdrop2
    animatecolor:[1,5,6,10,0]

312:AnimateTrack
    track:backdrop2
    animatecolor:[0.5,0,0.3,5,0],[1,0,0.5,20,1]
    duration:60

374:AnimateTrack
    track:backdrop2
    animateposition:[0,0,0,0],[0,0,-600,1]
    duration:66

# Whoosh Up

372:Wall
    fake:true
    repeat:40
    repeataddtime:0.1
    position:[Random(-10,10),60,0]
    NJS:{(repeat+1)*4}
    NJSOffset:Random(0,-2)
    color:HSLtoRGB(0.6,10,5,0)
    scale:[0.5,0.5,10]
    interactable:false

372:Wall
    fake:true
    repeat:40
    repeataddtime:0.1
    position:[Random(-10,10),80,0]
    NJS:{(repeat+1)*4}
    NJSOffset:Random(0,-2)
    color:HSLtoRGB(0.6,10,5,0)
    scale:[0.5,0.5,10]
    interactable:false

372:Wall
    fake:true
    repeat:40
    repeataddtime:0.1
    position:[-10,Random(60,80),0]
    NJS:{(repeat+1)*4}
    NJSOffset:Random(0,-2)
    color:HSLtoRGB(0.6,10,5,0)
    scale:[0.5,0.5,10]
    interactable:false

372:Wall
    fake:true
    repeat:40
    repeataddtime:0.1
    position:[10,Random(60,80),0]
    NJS:{(repeat+1)*4}
    NJSOffset:Random(0,-2)
    color:HSLtoRGB(0.6,10,5,0)
    scale:[0.5,0.5,10]
    interactable:false

# BIG WALL THINGY

374:Wall
    fake:true
    repeat:58
    repeataddtime:1
    color:HSLtoRGB(Random(0,1),10,10,0)
    scale:[10,200,10]
    NJS:50
    NJSOffset:10
    definitetime:beats
    position:[Random(15,300),40,0]
    animateposition:[0,0,0,0],[Random(-5,10),0,0,1,"easeOutExpo"]
    animatescale:[1,0,1,0],[1,Random(1,3),1,1]
    track:big

374:Wall
    fake:true
    repeat:58
    repeataddtime:1
    color:HSLtoRGB(Random(0,1),10,10,0)
    scale:[10,200,10]
    NJS:50
    NJSOffset:10
    definitetime:beats
    position:[Random(-20,-300),40,0]
    animateposition:[0,0,0,0],[Random(5,-10),0,0,1,"easeOutExpo"]
    animatescale:[1,0,1,0],[1,Random(1,3),1,1]
    track:big

440:AnimateTrack
    track:big
    animatedissolve:[0,0]

# Calm before the storm

440:Wall
    fake:true
    repeat:14
    repeataddtime:2
    scale:[1,10,50]
    NJS:40
    NJSOffset:-5
    definiteduration:2
    color:[{repeat/14},{repeat/14},{repeat/14},-100]
    position:[4,-1,0]

441:Wall
    fake:true
    repeat:14
    repeataddtime:2
    scale:[1,10,50]
    NJS:40
    NJSOffset:-5
    definiteduration:2
    color:[{repeat/14},{repeat/14},{repeat/14},-100]
    position:[-4,-1,0]

440:Wall
    fake:true
    scale:[100,0,300]
    animatedefiniteposition:[-50,10,-10,0]
    color:[0,0,0,-100]
    interactable:false
    definitetime:beats
    definiteduration:32
    animatedissolve:[1,0],[1,0.9],[0,1]
    animaterotation:[0,0,0,0],[0,0,180,1]

440:Wall
    fake:true
    scale:[100,0,300]
    animatedefiniteposition:[-50,-10,-10,0]
    color:[0,0,0,-100]
    interactable:false
    definitetime:beats
    definiteduration:32
    animatedissolve:[1,0],[1,0.9],[0,1]
    animaterotation:[0,0,0,0],[0,0,180,1]

440:Wall
    fake:true
    scale:[100,0,300]
    animatedefiniteposition:[-50,20,-10,0]
    color:[0,0,0,-50]
    interactable:false
    definitetime:beats
    definiteduration:32
    animatedissolve:[1,0],[1,0.9],[0,1]
    rotation:[0,0,90]
    animaterotation:[0,0,0,0],[0,0,-180,1]

440:Wall
    fake:true
    scale:[100,0,300]
    animatedefiniteposition:[-50,-20,-10,0]
    color:[0,0,0,-50]
    interactable:false
    definitetime:beats
    definiteduration:32
    animatedissolve:[1,0],[1,0.9],[0,1]
    rotation:[0,0,90]
    animaterotation:[0,0,0,0],[0,0,-180,1]

#The Storm

472:Wall
    definitetime:beats
    scale:[1500,500,0]
    animatedefiniteposition:[-750,0,300,0]
    definiteduration:64
    animatecolor:[1,0,0.5,20,0]

472:Wall
    definitetime:beats
    definiteduration:64
    animatecolor:[1,0,0.5,20,0]
    scale:[1000,0,1000]
    animatedefiniteposition:[-500,40,-50,0],[-500,40,-650,1]

472:Wall
    fake:true
    scale:[1,1,100]
    animatescale:[0,0,0,0],[1,1,1,Random(0.5,1)]
    animatelocalrotation:[0,0,Random(-180,180),0],[0,0,Random(-180,180),1]
    interactable:false
    animatedefiniteposition:[Random(-100,100),Random(50,70),0,0]
    animateposition:[0,0,100,0],[0,0,-100,1,"easeInSine"]
    repeat:640
    repeataddtime:0.1
    color:HSLtoRGB(Random(0,1),10,5,0)

486:Wall
    repeat:500
    repeataddtime:0.1
    scale:[5,5,5]
    localrotation:[Random(-180,180),Random(-180,180),Random(-180,180)]
    color:HSLtoRGB(Random(0,1),10,5,0)
    animatescale:[1,1,1,0],[Random(0.5,2),Random(0.5,2),Random(0.5,1),1]
    fake:true
    interactable:false
    animateposition:[0,0,200,0],[0,0,-200,1,"easeInSine"]
    animatedefiniteposition:[Random(-100,100),Random(50,100),0,0]
    animatelocalrotation:[Random(-180,180),Random(-180,180),Random(-180,180),0],[Random(-180,180),Random(-180,180),Random(-180,180),1]
    animatedissolve:[0,0],[1,0.1],[1,0.9],[0,1]

# Return to prog

536:Wall
    fake:true
    scale:[400,0,500]
    animatedefiniteposition:[-200,98,-310,0]
    definitetime:beats
    definiteduration:64
    color:[10,0,5,0]
    interactable:false
    animatedissolve:[0,0],[0,0.009],[1,0.01]

536:Wall
    fake:true
    definitetime:beats
    definiteduration:64
    scale:[2000,500,0]
    animatedefiniteposition:[-1000,90,0,0]
    color:[10,0,5,0]
    animatedissolve:[0,0],[1,0.01]

536:progt
    repeat:28
    repeataddtime:1
    dura:28
    zoff:{repeat*5+20}
    rep:repeat

536:progt
    repeat:28
    repeataddtime:1
    dura:28
    zoff:{repeat*5}
    rep:repeat

568:progt
    repeat:32
    repeataddtime:1
    dura:32
    zoff:{repeat*5+20}
    rep:repeat

568:progt
    repeat:32
    repeataddtime:1
    dura:32
    zoff:{repeat*5}
    rep:repeat

536:Note
    repeat:200
    repeataddtime:0.32
    animatedefiniteposition:[Random(-100,100),Random(120,150),Random(-290,-100),0]
    color:[0.5,0,0.25,1]
    animatedissolvearrow:[0,0]
    animatedissolve:[0,0],[1,0.01]
    definitetime:beats
    definitedurationbeats:{64-(repeat*0.32)}
    animatelocalrotation:[Random(-180,180),Random(-180,180),Random(-180,180),0],[Random(-180,180),Random(-180,180),Random(-180,180),1]
    disablenotelook:true
    disablespawneffect:true
    fake:true
    interactable:false
    track:randomnotes

537:AnimateTrack
    track:randomnotes
    animatecolor:[1,1,1,1,0],[0.5,0,0.25,1,1,"easeInSine"]
    animatescale:[8,8,8,0],[5,5,5,1]
    duration:2
    repeat:14
    repeataddtime:2

569:AnimateTrack
    track:randomnotes
    animatecolor:[1,1,1,1,0],[0.5,0,0.25,1,1,"easeInSine"]
    animatescale:[8,8,8,0],[5,5,5,1]
    duration:2
    repeat:14
    repeataddtime:2

# END

600:Wall
    repeat:10
    color:[1,0.2,0,0]
    animatedefiniteposition:[Random(0.9,1.1),Random(2,2.2),Random(5,5.2),0],[Random(0.8,1.1),Random(2,2.2),Random(10,10.2),Random(0.3,0.7)],[1,10,10.1,1,"easeInSine","splineCatmullRom"]
    animatelocalrotation:[Random(-180,180),Random(-180,180),Random(-180,180),0],[Random(-180,180),Random(-180,180),Random(-180,180),1]
    scale:[1,1,1]
    animatescale:[1,1,1,0],[1.2,1.2,1.2,Random(0.1,0.3)],[0,0,0,1,"easeInExpo"]
    definiteduration:5
    definitetime:beats
    fake:true
    interactable:false
