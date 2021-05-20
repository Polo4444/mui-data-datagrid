import React, { useEffect, useState } from 'react'

import DataGrid from 'mui-data-datagrid'

function App() {

  const [rows, setRows] = useState([])

  const columns = [
    { id: '_Name', isNumeric: false, label: "Name", main: true },
    { id: '_Attributes|_ReadOnly', isNumeric: false, label: " Attributes -> Read Only (Child key)" },
    { id: '_Visibility', isNumeric: false, label: "Visibility" },
    { id: 'actions', isNumeric: false, label: "Actions" },
  ]

  const handleOnClick = () => {
    alert('Hi !')
  }

  useEffect(() => {

    let data = []
    for (let index = 0; index < 1000; index++) {
      data = [...data, {
        _Name: 'test.png', _Visibility: 'Public',
        _Attributes: {
          _ReadOnly: 'No'
        },
        actions: <button onClick={handleOnClick}>Hi !</button>
      }]
    }
    setRows(data)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#F8F9FF' }}>
      <DataGrid
        columns={columns} rows={rows}
      />
    </div>
  )
}

export default App
