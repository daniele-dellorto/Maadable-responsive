/*variables*/

var margin, hwnd, wwnd, fh, fw, headerh, ph, footerh, projecth, filterh, bMenuR, bMenuW, cFilterW, centerCF, topBmenu, footerhContact

var mobile = window.matchMedia('(max-width: 600px)');

var tablet = window.matchMedia('(max-width: 1024px)');

var desktop = window.matchMedia('(min-width: 1025px)');

var col4w, col7w

var firstTime = true;
var delay = true;

var dHov = false;
var a1Hov = false;
var mHov = false;
var a2Hov = false;

var openCat = false;
var activeCat = false;

var openTitle = false;
var activeTitle = false;

var linkTitleh;
var linkTitleHeightSaved;

var aboutChange;
var aboutState = 0;

var durationAnimation1;
var durationAnimation2;
var widthAnimationTxt;
var widthAnimationImg;

//_________________________________________________________________________

// var GET = {};
// var query = window.location.search.substring(1).split("&");
// for (var i = 0, max = query.length; i < max; i++)
// {
//   if (query[i] === "") // check for trailing & with no param
//       continue;
//
//   var param = query[i].split("=");
//   GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
// }

//_________________________________________________________________________

function removePrefix(prefix,s) {
    return s.substr(prefix.length);
}

var p = removePrefix('https://daniele-dellorto.github.io/Maadable-responsive/', window.location.href)

alert(window.location.href);
alert(p);

//_____________________________________________________________________

jQuery(document).ready(function($) {

  $(".carousel").on("touchstart", function(event) {
    var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function(event) {
      var xMove = event.originalEvent.touches[0].pageX;
      if (Math.floor(xClick - xMove) > 5) {
        $(this).carousel('next');
      } else if (Math.floor(xClick - xMove) < -5) {
        $(this).carousel('prev');
      }
    });
    $(".carousel").on("touchend", function() {
      $(this).off("touchmove");
    });
  });

  /*open-menu*/
  $("#burgerMenuButton").click(function() {
    if ($('#burgerCross').hasClass('noDisplay')) {
      $("#menuPage").removeClass('noDisplay');
      $("#menuPage").addClass('open');
      $("#burgerCross").removeClass('noDisplay');
      $("#burgerMenu").addClass('noDisplay');
      if ($('a.index').length > 0) {
        $('.founder').removeClass('still');
        $('.founder').addClass('noDisplay');
        $('#closeFilter').addClass('noDisplay');
        $('.damaButton').removeClass('live');
        $('.link').addClass('selectedAuthor');
        filterFunction();
      }
    } else {
      $("#menuPage").addClass('noDisplay');
      $("#menuPage").removeClass('open');
      $("#burgerCross").addClass('noDisplay');
      $("#burgerMenu").removeClass('noDisplay');
    }
  });

  $('.link').hover(function() {
      if (desktop.matches) {
        $(this).find('.linkDefaultImg').addClass('noDisplay');
        $(this).find('.linkHoverImg').removeClass('noDisplay');
      }
    },
    function() {
      if (desktop.matches) {
        $(this).find('.linkDefaultImg').removeClass('noDisplay');
        $(this).find('.linkHoverImg').addClass('noDisplay');
      }
    });

  /*front-page*/

  if ($('a.index').length > 0) {

    $('.topbttn').click(function() {
      $('#page').animate({
        scrollTop: $('#start').offset().top
      }, 500);
    });

  }

  /*other pages*/

  if ($('a.index').length < 1) {

    $('#topButton').hide();
    if ($('a.project').length < 1) {
      $('#topButtonMobile').hide();
    }

    $('.damaButton').click(function() {
      window.location.replace('index.html');
    });

    $('#underNameContainer').hide();

    if ($('a.project').length < 1) {
      $('#nameContainer').hide();
    }

  }

  /*about*/

  if ($('a.about').length > 0) {

    $('#aboutButton').css('background-color', '#000');
    $('#aboutButton p').css('color', '#fff');

  }

  /*contact*/

  if ($('a.contact').length > 0) {

    $('#contactButton').css('background-color', '#000');
    $('#contactButton p').css('color', '#fff');

  }

  /*project*/

  if ($('a.project').length > 0) {

    $('.topbttn').click(function() {
      $('#page').animate({
        scrollTop: $('#start').offset().top
      }, 500);
    });

  }

});

