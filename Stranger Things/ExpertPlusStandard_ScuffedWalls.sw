Workspace:Import
0: Import
   Path:ExpertStandard.dat

0:AssignPlayerToTrack
   track:player

0:AppendNotes
   select:{_type=0}
   track:lnotes
   disablespawneffect:true

0:AppendNotes
   select:{_type=1}
   track:rnotes
   disablespawneffect:true

0:ParentTrack
   parenttrack:notes
   childtracks:["lnotes","rnotes"]

0:ParentTrack
   parenttrack:player
   childtracks:["notes"]

8:AnimateTrack
   track:lnotes
   repeat:42
   repeataddtime:1
   duration:1
   animatescale:[1,1,1,0],[1.5,1.5,1.5,0.05],[1.05,1.05,1.05,0.25,"easeOutExpo"],[1.5,1.5,1.5,0.3],[1,1,1,1,"easeOutExpo"]

8:AnimateTrack
   track:rnotes
   repeat:42
   repeataddtime:1
   duration:1
   animatescale:[1,1,1,0],[1.5,1.5,1.5,0.05],[1.05,1.05,1.05,0.25,"easeOutExpo"],[1.5,1.5,1.5,0.3],[1,1,1,1,"easeOutExpo"]

72:AnimateTrack
   track:lnotes
   repeat:2
   repeataddtime:1
   duration:1
   animatescale:[1,1,1,0],[1.5,1.5,1.5,0.05],[1.05,1.05,1.05,0.25,"easeOutExpo"],[1.5,1.5,1.5,0.3],[1,1,1,1,"easeOutExpo"]

72:AnimateTrack
   track:rnotes
   repeat:2
   repeataddtime:1
   duration:1
   animatescale:[1,1,1,0],[1.5,1.5,1.5,0.05],[1.05,1.05,1.05,0.25,"easeOutExpo"],[1.5,1.5,1.5,0.3],[1,1,1,1,"easeOutExpo"]

76:AnimateTrack
   track:rnotes
   repeat:3
   repeataddtime:4
   duration:1
   animatescale:[1,1,1,0],[1.5,1.5,1.5,0.05],[1.05,1.05,1.05,0.25,"easeOutExpo"],[1.5,1.5,1.5,0.3],[1,1,1,1,"easeOutExpo"]

76:AnimateTrack
   track:lnotes
   repeat:3
   repeataddtime:4
   duration:1
   animatescale:[1,1,1,0],[1.5,1.5,1.5,0.05],[1.05,1.05,1.05,0.25,"easeOutExpo"],[1.5,1.5,1.5,0.3],[1,1,1,1,"easeOutExpo"]

32:AppendNotes
   tobeat:39.75
   track:rotatenote
   disablespawneffect:true
   appendtechnique:1

32:AnimateTrack
   track:rotatenote
   duration:8
   animaterotation:[0,0,0,0],[0,0,-35,1]
   animateposition:[0,0,0,0],[-1,-0.5,0,1]
   animatedissolve:[1,0],[0.1,1]

32:AnimateTrack
   track:rotatenote
   duration:1
   repeat:8
   repeataddtime:1
   animatescale:[1,1,1,0],[1.5,1.5,1.5,0.05],[1.05,1.05,1.05,0.25,"easeOutExpo"],[1.5,1.5,1.5,0.3],[1,1,1,1,"easeOutExpo"]

Workspace:Environments

0:AssignFogTrack
   track:fog

0:AnimateTrack
   track:fog
   duration:92
   animatestarty:[-500,0]
   animateattenuation:[0.005,0],[0.01,1,"easeInSine"]

0:Environment
   id:Environment
   lookupmethod:Contains
   position:[-69420,-69420,-69420]

0:Environment
   id:GameCore
   lookupmethod:Contains
   position:[-69420,-69420,-69420]

0:Environment
   id:\[\d+\]Environment\.\[\d+\]PlayersPlace
   lookupmethod:Regex
   position:[0,0,0]

