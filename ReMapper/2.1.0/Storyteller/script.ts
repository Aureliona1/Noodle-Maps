/*
Ok fine, I came up with lore.

It is the peak of humanity as a species.
Most humans live offworld in colonies, scattered around the solar system and the Kuiper belt.
Back on Earth, a single city remains. While considered "old fashioned" the city is very productive and self-sufficient.

For many years, an equilibrium is held where Earth city sends food and resources to the offworld colonies. And in return, the colonies send back technology and information.
However, one year, the outermost colony doesn't send back its annual bounty.
An attempt at contact is made, but to no avail.
The next year, a closer colony, situated on one of Saturn's moons, goes dark without a trace.
One by one, all of the colonies go dark until Earth is the only one left.
Without communication and support, the people of Earth city panic. Evacuating en masse.
The world-wide evacuation causes severe damage to the city and to the planet. Eventually resulting in the almost complete destruction of human resources.

One trace of humanity remains however.
A secret organisation, hidden underground, had predicted the catastrophic downfall of humanity, and constructed a failsafe.
A drone to be sent out into space with a record all of human history, technology, and genetic code.

In the final days of earth, the group release their drone, now known as "Storyteller", into the cosmos.
It is unknown whether or not it will reach it's destination.
*/

/*
TODO

Nothing!
EVERYTING >:)

*/
import { makeNoise2D } from "https://deno.land/x/open_simplex_noise@v2.5.0/mod.ts";
import { Difficulty, Environment, CustomEvent, rand, Vec3, Geometry, notesBetween, Event, setDecimals, ModelScene, Note, Wall, exportZip } from "https://deno.land/x/remapper@2.1.0/src/mod.ts"

const map = new Difficulty("ExpertStandard.dat", "ExpertPlusStandard.dat");
map.customData = null

// Declared constants

const release = true
const noise2D = makeNoise2D(Date.now());
const ye = -69420

map.geoMaterials["Black"] = {
    _shader: "Standard",
    _color: [0,0,0,1],
};



new CustomEvent().assignTrackParent(["lnotes","rnotes","bombs"],"player").push();
new CustomEvent().assignTrackParent(["sun"],"player", true).push();
new CustomEvent().assignPlayerToTrack("player").push();
new CustomEvent().assignFogTrack("fog").push();

const fog  = new CustomEvent().animateTrack("fog",395);
fog.animate.length = 395;

// Functions
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
    return result

}
function sunangle(sunY: number, sunZ: number){
    return setDecimals(180*(Math.acos(sunZ/Math.sqrt(Math.pow(sunY,2) + Math.pow(sunZ,2))))/Math.PI,3)
}

function yeet(id: Array<string>,){
    id.forEach((env) =>{
        const yeet = new Environment(env, "Contains");
        yeet.position = [ye,ye,ye];
        yeet.push();
    })
    console.log(`[INFO]  Yeeting stuff (${id.length} Environments yote)`)
}
function remove(ids: string[], regex = false) {
    const env = new Environment(undefined, regex ? "Regex" : undefined);
    env.active = false;

    ids.forEach(x => {
        env.id = x;
        env.push();
    })
}
function cityscape(time: number, duration: number, xlayers: number, zlayers: number, id: number, entry?: boolean, reuse?: boolean){
    /**
     * Makes a city lookin thing with animated buildings
     * @param time When to bring the objects in
     * @param duration How long the city should stay around for, also affects animation speed
     * @param xlayers How many layers along the x axis
     * @param zlayers How many layers along the z axis
     * @param id The number at the start of every track for the buildings. Also used if "reuse" is active
     * @param entry Whether or not to use the one-time entry animation, specific to this song. Otherwise, the buildings just appear.
     * @param reuse If true, skips spawning in new objects and just adds animation for existing ones with the same id. id must be the same as an existing call. xlayers and zlayers must be less than or equal to their corresponding values in the first call.
     */

    const track = `cityscape${id}`

    const cube = new Geometry("Cube","Black");
    for (let zlayer = 0; zlayer < zlayers; zlayer++){
        for (let xlayer = 0; xlayer < xlayers; xlayer++){
            
            const height: number = (noise2D(xlayer,zlayer)*100)+400
            const pos: Vec3 = [(xlayer*50)-(xlayers*25)+23.5,0,(zlayer*40)+7]
            const cubetrack = `${track}.${xlayer}.${zlayer}`

            if(!reuse){
                cube.scale = [20,height,20];
                cube.track = cubetrack;
                cube.push()
            }

            let animTrack = new CustomEvent(0).animateTrack(cubetrack);
            animTrack.animate.position = [ye,ye,ye];
            animTrack.push();

        
            if(entry == true){
                animTrack = new CustomEvent(time).animateTrack(cubetrack, ((2*zlayer)/zlayers)+(duration/4));
                animTrack.animate.position = [[pos[0], (pos[2]/50), 50, 0], [pos[0], -300, pos[2], 1, "easeOutQuad"]];
                animTrack.animate.rotation = [[0, 0, ((pos[0]/50)/xlayers)*-90, 0], [0, 0, 0, 1, "easeOutSine"]];
                animTrack.push();

                animTrack = new CustomEvent(time+((2*zlayer)/zlayers)+(duration/4)).animateTrack(cubetrack,(duration*3)/4);
                animTrack.animate.position = [[pos[0], -300, pos[2], 0], [pos[0], rand(-400,-200), pos[2],1]];
                animTrack.push();

                animTrack = new CustomEvent(time+duration).animateTrack(cubetrack);
                animTrack.animate.position = [ye,ye,ye];
                animTrack.push();
            }
            else {
                animTrack = new CustomEvent(time).animateTrack(cubetrack, duration);
                animTrack.animate.length = duration;
                animTrack.animate.position = [[pos[0], -300, pos[2], 0], [pos[0], rand(-400,-200), pos[2], duration]];
                animTrack.animate.rotation = [0,0,0];
                animTrack.push();

                animTrack = new CustomEvent(time+duration).animateTrack(cubetrack);
                animTrack.animate.position = [ye,ye,ye];
                animTrack.push();
            }
        }
    }
    console.log(`[INFO]  Added Cityscape (${xlayers*zlayers} Environments)`)
}

