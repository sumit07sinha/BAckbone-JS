$(function(){
    // create backbone model
    var Service=Backbone.Model.extend({
        defaults:{
            dataMatrix:"None",
            backgroundColor:"White"
        },
        setbackgroundColor: function(){
            return (this.backgroundColor = "red");
        },
        getbackgroundColor: function(){
            return this.backgroundColor;
        },
        getdataMatrix: function(){
            return this.dataMatrix;
        },
    });
    //create colection of services
    var ServiceList = Backbone.Collection.extend({
        // Will hold objects of the Service model
        model: Service,
        getSelected: function() {
          return this.where({ isSelected: true });
        }
      });
    // Create services for the collection
    var Services= new ServiceList([
        new Service({
            dataMatrix: "Value-High",
            className:"ele",
            backgroundColor:"White",
            isSelected: false,

        }),
        new Service({
            dataMatrix: "Blend-High",
            className: "ele",
            backgroundColor: "white",
            isSelected: false
          }),
          new Service({
            dataMatrix: "Growth-High",
            className: "ele",
            backgroundColor: "white",
            isSelected: false
          }),
          new Service({
            dataMatrix: "Value-Mid",
            className: "ele",
            backgroundColor: "white",
            isSelected: false
          }),
          new Service({
            dataMatrix: "Blend-Mid",
            className: "ele",
            backgroundColor: "white",
            isSelected: false
          }),
          new Service({
            dataMatrix: "Growth-Mid",
            className: "ele",
            backgroundColor: "white",
            isSelected: false
          }),
          new Service({
            dataMatrix: "Value-Low",
            className: "ele",
            backgroundColor: "white",
            isSelected: false
          }),
          new Service({
            dataMatrix: "Blend-Low",
            className: "ele",
            backgroundColor: "white",
            isSelected: false
          }),
          new Service({
            dataMatrix: "Growth-Low",
            className: "ele",
            backgroundColor: "white",
            isSelected: false
          })
    ]);
    var ServiceView = Backbone.View.extend({
      tagName: "div",
  
      initialize: function() {
        /* Set up event listeners. The change backbone event
        is raised when a property changes (like the checked field)*/
  
        this.listenTo(this.model, "change", this.render);
      },
  
      render: function() {
        // Create the HTML
  
        this.$el.html(
          "<div class = " +
            this.model.get("className") +
            " data-matrix=" +
            this.model.get("dataMatrix") +
            " style=background-color:" +
            this.model.get("backgroundColor") +
            "/>"
        );
  
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
  
        return this;
      },
  
      highlightBox: function() {
        var investmentFund = $("#investmentFund")[0].value;
        var marketCapital = $("#marketCapital")[0].value;
        if (investmentFund && marketCapital) {
          Services.models.forEach(model => {
            if (model.get("dataMatrix") === `${investmentFund}-${marketCapital}`) {
              model.set("backgroundColor","red");
            }else{
              model.set("backgroundColor","white");
            }
          });
        }
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
    
        Services.each(function(Service) {
          var view = new ServiceView({ model: Service });
          this.list.append(view.render().el);
        }, this); // "this" is the context in the callback
  
        var view = new SelectorView();
        this.list.append(view.render().el);
        return this;
      }
      // Create views for every one of the services in the collection and add them to the page
    });
  
    new App();
    new SelectorView();
  });
