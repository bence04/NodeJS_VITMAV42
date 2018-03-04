var i = 2;

setInterval(function() {
    if(i > 7) { i = 1; }
    $('.wrapper-background').fadeTo(1000, 0, function() {
        $(this).css({'background-image': 'url(assets/img/'+ i +'.jpg)'}).fadeTo(1000, 1);
        i++;
    });
    
}, 15000);