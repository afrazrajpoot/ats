// gsap.registerPlugin(ScrollTrigger);


// ScrollTrigger.defaults({
//   // Defaults are used by all ScrollTriggers
//   toggleActions: "restart pause resume pause", // Scoll effect Forward, Leave, Back, Back Leave
//   markers: false // Easaly remove markers for production 
// });  
// //  gsap.set('.logo', {
// //   y: "23.675310033821873vh",
// //   width: "735px",
// //   height: "175px",
// //   //maxWidth: "398px",
// //   //maxHeight: "95px",
// //   //rotation: 360
// // });

// gsap.to(".logo", { 
//   // scale: 35,  
//   y: "19.052987598647125vh",
//   width: "398px",
//   height: "95px", 
//   // width: "29.136163982430453vw",
//   // height: "6.954612005856515vw",
//   // maxWidth: "398px",
//   // maxHeight: "95px",
//   //transformOrigin: "center center", 
//   //transformStyle: "preserve-3d"
//  }, 2); 

// //  gsap.to(".intro-img-box figure", {
// //   // x:'-98.85%',
// //   // scale: 35,  
// //   y: "36.52762119503946vh", 
// //   height: "63.47237880496054vh"
// //  }, 2); 
 
// ////Header Image Auto Scroll Start
//  setTimeout(function(){  
//   const sections = gsap.utils.toArray(".intro-img-box figure"); 
//   const anim = gsap.to(sections, {
//     xPercent: -100 * (sections.length - 1),
//     ease: "none", 
//     end: () => "+=" + document.querySelector(".intro-img-box article").offsetWidth
//     // scrollTrigger: {
//     //   trigger: ".intro-img-box article",
//     //   pin: false,
//     //   scrub: 1,
//     //   // base vertical scrolling on how wide the container is so it feels more natural.
//     //   end: () => "+=" + document.querySelector(".intro-img-box article").offsetWidth
//     // }
//   });
  
//   const auto = gsap.timeline({ repeat: -1 })
//   .to(anim, {
//     duration: 30,
//     progress: 1,
//     ease: "none",
//   });
// }, 5000);
//  //window.addEventListener("scroll", () => auto.kill());
  

if ($(".image-box").length > 0) {
ScrollTrigger.defaults({
  // Defaults are used by all ScrollTriggers
  toggleActions: "restart pause resume pause", // Scoll effect Forward, Leave, Back, Back Leave
  markers: false // Easaly remove markers for production 
}); 
const timelineHeader = gsap.timeline({
  scrollTrigger: {
    //id: "ZOOM", // Custom label to the marker
    trigger: ".image-box", // What element triggers the scroll
    scrub: 1, // Add a small delay of scrolling and animation. `true` is direct
    invalidateOnRefresh: true,  
    start: "top top", // Start at top of Trigger and at the top of the viewport
    end: "100% top", // The element is 500px hight and end 50px from the top of the viewport
    ease: "power2", 
    //markers: {startColor: "red", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 320},
    pin: true // Pin the element true or false
  } });


// timelineHeader.to(".video", {
//   ease: "power2",
//   scale: 1 
// },
// "sameTime").to
timelineHeader.to(".image-box svg", {
  // x:'-98.85%',
  // scale: 35, 
  //x:'-107.65%',
  scale: 2.7, 
  force3D: false,
  transformOrigin: "center center" 
  //transformStyle: "preserve-3d"
 },
"sameTime");
// .to(".heading div #msb", {
//   // x:'-98.85%',
//   // scale: 35, 
//   y:'34em',
//   opacity: 0,  
//   //transformOrigin: "center center", 
//   //transformStyle: "preserve-3d"
//  },
// "sameTime");
}

gsap.registerPlugin(ScrollTrigger);  

//   if ($(".image-box").length > 0) {
//   gsap.utils.toArray(".image-container").forEach(function(container) {
//     let image = container.querySelector("figure");
//       gsap.to(image, {
//         y: () => image.offsetHeight - container.offsetHeight,
//         ease: "none", 
//         scrollTrigger: {
//           trigger: container, 
//           pin: false, 
//           scrub: 1, // Add a small delay of scrolling and animation. `true` is direct 
//           start: "171% 95%", // Start at top of Trigger and at the top of the viewport
//           end: "271% top", // The element is 500px hight and end 50px from the top of the viewport
//           ease: "power2",
//           markers: {startColor: "red", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 320},
//           invalidateOnRefresh: true
//         },
//       });  
//   });
// }
// else{ 
 

 
// const anim = gsap.to('.image-container figure', { 
//   scale:1,
//   duration: 1, 
//   ease: "power2.inOut", 
//   paused: true
// });

