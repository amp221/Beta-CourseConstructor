
var classKeys = ["COMP1010", "COMP1030L", "MATH1310", "ENGL1010", "SSEL0001", "COMP1020", "COMP1040L",
    "MATH1320", "ENGL1020", "AHEL0001", "COMP2010", "COMP2010L", "COMP2030", "COMP2030L", "MATH2190",
    "EECE2650", "COMP2040", "ENGL2200", "MATH3220", "MATH3860", "NSCI0001", "COMP3040", "COMP3050",
    "NSCI0002", "CSET0001", "FREE0001", "COMP3010", "COMP3080", "NSCI0003", "SSEL0002", "FREE0002",
    "COMP4040", "COMPPRO1", "COMP0001", "TCEL0001", "SSEL0003", "COMPPRO2", "COMP0002", "TCEL0002",
    "FREE0003", "FREE0004"];


//function that returns the total number of course credits in the course path
//function that returns the total number of completed credits.
var courseCredits = 0, userCredits = 0, creditsLeft; 


$.getJSON("data/courses.json", function (csCourses) {
    console.log(csCourses);
    
    console.log(csCourses.courses[classKeys[0]]);
    
    //get user data
    $.getJSON("data/user_data.json", function (user) {
        console.log(user.user_courses[classKeys[0]]);
        
        $(document).ready(function () {
           
            /* function that calculates total number of course credits in the course path, 
            total number of users completed credits and the remaining credits */
            function tallyCredits() {
                for (let index = 0, len = classKeys.length; index < len; index++) {
                    courseCredits += csCourses.courses[classKeys[index]].cCredit;
                    if (user.user_courses[classKeys[index]] == "completed") 
                        userCredits += csCourses.courses[classKeys[index]].cCredit;
                }
                creditsLeft = courseCredits - userCredits;
                console.log(courseCredits);
                console.log(userCredits);
            }
            tallyCredits();
            
            /* calculates the remianing number of credits then divides it by 15
            (we may want to replace user's input/preference if we have time)*/
            function semestersLeft() {
                creditsLeft = Math.ceil(creditsLeft / 15);
                console.log(creditsLeft);
            }
            semestersLeft();
            
            /* checks for change in course status and prints/returns course number and status.
             we can use this to update the course status in the future*/
            
            $("select").change(function () {
                var selectedStatus = $(this).children("option:selected").val();
                alert(this.className + " You have selected  " + selectedStatus);
            });

        }); 

    }); // end user_data scope

}); // end courses scope