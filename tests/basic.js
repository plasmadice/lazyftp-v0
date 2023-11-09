// Load .env variables and import packages 
// https://cdnjs.com/ 
// https://community.grafana.com/t/k6-dotenv-support/97862/6
// https://www.youtube.com/watch?v=22OmBFKj7fc
// Use dotenv-cli for k6 environment variables, easily import JS util libs like lodash, faker, moment

import http from "k6/http";
import { check, fail, group } from 'k6';


export default function basic () {
  const baseURL = __ENV.NEXT_PUBLIC_URL
  let base = http.get(`${baseURL}`)
  let csrfRoute = http.get(`${baseURL}/api/auth/csrf`)

  group('Main page is live', () => {
    check(base, {
      'status is 200': (r) => r.status === 200,
      'response is quick <100ms': (r) => r.timings.duration < 100,
      '"Continue without logging in" button present': (r) => r.html().find('a.text-blue-500').text() === 'Continue without logging in',
    });
  
    check(csrfRoute, {
      '/api/auth/csrf returns csrfToken': (r) => r.json().csrfToken && r.json().csrfToken.length || fail('no csrf token'),
    })
  })
}
