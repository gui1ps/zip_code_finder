function changeConainerBg(url){
    if(url.length>0){
        return `url(${url})`;
    }
    return 'linear-gradient(#121212,#212b46)';
}

export default changeConainerBg;