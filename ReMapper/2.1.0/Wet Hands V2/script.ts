import { ensureDir } from "https://deno.land/std@0.133.0/fs/mod.ts";
import { CustomEvent, Difficulty, DIFFS, Environment, Event, exportZip, FILENAME, Geometry, info, ModelScene, Note, notesBetween, rand, RMLog, Vec3, Wall } from "https://deno.land/x/remapper@2.1.0/src/mod.ts"

/*
TODO:

IDK ¯\_(ツ)_/¯

*/

const map = new Difficulty("ExpertStandard.dat", "ExpertPlusStandard.dat");
map.customData = null;

//Constants

const release = true;
const ye = -69420;

map.geoMaterials["Black"] = {
    _shader: "Standard",
    _color: [0,0,0,1]
}
map.geoMaterials["Star"] = {
    _shader: "Standard",
    _color: [1,1,1,1],
    _shaderKeywords: []
}

new CustomEvent(0).assignFogTrack("Fog").push();
const fog = new CustomEvent(0).animateTrack("Fog");


//Functions
/**
 * Copies the map to a new directory.
 * Useful for if you are working outside of the default BS game directory.
 * @param diffs The diff files. You must include all diffs listed in the Info.dat.
 * @param todir The directory to copy to. Directory must either use double backslashes, or single forward slashes (i.e., \\ or /)
 * @param otherFiles Any other files that you wish to copy over (i.e., Contributer images, scripts, models etc.)
 * @example copytodir(["ExpertPlusStandard","ExpertStandard"],"C:\\Program Files (x86)\\Steam\\steamapps\\common\\Beat Saber\\Beat Saber_Data\\CustomWIPLevels\\Epic map",["script.ts"]);
 * @author Aurellis
 */
async function copytodir(diffs: FILENAME<DIFFS>[] = [], todir: string, otherFiles?: Array<string>){
    await ensureDir(todir);
    Deno.copyFile("Info.dat", `${todir}\\Info.dat`);
    diffs.forEach((file) => {
        Deno.copyFile(`${file}.dat`, `${todir}\\${file}.dat`);
    });
    const song = info.json._songFilename
    Deno.copyFile(song,`${todir}\\${song}`);
    if(info.json._coverImageFilename !== undefined) Deno.copyFile(info.json._coverImageFilename,`${todir}\\${info.json._coverImageFilename}`);
    otherFiles?.forEach((file) => {
        Deno.copyFile(`${file}`, `${todir}\\${file}`);
    });
    RMLog(`Copied map to ${todir}`)
}

function multiplymats(md: number[], mat1: number[][], nd: number[], mat2: number[][]) {
    /**
     * Multiply two rectangular or square matrices
     * @param md The dimensions of matrix 1 (e.g., [2,3])
     * @param mat1 The values for mat one (e.g., [[1,2,3],[4,5,6]])
     * @param nd The dimensions of matrix 2 (e.g., [3,2])
     * @param mat2 The values for mat two (e.g., [[1,2],[3,4],[5,6]])
     */
    const res = new Array(md[0]);
    for (let i = 0; i < md[0]; i++)
        res[i] = new Array(nd[1]);
          
    for (let i = 0; i < md[0]; i++){
        for (let j = 0; j < nd[1]; j++){
            res[i][j] = 0;


            for (let x = 0; x < md[1]; x++){
                res[i][j] += mat1[i][x] * mat2[x][j];
            }
        }
    }
    return res
}

function rotateuler(position: number[], rotation: number[]){
    /**
     * My dodgy af euler rotation function. It finds the rotation position for an object rotated around position = [0,0,0].
     * Rotations are applied in an ZXY order.
     * The function doesn't actually return a rotation vector, it returns the position vector with rotation applied.
     */
    //convert to rad
    rotation = [rotation[0]*Math.PI/180,rotation[1]*Math.PI/180,rotation[2]*Math.PI/180]
    let pos: number[][] = [[position[0]],[position[1]],[position[2]]];
    const xmat: number[][] = [
        [1, 0,                      0                     ],
        [0, Math.cos(rotation[0]),  -Math.sin(rotation[0])],
        [0, Math.sin(rotation[0]),  Math.cos(rotation[0]) ]
    ];
    const ymat: number[][] = [
        [Math.cos(rotation[1]),     0,  Math.sin(rotation[1])],
        [0,                         1,  0                    ],
        [-Math.sin(rotation[1]),    0,  Math.cos(rotation[1])]
    ];
    const zmat: number[][] = [
        [Math.cos(rotation[2]),     -Math.sin(rotation[2]),     0],
        [Math.sin(rotation[2]),     Math.cos(rotation[2]),      0],
        [0,                         0,                          1]
    ];
    pos = multiplymats([3,3],zmat,[3,1],pos);
    pos = multiplymats([3,3],xmat,[3,1],pos);
    pos = multiplymats([3,3],ymat,[3,1],pos);
    const result: Vec3 = [pos[0][0],pos[1][0],pos[2][0]];
    return result;
}

