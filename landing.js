AOS.init({
  once: true,
  // disable: function () {
  //   return window.innerWidth < 768;
  // },
});

$(document).ready(function () {
  $("#menu-btn").on("click", function () {
    $("#mobile-menu").toggleClass("hidden");
    $(this).find("i").toggleClass("bi-list bi-x");
  });

  $("#mobile-menu a").on("click", function () {
    $("#mobile-menu").addClass("hidden");
    $("#menu-btn").find("i").addClass("bi-list").removeClass("bi-x");
  });

  $(window).on("scroll", function () {
    var scrollPos = $(window).scrollTop();
    var offset = 120;

    if (scrollPos > 50) {
      $("nav")
        .addClass("shadow-md bg-white")
        .removeClass("bg-white/90 shadow-sm");
    } else {
      $("nav")
        .addClass("shadow-sm bg-white/90")
        .removeClass("shadow-md bg-white");
    }

    $(".nav-link").each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));

      if (refElement.length) {
        if (
          refElement.position().top - offset <= scrollPos &&
          refElement.position().top + refElement.outerHeight() > scrollPos
        ) {
          $(".nav-link")
            .removeClass("text-emerald-600")
            .addClass("text-slate-600");
          $('.nav-link[href="' + currLink.attr("href") + '"]')
            .removeClass("text-slate-600")
            .addClass("text-emerald-600");
        }
      }
    });
  });
});

// scrippt counter
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");
  const speed = 100;

  const startCounter = (counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});