// const playST = ScrollTrigger.create({
//   trigger:'.image-container figure', 
//   start:'top 55%', 
//   markers: {startColor: "red", endColor: "red", fontSize: "15px", fontWeight: "bold", indent: 320},
//   onEnter: () => anim.play()
// });

// const resetST = ScrollTrigger.create({
//   trigger:'.image-container figure',
//   markers: {startColor: "blue", endColor: "blue", fontSize: "15px", fontWeight: "bold", indent: 320},
//   onLeaveBack: () => anim.pause(0)
// });


  gsap.utils.toArray(".image-container").forEach(function(container) {
    let image = container.querySelector("figure"); 
      gsap.to(image, { 
        y: () => image.offsetHeight - container.offsetHeight,
        ease: "none", 
        scrollTrigger: {
          trigger: container, 
          pin: false, 
          scrub: 1, // Add a small delay of scrolling and animation. `true` is direct 
          start: "top 95%", // Start at top of Trigger and at the top of the viewport
          end: "bottom top", // The element is 500px hight and end 50px from the top of the viewport
          ease: "power2",
          //markers: {startColor: "green", endColor: "red", fontSize: "15px", fontWeight: "bold", indent: 0},
          invalidateOnRefresh: true
        },
      });  
      const anim = gsap.to(image, { 
        scale:1,
        duration: 1.5, 
        ease: "ease", 
        transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
        transformOrigin: "center center", 
        transformStyle: "preserve-3d",
        paused: true
      });
      
      const playST = ScrollTrigger.create({
        trigger: container, 
        start:'top 95%', 
        //markers: {startColor: "red", endColor: "red", fontSize: "15px", fontWeight: "bold", indent: 320},
        onEnter: () => anim.play()
      });
      
      const resetST = ScrollTrigger.create({
        trigger: container,
        //markers: {startColor: "blue", endColor: "blue", fontSize: "15px", fontWeight: "bold", indent: 320},
        onLeaveBack: () => anim.pause(0)
      });
  });
//} 

// // //Pin Rotate text
// const sections = gsap.utils.toArray(".text aside"); 
// const anim = gsap.to(sections, {
//   rotate:90,
//   ease: "none",
//   transformOrigin: "center center", 
//   transformStyle: "preserve-3d"
//   // scrollTrigger: {
//   //   trigger: ".intro-img-box article",
//   //   pin: false,
//   //   scrub: 1,
//   //   // base vertical scrolling on how wide the container is so it feels more natural.
//   //   end: () => "+=" + document.querySelector(".intro-img-box article").offsetWidth
//   // }
// });

// gsap.timeline({
//   scrollTrigger: {
//     //id: "ZOOM", // Custom label to the marker
//     trigger: ".section-box article", // What element triggers the scroll
//     scrub: 1, // Add a small delay of scrolling and animation. `true` is direct
//     invalidateOnRefresh: true,  
//     start: "top 15%", // Start at top of Trigger and at the top of the viewport
//     end: "bottom 15%", // The element is 500px hight and end 50px from the top of the viewport
//     ease: "power2",
//     markers: {startColor: "red", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 320},
//     pin: ".section-box .text" // Pin the element true or false
//   } });

// const sections1 = gsap.utils.toArray(".section-box article"); 
// const sections = gsap.utils.toArray(".section-box .text");  
// const anim = gsap.to(sections, {
//   rotate:90,
//   ease: "none",
//   transformOrigin: "center center", 
//   transformStyle: "preserve-3d",
//   scrollTrigger: {
//     trigger: sections1,
//     pin: "sections",
//     ease: "power2",
//     start: "top 15%",
//     end: "bottom 15%",
//     markers: {startColor: "red", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 320},
//     scrub: 1
//   }
// });
  
// const configs = {
//   duration: 30,
//   ease: 'none',
// };