/*dynamic responsive*/

function responsiveHome() {
  if (mobile.matches) {
    $('#category').addClass('col-12');
    $('.cat').removeClass('col-6');
    $('#all').removeClass('col-6');
    $('.cat').addClass('col-12');
    $('#all').addClass('col-12');
    $('#category h2').text('category');
  } else if (tablet.matches) {
    $('#category').addClass('col-12');
    $('.cat').removeClass('col-12');
    $('#all').removeClass('col-12');
    $('.cat').addClass('col-6');
    $('#all').addClass('col-6');
    $('#category h2').text('category');
    $('#openCategories').css('transform', 'translateY(-50%)');
    activeCat = false;
    openCat = false;
  } else {
    $('#category').removeClass('col-12');
    $('.cat').removeClass('col-6');
    $('.cat').removeClass('col-12');
    $('#all').removeClass('col-6');
    $('#all').removeClass('col-12');
    $('#all').addClass('noDisplay');
    $('.cat').addClass('noDisplay');
    $('.clicked').removeClass('noDisplay');
  }
}

responsiveHome() // Call listener function at run time
mobile.addListener(responsiveHome) // Attach listener function on state changes
tablet.addListener(responsiveHome) // Attach listener function on state changes

/*filters Home*/

function homeFilter() {

  if ($('a.index').length > 0) {

    $('#catHover').hover(function() {
        $('.cat').removeClass('noDisplay');
      },
      function() {
        $('.cat').addClass('noDisplay');
        $('.clicked').removeClass('noDisplay');
      });

    if (!desktop.matches) {
      $('#catHover').unbind('mouseenter mouseleave');
    }

    $('#category').click(function() {
      if (desktop.matches) {
        $('#category h2').text('category');
        $('.cat').removeClass('clicked');
        $('.link').addClass('selectedCategory');
        filterFunction();
      } else {
        if (openCat == false) {
          $('.cat').removeClass('noDisplay');
          $('#all').removeClass('noDisplay');
          $('#openCategories').css('transform', 'translateY(-50%) rotate(180deg)');
          activeCat = true;
        } else if (openCat == true) {
          $('.cat').addClass('noDisplay');
          $('.clicked').removeClass('noDisplay');
          $('#all').addClass('noDisplay');
          $('#openCategories').css('transform', 'translateY(-50%)');
          activeCat = false;
        }
        if (activeCat == true) {
          openCat = true;
        } else if (activeCat == false) {
          openCat = false;
        }
      }
    });

    $('.cat').click(function() {

      $('.cat').removeClass('clicked');
      $(this).addClass('clicked');

      if ($('#BrandIdentity').parent().hasClass('clicked')) {
        $('.link').removeClass('selectedCategory');
        $('.BrandIdentity').addClass('selectedCategory');
      } else if ($('#EditorialDesign').parent().hasClass('clicked')) {
        $('.link').removeClass('selectedCategory');
        $('.EditorialDesign').addClass('selectedCategory');
      } else if ($('#GameDesign').parent().hasClass('clicked')) {
        $('.link').removeClass('selectedCategory');
        $('.GameDesign').addClass('selectedCategory');
      } else if ($('#Photography').parent().hasClass('clicked')) {
        $('.link').removeClass('selectedCategory');
        $('.Photography').addClass('selectedCategory');
      } else if ($('#SpeculativeDesign').parent().hasClass('clicked')) {
        $('.link').removeClass('selectedCategory');
        $('.SpeculativeDesign').addClass('selectedCategory');
      } else if ($('#UXUI').parent().hasClass('clicked')) {
        $('.link').removeClass('selectedCategory');
        $('.UXUI').addClass('selectedCategory');
      } else if ($('#Videomaking').parent().hasClass('clicked')) {
        $('.link').removeClass('selectedCategory');
        $('.Videomaking').addClass('selectedCategory');
      }

      if (desktop.matches) {
        $('#category h2').text('all categories');
      } else {
        $('#openCategories').css('transform', 'translateY(-50%)');
        openCat = false;
        $('.cat').addClass('noDisplay');
        $('#all').addClass('noDisplay');
        $('.clicked').removeClass('noDisplay');
      }

      filterFunction();

    });

    $('#all').click(function() {
      $('.cat').removeClass('clicked');
      $('.link').addClass('selectedCategory');
      filterFunction();
      $('#openCategories').css('transform', 'translateY(-50%)');
      $('.cat').addClass('noDisplay');
      $('#all').addClass('noDisplay');
      openCat = false;
    });


    $('#d').hover(function() {
      $('#daniele').removeClass('noDisplay');
    });
    $('#a1').hover(function() {
      $('#aurora').removeClass('noDisplay');
    });
    $('#m').hover(function() {
      $('#martina').removeClass('noDisplay');
    });
    $('#a2').hover(function() {
      $('#alessandro').removeClass('noDisplay');
    });

    $('.damaButton').click(function() {
      if ($('#menuPage').hasClass('open')) {
        $('.damaButton').removeClass('live');
        $('.damaButton').removeClass('on');
      } else {
        $('#closeFilter').removeClass('noDisplay');
        $('.founder').removeClass('still');
        $('.damaButton').removeClass('live');
        $(this).addClass('live');
        if ($('#d').hasClass('live')) {
          $('#daniele').addClass('still');
          $('#daniele').removeClass('noDisplay');
          $('.link').removeClass('selectedAuthor');
          $('.DanieleDellorto').addClass('selectedAuthor');
        }
        if ($('#a1').hasClass('live')) {
          $('#aurora').addClass('still');
          $('#aurora').removeClass('noDisplay');
          $('.link').removeClass('selectedAuthor');
          $('.AuroraSaita').addClass('selectedAuthor');
        }
        if ($('#m').hasClass('live')) {
          $('#martina').addClass('still');
          $('#martina').removeClass('noDisplay');
          $('.link').removeClass('selectedAuthor');
          $('.MartinaMelillo').addClass('selectedAuthor');
        }
        if ($('#a2').hasClass('live')) {
          $('#alessandro').addClass('still');
          $('#alessandro').removeClass('noDisplay');
          $('.link').removeClass('selectedAuthor');
          $('.AlessandroQuets').addClass('selectedAuthor');
        }
        filterFunction();
      }
    });

    $('#closeFilter').click(function() {
      $('.founder').removeClass('still');
      $('.founder').addClass('noDisplay');
      $('#closeFilter').addClass('noDisplay');
      $('.damaButton').removeClass('live');
      $('.link').addClass('selectedAuthor');
      filterFunction();
    });

    $('.damaButton').hover(function() {
        if ($(this).hasClass('live')) {
          $('.still').removeClass('noDisplay');
        } else {
          $('.still').addClass('noDisplay');
        }
        $(this).addClass('on');
      },
      function() {
        $(this).removeClass('on');
        $('.founder').addClass('noDisplay');
        $('.still').removeClass('noDisplay');
      });

  }

}