0:Environment
   id:\.\[\d+\]Env\w+\.\[\d+\]RotatingLasersPair\.\[\d+\]BaseL\.\[\d+\]Laser$
   lookupmethod:Regex
   position:[0,100,1000]
   localrotation:[0,0,-90]
   scale:[0.1,1,0.1]

0:Environment
   id:\.\[\d+\]Env\w+\.\[\d+\]RotatingLasersPair\.\[\d+\]BaseL\.\[\d+\]Laser\.\[\d+\]Bake\w+$
   lookupmethod:Regex
   position:[0,100,1000]
   localrotation:[0,0,0]
   scale:[10,10,10]

0:Environment
   id:\.\[\d+\]Env\w+\.\[\d+\]RotatingLasersPair\.\[\d+\]BaseR\.\[\d+\]Laser$
   lookupmethod:Regex
   position:[0,100,1000]
   localrotation:[0,0,90]
   scale:[0.1,1,0.1]

0:Environment
   id:\.\[\d+\]Env\w+\.\[\d+\]RotatingLasersPair\.\[\d+\]BaseR\.\[\d+\]Laser\.\[\d+\]Bake\w+$
   lookupmethod:Regex
   position:[0,100,1000]
   localrotation:[0,0,0]
   scale:[10,10,10]

Workspace:Functions

Workspace:Main

0:Wall
   repeat:1800
   repeataddtime:0.05
   fake:true
   interactable:false
   color:[1,1,1,1]
   scale:[0.05,0.15,0.05]
   definiteduration:0.05
   animatedissolve:[0,0],[1,0.5],[0,1]
   animatedefiniteposition:[Random(-20,20),Random(-10,30),Random(10,50),0]
   animateposition:[0,0,0,0],[0,-1,0,1,"easeOutSine"]
   track:static

48:Note
   type:0
   notecutdirection:8
   repeat:80
   repeataddtime:0.025
   localrotation:[0,0,30]
   position:[{(repeat/80)-2},{1.5-(repeat/50)},0]

48:Note
   type:1
   notecutdirection:8
   repeat:80
   repeataddtime:0.025
   localrotation:[0,0,-30]
   position:[{(-repeat/80)+1},{1.5-(repeat/50)},0]

52:Note
   type:1
   notecutdirection:8
   repeat:80
   repeataddtime:0.025
   localrotation:[0,0,-30]
   position:[{Sin((repeat-20)/15)+1},{Sin((repeat-18)/15)+1},0]

54:Note
   type:0
   notecutdirection:8
   repeat:80
   repeataddtime:0.025
   localrotation:[0,0,30]
   position:[{-Sin((repeat-20)/15)-2},{Sin((repeat-18)/15)+1},0]

1:Model
   path:models/sthings.dae
   animatecolor:[10,0,0,0.1,0],[100,0,0,100,{15.5/89},"easeStep"],[10,0,0,0.1,{17/89},"easeOutExpo"],[100,0,0,100,{58.5/89},"easeStep"],[10,0,0,0.1,{61/89},"easeOutExpo"],[10,0,0,0.1,{82/89}],[1,1,1,1,{85/89},"easeInSine"]
   setdeltaposition:true
   deltaposition:[0,0,100]
   spline:true
   duration:89
   spreadspawntime:4
   animatedissolve:[1,0],[1,{80/89}],[0,{85/89}]
   animatescale:[0,0,0,0],[1.2,0.1,1,{8/89},"easeStep"],[0,0,0,{85/89},"easeStep"]
   animateposition:[0,0,20,0],[0,0,-10,{74/89}],[0,0,-100,{85/89},"easeInSine"]

8:AnimateTrack
   track:S
   animateposition:[-10,10,-30,0],[0,0,0,1,"easeOutSine"]
   animatedissolve:[0,0],[1,{8/52},"easeInExpo"]
   duration:52

8:AnimateTrack
   track:T
   animateposition:[0,10,20,0],[0,0,0,1,"easeOutSine"]
   animatedissolve:[0,0],[1,{16/52},"easeStep"]
   duration:52

8:AnimateTrack
   track:R
   duration:52
   animateposition:[0,0,20,0],[0,0,0,1,"easeOutSine"]
   animatedissolve:[0,0],[1,{16/52},"easeStep"]

