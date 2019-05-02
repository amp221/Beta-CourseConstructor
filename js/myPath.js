
var classKeys = ["COMP1010", "COMP1030L", "MATH1310", "ENGL1010", "SSEL0001", "COMP1020", "COMP1040L",
    "MATH1320", "ENGL1020", "AHEL0001", "COMP2010", "COMP2010L", "COMP2030", "COMP2030L", "MATH2190",
    "EECE2650", "COMP2040", "ENGL2200", "MATH3220", "MATH3860", "NSCI0001", "COMP3040", "COMP3050",
    "NSCI0002", "CSET0001", "FREE0001", "COMP3010", "COMP3080", "NSCI0003", "SSEL0002", "FREE0002",
    "COMP4040", "COMPPRO1", "COMP0001", "TCEL0001", "SSEL0003", "COMPPRO2", "COMP0002", "TCEL0002",
    "FREE0003", "FREE0004"];


//function that returns the total number of course credits in the course path
//function that returns the total number of completed credits.
var courseCredits = 0, userCredits = 0, creditsLeft = 0, gradSemLeft = 0;
var popoverText, cID, myID, test;

 //get cs courses
$.getJSON("data/courses.json", function (csCourses) {
    
    //get user_data
    $.getJSON("data/user_data.json", function (user) {
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

            /* calculates the remianing number of credits then divides it by 15 and applys 
            the Math.floor function to round down (we may want to replace user's input/preference if we have time)*/
            function semestersLeft() {
                //gradSemLeft = Math.ceil(creditsLeft / 15);
                gradSemLeft = Math.floor(creditsLeft / 15);
                console.log(gradSemLeft);
            }
            semestersLeft();

            /* inserts pre/coreq's into popover */
            function getPreCoreq() {
                for (let index = 0, len = classKeys.length; index < len; index++) {
                    popoverText = "";
                    preLen = csCourses.courses[classKeys[index]].preReq.length;
                    coLen = csCourses.courses[classKeys[index]].coReq.length;
                    //checking for preReq(s)
                    if (preLen == 0) {
                        popoverText += "Prereq: None," + "\n";
                    } else {
                        popoverText += "Prereq:"
                        for (var i = 0; i < preLen; i++) {
                            popoverText += ' ' + csCourses.courses[classKeys[index]].preReq[i] + ",";
                        }
                    }
                    popoverText += "\n";
                    // checking for coreq(s)
                    if (coLen == 0) {
                        popoverText += "Coreq: None \n";
                    } else {
                        popoverText += "\n Coreq:"
                        for (var i = 0; i < coLen; i++) {
                            popoverText += ' ' + csCourses.courses[classKeys[index]].coReq[i] + ", \n";
                        }
                    }
                    cID = '#';
                    cID += classKeys[index];
                    $(cID).attr('data-content', popoverText);
                }
            }
            getPreCoreq();

            /* populates user profile

            "user_info": {
                "userName": "john_smith@student.uml.edu",
                "userPassword": "password",
                "userFirst": "John",
                "userLast": "Smith",
                "userMajor": "Computer Science | General",
                "advisor": "Some Guy",
                "advisorEmail": "Some_Guy@uml.edu"
            },
            <h2 class="student-name">John Smith</h2>
            <p class="student-major-track">Computer Science | General</p>
            <p class="student-grad-date">Graduating: May 2023</p>
            <p class="advisor-name">Advisor: Some Guy</p>
            <p class="advisor-email">Email: some_guy@uml.edu</p>
            ************************************************
            
            */
            function getProfile() {
                $('.student-name').contents().replaceWith(user.user_info.userFirst + " " + user.user_info.userLast);
                $('.student-major-track').contents().replaceWith(user.user_info.userMajor); 
                $('.student-grad-date').contents().replaceWith("Estimated Semesters Left:" + " " + gradSemLeft);
                $('.advisor-name').contents().replaceWith("Advisor: " + user.user_info.advisor);
                $('.advisor-email').contents().replaceWith("Advisor Email: " + user.user_info.advisorEmail);
            }
            getProfile();
            
            /* checks for change in course status and prints/returns course number and status.
             we can use this to update the course status in the future*/
            $("select").change(function () {
                var selectedStatus = $(this).children("option:selected").val();
                alert(this.className + " You have selected  " + selectedStatus);
            });

        });

    }); // end user_data scope

}); // end courses scope