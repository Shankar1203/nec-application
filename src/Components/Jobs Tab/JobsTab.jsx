import React from 'react'
import './jobsTab.scss'
import JobsTable from './JobsTable'
import TableLoader from '../../Loaders/Home Page/TableLoader'

const JobsTab = ({ loading, setToBeDeleted, setDeletePopup, page, setPage, maxPages, tasks }) => {
  return (
    <div className='jobsTab'>
      <div>
        <h2>Jobs</h2>
        {loading ? <TableLoader /> :

          <JobsTable setToBeDeleted={setToBeDeleted} setDeletePopup={setDeletePopup} page={page} setPage={setPage} maxPages={maxPages} tasks={tasks} />

        }
      </div>
    </div>
  )
}

export default JobsTab