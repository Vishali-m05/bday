const intro = document.getElementById("intro");
const party = document.getElementById("party");

const message = document.getElementById("message");
const controls = document.getElementById("controls");

const cake = document.getElementById("cake");

let knifeDragged = false;

function startCelebration(){

    intro.classList.remove("active");
    party.classList.add("active");

    message.innerHTML = "";

    enterFriends();
}

function enterFriends(){

    const friends =
    document.querySelectorAll(".friend");

    friends.forEach((friend,index)=>{

        setTimeout(()=>{

            friend.classList.add("show");

        },index*700);

    });

    setTimeout(showCake,5000);
}

function showCake(){

    cake.style.display="block";

    message.innerHTML=
    "We brought something special for you ❤️";

    controls.innerHTML=`
        <button onclick="lightCandles()">
            Light Candles 🕯️
        </button>
    `;
}

function lightCandles(){

    document.getElementById("cakeEmoji").src =
    "./assets/cake-candle.png";

    message.innerHTML =
    "Light up the candles and brighten the day ✨";

    controls.innerHTML = `
        <button onclick="startSong()">
            Start Celebration 🎵
        </button>
    `;
}



function startSong(){

    message.innerHTML =
    "Vibe with the masterpiece 🎶";

    controls.innerHTML = "";

    const song =
    document.getElementById("birthdaySong");

    song.currentTime = 0;

    document
        .querySelectorAll(".friend")
        .forEach(friend=>{
            friend.classList.add("clap");
        });

    song.play();

    song.onended = ()=>{

        document
            .querySelectorAll(".friend")
            .forEach(friend=>{
                friend.classList.remove("clap");
            });

        controls.innerHTML = `
            <button onclick="makeWish()">
                Blow The Candles 🌬️
            </button>
        `;
    };
}

function makeWish(){

    message.innerHTML =
    "Close your eyes and make a wish ❤️";

    controls.innerHTML = "";

    setTimeout(()=>{

        // Candles become OFF
        document.getElementById("cakeEmoji").src =
        "./assets/cakelo.png";

        

        controls.innerHTML = `
            <button onclick="cutCake()">
                Cut The Cake 🔪
            </button>
        `;

    },2500);
}

function cutCake(){

    controls.innerHTML="";

    message.innerHTML=
    "Drag the knife across the cake 🔪";

    const knife =
    document.getElementById("knife");

    knife.style.display="block";

    knife.onmousedown = () => {

        knifeDragged = true;
    };

    document.onmousemove = (e) => {
    if (!knifeDragged) return;

    const cakeRect = cake.getBoundingClientRect();

    knife.style.left =
        (e.clientX - cakeRect.left - 30) + "px";

    knife.style.top =
        (e.clientY - cakeRect.top - 30) + "px";

    const cakeEmoji = document.getElementById("cakeEmoji");
    const cakeEmojiRect = cakeEmoji.getBoundingClientRect();

    if (
        e.clientX > cakeEmojiRect.left &&
        e.clientX < cakeEmojiRect.right &&
        e.clientY > cakeEmojiRect.top &&
        e.clientY < cakeEmojiRect.bottom
    ) {
        knifeDragged = false;
        document.onmousemove = null;
        splitCake();
    }
};

    document.onmouseup=()=>{
        knifeDragged=false;
    };
}

function splitCake(){

    document.getElementById("knife").style.display = "none";

    // Hide full cake immediately
    document.getElementById("cakeEmoji").style.display = "none";

    message.innerHTML =
        "You are already sweet, so let we have this";

    const container =
    document.getElementById("cakeSlices");

    container.innerHTML = "";

    // Create 6 slices
    for(let i=0;i<6;i++){

    const slice = document.createElement("div");

    slice.className="slice";
    slice.innerHTML = `
    <div class="cake-piece">
        🍰
    </div>
`;

    const slicePositions = [
    {x:20,y:20},
    {x:80,y:20},
    {x:140,y:20},
    {x:20,y:80},
    {x:80,y:80},
    {x:140,y:80}
];

slice.style.left = slicePositions[i].x + "px";
slice.style.top = slicePositions[i].y + "px";

    container.appendChild(slice);
}

// Immediately start distribution
distributeCake();
}

function distributeCake(){

    const slices =
    document.querySelectorAll(".slice");

    const friends =
    document.querySelectorAll(".friend");

    slices.forEach((slice,index)=>{

    const friend = friends[index];
    const friendImg =
friend.querySelector("img");
    const friendRect = friendImg.getBoundingClientRect();
    const cakeRect = cake.getBoundingClientRect();

    const startX =
        parseFloat(slice.style.left);

    const startY =
        parseFloat(slice.style.top);

    const targetX =
    (friendRect.left + friendRect.width/2)
    - cakeRect.left
    - startX
    - 25;

const targetY =
    (friendRect.top + friendRect.height/2)
    - cakeRect.top
    - startY
    - 25;

    slice.style.transform =
        `translate(${targetX}px, ${targetY}px)`;
});

    message.innerHTML =
    "Everyone got a piece of cake ❤️";

    // Keep slices visible on girls for 2 seconds
    setTimeout(()=>{

        slices.forEach(slice=>{
            slice.style.opacity="0";
        });

    },4000); // 2 sec travel + 2 sec stay

    setTimeout(()=>{

        document.getElementById("cakeSlices").innerHTML="";

        message.innerHTML =
        "We have something for you...";

        controls.innerHTML=`
            <button onclick="openLetter()">
                Open Letter 💌
            </button>
        `;

    },5000);
}


function openLetter(){

    message.innerHTML = "";

    controls.innerHTML = `
        <div class="letter">

            <div class="cat-container">
                <img
                    src="./assets/cat.png"
                    alt="Cat"
                    class="cat-image"
                >
            </div>

            <p class="cat-message">
                Thanks for the cake,
It was all for fun's sake.

No gifts to send your way,
But smile and enjoy your day.

Before you go and walk away,
Happy Birthday anyway!

            </p>

        </div>
    `;
}