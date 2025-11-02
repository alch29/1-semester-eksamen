$(function() {
    let accordion = {
        init: function() {
          this.appendContent('#accordionTemplate', products);
          this.cacheOnLoad();
          this.bindEvents();
        },
    
        cacheOnLoad: function(){
          this.$title = $('.productAccordionTitle', '#content');
        },
    
        appendContent: function(sourceSelector, context, targetSelector) {
          const source   = $(sourceSelector).html();
          const template = Handlebars.compile(source);
          $(targetSelector).html(template(context));
        },
    
        bindEvents: function() {
          const self = this;
          this.$title.on('click', function() {
            $(this).next().slideToggle();
            $(this).toggleClass('active');
          });
        }
      };
    
      accordion.init();
    });