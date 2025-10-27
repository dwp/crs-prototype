//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

//Persona selection

router.post('/persona-answer', function (req, res) {
    var persona = req.session.data['persona'];
    if (persona == "compensator") {
        res.redirect('/compensator-ui-index');
    } else if (persona == "agent") {
        res.redirect('/agent-ui-index');
    }
});


// Tasks
router.post('/agent/task-answer', function (req, res) {
    var task = req.session.data['task'];

    if (task == "CRU 1") {
        res.redirect('/agent/cru1-tasks');
    } 
    else if (task == "Legacy") {
        res.redirect('/agent/legacy-tasks');
    } 
    else if (task == "HS Treatment") {
        res.redirect('/agent/ni-hs-tasks');
    } 
    else {
        res.redirect('/agent/task-list'); // fallback route
    }
});


