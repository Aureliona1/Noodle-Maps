import { baseEnvironmentTrack, Color, CustomEvent, Difficulty, ENV, Environment, Event, exportZip, LightID, LightRemapper, rand, RMLog, rotatePoint, setDecimals, Vec3 } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { copytodir, despawner, exportShareableEnv, filterEnvironments, filterGeometry, randArray, Polygon } from "https://deno.land/x/mapkey@1.3.1/src/ReMapper/mod.ts";

const map = new Difficulty("ExpertStandard", "ExpertPlusStandard");
map.customData = null;

// Constants
const release = true;
const ye = -69420

map.geoMaterials["Black"] = {
    "shader": "Standard"
}
map.geoMaterials["Dark"] = {
    "shader": "BTSPillar"
}
map.geoMaterials["Fill"] = {
    "shader": "Standard",
    "color": [1,1,1],
    "shaderKeywords": []
}

baseEnvironmentTrack("Fog");

// Functions

function octStrand(centrepos: Vec3, rotation: Vec3, count: number, scale: number, track?: string){
    const shape = new Polygon("Black",8,20);
    shape.scale = [0,scale,scale];
    shape.rotation = rotation;
    for(let i = 0; i < count; i++){
        if(track){
            shape.iterateTrack = false;
            shape.track = track;
        }
        const pos = rotatePoint([0,(i-(count/2)+0.5)*40,0],rotation);
        shape.position = [pos[0]+centrepos[0],pos[1]+centrepos[1],pos[2]+centrepos[2]];
        shape.push();
    }
}

/**
 * Creates events of type {type} that cycle through colors with HSV.
 * @param time The time to start.
 * @param duration The duration of the cycling.
 * @param density The number of events per beat.
 * @param type The event type.
 * @param alpha The [min,max] alpha of the events. Set to the same value to disable strobing.
 * @param colorStartOffset The hue to start from (will do one full color rotation from this point). 0 = Red, 1/3 = Green, 2/3 = Blue.
 */
function cycleColor(time: number, duration: number, density: number, type: number, alpha: number[], colorStartOffset?: number, id?: LightID){
    for(let i = 0; i < duration*density*2; i++){
        if(colorStartOffset){
            const color = new Color([(i/(duration*density*2))+colorStartOffset,1,1,(i%2)*(alpha[1]-alpha[0])+alpha[0]],"HSV").export();
            const event = new Event(time+(i/(density*2))).backLasers().on(color);
            event.type = type;
            if(id){
                event.lightID = id;
            }
            event.push();
        }
        else{
            const color = new Color([(i/(duration*density*2)),1,1,(i%2)*(alpha[1]-alpha[0])+alpha[0]],"HSV").export();
            const event = new Event(time+(i/(density*2))).backLasers().on(color);
            event.type = type;
            if(id){
                event.lightID = id;
            }
            event.push();
        }
    }
}

// ENV setup

new despawner("Contains",[
    "Clouds",
    "Pillar",
    "GlowLine",
    "TrackMirror",
    "Construction",
],["PlayersPlace"]).push();

let env = new Environment("MagicDoorSprite", "Contains");
env.position = [0,100,1000];
env.scale = [0.1,0.1,0.1];
env.rotation = [0,0,90];
env.push();

env = new Environment("BloomL","EndsWith");
env.scale = [10000,10000,10000];
env.track.value = "DoorBloom"
env.push();
env.id = "BloomR";
env.push();

for(let i = 0; i < 10; i++){
    octStrand([Math.pow(-1,i+1)*240,0,(i*80)+40],[0,0,0],5,6,"oS")//Far towers
}
for(let i = 0; i < 10; i++){
    octStrand([Math.pow(-1,i)*120,0,(i*80)+40],[0,0,0],5,6,"oS")//Close towers
}

let shape = new Polygon("Dark",3,35);// Tunnel
shape.iterateTrack = false;
shape.innercorners = true;
shape.scale = [0,6,6];
for(let i = 0; i < 15; i++){
    shape.track = "tunnel"
    shape.rotation = [0,0,(i/20)*180];
    shape.position = [0,0,i*100];
    shape.push();
}
shape = new Polygon("Fill",3,35);// Fill tunnel
shape.iterateTrack = false;
shape.innercorners = true;
shape.scale = [0,6,6];
for(let i = 0; i < 15; i++){
    shape.track = "fill"
    shape.rotation = [0,0,(i/20)*180];
    shape.position = [0,0,i*100];
    shape.push();
}

env = new Environment("LowCloudsGenerator","Contains");
env.position = [ye,ye,ye];
env.push();
env.duplicate = 1;
env.position = [0,-70,0];
env.scale = [3,3,3];
env.push();
env.position = [0,-80,0];
env.scale = [5,4,5];
env.push();
env.rotation = [0,0,180];
env.position = [0,80,0];
env.push();

env = new Environment(ENV.BTS.SOLID_LASER.ID,"Regex");
env.duplicate = 1;
env.scale = [100,10,10];
env.lightType = 4;
for(let i = 0; i < 10; i++){
    env.position = [Math.pow(-1,i)*120,-200,i*80+40];
    env.lightID = 100+i
    env.push();
}

env = new Environment(ENV.BTS.SOLID_LASER.ID,"Regex");
env.duplicate = 1;
env.track.value = "lineLights";
env.scale = [1,2,1];
env.lightType = 1;
const rotvalsX = new randArray("Hank's Back",[-10,10],100,2).run();
const rotvalsZ = new randArray("12031",[-20,5],100,2).run()
for(let i = 0; i < 25; i++){
    env.position = [Math.pow(-1,i)*rand(50,200),-200,i*20];
    env.lightID = 200+i;
    env.rotation = [rotvalsX[i],0,Math.pow(-1,i)*rotvalsZ[i]];
    env.push();
}

RMLog("Static env done...")
// ENV Animation

