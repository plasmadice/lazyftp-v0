import http from "k6/http";
import { check, fail, group } from 'k6';

export default function session () {
  const url = __ENV.NEXT_PUBLIC_URL
  let res = http.get(`${url}/api/auth/session`)

  console.log(res)

  group('site heartbeat', () => {
    check(res, {
      '/api/auth/session returns session': (r) => r.json().session && r.json().csrfToken.length || fail('no csrf token'),
    })
  })
}
