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

$(document).ready(function () {
  // 1. Fungsi Buka Lightbox
  $(".gallery-item").on("click", function () {
    // Ambil data dari elemen yang diklik
    const src = $(this).data("src");
    const title = $(this).data("title");
    const desc = $(this).data("desc");
    const category = $(this).data("category");

    // Suntikkan data ke dalam Modal Lightbox
    $("#lightbox-img").attr("src", src);
    $("#lightbox-title").text(title);
    $("#lightbox-desc").text(desc);
    $("#lightbox-category").text(category);

    // Tampilkan modal
    $("#gallery-lightbox").removeClass("hidden").addClass("flex");

    // Timeout kecil untuk memicu transisi (fade in & scale up)
    setTimeout(() => {
      $("#gallery-lightbox").removeClass("opacity-0").addClass("opacity-100");
      $("#lightbox-content").removeClass("scale-95").addClass("scale-100");
    }, 10);

    // Kunci scroll body di background agar rapi saat dibuka di HP
    $("body").css("overflow", "hidden");
  });

  // 2. Fungsi Tutup Lightbox
  function closeLightbox() {
    // Efek animasi keluar
    $("#gallery-lightbox").removeClass("opacity-100").addClass("opacity-0");
    $("#lightbox-content").removeClass("scale-100").addClass("scale-95");

    // Sembunyikan setelah animasi selesai (300ms)
    setTimeout(() => {
      $("#gallery-lightbox").removeClass("flex").addClass("hidden");
      $("body").css("overflow", ""); // Kembalikan scroll body
    }, 300);
  }

  // 3. Pemicu Tutup Lightbox
  $("#close-lightbox").on("click", closeLightbox); // via tombol X

  // via klik area kosong (backdrop)
  $("#gallery-lightbox").on("click", function (e) {
    if (e.target === this) {
      closeLightbox();
    }
  });

  // via tombol Escape di keyboard (untuk pengguna laptop)
  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });
});

// card umkm unggulan
$(document).ready(function () {
  // Mengecek apakah pengguna menggunakan perangkat desktop (bukan touch device)
  if (window.matchMedia("(min-width: 1024px)").matches) {
    $(".umkm-card")
      .on("mousemove", function (e) {
        let card = $(this);
        let cardWidth = card.outerWidth();
        let cardHeight = card.outerHeight();
        let centerX = card.offset().left + cardWidth / 2;
        let centerY = card.offset().top + cardHeight / 2;

        // Kalkulasi posisi kursor relatif terhadap tengah card
        let mouseX = e.pageX - centerX;
        let mouseY = e.pageY - centerY;

        // Intensitas rotasi (semakin kecil pembaginya, semakin miring)
        let rotateX = (mouseY / cardHeight) * -8;
        let rotateY = (mouseX / cardWidth) * 8;

        card.css({
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
          transition: "transform 0.1s ease", // Transisi super cepat untuk mengikuti kursor
        });
      })
      .on("mouseleave", function () {
        // Mengembalikan ke posisi semula saat kursor keluar
        $(this).css({
          transform:
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)", // Efek memantul halus (ease-out)
        });
      });
  }
});
// bagian potensi
$(document).ready(function () {
  // Mengecek apakah device menggunakan layar sentuh (mobile/tablet)
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (isTouchDevice) {
    // Menggunakan Intersection Observer API untuk memantau scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Jika elemen masuk ke dalam batas viewport yang ditentukan
          if (entry.isIntersecting) {
            $(entry.target).attr("data-active", "true");
          } else {
            $(entry.target).attr("data-active", "false");
          }
        });
      },
      {
        root: null,
        // Card akan menyala hanya ketika posisinya berada di area 40% tengah layar smartphone
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0,
      },
    );

    // Terapkan observer ke semua card yang memiliki class 'potensi-card'
    $(".potensi-card").each(function () {
      observer.observe(this);
    });
  }
});

// Inisialisasi peta pada koordinat Kantor Desa Sukamaju
// const map = L.map("map").setView([-6.8219509, 107.8753262], 15);

// Menggunakan OpenStreetMap sebagai tile server (Gratis & Open Source)
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution: "&copy; OpenStreetMap contributors",
// }).addTo(map);

// Menambahkan Marker
// L.marker([-6.8219509, 107.8753262])
//   .addTo(map)
//   .bindPopup("Kantor Desa Sukamaju")
//   .openPopup();

$(document).ready(function () {
  let isOpen = false;

  $("#fab-main-btn").on("click", function () {
    isOpen = !isOpen;

    if (isOpen) {
      // Munculkan opsi dengan animasi halus
      $("#fab-options")
        .removeClass("opacity-0 translate-y-4 pointer-events-none")
        .addClass("opacity-100 translate-y-0 pointer-events-auto");

      // Ubah icon tombol utama jadi tanda silang (X)
      $("#fab-icon")
        .removeClass("bi-chat-dots-fill")
        .addClass("bi-x-lg rotate-90");
    } else {
      // Sembunyikan kembali opsi
      $("#fab-options")
        .removeClass("opacity-100 translate-y-0 pointer-events-auto")
        .addClass("opacity-0 translate-y-4 pointer-events-none");

      // Kembalikan icon tombol utama ke semula
      $("#fab-icon")
        .removeClass("bi-x-lg rotate-90")
        .addClass("bi-chat-dots-fill");
    }
  });

  // Opsional: Tutup menu jika pengguna mengklik di luar area FAB
  $(document).on("click", function (e) {
    if (!$(e.target).closest("#fab-main-btn, #fab-options").length && isOpen) {
      $("#fab-main-btn").trigger("click");
    }
  });
});
// swiper artikel
jQuery(document).ready(function ($) {
  // FUNGSI UTAMA: Membuka Modal saat tombol diklik
  $(".open-modal-btn").on("click", function () {
    const targetModal = $(this).attr("data-target");
    const $modal = $(targetModal);

    $modal.removeClass("pointer-events-none").addClass("opacity-100");
    $modal.find(".bg-white").removeClass("scale-95").addClass("scale-100");
    $("body").addClass("overflow-hidden"); // Kunci scroll layar utama
  });

  // FUNGSI UTAMA: Menutup Modal
  $(".close-modal-btn, .modal-overlay").on("click", function (e) {
    if (e.target !== this && !$(this).hasClass("close-modal-btn")) return;
    const $modal = $(this).closest(".modal-overlay");

    $modal.addClass("pointer-events-none").removeClass("opacity-100");
    $modal.find(".bg-white").removeClass("scale-100").addClass("scale-95");
    $("body").removeClass("overflow-hidden"); // Aktifkan scroll lagi
  });
});