const fog = new CustomEvent().animateComponent("Fog");
fog.fog.attenuation = [0.00002];
fog.fog.offset = [100];
fog.fog.startY = [120];
fog.fog.height = [-15];
fog.push();
fog.time = 204;
fog.duration = 2;
fog.fog.attenuation = [[-0.000001,0],[0.00002,1,"easeInOutExpo"]];
fog.fog.startY = [[10,0],[120,1]];
fog.push();
fog.time = 460;
fog.fog.attenuation = [[0.001,0],[0.00002,1,"easeInOutExpo"]];
fog.push();

filterGeometry([["track","fill"]], obj =>{
    //Assign track in the same way as the main tunnel
    const trk: number[] = []
    trk.push(setDecimals(obj.position[0],1));
    trk.push(setDecimals(obj.position[1],1));
    trk.push(setDecimals(obj.position[2],1));
    obj.track.value = trk.toString();
    obj.track.value = `fc${obj.track.value}`;
    obj.position = [ye,ye,ye];
});

filterGeometry([["track","tunnel"]], obj =>{

    //Assign the track based on object position.
    const trk: number[] = []
    trk.push(setDecimals(obj.position[0],1));
    trk.push(setDecimals(obj.position[1],1));
    trk.push(setDecimals(obj.position[2],1));
    obj.track.value = trk.toString();

    //Object values for animation
    const pos = obj.position;
    const rot = obj.rotation;
    const scl = obj.scale;

    //Position values for the fill switches
    const fillval = new randArray(`${trk}`,[0,1],12,0).run();

    //Animate the cubes for the first fill
    let animtrack = new CustomEvent().animateTrack(`fc${obj.track.value}`,610);
    animtrack.animate.length = 610;
    animtrack.animate.position = [
        [ye,ye,ye,0],
        [ye,ye,ye,140,"easeStep"],
        [-pos[0],-pos[1],pos[2],392+(1500-pos[2])/375,"easeStep"], //Fill 2 charge up thingo
        [ye,ye,ye,396,"easeStep"]
    ];
    for(let i = 0; i < 4; i++){ //Fill switches
        if(fillval[i+1] == 1 && fillval[i+1] !== fillval[i]) {
            animtrack.animate.add("position",[[ye,ye,ye,136+i/8,"easeStep"]]);
        }
        else if(fillval[i+1] == 0 && fillval[i+1] !== fillval[i]) {
            animtrack.animate.add("position",[[pos[0],pos[1],pos[2],136+i/8,"easeStep"]]);
        }
    }
    for(let i = 0; i < 7; i++){ //Fill switches
        if(fillval[i+5] == 1 && fillval[i+5] !== fillval[i+4]){
            animtrack.animate.add("position",[[ye,ye,ye,137+i/3,"easeStep"]]);
        }
        else if(fillval[i+5] == 0 && fillval[i+5] !== fillval[i+4]){
            animtrack.animate.add("position",[[pos[0],pos[1],pos[2],137+i/3,"easeStep"]]);
        }
    }
    animtrack.push();
    const randompos1 = new randArray(`${trk}spuds`,[1.1,2],6,2).run()
    const randompos2 = new randArray(`${trk}pos2s`,[0.5,3],4,2).run()
    const randompos3 = new randArray(`${trk}pos3s`,[-100,100],2,1).run()
    animtrack = new CustomEvent().animateTrack(trk.toString(),610);
    animtrack.animate.length = 610;
    animtrack.animate.position = [
        [pos[0],pos[1],pos[2],12],
        [pos[0]*1.5,pos[1]*1.5,pos[2],20,"easeOutExpo"],
        [pos[0],pos[1],pos[2],76,"easeInExpo","splineCatmullRom"],
        [pos[0]*randompos1[0],pos[1]*randompos1[1],pos[2]*randompos1[2],84,"easeOutExpo"],
        [pos[0],pos[1],pos[2],108,"easeInOutSine"],
        [pos[0],pos[1],pos[2],136,"easeStep"],
        [pos[0]*2,pos[1]*2,pos[2],140,"easeStep"],
        [pos[0],pos[1],pos[2]/2,141,"easeInCirc"],
        [pos[0],pos[1],pos[2],142,"easeInCirc"],
        [pos[0],pos[1],pos[2]-(12*100),145],
        [pos[0],pos[1],pos[2],145,"easeStep"],
        [pos[0],pos[1],pos[2],146],
        [pos[0],pos[1],pos[2]-(8*100),148],
        [pos[0],pos[1],pos[2],148,"easeStep"],
        [pos[0]*2,pos[1]*2,pos[2],149,"easeInExpo"],
        [pos[0],pos[1],pos[2],150,"easeOutExpo"],
        [pos[0],pos[1],pos[2]-(12*100),153],
        [pos[0],pos[1],pos[2],153,"easeStep"],
        [pos[0],pos[1],pos[2],154],
        [pos[0],pos[1],pos[2]-(8*100),156],
        [pos[0],pos[1],pos[2],156,"easeStep"],
        [pos[0]*1.5,pos[1]*1.5,pos[2],157,"easeStep"],
        [pos[0],pos[1],pos[2],158,"easeInExpo"],
        [pos[0],pos[1],pos[2]-(12*100),161],
        [pos[0],pos[1],pos[2],161,"easeStep"],
        [pos[0],pos[1],pos[2],162],
        [pos[0],pos[1],pos[2]-(8*100),164],
        [pos[0],pos[1],pos[2],164,"easeStep"],
        [pos[0]/5,pos[1]/5,pos[2]/25,165,"easeInExpo"],
        [pos[0],pos[1],pos[2],166,"easeInExpo"],
        [pos[0],pos[1],pos[2]-(12*100),169],
        [pos[0],pos[1],pos[2],169,"easeStep"],
        [pos[0],pos[1],pos[2],170],
        [pos[0],pos[1],pos[2]*2,170,"easeStep"],
        [pos[0],pos[1],(pos[2]*2)-(6*200),172],
        [-pos[0],-pos[1],pos[2],172,"easeStep"],
        [pos[0],pos[1],pos[2],173,"easeStep"],
        [pos[0],pos[1],pos[2],174],
        [pos[0],pos[1],pos[2]-(12*100),177],
        [pos[0],pos[1],pos[2],177,"easeStep"],
        [pos[0],pos[1],pos[2],178],
        [pos[0],pos[1],pos[2]-(8*100),180],
        [pos[0],pos[1]-1000,pos[2],new randArray(`timerandthingo${trk}`,[180.1,181],1,3).run()[0],"easeInExpo"],
        [pos[0],pos[1],pos[2],181,"easeStep"],
        [pos[0],pos[1],pos[2],182],
        [pos[0],pos[1],pos[2]-(12*100),185],
        [pos[0],pos[1],pos[2],185,"easeStep"],
        [pos[0],pos[1],pos[2],186],
        [pos[0],pos[1],pos[2]-(8*100),188],
        [pos[0]*1.5,pos[1]*1.5,pos[2]-(8*100),188,"easeStep"],
        [pos[0],pos[1],pos[2],190,"easeInOutExpo"],
        [pos[0],pos[1],pos[2]-(12*100),193],
        [pos[0],pos[1],pos[2],193,"easeStep"],
        [pos[0],pos[1],pos[2],194],
        [pos[0],pos[1],pos[2]-(8*100),196],
        [pos[0],pos[1],pos[2],196,"easeStep"],
        [pos[0],pos[1],(pos[2]*2),198,"easeStep"],
        [pos[0],pos[1],(pos[2]*2)-(9*200),201],
        [pos[0],pos[1],pos[2],201,"easeStep"],
        [pos[0],pos[1],pos[2],202],
        [pos[0],pos[1],pos[2]-(8*100),204],
        [pos[0]*1.5,pos[1]*1.5,pos[2],204,"easeStep"],
        [pos[0]*randompos2[0],pos[1]*randompos2[1],pos[2]+randompos3[0],266],
        [pos[0],pos[1],pos[2],268,"easeInOutQuad"],
        [pos[0],pos[1],pos[2],332,"easeStep"],
        [pos[0]*randompos1[3],pos[1]*randompos1[4],pos[2]*randompos1[5],340,"easeOutExpo"],
        [pos[0],pos[1],pos[2],364,"easeInOutSine"],
        [ye,ye,ye,392+(1500-pos[2])/375,"easeStep"], //Fill 2 charge up thingo
        [pos[0]*2,pos[1]*2,pos[2],396,"easeStep"],
        [pos[0],pos[1],pos[2]/2,397,"easeInCirc"],
        [pos[0],pos[1],pos[2],398,"easeInCirc"],
        [pos[0],pos[1],pos[2]-(12*100),401],
        [pos[0],pos[1],pos[2],401,"easeStep"],
        [pos[0],pos[1],pos[2],402],
        [pos[0],pos[1],pos[2]-(8*100),404],
        [pos[0]*2,pos[1]*2,pos[2],404,"easeStep"],
        [pos[0],pos[1],pos[2],406,"easeStep"],
        [pos[0],pos[1],pos[2]-(12*100),409],
        [pos[0],pos[1],pos[2],409,"easeStep"],
        [pos[0],pos[1],pos[2],410],
        [pos[0],pos[1],pos[2]-(8*100),412],
        [-pos[0],-pos[1],pos[2],412,"easeStep"],
        [pos[0],pos[1],pos[2],414,"easeInOutExpo"],
        [pos[0],pos[1],pos[2]-(12*100),417],
        [pos[0],pos[1],pos[2],417,"easeStep"],
        [pos[0],pos[1],pos[2],418],
        [pos[0],pos[1],pos[2]-(8*100),420],
        [pos[0],pos[1],pos[2],420,"easeStep"],
        [pos[0]*1.5,pos[1]*1.5,pos[2],421,"easeInExpo"],
        [pos[0],pos[1],pos[2],422,"easeOutExpo"],
        [pos[0],pos[1],pos[2]-(12*100),425],
        [pos[0],pos[1],pos[2],425,"easeStep"],
        [pos[0],pos[1],pos[2],426],
        [pos[0],pos[1],pos[2]-(8*100),428],
        [-pos[0],-pos[1],pos[2],428,"easeStep"],
        [pos[0],pos[1],pos[2],429,"easeStep"],
        [pos[0],pos[1],pos[2],430],
        [pos[0],pos[1],pos[2]-(12*100),433],
        [pos[0],pos[1],pos[2],433,"easeStep"],
        [pos[0],pos[1],pos[2],434],
        [pos[0],pos[1],pos[2]-(8*100),436],
        [pos[0],pos[1],pos[2],437,"easeInExpo"],
        [pos[0],pos[1],pos[2],438],
        [pos[0],pos[1],pos[2]-(12*100),441],
        [pos[0],pos[1],pos[2],441,"easeStep"],
        [pos[0],pos[1],pos[2],442],
        [pos[0],pos[1],pos[2]-(8*100),444],
        [pos[0],pos[1],pos[2],444,"easeStep"],
        [pos[0],pos[1],pos[2],446],
        [pos[0],pos[1],pos[2]-(12*100),449],
        [pos[0],pos[1],pos[2],449,"easeStep"],
        [pos[0],pos[1],pos[2],450],
        [pos[0],pos[1],pos[2]-(8*100),452],
        [pos[0],pos[1],pos[2],452,"easeStep"],
        [pos[0],pos[1],pos[2]+50,453,"easeOutElastic"],
        [pos[0],pos[1],pos[2],454,"easeInExpo"],
        [pos[0],pos[1],pos[2]-(12*100),457],
        [pos[0],pos[1],pos[2],457,"easeStep"],
        [pos[0],pos[1],pos[2],458],
        [pos[0],pos[1],pos[2]-(8*100),460],
        [pos[0]*1.5,pos[1]*1.5,pos[2],460,"easeStep"],
        [pos[0]*randompos2[2],pos[1]*randompos2[3],pos[2]+randompos3[1],522],
        [pos[0],pos[1],pos[2],524,"easeInOutQuad"],
        [pos[0],pos[1],pos[2],588],
        [pos[0]*2,pos[1]*2,pos[2],600,"easeOutExpo"]

    ];
    for(let i = 0; i < 281; i++){
        const rpos = rotatePoint([pos[0],pos[1],pos[2]],[0,0,-i*180/280])
        animtrack.animate.add("position",[[rpos[0],rpos[1],rpos[2],108+(i/10)]]);
    }
    for(let i = 0; i < 4; i++){ //Fill switches
        if(fillval[i+1] == 0 && fillval[i+1] !== fillval[i]) {
            animtrack.animate.add("position",[[ye,ye,ye,136+i/8,"easeStep"]]);
        }
        else if(fillval[i+1] == 1 && fillval[i+1] !== fillval[i]) {
            animtrack.animate.add("position",[[pos[0],pos[1],pos[2],136+i/8,"easeStep"]]);
        }
    }
    for(let i = 0; i < 7; i++){ //Fill switches
        if(fillval[i+5] == 0 && fillval[i+5] !== fillval[i+4]){
            animtrack.animate.add("position",[[ye,ye,ye,137+i/3,"easeStep"]]);
        }
        else if(fillval[i+5] == 1 && fillval[i+5] !== fillval[i+4]){
            animtrack.animate.add("position",[[pos[0],pos[1],pos[2],137+i/3,"easeStep"]]);
        }
    }
    for(let i = 0; i < 641; i++){
        const rpos = rotatePoint([pos[0],pos[1],pos[2]],[0,0,i*180/640])
        animtrack.animate.add("position",[[rpos[0],rpos[1],rpos[2],268+(i/10)]]);
    }
    for(let i = 0; i < 281; i++){
        const rpos = rotatePoint([pos[0],pos[1],pos[2]],[0,0,-i*180/280])
        animtrack.animate.add("position",[[rpos[0],rpos[1],rpos[2],364+(i/10)]]);
    }
    for(let i = 0; i < 641; i++){
        const rpos = rotatePoint([pos[0],pos[1],pos[2]],[0,0,i*180/640])
        animtrack.animate.add("position",[[rpos[0],rpos[1],rpos[2],524+(i/10)]]);
    }
    const rot90 = new randArray(`${trk}rotspud`,[-90,90],6,1).run()
    const rot360 = new randArray(`${trk}rot360s`,[-360,360],6,1).run()
    animtrack.animate.rotation = [
        [rot[0],rot[1],rot[2],20],
        [rot[0],rot[1],rot[2],76],
        [rot90[0],rot90[1],rot90[2],84,"easeOutExpo"],
        [rot[0],rot[1],rot[2],108,"easeInOutSine"],
        [rot[0],rot[1],rot[2]-90,122],
        [rot[0],rot[1],rot[2]-180,136],
        [rot[0],rot[1],rot[2],136,"easeStep"],
        [rot[0],rot[1],rot[2],149],
        [rot[0],rot[1],rot[2]-180,149.5,"easeOutExpo"],
        [rot[0]+45,rot[1]+45,rot[2]+90,157,"easeStep"],
        [rot[0],rot[1],rot[2],158,"easeStep"],
        [rot[0],rot[1],rot[2],204],
        [rot360[0],rot360[1],rot360[2],266],
        [rot[0],rot[1],rot[2],268,"easeInOutQuad"],
        [rot[0],rot[1],rot[2]+90,300],
        [rot[0],rot[1],rot[2]+180,332],
        [rot[0],rot[1],rot[2],332,"easeStep"],
        [rot90[3],rot90[4],rot90[5],340,"easeOutExpo"],
        [rot[0],rot[1],rot[2],364,"easeInOutSine"],
        [rot[0],rot[1],rot[2]-90,378],
        [rot[0],rot[1],rot[2]-180,392],
        [rot[0],rot[1],rot[2],396,"easeStep"],
        [rot[0],rot[1],rot[2],420],
        [rot[0],rot[1],rot[2]+90,421,"easeInExpo"],
        [rot[0],rot[1],rot[2]+180,422,"easeOutExpo"],
        [rot[0],rot[1],rot[2],422,"easeStep"],
        [rot[0],rot[1],rot[2]+90,445,"easeStep"],
        [rot[0],rot[1],rot[2],446,"easeStep"],
        [rot[0],rot[1],rot[2],460],
        [rot360[3],rot360[4],rot360[5],522],
        [rot[0],rot[1],rot[2],524,"easeInOutQuad"],
        [rot[0],rot[1],rot[2]+90,556],
        [rot[0],rot[1],rot[2]+180,588]
    ];
    const sclr = new randArray(`${trk}sclr`,[0.5,2],3,2).run()
    animtrack.animate.scale = [
        [scl[0],scl[1],scl[2],0],
        [scl[0]*10,scl[1]*2,scl[2],140,"easeStep"],
        [scl[0],scl[1],scl[2]*2,141,"easeInCirc"],
        [scl[0],scl[1],scl[2],142,"easeInCirc"],
        [scl[0],scl[1],scl[2],149],
        [scl[0]/10,scl[1],scl[2],149.5,"easeOutExpo"],
        [scl[0],scl[1],scl[2],150,"easeInExpo"],
        [scl[0]*5,scl[1],scl[2],188,"easeStep"],
        [scl[0],scl[1],scl[2],190,"easeInOutExpo"],
        [scl[0]/10,scl[1],scl[2],196,"easeStep"],
        [scl[0],scl[1],scl[2],198,"easeOutBack"],
        [scl[0],scl[1],scl[2],204],
        [scl[0]*sclr[0],scl[1]*sclr[1],scl[2]*sclr[2],266],
        [scl[0],scl[1],scl[2],268,"easeInOutQuad"],
        [scl[0]*10,scl[1]*2,scl[2],396,"easeStep"],
        [scl[0],scl[1],scl[2]*2,397,"easeInCirc"],
        [scl[0],scl[1],scl[2],398,"easeInCirc"],
        [scl[0],scl[1],scl[2],404],
        [scl[0]*2,scl[1],scl[2],405,"easeInExpo"],
        [scl[0],scl[1],scl[2],406,"easeStep"],
        [scl[0],scl[1],scl[2],412],
        [0,scl[1],scl[2],413,"easeInExpo"],
        [scl[0],scl[1],scl[2],414,"easeOutExpo"],
        [scl[0]/2,scl[1],scl[2],445,"easeStep"],
        [scl[0],scl[1],scl[2],446,"easeStep"]
    ];
    //Secondary chorus 2 pulses
    for(let i = 0; i < 31; i++){
        animtrack.animate.add("scale",[
            [scl[0],scl[1],scl[2],459+(i*2)],
            [scl[0],scl[1]*1.1,scl[2]*1.1,460+(i*2),"easeInExpo"],
            [scl[0],scl[1],scl[2],461+(i*2),"easeOutCirc"]
        ]);
    }
    //Buildup pulses
    for(let i = 0; i < 16; i++){
        animtrack.animate.add("scale",[
            [scl[0],scl[1]*1.5,scl[2]*1.5,108+i,"easeStep"],
            [scl[0],scl[1],scl[2],108.9+i]
        ]);
        animtrack.animate.add("scale",[
            [scl[0],scl[1]*1.5,scl[2]*1.5,124+i/2,"easeStep"],
            [scl[0],scl[1],scl[2],124.45+i/2]
        ]);
        animtrack.animate.add("scale",[
            [scl[0],scl[1]*1.5,scl[2]*1.5,132+i/4,"easeStep"],
            [scl[0],scl[1],scl[2],132.24+i/4]
        ]);
        animtrack.animate.add("scale",[
            [scl[0],scl[1]*1.5,scl[2]*1.5,364+i,"easeStep"],
            [scl[0],scl[1],scl[2],364.9+i]
        ]);
        animtrack.animate.add("scale",[
            [scl[0],scl[1]*1.5,scl[2]*1.5,380+i/2,"easeStep"],
            [scl[0],scl[1],scl[2],380.45+i/2]
        ]);
        animtrack.animate.add("scale",[
            [scl[0],scl[1]*1.5,scl[2]*1.5,388+i/4,"easeStep"],
            [scl[0],scl[1],scl[2],388.24+i/4]
        ]);
    }
    animtrack.push();
});

