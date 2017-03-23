(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);

        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    $('#strengthLevel').change(function() {
        // set the strength level immediately
        //$('#coffeeStren').html($('#strengthlabel').val());
        // set the strength level on change of #strengthLevel
        document.getElementById('[strength-range]');
        $('#strength-range').empty();
        $('#strength-range').append('Caffeine Rating: ' + this.value);

        //this.$formElement.on('change', '#strengthlabel', function() {
        //$('#coffeeStrength').html($('#strengthlabel').val());
        if (this.value < 34) {
            $('#strength-range').css('color', 'green');
        } else if (this.value > 33 && this.value < 67) {
            $('#strength-range').css('color', 'orange');
        } else if (this.value > 66) {
            $('#strength-range').css('color', 'red');
        }

        //});
    });
    /*
        $('#strength').on('input', function() {
            $('#strengthlabel').text($(this).val());
            console.log('Works');
        });
        */
    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            //Event handler code will go here
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data);

            this.reset();
            this.elements[0].focus();

        });
    };

    FormHandler.prototype.addDecafHandler = function(fn) {
        var message = 'Decaf must have Caffeine level under 20';
        var coffee;
        this.$formElement.on('input', '[name="coffee"]', function(event) {
            coffee = event.target;
            var data = {};
            this.$formElement.serializeArray().forEach(function(item) {
                if (item.name === 'coffee' || item.name === 'strength') {
                    data[item.name] = item.value;
                }
            });
            if (fn(data.coffee, data.strength)) {
                event.target.setCustomValidity('');
            } else {
                event.target.setCustomValidity(message);
            }
        }.bind(this));
        this.$formElement.on('change', '[name="strength"]', function(event) {
            var data = {};
            this.$formElement.serializeArray().forEach(function(item) {
                if (item.name === 'coffee' || item.name === 'strength') {
                    data[item.name] = item.value;
                }
            });
            if (fn(data.coffee, data.strength)) {
                if (coffee) {
                    coffee.setCustomValidity('');
                }
                event.target.setCustomValidity('');
            } else {
                event.target.setCustomValidity(message);
            }
        }.bind(this));
    };



    App.FormHandler = FormHandler;
    window.App = App;

})(window);
