import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { companiesFetchData, companiesJSONData } from '../actions/companies'


const Table = () => {
  const [checkedCompanies, setChecked] = useState([])
  const [checkedHumans, setHumanChecked] = useState([])
  const [isHumanOn, showHuman] = useState(false)


  const { companies } = useSelector(state => state.companies)

  // todo: завести в redux пользователей
  // const { users } = useSelector(state => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(companiesFetchData(URL))
    dispatch(companiesJSONData())
  }, [dispatch])


  const checkCompanyHandler = (id) => {
    setChecked(checkedCompanies.includes(id)
      ? checkedCompanies.filter(it => it !== id)
      : [...checkedCompanies, id])
  }

  const checkHumanHandler = (id) => {
    setHumanChecked(checkedHumans.includes(id)
      ? checkedHumans.filter(it => it !== id)
      : [...checkedHumans, id])
  }

  const checkAllCompanies = () => {
    setChecked(
      checkedCompanies.length !== companies.length
        ? companies.map((it) => it.id)
        : []
    )
  }

  const checkAllHumans = () => {
    setHumanChecked(
      checkedHumans.length !== companies.length
        ? companies.map((it) => it.id)
        : []
    )
  }

  // Кол-во сотрудников данной компании
  const getHumansCount = () => {
    return companies.map(company => {
      return console.log('Кол-во сотрудников данной компании', company.humans.length)
    })
  }
  getHumansCount()

  // TODO - Кол-во сотрудников выделенной чекбоксом компании
  const getSelectedCompanyHumansCount = () => {

  }

  console.log('checkedHumans:', checkedHumans)
  console.log('checkedCompanies:', checkedCompanies)
  console.log('companies[0]:', companies[0])
  

  const headerCompaniesElement = ['Компания', 'Кол-во сотрудников', 'Адрес', 'Чекбокс']
  const headerHumansElement = ['Фамилия', 'Имя', 'Должность', 'Чекбокс']

  const renderCompaniesHeader = () => {
    return companies && headerCompaniesElement.map((key, index) => {
      return <th key={index}>{key}</th>
    })
  }

  const renderHumansHeader = () => {
    return companies && headerHumansElement.map((key, index) => {
      return <th key={index}>{key}</th>
    })
  }

  const renderCompaniesBody = () => {
    return companies && companies.map(({ id, companyName, humanCount, adress }) => {
      return (
        <tr key={id} className={checkedCompanies.includes(id) ? 'bg-gray-400' : ''}>
          <td className="px-4 py-2">{companyName}</td>
          <td className="px-4 py-2">{humanCount}</td>
          <td className="px-4 py-2">{adress}</td>
          <td className='check-box'>
            <input className="mr-2 leading-tight" type="checkbox" onChange={() => checkCompanyHandler(id)} checked={checkedCompanies.includes(id)} />
          </td>
        </tr>
      )
    })
  }

  const renderHumansBody = () => {
    return companies && companies.map((
      { id, humans }) => {
      return humans.map(human => {
        return (
          checkedCompanies.includes(id) && <tr key={human.id} className={checkedHumans.includes(human.id) ? 'bg-gray-400' : ''}>
            <td className="px-4 py-2">{human.surname}</td>
            <td className="px-4 py-2">{human.name}</td>
            <td className="px-4 py-2">{human.position}</td>
            <td className='check-box'>
              <input className="mr-2 leading-tight" type="checkbox" onChange={() => checkHumanHandler(human.id)} checked={checkedHumans.includes(human.id)} />
            </td>
          </tr>
        )
      })
    })
  }


  if (companies.hasErrored) {
    return <p>Sorry! There was an error loading the items</p>;
  }

  if (companies.isLoading) {
    return <p>Loading…</p>;
  }

  return (
    <>
      <div className="w-2/3 rounded overflow-hidden  shadow-lg text-center mt-5">

        <h1 id='title'>Компании</h1>

        <div className="md:flex bg-gray-200 md:items-center mb-6">
          <label className="md:w-2/3 block text-gray-500 font-bold">
            <input className="mr-2 leading-tight" type="checkbox" onChange={checkAllCompanies} />
            {/* checked={companies.length === checkedCompanies.length}  */}
            <span className="text-sm">
              Выбрать все!
            </span>
          </label>
        </div>
        <table id='companies' className="table-auto text-center content-around">
          <thead>
            <tr>{renderCompaniesHeader()}</tr>
          </thead>

          <tbody>
            {renderCompaniesBody()}
          </tbody>
        </table>
      </div>

      {true &&
        <div className="w-2/3 rounded overflow-hidden  shadow-lg text-center mt-5">

          <h1 id='title'>Сотрудники</h1>
          
          <div className="md:flex bg-gray-200 md:items-center mb-6">
            <label className="md:w-2/3 block text-gray-500 font-bold">
              <input className="mr-2 leading-tight" onChange={checkAllHumans} type="checkbox" />
              <span className="text-sm">
                Выбрать все!
              </span>
            </label>
          </div>
          <table id='companies' className="table-auto text-center content-around">
            <thead>
              <tr>{renderHumansHeader()}</tr>
            </thead>

            <tbody>
              {renderHumansBody()}
            </tbody>

          </table>
        </div>
      }
    </>)


}

export default Table