RMLog("Tunnel animation done...")

filterGeometry([["track","oS"]],(obj) =>{
    const dtime = rand(392,394);
    const scl = obj.scale;
    const pos = obj.position;
    const rot = obj.rotation;
    const trk: number[] = []
    trk.push(setDecimals(obj.position[0],1));
    trk.push(setDecimals(obj.position[1],1));
    trk.push(setDecimals(obj.position[2],1));
    obj.track.value = trk.toString();
    if(
        setDecimals(obj.rotation[2],0) == -45 ||
        setDecimals(obj.rotation[2],0) == -135 ||
        setDecimals(obj.rotation[2],0) == -225 ||
        setDecimals(obj.rotation[2],0) == -315
        ) {
        const animtrack = new CustomEvent().animateTrack(trk.toString(),610);
        animtrack.animate.length = 610;
        const posr = new randArray(`${trk}pos1s`,[1.1,2],2,3).run()
        animtrack.animate.position = [
            [pos[0],pos[1],pos[2],dtime],
            [pos[0],-200,pos[2],dtime+2,"easeInExpo"],
            [pos[0],pos[1],pos[2],396,"easeStep"],
            [pos[0],pos[1],pos[2],460],
            [pos[0]*posr[0],pos[1]*posr[1],pos[2]+new randArray(`${trk}aposthingo`,[-50,50],1,2).run()[0],522],
            [pos[0],pos[1],pos[2],524,"easeInOutQuad"]
        ];
        const rot90 = new randArray(`${trk}rot90s`,[-90,90],3,1).run()
        animtrack.animate.rotation = [
            [rot[0],rot[1],rot[2],460],
            [rot90[0],rot90[1],rot90[2],522],
            [rot[0],rot[1],rot[2],524,"easeInOutQuad"]
        ];
        animtrack.animate.scale = [
            [scl[0],scl[1],scl[2],0],
            [scl[0],scl[1]*2,scl[2]*10,396,"easeStep"],
            [scl[0],scl[1],scl[2],397,"easeInExpo"],
            [scl[0]*5,scl[1],scl[2],429,"easeOutSine"],
            [scl[0]*5,scl[1],scl[2],588],
            [scl[0],scl[1],scl[2],600,"easeOutExpo"]
        ];
        animtrack.push();
    }
    else if(setDecimals(obj.rotation[2],0) == 0) {
        const animtrack = new CustomEvent().animateTrack(trk.toString(),610);
        animtrack.animate.length = 610;
        const posr = new randArray(`${trk}pos1s`,[1.1,2],2,3).run()
        animtrack.animate.position = [
            [pos[0],pos[1],pos[2],dtime],
            [pos[0],-200,pos[2],dtime+2,"easeInExpo"],
            [pos[0],pos[1],pos[2],396,"easeStep"],
            [pos[0],pos[1],pos[2],460],
            [pos[0]*posr[0],pos[1]*posr[1],pos[2]+new randArray(`${trk}aposthingo`,[-50,50],1,2).run()[0],522],
            [pos[0],pos[1],pos[2],524,"easeInOutQuad"]
        ];
        const rot90 = new randArray(`${trk}rot90s`,[-90,90],3,1).run()
        animtrack.animate.rotation = [
            [rot[0],rot[1],rot[2],460],
            [rot90[0],rot90[1],rot90[2],522],
            [rot[0],rot[1],rot[2],524,"easeInOutQuad"]
        ];
        animtrack.animate.scale = [
            [scl[0],scl[1],scl[2],0],
            [scl[0],scl[1]*2,scl[2]*10,396,"easeStep"],
            [scl[0],scl[1],scl[2],397,"easeInExpo"],
            [scl[0],scl[1],scl[2],429],
            [scl[0]*4,scl[1],scl[2],460,"easeOutSine"],
            [scl[0]*4,scl[1],scl[2],588],
            [scl[0],scl[1],scl[2],600,"easeOutExpo"]
        ]
        animtrack.push();
    }
    else {
        const animtrack = new CustomEvent().animateTrack(trk.toString(),610);
        animtrack.animate.length = 610;
        const posr = new randArray(`${trk}pos1s`,[1.1,2],2,3).run()
        animtrack.animate.position = [
            [pos[0],pos[1],pos[2],dtime],
            [pos[0],-200,pos[2],dtime+2,"easeInExpo"],
            [pos[0],pos[1],pos[2],396,"easeStep"],
            [pos[0],pos[1],pos[2],460],
            [pos[0]*posr[0],pos[1]*posr[1],pos[2]+new randArray(`${trk}aposthingo`,[-50,50],1,2).run()[0],522],
            [pos[0],pos[1],pos[2],524,"easeInOutQuad"]
        ];
        const rot90 = new randArray(`${trk}rot90s`,[-90,90],3,1).run()
        animtrack.animate.rotation = [
            [rot[0],rot[1],rot[2],460],
            [rot90[0],rot90[1],rot90[2],522],
            [rot[0],rot[1],rot[2],524,"easeInOutQuad"]
        ];
        animtrack.push();
    }
});

