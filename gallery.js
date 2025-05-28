import {
  setNavBarMenu,
  sectBarCodeMovement,
  updateClock,
  setButtonHover,
  setPageTransition,
  setLenis,
  setLinkHover,
  setButtonAppear,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);
  setPageTransition();
});

window.addEventListener("load", () => {
  $(".gallery-gallery_container-cover").css("display", "block");
  if ($(window).width() > 991) {
    setGalleryHover();
    setButtonHover();
    setLinkHover();
    setImageHover();
    sectBarCodeMovement();
    setButtonAppear();
  }
  setLenis();
  preloadImages(imagesLinks);
  setInterval(updateClock, 1000);
  updateClock();
  setNavBarMenu();
  setGalleryClick();
});

const SplitType = window.SplitType;
let typeSplit = new SplitType("[text-split]", {
  types: "words, chars",
  tagName: "span",
});

const imagesLinks = [
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/6836127bb4d92643fc5ed4e5_reckless_gallery-image%20(1).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/6836127207dccb69865214e9_reckless_gallery-image%20(2).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/683612731244f05a46e532be_reckless_gallery-image%20(3).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/6836127278b1bbf54180e0e7_reckless_gallery-image%20(4).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/6836127767816c83ef8a4419_reckless_gallery-image%20(5).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/683612734eecf3a45411cf70_reckless_gallery-image%20(6).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/68361274a6c8c11563adf235_reckless_gallery-image%20(7).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/6836127578b1bbf54180e1f2_reckless_gallery-image%20(8).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/683612772c68950ee99057a0_reckless_gallery-image%20(9).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/683612772ebee597cfaf6210_reckless_gallery-image%20(10).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/68361275abf07839b2c70b1e_reckless_gallery-image%20(11).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/683612744523241d10c8617e_reckless_gallery-image%20(12).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/6836127707dccb6986521733_reckless_gallery-image%20(13).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/683612732575b8ae8581e339_reckless_gallery-image%20(14).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/683612754eecf3a45411d0c5_reckless_gallery-image%20(15).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/6836127a4eecf3a45411d2b7_reckless_gallery-image%20(16).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/683612730d1cdd9b1edd7a74_reckless_gallery-image%20(17).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/68361277568188501821b46d_reckless_gallery-image%20(18).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/6836127771db1ffddfd5f31c_reckless_gallery-image%20(19).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/68361275139c8c75dfd2d27e_reckless_gallery-image%20(20).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/68361278444ba5b5aecc8f3d_reckless_gallery-image%20(21).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/6836127764eefa5653cec7c9_reckless_gallery-image%20(23).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/68361277b5354690a7f2c209_reckless_gallery-image%20(24).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/6836127528acb65a11b0d608_reckless_gallery-image%20(25).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/6836127520f983e11d475972_reckless_gallery-image%20(27).webp",
  "https://cdn.prod.website-files.com/6835c1d2f28d793d372f7ab6/683612758a6542de5d20a484_reckless_gallery-image%20(28).webp",
];
let imagesLinksReplicate = imagesLinks.slice();
const formats = [
  "16/9",
  "4/3",
  "3/2",
  "21/9",
  "2.39/1",
];
let formatsReplicate = formats.slice();
let isAnimating = false;
const imageObjects = [];
let imageLoadCount = 0;
let galleryStarted = false;
const MIN_IMAGES_TO_START = 20;

//fullfill an array with img, to avoid reloading them at each itteration
function preloadImages(links) {
  links.forEach((src) => {
    const img = new Image();
    img.onload = () => {
      imageObjects.push(img);
      imageLoadCount++;

      //Start the behavior once we have enought pictures ready
      if (!galleryStarted && imageLoadCount >= MIN_IMAGES_TO_START) {
        galleryStarted = true;
        galleryBehavior();
        setGalleryClick();
      }
    };
    img.src = src;
  });
}

function galleryBehavior() {
  $(".gallery-gallery_pictures-wrapper").empty();
  setGallery();
  galleryWaveAnimation();
  setImageHover();
  setGalleryClick();
}

function setGallery() {
  const wrappers = $(".gallery-gallery_pictures-wrapper");
  let itemCount = $(window).width() <= 991 ? 5 : 10;
  let usedImages = imageObjects.slice(); // local copy of objects to be mapped

  formatsReplicate = formats.slice(); // refresh formats

  for (let i = 0; i < itemCount; i++) {
    wrappers.each(function () {
      const wrapper = $(this);

      // random selection
      const randomFormatIndex = Math.floor(Math.random() * formatsReplicate.length);
      const randomImageIndex = Math.floor(Math.random() * usedImages.length);
      const divFormat = formatsReplicate.splice(randomFormatIndex, 1)[0];
      const imgOriginal = usedImages.splice(randomImageIndex, 1)[0];

      let $div = $("<div></div>").css({
        height: "80%",
        "aspect-ratio": divFormat,
        overflow: "hidden",
        "clip-path": "inset(0 0 0 0)",
      });

      $div.attr("class", "gallery-gallery_item-wrapper");

      const imgClone = imgOriginal.cloneNode(true);
      const $image = $(imgClone).addClass("gallery-gallery_item").css({
        width: "120%",
        height: "100%",
        "object-fit": "cover",
      });

      $div.append($image);
      wrapper.append($div);
      checkFormatArray();
      // checkImagesArray();
    });
  }
}

