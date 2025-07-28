// {
//   "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
//   "title": "One or more validation errors occurred.",
//   "status": 400,
//   "errors": {
//     "": [
//       "A non-empty request body is required."
//     ],
//     "request": [
//       "The request field is required."
//     ]
//   },
//   "traceId": "00-4b361a1d9a07af95532a41db63e520d5-25f73f966c0566d3-00"
// }

export interface ProblemDetail {
    title: string | String
}