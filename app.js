console.log('connected')

$.ajax({
    url: "https://data.cityofnewyork.us/resource/erm2-nwe9.json?agency_name=New York City Police Department",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "OqeZeNgyai7P8r18IB9dN0rRt",
      
    }
}).then(function(data) {
  console.log("Retrieved " + data.length + " records from the dataset!");
  console.log(data);

  //create button function
  $('button').on('click', (event)=>{
    console.log(event.currentTarget.innerText) //works!
    //get input from form
    
    //clear page for new results lists
    $('.results').empty()

    const $inputValue = $('input').val()
    //make array to put applicable complaints in
    let complaintList = []
    //loop over data to find objects that match
        for (i = 0; i < data.length; i++) {
           if (data[i].borough === event.currentTarget.innerText){
               complaintList.push(data[i]) 
           }
        }
        console.log(complaintList)

        let newArray = []

        if ($.isNumeric($inputValue)) {
            newArray = complaintList.slice(0, $inputValue)
        } else {
            newArray = complaintList.slice(0, 10)
        }
        console.log(newArray)
        for (complaint of newArray) {
            const $result = $('<div>').html(`<h3>${complaint.descriptor}, ${complaint.complaint_type}</h3>
            <button class='police_response'>What did the police do?</button><h5 class="unclicked">${complaint.resolution_description}</h5>`)
            $result.appendTo($('.results'))

            //make police response clickable
            const $policeButton = $('.police_response').on('click', (event) => {
                $element = $(event.currentTarget)
                // console.log($element)
                $element.next().attr('id', 'clicked')
            //     .toggleClass('clicked')
            })  
        }
        $('input').val('')
    })


}).catch((error) =>{
    console.log(error)
})

/*Some source: https://www.tutorialrepublic.com/faq/how-to-check-whether-a-value-is-numeric-or-not-in-jquery.php

https://stackoverflow.com/questions/9236332/jquery-how-to-empty-input-field
*/