$(function() {
  // Create a model for the services
  var Service = Backbone.Model.extend({
    
    // These are their default values

    defaults: {
      dataMatrix: "None",
      backgroundColor: "white"
    },

    // Helper function for checking/unchecking a service
      setBackgroundRed: function(investment, marketCap) {
        if (investment && marketCap) {
          if (this.getDataAttribute() == `${investment}-${marketCap}`) {
            this.backgroundColor = "red";
          }
        }
      },
    getBackGroundColor: function() {
      return this.backgroundColor;
    },
    getDataAttribute: function() {
      return this.dataMatrix;
    }
  });

  // Create a collection of services
  var ServiceList = Backbone.Collection.extend({
    // Will hold objects of the Service model
    model: Service
  });

  // Prefill the collection with a number of services.
  var services = new ServiceList([
    new Service({
      dataMatrix: "Value-High",
      className: "ele",
      isSelected: false
    }),
    new Service({
      dataMatrix: "Blend-High",
      className: "ele",
      isSelected: false
    }),
    new Service({
      dataMatrix: "Growth-High",
      className: "ele",
      isSelected: false
    }),
    new Service({
      dataMatrix: "Value-Mid",
      className: "ele",
      isSelected: false
    }),
    new Service({
      dataMatrix: "Blend-Mid",
      className: "ele",
      isSelected: false
    }),
    new Service({
      dataMatrix: "Growth-Mid",
      className: "ele",
      isSelected: false
    }),
    new Service({
      dataMatrix: "Value-Low",
      className: "ele",
      isSelected: false
    }),
    new Service({
      dataMatrix: "Blend-Low",
      className: "ele",
      isSelected: false
    }),
    new Service({
      dataMatrix: "Growth-Low",
      className: "ele",
      isSelected: false
    })
    // Add more here
  ]);

  // This view turns a Service model into HTML
  var ServiceView = Backbone.View.extend({
    tagName: "div",

    initialize: function() {
      // Set up event listeners. The change backbone event
      // is raised when a property changes (like the checked field)

      this.listenTo(this.model, "change", this.render);
    },

    render: function() {
      // Create the HTML

      this.$el.html(
        "<div class = " +
          this.model.get("className") +
          " data-matrix=" +
          this.model.get("dataMatrix") +
          "style=background-color:" +
          this.model.getBackGroundColor() +
          "/>"
      );

      // Returning the object is a good practice that makes chaining possible
      return this;
    }
  });

  var SelectorView = Backbone.View.extend({
    events: {
      click: "highlightBox"
    },
    render: function() {
      // Create the HTML

      this.$el.html("<button type=button id=submit>Submit</button>");

      // Returning the object is a good practice
      // that makes chaining possible
      return this;
    },

    highlightBox: function() {
      var investmentFund = $("investmentFund").value;
      var marketCapital = $("marketCapital").value;
      this.model.setBackgroundRed(investmentFund, marketCapital);
    }
  });

  // The main view of the application
  var App = Backbone.View.extend({
    // Base the view on an existing element
    el: $("#main"),

    events: {
      click: "highlightBox"
    },

    initialize: function() {
      this.list = $("#parent");

      // Listen for the change event on the collection.
      // This is equivalent to listening on every one of the
      // service objects in the collection.
      this.listenTo(services, "change", this.render);

      // Create views for every one of the services in the
      // collection and add them to the page

      services.each(function(service) {
        var view = new ServiceView({ model: service });
        this.list.append(view.render().el);
	  }, this); // "this" is the context in the callback
	  
	  var view = new SelectorView();
      this.list.append(view.render().el);
    }
  });

  new App();
  new SelectorView();
});
