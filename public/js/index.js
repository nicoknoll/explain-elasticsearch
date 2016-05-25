$(document).ready(function(){

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

    var explanations = {};
    $.ajax({
        url: '/api/explanations',
        dataType: 'json',
        async: false,
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