function dyncity(time: number, duration: number, xlayers: number, zlayers: number, heightmin: number, heightmax: number, destroy? :boolean){

    const cube = new Geometry("Cube","Black");
    const entrydenom = 50
    for (let zlayer = 0; zlayer < zlayers; zlayer++){
        for (let xlayer = 0; xlayer < xlayers; xlayer++){
            
            const height: number = rand(heightmin,heightmax)+300;
            const pos: Vec3 = [(xlayer*100)-((xlayers-1)*50),0,(zlayer*100)+7]
            const cubetrack = `dyncity.${zlayer}.${xlayer}`

            cube.scale = [40,height,40];
            cube.track = cubetrack;
            cube.position = [ye,ye,ye];
            cube.push();
            
            let animTrack = new CustomEvent(time).animateTrack(cubetrack, (zlayer/zlayers)*(duration-1));
            animTrack.animate.position = [[(pos[0]*Math.abs(pos[0])/entrydenom), (Math.abs(Math.pow(pos[0]/entrydenom,2)*entrydenom*2)), pos[2], 0], [pos[0], (Math.abs(pos[0]/2)-300+((zlayer*100)/zlayers)), pos[2], 1, "easeOutSine"]];
            animTrack.animate.rotation = [[0, 0, ((pos[0]/50)/xlayers)*-90, 0], [0, 0, 0, 1, "easeOutSine"]];
            animTrack.push();
            
            if(destroy){
                animTrack = new CustomEvent(time+(duration-1)).animateTrack(cubetrack, 1);
                animTrack.animate.position = [[pos[0], (Math.abs(pos[0]/2)-300+((zlayer*100)/zlayers)), pos[2], 0, "easeOutQuad"], [(Math.pow(-1,Math.floor(rand(0,100)))*rand(300,700)), rand(0,200) ,pos[2] ,1,"easeOutCirc"]];
                animTrack.animate.rotation = [[0, 0, 0, 0], [rand(-45,45),rand(-45,45),rand(-45,45),1,"easeOutCirc","splineCatmullRom"]];
                animTrack.animate.scale = [[40,height,40,0],[rand(20,40),rand(height/2,height),rand(20,40),1,"easeOutElastic"]];
                animTrack.push();
            }

            animTrack = new CustomEvent(time+duration+((2*zlayer)/zlayers)).animateTrack(cubetrack);
            animTrack.animate.position = [ye,ye,ye];
            animTrack.push();
        }
    }
    console.log(`[INFO]  Added Dynamic Cityscape (${xlayers*zlayers} Environments)`)
}

