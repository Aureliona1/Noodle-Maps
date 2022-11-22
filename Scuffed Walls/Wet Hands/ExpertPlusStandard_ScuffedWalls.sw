# ScuffedWalls v2.1.0
Workspace:FunctionDefinitions

function:trees

Var:treex
   data:0
   public:true

Var:treey
   data:0
   public:true

Var:treez
   data:0
   public:true

x:Wall
   track:trees
   duration:16
   scale:[3,40,3]
   color:[0.3,0.1,0,0.5]
   position:[treex,treey,treez]
   interactable:false
   NJS:2
   NJSOffset:20
   animatedissolve:[0,0],[1,0.05],[1,0.9],[0,1]

x:Wall
   repeat:20
   track:trees
   duration:16
   scale:[4,4,4]
   color:[0,0.4,0,0]
   position:[treex,{treey+39},treez]
   animateposition:[Random(-5,5),Random(-5,5),Random(-5,5),0],[Random(-5,5),Random(-5,5),Random(-5,5),1]
   localrotation:[Random(-45,45),Random(-45,45),Random(-45,45)]
   interactable:false
   NJS:2
   NJSOffset:20
   animatedissolve:[0,0],[1,0.05],[1,0.9],[0,1]

function:clouds

Var:cloudcolor
   data:0
   public:true

Var:cloudsize
   data:0
   public:true

x:Wall
   track:clouds
   definiteduration:70
   definitetime:beats
   animatedissolve:[0,0],[0,0.01],[1,0.05],[1,0.9],[0,1]
   animateposition:[0,0,0,0],[Random(-10,10),Random(-5,10),Random(-10,10),1]
   animatedefiniteposition:[Random(-42,40),Random(70,90),Random(-40,40),0]
   scale:[cloudsize,cloudsize,cloudsize]
   animatelocalrotation:[Random(-45,45),Random(-45,45),Random(-45,45),0],[Random(-45,45),Random(-45,45),Random(-45,45),1]
   color:[cloudcolor,cloudcolor,cloudcolor,-20]
   NJS:1000

function:cobbles

var:cobcol
   data:0
   public:true

x:Wall
   duration:16
   scale:[0.5,0.1,0.5]
   localrotation:[0,Random(-90,90),0]
   color:[cobcol,cobcol,cobcol,0]
   position:[Random(-5,5),20,-10]
   interactable:false
   NJS:2
   NJSOffset:20
   track:cobbles
   animatedissolve:[0,0],[1,0.05],[1,0.9],[0,1]
Workspace:Playernotes
0: Import
   Path:ExpertStandard.dat
0:AppendToAllNotesBetween
   tobeat:118
   appendtechnique:1
   disablenotelook:true
   disablespawneffect:true
   track:playercam
   NJS:12
   NJSOffset:-0.5
0:AssignPlayerToTrack
   track:playercam
0:AnimateTrack
   track:playercam
   animateposition:[0,20,0,0]
16:AnimateTrack
   track:playercam
   animateposition:[0,20,0,0],[0,50,0,1,"easeInOutSine"]
   duration:16
64:AnimateTrack
   track:playercam
   animateposition:[0,50,0,0],[0,20,0,1,"easeInOutSine"]
   duration:8

Workspace:Main
0:blackout

#Floaty cloud things
0:clouds
   repeat:200
   repeataddtime:0.01
   cloudcolor:Random(0.4,0.9)
   cloudsize:Random(10,15)
#Grass

0:Wall
   repeat:256
   repeataddtime:0.25
   definiteduration:30
   definitetime:beats
   interactable:false
   NJS:1000
   animatedissolve:[0,0],[0,0.05],[1,0.06],[1,0.95],[0,1]
   animatedefiniteposition:[Random(-50,-5),18,100,0]
   animateposition:[0,0,0,0],[0,0,-125,1]
   scale:[1,Random(30,35),1]
   color:[0,1,0,0.1]
   localrotation:[Random(-5,10),Random(-10,10),Random(0,10)]
   track:grass
0:Wall
   repeat:256
   repeataddtime:0.25
   definiteduration:30
   definitetime:beats
   interactable:false
   NJS:1000
   animatedissolve:[0,0],[0,0.05],[1,0.06],[1,0.95],[0,1]
   animatedefiniteposition:[Random(5,50),18,100,0]
   animateposition:[1,0,0,0],[1,0,-125,1]
   scale:[1,Random(30,35),1]
   color:[0,1,0,0.1]
   localrotation:[Random(-5,10),Random(-10,10),Random(-10,0)]
   track:grass

#Floaty things around the grass
Var:bushsize
   data:Random(2,3)
   recompute:2