homeFilter() // Call listener function at run time
desktop.addListener(homeFilter) // Attach listener function on state changes

function filterFunction() {
  $('.link').addClass('noDisplay');
  $('.selectedCategory.selectedAuthor').removeClass('noDisplay');
  if ($(".link").not(".noDisplay").length < 1) {
    $('#projects').css('height', projecth);
    $('#noResult').removeClass('noDisplay');
  } else {
    $('#projects').css('height', 'auto');
    $('#noResult').addClass('noDisplay');
  }
};

/* Responsive project*/

function responsiveProject() {
  if (tablet.matches) {
    $('#imgProject').addClass('col-12');
    $('#imgProject').addClass('col-12');
  } else {
    $('#imgProject').removeClass('col-12');
    $('#txtProject').removeClass('col-12');
  }
}

responsiveProject() // Call listener function at run time
tablet.addListener(responsiveProject) // Attach listener function on state changes

function projectNameResponsive() {

  if ($('a.project').length > 0) {

    if (mobile.matches) {

      $('#nameContainer').hide();
      $('.comma').addClass('noDisplay');
      $('.founderMobile').addClass('col-12');

      if (M == true) {
        $('#m').addClass('on');
        $('#martinaMobile').removeClass('noDisplay');
      }
      if (A1 == true) {
        $('#a1').addClass('on');
        $('#auroraMobile').removeClass('noDisplay');
      }
      if (A2 == true) {
        $('#a2').addClass('on');
        $('#alessandroMobile').removeClass('noDisplay');
      }
      if (D == true) {
        $('#d').addClass('on');
        $('#danieleMobile').removeClass('noDisplay');
      }

    } else if (tablet.matches) {

      $('#nameContainer').hide();
      $('.founderMobile').removeClass('col-12');
      $('.comma').removeClass('noDisplay');

      if (M == true) {
        $('#m').addClass('on');
        $('#martinaMobile').removeClass('noDisplay');
        if (A1 == true || A2 == true || D == true) {
          $('#comma1Mobile').removeClass('noDisplay');
        }
      }
      if (A1 == true) {
        $('#a1').addClass('on');
        $('#auroraMobile').removeClass('noDisplay');
        if (A2 == true || D == true) {
          $('#comma2Mobile').removeClass('noDisplay');
        }
      }
      if (A2 == true) {
        $('#a2').addClass('on');
        $('#alessandroMobile').removeClass('noDisplay');
        if (D == true) {
          $('#comma3Mobile').removeClass('noDisplay');
        }
      }
      if (D == true) {
        $('#d').addClass('on');
        $('#danieleMobile').removeClass('noDisplay');
      }

    } else if (desktop.matches) {

      $('#nameContainer').show();
      $('.founder').css('position', 'relative');
      $('.comma').addClass('noDisplay');

      if (M == true) {
        $('#m').addClass('on');
        $('#martina').removeClass('noDisplay');
        if (A1 == true || A2 == true || D == true) {
          $('#comma1').removeClass('noDisplay');
        }
      }
      if (A1 == true) {
        $('#a1').addClass('on');
        $('#aurora').removeClass('noDisplay');
        if (A2 == true || D == true) {
          $('#comma2').removeClass('noDisplay');
        }
      }
      if (A2 == true) {
        $('#a2').addClass('on');
        $('#alessandro').removeClass('noDisplay');
        if (D == true) {
          $('#comma3').removeClass('noDisplay');
        }
      }
      if (D == true) {
        $('#d').addClass('on');
        $('#daniele').removeClass('noDisplay');
      }

    }

  }

}