function vertcity(time: number, duration: number, ylayers: number, zlayers: number, spread: number, heightmin: number){
    /**
     * Creates two "cities" on either side of the player     
     * @param time When to spawn the cities
     * @param duration How long the animation goes for
     * @param ylayers The number of layers along the y axis
     * @param zlayers The number of layers along the z axis
     * @param spread How far apart the cities are. Also affects the length of the buildings.
     * @param heightmin The minimum length for the buildings in their animation
     */
    const track = "vertcity"
    const cube = new Geometry("Cube","Black");
    for(let ylayer = 0; ylayer < ylayers; ylayer++){
        for(let zlayer = 0; zlayer < zlayers; zlayer++){

            const pos: Vec3 = [-spread,(ylayer*40)-((ylayers-1)*20),(zlayer*40)+7];
            const cubetrack = `${track}.0.${ylayer}.${zlayer}`;

            cube.track = cubetrack;
            cube.position = [ye,ye,ye];
            cube.push();

            const animtrack = new CustomEvent(time).animateTrack(cubetrack,duration);
            animtrack.animate.length = duration;
            animtrack.animate.position = [[pos[0],pos[1],pos[2],0],[ye,ye,ye,duration,"easeStep"]];
            animtrack.animate.rotation = [[0,0,rand(-180,180),0],[0,0,0,1,"easeOutSine"]];
            for(let i = 0; i < duration+1; i++){
                const scale = heightmin+((noise2D(ylayer,zlayer-i)+1)*0.5*(spread-heightmin))
                animtrack.animate.add("_scale", [[scale,20,20,i,"easeOutQuint"]])
            }
            animtrack.push();

        }
    }
    for(let ylayer = 0; ylayer < ylayers; ylayer++){
        for(let zlayer = 0; zlayer < zlayers; zlayer++){

            const pos: Vec3 = [spread,(ylayer*40)-((ylayers-1)*20),(zlayer*40)+7];
            const cubetrack = `${track}.1.${ylayer}.${zlayer}`;

            cube.track = cubetrack;
            cube.push();

            const animtrack = new CustomEvent(time).animateTrack(cubetrack,duration);
            animtrack.animate.length = duration;
            animtrack.animate.position = [[pos[0],pos[1],pos[2],0],[ye,ye,ye,duration,"easeStep"]];
            animtrack.animate.rotation = [[0,0,rand(-180,180),0],[0,0,0,1,"easeOutSine"]];
            for(let i = 0; i < duration+1; i++){
                const scale = heightmin+((noise2D(ylayer+ylayers,zlayer-i)+1)*0.5*(spread-heightmin))
                animtrack.animate.add("_scale", [[scale,20,20,i,"easeOutQuint"]])
            }
            animtrack.push();


        }
    }
    console.log(`[INFO]  Added Vertical City (${2*ylayers*zlayers} Environments)`)
}
function cubelasers(time: number, duration: number, xlayers: number, zlayers: number, laserwidth: number, id: number, rotate_randomly?: boolean, reuse?: boolean){
    /**
     * Floaty cube thing with lasers
     * @param time When to spawn the cube thingo
     * @param duration How long the animation goes for
     * @param xlayers The number of layers along the x axis
     * @param zlayers The number of layers along the z axis
     * @param laserwidth The highest value for x (and lowest for the left side) that lasers will spawn on top of the cubes for
     * @param id Multiple uses, the value at the start of the track (change this for every time you call the function so they don't overlap), also used if you are using reuse.
     * @param rotate_randomly The animation at the start of the map.
     * @param reuse Skips spawning in new cubes and just creates new animations for existing cubes. id must be the same as an existing startcube call. xlayers, zlayers, and laserwidth must be less than or equal to their corresponding values in the first call.
     */
    const laser = new Environment("s\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]\\w+\\.\\[\\d+\\]\\w+$", "Regex");
    laser.duplicate = 1;
    const cube = new Geometry("Cube", "Black");
    cube.scale = [5,5,5];
    cube.position = [ye,ye,ye];
    for(let xlayer = 0; xlayer < xlayers; xlayer++){
        for(let zlayer = 0; zlayer < zlayers; zlayer++){
            const posy = 10*(noise2D(xlayer,zlayer)-1)
            const pos2y = 10*(noise2D(xlayer,zlayer+zlayers)-1)
            const pos: Vec3 = [(xlayer*20)-((xlayers*20)/2)+10,0,(zlayer+1)*20];
            const cubetrack = `startcube.${id}.${xlayer}.${zlayer}`
            
            if(!reuse){
                cube.track = cubetrack;
                cube.push();
            }

            let animtrack = new CustomEvent(time).animateTrack(cubetrack,duration);
            animtrack.animate.position = [[pos[0],posy,pos[2],0],[pos[0],pos2y,pos[2],1]];
            animtrack.push();
    
            animtrack = new CustomEvent(time+duration).animateTrack(cubetrack);
            animtrack.animate.position = [ye,ye,ye];
            animtrack.push();
            
            if(Math.abs(pos[0]) < laserwidth){
                const lasertrack = `startlaser.${id}.${xlayer}.${zlayer}`
                
                if(reuse != true){
                    laser.track = lasertrack;
                    laser.position = [ye,ye,ye];
                    laser.push();
                }

                animtrack = new CustomEvent(time).animateTrack(lasertrack, duration);
                animtrack.animate.length = duration;
                if(rotate_randomly == true){
                    for(let k = 0; k < duration*4; k++){
                        animtrack.animate.add("_rotation", [[rand(-18,2),0,rand(-15,15),k/4,"easeStep"]]);
                    }
                }
                animtrack.animate.position = [[pos[0],(posy+4),pos[2],0],[pos[0],(pos2y+4),pos[2],32]];
                animtrack.push();
    
                animtrack = new CustomEvent(time+duration).animateTrack(lasertrack);
                animtrack.animate.position = [ye,ye,ye];
                animtrack.push();
            }
            
        }
    }
    console.log(`[INFO]  Added Cube Lasers (${xlayers*zlayers} Cubes, ${zlayers*(laserwidth/10)} Lasers)`)
}
function descent(time: number, duration: number, width: number, xlayers: number, ylayers: number){
    /**
     * Kinda like vertcity, but a bit different
     * @param time When to spawn it
     * @param duration How long it goes for
     * @param width How far apart the two sides are along the x axis
     * @param xlayers How many layers along the x axis
     * @param ylayers How many layers along the y axis
     */
    const cube = new Geometry("Cube","Black");
    const track = `descent${Math.random()}`
    cube.scale = [10,20,2000];
    cube.position = [ye,ye,ye];
    
    const laser = new Environment("Environment.\\[\\d+\\]\\w+.\\[\\d+\\]NeonTubeDirectionalL$","Regex");
    laser.duplicate = 1;
    laser.scale = [1,1000,1];
    laser.position = [ye,ye,ye];
    laser.push();

    for(let i = 0; i < 2; i++){
        for(let ylayer = 0; ylayer < ylayers; ylayer++){
            const pos: Vec3 = [(width)*(((i+1)*2)-3),ylayer*width,0];
            const lasertrack = `${track}.${ylayer}.${i}.laser`

            const animtrack = new CustomEvent(time).animateTrack(lasertrack,duration);
            for(let j = 0; j < duration-1; j++){
                animtrack.animate.add("_position",[[setDecimals(pos[0]*rand(0.5,1),2),pos[1],pos[2],setDecimals((j+1)/duration,5),"easeInOutSine"]])
            }
            animtrack.animate.add("_position",[[pos[0],pos[1],pos[2],0,"easeStep"],[ye,ye,ye,1,"easeStep"]]);
            animtrack.animate.rotation = [90,0,0];
            animtrack.push();

            laser.track = lasertrack
            laser.push();
        }
    }
    for(let xlayer = 0; xlayer < xlayers/2; xlayer++){
        for(let ylayer = 0; ylayer < ylayers; ylayer++){
            const cubetrack = `${track}.${xlayer}.${ylayer}r`
            if(xlayer%2 == 0){
                const pos: Vec3 = [width+((xlayer/2)*width),(ylayer*width)+(width/2),0];
                
                const animtrack = new CustomEvent(time).animateTrack(cubetrack,duration);
                animtrack.animate.length = duration;
                animtrack.animate.position = [[pos[0],pos[1],1000,0],[ye,ye,ye,duration,"easeStep"]];
                for(let i = 0; i < duration; i++){
                    animtrack.animate.add("_scale",[[15,22,2000,i],[10,20,2000,i+0.99,"easeOutSine"]]);
            }
            animtrack.push();                
            }
            else{
                const pos: Vec3 = [width+((xlayer/2)*width),(ylayer*width)+width,0];
                
                const animtrack = new CustomEvent(time).animateTrack(cubetrack,duration);
                animtrack.animate.length = duration;
                animtrack.animate.position = [[pos[0],pos[1],1000,0],[ye,ye,ye,duration,"easeStep"]];
                for(let i = 0; i < duration; i++){
                    animtrack.animate.add("_scale",[[15,22,2000,i],[10,20,2000,i+0.99,"easeOutSine"]]);
                }
                animtrack.push();
            }

            cube.track = cubetrack;
            cube.push();
        }
    }
    for(let xlayer = 0; xlayer < xlayers/2; xlayer++){
        for(let ylayer = 0; ylayer < ylayers; ylayer++){
            const cubetrack = `${track}.${xlayer}.${ylayer}l`
            if(xlayer%2 == 0){
                const pos: Vec3 = [-width-((xlayer/2)*width),(ylayer*width)+(width/2),0];
                
                const animtrack = new CustomEvent(time).animateTrack(cubetrack,duration);
                animtrack.animate.length = duration;
                animtrack.animate.position = [[pos[0],pos[1],1000,0],[ye,ye,ye,duration,"easeStep"]];
                for(let i = 0; i < duration; i++){
                    animtrack.animate.add("_scale",[[15,22,2000,i],[10,20,2000,i+0.99,"easeOutSine"]]);
            }
            animtrack.push();                
            }
            else{
                const pos: Vec3 = [-width-((xlayer/2)*width),(ylayer*width)+width,0];
                
                const animtrack = new CustomEvent(time).animateTrack(cubetrack,duration);
                animtrack.animate.length = duration;
                animtrack.animate.position = [[pos[0],pos[1],1000,0],[ye,ye,ye,duration,"easeStep"]];
                for(let i = 0; i < duration; i++){
                    animtrack.animate.add("_scale",[[15,22,2000,i],[10,20,2000,i+0.99,"easeOutSine"]]);
                }
                animtrack.push();
            }

            cube.track = cubetrack;
            cube.push();
        }
    }
    console.log(`[INFO]  Added Descent (${(xlayers*ylayers)+(2*ylayers)} Environments)`)
}
function traffic1(time: number, duration: number, lanes: number, cars: number, lanespacing: number, carspacing: number, traveldistance: number, id: number, reuse?: boolean){
    /**
     * Creates forwards moving "traffic" with buildings on either side
     * @author Aurellis
     * @param time When to spawn it
     * @param duration How long it should go for
     * @param lanes How many lanes of traffic should there be
     * @param cars How many cars per lane
     * @param lanespacing The gap beyween each lane, including car width
     * @param carspacing The gaps between cars within a single lane, including the car length
     * @param traveldistance How far the cars should go
     * @param id The id for track and reuse purposes
     * @param reuse Skips spawning new cubes and reuses those with the same id, needs <= lanes and cars values.
     */
    const cube = new Geometry("Cube","Black");
    cube.position = [ye,ye,ye];
    for(let lane = 0; lane < lanes; lane++){
        const moveamount = rand(traveldistance*0.5,traveldistance*1.5)
        for(let car = 0; car < cars; car++){
            const pos: Vec3 = [(lane*lanespacing)-((lanes*lanespacing)/2)+(lanespacing/2),-30,(car*carspacing)-((cars*carspacing)/2)+(carspacing/2)];
            const cartrack = `traffic1.${id}.${lane}.${car}`;

            if(!reuse){
                cube.track = cartrack;
                cube.push();
            }

            const animtrack = new CustomEvent(time).animateTrack(cartrack,duration);
            animtrack.animate.position = [[pos[0],pos[1],pos[2],0],[pos[0],pos[1],(pos[2]+moveamount),1],[ye,ye,ye,1,"easeStep"]];
            animtrack.animate.scale = [[rand(10,20),rand(10,20),rand(20,30),0],[rand(10,20),rand(10,20),rand(20,30),1]];
            animtrack.push();

        }
    }
    for(let pillarrow = 0; pillarrow < 2; pillarrow++){
        for(let pillar = 0; pillar < traveldistance/50; pillar++){
            const pos: Vec3 = [Math.pow(-1,pillarrow)*((lanespacing*(lanes/2))+40),0,pillar*100];
            const pilltrack = `traffic1.${id}.pill${pillarrow}.${pillar}`
            
            if(reuse != true){
                cube.track = pilltrack;
                cube.push();
            }

            const animtrack = new CustomEvent(time).animateTrack(pilltrack,duration);
            animtrack.animate.position = [[pos[0],pos[1],pos[2],0],[ye,ye,ye,1,"easeStep"]];
            animtrack.animate.scale = [40,1000,40];
            animtrack.push();
        }
    }
    console.log(`[INFO]  Added Traffic 1 (${(lanes*cars)+(traveldistance/25)} Environments)`)
}
function upwardsTraffic(time: number, duration: number, xlim: Array<number>, zlim: Array<number>, height: number, totalcars: number, id: number, reuse?: boolean){
    /**
     * Spawns random traffic moving upwards
     * @author Aurellis
     * @param time When to spawn the cars
     * @param duration How long should the animation go for
     * @param xlim The bounds for the cars to spawn within (this will be mirrored to the negative x axis as well), e.g. [50,100] will create a group of cars between 50 and 100, and another between -50 and -100
     * @param zlim The bounds for the cars to spawn within (z axis), e.g. [0,100]
     * @param height The y value that the cars will aim for in their lifetime
     * @param totalcars How many cars to spawn
     * @param id A numbered id used for track and reuse
     * @param reuse Skips spawning cubes and just creates animations for existing cubes (only for other upwardsTraffic calls), totalcars must be <= the previous call
     */
    const cube = new Geometry("Cube","Black");
    cube.position = [ye,ye,ye];
    for(let car = 0; car < totalcars; car++){
        const track = `upwards${id}.${car}`
        const pos = [Math.pow(-1,car)*rand(xlim[0],xlim[1]),-200,rand(zlim[0],zlim[1])];
        if(!reuse){
            cube.track = track;
            cube.push();
        }
        const animtrack = new CustomEvent(time).animateTrack(track,duration);
        animtrack.animate.position = [
            [ye,ye,ye,0],
            [pos[0],pos[1],pos[2],(car/totalcars)*0.75],
            [pos[0],rand(height*0.9,height*1.1),pos[2],0.25+((car/totalcars)*0.75)],
            [ye,ye,ye,0.25+((car/totalcars)*0.75),"easeStep"]
        ];
        animtrack.animate.scale = [[rand(10,20),rand(10,20),rand(20,30),0],[rand(10,20),rand(10,20),rand(20,30),1]];
        animtrack.animate.rotation = [-90,0,0];
        animtrack.push();
        
    }
    console.log(`[INFO]  Added Upwards Traffic (${totalcars} Environments)`)
}
function flashcharge(time: number, duration: number, maxcolor: number){
    const density = 40;
    new Event(time).centerLasers().gradient([1,0,0,0],[1,0,0,maxcolor/2],duration).push();
    for(let i = 0; i < duration*density; i++){
        new Event(time+(i/density)).ringLights().on([
            (i/(duration*density))*maxcolor,
            0,
            0,
            i%2
        ]).push();
    }
}
function water(time: number, duration: number, position: Vec3, movez?: number){
    const pos = position
    const wall = new Wall()
    wall.fake = true;
    wall.interactable = false;
    wall.color = [0.1,0.1,0.11,5];
    wall.scale = [500,0.5,5000];
    wall.animate.scale = [10,1,2];
    wall.animate.dissolve = [[0,0],[1,1/(duration+1),"easeStep"],[0,1,"easeStep"]]
    wall.time = time-1;
    wall.duration = duration+1;
    if(movez){
        wall.animate.definitePosition = [[pos[0],pos[1],pos[2],0],[pos[0],pos[1],pos[2]+movez,1]];
    }
    else{
        wall.animate.definitePosition = [[pos[0],pos[1],pos[2],0],[pos[0],pos[1],pos[2],1]];
    }
    wall.push();
}
// Player animations

