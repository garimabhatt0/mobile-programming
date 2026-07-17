$(function () {

  /* ── Helpers ── */
  function out(msg) { $('#output').text(msg); }

  /* ── 1. GET & SET ── */
  $('#btn-show-name').click(function () {
    out($('#student-name').text());
  });

  $('#btn-change-name').click(function () {
    $('#student-name').text('Garima Bhatt');
    out('Name changed to: Garima Bhatt');
  });

  $('#btn-show-bio').click(function () {
    out($('#student-bio').html());
  });

  $('#btn-get-input').click(function () {
    out($('#nickname-input').val() || '(input is empty)');
  });

  $('#btn-set-input').click(function () {
    $('#nickname-input').val('Gari');
    out('Input value set to: Gari');
  });

  /* ── 2. CSS CLASSES ── */
  $('#btn-highlight').click(function () {
    $('#profile-card').addClass('highlighted');
    out('Class "highlighted" added to #profile-card');
  });

  $('#btn-remove-highlight').click(function () {
    $('#profile-card').removeClass('highlighted');
    out('Class "highlighted" removed from #profile-card');
  });

  $('#btn-dark-mode').click(function () {
    $('#profile-card').toggleClass('dark-mode');
    var state = $('#profile-card').hasClass('dark-mode') ? 'ON' : 'OFF';
    out('Dark mode toggled — now: ' + state);
  });

  $('#btn-rounded').click(function () {
    $('#profile-photo').toggleClass('rounded');
    var state = $('#profile-photo').hasClass('rounded') ? 'circular' : 'square';
    out('Profile photo shape: ' + state);
  });

  /* ── 3. CSS METHOD ── */
  $('#btn-red-bg').click(function () {
    $('#profile-card').css('background', '#e74c3c');
    out('Background changed to #e74c3c via .css()');
  });

  $('#btn-reset-bg').click(function () {
    $('#profile-card').css('background', 'white');
    out('Background reset to white via .css()');
  });

  /* ── 4. HIDE & SHOW ── */
  $('#btn-hide-photo').click(function () {
    $('#profile-photo').hide('slow');
    out('#profile-photo hidden with .hide("slow")');
  });

  $('#btn-show-photo').click(function () {
    $('#profile-photo').show('slow');
    out('#profile-photo shown with .show("slow")');
  });

  $('#btn-toggle-bio').click(function () {
    $('#student-bio').toggle();
    var state = $('#student-bio').is(':visible') ? 'visible' : 'hidden';
    out('#student-bio toggled — now: ' + state);
  });

  /* ── 5. FADE ── */
  $('#btn-fade-out').click(function () {
    $('#profile-card').fadeOut();
    out('#profile-card faded out');
  });

  $('#btn-fade-in').click(function () {
    $('#profile-card').fadeIn();
    out('#profile-card faded in');
  });

  $('#btn-fade-half').click(function () {
    $('#profile-card').fadeTo('slow', 0.5);
    out('#profile-card opacity set to 0.5 via .fadeTo()');
  });

  /* ── 6. SLIDE ── */
  $('#btn-slide-up').click(function () {
    $('#skills-list').slideUp();
    out('#skills-list slid up');
  });

  $('#btn-slide-down').click(function () {
    $('#skills-list').slideDown();
    out('#skills-list slid down');
  });

  $('#btn-slide-toggle').click(function () {
    $('#skills-list').slideToggle();
    out('#skills-list slide toggled');
  });

  /* ── 7. ANIMATE (chained) ── */
  $('#btn-animate').click(function () {
    $('#profile-card')
      .animate({ marginLeft: '200px' }, 1000)
      .animate({ marginLeft: '0px'   }, 1000);
    out('Animated #profile-card: 200px → 0px (chained)');
  });

  /* ── 8. EVENTS ── */
  $('#profile-photo')
    .on('mouseenter', function () {
      $(this).addClass('shadow');
      out('mouseenter: "shadow" class added to #profile-photo');
    })
    .on('mouseleave', function () {
      $(this).removeClass('shadow');
      out('mouseleave: "shadow" class removed from #profile-photo');
    });

  $('#nickname-input').on('keypress', function (e) {
    out('Key pressed: "' + e.key + '"');
  });

});