projectNameResponsive() // Call listener function at run time
mobile.addListener(projectNameResponsive) // Attach listener function on state changes
tablet.addListener(projectNameResponsive) // Attach listener function on state changes

$("#projTitleMobile").click(function openMobileTitle() {

  if (openTitle == false) {
    $('#founderTextMobile').removeClass('noDisplay');
    $('#openProjNames').css('transform', 'translateY(-50%) rotate(180deg)');
    activeTitle = true;
  } else if (openTitle == true) {
    $('#founderTextMobile').addClass('noDisplay');
    $('#openProjNames').css('transform', 'translateY(-50%)');
    activeTitle = false;
  }

  if (activeTitle == false) {
    openTitle = false;
  } else if (activeTitle == true) {
    openTitle = true;
  }

});

/* Responsive about*/

function responsiveAbout() {
  if (tablet.matches) {
    $('#usText').removeClass('col-5');
    $('#usText').addClass('col-12');
    $('#aboutImage').removeClass('col');
  } else {
    $('#usText').removeClass('col-12');
    $('#usText').addClass('col-5');
    $('#aboutImage').addClass('col');
  }
}

responsiveAbout() // Call listener function at run time
tablet.addListener(responsiveAbout) // Attach listener function on state changes

function aboutAnimationDesktop() {

  $('#Dhover').hover(function() {
    dHov = true;
    a1Hov = false;
    mHov = false;
    a2Hov = false;
  });

  $('#A1hover').hover(function() {
    dHov = false;
    a1Hov = true;
    mHov = false;
    a2Hov = false;
  });

  $('#Mhover').hover(function() {
    dHov = false;
    a1Hov = false;
    mHov = true;
    a2Hov = false;
  });

  $('#A2hover').hover(function() {
    dHov = false;
    a1Hov = false;
    mHov = false;
    a2Hov = true;
  });

  $('.big a').hover(function aboutAnimation() {

    $('.nameTitle').addClass('noDisplay');
    $('.nameText').addClass('noDisplay');

    $('.big a').css('color', '#000');
    $('.big a').css('background-color', '#fff');

    if (dHov == true) {
      $('#Dhover').css('color', '#fff');
      $('#Dhover').css('background-color', '#000');
    } else if (a1Hov == true) {
      $('#A1hover').css('color', '#fff');
      $('#A1hover').css('background-color', '#000');
    } else if (mHov == true) {
      $('#Mhover').css('color', '#fff');
      $('#Mhover').css('background-color', '#000');
    } else if (a2Hov == true) {
      $('#A2hover').css('color', '#fff');
      $('#A2hover').css('background-color', '#000');
    }

    if (delay == true) {

      delay = false;

      $('.imgAb').removeClass('match');
      $('.nameTitle').removeClass('match');

      setTimeout(function() {
        delay = true
      }, 400);

      if (firstTime == false) {

        $('#container-FounderText').animate({
          width: col7w
        }, 200);

        $('#aboutImage').animate({
          width: '0'
        }, {
          duration: 200,
          complete: function() {
            if (dHov == true) {
              $('#aboutImage div').addClass('noDisplay');
              $('#imgd').removeClass('noDisplay');
              $('#imgd').addClass('match');
            } else if (a1Hov == true) {
              $('#aboutImage div').addClass('noDisplay');
              $('#imga1').removeClass('noDisplay');
              $('#imga1').addClass('match');
            } else if (mHov == true) {
              $('#aboutImage div').addClass('noDisplay');
              $('#imgm').removeClass('noDisplay');
              $('#imgm').addClass('match');
            } else if (a2Hov == true) {
              $('#aboutImage div').addClass('noDisplay');
              $('#imga2').removeClass('noDisplay');
              $('#imga2').addClass('match');
            }
          }
        });

      } else if (firstTime == true) {

        firstTime = false;

        $('#container-FounderText').animate({
          width: col7w
        }, 400);

        $('#aboutImage').animate({
          width: '0'
        }, {
          duration: 400,
          complete: function() {
            if (dHov == true) {
              $('#aboutImage div').addClass('noDisplay');
              $('#imgd').removeClass('noDisplay');
              $('#imgd').addClass('match');
            } else if (a1Hov == true) {
              $('#aboutImage div').addClass('noDisplay');
              $('#imga1').removeClass('noDisplay');
              $('#imga1').addClass('match');
            } else if (mHov == true) {
              $('#aboutImage div').addClass('noDisplay');
              $('#imgm').removeClass('noDisplay');
              $('#imgm').addClass('match');
            } else if (a2Hov == true) {
              $('#aboutImage div').addClass('noDisplay');
              $('#imga2').removeClass('noDisplay');
              $('#imga2').addClass('match');
            }
          }
        });
      }

      $('#container-FounderText').animate({
        width: col4w
      }, 200);

      $('#aboutImage').animate({
        width: fw - col4w
      }, {
        duration: 200,
        complete: function() {
          if (dHov == true) {
            $('#danieleTitle').removeClass('noDisplay');
            $('#danieleText').removeClass('noDisplay');
            $('#danieleTitle').addClass('match');
          } else if (a1Hov == true) {
            $('#auroraTitle').removeClass('noDisplay');
            $('#auroraText').removeClass('noDisplay');
            $('#auroraTitle').addClass('match');
          } else if (mHov == true) {
            $('#martinaTitle').removeClass('noDisplay');
            $('#martinaText').removeClass('noDisplay');
            $('#martinaTitle').addClass('match');
          } else if (a2Hov == true) {
            $('#alessandroTitle').removeClass('noDisplay');
            $('#alessandroText').removeClass('noDisplay');
            $('#alessandroTitle').addClass('match');
          }
          if (($('#danieleTitle').hasClass('match') && $('#imgd').hasClass('match')) ||
            ($('#auroraTitle').hasClass('match') && $('#imga1').hasClass('match')) ||
            ($('#martinaTitle').hasClass('match') && $('#imgm').hasClass('match')) ||
            ($('#alessandroTitle').hasClass('match') && $('#imga2').hasClass('match'))
          ) {} else {
            aboutAnimation();
          }
        }
      });

    }

  }, function() {

  });

}