const player = new CustomEvent(0).animateTrack("player",395);
player.animate.length = 395;
player.animate.position = [
    [0,0,0,0],
    [0,0,0,64],
    [0,20,400,94,"easeOutSine"],
    [0,0,0,100,"easeStep"],
    [0,200,5000,131,"splineCatmullRom"],
    [0,200,4000,132,"easeOutExpo"],
    [0,-100,500,133,"easeStep"],
    [0,0,0,164],
    [0,0,0,172],
    [0,10,0,180,"easeInSine"],
    [0,1000,0,180,"easeStep"],
    [0,400,0,212],
    [0,0,0,212,"easeStep"],
    [0,0,0,216],
    [0,0,1000,248],
    [0,0,900,264],
    [0,0,0,264,"easeStep"],
    [0,0,-500,280,"easeOutSine"],
    [0,0,0,280,"easeStep"],
    [0,100,-200,288],
    [0,0,0,288,"easeStep"],
    [0,200,1000,311],
    [0,0,500,313,"easeStep"],
    [0,0,0,344],
    [0,200,200,344,"easeStep"],
],
player.push();

// Note Mod Stuff

notesBetween(0,395,(note) =>{
    if(note.type == 0){
        note.track.add("lnotes");
    }
    if(note.type == 1){
        note.track.add("rnotes");
    }
    else{
        note.track.add("bombs")
    }
});