RMLog("octStrand animation done...")

const animtrack = new CustomEvent().animateTrack("DoorBloom",610);
animtrack.animate.length = 610;
animtrack.animate.scale = [
    [0,0,0,0],
    [100,100,100,12],
    [10000,10000,10000,76,"easeOutSine"],
    [10000,10000,10000,266],
    [100,100,100,268,"easeOutQuad"],
    [100,100,100,332],
    [10000,10000,10000,364,"easeOutExpo"],
    [10000,10000,10000,392],
    [0,0,0,396,"easeInExpo"],
    [10000,10000,10000,396,"easeStep"]
];
animtrack.push();

let llight = 0;
filterEnvironments([["track","lineLights"]], env =>{
    env.track.value = `ll${env.position[2]}`;
    const rot = env.rotation;
    const pos = env.position;
    const animtrack = new CustomEvent().animateTrack(env.track.value,610);
    animtrack.animate.length = 610;
    animtrack.animate.position = [
        [pos[0],pos[1],pos[2],0],
        [Math.pow(-1,llight)*100,-200,pos[2],392,"easeStep"],
        [0,pos[1],pos[2],396+llight/100,"easeStep"],
        [Math.pow(-1,llight)*100,-200,pos[2],460,"easeOutSine"],
        [Math.pow(-1,llight)*rand(100,300),-200,pos[2]+rand(-50,50),522],
        [Math.pow(-1,llight)*100,-200,pos[2],524,"easeInOutQuad"]
    ]
    animtrack.animate.rotation = [
        [rot[0],rot[1],rot[2],0],
        [rot[0],rot[1],rot[2],206],
        [rand(-20,20),rand(-20,20),0,268],
        [rot[0],rot[1],rot[2],268,"easeStep"],
        [0,0,Math.pow(-1,llight)*-5,392,"easeStep"],
        [0,0,0,396,"easeStep"],
        [0,0,0,428],
        [0,0,Math.pow(-1,llight)*-5,460,"easeOutSine"],
        [rand(-20,20),rand(-20,20),0,522],
        [0,0,Math.pow(-1,llight)*-5,524,"easeInOutQuad"]
    ];
    animtrack.push();
    llight++
})

