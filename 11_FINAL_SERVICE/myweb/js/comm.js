/* HTTP REST 방식 axios 기반 통신
    axios는 Promise API를 지원
*/
const getNewsPost = () => {
    axios("https://janjan-coding.site/util/news",{
        method : 'post',
        data:{
            email : "test@test.com"
        }
    }).then(response => {
        //console.log(response.data['status'], response.data['info']);
        const newsMsg = document.querySelector('.news');
        const newsList = document.querySelectorAll('.news-title')
        const newsLinks = document.querySelectorAll('.news-link')
        const newsImgs = document.querySelectorAll('.news-image')
        //const newsList = response.data['newsList'];
        //const newsLinks = response.data['newsLinks'];        
        const stockData = document.querySelectorAll('.stock-title');
        const stockCosts = document.querySelectorAll('.stock-cost');
        const stockChanges = document.querySelectorAll('.stock-change');        
        for(let i =0;i<newsList.length; i++){
            newsList[i].innerText=response.data['newsList'][i];
            newsLinks[i].href="https://news.naver.com" +response.data['newsLinks'][i];
            newsImgs[i].src= response.data['newsImgs'][i];
            stockData[i].innerText = response.data['stocks'][i];            
            stockCosts[i].innerText = response.data['stock_costs'][i];
            stockChanges[i].innerText = response.data['stock_changes'][i];
            if(response.data['stock_color'][i] =='up'){      
                const up = document.createElement('i');
                up.className= "fas fa-caret-up";
                stockChanges[i].prepend(up);      
                stockCosts[i].style.color = 'red';        
                stockChanges[i].style.color = 'red';                
            }else if(response.data['stock_color'][i] =='down'){
                const down = document.createElement('i');
                down.className = "fas fa-caret-down";
                stockChanges[i].prepend(down);
                stockCosts[i].style.color = 'blue';            
                stockChanges[i].style.color = 'blue';                
            }
        }
        newsMsg.innerText = "오늘의 뉴스"+response.data['info'];


               
    }).catch((error) => {
        console.log(error);
    })
}
getNewsPost();