if ($("body").hasClass("home")) {
const lines = {
  first: {
    direction: 'right',
    element: document.querySelector('.intro-img-box .bg'),
  },
  second: {
    direction: 'right',
    element: document.querySelector('.intro-img-box .graphic'),
  },
  third: {
    direction: 'left',
    element: document.querySelector('.intro-img-box .empty'),
  },
};

let timeline = gsap.timeline();
let timelineempty = gsap.timeline();
let sentenceWidth = document.querySelector('.intro-img-box article section').clientWidth;

// Init timeline and register events.
function init() {
  setTimelineempty();
  setTimeline();
  // const marqueeImage = document.querySelector('#maquee-image');
  // marqueeImage.addEventListener('mouseenter', flipDirection);
  // marqueeImage.addEventListener('mouseout', flipDirection);
  // window.addEventListener('resize', handleResize);
}

// Add marquee animations to timeline.
function setTimeline() {
  timeline
    .add(createMarquee(lines.first.element, lines.first.direction, 30), 0)
    .add(createMarquee(lines.second.element, lines.second.direction, 30), 0)
    //.add(createMarquee(lines.third.element, lines.third.direction, 90), 0);
}
function setTimelineempty() {
  timelineempty
    //.add(createMarquee(lines.first.element, lines.first.direction, 30), 0)
    //.add(createMarquee(lines.second.element, lines.second.direction, 30), 0)
    .add(createMarqueeempty(lines.third.element, lines.third.direction, 90), 0);
}
// Create single marquee animation.
function createMarquee(element, direction, durationel) {
  const distance = sentenceWidth * 1;
  return gsap.timeline()
    .to(element, {
      //...configs,
      duration: durationel,
      ease: 'none',
      x: direction === 'left' ? distance : -distance, 
      onComplete() {
        timeline.play(0);  
        //alert("2");
      },
      // onReverseComplete() {
      //   timeline.reverse(0); 
      // },
    },
  );
}
// Create single marquee animation.
function createMarqueeempty(element, direction, durationel) {
  const distance = sentenceWidth * 1;
  return gsap.timeline()
    .to(element, {
      //...configs,
      duration: durationel,
      ease: 'none',
      x: direction === 'left' ? distance : -distance, 
      onComplete() {
        timelineempty.pause(); 
        //alert("1");
      },
      // onReverseComplete() {
      //   timeline.reverse(0); 
      // },
    },
  );
}

// // Reverse the timeline direction.
// function flipDirection() {
//   timeline.reversed(!timeline.reversed());
// }

// Reset timeline on resize.
function handleResize() {
  sentenceWidth = document.querySelector('.intro-img-box article section').clientWidth;
  timeline.seek(0);
  timeline.clear();
  setTimeline();

  timelineempty.seek(0);
  timelineempty.clear();
  setTimelineempty();
}

if ($("body").hasClass("home")) {
  if(window.location.hash){ 
      document.querySelector('body').classList.remove('animation'); 
      document.querySelector('body').classList.add('white');   
      init(); 
      // setTimeout(function(){  
      //   	// smooth scroll to the anchor id
      //     alert("1");
      //   	$('html, body').animate({
      //   		scrollTop: $(window.location.hash).offset().top - Number(322)
      //   	}, 500, 'swing');
      //   }, 200);
  } else{
    setTimeout(function(){  
      document.querySelector('body').classList.remove('animation'); 
    //}, 1500);
    }, 1500);
    setTimeout(function(){   
      document.querySelector('body').classList.add('white');   
    //}, 4000); 
    }, 2500); 
    setTimeout(function(){  
      init();  
      document.querySelector('body').classList.remove('animate'); 
    //}, 4500); 
    }, 3000); 
  }
}
// ////Header Image Auto Scroll End




// setTimeout(function(){  
// var box_tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: 'main .content',
//     start: 'top top',
//     end: "+=50%",
//     ease: "power2",
//     scrub: 1, // Add a small delay of scrolling and animation. `true` is direct
//     invalidateOnRefresh: true,  
//     //pin: true,  
//     pinSpacing: false,
//     // markers: {
//     //   startColor: "orange",
//     //   endColor: "darkblue",
//     //   fontSize: "18px",
//     //   fontWeight: "bold",
//     //   indent: 0
//     // }
//     //pinnedContainer: '#container',
//     //toggleActions: 'play none none reverse'
//   }
// })
 

// ScrollTrigger.matchMedia({
//   "(min-width: 1367px)"() {
    
// box_tl
// .to('.logo', {
//     //lazy: false,
//     //scale: 1,
//     //opacity: 1, 
//     //rotation: 1360,
//     // scale: 35,  
//     top: "25px",
//     width: "143px",
//     height: "34px",
//     //maxWidth: "143px",
//     //maxHeight: "34px" 
//     // width: "29.136163982430453vw",
//     // height: "6.954612005856515vw",
//     // maxWidth: "398px",
//     // maxHeight: "95px", 
//   }, 0)
//   .to('.intro-img-box', {
//     //lazy: false,
//     //scale: 1,
//     //y: "0",
//     //top: 0, 
//     //height: "425px",
//     //rotation: 0,
//     //left: '25%'
//   }, 0)
//   // .to('.box3', {
//   //   //lazy: false,
//   //   //scale: 1,
//   //   opacity: 0,
//   //   //rotation: 0,
//   //   //left: '75%'
//   // }, 0.4)
//   // .to('.box4', {
//   //   //lazy: false,
//   //   //scale: 1,
//   //   opacity: 0,
//   //   //rotation: 0,
//   //   //left: '75%'
//   // }, 0.6)
// ;

//   },
//   "(min-width: 768px) and (max-width: 1366px)"() {
    
// box_tl
// .to('.logo', {
//     //lazy: false,
//     //scale: 1,
//     //opacity: 1, 
//     //rotation: 1360,
//     // scale: 35,  
//     top: "1.8301610541727673vw",
//     width: "10.61493411420205vw",
//     height: "2.4890190336749636vw",
//     //maxWidth: "143px",
//     //maxHeight: "34px" 
//     // width: "29.136163982430453vw",
//     // height: "6.954612005856515vw",
//     // maxWidth: "398px",
//     // maxHeight: "95px", 
//   }, 0)
//   .to('.intro-img-box', {
//     //lazy: false,
//     //scale: 1,
//     //y: "0",
//     //top: 0, 
//     //height: "425px",
//     //rotation: 0,
//     //left: '25%'
//   }, 0)
//   // .to('.box3', {
//   //   //lazy: false,
//   //   //scale: 1,
//   //   opacity: 0,
//   //   //rotation: 0,
//   //   //left: '75%'
//   // }, 0.4)
//   // .to('.box4', {
//   //   //lazy: false,
//   //   //scale: 1,
//   //   opacity: 0,
//   //   //rotation: 0,
//   //   //left: '75%'
//   // }, 0.6)
// ;

//   },
//   //"(max-width: 767px)"() {
//     //...
//   //},
// })
// }, 5500);
}