let animtrack = new CustomEvent(0).animateTrack("lnotes",32);
animtrack.track.add("rnotes");
animtrack.animate.position = [[0,100,0,0],[0,0,0,1,"easeStep"]];
animtrack.push();

notesBetween(0,32,(note) =>{
    note.animate.position = [0,-100,0];
    if(note.type == 0){
        note.animate.rotation = [[-20,-10,0,0],[0,0,0,0.5]];
    }
    else{
        note.animate.rotation = [[-20,10,0,0],[0,0,0,0.5]];
    }
    note.offset = 5;
});
notesBetween(32,33,(note) =>{
    note.animate.position = [0,-100,0];
    if(note.type == 0){
        note.animate.rotation = [[-20,-10,0,0],[0,0,0,0.5]];
    }
    else{
        note.animate.rotation = [[-20,10,0,0],[0,0,0,0.5]];
    }
    note.offset = 5;
    const x = new Note(note.time,note.type,note.direction);
    x.track.value = note.track.value;
    x.offset = 5;
    x.fake = true;
    x.interactable = false;
    x.position = note.position;
    for(let i = 0; i < 8; i++){
        x.animate.dissolve = [0];
        x.animate.dissolveArrow = [[1,0],[0,0.49,"easeStep"]];
        x.animate.rotation = [[-20,(note.type-0.5)*20,0,0],[0,0,0,0.5]];
        x.animate.position = [[rand(-2,2),rand(-102,-98),rand(-2,2),0],[0,-100,0,0.45]]
        x.push();
    }
});
notesBetween(33,64,(note) =>{
    note.animate.position = [[0,-50,0,0],[0,0,0,0.5,"easeOutSine"]];
    note.animate.rotation = [[30,0,0,0],[0,0,0,0.5,"easeOutSine"]];
    note.animate.scale = [[0.1,0.1,0.1,0],[1,1,1,0.45]];
    note.offset = 5;
    note.track.value = "hideme"
});

animtrack = new CustomEvent(0).animateTrack("hideme",32);
animtrack.animate.dissolve = [[0,0],[1,1,"easeStep"]];
animtrack.animate.dissolveArrow = [[0,0],[1,1,"easeStep"]];
animtrack.push();

notesBetween(64,93,(note) =>{
    if(note.track.has("lnotes")){
        note.animate.position = [[-2,rand(-2,2),0,0],[0,0,0,0.3,"easeInQuart"]]
    }
    else if(note.track.has("rnotes")){
        note.animate.position = [[2,rand(-2,2),0,0],[0,0,0,0.3,"easeInQuart"]]
    }
    note.offset = 1;
})
notesBetween(93,94,(note) =>{
    note.offset = 5;
    note.animate.dissolve = [[0.9,0],[0.95,1]];
    note.animate.dissolveArrow = [[0.5,0],[1,1]];
})
notesBetween(100,101,(note) =>{
    const x = new Note(note.time,note.type,note.direction);
    x.interactable = false;
    x.fake = true;
    x.track.value = note.track.value;
    for(let i = 0; i < 10; i++){
        if(note.type != 3){
            x.animate.position = [rand(0,5)*(note.type-0.5)*2,rand(-5,5),rand(-2,2)];
        }
        else{
            x.animate.position = [rand(-5,5),rand(-5,5),rand(-2,2)];
        }
        x.animate.dissolve = [[0,0],[0.1,0.1],[0.05,1]];
        x.animate.dissolveArrow = [0];
        x.animate.scale = [[0,0,0,0],[10,10,10,1]];
        x.push();
    }
});
notesBetween(134,164,(note) =>{
    note.track.add("down")
});

animtrack = new CustomEvent(133).animateTrack("down",30);
animtrack.animate.length = 31;
animtrack.animate.rotation = [[0,0,0,0],[10,0,0,1,"easeOutSine"],[0,0,0,30]];
animtrack.push();

