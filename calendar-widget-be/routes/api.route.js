const res = require('express/lib/response');
const { google } = require('googleapis');
const CLIENT_ID='1044653988686-rg5budg6dhlo90b552q3q2ap07696anp.apps.googleusercontent.com';
const CLIENT_SECRET=''
const REDIRECT_URL='http://localhost:3000'
const GOOGLE_LOGIN_SCOPE = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events';



const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
)

const getConnectionURL = () => {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: GOOGLE_LOGIN_SCOPE
  })
}



const router = require('express').Router();

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});
router.get('/getAuthURL', async (req, res, next) => {
  const url = getConnectionURL();
  res.send({url});
});

router.post('/createTokens', async (req, res, next) => {
  try {
    const { access_token, fromDate, inviteList, toDate } = req.body;
    const timeStr = new Date().getTime();
    oAuth2Client.setCredentials({ access_token: access_token });

    const calRes = await google.calendar("v3").events.insert({
      auth: oAuth2Client,
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: {
        attendees: inviteList.map(email => { email: email }),
        conferenceData: {
          createRequest: {
            conferenceSolutionKey: {
              type: 'hangoutsMeet'
            },
            requestId: 'meeting' + timeStr
          }
        },
        summary: 'Quick Connect',
        description: 'Let\'s connect',
        location: 'Patna, India',
        start: {
          dateTime: new Date(fromDate)
        },
        end: {
          dateTime: new Date(toDate)
        }
      }
    });
    res.send(calRes.data);
  } catch (err) {
    next(err);
  }
})

module.exports = router;
