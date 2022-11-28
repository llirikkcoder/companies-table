import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { companiesJSONData, getHumansCount } from '../actions/companies'


const Table = () => {
  const [checkedCompaniesId, setChecked] = useState([])
  const [checkedHumansIds, setHumanChecked] = useState([])
  const [isHumanOn, showHuman] = useState(false)

  // TODO: - понять что делает и как работает setHumanChecked(id)
  // let testHumanId = () => setHumanChecked(3)
  // console.log('testHumanId():', testHumanId())

  const { companies } = useSelector(state => state.companies)
  // const { companyHumansCount } = useSelector(state => state.companyHumansCount)

  // TODO: завести в redux пользователей
  // const { users } = useSelector(state => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(companiesJSONData())

  }, [dispatch])

  // useEffect(() => {
  //   dispatch(getHumansCount())

  // }, [])


  const checkCompanyHandler = (id) => {
    setChecked(checkedCompaniesId.includes(id)
      ? checkedCompaniesId.filter(it => it !== id)
      : [...checkedCompaniesId, id])
  }

// TODO: - понять как работает эта функция
//
  const selectAllCompanies = () => {
    setChecked(
      checkedCompaniesId.length !== companies.length
        ? companies.map((company) => company.id)
        : []
    )
  }

  // выделение сотрудников при выставлении checkbox = on
  const selectHumanHandler = (id) => {
    setHumanChecked(checkedHumansIds.includes(id)
      ? checkedHumansIds.filter(it => it !== id)
      : [...checkedHumansIds, id])
    }
  console.log('checkedHumansIds:', checkedHumansIds);

  // TODO: - выделить/убрать всех сотрудников сразу
  const selectAllHumansOfSelectedCompanies = () => {
    // setHumanChecked(allCheckedCopaniesHumansIds)
    setHumanChecked(
      // если число выделенных сотрудников не равно общему числу сотрудиков всех выделенных компаний
      checkedHumansIds.length !== allCheckedCopaniesHumansCount
      // TODO: - выделить невыделенных сотрудников сравнив со списком id всех сотрудников выделенных компаний allCheckedCopaniesHumansIds
        ? allCheckedCopaniesHumansIds
        : []
    )
    
    console.log('allCheckedCopaniesHumansIds:', allCheckedCopaniesHumansIds);
    console.log('allCheckedCopaniesHumansCount:', allCheckedCopaniesHumansCount);
    console.log('checkedHumansIds:', checkedHumansIds);
    // console.log('allCheckedCopaniesHumansIds.map((it) => it.id):', allCheckedCopaniesHumansIds.map((it) => it.id));
  }

  // Кол-во сотрудников данной компании
  // const getHumansCount = () => {
  //   return companies.map(company => {
  //     return console.log('Кол-во сотрудников данной компании', company.humans.length)
  //   })
  // }
  // getHumansCount()

  
  // массив ВЫДЕЛЕННЫХ компаний
  let selectedCompanies = []
  
  // взял идетнификаторы из массива ИДЕНТИФИКАТОРОВ ВЫДЕЛЕННЫХ компаний checkedCompaniesId пробежался ими по массиву компаний
  // наполнил массив selectedCompanies объектами выделенных компаний ???ОБЕРНУТЫМИ!!! В МАССИВ
  // var companiesArray = Object.values(companies).map((company) => company);
  for (let id of checkedCompaniesId) {
    // console.log('Выделенная компания:', companiesArray.filter((company) => company.id === id))
    selectedCompanies.push(companies.filter(company => company.id === id))
  }
  // console.log('selectedCompanies:', selectedCompanies.flat())

  // переменная для общего количества сотрудников выделенных компаний allCheckedCopaniesHumansCount
  let allCheckedCopaniesHumansCount = 0

  // allCheckedCopaniesHumansCount - общее число сотрудников всех выделенных компаний 
  for (let company of selectedCompanies.flat()) {
    allCheckedCopaniesHumansCount = allCheckedCopaniesHumansCount + company.humans.length
  }
  // console.log('allCheckedCopaniesHumansCount:', allCheckedCopaniesHumansCount)

  // allCheckedCopaniesHumansIds - список id всех сотрудников выделенных компаний
  let allCheckedCopaniesHumansIds = []
  for (let company of selectedCompanies.flat()) {
    // allCheckedCopaniesHumansCount.push(company.humans.length)
    for(let human of company.humans) {
      allCheckedCopaniesHumansIds.push(human.id)
      // console.log('human.id:', human.id)
    }
  }
  // console.log('список id всех сотрудников выделенных компаний:', allCheckedCopaniesHumansIds)


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
    return companies && companies.map(({ id, companyName, humansCount, adress }) => {
      return (
        <tr key={id} className={checkedCompaniesId.includes(id) ? 'bg-gray-400' : ''}>
          <td className="px-4 py-2">{companyName}</td>
          <td className="px-4 py-2">{humansCount}</td>
          <td className="px-4 py-2">{adress}</td>
          <td className='check-box'>
            <input className="mr-2 leading-tight" type="checkbox" onChange={() => checkCompanyHandler(id)} checked={checkedCompaniesId.includes(id)} />
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
          checkedCompaniesId.includes(id) && <tr key={human.id} className={checkedHumansIds.includes(human.id) ? 'bg-gray-400' : ''}>
            <td className="px-4 py-2">{human.surname}</td>
            <td className="px-4 py-2">{human.name}</td>
            <td className="px-4 py-2">{human.position}</td>
            <td className='check-box'>
              <input className="mr-2 leading-tight" type="checkbox" onChange={() => selectHumanHandler(human.id)} checked={checkedHumansIds.includes(human.id)} />
            </td>
          </tr>
        )
      })
    })
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
      <div className=" rounded overflow-hidden shadow-lg text-center mt-5">

        <h1 id='title'>Компании</h1>

        <div className="md:flex bg-gray-200 md:items-center mb-6">
          <label className="md:w-2/3 block text-gray-500 font-bold">
            <input className="mr-2 leading-tight" type="checkbox" onChange={selectAllCompanies} />
            {/* checked={companies.length === checkedCompaniesId.length}  */}
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

      {checkedCompaniesId.length !==0 &&
        <div className=" rounded overflow-hidden  shadow-lg text-center mt-5">

          <h1 id='title'>Сотрудники</h1>

          <div className="md:flex bg-gray-200 md:items-center mb-6">
            <label className="md:w-2/3 block text-gray-500 font-bold">
              {/* TODO: сделать выделениие чекбоксов если*/}
              <input className="mr-2 leading-tight" onChange={selectAllHumansOfSelectedCompanies} type="checkbox" />
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
    </div>)


}

export default Table