function aboutAnimationTablet() {

  $('.big a').unbind('mouseenter mouseleave');

  $('#AboutArrowLeft').click(function() {
    aboutChange = -1;
  });

  $('#AboutArrowRight').click(function() {
    aboutChange = +1;
  });

  $('.carouselArrowAbout').click(function() {

    $('.nameTitle').addClass('noDisplay');
    $('.nameText').addClass('noDisplay');

    $('.big a').css('color', '#000');
    $('.big a').css('background-color', '#fff');

    $('.carouselArrowAbout').addClass('noDisplay');

    if (aboutChange == -1) {
      --aboutState;
    } else if (aboutChange == +1) {
      ++aboutState;
    }

    if (aboutState == 5) {
      aboutState = 0;
    }
    if (aboutState == -1) {
      aboutState = 4;
    }

    if ((aboutState == 1 && aboutChange == +1) || (aboutState == 4 && aboutChange == -1)) {
      durationAnimation1 = 400;
    } else {
      durationAnimation1 = 200;
    }

    if (aboutState == 0) {
      widthAnimationTxt = 0;
      widthAnimationImg = '100%';
      durationAnimation2 = 400;
    } else {
      widthAnimationTxt = '50%';
      widthAnimationImg = '50%';
      durationAnimation2 = 200;
    }

    $('#container-FounderText').animate({
      width: '0'
    }, durationAnimation1);

    $('#aboutImage').animate({
      width: '1px'
    }, {
      duration: durationAnimation1,
      complete: function() {
        if (aboutState == 4) {
          $('#aboutImage div').addClass('noDisplay');
          $('#imgd').removeClass('noDisplay');
          $('#Dhover').css('color', '#fff');
          $('#Dhover').css('background-color', '#000');
        } else if (aboutState == 2) {
          $('#aboutImage div').addClass('noDisplay');
          $('#imga1').removeClass('noDisplay');
          $('#A1hover').css('color', '#fff');
          $('#A1hover').css('background-color', '#000');
        } else if (aboutState == 1) {
          $('#aboutImage div').addClass('noDisplay');
          $('#imgm').removeClass('noDisplay');
          $('#Mhover').css('color', '#fff');
          $('#Mhover').css('background-color', '#000');
        } else if (aboutState == 3) {
          $('#aboutImage div').addClass('noDisplay');
          $('#imga2').removeClass('noDisplay');
          $('#A2hover').css('color', '#fff');
          $('#A2hover').css('background-color', '#000');
        } else {
          $('#aboutImage div').addClass('noDisplay');
          $('#imgteam').removeClass('noDisplay')
        }
      }
    });

    $('#container-FounderText').animate({
      width: widthAnimationTxt
    }, durationAnimation2);

    $('#aboutImage').animate({
      width: widthAnimationImg
    }, {
      duration: durationAnimation2,
      complete: function() {
        $('.carouselArrowAbout').removeClass('noDisplay');
        if (aboutState == 4) {
          $('#danieleTitle').removeClass('noDisplay');
          $('#danieleText').removeClass('noDisplay');
        } else if (aboutState == 2) {
          $('#auroraTitle').removeClass('noDisplay');
          $('#auroraText').removeClass('noDisplay');
        } else if (aboutState == 1) {
          $('#martinaTitle').removeClass('noDisplay');
          $('#martinaText').removeClass('noDisplay');
        } else if (aboutState == 3) {
          $('#alessandroTitle').removeClass('noDisplay');
          $('#alessandroText').removeClass('noDisplay');
        }
      }
    });

  });

}