notesBetween(164,165,(note) =>{
    const x = new Note(note.time,note.type,note.direction);
    x.interactable = false;
    x.fake = true;
    x.track.value = note.track.value;
    for(let i = 0; i < 10; i++){
        if(note.type != 3){
            x.animate.position = [rand(0,5)*(note.type-0.5)*2,rand(-5,5),rand(-2,2)];
        }
        else{
            x.animate.position = [rand(-5,5),rand(-5,5),rand(-2,2)];
        }
        x.animate.dissolve = [[0,0],[0.1,0.1],[0.05,1]];
        x.animate.dissolveArrow = [0];
        x.animate.scale = [[0,0,0,0],[10,10,10,1]];
        x.push();
    }
});

notesBetween(290,313,(note) =>{
    if(note.type == 3){
        note.animate.rotation = [[-5,rand(-10,10),0,0],[-5,0,0,0.5,"easeOutSine"]];
    }
    else{
        note.animate.rotation = [[-5,(note.type-0.5)*20,0,0],[-5,0,0,0.5,"easeOutSine"]];
    }
    note.animate.position = [[0,0,100,0],[0,0,0,0.4,"easeInCubic"]];
    note.animate.scale = [[0,0,0,0],[1,1,1,0.4,"easeInCubic"]]
    note.track.add("hideme2")
    note.offset = 3;
});
animtrack = new CustomEvent(283).animateTrack("hideme2",5);
animtrack.animate.dissolve = [[0,0],[1,1,"easeStep"]];
animtrack.animate.dissolveArrow = [[0,0],[1,1,"easeStep"]];
animtrack.push();

animtrack = new CustomEvent(263).animateTrack("lnotes",2);
animtrack.track.add("rnotes");
animtrack.animate.rotation = [[0,0,0,0],[-20,0,0,1,"easeInOutSine"]];
animtrack.push();
animtrack.time = 276;
animtrack.duration = 4;
animtrack.animate.rotation = [[-20,0,0,0],[0,0,0,1]];
animtrack.push();

notesBetween(280,395,(note)=>{
    if(note.type == 0){
        note.color = [0.6,0.6,0.6,1];
    }
    if(note.type == 1){
        note.color = [0.5,1,0.7,1];
    }
})

animtrack = new CustomEvent(344).animateTrack("lnotes");
animtrack.animate.color = [0.8,0.75,0.7,1];
animtrack.push();
animtrack.track.value = "rnotes";
animtrack.animate.color = [0.8,0.9,1,1];
animtrack.push();

notesBetween(345,395,(note)=>{
    if(note.type == 3){
        note.animate.rotation = [[rand(-5,0),rand(-10,10),0,0],[0,0,0,0.45,"easeOutSine"]];
    }
    else{
        note.animate.rotation = [[rand(-5,0),(note.type-0.5)*20,0,0],[0,0,0,0.45,"easeOutSine"]];
    }
    note.animate.scale = [[0,0,0,0],[1,1,1,0.4,"easeInSine"]]
    note.animate.position = [[0,0,100,0],[0,0,0,0.4,"easeInSine"]];
    note.offset = 4;
    note.track.add("hideme3")
});
animtrack = new CustomEvent(340).animateTrack("hideme3",4);
animtrack.animate.dissolve = [[0,0],[1,1,"easeStep"]];
animtrack.animate.dissolveArrow = [[0,0],[1,1,"easeStep"]];
animtrack.push();

// Environment Stuff

yeet([
    "Mountains",
    "LeftRail",
    "RightRail",
    "LeftFarRail1",
    "LeftFarRail2",
    "RightFarRail1",
    "RightFarRail2",
    "NarrowGameHUD",
    "RailingFullBack",
    "RailingFullFront",
    "LastRailingCurve",
    "LightRailingSegment",
    "Clouds",
    "BottomPairLasers",
    "Rain",
    "Sun",
    "BigSmokePS"
]);

remove([
    "WaterRainRipples",
    "RectangleFakeGlow",
    "Mirror",
    "Waterfall"
]);

let env = new Environment("PlayersPlace","Contains")
env.track = "pp";
env.push();

animtrack = new CustomEvent(264).animateTrack("pp");
animtrack.animate.position = [ye,ye,ye];
animtrack.push();

env = new Environment("Rain","EndsWith");
env.track = "rain";
env.duplicate = 1;
env.lightID = 69;
env.push();

animtrack = new CustomEvent(0).animateTrack("rain",395);
    animtrack.animate.length = 395;
    animtrack.animate.scale = [
        [40,50,40,0]
    ];
    animtrack.animate.position = [
        [-50,100,200,0],
        [ye,ye,ye,100,"easeStep"],
        [-50,100,200,133,"easeStep"],
        [ye,ye,ye,180,"easeStep"],
        [0,100,200,313,"easeStep"],
        [0,400,200,344,"easeStep"]
    ];
    animtrack.animate.rotation = [
        [5,1,-10,0],
        [0,0,-180,179,"easeStep"],
        [5,1,-10,180,"easeStep"],
        [0,0,0,313,"easeStep"]
    ];
animtrack.push();

env = new Environment("Sun","EndsWith");
env.position = [ye,ye,ye];
env.scale = [0.1,0.1,0.1];
env.track = "sun"
env.push();


animtrack = new CustomEvent(0).animateTrack("sun",395);
animtrack.animate.length = 395;
animtrack.animate.position = [
    [0,100,1000,0],
    [0,400,1000,216,"easeStep"],
];
animtrack.push();

env = new Environment("BackgroundGradient","Contains");
env.active = false;
env.push();

env = new Environment("Clouds", "Contains");
env.track = "Clouds";
env.push();

animtrack = new CustomEvent(0).animateTrack("Clouds",395);
animtrack.animate.length = 395;
animtrack.animate.position = [
    [ye,ye,ye,0],
    [0,1000,0,40,"easeStep"],
    [0,50,0,48,"easeOutSine"],
    [0,50,0,92],
    [0,1000,0,99,"easeInSine"],
    [ye,ye,ye,99,"easeStep"],
    [0,50,0,164,"easeStep"],
    [ye,ye,ye,179,"easeStep"],
    [0,-100,0,212,"easeStep"],
    [0,50,0,216],
    [ye,ye,ye,216,"easeStep"],
    [0,100,0,264,"easeStep"],
    [ye,ye,ye,280,"easeStep"],
];
animtrack.animate.scale = [15,15,15];
animtrack.push();

