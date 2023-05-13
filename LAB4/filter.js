const albumcontent = document.querySelector(".albumcontent")

const alerter = document.createElement("p")
document.body.appendChild(alerter)
function alertme(data){
    alerter.innerHTML = data;
}
var counter = 0;
//main
(async function (){
   
    const datas = await fetchjson("product.json");

    newlist = datas.filter(filterList);
    load(newlist)

    document.querySelectorAll("input").forEach(tag=>
        tag.addEventListener("input",()=>updateSection(datas)))
    

    
    window.onscroll = ()=>{
        if(window.innerHeight+window.scrollY>= document.body.offsetHeight){
            load(newlist)
        }
    }

})();
//
function updateSection(datas){
    counter = 0
    albumcontent.innerHTML=""
    newlist = datas.filter(filterList)
    load(newlist)

}

function filterList(datajson){
    let artist = document.getElementById("artist").value.trim()
    let text = document.getElementById("text").value.trim()
    let sortby = document.getElementById("sortby").value

    if(datajson.artist.includes(artist)&& 
    (datajson.artist.includes(text)||datajson.title.includes(text))){
        return true
    }
}
function load(filteredlist){
    const start= counter;
    const end= start+1;
    counter = end +1;

    // filteredlist.forEach(e => albumcontent.innerHTML+= makeAlbumUnit(e))
    albumcontent.innerHTML+=makeAlbumUnit(filteredlist[start])
    albumcontent.innerHTML+=makeAlbumUnit(filteredlist[end])

}
function makeAlbumUnit(albumObj){
    const title = albumObj.title;
    const artist = albumObj.artist;

    const result=`<div class="imagecontainer">
        <img src="images/${title}.jpg" alt="200">ddddddd
        <div class="overlaytxt">${title}:${artist}</div>
        </div>`
    return result
}

async function fetchjson(url){
    const res = await fetch(url);
    const data = await res.json(); 
    return data
}


/*<div class="flex group">
<div class="imagecontainer">
    <img src="images/201.jpg" alt="100">
    <div class="overlaytxt">201</div>
</div>

</div>
<div class="flex group">

<div class="imagecontainer">
    <img src="images/ditto.jpg" alt="300">
    <div class="overlaytxt">ditto</div>
</div>
<div class="imagecontainer">
    <img src="images/nwjns.jpg" alt="400">
    <div class="overlaytxt">nwjns</div>
</div>
</div>
<div class="flex group">
<div class="imagecontainer">
    <img src="images/lovepoem.jpg" alt="500">
    <div class="overlaytxt">lovepoem</div>
</div>
<div class="imagecontainer">
    <img src="images/lilac.jpg" alt="600">
    <div class="overlaytxt">lilac</div>
</div>
</div>
<div class="flex group">
<div class="imagecontainer">
    <img src="images/teent.jpg" alt="700">
    <div class="overlaytxt">teen<br>troubles</div>
</div>
<div class="imagecontainer">
    <img src="images/grad.jpg" alt="800">
    <div class="overlaytxt">grad</div>
</div>
</div>*/