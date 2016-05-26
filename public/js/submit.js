$(document).ready(function(){
    var resultWrapper = $('#result');
    resultWrapper.addClass('hide');
    $('body').addClass('no-scroll');
    $('body').addClass('show-form');


    var jsonTextarea = $('#explanation-json');
    var submitButton = $('.btn-submit');
    submitButton.addClass('disable');

    var aside = $('aside');
    aside.addClass('hide');
    var infoButton = $('.btn-info');
    infoButton.on('click', function(){
        aside.toggleClass('hide');
        infoButton.toggleClass('active');
    });


    var editButton = $('.btn-edit');
    var explanationJsonWrapper = $('#explanation-json-wrapper');


    editButton.addClass('hide');
    editButton.on('click',function(){
        explanationJsonWrapper.removeClass('hide');

        editButton.addClass('hide');
        $('body').addClass('no-scroll');
        $('body').removeClass('show-form');
        $('body').addClass('show-edit');
        resultWrapper.addClass('hide');
        submitButton.removeClass('hide');
    });

    function validateFormData(data) {
        var jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch(err) {
            return false;
        }
        return true;
    }





    /*
    TODO: ConstantScore, function score
     */

    var glossary = {};
    $.ajax({
        url: '/api/glossary',
        dataType: 'json',
        async: false,
        success: function(data) {
            $.each(data, function(fileName, entry){
                glossary[fileName.toLowerCase()] = entry;
                $.each(entry.keys, function(index, key){
                    glossary[key.toLowerCase()] = entry;
                });
            });
        }
    });


    jsonTextarea.typeWatch({
        callback: function (value) {
            if (validateFormData(value)) {
                submitButton.removeClass('disable');
            } else {
                submitButton.addClass('disable');
            }
        },
        wait: 750,
        highlight: true,
        allowSubmit: false,
        captureLength: 2
    });


    $(window).on('resize', function(){
        var windowHeight = $(window).height();
        explanationJsonWrapper.height(windowHeight - 80);
    }).trigger('resize');



    setTimeout(function() {
        jsonTextarea.focus();
    }, 0);





    submitButton.on('click', function(e){
        e.preventDefault();

        var formData = jsonTextarea.val();
        if(submitButton.hasClass('disabled') || !validateFormData(formData)) return;

        explanationJsonWrapper.addClass('hide');

        $('body').removeClass('show-form');
        $('body').addClass('show-edit');
        submitButton.addClass('hide');
        editButton.removeClass('hide');
        $('body').removeClass('no-scroll');
        resultWrapper.removeClass('hide');

        var explanations = {};
        $.ajax({
            type: "POST",
            url: '/api/explanations',
            contentType : "application/json",
            dataType: 'json',
            async: false,
            data: formData,
            success: function(data) {
                explanations = data;
            }
        });

        function floatToPercent(float) {
            return Math.round(float * 1000000) / 10000;
        }

        function makeList(entry) {
            var result = '<b>' + floatToPercent(entry.impact) + '%</b> ' + ' ' + entry.score +  ' ' + injectTooltips(highlightMath(entry.description));

            if(entry.children.length) {
                result = '<span class="explanation has-child">' + result + '</span> <span class="children">' + entry.children.length + '</span>';
            } else {
                result = '<span class="explanation">' + result + '</span>';
            }



            if(entry.children.length) {
                result += '<ul>';
                entry.children.forEach(function(child) {
                    result += '<li>' + makeList(child) + '</li>';
                });
                result += '</ul>';
            }

            return result;
        }


        function injectTooltips(text) {
            var regex = new RegExp('\\b[A-Za-z]+\\b', "gi");
            text = text.replace(regex, function (match) {
                if (!(match.toLowerCase() in glossary)) return match;
                return '<mark class="tooltip-link" data-tooltip=\'' + match.toLowerCase() + '\'>' + match + '</mark>';
            });

            return text;
        }

        function highlightMath(text) {
            var maths = ["product of:", "result of:", "sum of:", "Math.min of", "max of:", "freq of:", "Function for field (.*)"];
            maths.forEach(function(mathElement){

                var regex = new RegExp(mathElement, 'gi');

                text = text.replace(regex, function(match){
                    return '<b style="color:#ff0000;">' + match + '</b>';
                });
            });

            return text;
        }



        $('.slide-up-all').on('click', function(e){
            e.preventDefault();
            $('ul').slideUp();
        });

        $('.slide-down-all').on('click', function(e){
            e.preventDefault();
            $('ul').slideDown();
        });


        var $listWrapper = $('.list-wrapper');
        $listWrapper.html(makeList(explanations));

        $listWrapper.find('mark.tooltip-link').each(function(){
            var tooltip = glossary[$(this).data('tooltip')];

            var content = '<b>' + tooltip.title + '</b><br><br>';
            if(tooltip.description) content += tooltip.description + '<br><br>';
            if(tooltip.implementation) content += '<b>Implementation:</b> ' + tooltip.implementation + '<br>';
            if(tooltip.implication) content += '<b>Implication:</b> ' + tooltip.implication + '<br>';
            if(tooltip.rationale) content += '<b>Rationale:</b> ' + tooltip.rationale + '<br>';

            $(this).append('<div class="tooltip"><p>' + content + '</p></div>');

        });

        $listWrapper.find('.explanation').on('click', function(){
            $(this).siblings('ul').slideToggle(200, function() {
                $(this).toggleClass('visible', $(this).is(':visible'));
            });

        });

    });


});
