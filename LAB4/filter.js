const albumcontent = document.querySelector(".albumcontent")

var counter = 0;
var newlist;
//main
(async function (){
   
    const datas = await fetchjson("product.json");
    updateSection(datas);

    document.querySelectorAll(".albumfilter").forEach(tag=>
        tag.addEventListener("input",()=>updateSection(datas)))
    

    
    window.onscroll = ()=>{
        if(window.innerHeight+window.scrollY+60>= document.body.offsetHeight)
            load(newlist);

    }

})();
//
function updateSection(datas){
    counter = 0
    albumcontent.innerHTML=""
    
    newlist = applyFilter(datas) 
    load(newlist)

}

function applyFilter(rawlist){
    newlist = rawlist.filter(selectfilter);

    if(document.getElementById("sortby").value=="low")
     newlist.sort((a,b) => a.price-b.price);
    if(document.getElementById("sortby").value=="high")
     newlist.sort((a,b) => b.price-a.price);

    return newlist
}

function selectfilter(datajson){
    let group = document.getElementById("group").value.trim().toLowerCase()
    let text = document.getElementById("text").value.trim().toLowerCase()

    if(datajson.group.includes(group)&& 
    (datajson.artist.includes(text)||datajson.title.includes(text))){
        return true
    }
}
function load(filteredlist){
    const start= counter;
    const end= start+1;
    counter = end +1;
    albumcontent.appendChild(makeAlbumUnit(filteredlist[start]));
    albumcontent.appendChild(makeAlbumUnit(filteredlist[end]));
}
function makeAlbumUnit(albumObj){
    const title = albumObj.title;
    const artist = albumObj.artist;
    const price = albumObj.price;
    const group = albumObj.group;

    let unit = document.createElement("div");
    unit.innerHTML=`<img src="images/${title}.jpg" alt="${title}">
    ${price}만원
    <div class="overlaytxt" style="opacity:0"
    Category:<br>${group}<br>
    Title:${title}<br>
    Artist:${artist}
    </div>`;
    unit.setAttribute("class","imagecontainer");
    unit.querySelector(".overlaytxt").onclick = function(){
        if(this.style.opacity ==0)
        this.setAttribute("style","opacity:0.8;")
        else
        this.setAttribute("style","opacity:0;")
    }
    return unit
}

async function fetchjson(url){
    const res = await fetch(url);
    const data = await res.json(); 
    return data
}
