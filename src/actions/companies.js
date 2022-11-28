export function companiesJSONData() {
  return async (dispatch) => {

    await fetch('data.json',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        console.log('response:', response)
        return response.json();
      })
      .then((data) => dispatch({
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        companies: data
      }))
  }
}

export function getHumansCount() {
  return (dispatch) => {
    dispatch({
    type: 'GET_COMPANY_HUMANS_COUNT',
    companyHumansCount: [1, 4]
  })
}
}

// export function companiesFetchData(url) {
//   return async (dispatch) => {

//     await fetch(url)
//         .then((response) =>{
//             if(!response.ok){
//               throw Error(response.statusText);
//             }

//             return response;
//           })
//           .then((response) => response.json())
//           .then((data) => dispatch({
//             type: 'ITEMS_FETCH_DATA_SUCCESS',
//             companies: data
//           }))
//   }
// }