0:Wall
   repeat:128
   repeataddtime:0.5
   definiteduration:30
   definitetime:beats
   NJS:1000
   interactable:false
   animatelocalrotation:[Random(-45,45),Random(-45,45),Random(-45,45),0],[Random(-45,45),Random(-45,45),Random(-45,45),1]
   animatedissolve:[0,0],[0,0.05],[1,0.06],[1,0.95],[0,1]
   animatedefiniteposition:[Random(5,50),Random(18.5,20),100,0]
   animateposition:[1,0,0,0],[1,Random(-0.5,0.5),-125,1]
   scale:[bushsize,bushsize,bushsize]
   color:[0,Random(0.2,0.7),0.1,-50]
   track:grass
0:Wall
   repeat:128
   repeataddtime:0.5
   definiteduration:30
   definitetime:beats
   NJS:1000
   interactable:false
   animatelocalrotation:[Random(-45,45),Random(-45,45),Random(-45,45),0],[Random(-45,45),Random(-45,45),Random(-45,45),1]
   animatedissolve:[0,0],[0,0.05],[1,0.06],[1,0.95],[0,1]
   animatedefiniteposition:[Random(-50,-5),Random(18.5,20),100,0]
   animateposition:[0,0,0,0],[0,Random(-0.5,0.5),-125,1]
   scale:[bushsize,bushsize,bushsize]
   color:[0,Random(0.2,0.7),0.1,-50]
   track:grass

0:AnimateTrack
   track:grass
   animatedissolve:[0,0]

#Rain

0:Wall
   repeat:640
   repeataddtime:0.1
   definitedurationbeats:2
   definitetime:beats
   color:[100,100,100,0]
   interactable:false
   animateposition:[0,0,0,0],[0,-100,0,1,"easeInSine"]
   animatedefiniteposition:[Random(-5,5),90,Random(5,10),0]
   animatedissolve:[0,0],[0,0.1],[1,0.2],[1,0.9],[0,1]
   scale:[0.01,0.5,0.01]
0.05:Wall
   repeat:640
   repeataddtime:0.1
   definitedurationbeats:2
   definitetime:beats
   color:[100,100,100,0]
   interactable:false
   animateposition:[0,0,0,0],[0,-100,0,1,"easeInSine"]
   animatedefiniteposition:[Random(-10,-5),90,Random(-5,5),0]
   animatedissolve:[0,0],[0,0.1],[1,0.2],[1,0.9],[0,1]
   scale:[0.01,0.5,0.01]
0.05:Wall
   repeat:640
   repeataddtime:0.1
   definitedurationbeats:2
   definitetime:beats
   color:[100,100,100,0]
   interactable:false
   animateposition:[0,0,0,0],[0,-100,0,1,"easeInSine"]
   animatedefiniteposition:[Random(5,10),90,Random(-5,5),0]
   animatedissolve:[0,0],[0,0.1],[1,0.2],[1,0.9],[0,1]
   scale:[0.01,0.5,0.01]
0:Wall
   repeat:256
   repeataddtime:0.25
   definitedurationbeats:2
   definitetime:beats
   color:[100,100,100,0]
   interactable:false
   animateposition:[0,0,0,0],[0,-100,0,1,"easeInSine"]
   animatedefiniteposition:[Random(-5,5),90,Random(-5,-6),0]
   animatedissolve:[0,0],[0,0.1],[1,0.2],[1,0.9],[0,1]
   scale:[0.01,0.5,0.01]

#Big water thing

0:Wall
   color:[0,0.5,1,-40]
   scale:[200,1,400]
   interactable:false
   animatedefiniteposition:[-100,19.5,-100,0],[-100,19.5,-200,1]
   definiteduration:184
   definitetime:beats
   track:bigbluewater

14:AnimateTrack
   track:bigbluewater
   duration:2
   animateposition:[0,0,0,0],[0,-0.5,0,1,"easeInOutSine"]
16:AnimateTrack
   track:grass
   duration:1
   animatedissolve:[0,0],[1,1]
70:AnimateTrack
   track:grass
   duration:4
   animatedissolve:[1,0],[0,0.9]
   animatescale:[1,1,1,0],[1,1,1,0.99],[0,0,0,1]
70:AnimateTrack
   track:bigbluewater
   duration:4
   animatecolor:[0,0.5,1,-20,0],[0,0,0,-100,1]
79:AnimateTrack
   track:bigbluewater
   duration:4
   animatecolor:[0,0,0,-100,0],[0,0,0,-20,1]

#The Campfire

72:ModelToWall
   path:models/fire.dae
   duration:7
   hasanimation:false
   normal:false
   animateposition:[-0.5,20,10,0]
   color:[0.2,0.05,0,0]
   animatedissolve:[0,0],[1,0.1],[1,0.9],[0,1]
