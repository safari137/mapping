//  var globalCourses = [
//         {   name: 'MATH', 
//             assignments: [
//                 {name: "Test1"}, 
//                 {name: "Test2"}
//             ]
//         },
//         {   name: 'PSYCH', 
//             assignments: [
//                 {name: "Test1.1"}, 
//                 {name: "Test2.1"}
//             ]
//         }
//     ];
    var viewModel = {
         courses: ko.observableArray()
    }

    ko.applyBindings(viewModel);


var getData = function(url, callback) {
    $.get(url, function(data) {
        callback(data);
    });
}

$(document).ready(function() {
    var url = "https://course-api-safari137.c9users.io/api/courses";
    getData(url, function(data) {
        getAssignmentData(data);
    });
});

var getAssignmentData = function(courses) {    
    courses.forEach(function(course, index, arr) {
        var fullCourseObj = {};
        fullCourseObj.name = course.name;
        fullCourseObj.assignments = [];
        var url = "https://course-api-safari137.c9users.io/api/courseassignments?crc=000" + course.CRC;
        getData(url, function(data) {
            data.forEach(function(assignment, index, arr) {
                fullCourseObj.assignments.push(assignment);
                if (index === arr.length - 1) {
                    viewModel.courses.push(fullCourseObj);
                }
            });
        });       
    });        
}

// Listeners

var look;

$("div").on("click", ".show", function() {
    look = $(this)
            .closest(".courseInfo")
            .children()[3];
    $(look).toggleClass("hide");
    console.log(look);
});