RMLog("Env animation done...")

// Events

/*

Event types:

World light = 0; (backlasers)
Pillar lasers = 4; (centerlasers)
Little line lasers = 1; (ringlights)

*/


//World Light Events
for(let i = 0; i < 110; i++){
    new Event(i/10).backLasers().on([1,0.4,0.2,setDecimals(Math.pow((i/55),1.5),3)]).push();
}
new Event(12.5).backLasers().in([1,0.2,0.1,3]).push();
new Event(76).backLasers().in([1.1,1,1,3]).push();

for(let i = 0; i < 28; i++){ //Buildup
    for(let j = 0; j < 40; j++){
        new Event(108+i+(j/40)).backLasers().on([1,1,1,setDecimals(1+Math.pow((40-j)/40,2)*3,3)]).push();
    }
}

for(let i = 0; i < 8; i++){ //Fill
    const color = new Color([(i+1)/8,1,1,(i%2)*3],"HSV").export();
    new Event(136+(i/16)).backLasers().on(color).push();
}
for(let i = 0; i < 7; i++){
    const color = new Color([1,(7-i)/7,1,3],"HSV").export();
    new Event(137+(i/3)).backLasers().on(color).push();
}

new Event(140).backLasers().on([1,0,0,3]).push(); //The Drop
new Event(141).backLasers().on([1,1,1,3]).push();
new Event(142).backLasers().in([0,1,0,3]).push();
for(let i = 0; i < 3; i++){
    cycleColor(142+(i*8),3,4,0,[0.5,3],1/3);
    cycleColor(146+(i*8),2,4,0,[0.5,3],1/3);
}
new Event(145).backLasers().on([1,0,0,3]).push();
new Event(148).backLasers().on([1,0,0,3]).push();
new Event(149).backLasers().on([1,1,1,3]).push();
new Event(150).backLasers().in([0,1,0,3]).push();
new Event(153).backLasers().on([1,0,0,3]).push();
new Event(156).backLasers().on([1,0,0,3]).push();
new Event(157).backLasers().on([1,1,1,3]).push();
new Event(161).backLasers().on([1,0,0,3]).push();
new Event(164).backLasers().on([1,0,0,3]).push();
new Event(165).backLasers().on([0.5,0,1,3]).push();
new Event(166).backLasers().in([0,1,0,3]).push();
cycleColor(166,3,4,0,[0.5,3],1/3);
new Event(169).backLasers().on([1,0,0,3]).push();
cycleColor(170,2,3,0,[3,3],1/3);
for(let i = 0; i < 2; i++){
    for(let j = 0; j < 10; j++){
        new Event(172+i).backLasers().on([1,0,0,1+Math.pow((10-j)/10,2)*2]).push();
    }
}
for(let i = 0; i < 3; i++){
    cycleColor(174+(i*8),3,4,0,[0.5,3],1/3);
    cycleColor(178+(i*8),2,4,0,[0.5,3],1/3);
}
new Event(177).backLasers().on([1,0,0,3]).push();
new Event(180.5).backLasers().in([0,0,0,0]).push();
new Event(181).backLasers().on([1,0,0,3]).push();
new Event(185).backLasers().on([1,0,0,3]).push();
new Event(188).backLasers().on([1,0,0,3]).push();
new Event(190).backLasers().in([1,0,0,1]).push();
new Event(193).backLasers().on([1,0,0,3]).push();
new Event(196).backLasers().on([1,0,0,3]).push();
new Event(198).backLasers().in([0,1,0,3]).push();
cycleColor(198,3,3,0,[3,3],1/3);
new Event(201).backLasers().on([1,0,0,3]).push();
cycleColor(202,2,4,0,[0.5,3],1/3);
new Event(204).backLasers().on([0,0,0,0]).push();
new Event(206).backLasers().in([1,0,0,3]).push();

