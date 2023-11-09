// Load .env variables and import packages 
// https://cdnjs.com/ 
// https://community.grafana.com/t/k6-dotenv-support/97862/6
// https://www.youtube.com/watch?v=22OmBFKj7fc
// Use dotenv-cli for k6 environment variables, easily import JS util libs like lodash, faker, moment
import basic from './basic'
import session from './session'

import http from "k6/http";
import { check, fail, group } from 'k6';


export default function test () {
  const url = __ENV.NEXT_PUBLIC_URL
  let res = http.get(`${url}`)
  let csrfRoute = http.get(`${url}/api/auth/csrf`)

  group('site heartbeat', () => {
    basic()
    // check(res, {
    //   'status is 200': (r) => r.status === 200,
    //   'response is quick <100ms': (r) => r.timings.duration < 100,
    // });

    // // ui checks
    // check(res, {
    //   '"Continue without logging in" button present': (r) => r.html().find('a.text-blue-500').text() === 'Continue without logging in',
    // })
  
    // check(csrfRoute, {
    //   '/api/auth/csrf returns csrfToken': (r) => r.json().csrfToken && r.json().csrfToken.length || fail('no csrf token'),
    // })
  })
}
