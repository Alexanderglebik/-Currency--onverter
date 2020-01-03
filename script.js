function drawItems(items_) {
    let items = Object.entries(items_);
    console.log(items);
    for (let i = 0; i < 10; i++) {
        document.getElementById('res').innerHTML+=
        `<th class="curr">${items[i][0]}</th><td class="value">${items[i][1]}</td>`;
    };
}

function getItems(cur) { 
    fetch('https://api.exchangerate-api.com/v4/latest/'+cur)
        .then(response => response.json())
        .then((json) => {
            document.getElementById('currSelect').innerHTML='';
            let items = Object.entries(json.rates);
            for (let i = 0; i < 10; i++) {
                document.getElementById('currSelect').innerHTML+='<option value="'+items[i][0]+'">'+items[i][0]+'</option>';
            } 
            drawItems(json.rates);
        }).catch(err => alert(err));
}

function changeCurr(curr) {
    document.getElementById('res').innerHTML=`
        <tr>
        <th colspan="2" id="list_item"></th>
        </tr>
        <tr style="border:none">
            <th>
                <div class="center">
                    <div class="spinner-border text-dark spinner" id="spinner" role="status"></div> 
                </div>
            </th>
        </tr>        
    `;
    document.querySelector('#list_item').innerHTML= 'Exchange rate : '+curr;
    window.localStorage.setItem('currency',curr);
    setTimeout(function(){
        document.getElementById('res').innerHTML=`
            <tr>
            <th colspan="2" id="list_item"></th>
            </tr> 
        `;
        document.querySelector('#list_item').innerHTML= 'Exchange rate : '+curr;
        getItems(curr);
    },500);
}

document.addEventListener('DOMContentLoaded', function() {
    if(window.localStorage.getItem('currency')){
        console.log('loaded');
        currency = window.localStorage.getItem('currency');
        changeCurr(currency);
    }else{
        window.localStorage.setItem('currency','USD');
        console.log('set');
        currency = "USD";
        changeCurr(currency);
    }
});