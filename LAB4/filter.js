const albumcontent = document.querySelector(".albumcontent")

const alerter = document.createElement("p")
document.body.appendChild(alerter)
function alertme(data){
    alerter.innerHTML = data;
}
var counter = 0;
var newlist;
//main
(async function (){
   
    const datas = await fetchjson("product.json");
    updateSection(datas);

    document.querySelectorAll(".albumfilter").forEach(tag=>
        tag.addEventListener("input",()=>updateSection(datas)))
    

    
    window.onscroll = ()=>{
        if(window.innerHeight+window.scrollY+40>= document.body.offsetHeight)
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
    albumcontent.innerHTML+=makeAlbumUnit(filteredlist[start])
    albumcontent.innerHTML+=makeAlbumUnit(filteredlist[end])

}
function makeAlbumUnit(albumObj){
    const title = albumObj.title;
    const artist = albumObj.artist;
    const price = albumObj.price;
    const group = albumObj.group;


    const result=`<div class="imagecontainer">
        <img src="images/${title}.jpg" alt="${title}">
        ${price}만원
        <div class="overlaytxt">
        Category:<br>${group}<br>
        Title:${title}<br>
        Artist:${artist}
        </div>
        </div>`
    return result
}

async function fetchjson(url){
    const res = await fetch(url);
    const data = await res.json(); 
    return data
}
