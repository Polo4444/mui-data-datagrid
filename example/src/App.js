import React, { useState } from 'react'

import DataGrid from 'mui-data-datagrid'
import { Box, makeStyles, Typography, useTheme } from '@material-ui/core'

const useStyles = makeStyles(theme => ({

  DGridHeaderCell: {
    color: `${theme.palette.primary.main}66`
  },
  DGridCell: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.primary.main}66`
  }
}))

function DataActions(row) {
  
  const handleOnClick = () => {
    alert('Hi !')
  }

  const handleInfiniteScrollClick = () => {
    alert('I was added by infinite scroll')
  }

  return (
    <>
      {row._Name === 'test.png' ?
        <button onClick={handleOnClick}>Hi !</button>
        :
        <button onClick={handleInfiniteScrollClick}>I'm new !</button>
      }
    </>
  )
}

function App() {

  const classes = useStyles()
  const theme = useTheme()

  const [rows, setRows] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const columns = [
    { id: '_Name', isNumeric: false, label: "Name", main: true },
    { id: '_Attributes|_ReadOnly', isNumeric: false, label: " Attributes -> Read Only (Child key)" },
    { id: '_Visibility', isNumeric: false, label: "Visibility" },
    { id: 'actions', isNumeric: false, label: "Actions" },
  ]

  const loadMoreAction = () => {


    // if (rows.length <= 0) return

    // alert('started')
    console.log('loading')
    setLoadingMore(true)

    setTimeout(() => {

      let data = []
      for (let index = 0; index < 100; index++) {
        data = rows.length <= 0 ?
          [...data, {
            _id: Math.floor(Math.random() * 9999999999),
            _Name: 'test.png', _Visibility: 'Public',
            _Attributes: {
              _ReadOnly: 'No'
            }
          }]
          :
          [...data, {
            _id: Math.floor(Math.random() * 9999999999),
            _Name: 'InfiniteScrollRow.png', _Visibility: 'Public',
            _Attributes: {
              _ReadOnly: 'Yes'
            }
          }]
      }

      console.log('done')
      setLoadingMore(false)
      setHasMore(true)
      setRows(rows.concat(data))
    }, 2000)


  }

  /* useEffect(() => {

    let data = []
    for (let index = 0; index < 50; index++) {
      data = [...data, {
        _id: Math.floor(Math.random() * 9999999999),
        _Name: 'test.png', _Visibility: 'Public',
        _Attributes: {
          _ReadOnly: 'No'
        },
        actions: <button onClick={handleOnClick}>Hi !</button>
      }]
    }
    setHasMore(true)
    setRows(data)
  }, []) */

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '99vh', backgroundColor: '#F8F9FF' }}>

      <Typography style={{ margin: theme.spacing(2) }}>{rows.length} rows</Typography>
      <Box display="flex" flexDirection="column" flexGrow={1} >
        <DataGrid
          columns={columns} rows={rows} actions={DataActions}
          headerCellClass={classes.DGridHeaderCell} cellClass={classes.DGridCell}
          headerHeight={60} rowHeight={100} rowSpacing={20}
          loadMoreFunc={loadMoreAction} hasMore={hasMore} loadingMore={loadingMore}
        />
      </Box>
    </div>
  )
}

export default App