function aboutAnimationMobile() {

  $('.big a').unbind('mouseenter mouseleave');

  $('#AboutArrowLeft').click(function() {
    aboutChange = -1;
  });

  $('#AboutArrowRight').click(function() {
    aboutChange = +1;
  });

  $('.carouselArrowAbout').click(function() {

    $('.nameTitle').addClass('noDisplay');
    $('.nameText').addClass('noDisplay');

    $('.big a').css('color', '#000');
    $('.big a').css('background-color', '#fff');

    $('.carouselArrowAbout').addClass('noDisplay');
    $('#container-FounderText').addClass('noDisplay');
    $('#usText').addClass('noDisplay');

    if (aboutChange == -1) {
      --aboutState;
    } else if (aboutChange == +1) {
      ++aboutState;
    }

    if (aboutState == 5) {
      aboutState = 0;
    }
    if (aboutState == -1) {
      aboutState = 4;
    }

    if ((aboutState == 1 && aboutChange == +1) || (aboutState == 4 && aboutChange == -1)) {
      durationAnimation1 = 350;
    } else {
      durationAnimation1 = 400;
    }

    if (aboutState == 0) {
      heightAnimationImg = '70vw';
      durationAnimation2 = 350;
    } else {
      heightAnimationImg = '85vw';
      durationAnimation2 = 400;
    }

    $('#aboutImage').animate({
      height: '1px'
    }, {
      duration: durationAnimation1,
      complete: function() {
        if (aboutState == 4) {
          $('#aboutImage div').addClass('noDisplay');
          $('#imgd').removeClass('noDisplay');
          $('#Dhover').css('color', '#fff');
          $('#Dhover').css('background-color', '#000');
        } else if (aboutState == 2) {
          $('#aboutImage div').addClass('noDisplay');
          $('#imga1').removeClass('noDisplay');
          $('#A1hover').css('color', '#fff');
          $('#A1hover').css('background-color', '#000');
        } else if (aboutState == 1) {
          $('#aboutImage div').addClass('noDisplay');
          $('#imgm').removeClass('noDisplay');
          $('#Mhover').css('color', '#fff');
          $('#Mhover').css('background-color', '#000');
        } else if (aboutState == 3) {
          $('#aboutImage div').addClass('noDisplay');
          $('#imga2').removeClass('noDisplay');
          $('#A2hover').css('color', '#fff');
          $('#A2hover').css('background-color', '#000');
        } else {
          $('#aboutImage div').addClass('noDisplay');
          $('#imgteam').removeClass('noDisplay')
        }
      }
    });

    $('#aboutImage').animate({
      height: heightAnimationImg
    }, {
      duration: durationAnimation2,
      complete: function() {
        $('.carouselArrowAbout').removeClass('noDisplay');
        if (aboutState == 0) {
          $('#usText').removeClass('noDisplay');
        } else {
          $('#container-FounderText').removeClass('noDisplay');
          if (aboutState == 4) {
            $('#danieleTitle').removeClass('noDisplay');
            $('#danieleText').removeClass('noDisplay');
          } else if (aboutState == 2) {
            $('#auroraTitle').removeClass('noDisplay');
            $('#auroraText').removeClass('noDisplay');
          } else if (aboutState == 1) {
            $('#martinaTitle').removeClass('noDisplay');
            $('#martinaText').removeClass('noDisplay');
          } else if (aboutState == 3) {
            $('#alessandroTitle').removeClass('noDisplay');
            $('#alessandroText').removeClass('noDisplay');
          }
        }
      }
    });

  });

}