// gsap.registerPlugin(TextPlugin);

// const rotator = document.querySelector('h1 > span');
// const texts = ["baseline", "I love GSAP!", "title"]; // last word should match the one in HTML
// const tl = gsap.timeline({repeat: -1, defaults: {duration: 1}});
// const origText = rotator.innerText;

// let beginningWidth;
// texts.forEach(text => {
//   // Get the correct width it needs to animate to (not part of timeline)
//   const fromWidth = rotator.offsetWidth;
//   let newWidth;
//   gsap.set(rotator, { innerText: text})
//   gsap.set(rotator, {width: "auto"});
//   beginningWidth = newWidth = rotator.offsetWidth;
  
//   // Timeline stuff
//   // Fade out old
//   tl.to(rotator, { opacity: 0, delay: 1 })
  
//   // Change text
//   .set(rotator, { innerText: text })
  
//   // Animate width
//   .fromTo(rotator, { width: fromWidth }, { width: newWidth })
  
//   // Fade in new 
//   .to(rotator, { opacity: 1 })
// })
// gsap.set(rotator, { width: beginningWidth })





// ScrollTrigger.defaults({
//   // Defaults are used by all ScrollTriggers
//   toggleActions: "restart pause resume pause", // Scoll effect Forward, Leave, Back, Back Leave
//   markers: false // Easaly remove markers for production 
// }); 
// const timelineHeader = gsap.timeline({
//   scrollTrigger: {
//     //id: "ZOOM", // Custom label to the marker
//     trigger: ".intro-img-box", // What element triggers the scroll
//     scrub: 1, // Add a small delay of scrolling and animation. `true` is direct
//     invalidateOnRefresh: true,  
//     start: "top top", // Start at top of Trigger and at the top of the viewport
//     end: "bottom -100%", // The element is 500px hight and end 50px from the top of the viewport
//     ease: "none",
//     markers: {startColor: "red", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 320},
//     pin: true // Pin the element true or false
//   } });


// // timelineHeader.to(".video", {
// //   ease: "power2",
// //   scale: 1 
// // },
// // "sameTime").to
// timelineHeader.to(".logo", {
//   // x:'-98.85%',
//   // scale: 35,   
//   y: "0",
//   width: "143px",
//   height: "34px",
//   transformOrigin: "center center", 
//   transformStyle: "preserve-3d"
//  },
// "sameTime").to(".intro-img-box figure", {
//   // x:'-98.85%',
//   // scale: 35,   
//   y: "0", 
//   height: "325px",
//   //transformOrigin: "center center", 
//   //transformStyle: "preserve-3d"
//  },
// "sameTime");