function tree(time: number, pos: Vec3){
    //IDK why this is a function, it really doesn't need to be
    const wall = new Wall();
    wall.track.value = "trees";
    wall.duration = 16;
    wall.time = time;
    wall.scale = [3,40,3];
    wall.color = [0.3,0.1,0,0.5];
    wall.position = pos;
    wall.interactable = false;
    wall.fake = true;
    wall.NJS = 2;
    wall.offset = 20;
    wall.animate.dissolve = [[0,0],[1,0.05],[1,0.9,],[0,1]];
    wall.push();
    wall.scale = [4,4,4];
    wall.color = [0,0.4,0,0];
    wall.position = [pos[0],pos[1]+39,pos[2]];
    for(let i = 0; i < 20; i++){
        wall.animate.position = [[rand(-5,5),rand(-5,5),rand(-5,5),0],[rand(-5,5),rand(-5,5),rand(-5,5),1]];
        wall.animate.localRotation = [rand(-45,45),rand(-45,45),rand(-45,45)];
        wall.push();
    }
}

//Note Mods

notesBetween(0, 140, (note) => {
    note.track.value = "notes";
    note.NJS = 12;
    note.spawnEffect = false;
    //Create mirror notes
    const nu = new Note(note.time,note.type);
    nu.position = [note.position[0],2-note.position[1]];
    nu.NJS = 12;
    nu.spawnEffect = false;
    nu.fake = true;
    nu.interactable = false;
    nu.noteGravity = false;
    switch(note.direction){
        case 0:
            nu.direction = 1;
            break;
        case 1:
            nu.direction = 0;
            break;
        case 2:
            nu.direction = note.direction;
            break;
        case 3:
            nu.direction = note.direction;
            break;
        case 4:
            nu.direction = 6;
            break;
        case 5:
            nu.direction = 7;
            break;
        case 6:
            nu.direction = 4;
            break;
        case 7:
            nu.direction = 5;
            break;
        case 8:
            nu.direction = note.direction;
            break;
    }
    nu.noteLook = false;
    nu.animate.position = [0,-4,0];

    const aside = rand(0,5);
    if(note.time >= 0 && note.time < 17){
        const rot = [rand(-45,45),rand(-20,20),rand(-10,10)];
        note.offset = 8;
        note.animate.scale = [[0,0,0,0],[1,1,1,0.1]];
        note.animate.position = [[0,0,100,0],[0,0,-100,1]];
        note.animate.definitePosition = [[(note.type-0.5)*aside,(note.position[1]*-1)-1,0,0],[(note.type-0.5)*aside,(note.position[1]*-1)-1,0,0.3],[0,0,0,0.5,"easeInOutExpo"]];
        note.animate.localRotation = [[rot[0],rot[1],rot[2],0],[rot[0],rot[1],rot[2],0.3],[0,0,0,0.5,"easeInOutExpo"]];

        nu.offset = 8;
        nu.animate.scale = [[0,0,0,0],[1,1,1,0.1]];
        nu.animate.position = [[0,0,100,0],[0,0,-100,1]];
        nu.animate.definitePosition = [[(note.type-0.5)*aside,note.position[1]-5,0,0],[(note.type-0.5)*aside,note.position[1]-5,0,0.3],[0,-4,0,0.5,"easeInOutExpo"]];
        nu.animate.localRotation = [[-rot[0],rot[1],-rot[2],0],[-rot[0],rot[1],-rot[2],0.3],[0,0,0,0.5,"easeInOutExpo"]];
    }
    if(note.time >= 104 && note.time < 119){
        const rot = [rand(-45,45),rand(-20,20),rand(-45,45)];
        note.offset = 8;
        note.animate.scale = [[0,0,0,0],[1,1,1,0.1]];
        note.animate.position = [[0,0,100,0],[0,0,-100,1]];
        note.animate.definitePosition = [[(note.type-0.5)*aside,(note.position[1]*-1)-1,0,0],[(note.type-0.5)*aside,(note.position[1]*-1)-1,0,0.3],[0,0,0,0.5,"easeInOutExpo"]];
        note.animate.localRotation = [[rot[0],rot[1],rot[2],0],[rot[0],rot[1],rot[2],0.3],[0,0,0,0.5,"easeInOutExpo"]];

        nu.offset = 8;
        nu.animate.scale = [[0,0,0,0],[1,1,1,0.1]];
        nu.animate.position = [[0,0,100,0],[0,0,-100,1]];
        nu.animate.definitePosition = [[(note.type-0.5)*aside,note.position[1]-5,0,0],[(note.type-0.5)*aside,note.position[1]-5,0,0.3],[0,-4,0,0.5,"easeInOutExpo"]];
        nu.animate.localRotation = [[-rot[0],rot[1],-rot[2],0],[-rot[0],rot[1],-rot[2],0.3],[0,0,0,0.5,"easeInOutExpo"]];
    }

    nu.push();
});