let waveTl = gsap.timeline();
function galleryWaveAnimation() {
  waveTl.from(".gallery-gallery_item-wrapper", {
    clipPath: "inset(0 0 100% 0)",
    duration: 0.5,
    ease: "power1.out",
    stagger: 0.07,
    onComplete: () => {
      $(".gallery-gallery_container-cover").css("display", "none");
    },
  });

  waveTl.from(
    ".gallery-gallery_item",
    {
      scale: 1.5,
      duration: 1,
      ease: "power3.out",
      stagger: 0.07,
    },
    "<"
  );

  waveTl.to(
    ".gallery-gallery_item-wrapper",
    {
      onStart: () => {
        $(".gallery-gallery_container-cover").css("display", "block");
      },
      clipPath: "inset(0 0 100% 0)",
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.07,
      onComplete: () => {
        galleryBehavior();
      },
    },
    "+=3"
  );

  $(".gallery-gallery_pictures-wrapper").on("mouseenter", () => {
    waveTl.pause();
  });
  $(".gallery-gallery_pictures-wrapper").on("mouseleave", () => {
    waveTl.play();
  });
}

function setGalleryHover() {
  const $wrapper = $(".gallery-gallery_pictures-wrapper");
  const maxOffset = 10;

  $(".gallery-gallery_pictures-wrapper").each(function () {
    $(this).on("mousemove", function (e) {
      let mouseX = e.clientX / $(window).width(); // 0 (gauche) à 1 (droite)
      let offset = -maxOffset + mouseX * maxOffset * 2; // Déplacement de -20% à +20%

      gsap.to($(this), {
        xPercent: -offset,
        duration: 0.3,
        ease: "power1.out",
      });
    });

    $(this).on("mouseleave", function (e) {
      gsap.to($(this), {
        xPercent: 0,
        duration: 0.7,
        ease: "power1.out",
      });
    });
  });
}

function setImageHover() {
  $(".gallery-gallery_item-wrapper").each(function () {
    $(this).hover(
      function () {
        const levels = [
          { element: $(this), scale: 1.2 },
          { element: $(this).prev(), scale: 1.1 },
          { element: $(this).next(), scale: 1.1 },
          { element: $(this).prev().prev(), scale: 1.05 },
          { element: $(this).next().next(), scale: 1.05 },
        ];

        levels.forEach(({ element, scale }) => {
          if (element.length) {
            gsap.to(element, {
              scaleY: scale,
              duration: 0.4,
              ease: "power1.out",
            });
            gsap.to(element.find("img"), {
              scaleX: scale,
              duration: 0.4,
              ease: "power1.out",
            });
          }
        });
      },
      function () {
        const levels = [
          $(this),
          $(this).prev(),
          $(this).next(),
          $(this).prev().prev(),
          $(this).next().next(),
        ];

        levels.forEach((element) => {
          if (element.length) {
            gsap.to(element, {
              scaleY: 1,
              duration: 0.4,
              ease: "power1.out",
            });
            gsap.to(element.find("img"), {
              scaleX: 1,
              duration: 0.4,
              ease: "power1.out",
            });
          }
        });
      }
    );
  });
}

function checkFormatArray() {
  if (formatsReplicate.length == 0) {
    formatsReplicate = formats.slice();
  }
}

function setGalleryClick() {
  const $modal = $(".gallery-gallery_modal");
  const $imageContainer = $(".gallery-gallery_modal-image-container");
  const $image = $(".gallery-gallery_modal-image");

  gsap.set($modal, { opacity: 0 });
  // gsap.set($image, {clipPath: "inset(100% 0 0 0)"})

  $(".gallery-gallery_item").each(function () {
    $(this).on("click", function () {
      if (isAnimating) {
        return;
      }
      isAnimating = true;
      $(".gallery-gallery_container-cover").css("display", "block");
      const src = $(this).attr("src");
      $image.attr("src", src);
      $(this).addClass("active");
      gsap.set($imageContainer, {
        clipPath: "inset(100% 0 0 0)",
      });

      let tl = gsap.timeline({});

      tl.set($modal, { display: "flex" });

      setTimeout(() => {
        waveTl.pause();
      }, 50);

      tl.to($(this), {
        clipPath: "inset(100% 0 0 0)",
        duration: 0.3,
        ease: "power1.out",
      });

      tl.to(
        $modal,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power1.out",
        },
        "<"
      );

      tl.to($imageContainer, {
        clipPath: "inset(0% 0 0 0)",
        duration: 0.5,
        ease: "power1.out",
        onComplete: () => {
          $(".gallery-gallery_container-cover").css("display", "none");
          isAnimating = false;
        },
      });
    });
  }); //end each loop

  $modal.on("click", () => {
    let tl = gsap.timeline();
    if (isAnimating) {
      return;
    }
    (isAnimating = true),
      tl.to($imageContainer, {
        clipPath: "inset(100% 0 0 0)",
        duration: 0.5,
        ease: "power1.out",
      });

    tl.to($modal, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
    });

    tl.to(
      $(".active"),
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 0.4,
        ease: "power1.out",
        onComplete: () => {
          $(".active").removeClass("active");
          waveTl.play();
          isAnimating = false;
        },
      },
      "<"
    );
    tl.set($modal, { display: "none" });
  });
}
