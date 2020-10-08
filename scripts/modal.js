$(document).ready(function() {
  // MODAL
  var modalText = {
    forhuman: {
      title: '인간을 위하여',
      tag: 'Mastered by yeongungod',
      detail:
        '"인간을 위하여"는 학교 제작 씬스터디, 세트 드라마로 만들어졌습니다. 무엇보다 제가 가장 열심히 했고, 추억이 많은 작품입니다.',
      link: 'https://yeongungod.github.io/'
    },
    forproduction: {
      title: '작품을 위하여',
      tag: 'Mastered by yeongungod',
      detail:
        '"작품을 위하여"는 저희가 한 작품을 만드는 과정을 통해 작품에 대한 태도, 철학, 열정 등을 보여주는 작품입니다.',
      link: 'https://yeongungod.github.io/'
    },
    flygirl: {
      title: '비행소녀',
      tag: 'Mixed by yeongungod',
      detail:
        '"비행소녀"는 늘품 영화제작팀에서 만든 독립단편영화로 사운드 후반작업을 담당했습니다.',
      link: 'https://yeongungod.github.io/'
    },
    sua: {
      title: '수아',
      tag: 'Mastered by yeongungod',
      detail:
        '"수아"는 솔직히 지금도 잘 모르겠습니다. 제가 작업하고도 의문이 많은 작품입니다.',
      link: 'https://yeongungod.github.io/'
    },
    teacher: {
      title: '창작의 고통',
      tag: 'Mastered by yeongungod',
      detail:
        '"창작의 고통"은 교내 스승의 날 공모전으로 만든 영상입니다. 동기들과의 추억이 담겨있고, 무엇보다 제가 제대로 된 음향 작업을 처음 하게 된 작품이기도 합니다.',
	  link: 'https://yeongungod.github.io/'
    },
    remeet: {
      title: '제애',
      tag: 'Mastered by yeongungod',
      detail:
        '"제애"는 제가 처음으로 작업한 단편영화입니다. 우여곡절이 정말 많았지만 그 과정에서 얻은 추억만큼은 무엇과도 바꿀 수 없는 작품입니다.',
      link: 'https://yeongungod.github.io/'
    },
    yugyoutube: {
      title: 'yeongungod Youtube',
      tag: 'Mastered by yeongungod',
      detail:
        '저는 편집과 meme을 엄청 좋아합니다. 가끔씩 재미있는 생각이 들면 그것을 영상으로 옮기는 것을 좋아합니다.',
      link: 'https://yeongungod.github.io/'
	},
    wakgood: {
      title: '우왁굳의 게임방송',
      tag: 'Edited by yeongungod',
      detail:
        '처음으로 남의 영상을 만들었습니다. 시청자이자 팬이었던 제가 직접 영상을 만드는 것은 정말이지 꿈만 같았습니다.',
      link: 'https://yeongungod.github.io/'
	},
    yuns: {
      title: '윤스아카데미',
      tag: 'Edited by yeongungod',
      detail:
        '좋은 사람과 함께 입시라는 큰 벽을 둔 후배들에게 조언을 줄 수 있는 영상을 만드는 것은 매우 보람찹니다.',
      link: 'https://yeongungod.github.io/' 
	}
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + '-' + index + ".png') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});
