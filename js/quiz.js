
var clicked = 0;

const answer_quiz1 = {
  "1" : {
    "answer": [
      "a"
    ],
    "checked": false
  },
  "2" : {
    "answer": [
      "b"
    ],
    "checked": false
  },
  "3" : {
    "answer": [
      "b"
    ],
    "checked": false
  },
  "4" : {
    "answer": [
      "d"
    ],
    "checked": false
  },
  "5" : {
    "answer": [
      "c"
    ],
    "checked": false
  },
  "6" : {
    "answer": [
      "a"
    ],
    "checked": false
  },
  "7" : {
    "answer": [
      "b"
    ],
    "checked": false
  }
}

let cur_url = new URL(window.location.href);
let show_sol = (new URLSearchParams(cur_url.search)).get('viewAnalysis');
$('#btn-link').attr('href', cur_url + '?viewAnalysis=true');
// console.log(show_sol);



var user_behaviour = {
    "answer_quiz-1" : {

    }
};

$('#btn-link').click( ()=>{
  console.log("submit button clicked")
    for(let i=1;i<=7;i++){
        let a = $('#option-' + i + 'a' ).is(':checked') ? 'a' : '';
        let b = $('#option-' + i + 'b' ).is(':checked') ? 'b' : '';
        let c = $('#option-' + i + 'c' ).is(':checked') ? 'c' : '';
        let d = $('#option-' + i + 'd' ).is(':checked') ? 'd' : '';

        user_behaviour["answer_quiz-1"][i.toString()] = [a , b , c , d].filter((x)=>{
          return x!="";
        }); 
    }
console.log(user_behaviour);
localStorage.setItem('user_behaviour', JSON.stringify(user_behaviour));
});
      
for(let i=1;i<=7;i++){
   
    $('.option-list-' + i).after(`<div class="after-submit-${i}"></div>`);


    let options = document.getElementsByClassName('option-'+i);

    for(let j=4;j>=1;j--){
        let arr = ['a', 'b', 'c', 'd'];
        let arr2 = ['A', 'B', 'C', 'D'];
        let je = arr[j-1];
        let text_option = `<div class="checkbox-wrapper">
                            ${arr2[j-1]}. <input class="inp-cbx" id="option-${i}${je}" type="checkbox" />
                            <label class="cbx" for="option-${i}${je}"><span>
                                <svg width="12px" height="10px" viewbox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </svg></span><span id="span-${i}${je}" class="option"> ${options[j-1].innerText}</span>
                            </label>
                        </div>`;

        $('.option-list-' + i).after(text_option);
    }


    $('.option-list-'+i).remove();
}

if(show_sol){
  $('#demo').css('display', 'none');

  user_be = JSON.parse(localStorage.getItem('user_behaviour'))
  for(let i=1;i<=7;i++){
    let solution_msg = `
    <div id="alert-${i}" class="alert" role="alert">
        <h4 class="alert-heading" id="alert-head-${i}">Well done!</h4>
        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
        <hr>
        <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>`;

    $('.after-submit-' + i).after(solution_msg);

    let marked_answer = user_be["answer_quiz-1"][i.toString()][0];
    let actual_answer = answer_quiz1[i.toString()]["answer"][0];
    
    console.log(i,marked_answer,actual_answer);

    $(`#option-${i}${marked_answer}`).prop('checked', true);

    if(marked_answer == actual_answer){
      $('#alert-head-' + i).text("Correct Answer");
      $('#span-' + i + marked_answer).addClass('option-right');
      $('#alert-' + i).addClass('alert-primary');
    } else {
      $('#alert-head-' + i).text("Wrong Answer");
      $('#span-' + i + marked_answer).addClass('option-wrong');
      $('#span-' + i + actual_answer).addClass('option-right');
      $('#alert-' + i).addClass('alert-success');
    }
  }

  $('.alert').css('display','block');

}


// $('.btn').click(function(){

//     let current_question = $(this).data('id');
//     let answer = answer_quiz1[current_question]["answer"][0];

//     console.log(current_question, answer, $('#option-' + current_question + answer ).is(':checked'))

//     if($('#option-' + current_question + answer ).is(':checked')){

//         $('#span-' + current_question + answer).addClass('option-right');
//         $('#alert-' + current_question).addClass('alert-primary');

//     } else {

//         $('#option-' + current_question + 'a' ).is(':checked') ? $('#span-' + current_question + 'a').addClass('option-wrong') : ' ';
//         $('#option-' + current_question + 'b' ).is(':checked') ? $('#span-' + current_question + 'b').addClass('option-wrong') : ' ';
//         $('#option-' + current_question + 'c' ).is(':checked') ? $('#span-' + current_question + 'c').addClass('option-wrong') : ' ';
//         $('#option-' + current_question + 'd' ).is(':checked') ? $('#span-' + current_question + 'd').addClass('option-wrong') : ' ';

//         $('#span-' + current_question + answer).addClass('option-right');
//         $('#alert-' + current_question).addClass('alert-success');

//     }

//     $('#alert-' + current_question).slideToggle();
   
// });