let event = new Event(226).backLasers().in([0,1,0,3]); //Secondary chorus
event.lerpType = "HSV";
event.push();
event.time = 246;
event.color = [0,0,1,3];
event.push();
event.time = 266;
event.color = [1,0,0,3];
event.push();
new Event(268).backLasers().in([1,1,1,1]).push();
new Event(268).backLasers().on([1,0.2,0,2]).push();

new Event(332).backLasers().on([1,1,1,3]).push(); //Buildup
for(let i = 0; i < 28; i++){
    for(let j = 0; j < 40; j++){
        new Event(364+i+(j/40)).backLasers().on([1,1,1,setDecimals(1+Math.pow((40-j)/40,2)*3,3)]).push();
    }
}
new Event(392).backLasers().on([1,1,1,5]).push();
new Event(396).backLasers().in([1,0.4,0.1,0]).push();

new Event(396).backLasers().on([1,0,0,3]).push();
new Event(397).backLasers().on([1,1,1,3]).push();
new Event(398).backLasers().in([0,1,0,3]).push();
for(let i = 0; i < 8; i++){
    cycleColor(398+(i*8),3,4,0,[0.5,3],1/3);
    cycleColor(402+(i*8),2,4,0,[0.5,3],1/3);
}
new Event(401).backLasers().on([1,0,0,3]).push();
new Event(404).backLasers().on([1,0,0,3]).push();
new Event(405).backLasers().on([1,1,1,3]).push();
new Event(406).backLasers().in([0,1,0,3]).push();
new Event(409).backLasers().on([1,0,0,3]).push();
new Event(412).backLasers().on([1,0,0,3]).push();
new Event(413).backLasers().on([1,1,1,3]).push();
new Event(417).backLasers().on([1,0,0,3]).push();
new Event(420).backLasers().on([1,0,0,3]).push();
new Event(421).backLasers().on([0.5,0,1,3]).push();
new Event(422).backLasers().in([0,1,0,3]).push();
new Event(425).backLasers().on([1,0,0,3]).push();
for(let i = 0; i < 2; i++){
    for(let j = 0; j < 10; j++){
        new Event(428+i).backLasers().on([1,0,0,1+Math.pow((10-j)/10,2)*2]).push();
    }
}
new Event(433).backLasers().on([1,0,0,3]).push();
new Event(436).backLasers().on([1,1,1,3]).push();
new Event(437).backLasers().on([1,0,0,3]).push();
new Event(441).backLasers().on([1,0,0,3]).push();
new Event(444).backLasers().on([1,0,0,3]).push();
new Event(446).backLasers().in([1,0,0,1]).push();
new Event(449).backLasers().on([1,0,0,3]).push();
new Event(452).backLasers().on([1,0,0,3]).push();
new Event(454).backLasers().in([0,1,0,3]).push();
new Event(457).backLasers().on([1,0,0,3]).push();
new Event(460).backLasers().on([0,0,0,0]).push();
new Event(462).backLasers().in([1,0,0,3]).push();
event = new Event(482).backLasers().in([0,1,0,3])
event.lerpType = "HSV";
event.push();
event.time = 502;
event.color = [0,0,1,3];
event.push();
event.time = 522;
event.color = [1,0,0,3];
event.push();
new Event(524).backLasers().in([1,1,1,1]).push();
new Event(524).backLasers().on([1,1,1,3]).push();

