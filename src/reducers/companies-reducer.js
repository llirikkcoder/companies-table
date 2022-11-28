const initialState = {
  companies: [],
  companyHumansCount: []
}

export function companies(state = initialState, action) {
  switch (action.type) {
    case 'ITEMS_FETCH_DATA_SUCCESS':
      return {
        ...state,
        companies: action.companies
      }

      case 'GET_COMPANY_HUMANS_COUNT':
      return {
        ...state,
        companyHumansCount: action.companyHumansCount
      }

    default:
      return state;
  }
}