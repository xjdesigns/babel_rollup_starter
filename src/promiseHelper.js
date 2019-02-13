export const reflect = p => p.then(res => {
  return { res, status: 'resolved' }
}, err => {
  return { err, status: "rejected" }
})

  /**
   * returns all promises mapped to resolved or rejected
   * @param promises Array of promises to complete regardless of resolve or reject
   * @returns promise resolve for promise all with array of objects with result and status
   */
export function allSettled (promises) {
  return Promise.all(promises.map(reflect)).then(results => results)
}