event = new Event(588).backLasers().in([1,0,0,7]);
event.easing = "easeInExpo";
event.push();
event = new Event(594).backLasers().in([0.4,0.6,1,7]);
event.easing = "easeOutSine";
event.push();

//Bass laser events

for(let i = 0; i < 24; i++){
    for(let j = 0; j < 15*4; j++){
        new Event(12+(i*4)+(j/15)).centerLasers().on([1.5,0.2,0.1,(j%2)*0.1+0.5]).push();
    }
}
new Event(108).centerLasers().in([0,0,0,0]).push();
for(let i = 0; i < 4; i++){
    const id = Math.floor(rand(1,10));
    new Event(136+i/8).centerLasers().on([1,1,1,0.5],100+id).push();
    new Event(136+(i+1)/8).centerLasers().off(100+id).push();
}
for(let i = 0; i < 7; i++){
    const fillval = [];
    for(let j = 0; j < 10; j++){
        fillval.push(Math.floor(rand(0,10))%2);
    }
    for(let j = 0; j < 10; j++){
        if(fillval[j] == 1){
            new Event(137+i/3).centerLasers().on([1,1,1,1],100+j).push();
        }
        else{
            new Event(137+i/3).centerLasers().off(100+j).push();
        }
    }
}
new Event(140).centerLasers().in([0,0,0,0]).push();
new Event(140).centerLasers().on([1,1,1,1]).push();
new Event(180).centerLasers().on([1,1,1,1]).push();
new Event(181).centerLasers().in([0,0,0,0]).push();
new Event(181).centerLasers().on([1,1,1,1]).push();
new Event(204).centerLasers().on([1,0,0,2]).push();
event = new Event(226).centerLasers().in([0,1,0,1]); //Secondary chorus
event.lerpType = "HSV";
event.push();
event.time = 246;
event.color = [0,0,1,1];
event.push();
event.time = 266;
event.color = [1,0,0,1];
event.push();
new Event(266).centerLasers().on([1,1,1,0.5]).push();
new Event(268).centerLasers().in([0,0,0,0]).push();
for(let i = 0; i < 16; i++){
    for(let j = 0; j < 15*4; j++){
        new Event(268+(i*4)+(j/15)).centerLasers().on([1.5,0.2,0.1,(j%2)*0.1+0.5]).push();
    }
}
new Event(364).centerLasers().in([0,0,0,0]).push();
new Event(396).centerLasers().on([1,1,1,1]).push();
new Event(460).centerLasers().off().push();
for(let i = 0; i < 16; i++){
    for(let j = 0; j < 15*4; j++){
        new Event(524+(i*4)+(j/15)).centerLasers().on([1,1,1,(j%2)*0.1+0.5]).push();
    }
}

