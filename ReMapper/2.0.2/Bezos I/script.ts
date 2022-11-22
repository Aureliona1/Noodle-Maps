import { Difficulty, Color, notesBetween, EASE, CustomEvent, Wall, Event, COLOR } from "https://deno.land/x/remapper@2.0.2/src/mod.ts"

const map = new Difficulty("ExpertStandard.dat", "ExpertPlusStandard.dat");

function random(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min + 1) + min;
}

new CustomEvent().assignTrackParent(["leftNotes","rightNotes","notes"],"player").push();
new CustomEvent().assignPlayerToTrack("player").push();
let animTrack = new CustomEvent().animateTrack("player",31);
    animTrack.time = 82;
    animTrack.animate.position = [[0,0,0,0],[0,20,10,1/31,EASE.OUT_QUAD],[0,20,200,1]];
    animTrack.push();

notesBetween(0,114,(note) =>{
    if(note.type == 0){
        note.track.add("leftNotes")
    }
    else if(note.type == 1){
        note.track.add("rightNotes")
    }
    else{
        note.track.add("notes")
    }
});
notesBetween(0,18.5,(note) =>{
    if(note.type == 0){
        note.animate.position = [[-10,10,-10,0],[0,0,0,0.3,EASE.OUT_SINE]]
    }
    else{
        note.animate.position = [[10,10,-10,0],[0,0,0,0.3,EASE.OUT_SINE]]
    }
    note.animate.scale = [[0,0,0,0],[1,1,1,0.3]];
    note.animate.dissolve = [[0,0],[1,0.4]];
});
for(let i = 0; i < 16; i++){
    animTrack = new CustomEvent().animateTrack("leftNotes",2);
    animTrack.track.add("rightNotes")
    animTrack.animate.localRotation = [
        [0,0,0,0],
        [0,0,-20,0.25,EASE.OUT_QUART],
        [0,0,20,0.75,EASE.IN_OUT_QUART],
        [0,0,0,1,EASE.IN_QUART]
    ];
    animTrack.animate.position = [
        [0,0,0,0],
        [0.2,0,0,0.25,EASE.OUT_QUART],
        [-0.2,0,0,0.75,EASE.IN_OUT_QUART],
        [0,0,0,1,EASE.IN_QUART]
    ];
    animTrack.time = 20+(2*i);
    animTrack.push();
}
notesBetween(20,52,(note) =>{
    note.offset = -0.5;
})
notesBetween(52,67,(note) =>{
        note.animate.rotation = [[-10,0,0,0],[0,0,0,0.35]];
        note.animate.position = [[random(-10,10),random(0,10),0,0],[0,0,0,0.35,EASE.OUT_SINE]];
        note.NJS = 17;
        note.offset = 0.5;
});
notesBetween(68,81,(note) =>{
    note.NJS = 18;

    note.animate.dissolve = [[0,0],[1,0.4,EASE.OUT_EXPO]];
    note.animate.dissolveArrow = [[1,0],[0,0.5]];
});
notesBetween(82,82.5,(note) =>{
    note.offset = 2;
    if(note.type == 0){
        note.animate.position = [[-5,0,0,0],[0,0,0,0.4,EASE.IN_EXPO]];
    }
    else {
        note.animate.position = [[5,0,0,0],[0,0,0,0.4,EASE.IN_EXPO]];
    }
});
notesBetween(83,84.25,(note) =>{
    note.animate.rotation = [[-20,0,90,0],[0,0,0,0.35]];
    note.animate.position = [[-5,0,0,0],[0,0,0,0.35]];
});
notesBetween(85,86.25,(note) =>{
    note.animate.rotation = [[-20,0,-90,0],[0,0,0,0.35]];
    note.animate.position = [[5,0,0,0],[0,0,0,0.35]];
});
notesBetween(87,92.25,(note) =>{
    note.animate.rotation = [[-20,0,-180,0],[0,0,0,0.35]];
    note.offset = 2;
});
notesBetween(93,100.25,(note) =>{
    note.offset = -0.5;
    note.animate.position = [[0,-10,0,0],[0,0,0,0.3,EASE.OUT_EXPO]];
});
notesBetween(101,102.25,(note) =>{
    note.animate.rotation = [[-20,0,90,0],[0,0,0,0.35]];
    note.animate.position = [[-5,0,0,0],[0,0,0,0.35]];
});
notesBetween(103,111,(note) =>{
    note.animate.rotation = [[-40,0,180,0],[0,0,0,0.35]];
    note.offset = 2;
});
notesBetween(111,114,(note) =>{
    if(note.type == 1){
        note.color = [0,0,0,1];
        note.animate.scale = [[1.5,1.5,1.5,0]];
    }
    else {
        note.color = [1,1,1,1];
    }
});


for (let j = 0; j < 5; j++){
    const wallOffset = random(-1,1);
    for(let i = 0; i < 64; i++){
        const wall = new Wall(20+(i/32),32-(i/32));
        const scale = random(5,10);
        wall.scale = [0.05,0.05*scale,0.05];
        wall.animate.scale = [[20,20,20,0]];
        wall.color = [random(0.8,1),1,random(0.8,1),0];
        wall.fake = true;
        wall.interactable = false;
        wall.track.add("bouncers");
        wall.animate.definitePosition = [[-5-(2*j),-5,(i*2)+wallOffset,0],[-5-(2*j),-5,(i*2)-64+wallOffset,1]]
        wall.push();
        wall.animate.definitePosition = [[5+(2*j),-5,(i*2)+wallOffset,0],[5+(2*j),-5,(i*2)-64+wallOffset,1]]
        wall.push();
    }
}
for(let i = 0; i < 32; i++){
    animTrack = new CustomEvent().animateTrack("bouncers",1);
    animTrack.animate.scale = [[1,1.5,1,0],[1,1,1,1]];
    animTrack.time = 20+i;
    animTrack.push();
}
animTrack = new CustomEvent(51).animateTrack("bouncers",1);
    animTrack.animate.dissolve = [[1,0],[0,1,EASE.IN_SINE]];
    animTrack.push();

const wall = new Wall(69,11);
    wall.fake = true;
    wall.interactable = false;
    wall.scale = [10,0,300];
    wall.animate.scale = [[0,0,0,0],[1,1,1,0.1],[1,1,1,0.9],[0,0,0,1]];
    wall.animate.dissolve = [[0,0],[1,0.1],[1,0.9],[0,1]]
    wall.color = [0.3,0.3,0.3,-100];
    wall.animate.definitePosition = [[0,0,0,0],[0,0,-10,1]];
    wall.position = [-5,0,0];
    wall.push();
    wall.position = [-5,5,0];
    wall.push();
    wall.position = [-5,-1,0];
    wall.scale = [0,12,300];
    wall.push();
    wall.position = [5,-1,0];
    wall.push();

for (let i = 0; i < 64; i++){
    new Event(83+(i/2)).ringSpin(69420,1,0,10,0.9).push();
    const color = new Color([Math.random(),1,3,3], COLOR.HSV)
    for (let j = 0; j < 60; j++){
        new Event(83+(i/2)+(j/60)).ringLights().on(color.export(),j).push();
    }
}

map.save();