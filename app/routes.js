//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

//Persona header selection

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



// Tasks - call task v2
router.post('/agent/ni-reporting/call-task-v2/ni-task-answer', function (req, res) {
    var task = req.session.data['task'];

    if (task == "CRU 1") {
        res.redirect('/agent/ni-reporting/call-task-v2/cru1-tasks');
    } 
    else if (task == "Legacy") {
        res.redirect('/agent/ni-reporting/call-task-v2/legacy-tasks');
    } 
    else if (task == "HS Treatment") {
        res.redirect('/agent/ni-reporting/call-task-v2/ni-hs-tasks');
    } 
    else {
        res.redirect('/agent/ni-reporting/call-task-v2/task-list'); // fallback route
    }
});

// Task outcome - Confirm HS treatment NI
router.post('/agent/task-outcome-answer', function (req, res) {
    var taskOutcomes = req.session.data['taskOutcomes'];

    if (taskOutcomes == "HS yes") {
        res.redirect('/agent/confrimation-hs');

    } else if (taskOutcomes == "HS no") {
        res.redirect('/agent/confrimation-no-hs');
        
    } else if (taskOutcomes == "HS unknown") {
        res.redirect('/agent/confrimation-hs-unknown');
    }

});


// Task outcome - Confirm HS treatment NI - call task v2
router.post('/agent/ni-reporting/call-task-v2/ni-task-outcome-answer', function (req, res) {
    var taskOutcomes = req.session.data['taskOutcomes'];

    if (taskOutcomes == "HS yes") {
        res.redirect('/agent/ni-reporting/call-task-v2/confrimation-hs');

    } else if (taskOutcomes == "HS no") {
        res.redirect('/agent/ni-reporting/call-task-v2/confrimation-no-hs');
        
    } else if (taskOutcomes == "HS unknown") {
        res.redirect('/agent/ni-reporting/call-task-v2/confrimation-hs-unknown');
    }

});
// Claim options 
router.post('/agent/claim-options-answer', function (req, res) {
    var claimOptions = req.session.data['claimOptions'];

    if (claimOptions == "update-claim-details") {
        res.redirect('/agent/update-claim-details');

    } else if (claimOptions == "send-a-letter") {
        res.redirect('/agent/confirmation-hs-unknown-send-letter');
        
    } else if (claimOptions == "confirm-hospital-treatment-not-needed") {
        res.redirect('/agent/confrimation-no-hs-option');
    }

});

// Claim options -call task v2
router.post('/agent/ni-reporting/call-task-v2/ni-claim-options-answer', function (req, res) {
    var claimOptions = req.session.data['claimOptions'];

    if (claimOptions == "update-claim-details") {
        res.redirect('/agent/ni-reporting/call-task-v2/update-claim-details');

    } else if (claimOptions == "send-a-letter") {
        res.redirect('/agent/ni-reporting/call-task-v2/confirmation-hs-unknown-send-letter');
        
    } else if (claimOptions == "confirm-hospital-treatment-not-needed") {
        res.redirect('/agent/ni-reporting/call-task-v2/htc-outcome-source1');
    }

});

// Claim options -call task v2
router.post('/agent/ni-reporting/call-task-v2/ni-claim-options-answer1', function (req, res) {
    var claimOptions = req.session.data['claimOptions'];

    if (claimOptions == "update-claim-details") {
        res.redirect('/agent/ni-reporting/call-task-v2/update-claim-details-hs-yes');

    } else if (claimOptions == "send-a-letter") {
        res.redirect('/agent/ni-reporting/call-task-v2/confirmation-hs-unknown-send-letter');
        
    } else if (claimOptions == "confirm-hospital-treatment-not-needed") {
        res.redirect('/agent/ni-reporting/call-task-v2/htc-outcome-source1');
    }

});

//NB Split the routes below into a V2 file ASAP

//Set scenario to simulate
router.post('/scenario', function (req, res) {
  res.redirect('/v2/conditions')
});

//Set conditions to simulate
router.post('/conditions', function (req, res) {
   var scenario = req.session.data['scenario']
  if (scenario == "cru4"){
    res.redirect('/v2/agent/task/cru-4-amendment')
  } else if (scenario == "claim"){
    res.redirect('/v2/claim-state')
  }   
})

//Set claim state
router.post('/claim-state', function (req, res) {
   var conditions = req.session.data['conditions']
  if (conditions == "contactDetailsUpdated"){
    res.redirect('/v2/agent/claim#past-week')
  } else {
    res.redirect('/v2/agent/claim')
  }   
})

//Note selection routing
router.post('/note-type', function (req, res) {
  var noteType = req.session.data['noteType']
  if (noteType == "agentNote"){
    res.redirect('/v2/agent/notes/note')
  } else if (noteType == "nhsNote"){
    res.redirect('/v2/agent/notes/nhs-note')
  }
})



//CRU 4 amendement
router.post('/cru-4-answer', function (req, res) {

  var amendmentOptions = req.session.data['amendmentOptions']
  if (amendmentOptions == "ignore"){
    res.redirect('/v2/agent/task/cru-4-ignore-confirm')
  } else if (amendmentOptions == "detailsUpdated"){
    res.redirect('/v2/agent/task/cru-4-updated-confirm')
  } else if (amendmentOptions == "ignoreLegacy"){
    res.redirect('/v2/agent/task/cru-4-legacy')
  }
})

//Org registration start outcome
router.post('/v2/agent/registration/start', function (req, res) {
  const additionalinfo = req.session.data['additionalinfo']
  if (additionalinfo.includes('InsurerID')) {
    res.redirect('/v2/agent/registration/insurer-id')
  } else {
    res.redirect('/v2/agent/registration/org-name')
  }
})

//Org type next step navigation
router.post('/v2/agent/registration/org-type', function (req, res) {
  var additionalinfo = req.session.data['additionalinfo']
   if (additionalinfo.includes("delegateID")){
    res.redirect('/v2/agent/registration/delegate-id')
  } else if (additionalinfo.includes("email")){
    res.redirect('/v2/agent/registration/org-email')
  } else if (additionalinfo == "none"){
    res.redirect('/v2/agent/registration/check-your-answers')
  }
})

//Org delegateid navigation
router.post('/v2/agent/registration/delegate-id', function (req, res) {
  const additionalinfo = req.session.data['additionalinfo']
  if (additionalinfo.includes('email')) {
    res.redirect('/v2/agent/registration/org-email')
  } else {
    res.redirect('/v2/agent/registration/check-your-answers')
  }
})

//duplicate org confirmed routing
router.post('/v2/agent/registration/insurer-id', function (req, res) {
  const insurerid = req.session.data['insurerid']
  if (insurerid.includes('12345B')) {
    res.redirect('/v2/agent/registration/dupe-org-confirmed')
  } else {
    res.redirect('/v2/agent/registration/org-name')
  }
})

//possible duplicate org routing
router.post('/v2/agent/registration/org-name', function (req, res) {
  const orgname = req.session.data['orgname']
  if (orgname.includes ('Questionable insurance co')) {
    res.redirect('/v2/agent/registration/dupe-org')
  } else {
    res.redirect('/v2/agent/registration/org-type')
  }
})