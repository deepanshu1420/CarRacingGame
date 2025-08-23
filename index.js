const startScreen = document.querySelector(".start-screen");
const road = document.querySelector(".road");
const heading = document.querySelector(".heading");
// const data = document.querySelector(".startScreen p");
startScreen.addEventListener("click" ,start);

const player = {speed : 5};
const keysTrace = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false
};
function background(){
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    return `rgb(${red} , ${green} , ${blue})`;
}
function moveLines(){
    const lineBag = document.querySelectorAll(".line");
    // console.log(lineBag);
    lineBag.forEach((ele)=>{
        // ele.style.top += player.speed + "px";
        if(ele.y > 800){
            ele.y -= 830;
        }
        ele.y += player.speed;
        ele.style.top = ele.y + "px";
        // console.log(ele.y);
    })
}

function endGame(){
    // road.innerHTML = "";
    
    
    document.querySelector(".start-screen p").innerHTML = "oops! <br> Try again";
    document.querySelector(".start-screen p").style.color ="red";
    startScreen.classList.remove("hide");
    
}
function moveEnemy(car){
    const enemyBag = document.querySelectorAll(".enemy");
    enemyBag.forEach(ele=>{
        if(ele.y >760){
            ele.y -= 800;
            ele.style.backgroundColor = background();
            ele.style.left = Math.floor(Math.random()*500) + "px";
        }

        if(isCollide(car, ele)){
            // console.log("Boom hit");
            player.start = false;
            endGame();
        }
        ele.y += player.speed;
        ele.style.top = ele.y + "px";
    })
}

function isCollide(a , b){
    aReact = a.getBoundingClientRect();
    bReact = b.getBoundingClientRect();
    return(!((aReact.top > bReact.bottom) || (aReact.left > bReact.right) || (bReact.top > aReact.bottom) || (bReact.left > aReact.right)));
}
function gamePlay(){
    const car= document.querySelector(".car");
    // heading.style.color = background();
    moveLines();
    moveEnemy(car);
    
    const roadDimension = road.getBoundingClientRect();
    // console.log(roadDimension.height);
    if(keysTrace.ArrowDown && player.y < roadDimension.bottom - 90){
        player.y+=player.speed;
    }

    if(keysTrace.ArrowLeft && player.x > 0){
        player.x-=player.speed;
    }

    if(keysTrace.ArrowRight && player.x < roadDimension.width-50){
        player.x+=player.speed;
    }

    if(keysTrace.ArrowUp && player.y > 90){
        // console.log(player.y);
        player.y-=player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
    if(player.start){
        window.requestAnimationFrame(gamePlay);
    }
    
}
function start(){
    player.start = true;
    startScreen.classList.add("hide");
    // road.classList.remove("hide");
    heading.style.color = "white";
    road.innerHTML = "";

    const car = document.createElement("div");
    car.classList.add("car");
    road.append(car);

    for(let i = 0;i<5;i++){
        const line = document.createElement("div");
        line.classList.add("line");
        line.y = i*160;
        line.style.top += line.y + "px";
        road.append(line);
    }

    for(let i = 0;i<3;i++){
        const enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.y = ((i+1)*260)*-1;
        enemy.style.top += enemy.y + "px";
        enemy.style.left = Math.floor(Math.random()*500) + "px";
        enemy.style.backgroundColor = background();
        road.append(enemy);
    }
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    
    window.requestAnimationFrame(gamePlay);
}


document.addEventListener("keyup" , (e)=>{
    keysTrace[e.key] = false;
})

document.addEventListener("keydown" , (e)=>{
    keysTrace[e.key] = true;
})



// (+) Mobile touch controls
document.querySelectorAll(".btn-control").forEach(btn => {
  const dir = btn.dataset.dir;

  // On press (touchstart or mousedown)
  btn.addEventListener("touchstart", e => {
    e.preventDefault();
    keysTrace[dir] = true;
  });
  btn.addEventListener("mousedown", e => {
    e.preventDefault();
    keysTrace[dir] = true;
  });

  // On release (touchend or mouseup)
  btn.addEventListener("touchend", e => {
    e.preventDefault();
    keysTrace[dir] = false;
  });
  btn.addEventListener("mouseup", e => {
    e.preventDefault();
    keysTrace[dir] = false;
  });

  // In case finger slides away
  btn.addEventListener("mouseleave", () => {
    keysTrace[dir] = false;
  });
});

// (+) Speed Control Logic
// Set default speed based on device
let baseSpeed;
if (window.innerWidth <= 768) {   // Mobile/tablet
    baseSpeed = 3;   // slower default for mobile
} else {
    baseSpeed = 5;   // normal default for desktop
}
player.speed = baseSpeed;

document.getElementById("speed-up").addEventListener("click", () => {
  player.speed += 1;
});

document.getElementById("speed-down").addEventListener("click", () => {
  if (player.speed > 1) player.speed -= 1;
});

document.getElementById("speed-reset").addEventListener("click", () => {
  player.speed = baseSpeed;
});

