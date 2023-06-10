const albumcontent = document.querySelector(".albumcontent")

var counter = 0;
var newlist;
//main
(async function (){
   
    const datas = await getdata();
    //datas is a array of js object
    // [ { id:1 , ... }, { id:2 , ... }, ... ]
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
     newlist.sort((a,b) => a.product_price-b.product_price);
    if(document.getElementById("sortby").value=="high")
     newlist.sort((a,b) => b.product_price-a.product_price);

    return newlist
}

function selectfilter(datajson){
    let group = document.getElementById("group").value.trim().toLowerCase()
    let text = document.getElementById("text").value.trim().toLowerCase()

    if(datajson.product_category.includes(group)&& 
    (datajson.product_artist.includes(text)||datajson.product_title.includes(text))){
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
    const title = albumObj.product_title;
    const artist = albumObj.product_artist;
    const price = albumObj.product_price;
    const group = albumObj.product_category;
    const imgpath = albumObj.product_image;

    let unit = document.createElement("div");
    unit.innerHTML=`<img src="${imgpath}" alt="${title}">
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
        window.location.href = "/product/"+albumObj.product_id
    }
    return unit
}

async function getdata(){
    const parsed = JSON.parse(document.querySelector("#data").innerHTML)
    console.log("hi"+parsed)
    // const data = await parsed.json(); 
    return parsed
}