if (mobile.matches) {
  aboutAnimationMobile()
} else if (tablet.matches) {
  aboutAnimationTablet()
} else if (desktop.matches) {
  aboutAnimationDesktop()
}

function adjustAbout() {
  if ($('a.about').length > 0) {
    window.location.replace('about.html');
  }
}

mobile.addListener(adjustAbout);
desktop.addListener(adjustAbout);

/*adjust size*/

function adjustFrameSize() {

  margin = 2 * (($('body').css('margin')).replace(/px/, ''));
  if (tablet.matches && $('a.index').length > 0) {
    headerh = 2 * (($('#header').css('height')).replace(/px/, ''));
  } else {
    headerh = ($('#header').css('height')).replace(/px/, '');
  }

  hwnd = $(window).outerHeight();
  wwnd = $(window).width();

  fh = hwnd - margin - 2;
  fw = wwnd - margin - 2;

  $('#frame').css('height', fh);
  $('#frame').css('width', fw);

  $('#menuPage').css('height', fh - 59);
  $('#menuPage').css('width', fw);

  footerh = parseInt(($('#footer').css('height')).replace(/px/, ''));

  ph = fh - headerh;

  $('#page').css('height', ph);

  topBmenu = (margin / 2) + 60;

  $('#menuPage').css('top', topBmenu);

}