//Grass + Bushes
let wall = new Wall();
wall = new Wall();
wall.duration = 30;
wall.fake = true;
wall.interactable = false;
wall.NJS = 1000;
wall.animate.dissolve = [[0,0],[0,0.05],[1,0.06],[1,0.95],[0,1]];
wall.animate.position = [[0,0,0,0],[0,0,-125,1]];
wall.color = [0,1,0,0.1];
wall.track.value = "grass";
for(let i = 0; i < 512; i++){
    wall.time = i/8;
    wall.localRotation = [rand(-5,10),rand(-10,10),Math.pow(-1,i)*rand(-10,0)];
    wall.animate.definitePosition = [Math.pow(-1,i)*rand(5,50),-2,100];
    wall.scale = [1,rand(30,35),1];
    wall.push();
}

wall = new Wall();
wall.duration = 30;
wall.NJS = 1000;
wall.fake = true;
wall.interactable = false;
wall.animate.dissolve = [[0,0],[0,0.05],[1,0.06],[1,0.95],[0,1]];
wall.track.value = "grass";
for(let i = 0; i < 128; i++){
    const scale = rand(2,3)
    wall.time = i/2;
    wall.animate.localRotation = [[rand(-45,45),rand(-45,45),rand(-45,45),0],[rand(-45,45),rand(-45,45),rand(-45,45),1]];
    wall.animate.definitePosition = [rand(5,50),rand(-2,0),100];
    wall.animate.position = [[1,0,0,0],[1,rand(-0.5,0.5),-125,1]];
    wall.scale = [scale,scale,scale];
    wall.color = [0,rand(0.2,0.7),0.1,-50];
    wall.push();
}
for(let i = 0; i < 128; i++){
    const scale = rand(2,3)
    wall.time = i/2;
    wall.animate.localRotation = [[rand(-45,45),rand(-45,45),rand(-45,45),0],[rand(-45,45),rand(-45,45),rand(-45,45),1]];
    wall.animate.definitePosition = [rand(-50,-7),rand(-2,0),100];
    wall.animate.position = [[0,0,0,0],[0,rand(-0.5,0.5),-125,1]];
    wall.scale = [scale,scale,scale];
    wall.color = [0,rand(0.2,0.7),0.1,-50];
    wall.push();
}

let animtrack = new CustomEvent(0).animateTrack("grass",74);
animtrack.animate.length = 74;
animtrack.animate.dissolve = [
    [0,0],
    [0,16],
    [1,17],
    [1,70],
    [0,74]
];
animtrack.animate.scale = [
    [1,1,1,0],
    [1,1,1,73],
    [0,0,0,74,"easeInExpo"]
];
animtrack.push();

//Rain
wall = new Wall();
wall.fake = true;
wall.interactable = false;
wall.duration = 2;
wall.color = [100,100,100,0];
wall.scale = [0.01,0.5,0.01];
wall.animate.dissolve = [[0,0],[0,0.1],[1,0.2],[1,0.9],[0,1]];
wall.animate.position = [[0,0,0,0],[0,-100,0,1,"easeInSine"]];
for(let i = 0; i < 64/0.025; i++){
    wall.time = i/40;
    wall.animate.definitePosition = [rand(-50,50),90,rand(-5,50)];
    wall.push();
}

//Water
const plane = new Geometry("Plane","Black");
plane.position = [0,-10,-100];
plane.scale = [1000,1,1000];
plane.push();

