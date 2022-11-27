export function companiesJSONData() {
  return async (dispatch) => {
    dispatch({ type: 'ITEMS_IS_LOADING' });

    await fetch('data.json',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        dispatch({ type: 'ITEMS_IS_LOADING' });
        console.log('response:', response)
        return response;
      })
      .then((response) => response.json())
      .then((data) => dispatch({
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        companies: data
      }))
      // .catch(() => dispatch(companiesHasErrored(true)))
  }
}

// export function companiesHasErrored(bool) {
//   return {
//     type: 'ITEMS_HAS_ERRORED',
//     hasErrored: bool
//   }
// }

// export function companiesFetchData(url) {
//   return async (dispatch) => {
//     dispatch({ type: 'ITEMS_IS_LOADING' });

//     await fetch(url)
//         .then((response) =>{
//             if(!response.ok){
//               throw Error(response.statusText);
//             }

//             dispatch({type: 'ITEMS_IS_LOADING'});

//             return response;
//           })
//           .then((response) => response.json())
//           .then((data) => dispatch({
//             type: 'ITEMS_FETCH_DATA_SUCCESS',
//             companies: data
//           }))
//           // .catch(() => dispatch(companiesHasErrored(true)))

//   }
// }