function adjustPageSize() {

  if ($('a.project').length > 0 || $('a.index').length > 0) {

    linkTitleh = parseInt(($('p').css('line-height')).replace(/px/, '')) + 2 * parseInt(($('.linkTitle').css('margin-top')).replace(/px/, '')) + 10;

    var linkTitleFrame = document.getElementsByClassName('linkTitleFrame');

    for (var i = 0; i < linkTitleFrame.length; i++) {

      if (parseInt(($(linkTitleFrame[i]).css('height')).replace(/px/, '')) < linkTitleh) {

        linkTitleHeightSaved = parseInt(($(linkTitleFrame[i]).css('height')).replace(/px/, ''));

      } else if (parseInt(($(linkTitleFrame[i]).css('height')).replace(/px/, '')) > linkTitleh) {

        var rightHeight = parseInt(($(linkTitleFrame[i]).css('height')).replace(/px/, '')) - linkTitleHeightSaved;
        $(linkTitleFrame[i]).css('bottom', rightHeight);

      }
    }
  }

  if (mobile.matches) {

    bMenuR = parseInt(($('#burgerMenu').css('right')).replace(/px/, ''));
    bMenuW = (parseInt(($('#burgerMenu').css('width')).replace(/px/, ''))) / 2;
    cFilterW = (parseInt(($('#closeFilter').css('width')).replace(/px/, ''))) / 2;

    centerCF = bMenuR + cFilterW + bMenuW

    $('#closeFilter').css('right', centerCF);
    $('#openCategories').css('right', centerCF);
    $('#openProjNames').css('right', centerCF);

  } else if (!mobile.matches) {

    $('#openCategories').css('right', 30);
    $('#openProjNames').css('right', 30);

  }

  if ($('a.project').length > 0) {

    var ih, iw, lh

    col4w = 2 * (parseInt(($('#aboutButton').css('width')).replace(/px/, '')));

    iw = fw - col4w;

    ih = fh - 2 * headerh;
    lh = fh - headerh - footerh;

    if (mobile.matches) {

      $('.imgHeight').css('height', '58vw');
      $('.imgHeight').css('max-height', ih);
      $('#relatedLinks').css('height', 'auto');

    } else if (tablet.matches) {

      $('.imgHeight').css('height', '58vw');
      $('.imgHeight').css('max-height', ih);
      $('#relatedLinks').css('height', 'auto');

    } else {

      $('.imgHeight').css('height', ih);
      $('#imgProject').css('width', iw);
      $('#txtProject').css('width', fw - iw - 2);
      $('#relatedLinks').css('height', lh);

    }



  } else if ($('a.about').length > 0) {

    var abouth, firsth, ush, usTexth, ushmobile

    abouth = fh - headerh - footerh - 6;

    firsth = parseInt(($('#aboutDama').css('height')).replace(/px/, ''));

    ush = abouth - firsth

    usTexth = parseInt(($('#usText').css('height')).replace(/px/, '')) + 2 * parseInt(($('#usText').css('padding-top')).replace(/px/, '')) + 4;

    ushmobile = ush - usTexth;

    if (mobile.matches) {
      $('#heightAbout').css('height', 'max-content');
      $('#heightAbout').css('min-height', abouth);
      $('#aboutImage').css('height', '70vw');
      $('#container-FounderText').removeClass('lt');
      $('#container-FounderText').addClass('noDisplay');
      $('#aboutImage').addClass('bttm');
      $('#aboutImage').addClass('order-1');
      $('#usText').addClass('order-2');
    } else if (tablet.matches) {
      $('#heightAbout').css('height', 'max-content');
      $('#aboutImage').css('min-height', '50vw');
      $('#aboutImage').css('height', ushmobile);
      $('#container-FounderText').css('min-height', '50vw');
      $('#container-FounderText').css('height', ushmobile);
    } else {
      $('#heightAbout').css('height', abouth);
      $('#us').css('height', ush);
    }

    col4w = 2 * (parseInt(($('#aboutButton').css('width')).replace(/px/, '')));

    col7w = fw - (parseInt(($('#usText').css('width')).replace(/px/, ''))) - 5;

  } else if ($('a.contact').length > 0) {

    var contacth

    $('#instagramF').hide();
    $('#emailF').hide();

    footerhContact = parseInt(($('#footer').css('height')).replace(/px/, ''));

    contacth = fh - headerh - footerhContact - 6;

    $('#heightContact').css('height', contacth);

  } else if ($('a.index').length > 0) {

    filterh = parseInt(($('#filters').css('height')).replace(/px/, ''));

    projecth = fh - headerh - footerh - filterh - 6

  }

}

$(adjustFrameSize);
window.addEventListener('resize', adjustFrameSize);
mobile.addListener(adjustFrameSize);
tablet.addListener(adjustFrameSize);

$(adjustPageSize);
window.addEventListener('resize', adjustPageSize);
mobile.addListener(adjustPageSize);
tablet.addListener(adjustPageSize);
