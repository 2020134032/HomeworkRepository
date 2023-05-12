const albumcontent = document.querySelector(".albumcontent")

const alerter = document.createElement("p")
document.body.appendChild(alerter)
function alertme(data){
    alerter.innerHTML = data;
}

//main
(async function (){
    const datas = await fetchjson("product.json")
    datas.forEach(e => albumcontent.innerHTML+= makeAlbumUnit(e))
})()
//

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