72:Wall
   repeat:70
   repeataddtime:0.1
   interactable:false
   definitetime:beats
   definiteduration:1
   scale:[1,1,1]
   NJS:1000
   animateposition:[1,1,0,0]
   localrotation:[Random(-90,90),Random(-90,90),Random(-90,90)]
   color:[Random(0.8,2),Random(0.1,0.3),Random(0,0.1),0]
   animatedefiniteposition:[Random(-0.5,0.5),Random(19,19.1),Random(9.5,10.5),0],[Random(-0.5,0.5),Random(22,23),Random(9.5,10.5),1,"easeInSine"]
   animatescale:[0.5,0.5,0.5,0],[0.000001,0.000001,0.000001,1,"easeInSine"]
   animatedissolve:[0,0],[1,0.1],[1,0.9],[0,1]
72:Wall
   repeat:28
   repeataddtime:0.25
   interactable:false
   definitetime:beats
   definiteduration:1
   scale:[1,1,1]
   NJS:1000
   animateposition:[1,1,0,0]
   localrotation:[Random(-90,90),Random(-90,90),Random(-90,90)]
   color:[Random(0.8,2),Random(0.5,0.8),Random(0,0.1),0]
   animatedefiniteposition:[Random(-1,1),Random(19,19.1),Random(9,11),0],[Random(-0.5,0.5),Random(22,23),Random(9.5,10.5),1,"easeInSine"]
   animatescale:[1,1,1,0],[0.000001,0.000001,0.000001,1,"easeInSine"]
   animatedissolve:[0,0],[1,0.1],[1,0.9],[0,1]

#  Second Section :)

#Cobbles

84:cobbles
   repeat:1000
   repeataddtime:0.1
   cobcol:Random(0.3,0.7)

60:AnimateTrack
   track:cobbles
   duration:24
   animatedissolve:[0,0],[0,0.9],[1,1]

#Stars

79:Wall
   track:stars
   repeat:500
   repeataddtime:0.001
   definiteduration:100
   definitetime:beats
   animatedefiniteposition:[Random(-30,30),Random(50,55),Random(-10,100),0]
   animaterotation:[0,0,Random(-90,90),0],[0,0,Random(-90,90),1]
   animatedissolve:[0,0],[1,0.01],[1,0.99],[0,1]
   color:[100,100,100,0]
   scale:[0.2,0.2,0.2]

#Houses

84:ModelToWall
   repeat:25
   repeataddtime:4
   track:houses
   NJS:2
   NJSOffset:20
   path:models/house.dae
   duration:16
   hasanimation:false
   normal:true
   setdeltascale:true
   deltascale:5
   setdeltaposition:true
   deltaposition:[0,23,0]
   animateposition:[-7.5,0,0,0]
   color:[0.4,0.4,0.4,-20]
   animatedissolve:[0,0],[1,0.1],[1,0.9],[0,1]
   interactable:false
84:ModelToWall
   repeat:25
   repeataddtime:4
   track:houses
   NJS:2
   NJSOffset:20
   path:models/house.dae
   duration:16
   hasanimation:false
   normal:true
   setdeltascale:true
   deltascale:5
   setdeltaposition:true
   deltaposition:[0,23,0]
   animateposition:[7.5,0,0,0]
   color:[0.4,0.4,0.4,-20]
   animatedissolve:[0,0],[1,0.1],[1,0.9],[0,1]
   interactable:false

60:AnimateTrack
   track:houses
   duration:24
   animatedissolve:[0,0],[0,0.9],[1,1]
121:AnimateTrack
   track:houses
   duration:2
   animatecolor:[0.4,0.4,0.4,-20,0],[1,1,1,-20,0.01],[0.4,0.4,0.4,-20,0.05],[0.4,0.4,0.4,-20,0.1],[1,1,1,-20,0.11],[0.4,0.4,0.4,-20,1,"easeOutExpo"]

#Trees

84:trees
   repeat:25
   repeataddtime:4
   treex:Random(-20,-40)
   treey:Random(0,19)
   treez:Random(-10,10)

84:trees
   repeat:25
   repeataddtime:4
   treex:Random(15,35)
   treey:Random(0,19)
   treez:Random(-10,10)

60:AnimateTrack
   track:trees
   duration:24
   animatedissolve:[0,0],[0,0.9],[1,1]


#lightning

119:ModelToWall
   path:models/lightning.dae
   normal:false
   setdeltascale:true
   setdeltaposition:true
   deltaposition:[0,100,200]
   color:[10,10,10,0]
   deltascale:30
   duration:4
   track:lightning

115:AnimateTrack
   track:lightning
   animatedissolve:[0,0],[0,1]
   duration:6
121:AnimateTrack
   track:lightning
   animatedissolve:[0,0],[1,0.01],[0,0.05],[0,0.1],[1,0.11],[0,1,"easeOutExpo"]
   duration:2

#Final dissolve thingos
140:AnimateTrack
   track:houses
   duration:10
   animatedissolve:[1,0],[0,1]
   animatecolor:[0.4,0.4,0.4,-20,0],[0,0,0,-20,1]
150:AnimateTrack
   track:houses
   animatescale:[0,0,0,0]