export function getHumansCount() {
  return (dispatch) => {
    dispatch({
    type: 'GET_COMPANY_HUMANS_COUNT',
    companyHumansCount: [1, 4]
  })
}
}