8:AnimateTrack
   track:A
   animateposition:[20,10,0,0],[0,10,0,0.5],[0,0,0,1]
   animatedissolve:[0,0],[1,{16/52},"easeInExpo"]
   duration:52

8:ParentTrack
   parenttrack:bigN
   childtracks:["N"]

8:AnimateTrack
   track:N
   duration:52
   animateposition:[0,0,0,0]
   animatedissolve:[1,0],[0.5,{16/52},"easeInExpo"],[1,1,"easeOutSine"]

8:AnimateTrack
   track:bigN
   animateposition:[50,-50,-900,0],[-30,-50,-880,{16/52}],[0,0,0,{16/52},"easeStep"]
   animatescale:[10,10,10,0],[1,1,1,{16/52},"easeStep"]
   duration:52

8:AnimateTrack
   track:G
   animateposition:[0,40,0,0],[0,0,0,1]
   animatedissolve:[0,0],[1,{16/52},"easeStep"]
   duration:52

8:AnimateTrack
   track:E
   animateposition:[0,60,0,0],[0,0,0,1,"easeOutSine"]
   animatedissolve:[0,0],[1,{16/52},"easeStep"]
   duration:52

8:AnimateTrack
   track:R2
   animateposition:[10,10,-30,0],[0,0,0,1,"easeOutSine"]
   animatedissolve:[0,0],[1,{8/52},"easeInExpo"]
   duration:52

8:AnimateTrack
   track:T2
   animateposition:[-20,-10,-20,0],[0,0,0,1,"easeOutSine"]
   animatedissolve:[0,0],[1,{8/52},"easeInExpo"]
   duration:52

8:AnimateTrack
   track:H
   animateposition:[0,-20,0,0],[0,0,0,1]
   animatedissolve:[0,0],[1,{16/52},"easeStep"]
   duration:52

8:AnimateTrack
   track:I
   animatedissolve:[0,0],[1,{16/52},"easeStep"]
   duration:52

8:AnimateTrack
   track:N2
   animateposition:[-20,-10,0,0],[0,-10,0,0.5],[0,0,0,1]
   animatedissolve:[0,0],[1,{16/52},"easeInExpo"]
   duration:52

8:AnimateTrack
   track:G2
   animateposition:[0,-30,0,0],[0,0,0,1]
   animatedissolve:[0,0],[1,{16/52},"easeStep"]
   duration:52

8:AnimateTrack
   track:S2
   animateposition:[20,-10,-20,0],[0,0,0,1,"easeOutSine"]
   animatedissolve:[0,0],[1,{8/52},"easeInExpo"]
   duration:52

8:AnimateTrack
   track:Tbar
   animatedissolve:[0,0]

8:AnimateTrack
   track:BbarL
   animatedissolve:[0,0]

8:AnimateTrack
   track:BbarR
   animatedissolve:[0,0]

60:AnimateTrack
   track:Tbar
   animatedissolve:[1,0]

61:AnimateTrack
   track:BbarL
   animatedissolve:[1,0]

61:AnimateTrack
   track:BbarR
   animatedissolve:[1,0]

60:ParentTrack
   parenttrack:topbar
   childtracks:["Tbar"]

60:AnimateTrack
   track:topbar
   animatescale:[0,1,1,0],[1,1,1,1,"easeOutSine"]
   duration:4

60:ParentTrack
   parenttrack:botbarleft
   childtracks:["BbarL"]

61:AnimateTrack
   track:botbarleft
   animatescale:[0,1,1,0],[1,1,1,1,"easeOutSine"]
   animateposition:[-23,0,0,0],[0,0,0,1,"easeOutSine"]
   duration:4

60:ParentTrack
   parenttrack:botbarright
   childtracks:["BbarR"]

61:AnimateTrack
   track:botbarright
   animatescale:[0,1,1,0],[1,1,1,1,"easeOutSine"]
   animateposition:[23,0,0,0],[0,0,0,1,"easeOutSine"]
   duration:4
