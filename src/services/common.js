angular.module('booklya.services')
  .service('Common', [ 
    Common 
  ]);

function Common() {

  this.getSlides = function() {
    return [
      {
        image: '/img/slide1.jpg',
        title: '<h1><span class="yellow">Вебинары</span> для<br>интересующихся</h1>',
        text: '<p><b>Букля</b> - международный центр интерактивного обучения и онлайн консультаций. Вы получаете услуги высокого качества за счет синергии знаний и опыта лучших экспертов сервиса.</p>',
        linkText: 'подробнее о Букле',
        url: '/webinar'        
      },
      {
        image: '/img/slide1.jpg',
        title: '<h1><span class="yellow">Вебинары</span> для<br>интересующихся</h1>',
        text: '<p><b>Букля</b> - международный центр интерактивного обучения и онлайн консультаций. Вы получаете услуги высокого качества за счет синергии знаний и опыта лучших экспертов сервиса.</p>',
        linkText: 'подробнее о Букле',
        url: '/webinar'        
      },
      {
        image: '/img/slide1.jpg',
        title: '<h1><span class="yellow">Вебинары</span> для<br>интересующихся</h1>',
        text: '<p><b>Букля</b> - международный центр интерактивного обучения и онлайн консультаций. Вы получаете услуги высокого качества за счет синергии знаний и опыта лучших экспертов сервиса.</p>',
        linkText: 'подробнее о Букле',
        url: '/webinar'        
      },
      {
        image: '/img/slide1.jpg',
        title: '<h1><span class="yellow">Вебинары</span> для<br>интересующихся</h1>',
        text: '<p><b>Букля</b> - международный центр интерактивного обучения и онлайн консультаций. Вы получаете услуги высокого качества за счет синергии знаний и опыта лучших экспертов сервиса.</p>',
        linkText: 'подробнее о Букле',
        url: '/webinar'        
      }
    ]
  };

};