wall = new Wall();
wall.interactable = false;
wall.fake = true;
wall.scale = [1000,0,1000];
wall.animate.definitePosition = [0,0,0];
wall.animate.position = [[-500,0,-10,0],[-500,0,-110,1]];
wall.duration = 184;
wall.time = 0;
wall.track.value = "water";
wall.push();

animtrack = new CustomEvent(0).animateTrack("water",83);
animtrack.animate.length = 83;
animtrack.animate.color = [
    [0.4,0.6,1,-16,0],
    [0.4,0.6,1,-16,70],
    [0,0,0,-40,74],
    [0,0,0,-40,79],
    [0,0,0,-10,83]
];
animtrack.push();

//The Campfire
const firelogs = 8;
const surroundlogs = 7
wall = new Wall();
wall.track.value = "campfire";
wall.time = 72;
wall.duration = 6;
wall.color = [0.2,0.05,0,0];
wall.animate.dissolve = [[0,0],[1,0.1],[1,0.9],[0,1]];
wall.interactable = false;
wall.fake = true;
for(let i = 0; i < firelogs; i++){
    const pos: Vec3 = rotateuler([rand(0.5,1.2),1,0],[0,i*360/firelogs,0]);
    wall.animate.definitePosition = [pos[0]-1.5,pos[1],pos[2]+10];
    wall.localRotation = [rand(-5,5),(i-1)*360/firelogs,rand(-60,-50)];
    wall.scale = [rand(2,3.5),rand(0.2,0.6),rand(0.2,0.6)];
    wall.push();
}
wall.color = [0.2,0.2,0.2,0]
for(let i = 0; i < surroundlogs; i++){
    const pos: Vec3 = rotateuler([rand(2,3),0,0],[0,i*360/surroundlogs,0]);
    wall.animate.definitePosition = [pos[0]-0.5,pos[1],pos[2]+10];
    wall.localRotation = [0,(i-0.5)*360/surroundlogs,0];
    wall.scale = [rand(0.5,0.7),rand(0.5,0.7),rand(2,3)];
    wall.push();
}

wall = new Wall();
wall.interactable = false;
wall.fake = true;
wall.scale = [1,1,1];
wall.duration = 1;
wall.NJS = 1000;
wall.animate.definitePosition = [-0.5,1,0];
wall.animate.scale = [[0.5,0.5,0.5,0],[0,0,0,1,"easeInSine"]];
wall.animate.dissolve = [[0,0],[1,0.1],[1,0.9],[0,1]];
for(let i = 0; i < 60; i++){
    wall.time = 72+(i/10);
    wall.localRotation = [rand(-90,90),rand(-90,90),rand(-90,90)];
    wall.color = [rand(0.8,2),rand(0.5,0.8),rand(0,0.1),0];
    wall.animate.position = [[rand(-1.5,1.5),rand(-1,-0.9),rand(8.5,11.5),0],[rand(-0.5,0.5),rand(3,5),rand(9.5,10.5),1,"easeInSine"]];
    wall.push();
}
for(let i = 0; i < 24; i++){
    wall.time = 72+(i/4);
    wall.animate.position = [[rand(-1.5,1.5),rand(-1,-0.9),rand(8.5,11.5),0],[rand(-0.5,0.5),rand(3,5),rand(9.5,10.5),1,"easeInSine"]];
    wall.color = [rand(0.8,2),rand(0.5,0.8),rand(0,0.1),0];
    wall.push();
}

//Cobbles
wall = new Wall();
wall.duration = 16;
wall.scale = [1,0.1,1];
wall.interactable = false;
wall.fake = true;
wall.NJS = 2;
wall.offset = 20;
wall.track.value = "cobbles";
wall.animate.dissolve = [[0,0],[1,0.05],[1,0.9],[0,1]];
for(let i = 0; i < 160; i++){
    const color = rand(0.3,0.7);
    wall.time = 84+(i/4);
    wall.color = [color,color,color,0];
    wall.position = [rand(-5,5),0,-10];
    wall.localRotation = [0,rand(-90,90),0];
    wall.push();
}
animtrack = new CustomEvent(60).animateTrack("cobbles",24);
animtrack.animate.dissolve = [[0,0],[0,0.9],[1,1]];
animtrack.push();

//Stars

