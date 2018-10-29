//const baseuri = 'https://sw5grt00ta.execute-api.us-east-1.amazonaws.com/test/feedback';
const baseuri = 'https://gkevx3fe8f.execute-api.us-east-1.amazonaws.com/prod/feedback/index';
//const baseuri = 'https://8ab8fayc6b.execute-api.us-east-1.amazonaws.com/qa/feedback/index';
function getField(fieldname){
  var fld = document.getElementById(fieldname);
  if(!(fld==null)){
    var value = fld.value;
    if(value==undefined){
      value = '';
    }
    return value;
  }
  else {
    return '';
  }
}

function getselect(fieldname)
{
  var fld = document.getElementById(fieldname);
  if(!(fld==null)){
    var value = fld.options[ fld.selectedIndex ].value;
    if(value==undefined){
      value = '';
    }
    return value;
  }
  else {
    return '';
  }
}

function submitform()
{
  var name = getField('name');
  var email = getField('email');
  var feedback = getField('feedback');
  var improve = getField('improve');
  var followup = getField('followup');
  var driver = getselect('driversafety');
  var track = getselect('tracksessions');
  var techsess = getField('techsessions');
  var expo = getField('expoarea');
  var wipro = getField('wipro');
  var cognizant = getField('cognizant');
  payload={"name":name,
          "email":email,
          "feedback":feedback,
          "improve":improve,
          "followup":followup,
          "driver":driver,
          "track":track,
          "tech":techsess,
          "expo":expo,
          "wipro":wipro,
          "cognizant":cognizant
        };
  var data = JSON.stringify(payload);

/*  var data = new FormData();
  data.append('name',name);
  data.append('email',email);
  data.append('feedback',feedback);
  data.append('improve',improve);
  data.append('followup',followup);
  data.append('driver',driver);
  data.append('track',track);
  data.append('tech', techsess);
  data.append('expo', expo);
  data.append('wipro', wipro);
  data.append('cognizant',cognizant);*/

  fetch(baseuri, {method: "POST", body: data,
    })
      .then(response => {
        if(response.ok) return response.json();
            throw new Error(response.statusText)  // throw an error if there's something wrong with the response
      })
     .then(function handleResponse(data)
     {
        alert("Thank you for your feedback!");
        btn = document.getElementById('submitbutton');
        btn.style.visibility = 'hidden';
     });
}
