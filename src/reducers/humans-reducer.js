const initialState = {
  companyHumansCount: []
}

export function humans(state = initialState, action) {
  switch (action.type) {
      case 'GET_COMPANY_HUMANS_COUNT':
      return {
        ...state,
        companyHumansCount: action.companyHumansCount
      }

    default:
      return state;
  }
}