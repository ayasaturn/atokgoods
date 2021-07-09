$(function(){$("div.panel").hide();$(".menu").click(function(){$(this).toggleClass("menuOpen").next().slideToggle();});})


$(function(){
    
    var arySpinnerCtrl = [];
    var spin_speed = 20; //変動スピード
    
    //長押し押下時
    $('.btnspinner').on('touchstart mousedown click', function(e){
        if(arySpinnerCtrl['interval']) return false;
        var target = $(this).data('target');
        arySpinnerCtrl['target'] = target;
        arySpinnerCtrl['timestamp'] = e.timeStamp;
        arySpinnerCtrl['cal'] = Number($(this).data('cal'));
        //クリックは単一の処理に留める
        if(e.type == 'click'){
            spinnerCal();
            arySpinnerCtrl = [];
            return false;
        }
        //長押し時の処理
        setTimeout(function(){
            //インターバル未実行中 + 長押しのイベントタイプスタンプ一致時に計算処理
            if(!arySpinnerCtrl['interval'] && arySpinnerCtrl['timestamp'] == e.timeStamp){
                arySpinnerCtrl['interval'] = setInterval(spinnerCal, spin_speed);
            }
        }, 500);
    });
    
    //長押し解除時 画面スクロールも解除に含む
    $(document).on('touchend mouseup scroll', function(e){
        if(arySpinnerCtrl['interval']){
            clearInterval(arySpinnerCtrl['interval']);
            arySpinnerCtrl = [];
        }
    });
    
    //変動計算関数
    function spinnerCal(){
        var target = $(arySpinnerCtrl['target']);
        var num = Number(target.val());
        var price = 100;

        num = num + arySpinnerCtrl['cal'];
        if(num > Number(target.data('max'))){
            target.val(Number(target.data('max')));
        }else if(Number(target.data('min')) > num){
            target.val(Number(target.data('min')));
        }else{
            target.val(num);
        }

        // 合計
        price = (Number($(".counter1").val()) * 3000)
                + (Number($(".counter2").val()) * 6500)
                + (Number($(".counter3").val()) * 5500)
                + (Number($(".counter4").val()) * 3000)
                + (Number($(".counter5").val()) * 2000)
                + (Number($(".counter6").val()) * 3500)
                + (Number($(".counter7").val()) * 3000)
                + (Number($(".counter8").val()) * 2000)
                + (Number($(".counter9").val()) * 1000)
                + (Number($(".counter10").val()) * 600)
                + (Number($(".counter11").val()) * 500)
                + (Number($(".counter12").val()) * 2800)
                + (Number($(".counter13").val()) * 800);
                $("#total").val(price);
    } 
});