//Burning object

const star = new Environment("LightRail\\w+\\.\\[\\d+\\]Neon\\w+L$","Regex");
star.track = "star"
star.scale = [0.1,0.1,0.1];
star.position = [ye,ye,ye]
star.duplicate = 1;
star.lightID = 420;
star.push();

animtrack = new CustomEvent(355.75).animateTrack("star",8);
animtrack.animate.position = [[500,1000,1000,0],[-500,500,4000,1,"splineCatmullRom"]];
animtrack.push();

const burnfreq = 50
for(let i = 0; i < burnfreq*8; i++){
    const value = ((burnfreq*8)-i)/(burnfreq*8)
    new Event(355.75+(i/burnfreq)).ringLights().on([5*value,2*Math.pow(value,2),0,(i%2)+2.5],420).push();
}

//Scenes

cubelasers(0,32,10,16,40,1,true);
cityscape(32,67,10,15,1,true);
dyncity(100,32,6,50,-100,100,true);
vertcity(133,31,20,20,100,10);
cityscape(164,16,10,15,1,false,true);
descent(180,32,50,4,100);
cubelasers(212,4,20,20,40,2);
traffic1(216,48,4,300,30,60,2000,1);
const scene = new ModelScene(new Geometry("Cube","Black"));
scene.animate([
    ["models/t2", 264, 16],
    ["models/t3", 280, 8],
    ["models/t4", 288, 23, (object) =>{
        const time = rand(0,1)
        const pos = [rand(-1000,1000),rand(0,1000),rand(1000,2500)]
        const animtrack = new CustomEvent(311).animateTrack(object.track.value,2);
        animtrack.animate.position = [[pos[0],pos[1],pos[2],0],[pos[0],pos[1],pos[2],time],[pos[0],pos[1]-rand(200,300),pos[2],1,"easeInExpo"],[ye,ye,ye,1,"easeStep"]];
        animtrack.push();
    }],
]);
upwardsTraffic(313,31,[100,500],[0,1500],1000,500,1);


for (let i = 0; i < 10; i++){
    const cube = new Geometry("Cube","Black");
    cube.position = [((i*300)-1350),0,5500];
    cube.track = "pylons"
    cube.scale = [100,5000,100];
    cube.push();
}

animtrack = new CustomEvent(133).animateTrack("pylons");
animtrack.animate.position = [ye,ye,ye];
animtrack.push();

for(let i = 0; i < 10; i++){
    for(let j = 0; j < 15; j++){
        //Green/White destroy
        const animtrack = new CustomEvent(179).animateTrack(`cityscape1.${i}.${j}`);
        animtrack.animate.position = rotateuler([0,rand(-500,500),rand(300,1000)],[0,rand(-90,90),0]);
        animtrack.animate.rotation = [rand(-45,45),rand(-45,45),rand(-45,45)];
        animtrack.push();

        //Traffic 2 buildings
        animtrack.time = 264;
        animtrack.duration = 16;
        animtrack.animate.position = [[rand(200,1000)*Math.pow(-1,i), rand(-500,500), rand(-700,500),0],[rand(100,500)*Math.pow(-1,i), rand(-900,100), rand(-1000,200),1],[ye,ye,ye,1,"easeStep"]];
        animtrack.animate.rotation = [[rand(-45,45),rand(-45,45),rand(-45,45),0],[0,0,0,1,"easeOutQuint"]];
        animtrack.push();

        //upwards traffic bits and pieces
        //path
        animtrack.time = 313;
        animtrack.duration = 31;
        if(i == 0){
            animtrack.animate.position = [[0,-10,j*100,0],[ye,ye,ye,1,"easeStep"]];
            animtrack.animate.rotation = [[0,rand(-10,10),rand(-1,1),0],[rand(-2,2),rand(-10,10),rand(-5,5),1]];
            animtrack.animate.scale = [rand(10,20),rand(9,10),rand(70,95)];
            animtrack.push();
        }
        //tower
        animtrack.duration = 82;
        if(i == 1 && j == 0){
            animtrack.animate.position = [0,0,2000];
            animtrack.animate.rotation = [0,45,0];
            animtrack.animate.scale = [100,2000,100];
            animtrack.push();
        }
        //floaty bits around the tower
        if(i > 0 && j > 0 && i < 6){
            const floatyrot: Vec3 = [0,rand(-180,180),0]
            const floatypos = rotateuler([rand(150,500),0,0],floatyrot);
            animtrack.animate.position = [[floatypos[0],rand(200,1950),floatypos[2]+2000,0],[floatypos[0],rand(200,1950),floatypos[2]+2000,1]];
            animtrack.animate.rotation = floatyrot;
            animtrack.animate.scale = [20,50,20];
            animtrack.push();
        }
        //Buildings
        if(i > 5 && i < 10){
            const pos: Vec3 = [rand(200,1000)*Math.pow(-1,i), rand(-100,500), rand(1500,0)];
            animtrack.animate.position = pos;
            animtrack.animate.rotation = [0,0,0];
            animtrack.push();
            animtrack.time = 372.5;
            animtrack.duration = 4;
            animtrack.animate.position = [[pos[0],pos[1],pos[2],0],[pos[0],-500,pos[2],1,"easeInCirc"]];
            animtrack.animate.rotation = [[0,0,0,0],[rand(-45,45),rand(-45,45),rand(-45,45),1,"easeInCirc"]];
            animtrack.push();
            animtrack.time = 383.5+(j/30);
            animtrack.animate.position = [rand(200,1000)*Math.pow(-1,i), rand(-100,500), rand(1500,0)];
            animtrack.animate.rotation = [0,0,0];
            animtrack.push();
        }
    }
}

water(179,1,[0,0,-100]);
water(212,3,[0,-10,-100],-4);
water(313,82,[0,-5,-100],-10);


