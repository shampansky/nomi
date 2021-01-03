
/* manage videos */

function findVideos() {
  let videos = document.querySelectorAll('.video');

  for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
  }
}

function setupVideo(video) {
  let link = video.querySelector('.video__link');
  let media = video.querySelector('.video__media');
  let button = video.querySelector('.video__button');
  let id = parseMediaURL(link);

  video.addEventListener('click', () => {
      let iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video--enabled');
}

function parseMediaURL(link) {
  let url = link.href;
  return url.substr(url.lastIndexOf('/') + 1);
}

function createIframe(id) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('video__media');

  return iframe;
}

function generateURL(id) {
  let query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
}


document.addEventListener('DOMContentLoaded', function() {
  findVideos();
  /* tabbed interface */
  (function () {
    // Get relevant elements and collections
    const tabbed = document.querySelector('.config__tabs');
    const tablist = tabbed.querySelector('ul');
    const tabs = tablist.querySelectorAll('a');
    const panels = tabbed.querySelectorAll('[id^="section"]');

    // The tab switching function
    const switchTab = (oldTab, newTab) => {
      newTab.focus();
      // Make the active tab focusable by the user (Tab key)
      newTab.removeAttribute('tabindex');
      // Set the selected state
      newTab.setAttribute('aria-selected', 'true');
      oldTab.removeAttribute('aria-selected');
      oldTab.setAttribute('tabindex', '-1');
      // Get the indices of the new and old tabs to find the correct
      // tab panels to show and hide
      let index = Array.prototype.indexOf.call(tabs, newTab);
      let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
      panels[oldIndex].hidden = true;
      panels[index].hidden = false;
    }

    // Add the tablist role to the first <ul> in the .tabbed container
    tablist.setAttribute('role', 'tablist');

    // Add semantics are remove user focusability for each tab
    Array.prototype.forEach.call(tabs, (tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('id', 'tab' + (i + 1));
      tab.setAttribute('tabindex', '-1');
      tab.parentNode.setAttribute('role', 'presentation');

      // Handle clicking of tabs for mouse users
      tab.addEventListener('click', e => {
        e.preventDefault();
        let currentTab = tablist.querySelector('[aria-selected]');
        if (e.currentTarget !== currentTab) {
          switchTab(currentTab, e.currentTarget);
        }
      });

      // Handle keydown events for keyboard users
      tab.addEventListener('keydown', e => {
        // Get the index of the current tab in the tabs node list
        let index = Array.prototype.indexOf.call(tabs, e.currentTarget);

        // Determine arrow key pressed
        var dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : null;

        // Switch to the new tab if it exists
        if (dir !== null) {
          e.preventDefault();

          // Find correct tab to focus
          let newIndex;
          if (tabs[dir]) {
            newIndex = dir;
          } else {
            // Loop around if adjacent tab doesn't exist
            newIndex = dir === index - 1 ? tabs.length - 1 : 0;
          }
          switchTab(e.currentTarget, tabs[newIndex]);
          tabs[newIndex].focus();
        }
      });
    });

    // Add tab panel semantics and hide them all
    Array.prototype.forEach.call(panels, (panel, i) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '-1');
      let id = panel.getAttribute('id');
      panel.setAttribute('aria-labelledby', tabs[i].id);
      panel.hidden = true;
    });

    // Initially activate the first tab and reveal the first tab panel
    tabs[0].removeAttribute('tabindex');
    tabs[0].setAttribute('aria-selected', 'true');
    panels[0].hidden = false;
  })();

  /* swiper */
  (function() {

    // breakpoint where swiper will be destroyed
    // and switches to a dual-column layout
    const breakpoint = window.matchMedia( '(min-width:767px)' );
    const firstSlide = document.querySelector('.options__item');
    const optionsWrapper = document.querySelector('.options__wrapper');
    const optionsItemWrapper = document.querySelector('.options__item-wrapper');

    // keep track of swiper instances to destroy later
    let mySwiper;

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

    const breakpointChecker = function() {

      optionsItemWrapper.prepend(firstSlide);
      // if larger viewport and multi-row layout needed
      if ( breakpoint.matches === true ) {

        // clean up old instances and inline styles when available
      if ( mySwiper !== undefined ) mySwiper.destroy( true, true );


      // or/and do nothing
      return;

        // else if a small viewport and single column layout needed
        } else if ( breakpoint.matches === false ) {

          //
          optionsWrapper.prepend(firstSlide);
          // fire small viewport version of swiper
          return enableSwiper();

        }

    };

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

    const enableSwiper = function() {

      mySwiper = new Swiper ('.swiper-container', {

        loop: true,

        slidesPerView: 1,

        centeredSlides: true,

        a11y: true,
        keyboardControl: true,
        grabCursor: true,

        // pagination
        //pagination: '.swiper-pagination',
        paginationClickable: true,

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

    };

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

    // keep an eye on viewport size changes
    breakpoint.addListener(breakpointChecker);

    // kickstart
    breakpointChecker();



  })();

  /* details */
  const detailsTexts = document.querySelectorAll('.details__text-wrapper');

  document.addEventListener('click', e => {
    if (e.target.classList.contains('details__show-button')) {
      const detailsText = e.target.previousElementSibling;

      if (detailsText) {
        detailsTexts.forEach(hint => {
          hint.classList.remove('active');
        });
        detailsText.classList.add('active');
      }
    }

    if (e.target.classList.contains('details__close-button')) {
      const detailsWrapper = e.target.closest('.details__text-wrapper');

      if (detailsWrapper) {
        detailsWrapper.classList.remove('active');
      }
    }
  });

});


  /* nomi products */

  ///////// временный объект
  const nomiProducts = [{sku:"EM-250202",id:"20832",name:"Nomi Highchair cushion kussen - Premium Denim",price:59.95,color:"Donkerblauw",colorComb:"Lichtgrijs",},{sku:"EM-250201",id:"20831",name:"Nomi Highchair cushion kussen - Premium Chambray",price:59.95,color:"Blauw",colorComb:"Lichtgrijs",},{sku:"EM-255007",id:"20830",name:"Nomi Highchair cushion kussen - Pale Blue/Sand",price:49.95,color:"Lichtblauw",colorComb:"Beige",},{sku:"EM-255006",id:"20828",name:"Nomi Highchair cushion kussen - Pale Pink/Sand",price:49.95,color:"Roze",colorComb:"Beige",},{sku:"EM-255005",id:"20827",name:"Nomi Highchair cushion kussen - Dark grey/sand",price:49.95,color:"Donkergrijs",colorComb:"Beige",},{sku:"EM-550202",id:"20858",name:"Nomi baby mattress - Premium Denim",price:79.95,color:"Donkerblauw",colorComb:"Lichtgrijs",},{sku:"EM-550201",id:"20857",name:"Nomi baby mattress - Premium Chambray",price:79.95,color:"Blauw",colorComb:"Lichtgrijs",},{sku:"EM-555007",id:"20856",name:"Nomi baby mattress - Pale Blue/Sand",price:54.95,color:"Lichtblauw",colorComb:"Beige",},{sku:"EM-555006",id:"20855",name:"Nomi baby mattress - Pale Pink/Sand",price:54.95,color:"Roze",colorComb:"Beige",},{sku:"EM-555005",id:"20854",name:"Nomi baby mattress - Dark Grey/Sand",price:54.95,color:"Donkergrijs",colorComb:"Beige",},{sku:"EM-600000",id:"20860",name:"Nomi Play Speel boog - Grey",price:39.95,color:"Grijs",},{sku:"EM-300011",id:"20842",name:"Nomi Mini safety bar - Burnt Orange",price:39.95,color:"Oranje",},{sku:"EM-300010",id:"20841",name:"Nomi Mini safety bar - Anthracite",price:39.95,color:"Antraciet",},{sku:"EM-300009",id:"20840",name:"Nomi Mini safety bar - Navy",price:39.95,color:"Donkerblauw",},{sku:"EM-300008",id:"20839",name:"Nomi Mini safety bar - Grey",price:39.95,color:"Grijs",},{sku:"EM-300007",id:"20838",name:"Nomi Mini safety bar - Lime",price:39.95,color:"Lime",},{sku:"EM-300006",id:"20837",name:"Nomi Mini safety bar - Ocean",price:39.95,color:"Lichtblauw",},{sku:"EM-300005",id:"20836",name:"Nomi Mini safety bar - Pale Pink",price:39.95,color:"Roze",},{sku:"EM-300003",id:"20835",name:"Nomi Mini safety bar - Coffee",price:39.95,color:"Donkerbruin",},{sku:"EM-300002",id:"20834",name:"Nomi Mini safety bar - Black",price:39.95,color:"Zwart",},{sku:"EM-300001",id:"20833",name:"Nomi Mini safety bar - White",price:39.95,color:"Wit",},{sku:"EM-900025",id:"20859",name:"Nomi Harness Tuigje Gordel - Sand",price:39.95,color:"Beige",},{sku:"EM-400011",id:"20849",name:"Nomi Tray - Burnt Orange",price:44.95,color:"Oranje",},{sku:"EM-400010",id:"20848",name:"Nomi Tray - Anthracite",price:44.95,color:"Antraciet",},{sku:"EM-400009",id:"20847",name:"Nomi Tray - Navy",price:44.95,color:"Donkerblauw",},{sku:"EM-400008",id:"20846",name:"Nomi Tray - Grey",price:44.95,color:"Grijs",},{sku:"EM-400003",id:"20845",name:"Nomi Tray - Coffee",price:44.95,color:"Donkerbruin",},{sku:"EM-400002",id:"20844",name:"Nomi Tray - Black",price:44.95,color:"Zwart",},{sku:"EM-400001",id:"20843",name:"Nomi Tray - White",price:44.95,color:"Wit",},{sku:"EM-200011-207-GR",id:"21015",name:"Nomi Highchair - Natur oiled walnut/Burnt Orange",price:269.9500,color:"Oranje",colorComb:"Bruin",assocProducts:[{sku:"EM-100207",name:"Nomi Base (middle bar) walnut + walnut - Natur oiled",price:130,color:"Donkerbruin"},{sku:"EM-200011",name:"Nomi Highchair - Burnt Orange",price:139.95,color:"Oranje"},],},{sku:"EM-200010-207-GR",id:"21014",name:"Nomi Highchair - Natur oiled walnut/Anthracite",price:269.9500,color:"Antraciet",colorComb:"Bruin",assocProducts:[{sku:"EM-100207",name:"Nomi Base (middle bar) walnut + walnut - Natur oiled",price:130,color:"Donkerbruin"},{sku:"EM-200010",name:"Nomi Highchair - Anthracite",price:139.95,color:"Antraciet"},],},{sku:"EM-200009-207-GR",id:"21013",name:"Nomi Highchair - Natur oiled walnut/Navy",price:269.9500,color:"Donkerblauw",colorComb:"Bruin",assocProducts:[{sku:"EM-100207",name:"Nomi Base (middle bar) walnut + walnut - Natur oiled",price:130,color:"Donkerbruin"},{sku:"EM-200009",name:"Nomi Highchair - Navy",price:139.95,color:"Donkerblauw"},],},{sku:"EM-200008-207-GR",id:"21012",name:"Nomi Highchair - Natur oiled walnut/Grey",price:269.9500,color:"Grijs",colorComb:"Bruin",assocProducts:[{sku:"EM-100207",name:"Nomi Base (middle bar) walnut + walnut - Natur oiled",price:130,color:"Donkerbruin"},{sku:"EM-200008",name:"Nomi Highchair - Grey",price:139.95,color:"Grijs"},],},{sku:"EM-200007-207-GR",id:"21011",name:"Nomi Highchair - Natur oiled walnut/Lime",price:269.9500,color:"Lime",colorComb:"Bruin",assocProducts:[{sku:"EM-100207",name:"Nomi Base (middle bar) walnut + walnut - Natur oiled",price:130,color:"Donkerbruin"},{sku:"EM-200007",name:"Nomi Highchair - Lime",price:139.95,color:"Lime"},],},{sku:"EM-200006-207-GR",id:"21010",name:"Nomi Highchair - Natur oiled walnut/Ocean",price:269.9500,color:"Lichtblauw",colorComb:"Bruin",assocProducts:[{sku:"EM-100207",name:"Nomi Base (middle bar) walnut + walnut - Natur oiled",price:130,color:"Donkerbruin"},{sku:"EM-200006",name:"Nomi Highchair - Ocean",price:139.95,color:"Lichtblauw"},],},{sku:"EM-200005-207-GR",id:"21009",name:"Nomi Highchair - Natur oiled walnut/Pale Pink",price:269.9500,color:"Roze",colorComb:"Bruin",assocProducts:[{sku:"EM-100207",name:"Nomi Base (middle bar) walnut + walnut - Natur oiled",price:130,color:"Donkerbruin"},{sku:"EM-200005",name:"Nomi Highchair - Pale Pink",price:139.95,color:"Roze"},],},{sku:"EM-200003-207-GR",id:"21008",name:"Nomi Highchair - Natur oiled walnut/Coffee",price:269.9500,color:"Donkerbruin",colorComb:"Bruin",assocProducts:[{sku:"EM-100207",name:"Nomi Base (middle bar) walnut + walnut - Natur oiled",price:130,color:"Donkerbruin"},{sku:"EM-200003",name:"Nomi Highchair - Coffee",price:139.95,color:"Bruin"},],},{sku:"EM-200002-207-GR",id:"21007",name:"Nomi Highchair - Natur oiled walnut/Black",price:269.9500,color:"Zwart",colorComb:"Bruin",assocProducts:[{sku:"EM-100207",name:"Nomi Base (middle bar) walnut + walnut - Natur oiled",price:130,color:"Donkerbruin"},{sku:"EM-200002",name:"Nomi Highchair - Black",price:139.95,color:"Zwart"},],},{sku:"EM-200001-207-GR",id:"21006",name:"Nomi Highchair - Natur oiled walnut/White",price:269.9500,color:"Wit",colorComb:"Bruin",assocProducts:[{sku:"EM-100207",name:"Nomi Base (middle bar) walnut + walnut - Natur oiled",price:130,color:"Donkerbruin"},{sku:"EM-200001",name:"Nomi Highchair - White",price:139.95,color:"Wit"},],},{sku:"EM-200011-206-GR",id:"21005",name:"Nomi Highchair - Natur oiled/Burnt Orange",price:269.9500,color:"Oranje",colorComb:"Beige",assocProducts:[{sku:"EM-100206",name:"Nomi Base (middle bar) oak + oak - Natur oiled",price:130,color:"Oker"},{sku:"EM-200011",name:"Nomi Highchair - Burnt Orange",price:139.95,color:"Oranje"},],},{sku:"EM-200010-206-GR",id:"21004",name:"Nomi Highchair - Natur oiled/Anthracite",price:269.9500,color:"Antraciet",colorComb:"Beige",assocProducts:[{sku:"EM-100206",name:"Nomi Base (middle bar) oak + oak - Natur oiled",price:130,color:"Oker"},{sku:"EM-200009",name:"Nomi Highchair - Navy",price:139.95,color:"Donkerblauw"},],},{sku:"EM-200009-206-GR",id:"21003",name:"Nomi Highchair - Natur oiled/Navy",price:269.9500,color:"Donkerblauw",colorComb:"Beige",assocProducts:[{sku:"EM-100206",name:"Nomi Base (middle bar) oak + oak - Natur oiled",price:130,color:"Oker"},{sku:"EM-200009",name:"Nomi Highchair - Navy",price:139.95,color:"Donkerblauw"},],},{sku:"EM-200008-206-GR",id:"21002",name:"Nomi Highchair - Natur oiled/Grey",price:269.9500,color:"Grijs",colorComb:"Beige",assocProducts:[{sku:"EM-100206",name:"Nomi Base (middle bar) oak + oak - Natur oiled",price:130,color:"Oker"},{sku:"EM-200008",name:"Nomi Highchair - Grey",price:139.95,color:"Grijs"},],},{sku:"EM-200007-206-GR",id:"21001",name:"Nomi Highchair - Natur oiled/Lime",price:269.9500,color:"Lime",colorComb:"Beige",assocProducts:[{sku:"EM-100206",name:"Nomi Base (middle bar) oak + oak - Natur oiled",price:130,color:"Oker"},{sku:"EM-200007",name:"Nomi Highchair - Lime",price:139.95,color:"Lime"},],},{sku:"EM-200006-206-GR",id:"21000",name:"Nomi Highchair - Natur oiled/Ocean",price:269.9500,color:"Lichtblauw",colorComb:"Beige",assocProducts:[{sku:"EM-100206",name:"Nomi Base (middle bar) oak + oak - Natur oiled",price:130,color:"Oker"},{sku:"EM-200006",name:"Nomi Highchair - Ocean",price:139.95,color:"Lichtblauw"},],},{sku:"EM-200005-206-GR",id:"20999",name:"Nomi Highchair - Natur oiled/Pale Pink",price:269.9500,color:"Roze",colorComb:"Beige",assocProducts:[{sku:"EM-100206",name:"Nomi Base (middle bar) oak + oak - Natur oiled",price:130,color:"Oker"},{sku:"EM-200005",name:"Nomi Highchair - Pale Pink",price:139.95,color:"Roze"},],},{sku:"EM-200003-206-GR",id:"20998",name:"Nomi Highchair - Natur oiled/Coffee",price:269.9500,color:"Bruin",colorComb:"Beige",assocProducts:[{sku:"EM-100206",name:"Nomi Base (middle bar) oak + oak - Natur oiled",price:130,color:"Oker"},{sku:"EM-200003",name:"Nomi Highchair - Coffee",price:139.95,color:"Bruin"},],},{sku:"EM-200002-206-GR",id:"20997",name:"Nomi Highchair - Natur oiled/Black",price:269.9500,color:"Zwart",colorComb:"Beige",assocProducts:[{sku:"EM-100206",name:"Nomi Base (middle bar) oak + oak - Natur oiled",price:130,color:"Oker"},{sku:"EM-200002",name:"Nomi Highchair - Black",price:139.95,color:"Zwart"},],},{sku:"EM-200001-206-GR",id:"20996",name:"Nomi Highchair - Natur oiled/White",price:269.9500,color:"Wit",colorComb:"Beige",assocProducts:[{sku:"EM-100206",name:"Nomi Base (middle bar) oak + oak - Natur oiled",price:130,color:"Oker"},{sku:"EM-200001",name:"Nomi Highchair - White",price:139.95,color:"Wit"},],},{sku:"EM-200011-102-GR",id:"20995",name:"Nomi Highchair - Blackstained/Burnt Orange",price:219.9500,color:"Oranje",colorComb:"Zwart",assocProducts:[{sku:"EM-100102",name:"Nomi Base (middle bar) oak + beech - Blackstained",price:80,color:"Zwart"},{sku:"EM-200011",name:"Nomi Highchair - Burnt Orange",price:139.95,color:"Oranje"},],},{sku:"EM-200010-102-GR",id:"20994",name:"Nomi Highchair - Blackstained/Anthracite",price:219.9500,color:"Antraciet",colorComb:"Zwart",assocProducts:[{sku:"EM-100102",name:"Nomi Base (middle bar) oak + beech - Blackstained",price:80,color:"Zwart"},{sku:"EM-200010",name:"Nomi Highchair - Anthracite",price:139.95,color:"Antraciet"},],},{sku:"EM-200009-102-GR",id:"20993",name:"Nomi Highchair - Blackstained/Navy",price:219.9500,color:"Donkerblauw",colorComb:"Zwart",assocProducts:[{sku:"EM-100102",name:"Nomi Base (middle bar) oak + beech - Blackstained",price:80,color:"Zwart"},{sku:"EM-200009",name:"Nomi Highchair - Navy",price:139.95,color:"Donkerblauw"},],},{sku:"EM-200008-102-GR",id:"20992",name:"Nomi Highchair - Blackstained/Grey",price:219.9500,color:"Grijs",colorComb:"Zwart",assocProducts:[{sku:"EM-100102",name:"Nomi Base (middle bar) oak + beech - Blackstained",price:80,color:"Zwart"},{sku:"EM-200008",name:"Nomi Highchair - Grey",price:139.95,color:"Grijs"},],},{sku:"EM-200007-102-GR",id:"20991",name:"Nomi Highchair - Blackstained/Lime",price:219.9500,color:"Lime",colorComb:"Zwart",assocProducts:[{sku:"EM-100102",name:"Nomi Base (middle bar) oak + beech - Blackstained",price:80,color:"Zwart"},{sku:"EM-200007",name:"Nomi Highchair - Lime",price:139.95,color:"Lime"},],},{sku:"EM-200006-102-GR",id:"20990",name:"Nomi Highchair - Blackstained/Ocean",price:219.9500,color:"Lichtblauw",colorComb:"Zwart",assocProducts:[{sku:"EM-100102",name:"Nomi Base (middle bar) oak + beech - Blackstained",price:80,color:"Zwart"},{sku:"EM-200006",name:"Nomi Highchair - Ocean",price:139.95,color:"Lichtblauw"},],},{sku:"EM-200005-102-GR",id:"20989",name:"Nomi Highchair - Blackstained/Pale Pink",price:219.9500,color:"Roze",colorComb:"Zwart",assocProducts:[{sku:"EM-100102",name:"Nomi Base (middle bar) oak + beech - Blackstained",price:80,color:"Zwart"},{sku:"EM-200005",name:"Nomi Highchair - Pale Pink",price:139.95,color:"Roze"},],},{sku:"EM-200003-102-GR",id:"20988",name:"Nomi Highchair - Blackstained/Coffee",price:219.9500,color:"Bruin",colorComb:"Zwart",assocProducts:[{sku:"EM-100102",name:"Nomi Base (middle bar) oak + beech - Blackstained",price:80,color:"Zwart"},{sku:"EM-200003",name:"Nomi Highchair - Coffee",price:139.95,color:"Bruin"},],},{sku:"EM-200002-102-GR",id:"20987",name:"Nomi Highchair - Blackstained/Black",price:219.9500,color:"Zwart",colorComb:"Zwart",assocProducts:[{sku:"EM-100102",name:"Nomi Base (middle bar) oak + beech - Blackstained",price:80,color:"Zwart"},{sku:"EM-200002",name:"Nomi Highchair - Black",price:139.95,color:"Zwart"},],},{sku:"EM-200001-102-GR",id:"20986",name:"Nomi Highchair - Blackstained/White",price:219.9500,color:"Wit",colorComb:"Zwart",assocProducts:[{sku:"EM-100102",name:"Nomi Base (middle bar) oak + beech - Blackstained",price:80,color:"Zwart"},{sku:"EM-200001",name:"Nomi Highchair - White",price:139.95,color:"Wit"},],},{sku:"EM-200011-101-GR",id:"20980",name:"Nomi Highchair - White oiled/Burnt Orange",price:219.9500,color:"Oranje",colorComb:"Wit",assocProducts:[{sku:"EM-100101",name:"Nomi Base (middle bar) oak + beech - White oiled",price:80,color:"Champagne"},{sku:"EM-200011",name:"Nomi Highchair - Burnt Orange",price:139.95,color:"Oranje"},],},{sku:"EM-200010-101-GR",id:"20979",name:"Nomi Highchair - White oiled/Anthracite",price:219.9500,color:"Antraciet",colorComb:"Wit",assocProducts:[{sku:"EM-100101",name:"Nomi Base (middle bar) oak + beech - White oiled",price:80,color:"Champagne"},{sku:"EM-200010",name:"Nomi Highchair - Anthracite",price:139.95,color:"Antraciet"},],},{sku:"EM-200009-101-GR",id:"20978",name:"Nomi Highchair - White oiled/Navy",price:219.9500,color:"Blauw",colorComb:"Wit",assocProducts:[{sku:"EM-100101",name:"Nomi Base (middle bar) oak + beech - White oiled",price:80,color:"Champagne"},{sku:"EM-200009",name:"Nomi Highchair - Navy",price:139.95,color:"Donkerblauw"},],},{sku:"EM-200008-101-GR",id:"20977",name:"Nomi Highchair - White oiled/Grey",price:219.9500,color:"Grijs",colorComb:"Wit",assocProducts:[{sku:"EM-100101",name:"Nomi Base (middle bar) oak + beech - White oiled",price:80,color:"Champagne"},{sku:"EM-200008",name:"Nomi Highchair - Grey",price:139.95,color:"Grijs"},],},{sku:"EM-200007-101-GR",id:"20976",name:"Nomi Highchair - White oiled/Lime",price:219.9500,color:"Lime",colorComb:"Wit",assocProducts:[{sku:"EM-100101",name:"Nomi Base (middle bar) oak + beech - White oiled",price:80,color:"Champagne"},{sku:"EM-200007",name:"Nomi Highchair - Lime",price:139.95,color:"Lime"},],},{sku:"EM-200006-101-GR",id:"20975",name:"Nomi Highchair - White oiled/Ocean",price:219.9500,color:"Groen",colorComb:"Wit",assocProducts:[{sku:"EM-100101",name:"Nomi Base (middle bar) oak + beech - White oiled",price:80,color:"Champagne"},{sku:"EM-200006",name:"Nomi Highchair - Ocean",price:139.95,color:"Lichtblauw"},],},{sku:"EM-200005-101-GR",id:"20973",name:"Nomi Highchair - White oiled/Pale Pink",price:219.9500,color:"Roze",colorComb:"Wit",assocProducts:[{sku:"EM-100101",name:"Nomi Base (middle bar) oak + beech - White oiled",price:80,color:"Champagne"},{sku:"EM-200005",name:"Nomi Highchair - Pale Pink",price:139.95,color:"Roze"},],},{sku:"EM-200003-101-GR",id:"20972",name:"Nomi Highchair - White oiled/Coffee",price:219.9500,color:"Bruin",colorComb:"Wit",assocProducts:[{sku:"EM-100101",name:"Nomi Base (middle bar) oak + beech - White oiled",price:80,color:"Champagne"},{sku:"EM-200003",name:"Nomi Highchair - Coffee",price:139.95,color:"Bruin"},],},{sku:"EM-200002-101-GR",id:"20971",name:"Nomi Highchair - White oiled/Black",price:219.9500,color:"Zwart",colorComb:"Wit",assocProducts:[{sku:"EM-100101",name:"Nomi Base (middle bar) oak + beech - White oiled",price:80,color:"Champagne"},{sku:"EM-200002",name:"Nomi Highchair - Black",price:139.95,color:"Zwart"},],},{sku:"EM-200001-101-GR",id:"20968",name:"Nomi Highchair - White oiled/White",price:219.9500,color:"Wit",colorComb:"Wit",assocProducts:[{sku:"EM-100101",name:"Nomi Base (middle bar) oak + beech - White oiled",price:80,color:"Champagne"},{sku:"EM-200001",name:"Nomi Highchair - White",price:139.95,color:"Wit"},],},{sku:"EM-500011",id:"20850",name:"Nomi Baby Base 2.0 - White",price:75,color:"Wit",},{sku:"EM-500012",id:"20851",name:"Nomi Baby Base 2.0 - Black",price:75,color:"Zwart",},{sku:"EM-500013",id:"20852",name:"Nomi Baby Base 2.0 - Coffee",price:75,color:"Donkerbruin",},{sku:"EM-500018",id:"20853",name:"Nomi Baby Base 2.0 - Grey",price:75,color:"Grijs",},];


  document.addEventListener('DOMContentLoaded', function() {

    const elConfig = document.querySelector('.config');
    const elFinalPrice = document.querySelector('.final-product__price');
    const elFinalProductImage = document.querySelector('.final-product__image');
    const elBuyButton = document.querySelector('.final-product__buy');
    const elImageHighchair = elConfig.querySelector('#image-highchair');

  /* helper functions */

  // Получить уникальные значения
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function getCategory(item, categories) {
    let categoryName = '';
    const itemName = item.name.toLowerCase().replace(/\s/g, '');

    categories.forEach(category => {
      if (itemName.includes(category)) {
        categoryName = category;
      }
    });

    if (categoryName) {
      return categoryName;
    } else {
      console.error('category from name ' + itemName + ' not found');
    }
  }

  function getUniqueCategoryColors(products) {
    let colors = [];
    products.forEach(product => {
      colors.push(product.color);
    });
    return colors.filter(onlyUnique);
  }

  console.log('nomi products loaded', nomiProducts);

  const categories = [
    'chair',
    'mini',
    'harness',
    'tray',
    'cushion',
    'play',
    'mattress',
    'babybase',
  ];
  const chairParts = [
    'base',
    'highchair',
  ];
  const babyParts = [
    'babybase',
    'mattress'
  ];
  const premiumColors = {
    base: [
      'Oker',
      'Donkerbruin',
    ],
    cushion: [
      'Donkerblauw',
      'Blauw',
    ],
    mattress: [
      'Donkerblauw',
      'Blauw',
    ],
  }

  // Цвета товаров - симплы
  const colorCodes = {
    baby: {
      Donkerblauw: 'donkerblauw.jpg',
      Lichtgrijs: 'lichtgrijs.jpg',
      Blauw: 'blauw.jpg',
      Lichtblauw: 'lichtblauw.jpg',
      Beige: 'beige.jpg',
      Roze: 'roze.jpg',
      Donkergrijs: 'donkergrijs.jpg',
    },
    base: {
      Donkerbruin: 'donkerbruin.jpg',
      Oker: 'oker.jpg',
      Zwart: 'zwart.jpg',
      Champagne: 'champagne.jpg',
    },
    babybase: {
      Zwart: 'rgb(0, 0, 0)',
      Wit: 'rgb(240, 240, 242)',
      Donkerbruin: 'rgb(99, 83, 76)',
      Grijs: 'rgb(114, 107, 110)',
    },
    cushion: {
      Donkerblauw: 'donkerblauw.jpg',
      Lichtgrijs: 'lichtgrijs.jpg',
      Blauw: 'blauw.jpg',
      Lichtblauw: 'lichtblauw.jpg',
      Beige: 'beige.jpg',
      Roze: 'roze.jpg',
      Donkergrijs: 'donkergrijs.jpg',
    },
    harness: {
      Beige: '',
    },
    highchair: {
      Oranje: 'rgb(227, 46, 14)',
      Antraciet: 'rgb(49, 53, 66)',
      Donkerblauw: 'rgb(10, 73, 118)',
      Grijs: 'rgb(114, 107, 110)',
      Lime: 'rgb(182, 173, 87)',
      Lichtblauw: 'rgb(0, 148, 158)',
      Roze: 'rgb(240, 208, 221)',
      Bruin: 'rgb(99, 83, 76)',
      Zwart: 'rgb(0, 0, 0)',
      Wit: 'rgb(240, 240, 242)',
    },
    mini: {
      Oranje: 'rgb(227, 46, 14)',
      Antraciet: 'rgb(49, 53, 66)',
      Donkerblauw: 'rgb(10, 73, 118)',
      Grijs: 'rgb(114, 107, 110)',
      Lime: 'rgb(182, 173, 87)',
      Lichtblauw: 'rgb(0, 148, 158)',
      Roze: 'rgb(240, 208, 221)',
      Donkerbruin: 'rgb(99, 83, 76)',
      Zwart: 'rgb(0, 0, 0)',
      Wit: 'rgb(240, 240, 242)',
    },
    play: {
      Grijs: 'rgb(114, 107, 110)',
    },
    tray: {
      Oranje: 'rgb(227, 46, 14)',
      Antraciet: 'rgb(49, 53, 66)',
      Donkerblauw: 'rgb(10, 73, 118)',
      Grijs: 'rgb(114, 107, 110)',
      Lime: 'rgb(182, 173, 87)',
      Lichtblauw: 'rgb(10, 73, 118)',
      Roze: 'rgb(240, 208, 221)',
      Donkerbruin: 'rgb(99, 83, 76)',
      Zwart: 'rgb(0, 0, 0)',
      Wit: 'rgb(240, 240, 242)',
    },
    mattress: {
      Donkerblauw: 'donkerblauw.jpg',
      Lichtgrijs: 'lichtgrijs.jpg',
      Blauw: 'blauw.jpg',
      Beige: 'beige.jpg',
      Roze: 'roze.jpg',
      Lichtblauw: 'lichtblauw.jpg',
      Donkergrijs: 'donkergrijs.jpg',
    }

  }

  // Сконфигурированный товар
  window.finalProduct = {
    link: '',
    totalPrice: 0,
    items: {
      mattress: {
        price: 0,
        id: '',
        modifier: '',
      },
      babybase: {
        price: 0,
        id: '',
        modifier: '',
      },
      chair: {
        price: 0,
        id: '',
        modifier: '',
      },
      cushion: {
        price: 0,
        id: '',
        modifier: '',
      },
      harness: {
        price: 0,
        id: '',
        modifier: '',
      },
      mini: {
        price: 0,
        id: '',
        modifier: '',
      },
      play: {
        price: 0,
        id: '',
        modifier: '',
      },
      tray: {
        price: 0,
        id: '',
        modifier: '',
      }
    }
  }

  // Товары по категориям
  const productsSorted = {};
  // const assocProductsSorted = {};

  // Добавляем имена категорий
  categories.forEach(category => {
    productsSorted[category] = [];
    finalProduct.items[category] = {
      price: 0,
      id: '',
      modifier: '',
    }
  });
  // chairParts.forEach(part => {
  //   assocProductsSorted[part] = [];
  // });

  // Разбиваем товары по категориям
  nomiProducts.forEach(item => {
    const currentCategory = getCategory(item, categories);
    item.cat = currentCategory;
    // Если есть ассоциарованные товары, значит стульчик
    if (item.assocProducts) {
      productsSorted.chair.push(item);
    } else {
      productsSorted[currentCategory].push(item);
    }
  });

  // Разбиваем ассоциированные товары по категориям
  productsSorted.chair.forEach(chair => {
    chair.assocProducts.forEach(part => {
      const currentCategory = getCategory(part, chairParts);
      if (!productsSorted[currentCategory]) {
        productsSorted[currentCategory] = [];
      }

      // Добавляем категорию товару
      part.cat = currentCategory;

      // проверяем объект на уникальность SKU
      let found = false;

      for(let i = 0; i < productsSorted[currentCategory].length; i++) {
        if (productsSorted[currentCategory][i].sku == part.sku) {
          found = true;
          break;
        }
      }

      // если уникален, добавляем в массив
      if (!found) {
        productsSorted[currentCategory].push(part);
      }
    });
  });

  console.log('productsSorted', productsSorted);

  // Добавляем все цвета в разметку
  Object.keys(productsSorted).forEach(key => {

    const elCategoryColors = elConfig.querySelector('.' + key + '-color');
    const elCategoryColorsPremium = elConfig.querySelector('.' + key + '-color-premium');

      if (elCategoryColors) {

        if (chairParts.includes(key)) {
          // добавляем цвета для частей стула
          const categoryColors = getUniqueCategoryColors(productsSorted[key]);

          categoryColors.forEach(color => {
            // если текущая категория и текущий цвет есть в премиальных
            if (key in premiumColors && premiumColors[key].includes(color)) {
              addColorItemByColor(color, key, elCategoryColorsPremium);
            } else {
              // если обычная категория
              addColorItemByColor(color, key, elCategoryColors);
            }
          });
        } else {
          // добавляем цвета для всех остальных товаров
          productsSorted[key].forEach(product => {
            // если текущая категория и текущий цвет есть в премиальных
            if (key in premiumColors && premiumColors[key].includes(product.color)) {
              addColorItemByProduct(product, elCategoryColorsPremium);
            } else {
              // если обычная категория
              addColorItemByProduct(product, elCategoryColors);
            }
          });
        }
      }
  });

  // добавление цвета в разметку
  function addColorItemByColor (color, category, node) {
    const itemColor = colorCodes[category][color];
    let background = '';

    if (itemColor) {
      background = itemColor.includes('.jpg') ? `background-image: url(img/${category}/${itemColor})` : `background-color: ${itemColor}`;
    }

    const colorItem = `<input class="config__radio" type="radio" name="${category}Color" value="${color}" aria-label="${color}" style="${background}" data-category="${category}">`;
    node.insertAdjacentHTML('beforeend', colorItem);
  }

  // добавление цвета в разметку
  function addColorItemByProduct (product, node) {
    let background = '';
    let inputClass = 'config__radio';
    const itemColor = colorCodes[product.cat][product.color];
    const itemColorComb = colorCodes[product.cat][product.colorComb];

    if (itemColor) {
      background = itemColor.includes('.jpg') ? `background-image: url(img/${product.cat}/${itemColor})` : `background-color: ${itemColor}`;

      // Если комбинированный цвет, то добавляем второй
      if (itemColorComb) {
        background += `, url(img/${product.cat}/${itemColorComb})`;
        inputClass += ' config__radio--double';
      }
    }
    const colorItem = `<input class="${inputClass}" type="radio" name="${product.cat}Color" value="${product.color}" aria-label="${product.color}" style="${background}" data-category="${product.cat}">`;
    node.insertAdjacentHTML('beforeend', colorItem);
  }

  function selectChairItem(item) {

    const selectedProduct = getProdcutbyColor(item);
    console.log('selected product', selectedProduct);

    // получаем возможные варианты групповых товаров
    const availableChairs = productsSorted.chair.filter(product => {
      return filterAssocChairs(product.assocProducts, selectedProduct);
    });
    console.log('availableChairs', availableChairs);

    // выбираем второй симпл
    const secondItemCategory = selectedProduct.cat === chairParts[0] ? chairParts[1] : chairParts[0];
    console.log('secondItemCategory', secondItemCategory);

    const secondColorItems = Array.from(elConfig.querySelectorAll('input[name="' + secondItemCategory + 'Color"]'));

    let secondSelectedProduct;
    for(let j = 0; j < secondColorItems.length; j++) {
      if (secondColorItems[j].checked) {
        secondSelectedProduct = getProdcutbyColor(secondColorItems[j]);
        break;
      }
    }

    if (secondSelectedProduct) {
      console.log('selected second product', secondSelectedProduct);
      const selectedChair = availableChairs.find(product => {
        return filterAssocChairs(product.assocProducts, secondSelectedProduct);
      });
      console.log('selectedChair', selectedChair);

      if (selectedChair) {
        setFinalData(selectedChair);
        elFinalPrice.textContent = getTotalPrice();
        updateAddToCartLink();
        selectedChair.assocProducts.forEach(product => {
          setProductImage(product.cat, product.color);

          if(product.cat === 'highchair') {
            finalProduct.items.chair.color = product.color;
            setProductImage('legs', product.color);
            // меняем цвет для мини, если он выбран
            if (finalProduct.items.mini.id) {
              setMiniColor();
            }
          }
        });

        previousChairPart = item;
      } else {
        console.log ('no group product found')
        previousChairPart.click();
      }


    } else {
      selectFisrtCategoryItem(secondItemCategory);
    }
  }

  function filterAssocChairs(assocProducts, curProduct) {
    // оставляем товары в которые входит выбранный цвет
    let found = false;
    for(let i = 0; i < assocProducts.length; i++) {
      if (assocProducts[i].color === curProduct.color && assocProducts[i].cat === curProduct.cat) {
        found = true;
        break;
      }
    }
    return found;
  }

  function selectAccessoriesItem(item) {
    const product = getProdcutbyColor(item);
    setFinalData(product);
    setProductImage(product.cat, product.color);
    updateAddToCartLink();
    item.closest('.config__item').querySelector('.config__checkbox').checked = true;
  }

  function setProductImage(cat, color) {
    let modifier = '';
    if (finalProduct.items[cat] && finalProduct.items[cat].modifier) {
      modifier = finalProduct.items[cat].modifier;
    }
    const path = 'img/' + cat.toLowerCase() + modifier + '/' + color.toLowerCase() + '.png';

    const elImage = elConfig.querySelector('#image-' + cat);
    if (elImage) {
      elImage.src = path;
    }
  }

  function resetProductImage(cat) {
    const elImage = elConfig.querySelector('#image-' + cat);
    if (elImage) {
      elImage.src = '';
    }
  }

  function resetColor(cat) {
    const radioButtons = Array.from(elConfig.querySelectorAll('input[name="' + cat + 'Color"]'  ));
    radioButtons.forEach(radio => {
      if (radio.checked) {
        radio.checked = false;
      }
    })
  }

  function selectFisrtCategoryItem(cat) {
    elConfig.querySelector('input[name="' + cat + 'Color"]').click();
  }

  function toggleCheckbox(checkbox) {
    const category = checkbox.value;

    if(category === 'mini') {

      const cushionColor = finalProduct.items.cushion.color;
      // сбрасывем счетчик флипера цветов подушки
      finalProduct.items.cushion.colorSelected = 0;
      if(checkbox.checked) {
        // если мини берем цвет как у стульчика
        setMiniColor();
        elImageHighchair.classList.add('visually-hidden');
        setMoidifier('cushion', '-mini');

        if (cushionColor) {
          setProductImage('cushion', cushionColor);
        }
      } else {
        setMoidifier('cushion', '');
        if (cushionColor) {
          setProductImage('cushion', cushionColor);
        }
        resetFinalData('mini');
        updateAddToCartLink();
        resetColor('mini');
        resetProductImage('mini');
        elImageHighchair.classList.remove('visually-hidden');
      }

    } else if (category === 'baby') {
      // если baby выбираем сразу основание и матрас
      if(checkbox.checked) {
        babyParts.forEach(cat => {
          selectFisrtCategoryItem(cat);
        });
        elFinalProductImage.classList.add('chair-hidden');
      } else {
        babyParts.forEach(cat => {
          resetFinalData(cat);
          updateAddToCartLink();
          resetColor(cat);
          resetProductImage(cat);
        });
        elFinalProductImage.classList.remove('chair-hidden');
      }
    } else {
      // остальные аксессуары
      if(checkbox.checked) {
        selectFisrtCategoryItem(category);
      } else {
        resetFinalData(category);
        updateAddToCartLink();
        resetColor(category);
        resetProductImage(category);
      }
    }
  }

  function setMiniColor() {
    let chairColor = finalProduct.items.chair.color;
    // делаем проверку из-за разных названий коричневых цветов в стульчике и мини
    chairColor = chairColor === 'Bruin' ? 'Donkerbruin' : chairColor

    const miniColorInput = elConfig.querySelector('[name="miniColor"][value="' + chairColor + '"]');
    miniColorInput.click();
  }

  function setMoidifier (cat, modName) {
    finalProduct.items[cat].modifier = modName;
  }

  function getProdcutbyColor(item) {
    const category = item.dataset.category;
    const color = item.value;
    const product = productsSorted[category].find(product => {
      return product.color === color;
    });
    return product;
  }

  function setFinalData(product) {
    finalProduct.items[product.cat].price = product.price;
    finalProduct.items[product.cat].id = product.id;
    finalProduct.items[product.cat].color = product.color;
    if (product.colorComb) {
      finalProduct.items[product.cat].colorComb = product.colorComb;
      finalProduct.items[product.cat].colorSelected = 0;
    }
  }

  function resetFinalData(cat) {
    finalProduct.items[cat].price = 0;
    finalProduct.items[cat].id = '';
    finalProduct.items[cat].color = '';
    if (finalProduct.items[cat].colorComb) {
      finalProduct.items[cat].colorComb = '';
    }
  }

  function getTotalPrice() {
    let totalPrice = 0;
    Object.keys(finalProduct.items).forEach(item => {
      totalPrice += finalProduct.items[item].price;
    });
    return Math.round(totalPrice * 100) / 100;
  }

  function updateAddToCartLink() {
    let link = '/c/a/add/id/';
    Object.keys(finalProduct.items).forEach(item => {
      if (finalProduct.items[item].id) {
        link += finalProduct.items[item].id + ',';
      }
    });
    elBuyButton.href = link;
  }

  let previousChairPart

  // Обработчик всех изменений конфигуратора
  document.addEventListener('change', e => {

    // Если чекбокс
    if (e.target.classList.contains('config__checkbox')) {
      const selectedItem = e.target;
      toggleCheckbox(selectedItem);
      elFinalPrice.textContent = getTotalPrice();
      console.log(getTotalPrice())
    }

    // Если радиобатн
    if (e.target.classList.contains('config__radio')) {
      console.log('config__radio');
      const product = getProdcutbyColor(e.target);

      if (chairParts.includes(e.target.dataset.category)) {
        // если выбран стульчик
        selectChairItem(e.target);

      } else if (babyParts.includes(e.target.dataset.category)) {
        // если выбрана часть nomi baby
        const secondProductCat = product.cat === babyParts[0] ? babyParts[1] : babyParts[0];
        let babyPrice = 0;
        const elItemPrice = e.target.closest('.config__item').querySelector('.config__item-price');
        selectAccessoriesItem(e.target);
        elFinalProductImage.classList.add('chair-hidden');
        if (!finalProduct.items[secondProductCat].id) {
          selectFisrtCategoryItem(secondProductCat);
        }
        babyPrice = finalProduct.items[babyParts[0]].price + finalProduct.items[babyParts[1]].price;
        elItemPrice.textContent = `Price ${babyPrice} €`;
        elFinalPrice.textContent = getTotalPrice();
      } else {
        // если выбран аксессуар
        const itemPrice = product.price;
        const elItemPrice = e.target.closest('.config__item').querySelector('.config__item-price');
        elItemPrice.textContent = `Price ${itemPrice} €`;
        selectAccessoriesItem(e.target);
        console.log('product', product);
        elFinalPrice.textContent = getTotalPrice();
        console.log('total price', getTotalPrice());
      }
    }

  });

  document.addEventListener('click', e => {
    // Если таб
    if (e.target.classList.contains('config__tab-link')) {
      const currentTabId = e.target.id;
      console.log(currentTabId);
      elFinalProductImage.dataset.current = currentTabId;
      if (currentTabId === 'tab3') {

        elFinalProductImage.classList.remove('baby-hidden');
        // скрываем все детали стульчика

      } else {
        // скрываем baby если выбрана
        elFinalProductImage.classList.add('baby-hidden');
      }
    }

    if (e.target.classList.contains('config__flip')) {
      // Обработчик смены двойных цветов
      const itemCategory = e.target.dataset.category;

      console.log('itemCategory', itemCategory);

      const itemColors = [finalProduct.items[itemCategory].color, finalProduct.items[itemCategory].colorComb];

      finalProduct.items[itemCategory].colorSelected = 1 - finalProduct.items[itemCategory].colorSelected;

      setProductImage(itemCategory, itemColors[finalProduct.items[itemCategory].colorSelected]);





      console.log('itemColors', itemColors);
    }
  })

  // Выбираем первый стульчик при загрузке страницы
  const elFirstHighchairColor = document.querySelector('.highchair-color .config__radio');
  elFirstHighchairColor && elFirstHighchairColor.click();
});
