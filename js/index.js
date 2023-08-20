var toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'bottom-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

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
console.log('clicked', answer_quiz1["2"]["answer"][0])

  for(let i=1;i<=7;i++){
    let solution_msg = `<br>
    <button data-id="${i}" id="btn-${i}" class="btn btn-success mb-2">Check Answer</button>
    <div id="alert-${i}" class="alert" role="alert">
        <h4 class="alert-heading">Well done!</h4>
        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
        <hr>
        <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>`;
    $('.option-list-' + i).after(solution_msg);
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


$('.btn').click(function(){

  let text_of_but = 'Hide Answer';
  let text_of_but2 = $(this).text();
  $(this).text(text_of_but == text_of_but2 ? 'Check Answer' : 'Hide Answer');

  let current_question = $(this).data('id');
  let answer = answer_quiz1[current_question]["answer"][0];

  console.log(current_question, answer, $('#option-' + current_question + answer ).is(':checked'))

  if($('#option-' + current_question + answer ).is(':checked')){

    if(!answer_quiz1[current_question]["checked"]){
      answer_quiz1[current_question]["checked"] = true;
      $('.badge-' + current_question).append('<span class="badge rounded-pill bg-primary">Right <i class="bx bx-check"></i></span>');
      toastMixin.fire({
        animation: true,
        title: 'Correct Answer'
      });
    }

    $('#span-' + current_question + answer).addClass('option-right');
    $('#alert-' + current_question).addClass('alert-primary');
  } else {

    if(!answer_quiz1[current_question]["checked"]){
      answer_quiz1[current_question]["checked"] = true;
      $('.badge-' + current_question).append('<span class="badge rounded-pill bg-danger">Wrong <i class="bx bx-x"></i></span>');
      toastMixin.fire({
        title: 'Wrong Answer',
        icon: 'error'
      });
    }

    $('#option-' + current_question + 'a' ).is(':checked') ? $('#span-' + current_question + 'a').addClass('option-wrong') : ' ';
    $('#option-' + current_question + 'b' ).is(':checked') ? $('#span-' + current_question + 'b').addClass('option-wrong') : ' ';
    $('#option-' + current_question + 'c' ).is(':checked') ? $('#span-' + current_question + 'c').addClass('option-wrong') : ' ';
    $('#option-' + current_question + 'd' ).is(':checked') ? $('#span-' + current_question + 'd').addClass('option-wrong') : ' ';

    $('#span-' + current_question + answer).addClass('option-right');
    $('#alert-' + current_question).addClass('alert-success');
  
  }

  $('#alert-' + current_question).slideToggle();
   
});