for(let i = 0; i < 2; i++){
    for(let j = 0; j < 40; j++){
        animtrack = new CustomEvent(248).animateTrack(`traffic1.1.pill${i}.${j}`,rand(7,9));
        animtrack.animate.position = [
            [Math.pow(-1,i)*100,0,j*100,0],
            [Math.pow(-1,i)*rand(500,1000),rand(100,500),j*100,0.9,"easeOutExpo"]
        ];
        animtrack.animate.rotation = [
            [0,0,0,0],
            [rand(-45,45),rand(-45,45),rand(-20,20),1,"easeOutExpo"]
        ];
        animtrack.push();

        animtrack = new CustomEvent(264).animateTrack(`traffic1.1.pill${i}.${j}`);
        animtrack.animate.position = [ye,ye,ye];
        animtrack.push();
    }
}

//Walls
const wall = new Wall();
for(let i = 0; i < 100; i++){
    const pos: Vec3 = [Math.pow(-1,i)*rand(30,100),0,rand(100,2000)];
    wall.time = 313+(31*i/100);
    wall.duration = 4;
    wall.animate.dissolve = [[0,0],[0,0.01],[1,0.5],[0,1,"easeInExpo"]];
    wall.scale = [5,rand(10,20),0];
    wall.localRotation = [0,rand(-45,45),0];
    wall.fake = true;
    wall.interactable = false;
    wall.animate.definitePosition = [[pos[0],pos[1],pos[2],0],[pos[0],pos[1]+rand(10,50),pos[2],1,"easeOutSine"]];
    wall.color = [10,11,10,100];
    wall.track.value = "floatywalls";
    wall.push();
}

animtrack = new CustomEvent(344).animateTrack("floatywalls");
animtrack.animate.dissolve = [0];
animtrack.push();

//Fog

fog.animate.attenuation = [
    [0.002,0],
    [0.0005,32],
    [0.00005,40,"easeOutSine"],
    [0.00005,92],
    [0.001,94],
    [0.00001,99],
    [0.0001,133,"easeStep"],
    [0.00001,164,"easeStep"],
    [0.000001,212,"easeStep"],
    [0.00001,216,"easeInQuad"],
    [0.0001,248],
    [0.000005,250,"easeOutExpo"],
    [0.00001,264,"easeInSine"],
    [0.001,280,"easeInCubic"],
    [0.00001,280,"easeStep"],
    [0.000015,344,"easeStep"]
];
fog.animate.startY = [
    [-50,0],
    [-50,32],
    [-70,40],
    [-1000,133,"easeStep"],
    [-50,164,"easeStep"],
    [50,344,"easeStep"]
];
fog.animate.height = [
    [10,0],
    [10,32],
    [20,40],
    [20,92],
    [50,94],
    [10,99],
];
fog.push();

// Wall Stuff

// Events

for (let i = 0; i < 200; i++){
    new Event(92+(i/100)).centerLasers().on([setDecimals(0.5+((i*9.5)/200),2),setDecimals(0.5+((i*9.5)/200),2),setDecimals(0.5+((i*9.5)/200),2),setDecimals(rand(0.5+(i*0.01),1+(i*0.02)),3)]).push();
}
for (let i = 0; i < 500; i++){
    new Event(94+(i/100)).centerLasers().on([setDecimals(10-(i/50),2),setDecimals(10-(i/50),2),setDecimals(10-(i/50),2),setDecimals(rand((5-(i/100))/2,5-(i/100)),3)]).push();
}
for (let i = 0; i < 50; i++){
    const col = setDecimals(rand(0,3),2);
    new Event(131+(i/50)).centerLasers().on([col,col,col,col]).push();
}
let pulseval = 100;
for (let i = 0; i < 3100; i++){
    pulseval = pulseval-1
    if(pulseval == 0){
        pulseval = 100;
    }
    if(pulseval > 50){
        new Event(133+(i/100)).centerLasers().on([pulseval/10,pulseval/12.5,pulseval/20,rand(3,4)]).push();
    }
    else{
        new Event(133+(i/100)).centerLasers().on([5,4,2.5,rand(1,3)]).push();
    }
}
for(let i = 0; i < 7; i++){
    flashcharge(180.5+(i*4),0.5,2);
    flashcharge(181+(i*4),1,3);
    flashcharge(182+(i*4),0.75,3);
    flashcharge(182.75+(i*4),1.75,5);
}
flashcharge(208.5,0.5,2);
flashcharge(209,1,3);
flashcharge(210,0.75,3);
flashcharge(210.75,1.25,5);
for(let i = 0; i < 3200; i++){
    new Event(216+(i/100)).centerLasers().on([5,2,1,setDecimals(rand(0.5,1.5),2)]).push();
}

//Dir lights

const dirlight = new Environment("Day\\.\\[\\d+\\]Direct\\w+Front$", "Regex");
dirlight.track = "dirlight";
dirlight.push();
dirlight.id = "Day\\.\\[\\d+\\]Direct\\w+Left$";
dirlight.push();
dirlight.id = "Day\\.\\[\\d+\\]Direct\\w+Right$";
dirlight.push();
dirlight.track = "dirlightB"
dirlight.id = "Day\\.\\[\\d+\\]Direct\\w+Back$";
dirlight.push();


animtrack = new CustomEvent(0).animateTrack("dirlight",395);
animtrack.animate.length = 395;
animtrack.animate.rotation = [
    [sunangle(100,1000),0,0,0],
    [-sunangle(100,1000),0,0,313,"easeStep"]
];
animtrack.push();

animtrack = new CustomEvent(0).animateTrack("dirlightB",395);
animtrack.animate.length = 395;
animtrack.animate.rotation = [
    [sunangle(100,1000),180,0,0],
    [-sunangle(100,1000),180,0,216,"easeStep"]
];
animtrack.push();

if(release){
    map.require("Noodle Extensions");
    map.require("Chroma");
    map.settings.hideSpawnEffect = true;
    map.settings.leftHanded = false;
    map.settings.disableEnvironmentEnhancements = false;
    map.settings.lightsExPlus = "All";
    map.settings.noHud = true;
    map.settings.overrideEnvironments = false;
    map.settings.overrideColors = false;
    map.settings.maxShockwaveParticles = 0;
    map.settings.bloom = true;
    map.settings.mirrorQuality = "LOW";
    map.settings.disableChroma = false;
    map.colorLeft = [0.65,0.57,0.45];
    map.colorRight = [0.8,0.8,0.83];
    map.save();
    exportZip(["ExpertStandard.dat"],"Storyteller");
}
else{
    map.save();
}