// Line Laser Events

new LightRemapper().addCondition(x => x.type == 2 && x.time < 76).addProcess(x =>{
    const id = Math.floor(rand(200,225));
    new Event(x.time).ringLights().on([1,0,0,1],id).push();
    new Event(x.time + x.json.customData.color[0]*2).ringLights().in([0,0,0,0],id).push(); // CM shortens "customData" to "cd", so the raw JSON version of lightID needs to be used
    x.value = 0;
}).run();
for(let i = 0; i < 236; i++){
    const id = []
    for(let i = 0; i < 4; i++){
        id.push(Math.floor(rand(200,225)))
    }
    new Event(76+i/4).ringLights().on([1,1,1,1],id).push();
    new Event(77+i/4).ringLights().in([0,0,0,0],id).push();
}
new Event(206).ringLights().on([1,0,0,1]).push();
event = new Event(226).ringLights().in([0,1,0,1]); //Secondary chorus
event.lerpType = "HSV";
event.push();
event.time = 246;
event.color = [0,0,1,1];
event.push();
event.time = 266;
event.color = [1,0,0,1];
event.push();
new Event(268).ringLights().in([0,0,0,0]).push();
new LightRemapper().addCondition(x => x.type == 2 && x.time >= 268 && x.time < 332).addProcess(x =>{
    const id = [];
    for(let i = 0; i < rand(10,20); i++){
        id.push(Math.floor(rand(200,225)))
    }
    new Event(x.time).ringLights().on([1,0,0,1],id).push();
    new Event(x.time + x.json.customData.color[0]).ringLights().in([1,0,0,0],id).push();
    x.value = 0;
}).run();
for(let i = 0; i < 236; i++){
    const id = []
    for(let i = 0; i < 4; i++){
        id.push(Math.floor(rand(200,225)))
    }
    new Event(332+i/4).ringLights().on([1,1,1,1],id).push();
    new Event(333+i/4).ringLights().in([0,0,0,0],id).push();
}
new Event(392).ringLights().on([1,1,1.2,1.5]).push();
new Event(396).ringLights().in([0,0,0,0]).push();
new Event(397).ringLights().on([1,1,1,1]).push();

for(let i = 0; i < 8; i++){ // i = every 8 beat group
    for(let j = 0; j < 5; j++){ // j = Each single beat in the 8 beat group
        for(let k = 0; k < 25; k++){ // k = each lightId over the single beat.
            const color = new Color([(j/2.5)%1, 1, 1, 2],"HSV").export();
            if(j < 3){
                new Event(398+i*8+j+k/100).ringLights().on(color,224-k).push();
                new Event(399+i*8+j+k/100).ringLights().in([color[0],color[1],color[2],1],224-k).push();
            }
            else{
                new Event(399+i*8+j+k/100).ringLights().on(color,224-k).push();
                new Event(400+i*8+j+k/100).ringLights().in([color[0],color[1],color[2],1],224-k).push();
            }
        }
    }
}
new Event(460).ringLights().in([0,0,0,0]).push();
new Event(462).ringLights().in([1,0,0,5]).push();
event = new Event(482).ringLights().in([0,1,0,5])
event.lerpType = "HSV";
event.push();
event.time = 502;
event.color = [0,0,1,5];
event.push();
event.time = 522;
event.color = [1,0,0,5];
event.push();
new Event(524).ringLights().in([0,0,0,0]).push();
new LightRemapper().addCondition(x => x.type == 2 && x.time >= 524).addProcess(x =>{
    const id = Math.floor(rand(200,225))
    new Event(x.time).ringLights().on([1,1,1,2],id).push();
    if(x.time + x.json.customData.color[0]*2 < 588){
        new Event(x.time + x.json.customData.color[0]*2).ringLights().in([0,0,0,0],id).push();
    }
    else {
        new Event(x.time + x.json.customData.color[0]).ringLights().in([0,0,0,0],id).push();
    }
    x.value = 0;
}).run();
new Event(588).ringLights().on([1,1,1,1]).push();

RMLog("Events done...")

// Settings

map.suggest("Chroma");
map.colorLeft = [1,0.5,0.5];
map.colorRight = [0.4,0.4,0.4]
map.save();
copytodir(["ExpertStandard","ExpertPlusStandard"],"C:\\Beat saber stuff\\BSLegacyLauncher\\CustomWIPLevels\\Hank's Back");
if(release){
    exportZip(["ExpertStandard"]);
    exportShareableEnv({author:"Aurellis",name:"B_Triangle_S Environment"})
}