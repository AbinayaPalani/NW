const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');



Given('check the account status is in Active', function () {
    
    return client.frame('adminTool')
            .expect.element('#changeStatus')
            .text.to.equal('Change Status').pause(3000).click('#changeStatus');
        
    });

When('check change status to list to verify that list of status for active case', function () {
    
    let fromStatusValue;
    return client.pause(2000).getValue("input[id='accountStatus']", function(fromStatusValue){
        console.log("Get the status value from the ui 2 "+fromStatusValue.value);
        if(fromStatusValue.value === "Active" || fromStatusValue.value === 'Active | Past Due' 
          || fromStatusValue.value === 'Active | Notice to Block' || fromStatusValue.value === 'Active | Unpaid'){
 
                client.waitForElementVisible('button#accountStatusButton span#accountStatusChange',3000).click('button#accountStatusButton span#accountStatusChange');
                client.pause(2000).click('a#delayBilling.userStatuses').pause(2000);
 
            }
    
        });
    });

Then('choose Delay billing status in Change Status To', function () {
        
        return client.pause(2000).click('a#delayBilling.userStatuses').pause(2000);
    });

Then('move the customer for delay billing and enter the fields', function () {
        
    var randomDatePicker,datePickerValue;
    
       
    
        return client.elements("css selector","ul#datePeriod li button", function(datePicker){
            console.log("DatePicker length"+datePicker.value.length);
            datePickerValue = datePicker.value.length;
            console.log(datePicker);
            randomDatePicker = Math.floor((Math.random() * datePickerValue) + 1);
            console.log("choose the random date picker"+randomDatePicker);              
            if(randomDatePicker === 6){   
                 client.assert.visible('#datePeriodDiv ul#datePeriod.datePeriods li:nth-child('+randomDatePicker+').datePeriod button.datePeriodButton.radio-btn').click('#datePeriodDiv ul#datePeriod.datePeriods li:nth-child('+randomDatePicker+').datePeriod button.datePeriodButton.radio-btn')
                    .setValue('input#popupDate',"27072020").setValue('textarea#popupDescription','Testing the admintool on nightwatch js');
            }
            else
            {
                 client.assert.visible('#datePeriodDiv ul#datePeriod.datePeriods li:nth-child('+randomDatePicker+').datePeriod button.datePeriodButton.radio-btn').click('#datePeriodDiv ul#datePeriod.datePeriods li:nth-child('+randomDatePicker+').datePeriod button.datePeriodButton.radio-btn')
                    .setValue('texwtarea#popupDescription','Testing the admintool on nightwatch js');  
            }
            client
            .getLocationInView("button#formSubmit.submit_btn")
            .pause(1000).assert.visible('#formSubmit').click('#formSubmit').pause(20000);
        });   
    });

Then('check the status in account summary, if in case failed in delay billing we will be in changes status and then it has to be created a task link in the top', function () {

        return client
                    .getLocationInView("button#formSubmit.submit_btn")
                    .pause(1000).assert.visible('#formSubmit').click('#formSubmit').pause(20000);
    });

Then('check the status in account summary, if in case failed in delay billing we will be in changes status and then it has to be created a task link in the top', function () {

        return client
                    .execute(function status(){
                        let element = document.getElementById('userStatus').value;
                        console.log("Status in"+ element);
                        if(element.length == 0 && element == ""){
                            console.log('Element is empty')
                        }
        },[]);
    });

Then('check the account status is in Delay billing', function () {
        
        return client
                    .expect.element('#changeStatus')
                    .text.to.equal('Change Status').pause(3000).click('#changeStatus');
       
    });

Then('check changes status to list to verify that list of status for delay billing', function () {
        
        return client.waitForElementVisible('div#accountStatusContainer input#accountStatus',3000)
                    .assert.valueContains('div#accountStatusContainer input#accountStatus','Active | Delay Billing');
    });

Then('choose return to service in Change Status To', function () {
        
        return client.waitForElementVisible('button#accountStatusButton span#accountStatusChange',3000)
                    .pause(1000).click('button#accountStatusButton span#accountStatusChange')
                    .assert.visible('a#returnToService.userStatuses')
                    .click('a#returnToService.userStatuses');
    });

Then('move the customer for delay billing to active and enter the fields', function () {
        
        return client
                    .pause(2000)
                    .setValue('div#popupDescriptionDiv textarea#popupDescription','Testing the returning to serivce via admintool from delay billing');
    
    });

Then('check the status in account summary, if in case failed in delay billing to active we will be in change status and then it has to be created a task link in the top', function () {
        
    return client
                .getLocationInView("button#formSubmit.submit_btn", function(){

                    client.pause(1000).assert.visible('#formSubmit').click('#formSubmit').pause(20000);
                    if(client.expect.element('h4#popupHeader').to.be.present){

                        console.log('Customer moved to Active: Test Case is passed');

                    }

                })
                
    
    });