const numberofstars = 500
const starscale = 2
const star = new Geometry("Sphere","Star");
star.position = [ye,ye,ye];
star.scale = [starscale,starscale,starscale];
for(let i = 0; i < numberofstars; i++){
    star.track = `star${i}`;
    star.push();
}
for(let i = 0; i < numberofstars; i++){
    const xrot = rand(-45,70)
    const pos = rotateuler([0,rand(1000,1500),0],[xrot,0,rand(-90,90)]);
    const start = starscale*rand(0.5,1.5);
    const end = starscale*rand(0.5,1.5)
    animtrack = new CustomEvent(79+(i/numberofstars)).animateTrack(`star${i}`,100);
    animtrack.animate.position = [[pos[0],pos[1],pos[2],0],[pos[0],pos[1],pos[2]-100,1]];
    animtrack.animate.scale = [[start,start,start,0],[end,end,end,1]];
    animtrack.push();
}

//Trees
for(let i = 0; i < 25; i++){
    tree(84+(4*i),[rand(15,35),rand(-20,-1),rand(-10,10)]);
}
for(let i = 0; i < 25; i++){
    tree(84+(4*i),[rand(-20,-40),rand(-20,-1),rand(-10,10)]);
}
animtrack = new CustomEvent(60).animateTrack("trees",24);
animtrack.animate.dissolve = [[0,0],[0,0.9],[1,1]];
animtrack.push();

//Other stuff

const scene = new ModelScene(new Geometry("Cube","Black"));
scene.static("models/Scene");

let env = new Environment("Environment","Contains");
env.position = [ye,ye,ye];
env.push();

env = new Environment("MagicDoorSprite","Contains");
env.position = [0,30,1000];
env.rotation = [90,90,0];
env.scale = [0.1,0.1,0.1];
env.push();

new Event().backLasers().gradient([0,0,0,0],[0,1.5,2,0.5],2,"easeOutSine").push();
new Event(72).backLasers().gradient([0,1.5,2,0.5],[0,0,0,0],2).push();
new Event(84).backLasers().gradient([0,0,0,0],[1,1,1,0.25],2).push();
new Event(121).backLasers().on([2,2,2,2]).push();
new Event(121.1).backLasers().on([0,0,0,0]).push();
new Event(121.2).backLasers().gradient([3,3,3,3],[0,0,0,0],1).push();
new Event(124).backLasers().gradient([0,0,0,0],[1,1,1,0.1],2).push();

env = new Environment("MagicDoorSprite\\.\\[\\d\\]BloomL$","Regex");
env.scale = [99999,99999,99999];
env.push();
env.id = "MagicDoorSprite\\.\\[\\d\\]BloomR$";
env.push();

env = new Environment("DustPS","Contains");
env.active = false;
env.push();

env = new Environment("HighCloudsGenerator","Contains");
env.track = "clouds"
env.scale = [2.5,2.5,2.5];
env.push();

animtrack = new CustomEvent().animateTrack("clouds",4);
animtrack.animate.position = [[0,0,0,0],[0,500,0,1,"easeOutExpo"]];
animtrack.push();

fog.animate.attenuation = [0.00001];
fog.animate.startY = [-10]
fog.push();

//HUD mods

const barScale: Vec3 = [30,30,1];
const barPos: Vec3 = [-350,180,690];
const barRot: Vec3 = [5,-25,-10];
const energyPos: Vec3 = rotateuler([-1.6*barScale[0],0,0],barRot);
env = new Environment("EnergyPanel\\.\\[\\d\\]BarBG$","Regex");
env.position = barPos;
env.scale = barScale;
env.rotation = barRot;
env.push();
env.position = [energyPos[0]+barPos[0],energyPos[1]+barPos[1],energyPos[2]+barPos[2]];
env.id = "\\]EnergyBar$"
env.push();

// new CustomEvent().assignPlayerToTrack("player").push();
// animtrack = new CustomEvent().animateTrack("player");
// animtrack.animate.position = [350,30,350];
// animtrack.push();

env = new Environment("ImmediateRankText","EndsWith");
env.position = [435,30,400];
env.scale = [30,30,1];
env.rotation = [6.33,45,-5.4];
env.push();
env.id = "RelativeScoreText";
const percentPos: Vec3 = rotateuler([0,1,0],[6.33,45,-5.4]);
env.position = [percentPos[0]+435,percentPos[1]+30,percentPos[2]+400];
env.push();


map.save();
copytodir(["ExpertStandard","ExpertPlusStandard"], "C:\\Beat saber stuff\\BSLegacyLauncher\\CustomWIPLevels\\Wet Hands V2",["Aureliona.png"])
if(release){
    map.settings.disableChroma = false;
    map.settings.screenDistortion = true;
    map.settings.disableEnvironmentEnhancements = false;
    map.settings.noHud = false;
    exportZip(["ExpertStandard"]);
}